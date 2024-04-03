// cloudinary.service.ts
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@nestjs/config";
import { Readable } from "stream";

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: "dkydnb170",
      api_key: "537577458285379",
      api_secret: "oR0Uy6JvM0qsIhABiXd9tEs53R8",
    });
  }

  //   async uploadImage(fileStream: Readable): Promise<string> {
  //     return new Promise((resolve, reject) => {
  //       const uploadStream = cloudinary.uploader.upload_stream(
  //         {
  //           folder: "src/uploads",
  //         },
  //         (error, result) => {
  //           if (error) {
  //             reject(new InternalServerErrorException("Image upload failed."));
  //           } else {
  //             resolve(result.secure_url);
  //           }
  //         }
  //       );

  //       fileStream.pipe(uploadStream);
  //     });
  //   }

  async uploadImage(thumbnailStream: Readable): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error: any, result: UploadApiResponse) => {
          if (error) {
            console.error("Cloudinary upload failed:", error);
            reject(new Error("Image upload failed."));
          } else {
            resolve(result.secure_url);
          }
        }
      );

      thumbnailStream.pipe(uploadStream);
    });
  }
}
