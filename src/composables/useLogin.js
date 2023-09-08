import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

let error = ref("");

let signIn = async(email,password) => {
    try {
        let res = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if(!res){
            throw new Error('cannot login account');
        }
        return res;
      } catch (err) {
        error.value = err.message;
      }
}
let useLogin = () => {
    return{error, signIn}
}

export default useLogin;