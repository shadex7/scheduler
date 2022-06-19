<template>
  <div id="myModal" class="modal" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <span class="close" @click="close">&times;</span>
      </div>
      <div class="modal-body">
        <form action="" id="form">
          <span>Введите задачу:</span>
          <textarea
            name="input"
            rows="1"
            autocomplete="off"
            id="input_task"
            v-model="newText"
          ></textarea>
          <span>Установите время:</span>
          <input type="datetime-local" id="input-dt" v-model="newDate" />
          <button
            v-show="visibleAdd"
            type="submit"
            class="btn-submit"
            :disabled="!newText"
            id="add-task"
            @click.prevent="addTasks"
            @click="close"
          >
            Добавить задачу
          </button>
          <button
            v-show="visibleEdit"
            type="submit"
            class="btn-submit"
            id="edit-task"
            @click.prevent="updateTask"
            @click="close"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",

  props: ["text", "date", "visibleAdd", "visibleEdit", "title"],
  emits: ["updateTask", "close", "addTasks"],
  data() {
    return {
      isShow: "none",
      newText: this.text,
      newDate: this.date,
      activeClass: "btn-submit",
      disabledClass: "btn-submit-dis",
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    updateTask() {
      this.$emit("updateTask", this.newText, this.newDate);
    },

    addTasks() {
      this.$emit("addTasks", this.newText, this.newDate);
    },
  },
};
</script>

<style>
</style>