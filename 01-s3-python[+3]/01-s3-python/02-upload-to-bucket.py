import boto3

MY_BUCKET = '213774';

s3 = boto3.resource('s3');
bucket = s3.Bucket(MY_BUCKET);

with open("AdamOramusASCII.txt", "rb") as my_file:
    bucket.put_object(
        Key="01-s3-python/AdamOramusASCII.txt",
        Body=my_file
    );

