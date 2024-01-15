<script setup>
import { useSlots, ref, provide, watch, computed } from "vue";
import StepItem from "../StepItem/StepItem.vue";

const props = defineProps(["validatePreviousStep", "useFieldToBeFilled"]);

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

const selectStep = (index) => {
  selectedReference.value = stepInfos.value[index].reference;
  console.log('No step group', selectedReference.value);
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
});

</script>

<template>
  <div class="w-full">
    <ul class="flex justify-center gap-8 relative z-10 mt-4 pb-8">
      <span v-for="(info, index) in stepInfos" :key="index">
        <StepItem
          @select-step="selectStep(index)"
          :index="index"
          :info="info"
          :selectedReference="selectedReference"
          :stepInfos="stepInfos"
          :useFieldToBeFilled="useFieldToBeFilled"
        />
      </span>
    </ul>
    <slot />
  </div>
</template>
