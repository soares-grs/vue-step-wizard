<template>
  <div class="w-full">
    <ul class="flex justify-center gap-8 relative z-10 mt-4 pb-8">
      <li
        v-for="(info, index) in stepInfos"
        :key="info"
        class="flex justify-center items-center p-2 m-8 w-10 h-10 rounded-full relative"
        :class="[
          !isPreviousStepFilled(index) ? 'opacity-80 cursor-not-allowed' : '',
          !isFieldFilled(info)
            ? selectedReference === info.reference
              ? 'bg-[#314270] hover:bg-[#243155] hover:cursor-pointer text-white'
              : 'bg-slate-100 text-[#314270]'
            : isFieldFilled(info)
            ? 'bg-green-500 text-white hover:cursor-pointer'
            : '',
        ]"
        v-tooltip="
          !isFieldFilled(info) && selectedReference !== info.reference
            ? `Preencha a etapa ${index} para liberar esta etapa`
            : info.description
        "
        @click="isPreviousStepFilled(index) && selectStep(index)"
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
    </ul>

    <slot />
  </div>
</template>

<script setup>
import { useSlots, ref, provide, watch, computed } from "vue";

const props = defineProps(["validatePreviousStep"]);

const slots = useSlots();

const stepInfos = ref(
  slots.default().map((step) => {
    const fieldToBeFilled = step.props.fieldToBeFilled;
    return {
      reference: step.props.reference,
      description: step.props.description,
      fieldToBeFilled: Array.isArray(fieldToBeFilled)
        ? fieldToBeFilled
        : [fieldToBeFilled],
    };
  })
);

const selectedReference = ref(stepInfos.value[0].reference);

provide("selectedReference", selectedReference);

const isFieldFilled = (info) => {
  return (
    info?.fieldToBeFilled &&
    info.fieldToBeFilled.length > 0 &&
    info.fieldToBeFilled.every((field) => field?.id ?? field?.length > 0)
  );
};

const isPreviousStepFilled = (index) => {
  if (index > 0) {
    const previousStep = stepInfos.value[index - 1];
    return isFieldFilled(previousStep);
  }
  return true;
};

const selectStep = (index) => {
  selectedReference.value = stepInfos.value[index].reference;
};

const computedFieldsToBeFilled = computed(() =>
  slots.default().map((step) => {
    const field = step.props.fieldToBeFilled;
    return Array.isArray(field) ? field : [field];
  })
);

watch(computedFieldsToBeFilled, (newFieldsToBeFilledList) => {
  if (newFieldsToBeFilledList.length === stepInfos.value.length) {
    newFieldsToBeFilledList.forEach((newFieldsToBeFilled, index) => {
      stepInfos.value[index].fieldToBeFilled = newFieldsToBeFilled;
    });
  }
  console.log("NEW VALUE", stepInfos.value);
});
</script>
