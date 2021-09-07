<script lang="ts" setup>
  import { ref } from 'vue'

  const columns = ['模板1', '模板2', '模板3', '模板4', '模板5', '模板6']

  const template = ref('')
  const handleRemoveTemplate = () => {
    template.value = ''
  }
  const showPicker = ref(false)
  const onConfirm = (value: string) => {
    template.value = value
    showPicker.value = false
  }
</script>

<template>
  <GlobalHeader left-arrow />
  <div class="flex">
    <van-field
      v-model="template"
      is-link
      readonly
      label="模板"
      placeholder="选择模板"
      @click="showPicker = true"
    />
    <van-button
      class="whitespace-nowrap"
      icon="delete"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      @click="handleRemoveTemplate"
    >
      清空
    </van-button>
  </div>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
  </van-popup>
</template>

<style lang="scss" scoped></style>
