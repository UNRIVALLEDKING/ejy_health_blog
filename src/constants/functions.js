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
    console.log('res', fetchData);
    return { status, fetchData };
  } catch (err) {
    return { error: err };
  }
}

async function PostRequest(endPoint, FormData, authToken = '') {
  const headers = {
    'Content-Type': 'application/json',
    deviceIdentifier: 'Yahallo!',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  // console.log('endPoint', endPoint);
  // console.log('formData', FormData);
  // console.log('authToken', authToken);
  try {
    const res = await fetch(TEST_API + endPoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(FormData),
    });
    const data = await res.json();
    const status = res.status;
    // console.log('resData', data);
    return { status: status, data: data };
  } catch (err) {
    return err;
  }
}

async function awsImageUpload(file) {
  if (!file) return;
  const params = {
    Bucket: 'ejy-blog-images',
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

function calculateReadTime(content) {
  const readingSpeed = 80; // words per minute
  const listItems = content
    .filter((item) => item.type === 'list')
    .map((item) => {
      const parsedItem = item.text.replace(/<[^>]*>/g, '');
      // console.log('list parsed', parsedItem);
      return parsedItem;
    });

  const paragraphs = content
    .filter(
      (item) =>
        item.type === 'paragraph' || item.type === 'h2' || item.type === 'h3'
    )
    .map((item) => {
      console.log('item', item);
      const parsedItem = item.text.replace(/<[^>]*>/g, '');
      // console.log('para parsed', parsedItem);
      return parsedItem;
    });

  const totalWords =
    listItems.join(' ').split(' ').length +
    paragraphs.join(' ').split(' ').length;

  const readTimeInMinutes = totalWords / readingSpeed;

  const readTimeInMinutesRoundedUp = Math.ceil(readTimeInMinutes);

  return readTimeInMinutesRoundedUp;
}

export { GetRequest, PostRequest, awsImageUpload, calculateReadTime };
