import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { ref } from "vue";
let getUsers = () => {
  let users = ref([]);
  onSnapshot(collection(db, "users"), (docs) => {
    let temp = [];
    if (docs) {
      docs.forEach((doc) => {
        let user = { id: doc.id, ...doc.data() };
        temp.push(user);
      });
    }
    users.value = temp;
  });
  return { users };
};

export default getUsers;
