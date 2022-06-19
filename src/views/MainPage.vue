<template>
  <the-header @logout="logout" />
  <div class="main-wrapper">
    <the-calendar
      :arrayTasks="arrayTasks"
      @updateTask="updateTask"
      @deleteTask="deleteTask"
      @addTasks="addTasks"
    />
    <list-of-tasks
      :arrayTasks="arrayTasks"
      @updateTask="updateTask"
      @deleteTask="deleteTask"
      @addTasks="addTasks"
    />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheCalendar from "@/components/TheCalendar.vue";
import ListOfTasks from "@/components/ListOfTasks.vue";
import { getDatabase, ref, get, push, update, remove } from "firebase/database";

export default {
  name: "MainPage",
  components: {
    TheHeader,
    TheCalendar,
    ListOfTasks,
  },

  data() {
    return {
      arrayTasks: [],
      keys: {
        date: new Date(),
        dateOut: 2,
        text: "",
      },
    };
  },

  methods: {
    async getTasks() {
      let userID = JSON.parse(localStorage.getItem("userID"));
      const db = getDatabase();
      const path = ref(db, `tasks/${userID}`);
      let x = await get(path);
      let data = x.val();
      this.arrayTasks = [];
      for (let key in data) {
        this.arrayTasks.push({
          id: `${key}`,
          text: `${data[key].text}`,
          date: `${data[key].date}`,
          dateOut: `${data[key].dateOut}`,
        });
      }
    },

    addTasks(task) {
      let userID = JSON.parse(localStorage.getItem("userID"));
      const db = getDatabase();
      push(ref(db, "tasks/" + userID), task);
      this.getTasks();
    },

    async updateTask(newTask) {
      let userID = JSON.parse(localStorage.getItem("userID"));
      const db = getDatabase();
      await update(ref(db, "tasks/" + userID + "/" + newTask.id), newTask);
      this.getTasks();
    },

    deleteTask(idTask) {
      let userID = JSON.parse(localStorage.getItem("userID"));
      const db = getDatabase();
      remove(ref(db, "tasks/" + userID + "/" + idTask));
      this.getTasks();
    },

    logout() {
      this.arrayTasks = [];
    },
  },

  mounted() {
    this.getTasks();

    let userID = JSON.parse(localStorage.getItem("userID"));
    let userN = JSON.parse(localStorage.getItem("userName"));

    if (userID) {
      this.$store.commit("updateUserName", userN);
      this.$store.commit("updateBtnLogin", false);
      this.$store.commit("updateBtnReg", false);
      this.$store.commit("updateBtnLogout", true);
      this.$store.commit("updateBtnAddOfList", true);
      this.$store.commit("updateSubTitleOfList", "");
      this.$store.commit("updateTitleMessage", "Вы вошли как: ");
    } else {
      console.log("User is not logged in.");
    }
  },
};
</script>

<style>
</style>