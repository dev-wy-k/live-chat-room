<template>
  <nav v-if="user">
    <div>
      <p>
        <span class="rgb-color">{{ user.user_name }}</span>
      </p>
      <p class="email">logged in as {{ user.id }}</p>
    </div>
    <button @click="userLogout" class="pointer">Logout</button>
  </nav>
</template>

<script>
import { computed } from "vue";
import useLogout from "../composables/useLogout";
export default {
  props: ['chatPersonData'],
  setup(props) {
    let user = computed(() => props.chatPersonData);;
    let { error, logout } = useLogout();

    let userLogout = async () => {
      await logout();
    };

    return { userLogout, error , user };
  },
};
</script>

<style></style>
../composables/getLoginUser
