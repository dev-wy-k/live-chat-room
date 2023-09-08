import { createRouter, createWebHistory } from "vue-router";
import Welcome from '../views/Welcome.vue';
import ChatRoom from '../views/ChatRoom.vue';

const routes = [
  {
    path:"/",
    name:"Welcome",
    component:Welcome
  },
  {
    path:"/chatroom",
    name:"ChatRoom",
    component:ChatRoom
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
