<template>
  <Loading :isLoading="isLoading" />
  <div class="grid md:grid-cols-5 h-[100vh]">
    <div
      class="left-sidebar hidden md:block"
      :class="{ showSidebar: mobileViewStatus }"
    >
      <LeftSideNavbar class="border-b-1 border-b-gray-600"></LeftSideNavbar>
      <PrivateChat @addNewChat="addNewChat"></PrivateChat>
      <ChatList
        @addNewChat="addNewChat"
        :receiverId="receiverId"
        :senderId="senderId"
        @ChatList="ChatList"
      ></ChatList>
    </div>
    <div
      class="md:col-span-4 bg-gray-900"
      :class="{ hideOutput: mobileViewStatus }"
    >
      <Navbar :chatPersonData="chatPersonData" @backArrow="backArrow"></Navbar>
      <div v-if="receiverId">
        <ChatWindow
          @chatWindow="chatWindow"
          :mobileViewStatus="mobileViewStatus"
          :senderId="senderId"
          :receiverId="receiverId"
        ></ChatWindow>
        <NewChatForm
          :senderId="senderId"
          :senderName="senderName"
          :receiverName="receiverName"
          :receiverId="receiverId"
          :photoUrl="photo_url"
        ></NewChatForm>
      </div>
    </div>
    <div
      v-if="!receiverId"
      class="hidden md:block md:col-span-4 formload-background"
    ></div>
  </div>
</template>

<script>
import ChatList from "../components/ChatList";
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
    let photo_url = ref(""); // receiver photo url
    let mobileViewStatus = ref(true);
    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });

    let chatWindow = (chatWindowLoading) => {
      isLoading.value = chatWindowLoading;
    };
    let ChatList = (chatListLoading) => {
      isLoading.value = chatListLoading;
    };

    // get chat person data from private chat view
    let addNewChat = (data) => {
      mobileViewStatus.value = false;
      chatPersonData.value = data;
      senderId.value = user.value.uid;
      senderName.value = user.value.displayName;
      receiverId.value = data.id;
      receiverName.value = data.user_name;
      photo_url.value = data.photo_url;
    };

    //get event back arrow event from navbar
    let backArrow = (val) => {
      mobileViewStatus.value = val;
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
      photo_url,
      backArrow,
      mobileViewStatus,
      ChatList,
    };
  },
};
</script>

<style>
.left-sidebar {
  background: #141414;
}
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
.showSidebar {
  display: block !important;
}
.hideOutput {
  display: none !important;
}
.formload-background {
  background-image: url("../../public/chat-bg.jpg");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
@/composables/getLoginUser
