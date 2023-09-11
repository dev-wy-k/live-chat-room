<template>
    <nav v-if="user">
      <div>
        <p><span class="rgb-color">{{ user.displayName }}</span></p>
        <p class="email">logged in as {{ user.email }}</p>
      </div>
    </nav>
  </template>
  
  <script>
  import getUser from "../composables/getUser";
  export default {
    setup() {
      let {user} = getUser();
    
      return { user };
    },
  };
  </script>
  
  <style></style>
  