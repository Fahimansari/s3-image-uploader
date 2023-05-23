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





//////////                     API Routes Starts Here               ///////////



/////                           GET Routes Starts Here                      /////

app.get('/', (req, res) => {
  res.send('This is a Hello From Server');
});


/////                           GET Routes Ends Here                      /////



/////                          POST Routes Starts Here                    /////

app.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  const access_ID = req.body.access_ID;
  const secret_Access_Key = req.body.secret_Access_Key; ''
  const bucket_Name = req.body.bucket_Name;
  const region_Name = req.body.region_Name;  
  
  const fileName = req.file?.originalname
  const filePath = req.file?.path
  const fileData = fs.readFileSync(filePath)

  const s3Client = new S3Client({
    region: region_Name,
    credentials: {
      accessKeyId: access_ID,
      secretAccessKey: secret_Access_Key,
    },
  });

  const bucketName = bucket_Name;

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileData,
    ContentType: "image/jpeg",
  });

  s3Client.send(putObjectCommand).then((data) => {
    console.log(`File uploaded successfully. ETag: ${data.ETag}`);
  }).catch((err) => {console.log(err.$metadata.httpStatusCode)});
  
  if (!req.file) {
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
