<template>
  <div class="private-container">
    <button @click="privateModalClick">new chat</button>
    <button @click="groupChatModalClick">new group chat</button>
  </div>
  <div class="popup" v-if="privateChatModal || groupChatModal">
    <div class="modal-content">
      <h2 class="text-center">
        {{ privateChatModal ? "New Chat" : "New Group Chat" }}
      </h2>
      <div class="users">
        <div class="single-user" @click="addNewChat(e,user)" v-for="user in users" :key="user.id">
          <div>
            <img v-if="user.photo_url" :src="user.photo_url" alt="" width="40" height="40" />
            <img v-else src="../../public/user.png" alt="" width="40" height="40" />
          </div>
          <div class="user-name">
            <p>{{ user.user_name }}</p>
            {{ allUsers }}
          </div>
        </div>
      </div>
      <div class="text-center">
        <button @click="closeModal">close</button>
      </div>
    </div>
  </div>
</template>

<script>
import getUsers from "@/composables/getUsers";
import { ref } from "vue";
export default {
  setup(props,context) {
    let privateChatModal = ref(false);
    let groupChatModal = ref(false);
    let {users} = getUsers();
    // let privateChatLoading = ref(false);

    let privateModalClick = () => {
      privateChatModal.value = true;
      groupChatModal.value = false;
    };

    let groupChatModalClick = () => {
      groupChatModal.value = true;
      privateChatModal.value = false;
    };

    let closeModal = () => {
      privateChatModal.value = false;
      groupChatModal.value = false;
    };

    let addNewChat = (e,user) => {
      privateChatModal.value = false;
      groupChatModal.value = false;
      let obj = {id:user.id,user_name:user.user_name}
      context.emit('addNewChat',obj);
    }

    return {
      privateChatModal,
      groupChatModal,
      privateModalClick,
      groupChatModalClick,
      closeModal,
      users,
      addNewChat
    };
  },
};
</script>

<style scoped>
img{
  border-radius: 50%;
}
h2 {
  padding-bottom: 10px;
  border-bottom: 1px solid #b5b0b0;
}
.private-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}
button {
  text-decoration: none;
  background: #c8c9cb;
  color: #262424;
  font-weight: bold;
  border: 0;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background: #b8babd;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-content {
  width: 400px;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
}
.single-user {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.single-user:hover{
  background: #eee;
  cursor: pointer;
}
.user-name {
  margin-left: 10px;
  font-weight: bold;
}
</style>
