const util = require('util');
const uuid = require('uuid').v1;
const gc = require('../config/gc_storage');
const bucket = gc.bucket(process.env.BUCKET_NAME);

const { format } = util;

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

async function setTemporaryHold(fileName) {
  await bucket.file(fileName).setMetadata({
    temporaryHold: true,
  });
  console.log(`Temporary hold was set for ${fileName}.`);
}

const uploadImage = (file, bucketFolder, temp = false) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    //const blob = bucket.file(originalname.replace(/ /g, '_'));
    const fileName = `${bucketFolder}/${uuid()}-${originalname}`;
    const blob = bucket.file(fileName);
    //blob.setMetadata({ temporaryHold: true });
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on('finish', () => {
        //setTemporaryHold(blob.name);
        //setTemporaryHold(fileName);
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on('error', () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

module.exports = uploadImage;
