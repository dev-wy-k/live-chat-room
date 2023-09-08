import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { ref } from "vue";

let error = ref("");
let logout = async () => {
  try {
    await signOut(auth);
    console.log("logout");
  } catch (err) {
    error.value = err.message;
  }
};
let useLogout = () => {
  return { error, logout };
};

export default useLogout;
