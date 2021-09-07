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
  <van-cell-group inset>
    <van-field
      v-model="template"
      readonly
      label="模板"
      center
      placeholder="选择模板"
      @click="showPicker = true"
    >
      <template #button>
        <van-button
          size="small"
          class="whitespace-nowrap"
          icon="delete"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          @click.stop="handleRemoveTemplate"
        >
          清空
        </van-button>
      </template>
    </van-field>
  </van-cell-group>

  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
  </van-popup>
</template>

<style lang="scss" scoped></style>
