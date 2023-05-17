import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config()

const awsRegion = process.env.AWS_REGION


async function getLink() {
    const bucketName = "samp-bucket-test2";
    const fileName = "abhijith.jpg";

    return `https://${bucketName}.s3.${awsRegion}.amazonaws.com/${fileName}`

}

export default getLink

