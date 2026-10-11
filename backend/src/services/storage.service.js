const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

/**
 * Uploads a file (base64 or buffer) to ImageKit
 *
 * @param {string|Buffer} file - Base64 encoded string or Buffer
 * @param {string} fileName - Destination file name in ImageKit
 * @param {string} [folder] - Target folder path in ImageKit
 * @returns {Promise<{ url: string, fileId: string, name: string }>}
 */
async function uploadfile(file, fileName, folder = "/foodnest/food-images") {
  const result = await imagekit.files.upload({
    file: file,
    fileName: fileName,
    folder: folder,
  });

  return result;
}

/**
 * Deletes a file from ImageKit
 *
 * @param {string} fileId - The ImageKit file ID
 * @returns {Promise<any>}
 */
async function deleteFile(fileId) {
  try {
    return await imagekit.files.deleteFile(fileId);
  } catch (err) {
    console.warn("ImageKit deletion warning:", err.message);
    return null;
  }
}

module.exports = {
  uploadfile,
  deleteFile,
};
