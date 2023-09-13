<template>
    <nav v-if="user">
      <div>
        <p><span class="rgb-color">{{ user.displayName }}</span></p>
        <p class="email">{{ user.email }}</p>
      </div>
    </nav>
  </template>
  
  <script>
  import getLoginUser from "../composables/getLoginUser";
  export default {
    setup() {
      let {user} = getLoginUser();
    
      return { user };
    },
  };
  </script>
  
  <style></style>