import {
  Body,
  Controller, Delete, Get, HttpException,
  HttpStatus, NotFoundException,
  Param, Post, Put, Query, Req,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { User } from "src/schemas/user.schema";
import { UserService } from "src/services/user.service";
import { UserDTO } from "src/viewModel/user.dto";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private userService: UserService) { }

  @Get("get-all")
  async findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @Get("get-by-role-and-status")
  async findByRoleAndStatus(
    @Query("role") role?: string,
    @Query("status") status?: boolean
  ): Promise<User[]> {
    return this.userService.findByRoleAndStatus(role, status);
  }

  @Get("get-by-id")
  async getById(
    @Query("id") id?: string
  ): Promise<UserDTO> {
    return this.userService.getById(id);
  }

  @Post("create")
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() user: User): Promise<User> {
    const existingUser = await this.userService.findUser(user.phone, user.username);
    if (existingUser) {
      throw new HttpException('User already exists!', HttpStatus.FORBIDDEN);
    }
    if (image) {
      user.image = image.buffer.toString("base64");
    }
    return this.userService.create(user);
  }

  @Put('edit/:id')
  @UseInterceptors(FileInterceptor("image"))
  async edit(
    @Param('id') userId: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updatedUser: User): Promise<User> {
    try {
      if (
        updatedUser.image &&
        !updatedUser.image.startsWith("https")
      ) {
        if (image) {
          updatedUser.image = image?.buffer?.toString("base64");
        }
      }
      return this.userService.edit(userId, updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`User with ID ${userId} not found`, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') userId: string): Promise<void> {
    try {
      await this.userService.delete(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`User with ID ${userId} not found`, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Put('activate/:id')
  async activateUser(@Param('id') userId: string, @Body('status') status: boolean): Promise<User> {
    try {
      return this.userService.activateUser(userId, status);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`User with ID ${userId} not found`, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Post("login")
  async login(@Body() { email, password, phone }: { email?: string | undefined; password?: string | undefined, phone?: string | undefined }, @Req() req: Request): Promise<{ accessToken: string; refreshToken: string }> {
    const macAddress = req.headers['device-id'] || req.headers['x-device-id'] || '';
    try {
      return await this.userService.loginUser(email, password, phone);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }
      throw error;
    }
  }

  @Post("refresh-token")
  async refreshAccessToken(@Body() { refreshToken }: { refreshToken: string }): Promise<{ accessToken: string }> {
    try {
      const accessToken = await this.userService.refreshAccessToken(refreshToken);
      return { accessToken };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
      }
      throw error;
    }
  }

  @Get("get-me")
  async getMe(@Query("id") id?: string): Promise<User> {
    return this.userService.getMe(id);
  }

  @Post("logout")
  async logout(@Body() { refreshToken }: { refreshToken: string }): Promise<void> {
    await this.userService.logoutUser(refreshToken);
  }

  @Put('reset-password/:id')
  async resetPassword(@Param('id') userId: string, @Body('password') password: string): Promise<User> {
    try {
      return this.userService.resetPassword(userId, password);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`User with ID ${userId} not found`, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
}
