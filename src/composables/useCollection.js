import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
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
    return {error, saveDoc}
}

export default useCollection;