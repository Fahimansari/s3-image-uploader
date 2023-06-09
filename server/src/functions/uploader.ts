//Package Imports
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as dotenv from "dotenv";


//Interfaces, Type Declarations and Initializations

dotenv.config()


//Main Function

async function uploadImage() {
  const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const bucketName = "samp-bucket-test2";
  const fileName = "abhijith.jpg";
  const filePath = "abhijith.jpg";
  const fileContent = fs.readFileSync(filePath);
  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: "image/jpeg",
  });

  return s3Client.send(putObjectCommand)
}

export default uploadImage