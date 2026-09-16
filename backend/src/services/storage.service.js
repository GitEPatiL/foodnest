const { ImageKit } = require("@imagekit/nodejs");


const imagekit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadfile(file,fileName){
    const result = await imagekit.files.upload({
        file:file, //required
        fileName:fileName //required
    })

    return result; // return the URL of the uploaded file
}

module.exports={
    uploadfile
}