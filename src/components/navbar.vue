<template>
  <nav v-if="user">
    <div>
      <p><span class="rgb-color">{{ user.displayName }}</span></p>
      <p class="email">logged in as {{ user.email }}</p>
    </div>
    <button @click="userLogout" class="pointer">Logout</button>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
export default {
  setup() {
    let { error, logout } = useLogout();
    let {user} = getUser();
    
    let userLogout = async () => {
      await logout();
    };

    return { userLogout, error, user };
  },
};
</script>

<style></style>
