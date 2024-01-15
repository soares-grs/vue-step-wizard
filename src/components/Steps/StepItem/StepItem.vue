<script setup>
import { filledService } from "../service/filled-service";

const props = defineProps(["index", "selectedReference", "info", "stepInfos", "useFieldToBeFilled"]);

const emits = defineEmits(["selectStep"]);

</script>

<template>
  <li
    class="flex justify-center items-center p-2 m-8 w-10 h-10 rounded-full relative"
    :class="[
      useFieldToBeFilled &&
      !filledService.isPreviousStepFilled(index, stepInfos)
        ? 'opacity-80 cursor-not-allowed'
        : 'cursor-pointer',
      useFieldToBeFilled
        ? filledService.isFieldFilled(info)
          ? 'bg-green-500 text-white hover:cursor-pointer'
          : selectedReference === info.reference
            ? 'bg-[#314270] hover:bg-[#243155] hover:cursor-pointer text-white'
            : 'bg-slate-100 text-[#314270]'
        : selectedReference === info.reference
          ? 'bg-[#314270] hover:bg-[#243155] hover:cursor-pointer text-white'
          : 'bg-slate-100 text-[#314270]',
    ]"
    v-tooltip="
      useFieldToBeFilled && !filledService.isFieldFilled(info) && selectedReference !== info.reference
        ? `Preencha a etapa ${index} para liberar esta etapa`
        : info.description
    "
    @click="!useFieldToBeFilled || stepFilled ? $emit('selectStep') : filledService.isPreviousStepFilled(index, stepInfos) && $emit('selectStep')"
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
