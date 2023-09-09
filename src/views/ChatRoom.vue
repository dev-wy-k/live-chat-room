<template>
  <div class="container">
    <Navbar></Navbar>
    <NewChatForm></NewChatForm>
  </div>
</template>

<script>
import NewChatForm from '../components/NewChatForm'
import { watch } from 'vue';
import Navbar from "../components/navbar";
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';
export default {
  components: {
    NewChatForm, Navbar },
  setup(){
    let {user} = getUser();
    let router = useRouter();
    watch(user,()=> {
      if(!user.value){
        router.push({name:"Welcome"})
      }
    })
  }
};
</script>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
