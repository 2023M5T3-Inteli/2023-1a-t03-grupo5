import AWS from 'aws-sdk'

const S3_BUCKET = 'YOUR_BUCKET_NAME_HERE';
const REGION = 'YOUR_DESIRED_REGION_HERE';

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_HERE',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY_HERE'
})

const bucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

const uploadFile = (file: any) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name
  };

  bucket.putObject(params)
    .send((err) => {
      if (err) console.log(err)
    })
}

export default uploadFile