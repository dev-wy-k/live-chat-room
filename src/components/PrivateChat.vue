<template>
  <div class="private-container">
    <button @click="privateModalClick" class="text-gray-200">new chat</button>
  </div>
  <div class="popup" v-if="privateChatModal">
    <div class="modal-content m-[20px]">
      <h2 class="text-center font-bold">New Chat</h2>
      <div class="users">
        <div
          class="single-user flex items-center py-1"
          @click="addNewChat(e, user)"
          v-for="user in filterUsers"
          :key="user.id"
        >
          <div>
            <img v-if="user.photo_url" :src="user.photo_url" alt="" />
            <img v-else src="../../public/user.png" alt="" />
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
import getLoginUser from "@/composables/getLoginUser";
import getUsers from "@/composables/getUsers";
import { computed, ref } from "vue";
export default {
  setup(props, context) {
    let privateChatModal = ref(false);
    let { users } = getUsers();
    let { user } = getLoginUser();
    let filterUsers = computed(() => {
      return users.value.filter((data) => data.id != user.value.uid);
    });
    // let privateChatLoading = ref(false);

    let privateModalClick = () => {
      privateChatModal.value = true;
    };

    let groupChatModalClick = () => {
      privateChatModal.value = false;
    };

    let closeModal = () => {
      privateChatModal.value = false;
    };

    let addNewChat = (e, user) => {
      privateChatModal.value = false;
      let obj = {
        id: user.id,
        user_name: user.user_name,
        photo_url: user.photo_url,
      };
      context.emit("addNewChat", obj);
    };

    return {
      privateChatModal,
      privateModalClick,
      closeModal,
      users,
      filterUsers,
      addNewChat,
    };
  },
};
</script>

<style scoped>
.users {
  max-height: 400px;
  overflow: auto;
}
img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
h2 {
  background: #081E40;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.private-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}
button {
  text-decoration: none;
  background: #2b2c33;
  font-weight: normal;
  border: 0;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background: #14172a;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-content {
  width: 400px;
  max-height: 500px;
  background: #141414;
  border-radius: 10px;
  padding: 10px 20px;
}
.single-user {
  border-bottom: 1px solid #656262;
}
.single-user:hover {
  cursor: pointer;
  background: #081e40;
}
.user-name {
  margin-left: 10px;
  font-weight: bold;
}
</style>
