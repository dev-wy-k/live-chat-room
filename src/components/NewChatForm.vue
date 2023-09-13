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
      alt=""
      @click="handleSubmit"
    />
  </form>
</template>

<script>
import { computed, ref } from "vue";
import getUser from "@/composables/getLoginUser";
import { serverTimestamp } from "firebase/firestore";
import useCollection from "../composables/useCollection";
export default {
  props:['senderId','receiverId','senderName','receiverName'],
  setup(props) {
    let message = ref("");

    let { user } = getUser();
    let sender_id = computed(() => props.senderId);
    let receiver_id = computed(() => props.receiverId);
    let sender_name = computed(() => props.senderName);
    let receiver_name = computed(() => props.receiverName);

    let { saveDoc } = useCollection("messages");
    let handleSubmit = async () => {
      let chat = {
        message: message.value,
        name: user.value.displayName,
        created_at: serverTimestamp(),
        sender_id:sender_id.value,
        receiver_id:receiver_id.value,
        sender_name:sender_name.value,
        receiver_name:receiver_name.value
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
  top: 13px;
  width: 25px;
  height: 25px;
}
</style>
@/composables/getLoginUser