<script setup>
import { computed, inject } from "vue";

const props = defineProps({
  reference: String,
  description: String,
  fieldToBeFilled: Object || Array,
});

const isSelected = computed(() => {
  const selectedReference = inject("selectedReference");
  return props.reference === selectedReference.value;
});
</script>

<template>
  <div v-show="isSelected">
    <slot />
  </div>
</template>
