import boto3
import uuid;

id = uuid.uuid4();

s3 = boto3.client('s3');
MY_BUCKET = '213774';
FILE_NAME = "AdamOramusASCII.txt"

s3.download_file(MY_BUCKET, '01-s3-python/' + FILE_NAME, '03-downloads/' + str(id) + ".txt");