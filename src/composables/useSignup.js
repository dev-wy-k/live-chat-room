import { ref } from "vue";
import { auth, createUserWithEmailAndPassword } from "@/firebase/config";
import { updateProfile } from "firebase/auth";
import useCollection from "./useCollection";

let error = ref("");
let {err ,saveDoc, setUser} = useCollection("users");
let createAccount = async (email, password, displayName, url) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("could not create new user");
    }
    await updateProfile(auth.currentUser, { displayName,photoURL:url.url }); // update auth user data
    await setUser(res.user.uid,displayName,url.url) // add user name to user collection firestore database

    return res;
  } catch (err) {
    error.value = err.message;
  }
};
let useSignup = () => {
  return { error, createAccount };
};

export default useSignup;
