<template>
  <div class="login">
    <router-link class="back" to="/"> &#10229; На главную</router-link>
    <h2>Вход</h2>
    <p>Введите ваш E-mail:</p>
    <input
      type="text"
      class="input login-input"
      placeholder="Email"
      v-model="mail"
    />
    <p>Введите пароль:</p>
    <input
      type="password"
      class="input login-input"
      placeholder="Password"
      v-model="pass"
    />
    <button class="btn-submit login-btn" @click="signIn">Войти</button>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginUser",
  emits: ["login"],

  data() {
    return {
      mail: "",
      pass: "",
    };
  },

  methods: {
    signIn() {
      const auth = getAuth();
      // console.log(this.mail);
      signInWithEmailAndPassword(auth, this.mail, this.pass)
        .then((userCredential) => {
          // alert("Login");
          const user = userCredential.user;
          let userID = user.uid;
          // console.log(user);
          if (user.displayName === null) {
            this.$store.commit("updateUserName", user.email);
            localStorage.setItem("userName", JSON.stringify(user.email));
          } else {
            this.$store.commit("updateUserName", user.displayName);
            localStorage.setItem("userName", JSON.stringify(user.displayName));
          }
          localStorage.setItem("userID", JSON.stringify(userID));
          this.$store.commit("updateBtnLogin", false);
          this.$store.commit("updateBtnReg", false);
          this.$store.commit("updateBtnLogout", true);
          this.$store.commit("updateTitleMessage", "Вы вошли как: ");
          this.$store.commit("updateSubTitleOfList", "");
          this.$store.commit("updateBtnAddOfList", true);
          this.$router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
  },
};
</script>

<style>
</style>