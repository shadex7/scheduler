<template>
  <div class="tasks">
    <h2>Список задач</h2>

    <div class="list-task">
      <button
        v-if="btnAdd"
        class="btn-submit"
        @click="showModal({ date: null, text: '' }, true, false)"
      >
        Добавить
      </button>
      <span>{{ TitleOfList }}</span>
      <div class="task" v-for="item in arr" :key="item.id">
        <p class="date">{{ item.dateOut }}</p>
        <p class="text">{{ item.text }}</p>
        <button
          type="submit"
          class="btn-submit edit"
          @click="showModal(item, false, true)"
        >
          Редактировать
        </button>
        <button
          type="submit"
          class="btn-submit delete"
          @click="delTask(item.id)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
  <modal-window
    v-if="show"
    :text="tText"
    :date="tDate"
    :title="title"
    :visibleAdd="visibleAdd"
    :visibleEdit="visibleEdit"
    @close="closeModal"
    @updateTask="updateTask"
    @deleteTask="delTask"
    @addTasks="addTasks"
  />
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  name: "ListOfTasks",
  props: ["arrayTasks"],
  emits: ["updateTask", "deleteTask", "addTasks"],
  components: {
    ModalWindow,
  },

  data() {
    return {
      show: false,
      tDate: null,
      tText: "",
      newTask: {},
      visibleAdd: false,
      visibleEdit: false,
      title: "",
    };
  },

  methods: {
    showModal(elem, visAdd, visEdit) {
      this.newTask = Object.assign({}, elem);
      this.tDate = elem.date;
      this.tText = elem.text;
      this.show = true;
      if (visAdd == true) {
        this.visibleAdd = visAdd;
        this.visibleEdit = visEdit;
        this.title = "Добавить задачу";
      } else {
        this.visibleAdd = visAdd;
        this.visibleEdit = visEdit;
        this.title = "Редактировать задачу";
      }
    },

    closeModal() {
      this.show = false;
    },

    updateTask(newText, newDate) {
      this.newTask.text = newText;
      this.newTask.date = newDate;
      this.newTask.dateOut = newDate.toLocaleString().replace("T", " -- ");
      this.$emit("updateTask", this.newTask);
      this.newTask = {};
    },

    delTask(id) {
      this.$emit("deleteTask", id);
    },

    addTasks(newText, newDate) {
      this.newTask = {};
      this.newTask.text = newText;
      this.newTask.date = newDate;
      this.newTask.dateOut = newDate.toLocaleString().replace("T", " -- ");
      this.$emit("addTasks", this.newTask);
    },
  },

  computed: {
    arr() {
      const sortedArr = this.arrayTasks.slice().sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return sortedArr;
    },

    TitleOfList() {
      return this.$store.getters.StSubTitleOfList;
    },

    btnAdd() {
      return this.$store.getters.StBtnAddOfList;
    },
  },
};
</script>

<style>
</style>