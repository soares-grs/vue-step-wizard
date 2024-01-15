<script setup>
import { computed, inject, ref } from "vue";

const props = defineProps({
  reference: String,
  description: String,
  fieldToBeFilled: Object || Array,
});

const selectedReference = inject("selectedReference", ref(null));

const isSelected = computed(() => {
  return props.reference === selectedReference.value;
});
</script>

<template>
  <div class="flex justify-center" v-show="isSelected">
    <slot />
  </div>
</template>
