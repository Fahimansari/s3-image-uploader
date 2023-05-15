//Package Imports
import express from 'express';
import dotenv from 'dotenv';

//Function Imports
import uploadImage from "./uploader";
import getLink from "./getLink";

dotenv.config();
const app = express();
const port = process.env.PORT;


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



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
