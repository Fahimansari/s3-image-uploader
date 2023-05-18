//Package Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { Request, Response } from "express";
import multer from "multer";


//Function Imports
import uploadImage from "./functions/uploader";
import getLink from "./functions/getLink";
// import { Request } from 'aws-sdk';

dotenv.config();
const app = express();
const upload = multer()
const port = process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
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


app.post('/test-form', upload.none(), (req: Request, res: Response) => {
  const value1 =  req.body.data1;
  const value2 =  req.body.data2;

  console.log(req.body);
  
  console.log("Value 1:", value1);
  console.log("Value 2:", value2);

  res.sendStatus(200);
}); 



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
