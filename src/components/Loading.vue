<template>
  <div id="overlay" v-if="status">
    <div className="loader" >
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props:['isLoading'],
  setup(props){
    let status = computed(() => props.isLoading);;

    return {status}
  }
}
</script>

<style scoped>
.loader {
  border: 5px solid #e3c6c6;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 35px;
  height: 35px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>