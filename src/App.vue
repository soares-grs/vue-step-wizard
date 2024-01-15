<script setup>
import Step from './components/Steps/Step/Step.vue';
import StepGroup from './components/Steps/StepGroup/StepGroup.vue';
import { ref, reactive } from 'vue';

const pessoa = {nome: '', nome2: ''}

</script>

<template>
  <StepGroup>
    <Step :fieldToBeFilled="pessoa.nome" reference="Tab 1" description="First Step">
        <h1>First Item</h1>
    </Step>
    <Step :fieldToBeFilled="pessoa.nome2" reference="Tab 2" description="Second Step">
        <h1>Second Item</h1>
    </Step>
  </StepGroup>
</template>
