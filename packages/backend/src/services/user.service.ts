import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Model } from "mongoose";
import * as nodemailer from "nodemailer";
import { User, UserDocument } from "src/schemas/user.schema";
import { UserDTO } from "src/viewModel/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) { }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => this.mapUserToDTO(user));
  }

  async findByRoleAndStatus(role?: string, status?: boolean): Promise<User[]> {
    const query: any = {};
    if (role) {
      query.role = role;
    }
    if (status !== undefined) {
      query.status = status;
    }
    return this.userModel.find(query).exec();
  }

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createUser = new this.userModel({
      ...user,
      password: hashedPassword
    });
    return createUser.save();
  }

  async findUser(phone: string, username: string): Promise<User | null> {
    return this.userModel.findOne({ $or: [{ phone }, { username }] }).exec();
  }

  async getById(id: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    return this.mapUserToDTO(user)
  }

  async edit(id: string, updatedUser: User): Promise<User> {
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updatedUser, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return existingUser;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async activateUser(id: string, status: boolean): Promise<User> {
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, { status: status }, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return existingUser;
  }

  async resetPassword(id: string, newPassword: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel
      .findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
      .exec();
    // await this.sendPasswordResetEmail(user.email);
    return user;
  }

  async loginUser(email?: string | undefined, password?: string | undefined, phone?: string | undefined): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    let foundUser;

    if (email) {
      foundUser = await this.userModel.findOne({ email }).exec();
    } else {
      foundUser = await this.userModel.findOne({ phone }).exec();
    }

    if (!foundUser) {
      throw new NotFoundException("User not found");
    }

    if (email) {
      const isMatchPassword = await bcrypt.compare(password, foundUser?.password);

      if (!isMatchPassword) {
        throw new NotFoundException("Invalid credentials");
      }
    }

    const accessToken = jwt.sign(
      { UserInfo: { email: foundUser?.email, role: foundUser?.role, id: foundUser._id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }
    );

    const refreshToken = jwt.sign(
      { UserInfo: { email: foundUser?.email, role: foundUser?.role, id: foundUser._id } },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '90d' }
    );
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    return { accessToken, refreshToken, user: foundUser };
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const loggedInUser = await this.userModel.findOne({ refreshToken }).exec();

    if (!loggedInUser) {
      throw new NotFoundException("Invalid refresh token");
    }
    const accessToken = jwt.sign(
      { UserInfo: { email: loggedInUser.email, role: loggedInUser.role, id: loggedInUser._id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    return accessToken;
  }

  async getMe(id: string): Promise<User> {
    const loggedInUser = await this.userModel.findOne({ _id: id }).exec();
    if (!loggedInUser) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
    return loggedInUser;
  }

  async logoutUser(refreshToken: string): Promise<void> {
    const loggedInUser = await this.userModel.findOne({ refreshToken }).exec();

    if (loggedInUser) {
      loggedInUser.refreshToken = "";
      await loggedInUser.save();
    }
  }

  private mapUserToDTO(user: UserDocument): UserDTO {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      organizationId: user.organizationId,
      role: user.role,
      status: user.status,
      info: user.info,
      address: user.address,
      image: user.image,
    };
  }

  private async sendPasswordResetEmail(email: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "iqbaldetective@gmail.com",
        pass: "01836420972",
      },
    });

    const mailOptions = {
      from: "iqbaldetective@gmail.com",
      to: email,
      subject: "Password Reset",
      text: "Your password has been reset successfully.",
    };
    await transporter.sendMail(mailOptions);
  }
}
