<script setup lang="ts">
import { example } from '@/api/example';

//开发时请删除示例
const msg = 'Hello Vite + Vue 3!';
const { run: _example } = useRequest(() => example(1), {
  manual: true,
  onSuccess: (res: number) => {
    console.log(res);
  },
});

_example();
</script>

<template>
  <el-text class="font-bold">{{ msg }}</el-text>
</template>

<style scoped lang="scss"></style>
