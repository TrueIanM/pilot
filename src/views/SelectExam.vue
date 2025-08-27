<template>
  <div class="div">
    <component :is="selectComp" @getLevel="check" :Level="level" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SelectLevel from "../components/SelectLevelComp.vue";
import SelectSubComp from "../components/SelectSubComp.vue";
import { useQuestionsStore } from "../stores/counter";
import router from "../router/index";

let questionStore = useQuestionsStore();
let selectComp = SelectLevel;
const level = ref("");

function check(type, event) {
  switch (type) {
    case 1:
    default:
      switch (event) {
        case "ATPL":
          level.value = "CPL";
          questionStore.exam.level = "CPL";
          break;
        case "ATPL(H)":
          level.value = "CPL(H)";
          questionStore.exam.level = "CPL(H)";
          break;
        default:
          level.value = event;
          questionStore.exam.level = event;
      }
      selectComp = SelectSubComp;
      break;
    case 2:
      switch (event) {
        case "Airlaw":
        default:
          questionStore.exam.subject = "airlaw";
          break;
        case "Aircraft General Knowledge":
          questionStore.exam.subject = "agk";
          break;
        case "Flight Performance and Planning":
          questionStore.exam.subject = "fpp";
          break;
        case "General Navigation":
          questionStore.exam.subject = "nav";
          break;
        case "Human Performance":
          questionStore.exam.subject = "hp";
          break;
        case "IFR Communication":
          questionStore.exam.subject = "icomm";
          break;
        case "Meterology":
          questionStore.exam.subject = "met";
          break;
        case "Operational Procedures":
          questionStore.exam.subject = "ops";
          break;
        case "Principles Of Flight":
          questionStore.exam.subject = "pof";
          break;
        case "VFR Communication":
          questionStore.exam.subject = "vcom";
          break;
      }
      questionStore.exam.isTestMode = true;
      router.push({
        name: "exam"
      });
  }
}
</script>
