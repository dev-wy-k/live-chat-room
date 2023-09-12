<template>
  <div class="chat-list-sidebar">
    <ul class="chat-block">
        <li @click="addNewChat(e,message)" class="user-chat" v-for="message in messages" :key="message.id">
            <span>{{ message.receiver_name }}</span>
        </li>
    </ul>
  </div>
</template>

<script>
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import getLoginUser from '@/composables/getLoginUser';
import { ref } from "vue";

export default {
  props: ["senderId"],
  setup(props, context) {
    let messages = ref([]);
    let {user} = getLoginUser();
    let q = query(
      collection(db, "messages"),
      where("sender_id", "==", user.value.uid),
      orderBy("created_at")
    );
    onSnapshot(q, (docs) => {
      let results = [];
      if (docs) {
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          doc.data().created_at && results.push(document);
        });
      }
      messages.value = results;
    });
    let addNewChat = (e,message) => {
      let obj = {id:message.receiver_id,user_name:message.receiver_name}
      context.emit('addNewChat',obj);
    }
    return { messages,addNewChat };
  },
};
</script>

<style scoped>
.chat-block{
    margin: 20px 0 0 0;
    padding: 0;
}
.user-chat{
    border-bottom: 1px solid #d8d2d2;
    padding: 10px;
}
.user-chat:hover{
    cursor: pointer;
    background: #c7c4c4;
}
li{
    list-style-type: none;
}
</style>
