import { db } from "@/firebase/config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref } from "vue";

let useCollection = (collectionName) => {
    let error = ref("");
    let saveDoc = async(data) => {
        try{
           let res = await addDoc(collection(db,collectionName),data);
        }catch(err){
            console.log(err.message);
            error.value = "Server Error Please Contact With Developer!";
        }
    }
    let setUser = async(userId, user_name, photo_url) => {
         photo_url = photo_url? photo_url: "";
        let data = {user_name,photo_url};
        try{
            const docRef = doc(collection(db, collectionName), userId);
            await setDoc(docRef, data);
        }catch(err){
            console.log(err.message);
            error.value = "Server Error Please Contact With Developer!";
        }
    }
    return {error, saveDoc, setUser}
}

export default useCollection;