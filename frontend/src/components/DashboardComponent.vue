<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, LineController, LineElement, Legend, PointElement, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { defineProps } from 'vue';

ChartJS.register(Title, Tooltip, Legend, LineController, LineElement, BarElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({
  newFileUpload: Function,
  data: Object
});

let mrrLabels = [];
let churnLabel = [];

let churnValues = [];
let mrrValues = [];

if (props.data) {
  mrrLabels = props.data.mrr ? (props.data.mrr as []).map((e: any) => e.period).slice(-8) : [];
  churnLabel = props.data.churn ? (props.data.churn as []).map((e: any) => e.period).slice(-8) : [];

  mrrValues = (props.data.mrr as []).map((e: any) => e.value).slice(-8);
  churnValues = (props.data.churn as []).map((e: any) => e.value).slice(-8);
}

const myStyles = {
  height: `400px`,
  width: "100%",
  position: 'relative',
  maxWidth: "650px"
};

const mrrChartData = {
  labels: mrrLabels,
  datasets: [
    {
      label: 'Monthly Recurring Revenue (MRR)',
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      data: mrrValues,
      tension: 0.1
    },
  ]
};
const churnChartData = {
  labels: churnLabel,
  datasets: [

    {
      label: 'Churn',
      borderColor: 'rgb(215, 0, 64)',
      backgroundColor: 'rgb(215, 0, 64,0.2)',
      data: churnValues,
      tension: 0.1
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const upload = () => props.newFileUpload!();

</script>

<template>
  <div class="light flex h-full p-5">
    <div class="flex h-full flex-col w-full border-2 p-4 rounded-xl ">
      <header class="flex w-full justify-between">
        <div>
          <h1 class="text-2xl">Dashboard</h1>
          <span v-if="!!props.data?.latest">Ultimo arquivo processado: {{ props.data?.latest }}</span>
          <span v-else>Dados processados do arquivo</span>
        </div>
        <button v-on:click="upload" type="button"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-upload">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
          </svg>
          <span class="ml-2">
            Carregar novo arquivo
          </span>
        </button>
      </header>
      <div class="flex w-full justify-around">
        <div>
          <Line id="my-chart-id" :options="options" :style="myStyles" :data="mrrChartData" />
        </div>
        <div>
          <Line id="my-chart-id-2" :options="options" :style="myStyles" :data="churnChartData" />
        </div>
      </div>
      <div class="flex h-full space-x-5 mt-5 p-6">
        <div class="bg-black w-1/3 h-full rounded-xl p-6 flex flex-col justify-between">
          <h3 class="font-semibold text-lg text-white/70">
            Taxa de renovação(atual)
          </h3>
          <div>
            <h2 class="font-bold text-3xl text-white">
              {{ props.data?.renewalRate }}
            </h2>
            <span class="text-xs text-white/70">Considerando hoje como data de refência</span>
          </div>
        </div>
        <div class="bg-black w-1/3 h-full rounded-xl p-6 flex flex-col justify-between">
          <h3 class="font-semibold text-lg text-white/70">LTV(Lifetime value - Valor vitalício)</h3>
          <div>
            <h2 class="font-bold text-3xl text-white">
              {{ props.data?.ltv }}
            </h2>
            <span class="text-xs text-white/70">Para todos os clientes carregados</span>
          </div>
        </div>
        <div class="bg-black w-1/3 h-full rounded-xl p-6 flex flex-col justify-between">
          <h3 class="font-semibold text-lg text-white/70">Receita futura(Aproximadamente)</h3>
          <div>
            <h2 class="font-bold text-3xl text-white">
              {{ props.data?.futureIncome }}
            </h2>
            <span class="text-xs text-white/70">Próximos 3 meses e considerando um churn médio de 5%/mês</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
