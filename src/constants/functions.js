import { TEST_API, env } from './constant';
import {
  DeleteObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const accessKeyId = env.AWS_S3_ACCESS_KEY;
const secretAccessKey = env.AWS_S3_SECRET_ACCESS_KEY;
const region = env.AWS_S3_REGION;
const bucketName = env.AWS_S3_BUCKET_NAME;
const folder = env.AWS_S3_FOLDER_NAME;

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
console.log('reggg', region);
console.log('bucketName', bucketName);
console.log('folder', folder);

async function GetRequest(endPoint, authToken = '') {
  try {
    const headers = {
      deviceIdentifier: 'Yahallo!',
    };
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const res = await fetch(TEST_API + endPoint, { headers });
    const status = res.status;
    const fetchData = await res.json();
    // console.log('res', fetchData);
    return { status, fetchData };
  } catch (err) {
    return { error: err, fetchData: [] };
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
  // console.log('headers', headers);
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

async function DeleteRequest(endPoint, authToken = '') {
  const headers = {
    'Content-Type': 'application/json',
    deviceIdentifier: 'Yahallo!',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(TEST_API + endPoint, {
      method: 'DELETE',
      headers,
    });
    const data = await res.json();
    const status = res.status;
    // console.log('resData', data);
    return { status: status, data: data };
  } catch (err) {
    return err;
  }
}

async function PutRequest(endPoint, formData, authToken) {
  const headers = {
    'Content-Type': 'application/json',
    deviceIdentifier: 'Yahallo!',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  try {
    const res = await fetch(TEST_API + endPoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(formData),
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
  const { object, caption } = file;
  // console.log('hhh', object);
  const sanitizedCaption = caption.replace(/ /g, '-').toLowerCase();
  const randomString = Math.random().toString().substring(2, 8);
  console.log('object TYpe', object);
  const imageUrl = `${folder}/ejy-health-${
    sanitizedCaption + randomString + object.name
  }`;

  const params = {
    Bucket: bucketName,
    Key: imageUrl,
    Body: object,
    ContentType: object.type,
  };
  // return imageUrl;

  try {
    const upload = new PutObjectCommand(params);
    // upload.on('httpUploadProgress', (p) => {
    //   console.log(p.loaded / p.total);
    // });
    console.log('s3Client', s3Client);
    console.log('uploadData', upload);

    const data = await s3Client.send(upload);
    console.log('AWS image upload data', data);
    console.log(`File uploaded successfully: ${file.name}`);
    console.log('srs', imageUrl, caption);
    return { src: imageUrl, caption };
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function awsImageDelete(images) {
  const command = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      // Objects: [{ Key: 'object1.txt' }, { Key: 'object2.txt' }],
      Objects: images,
    },
  });

  try {
    const { Deleted } = await s3Client.send(command);
    console.log(
      `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`
    );
    console.log(Deleted.map((d) => ` • ${d.Key}`).join('\n'));
    return Deleted;
  } catch (err) {
    console.error(err);
    return err;
  }
}

function calculateReadTime(content) {
  const readingSpeed = 80; // words per minute

  const validItems = content.filter(
    (item) =>
      item.type === 'paragraph' ||
      item.type === 'h2' ||
      item.type === 'h3' ||
      item.type === 'list'
  );

  const totalWords = validItems.reduce((wordCount, item) => {
    const parsedItem = item.text.replace(/<[^>]*>/g, '');
    return wordCount + parsedItem.split(' ').length;
  }, 0);

  const readTimeInMinutes = totalWords / readingSpeed;

  const readTimeInMinutesRoundedUp = Math.ceil(Math.max(1, readTimeInMinutes));

  return readTimeInMinutesRoundedUp;
}

export {
  GetRequest,
  PostRequest,
  awsImageUpload,
  awsImageDelete,
  calculateReadTime,
  DeleteRequest,
  PutRequest,
};
