import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
dotenv.config();



import * as fs from "fs";
import express from 'express';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/upload', (req, res) => {

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIARVD3OUDCEGM7MRUZ",
    secretAccessKey: "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",
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

s3Client
  .send(putObjectCommand)
  .then((data) => {
    console.log(`File uploaded successfully. File URL: ${data}`);
    
    res.json(data)
  })
  .catch((error) => {
    console.error(error);
  });
    });



app.get('/link', (req, res) => {
    const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
    const bucketName = "samp-bucket-test2";
    const fileName = "abhijith.jpg";
const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIARVD3OUDCEGM7MRUZ',
    secretAccessKey: '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'
  }
});

async function getObjectFromS3(bucketName, fileName) {
  const params = {
    Bucket: bucketName,
    Key: fileName
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    
    return data;
  } catch (err) {
    console.log('Error getting object from S3:', err);
    throw err;
  }
}

// Usage example
(async () => {
  try {
    const objectData = await getObjectFromS3('samp-bucket-test2', 'abhijith.jpg');
    console.log('Object data:', objectData);
    res.send("Its working")
  } catch (err) {
    console.log('Error:', err);
  }
})();

})



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
