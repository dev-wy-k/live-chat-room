<template>
    <nav v-if="user"  class="pt-[8px] pl-[10px] pr-[2px]">
     <div class="flex items-center">
      <div>
        <img :src="user.photoURL" alt="profile">
      </div>
      <div class="ml-2">
        <p><span class="rgb-color">{{ user.displayName }}</span></p>
        <p class="email">{{ user.email }}</p>
      </div>
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
  
  <style>
  nav{
    padding-top: 8px;
  }
  img{
    width: 40px !important;
    height: 40px !important;
    border-radius: 50%;
  }
</style>