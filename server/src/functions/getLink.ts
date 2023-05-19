//Package Imports
import * as dotenv from "dotenv";


//Interface and Type Declarations and Initializations

dotenv.config()
const awsRegion = process.env.AWS_REGION


//Main  Function

async function getLink() {
    const bucketName = "samp-bucket-test2";
    const fileName = "abhijith.jpg";

    return `https://${bucketName}.s3.${awsRegion}.amazonaws.com/${fileName}`

}

export default getLink

