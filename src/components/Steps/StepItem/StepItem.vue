<script setup>
import { filledService } from "../service/steps/filled-service.js";
import { stepItemService } from "../service/steps/step-item-service.js";

const props = defineProps(["index", "selectedReference", "info", "stepInfos", "useFieldToBeFilled"]);

const emits = defineEmits(["selectStep"]);

</script>

<template>
  <li
    class="flex justify-center items-center p-2 m-8 w-10 h-10 rounded-full relative"
    :class="stepItemService.stepItemClass(index, selectedReference, info, stepInfos, useFieldToBeFilled, stepFilled)"
    v-tooltip="stepItemService.stepItemTooltip(info, selectedReference, index, useFieldToBeFilled, stepFilled)"
    @click="stepItemService.stepItemClickAction(index, useFieldToBeFilled, stepFilled, $emit, stepInfos)"
  >
    <p>{{ index + 1 }}</p>
    <p
      class="absolute top-9 lg:w-32 text-base text-center lg:mt-3 ml-3 lg:mx-auto text-slate-600"
    >
      {{ info.description }}
    </p>

    <div
      v-if="index < stepInfos.length - 1"
      class="absolute -z-10 h-1 bg-gray-300 left-1/2 transform -translate-y-1/2"
      :style="{ width: '280%', marginLeft: '12px' }"
    ></div>
  </li>
</template>
