<template>
  <nav class="p-[8px] bg-black border-b-1 border-b-gray-800">
    <div v-if="user">
      <div class="flex justify-center items-center m-0 p-0">
        <div>
          <img @click="backArrow" src="../../public/arrow-left.png" class="arrow ml-1 cursor-pointer mr-2 md:hidden" alt="">
        </div>
        <div>
          <img :src="user.photo_url" alt="" />
        </div>
        <div class="margin-left">
          <p>
            <span class="text-gray-300">{{ user.user_name }}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>
        <span class="text-gray-300">Let's connect together</span>
      </p>
    </div>
    <button @click="userLogout" class="pointer font-normal mr-3 px-[20px] py-[7px]">Logout</button>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import useLogout from "../composables/useLogout";
export default {
  props: ["chatPersonData"],
  setup(props,context) {
    let user = computed(() => props.chatPersonData);
    let mobileView = ref(false);
    let { error, logout } = useLogout();

    let userLogout = async () => {
      await logout();
    };

    let backArrow = () => {
      mobileView.value = true;
      context.emit("backArrow",mobileView.value);
    }

    return { userLogout, error, user,backArrow };
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
.arrow{
  width: 20px;
  height: 20px;
  background: white;
}
</style>
../composables/getLoginUser
