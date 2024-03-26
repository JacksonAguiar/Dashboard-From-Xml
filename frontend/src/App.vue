<script setup lang="ts">

import { ref, onMounted } from 'vue';
import UploadButton from './components/UploadComponent.vue'
import DashboardView from './components/DashboardComponent.vue'
import MetricsService from "./services/MetricsService";

const service = new MetricsService();

let data = ref<{}>();
let isNew = ref<boolean>(false);

const processDataFromApi = (response: any) => {
  response.futureIncome = formatCurrency(response.futureIncome);
  response.ltv = formatCurrency(response.ltv);

  data.value = response;
}

onMounted(async () => {
  try {
    let resp = await service.FetchData();
    let response = resp?.data;

    if (!!response) {
      console.log("chegou aqui")
      console.log(response);
      processDataFromApi(response);
    } else {
      isNew.value = true;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const formatCurrency = (amount: any) => {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const onSubmit = async (ref: any) => {
  const file: File = ref._value;

  const resp = await service.UploadFile(file);
  let response = resp?.data;
  processDataFromApi(response);

  isNew.value = false;
}

const newFileUpload = () => {
  isNew.value = true;
}
</script>

<template>
  <div class="h-screen">
    <UploadButton :onSubmit v-if="isNew" />
    <DashboardView :newFileUpload :data="data" v-if="data" />
  </div>
</template>
