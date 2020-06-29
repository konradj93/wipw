#!/bin/bash

BUCKET_NAME=213774

yarn webpack
cp src/index.html dist/index.html
aws s3 cp dist/main.js s3://${BUCKET_NAME}/main.js --acl=public-read
aws s3 cp dist/index.html s3://${BUCKET_NAME}/index.html --acl=public-read

echo "http://${BUCKET_NAME}.s3-website-eu-west-1.amazonaws.com/"