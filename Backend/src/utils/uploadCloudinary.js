import cloudinary from 'cloudinary';

const uploadFilesToCloudinary = async (files) => {
  const uploadedFiles = {};

  // Mapping your field keys
  const fileKeys = ["emirates", "passportFront", "passportBack"];

  for (const key of fileKeys) {
    if (files?.[key]?.[0]) {
      const file = files[key][0];

      const uploaded = await cloudinary.v2.uploader.upload(file.path, {
        folder: "test_project/kyc",
        filename_override: file.originalname || file.filename,
      });


      uploadedFiles[key] = uploaded
    }}
    return uploadedFiles;
};

export default uploadFilesToCloudinary