import { API_PATHS } from "./apiPaths"; 
import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }catch (error) {
        console.error("Image upload failed:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
  
};
  export default uploadImage;