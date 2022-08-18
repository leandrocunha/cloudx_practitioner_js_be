'use strict';

exports.handler = async (event) => {
    const {GetObjectCommand, S3Client} = require('@aws-sdk/client-s3');
    const csv = require('csv-parser');
    try {        
        const results = [];
        const {Records} = event;
        const recordsObj = Records[0];
        const {s3: {bucket: {name}, object: {key}}} = recordsObj;
        const params = {Bucket: name, Key: key};
        const s3Client = new S3Client({ region: "eu-central-1" });
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        data.Body
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
            });
      } catch (err) {
        console.log("Error", err);
      }
}