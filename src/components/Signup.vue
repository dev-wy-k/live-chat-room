<template>
  <h2 class="font-bold text-xl">Register Your Account</h2>
  <form @submit.prevent="signUp" class="mb-0">
    <input type="file" name="" id="file-upload" @change="fileUpload" hidden />
    <label for="file-upload">
      <div class="flex justify-center">
        <div>
          <img
            v-if="previewImage"
            :src="previewImage"
            alt=""
            class="pointer profile"
          />
          <img
            v-if="!previewImage"
            src="../../public/user.png"
            alt=""
            class="pointer"
          />
        </div>
      </div>
    </label>
    <input type="text" placeholder="display name" v-model="displayName" />
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <button class="pointer">Sign Up</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
import saveImage from "../composables/saveImage";

export default {
  setup(props, context) {
    let displayName = ref("");
    let email = ref("");
    let password = ref("");
    let profileImage = ref(null);
    let previewImage = ref("");
    let url = ref("");
    let { error, createAccount } = useSignup();

    let fileUpload = (e) => {
      profileImage.value = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        previewImage.value = reader.result;
      };
    };

    let signUp = async () => {
      profileImage.value && (url.value = await saveImage(profileImage.value));
      let res = await createAccount(
        email.value,
        password.value,
        displayName.value,
        url.value
      );
      if (res) {
        context.emit("enterChatroom");
      }
    };

    return {
      displayName,
      email,
      password,
      signUp,
      error,
      fileUpload,
      previewImage,
      profileImage,
    };
  },
};
</script>

<style scoped>
img{
  width: 100px;
  height: 100px;
}
.profile {
  border-radius: 50%;
}
</style>
