import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

let user = ref(auth.currentUser);
onAuthStateChanged(auth, (_user) => {
  user.value = _user;
});
let getLoginUser = () => {
    return {user};
}

export default getLoginUser;