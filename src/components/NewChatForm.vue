<template>
  <form class="custom-container">
    <input
      class="custom-input"
      placeholder="text message and hit enter to send"
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    />
    <img
      class="image pointer"
      src="../../public/send.png"
      width="20"
      height="20"
      alt=""
      @click="handleSubmit"
    />
  </form>
</template>

<script>
import { ref } from "vue";
import getUser from "@/composables/getUser";
import { serverTimestamp } from "firebase/firestore";
import useCollection from "../composables/useCollection";
export default {
  setup() {
    let message = ref("");

    let { user } = getUser();
    let { error, saveDoc, setNewDoc } = useCollection("messages");
    let handleSubmit = async () => {
      let chat = {
        message: message.value,
        name: user.value.displayName,
        created_at: serverTimestamp(),
      };
      await saveDoc(chat);
      message.value = "";
    };

    return { message, handleSubmit };
  },
};
</script>

<style scoped>
form {
  margin: 10px 20px;
}
.custom-input {
  width: 100%;
  max-width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  background-color: rgb(229, 229, 229);
  outline: none;
  height: 50px;
}
.custom-container {
  position: relative;
}
.image {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
