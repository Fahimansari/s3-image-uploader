import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config()

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
    //   ACL: 'public-read'
  });


  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName

  })

  return s3Client.send(putObjectCommand)
}

export default uploadImage