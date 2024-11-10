import { uploadSingleFile } from "./backend_helper";

export const uploadImage = async (files, folder, _id) => {
  const url = [];
  if (files?.length > 0) {
    for (let i = 0; i < files.length; i++) {
      //check if file is already uploaded
      if (files[i].url) {
        url.push(files[i].url);
        continue;
      }
      const payload = { files: files[i].originFileObj };
      try {
        let data = await uploadSingleFile(payload);
        url.push(data.data);
      } catch (e) {}
    }
  }
  // else {
  //     const formData = new FormData();
  //     formData.append('files', files?.originFileObj);
  //     try {
  //         let data = await uploadSingleFile(formData);
  //         console.log('🚀 ~ file: uploadFile.ts:26 ~ uploadImage ~ data:', data);
  //         url.push(data);
  //     } catch (e) {
  //         console.log(e);
  //     }
  // }
  return url;
};
