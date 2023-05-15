import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";



async function getLink() {
    const bucketName = "samp-bucket-test2";
    const fileName = "abhijith.jpg";

    return `https://${bucketName}.s3.ap-south-1.amazonaws.com/${fileName}`

}

export default getLink

