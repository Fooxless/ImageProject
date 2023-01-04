const express = require("express");
const app = express();
const axios = require('axios').default;
var Jimp = require('jimp');
const dotenv = require('dotenv').config;
const AWS = require('aws-sdk');
const redis = require('redis');

var redisClient = redis.createClient( // FOR AWS
    {
        url: `redis://asssignment2-cg-ms.km2jzi.ng.0001.apse2.cache.amazonaws.com:6379`,
    }
);

//const redisClient = redis.createClient(); // FOR LOCAL
redisClient.connect()
    .catch((err) => {
        console.log(err);
    })

app.get("/resize", async (req, res) => {
    //S3 setup
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

    // Setting Bucket Policy to Public
    var readOnlyAnonUserPolicy = {
        Version: "2012-10-17",
        Statement: [
            {
                Sid: "PublicReadGetObject",
                Effect: "Allow",
                Principal: "*",
                Action: [
                    "s3:GetObject"
                ],
                Resource: [
                    ""
                ]
            }
        ]
    };

    // create selected bucket resource string for bucket policy
    var bucketResource = "arn:aws:s3:::" + bucketName + "/*";
    readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;

    // convert policy JSON into string and assign into params
    var bucketPolicyParams = { Bucket: bucketName, Policy: JSON.stringify(readOnlyAnonUserPolicy) };

    // set the new policy on the selected bucket
    s3.putBucketPolicy(bucketPolicyParams, function (err, data) {
        if (err) {
            // display error message
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });

    //Unsplash
    const url = "https://source.unsplash.com/random/300X300"
    //Processed images
    var transformed = [];

    const imageOptions = {
        resolutions: [
            { name: "HD", width: 1280, height: 720 },
            { name: "HDV", width: 1920, height: 1080 },
            { name: "2K", width: 2048, height: 1080 },
            { name: "4K", width: 4096, height: 2160 },
            //{ name: "8K", width: 7680, height: 4320 }
        ]
    };

    try {
        const image = await Jimp.read(url); {
            let options = imageOptions.resolutions;
            const promises = [];
            for (let i = 0, len = options.length; i < len; i++) {
                promises.push(TransformImages(image, options[i], bucketName, s3, transformed))
            }
            Promise.allSettled(promises)
                .then(() => {
                    console.log("transfomed", transformed)
                    let date = new Date().toJSON();
                    const rediskey = `${date}_${image.hash()}`;
                    console.log(`Put in redis key: ${rediskey}`);
                    redisClient.setEx(
                        rediskey,
                        3600,
                        JSON.stringify({ data: transformed })
                    )
                    res.json({ data: transformed, key: rediskey })
                })
        }

    } catch (error) {
        console.error("error", error);
    }
});

async function TransformImages(image, options, bucketName, s3, transformed) {
    let name = options.name;
    let width = options.width;
    let height = options.height;
    image.resize(width, height)
    transformed.push({ name: `${image.hash()}_${width}x${height}.png`, size: `${width} x ${height}` });
    let objectParams = { Bucket: bucketName, Key: `${image.hash()}_${width}x${height}.png`, Body: await image.getBufferAsync(Jimp.AUTO) };
    await s3.putObject(objectParams).promise();
    console.log(`Put ${image.hash()}_${width}x${height}.png in bucket`);


    return { name: `${image.hash()}_${width}x${height}.png`, size: `${width} x ${height} ` };
}

app.get("/getRedis", async (req, res) => {
    var ten_keys = [];
    const keysout = await redisClient.keys('*');

    // Sort array (newest to lastest)
    keysout.sort();

    // Only return last 10
    var count = 0;
    for (var i = 0; i < keysout.length; i++) {
        if (count < 10) {
            ten_keys.push(keysout[keysout.length - 1 - i]);
            count++;
        }
        // Remove from redis if not in last 10. (ensure redis is not storaging large amounts of key pairs)
        else {
            redisClient.del(keysout[keysout.length - 1 - i])
        }

    }



    console.log(ten_keys);
    res.json({ keyz: ten_keys });
});

app.post("/getkey/:key", async (req, res) => {
    const key = req.params.key;
    console.log("req.params.key", req.params.key)
    const data = await redisClient.get(key);
    console.log("data", JSON.parse(data));

    res.json(JSON.parse(data));

});

module.exports = app;