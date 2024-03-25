<script setup lang="ts">

import { Upload, FileCheck2, X } from 'lucide-vue-next'
import { ref } from 'vue'

const input = ref<HTMLInputElement>()
const props = defineProps(['onSubmit'])

let file = ref<any>()
let fileName = ref<string>('')
let fileSize = ref<string>('')

function formatFileSizeString(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function onOpen() {
  if (input && input.value && fileName.value == "")
    input.value.click()
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const _file = input.files && input.files[0];

  if (_file) {
    file.value = _file;
    fileName.value = _file.name;
    fileSize.value = formatFileSizeString(_file.size);
  }
};

const clearSelection = () => {
  fileName.value = ""
  if (input.value) {
    input!.value!.value = '';
  }
};

const sendData = () => {
  props.onSubmit(file);
}

</script>

<template>
  <div class=" light flex flex-col justify-center items-center h-screen">
    <h3 class="mb-4 font-semibold text-xl">Selecione um arquivo para começar</h3>
    <div v-if="fileName != ''" class="flex flex-col justify-center items-center">
      <div class="bg-green-200 rounded-md flex items-center justify-center px-2 py-2">
        <FileCheck2 class="text-green-700 mr-2" :size="40" />
        <div class="flex flex-col mr-6 leading-none">
          <span class="text-green-700 text-lg">{{ fileName }}</span>
          <span class="text-green-700 text-sm">{{ fileSize }}</span>
        </div>
        <button v-on:click="clearSelection">
          <X :size="14" class="text-red-500" />
        </button>
      </div>
      <button type="button" v-on:click="sendData"
        class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continuar</button>
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <div
        class="w-80 cursor-pointer p-4 flex flex-col justify-center items-center border-2 border-dashed border-black rounded-2xl hover:scale-105 transition-transform"
        v-on:click="onOpen">
        <Upload :size="100" />
        <input ref="input" type="file" class="hidden" @change="handleFileUpload" accept=".csv,.xlsx" />
        <span class="mt-4">Clique para selecionar um arquivo .csv</span>
      </div>
    </div>
  </div>
</template>