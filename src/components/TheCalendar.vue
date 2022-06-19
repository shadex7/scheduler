<template>
  <div class="month">
    <div class="month_header">
      <b @click="decrease">&#8810;</b>
      <h2 class="current_month">{{ arrMonths[month] }}</h2>
      <h2 class="current_year">{{ year }}</h2>
      <b @click="increase">&#8811;</b>
    </div>
    <div class="month_weekdays">
      <div v-for="(d, index) in day" :key="index">{{ d }}</div>
    </div>
    <div class="month_days" v-for="(week, index) in calendar()" :key="index">
      <div
        v-for="(day, index) in week"
        :key="index"
        :class="{
          grey: day === 0,
          tday: day != 0,
          active_day: day.index === currentDate,
        }"
        @click="showModal(item, day, true, false)"
      >
        {{ day.index }}
        <div
          v-for="item in arrayTasks"
          :key="item.id"
          @click.stop="showModal(item, day, false, true)"
        >
          <p
            class="day_text"
            v-if="
              new Date(this.year, this.month, day.index)
                .toLocaleString()
                .slice(0, -10) ==
              new Date(item.date).toLocaleString().slice(0, -10)
            "
          >
            {{ item.text }}
          </p>
        </div>
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
  props: ["arrayTasks"],
  emits: ["updateTask", "deleteTask", "addTasks"],
  components: {
    ModalWindow,
  },

  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      date: new Date(),
      day: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      arrMonths: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      currentDate: new Date().getDate(),

      show: false,
      tDate: null,
      tText: "",
      newTask: {},
      temp: "",
      title: "",
      visibleAdd: true,
      visibleEdit: true,
    };
  },

  methods: {
    showModal(elem, day, visAdd, visEdit) {
      if (elem == undefined) {
        let tzoffset = new Date().getTimezoneOffset();
        this.tDate = new Date(this.year, this.month, day.index, 0, 0 - tzoffset)
          .toISOString()
          .slice(0, -8);
        this.tText = "";
        this.title = "Добавить задачу";
        this.visibleAdd = visAdd;
        this.visibleEdit = !visAdd;
        this.show = true;
      } else {
        this.newTask = Object.assign({}, elem);
        this.tDate = elem.date;
        this.tText = elem.text;
        this.title = "Редактировать задачу";
        this.visibleEdit = visEdit;
        this.visibleAdd = !visEdit;
        this.show = true;
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

    calendar() {
      let days = [];
      let week = 0;
      days[week] = [];
      let dlast = new Date(this.year, this.month + 1, 0).getDate();
      for (let i = 1; i <= dlast; i++) {
        if (new Date(this.year, this.month, i).getDay() != 1) {
          days[week].push({ index: i });
        } else {
          week++;
          days[week] = [];
          days[week].push({ index: i });
        }
      }
      if (days[0].length > 0) {
        for (let i = days[0].length; i < 7; i++) {
          days[0].unshift("");
        }
      }
      return days;
    },

    decrease() {
      this.month--;
      if (this.month < 0) {
        this.month = 12;
        this.month--;
        this.year--;
      }
    },

    increase() {
      this.month++;
      if (this.month > 11) {
        this.month = -1;
        this.month++;
        this.year++;
      }
    },
  },
};
</script>

<style>
</style>