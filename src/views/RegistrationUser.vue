<template>
  <div class="login">
    <router-link class="back" to="/"> &#10229; На главную</router-link>
    <h2>Создать учетную запись</h2>
    <p>Введите Ваше имя:</p>
    <input
      type="text"
      class="input login-input"
      placeholder="Name"
      v-model="nameUser"
    />
    <p>Введите ваш E-mail:</p>
    <input
      type="text"
      class="input login-input"
      placeholder="Email"
      v-model="mail"
    />
    <p>Придумайте пароль:</p>
    <input
      type="password"
      class="input login-input"
      placeholder="Password"
      v-model="pass"
    />
    <button class="btn-submit login-btn" @click="signUp">Регистрация</button>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default {
  name: "RegistrationUser",
  emits: ["registr"],

  data() {
    return {
      mail: "",
      pass: "",
      nameUser: "",
    };
  },

  methods: {
    signUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.mail, this.pass)
        .then((userCredential) => {
          // alert("Login");
          const user = userCredential.user;
          let userID = user.uid;
          let us = this.nameUser;
          let um = this.mail;
          // console.log(us.length);
          if (us.length != 0) {
            this.$store.commit("updateUserName", us);
            localStorage.setItem("userName", JSON.stringify(us));
            updateProfile(auth.currentUser, {
              displayName: us,
            })
              .then(() => {
                console.log("update UserName is succesfull!");
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (us.length === 0) {
            this.$store.commit("updateUserName", um);
            localStorage.setItem("userName", JSON.stringify(um));
          }
          // console.log(this.$store.getters.StUserName);

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