<template>
  <header class="header">
    <h1 class="header_name" @click="$router.push('/')">Schedular App</h1>
    <div class="hello">
      {{ title }} &nbsp;&nbsp;&nbsp; <span>{{ uName }}</span>
    </div>
    <div class="header_btn-wrapper">
      <button
        class="btn"
        id="login"
        v-if="isVisibleLogin"
        @click="$router.push('/log')"
      >
        Вход
      </button>
      <button
        class="btn"
        id="registr"
        v-if="isVisibleRegistration"
        @click="$router.push('/reg')"
      >
        Регистрация
      </button>
      <LogoutUser v-if="isVisibleLogout" @logout="logout" />
    </div>
  </header>
</template>

<script>
import LogoutUser from "@/components/LogoutUser.vue";
import { mapGetters } from "vuex";

export default {
  name: "TheHeader",
  components: {
    LogoutUser,
  },
  emits: ["logout"],

  methods: {
    logout() {
      this.$emit("logout");
    },
  },

  computed: {
    ...mapGetters({
      uName: "StUserName",
      title: "StTitleMessage",
      isVisibleLogin: "StBtnLogin",
      isVisibleRegistration: "StBtnReg",
      isVisibleLogout: "StBtnLogout",
    }),

    // uName() {
    //   return this.$store.getters.StUserName;
    // },

    // title() {
    //   return this.$store.getters.StTitleMessage;
    // },

    // isVisibleLogin() {
    //   return this.$store.getters.StBtnLogin;
    // },

    // isVisibleRegistration() {
    //   return this.$store.getters.StBtnReg;
    // },

    // isVisibleLogout() {
    //   return this.$store.getters.StBtnLogout;
    // },
  },
};
</script>

<style>
</style>