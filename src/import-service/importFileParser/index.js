'use strict';

exports.handler = async (event) => {
    const {GetObjectCommand, S3Client} = require('@aws-sdk/client-s3');
    const {SQSClient, SendMessageCommand} = require("@aws-sdk/client-sqs");
    const csv = require('csv-parser');

    const results = [];
    const {Records} = event;
    const recordsObj = Records[0];
    const {s3: {bucket: {name}, object: {key}}} = recordsObj;
    const params = {Bucket: name, Key: key};

    const s3Client = new S3Client({region: "eu-central-1"});
    const command = new GetObjectCommand(params);
    const sqsClient = new SQSClient({region: "eu-central-1"});
    const data = await s3Client.send(command);

    try {
        data.Body
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                const params = {
                    MessageBody: JSON.stringify(results),
                    QueueUrl: process.env.SQS_URL
                }
                const command = new SendMessageCommand(params);
                console.log(command);
                const result = await sqsClient.send(command);
                console.log('result', result);
            });
    } catch (err) {
        console.log("Error", err);
    }
}