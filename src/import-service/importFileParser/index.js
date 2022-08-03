'use strict';

exports.handler = async (event) => {
    const {GetObjectCommand, S3Client} = require('@aws-sdk/client-s3');
    try {
        const chunks = [];
        const streamToString = (stream) =>
        new Promise((resolve, reject) => {          
          stream.on("data", (chunk) => {
            console.log(chunk);
            chunks.push(chunk)
          });
          stream.on("error", error => reject(console.log(error)));
          stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
        
        const {Records} = event;
        const recordsObj = Records[0];
        const {s3: {bucket: {name}, object: {key}}} = recordsObj;
        const params = {Bucket: name, Key: key};
        console.log(params)
        const s3Client = new S3Client({ region: "eu-central-1" });
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        console.log(data);
        const bodyContents = await streamToString(data.Body);
        console.log(bodyContents);
      } catch (err) {
        console.log("Error", err);
      }
}