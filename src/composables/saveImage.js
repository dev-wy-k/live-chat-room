import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

let saveImage = async(image) => {
   let storageRef = ref(storage, image.name) ;
   await uploadBytes(storageRef, image);
   let url = await getDownloadURL(storageRef);
   return {url};
}

export default saveImage;