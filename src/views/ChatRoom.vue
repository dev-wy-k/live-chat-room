<template>
  <Loading :isLoading="isLoading" />
  <div class="chat-container">
    <div class="sidebar">
      <LeftSideNavbar></LeftSideNavbar>
      <PrivateChat @addNewChat="addNewChat"></PrivateChat>
      <ChatList @addNewChat="addNewChat" :senderId="senderId"></ChatList>
    </div>
    <div class="output">
      <Navbar :chatPersonData="chatPersonData"></Navbar>
      <ChatWindow
        @chatWindow="chatWindow"
        :senderId="senderId"
        :receiverId="receiverId"
      ></ChatWindow>
      <NewChatForm
        :senderId="senderId"
        :senderName="senderName"
        :receiverName="receiverName"
        :receiverId="receiverId"
      ></NewChatForm>
    </div>
  </div>
</template>

<script>
import ChatList from '../components/ChatList'
import Loading from "../components/Loading";
import PrivateChat from "../components/PrivateChat";
import LeftSideNavbar from "../components/LeftSideNavbar";
import ChatWindow from "../components/ChatWindow";
import NewChatForm from "../components/NewChatForm";
import { ref, watch } from "vue";
import Navbar from "../components/navbar";
import getLoginUser from "@/composables/getLoginUser";
import { useRouter } from "vue-router";
export default {
  components: {
    ChatList,
    Loading,
    PrivateChat,
    LeftSideNavbar,
    ChatWindow,
    NewChatForm,
    Navbar,
  },
  setup() {
    let { user } = getLoginUser();
    let router = useRouter();
    let isLoading = ref(true);
    let chatPersonData = ref(null); // chat person
    let senderId = ref(""); // message sender
    let receiverId = ref(""); // message receiver
    let senderName = ref(""); // sender name
    let receiverName = ref(""); //receiver name
    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });

    let chatWindow = (chatWindowLoading) => {
      isLoading.value = chatWindowLoading;
    };

    // get chat person data from private chat view
    let addNewChat = (data) => {
      chatPersonData.value = data;
      senderId.value = user.value.uid;
      senderName.value = user.value.displayName;
      receiverId.value = data.id;
      receiverName.value = data.user_name;
    };
    return {
      chatWindow,
      isLoading,
      addNewChat,
      chatPersonData,
      senderId,
      receiverId,
      senderName,
      receiverName,
    };
  },
};
</script>

<style>
.chat-container {
  height: 100vh;
  margin: 0;
  box-shadow: 2px 4px 6px rgba(28, 6, 49, 0.1);
  background: white;
  display: flex;
}
.sidebar {
  width: 20%;
  border-right: 1px solid #eee;
  background-color: #eae4e4;
}
.output {
  width: 80%;
  box-shadow: -10px 0px 10px rgba(218, 180, 180, 0.1);
}
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
@/composables/getLoginUser
