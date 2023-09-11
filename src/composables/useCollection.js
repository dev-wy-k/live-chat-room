import { db } from "@/firebase/config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref } from "vue";

let useCollection = (collectionName) => {
    let error = ref("");
    let saveDoc = async(doc) => {
        try{
           let res = await addDoc(collection(db,collectionName),doc);
        }catch(err){
            console.log(err.message);
            error.value = "Server Error Please Contact With Developer!";
        }
    }
    let setUser = async(userId, name) => {
        try{
            const docRef = doc(collection(db, collectionName), userId);
            await setDoc(docRef, {user_name:name});
        }catch(err){
            console.log(err.message);
            error.value = "Server Error Please Contact With Developer!";
        }
    }
    return {error, saveDoc, setUser}
}

export default useCollection;