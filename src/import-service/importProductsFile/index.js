'use strict';

exports.handler = async (event) => {
    const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
    const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
    
    const { queryStringParameters: { name } } = event;
    const client = new S3Client({ region: "eu-central-1" });
    const getObjectParams = {Bucket: 'cloudx-aws-practitioner-js', Key: `uploaded/${name}`};
    const command = new PutObjectCommand(getObjectParams);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({url})
    };
}

