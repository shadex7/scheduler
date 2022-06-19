<template>
  <button type="submit" class="btn" id="logout" @click="logout">Выйти</button>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "LogoutUser",
  emits: ["logout"],

  methods: {
    logout() {
      let isLogout = confirm("Вы действительно хотите выйти?");
      if (!isLogout) return;
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("userID");
          console.log("user logout");
          this.$store.commit("updateBtnLogout", false);
          this.$store.commit(
            "updateSubTitleOfList",
            "Чтобы просмотреть ваши задачи, войдите в свою учетную запись или зарегистрируйтесь"
          );
          this.$store.commit("updateBtnAddOfList", false);
          this.$emit("logout");
          this.$router.push("/");
          this.$store.commit("updateBtnLogin", true);
          this.$store.commit("updateBtnReg", true);
          this.$store.commit("updateUserName", "");
          this.$store.commit("updateTitleMessage", "");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>