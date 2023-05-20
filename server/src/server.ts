//Package Imports
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import multer, { Multer, File } from "multer";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";


//Function Imports

import getLink from "./functions/getLink";


//Interface and Type Declarations and Initializations
declare global {
  namespace Express {
    interface Request {
      file: File;
    }
  }
}

dotenv.config();
const app = express();
const storage: Multer["storage"] = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const extension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage });
const PORT = process.env.PORT;



async function uploadImage() {
  const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const bucketName = "samp-bucket-test2";
  const fileName = "christin.jpg";
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

//////////                     API Routes Starts Here               ///////////



/////                           GET Routes Starts Here                      /////

app.get('/', (req, res) => {
  res.send('This API Route is a TEST ROUTE and it is working fine');
});

app.get('/upload', async (req, res) => {
  uploadImage().then((data) => {
    console.log(`File uploaded successfully. File URL: ${data}`);
    res.json(data.$metadata)
  })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/link', (req, res) => {
  getLink().then((data) => {
    console.log(data);
    res.json(data)
  }).catch((error) => {
    console.error(error);
  })
})

app.get('/test', (req, res) => {
  console.log(`test url called`);
  res.send(`The front end is connected with the backend`)
})

/////                           GET Routes Ends Here                      /////



/////                          POST Routes Starts Here                    /////

app.post('/test-form', upload.single('image'), async (req: Request, res: Response) => {
  const access_ID = req.body.access_ID;
  const secret_Access_Key = req.body.secret_Access_Key; ''
  const bucket_Name = req.body.bucket_Name;
  const region_Name = req.body.region_Name;

console.log(req.body);


  console.log(`value1 ${access_ID}`);
  console.log(`value2 ${secret_Access_Key}`);
  console.log(`value3 ${bucket_Name}`);
  console.log(`value4 ${region_Name}`);

  
  
  const fileName = req.file?.originalname
  const filePath = req.file?.path
  const fileData = fs.readFileSync(filePath)

  const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const bucketName = "samp-bucket-test2";

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: filePath,
    ContentType: "image/jpeg",
  });

  s3Client.send(putObjectCommand).then((data) => {
    console.log(`File uploaded successfully. File URL: ${data}`);

  })
  if (!req.file) {
    console.log(`This is the 400 block`);

    res.status(400).json({ error: "No file received" });
    return;
  }

  res.status(200).json({ message: "File received" });
});

/////                          POST Routes Ends Here                    /////



//SERVER LISTENING

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
