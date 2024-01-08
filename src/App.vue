<script setup>
import Step from './components/Steps/Step/Step.vue';
import StepGroup from './components/Steps/StepGroup/StepGroup.vue';

</script>

<template>
  <StepGroup>
    <Step reference="Tab1" description="Primeiro Passo">
        <h1>Item do primeiro passo</h1>
    </Step>
  </StepGroup>
</template>