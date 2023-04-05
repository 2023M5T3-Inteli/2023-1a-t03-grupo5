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

const S3Service = {
  uploadFile: async (file: any) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };

    let response = bucket.putObject(params, (error, data) => {
      if (error) {
        return error
      }
      else {
        return 200
      }
    })

    return response
  }
}

export default S3Service