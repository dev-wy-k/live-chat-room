<template>
  <div class="chat-window bg-gray-900">
    <div class="messages" ref="messageBox">
      <div
        class="single"
        :class="{ textright: message.sender_id == sender_id }"
        v-for="message in formattedMessages"
        :key="message.id"
      >
        <span
          class="created-at"
          :class="{
            dateTextLeft: message.sender_id != sender_id,
            dateTextRight: message.sender_id == sender_id,
          }"
          >{{ message.created_at }} ago</span
        >
        <p v-if="message.sender_id != sender_id" class="name text-blue-600">
          {{ message.name }}
        </p>
        <div
          :class="{
            flexStart: message.sender_id != sender_id,
            flexEnd: message.sender_id == sender_id,
          }"
        >
          <p
            :class="{ senderColor: message.sender_id != sender_id }"
            class="message"
          >
            {{ message.message }}
          </p>
        </div>
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
  props: ["senderId", "receiverId", "mobileViewStatus"],
  setup(props, context) {
    let messages = ref([]);
    let messageBox = ref(null);
    let chatWindowLoading = ref(true);
    let sender_id = computed(() => props.senderId);
    let receiver_id = computed(() => props.receiverId);
    let mobileViewStatus = computed(() => props.mobileViewStatus);

    onUpdated(() => {
      messageBox.value.scrollTop = messageBox.value.scrollHeight;
    });
    let formattedMessages = computed(() => {
      return messages.value
        .filter((data) => {
          return (
            (receiver_id.value == data.sender_id &&
              data.receiver_id == sender_id.value) ||
            (data.sender_id == sender_id.value &&
              data.receiver_id == receiver_id.value)
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
    return {
      messages,
      formattedMessages,
      messageBox,
      sender_id,
      mobileViewStatus,
    };
  },
};
</script>

<style>
.chat-window {
  padding: 10px 0px 10px 25px;
}
.single {
  margin: 18px 0;
  width: 70%;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 7px;
}
.message {
  width: fit-content;
  word-break: break-all;
  background: #292929;
  color: lightgrey;
  padding: 8px;
  margin: 5px 0 0 0;
  border-radius: 0 5px 5px 5px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  height: 80vh;
  overflow: auto;
}
.dateTextLeft {
  text-align: left;
}
.dateTextRight {
  text-align: right;
}
.textright {
  text-align: left;
  margin-left: 30%;
  padding-right: 25px;
}
.senderColor {
  width: fit-content;
  background: #0E3A80;
  color: lightgrey;
  padding: 8px;
  margin: 5px 0 0 0;
  border-radius: 0 5px 5px 5px;
}
.flexStart {
  display: flex;
  justify-content: start;
}
.flexEnd {
  display: flex;
  justify-content: end;
}
</style>
