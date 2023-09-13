<template>
  <div class="chat-list-sidebar">
    <ul class="chat-block">
      <li
        @click="addNewChat(e, message)"
        class="user-chat"
        v-for="message in filteredMessages"
        :key="message.id"
      >
        <div v-if="user">
          <span v-if="message.receiver_id == user.uid">{{
            message.sender_name
          }}</span>
          <span v-else>{{ message.receiver_name }}</span>
        </div>
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
import getLoginUser from "@/composables/getLoginUser";
import { computed, ref } from "vue";

export default {
  props: ["senderId"],
  setup(props, context) {
    let messages = ref([]);
    let { user } = getLoginUser();
    let temp1 = [];
    let q = query(
      collection(db, "messages"),
      where("sender_id", "==", user.value.uid),
      orderBy("created_at")
    );
    onSnapshot(q, (docs) => {
      if (docs) {
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          doc.data().created_at && temp1.push(document);
        });
      }
    });

    let q2 = query(
      collection(db, "messages"),
      where("receiver_id", "==", user.value.uid),
      orderBy("created_at")
    );
    onSnapshot(q2, (docs) => {
      if (docs) {
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          doc.data().created_at && temp1.push(document);
        });
      }
      messages.value = temp1;
    });

    let filteredMessages = computed(() => {
      let uniqueData = [];
      let uniqueArray = [];

      messages.value.forEach((item) => {
        if (
          !(
            uniqueData.includes(`${item.sender_id}-${item.receiver_id}`) ||
            uniqueData.includes(`${item.receiver_id}-${item.sender_id}`)
          )
        ) {
          uniqueArray.push(item);
          uniqueData.push(`${item.sender_id}-${item.receiver_id}`);
        }
      });
      return uniqueArray;
    });
    let addNewChat = (e, message) => {
      let obj = {
        id:
          message.receiver_id == user.value.uid
            ? message.sender_id
            : message.receiver_id,
        user_name:
          message.receiver_id == user.value.uid
            ? message.sender_name
            : message.receiver_name,
      };
      context.emit("addNewChat", obj);
    };
    return { messages, addNewChat, filteredMessages, user };
  },
};
</script>

<style scoped>
.chat-block {
  margin: 20px 0 0 0;
  padding: 0;
  max-height: 70vh;
  overflow: auto;
}
.user-chat {
  border-bottom: 1px solid #d8d2d2;
  padding: 10px;
}
.user-chat:hover {
  cursor: pointer;
  background: #c9e0ee;
}
li {
  list-style-type: none;
}
</style>
