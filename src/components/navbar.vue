<template>
  <nav>
    <div>
      <p>Hi username</p>
      <p class="email">logged in as email</p>
    </div>
    <button @click="userLogout">Logout</button>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout';
export default {
  setup() {
    let {error, logout} = useLogout();
    let userLogout = async () => {
      await logout();
    };
    return { userLogout,error };
  },
};
</script>

<style></style>
