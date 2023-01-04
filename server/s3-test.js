require('dotenv').config;
const AWS = require('aws-sdk');

//s3 setup
const bucketName = "cab432-assignment2-cg-ms";
const s3 = new AWS.S3({ apiVersion: "2006-03-01", region: 'ap-southeast-2' });

(async () => {
    try {
        await s3.createBucket({ Bucket: bucketName }).promise();
        console.log(`Created bucket: ${bucketName}`);
    } catch (err) {
        if (err.statusCode !== 409) {
            console.log(`Error creating bucket: ${err}`);
        }
    }
})();

const key = 'Test';
const s3Key = `Testing-${key}`;

const objectParams = { Bucket: bucketName, Key: s3Key, Body: 'testing' };

(async () => {
    try {
        await s3.putObject(objectParams).promise();
        console.log(`Successfully upload to ${bucketName}-${key}`);
    } catch (err) {
        console.log(err, err.stack);
    }
})();