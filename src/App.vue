<script setup>
import Step from './components/Steps/Step/Step.vue';
import StepGroup from './components/Steps/StepGroup/StepGroup.vue';
import { ref, reactive } from 'vue';

const pessoa = {nome: '', nome2: ''}

</script>

<template>
  <StepGroup :useFieldToBeFilled="false">
    <Step :fieldToBeFilled="pessoa.nome" reference="Tab 1" description="Primeiro Passo">
        <h1>Item do primeiro passo</h1>
    </Step>
    <Step :fieldToBeFilled="pessoa.nome2" reference="Tab 2" description="Segundo Passo">
        <h1>Item do segundo passo</h1>
    </Step>
  </StepGroup>
</template>
