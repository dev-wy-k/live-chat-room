<template>
  <div class="chat-list-sidebar">
    <ul class="chat-block text-gray-400" ref="chatblock">
      <li
        @click="addNewChat(e, message)"
        class="user-chat"
        v-for="message in filteredMessages"
        :key="message.id"
        :class="{active:receiver_id == message.receiver_id}"
      >
        <div class="flex items-center">
          <div>
            <img :src="message.photo_url" alt="profile" />
          </div>
          <div v-if="user" class="ml-2">
            <span v-if="message.receiver_id == user.uid">{{
              message.sender_name
            }}</span>
            <span v-else>{{ message.receiver_name }}</span>
          </div>
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
import { computed, onUpdated, ref } from "vue";

export default {
  props: ["senderId","receiverId"],
  setup(props, context) {
    let messages = ref([]);
    let chatblock = ref(null);
    let { user } = getLoginUser();
    let receiver_id = computed(() => [props.receiverId]);
    let temp1 = [];
    let chatListLoading = ref(true);

    // onUpdated(() => {
    //   chatblock.value.scrollTop = 0;
    // });

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

    let q = query(
      collection(db, "messages"),
      where("sender_id", "==", user.value.uid),
      orderBy("created_at", "desc")
    );

    let q2 = query(
      collection(db, "messages"),
      where("receiver_id", "==", user.value.uid),
      orderBy("created_at", "desc")
    );
    onSnapshot(q, (docs) => {
      let temp1 = [];
      if (docs) {
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          doc.data().created_at && temp1.push(document);
        });
      }
      messages.value = temp1; // Update messages with new data
    });

    onSnapshot(q2, (docs) => {
      let temp2 = [];
      if (docs) {
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          doc.data().created_at && temp2.push(document);
        });
      }
      messages.value = messages.value.concat(temp2); // Merge new data with existing messages
      chatListLoading.value = false;
      context.emit("chatList", chatListLoading.value);
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
        photo_url: message.photo_url,
      };
      context.emit("addNewChat", obj);
    };
    return { messages, addNewChat, filteredMessages, user, chatblock, receiver_id };
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.chat-block {
  margin: 20px 0 0 0;
  padding: 0;
  max-height: 70vh;
  overflow: hidden;
}
.chat-block:hover{
  overflow: auto;
}
.user-chat {
  padding: 5px;
  margin: 2px 5px;
  border-radius: 5px;
}
.user-chat:hover {
  cursor: pointer;
  background: #081E40;
}
li {
  list-style-type: none;
}
.active{
  background: #081E40;
}
</style>
