<template>
  <div class="home">
    <landing-page msg="Welcome to Svens Premium Barbershop" />
  </div>
</template>

<script>
// @ is an alias to /src
import LandingPage from "../components/LandingPage.vue";

export default {
  name: "Home",
  components: {
    LandingPage,
  },
};
</script>
