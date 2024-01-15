<script setup>
import { useSlots, ref, provide, watch, computed } from "vue";
import StepItem from "../StepItem/StepItem.vue";
import { filledService } from '../service/steps/filled-service.js';

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

const currentStepIndex = computed(() => {
  return stepInfos.value.findIndex(
    (step) => step.reference === selectedReference.value
  );
});

const isCurrentStepFilled = computed(() => {
  return filledService.isFieldFilled(stepInfos.value[currentStepIndex.value]);
});

const isFirstStep = computed(() => {
  return currentStepIndex.value === 0;
});

const isLastStep = computed(() => {
  return currentStepIndex.value === stepInfos.value.length - 1;
});

const goToPreviousStep = () => {
  if (isFirstStep.value) {
    router.back();
  } else {
    const previousStepReference =
      stepInfos.value[currentStepIndex.value - 1].reference;
    selectedReference.value = previousStepReference;
  }
};

const goToNextStep = () => {
  if(props.useFieldToBeFilled) {
    if (!isLastStep.value && isCurrentStepFilled.value) {
      const nextStepReference =
        stepInfos.value[currentStepIndex.value + 1].reference;
      selectedReference.value = nextStepReference;
    }
  } else {
    const nextStepReference =
        stepInfos.value[currentStepIndex.value + 1].reference;
      selectedReference.value = nextStepReference;
  }
};

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

    <!-- Back and Next Buttons -->
    <div class="flex w-full justify-center mt-8">
      <div class="w-[84%] flex flex-row justify-center">
        <button
          class="bg-white hover:bg-gray-200 w-[80px] rounded border border-gray-200 shadow-sm py-1"
          @click="goToPreviousStep"
          :disabled="isFirstStep"
        >
          Back
        </button>
        <button
          class="bg-[#8FAF4A] hover:bg-[#99bb53] border-[#99bb53] text-white w-[80px] hover:cursor-pointer rounded border shadow-sm py-1 ml-3"
          :class="{
            'bg-opacity-70 hover:bg-opacity-70 hover:cursor-not-allowed':
              isLastStep || (useFieldToBeFilled && !isCurrentStepFilled) ,
          }"
          v-tooltip="isLastStep || (useFieldToBeFilled && !isCurrentStepFilled) ? 'Complete the current step to advance' : ''"
          @click="goToNextStep"
          :disabled="isLastStep || (useFieldToBeFilled && !isCurrentStepFilled) "
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
