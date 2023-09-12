<template>
  <div class="chat-window">
    <div class="messages" ref="messageBox">
      <div
        class="single"
        v-for="message in formattedMessages"
        :key="message.id"
      >
        <span class="created-at">{{ message.created_at }} ago</span>
        <span class="name">{{ message.name }}</span>
        <span class="message">{{ message.message }}</span>
      </div>
    </div>
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
import { computed, onUpdated, ref } from "vue";
import { formatDistanceToNow } from "date-fns";

export default {
  props: ["senderId", "receiverId"],
  setup(props, context) {
    let messages = ref([]);
    let messageBox = ref(null);
    let chatWindowLoading = ref(true);
    let sender_id = computed(() => props.senderId);
    let receiver_id = computed(() => props.receiverId);

    onUpdated(() => {
      messageBox.value.scrollTop = messageBox.value.scrollHeight;
    });
    let formattedMessages = computed(() => {
      return messages.value
        .filter((data) => {
          return (
            data.sender_id == sender_id.value ||
            data.sender_id == receiver_id.value 
          );
        })
        .map((msg) => {
          let formatTime = formatDistanceToNow(msg.created_at.toDate());
          return { ...msg, created_at: formatTime };
        });
    });
    let q = query(collection(db, "messages"), orderBy("created_at"));
    onSnapshot(q, (docs) => {
      let results = [];
      if (docs) {
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          doc.data().created_at && results.push(document);
        });
      }
      messages.value = results;
      chatWindowLoading.value = false;
      context.emit("chatWindow", chatWindowLoading.value);
    });
    return { messages, formattedMessages, messageBox };
  },
};
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 10px 25px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  height: 68vh;
  overflow: auto;
}
</style>
