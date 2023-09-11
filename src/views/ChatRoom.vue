<template>
  <Loading></Loading>
  <div class="chat-container">
      <div class="sidebar">
        <LeftSideNavbar></LeftSideNavbar>
        <PrivateChat></PrivateChat>
      </div>
      <div class="output">
        <Navbar></Navbar>
        <ChatWindow></ChatWindow>
        <NewChatForm></NewChatForm>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import PrivateChat from '../components/PrivateChat'
import LeftSideNavbar from '../components/LeftSideNavbar'
import ChatWindow from "../components/ChatWindow";
import NewChatForm from "../components/NewChatForm";
import { watch } from "vue";
import Navbar from "../components/navbar";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
export default {
  components: {
    Loading,
    PrivateChat,
    LeftSideNavbar,
    ChatWindow,
    NewChatForm,
    Navbar,
  },
  setup() {
    let { user } = getUser();
    let router = useRouter();
    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });
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
