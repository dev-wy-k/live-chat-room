import { ref } from "vue";
import { auth, createUserWithEmailAndPassword } from "@/firebase/config";
import { updateProfile } from "firebase/auth";

let error = ref("");
let createAccount = async (email, password, displayName) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("could not create new user");
    }
    await updateProfile(auth.currentUser, { displayName });
    return res;
  } catch (err) {
    error.value = err.message;
  }
};
let useSignup = () => {
  return { error, createAccount };
};

export default useSignup;
