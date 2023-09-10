<template>
  <div class="chat-window">
    <div class="messages" v-for="message in messages" :key="message.id">
      <div class="single">
        <span class="created-at">{{ message.created_at.toDate() }}</span>
        <span class="name">{{ message.name }}</span>
        <span class="message">{{ message.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ref } from "vue";

export default {
  setup() {
    let messages = ref([]);
    let q = query(collection(db, "messages"), orderBy("created_at"));
    onSnapshot(q, (docs) => {
      let results = [];
      if (docs) {
        docs.forEach((doc) => {
          let document = { id: doc.id, ...doc.data() };
          if (doc.data().created_at) {
            results.push(document);
          }
        });
      }
      messages.value = results;
    });
    return { messages };
  },
};
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
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
  max-height: 400px;
  overflow: auto;
}
</style>
