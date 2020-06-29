import boto3

## Config
storageResourceName = 's3';

## List all buckets

s3 = boto3.resource(storageResourceName);

buckets = s3.buckets.all();

for bucket in buckets:
    print(bucket.name);