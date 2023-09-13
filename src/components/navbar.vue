<template>
  <nav class="p-[8px]">
    <div v-if="user">
      <div class="flex justify-center items-center m-0 p-0">
        <div>
          <img :src="user.photo_url" alt="" />
        </div>
        <div class="margin-left">
          <p>
            <span class="rgb-color">{{ user.user_name }}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>
        <span class="rgb-color">Let's connect together</span>
      </p>
    </div>
    <button @click="userLogout" class="pointer font-normal">Logout</button>
  </nav>
</template>

<script>
import { computed } from "vue";
import useLogout from "../composables/useLogout";
export default {
  props: ["chatPersonData"],
  setup(props) {
    let user = computed(() => props.chatPersonData);
    let { error, logout } = useLogout();

    let userLogout = async () => {
      await logout();
    };

    return { userLogout, error, user };
  },
};
</script>

<style scoped>
.navbar-chat-person {
  display: flex;
  align-items: center;
}
.margin-left {
  margin-left: 7px;
}
img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
../composables/getLoginUser
