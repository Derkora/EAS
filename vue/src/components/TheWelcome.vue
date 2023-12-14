<script setup>
import { ref } from "vue";

let database = ref([
  {
    name: "Steven Figo",
    nrp: "5027221021"
  },
])
</script>

<template>
  <ul>
      <li v-for="(item, index) in database" :key="index">
        Nama: {{ item.name }} <br>
        NRP: {{ item.nrp }}
      </li>
    </ul>
</template>

<style scoped>
  .li {
    margin: 5px;
  }
</style>