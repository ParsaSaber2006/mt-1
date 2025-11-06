<template>
    <div>
      <auth authMode="register" />
    </div>
</template>
<script>
import Auth from '@/pages/auth/Auth.vue';

export default {
  name: "Login",
  components:{
    Auth,
  }
};
</script>