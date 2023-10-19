import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3';
import { TEST_API } from './constant';

const s3 = new S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

async function GetRequest(endPoint, authToken = '') {
  try {
    const headers = {};
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(TEST_API + endPoint, { headers });
    const status = res.status;
    const fetchData = await res.json();

    return { status, fetchData };
  } catch (err) {
    return { error: err };
  }
}

async function PostRequest(endPoint, FormData) {
  console.log('endPoint', endPoint);
  console.log('formData', FormData);
  try {
    const res = await fetch(TEST_API + endPoint, {
      method: 'POSt',
      headers: {
        'Content-Type': 'application/json',
        deviceIdentifier: 'Yahallo!',
      },
      body: JSON.stringify(FormData),
    });
    const data = await res.json();
    const status = res.status;
    return { status: status, data: data };
  } catch (err) {
    return err;
  }
}

async function awsImageUpload(file) {
  if (!file) return;
  const params = {
    Bucket: 'ejy-blog',
    Key: file.name,
    Body: file,
  };

  try {
    const upload = new Upload({
      client: s3,
      params,
    });
    upload.on('httpUploadProgress', (p) => {
      console.log(p.loaded / p.total);
    });
    await upload.promise();
    console.log(`File uploaded successfully: ${file.name}`);
    return file.name;
  } catch (err) {
    console.error(err);
  }
}

export { GetRequest, PostRequest, awsImageUpload };
