<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, toRaw, watchEffect } from 'vue'
  import { useRouter, useRoute, LocationQuery } from 'vue-router'

  import { LoginParams } from '@/apis/sys/model/user.model'
  import { getCaptchaImage } from '@/apis/sys/user.api'
  import { useUserStore } from '@/store/modules/user.store'

  const loginFormModelRef = reactive<LoginParams>({
    username: 'admin',
    password: 'admin123',
    code: '',
    uuid: '',
  })

  const codeUrl = ref('')
  // 禁止登录状态规则判断
  const loginDisabled = computed(() => {
    return (
      loginFormModelRef.username.trim() === '' ||
      loginFormModelRef.password.trim() === '' ||
      loginFormModelRef.code.trim() === ''
    )
  })

  // 获得验证码
  const getSmsCode = async () => {
    const result = await getCaptchaImage()
    codeUrl.value = 'data:image/gif;base64,' + result.data?.img
    loginFormModelRef.uuid = result.data?.uuid
  }
  onMounted(() => {
    getSmsCode()
  })

  const showPassword = ref(false)

  const handleTogglePasswordStatus = () => {
    showPassword.value = !showPassword.value
  }

  // 页面根据url初始参数设置
  const redirectRef = ref('')
  const queryRef = ref<LocationQuery>({})
  const route = useRoute()

  watchEffect(() => {
    const query = route.query
    if (query) {
      redirectRef.value = query['redirect']?.toString() ?? ''
      queryRef.value = getOtherQuery(query)
    }
  })

  // 登录

  const userStore = useUserStore()
  const router = useRouter()
  const loadingRef = ref<boolean>(false)

  const handleSubmit = async () => {
    try {
      loadingRef.value = true
      const result = toRaw(loginFormModelRef) as LoginParams
      await userStore.login(result)
      // TODO 现在暂时跳转到首页 以后支持根据不同角色首页不同
      router.push({
        path: redirectRef.value || '/',
        query: queryRef.value,
      })
    } catch (error) {
      console.error(`error`, error)
    } finally {
      loadingRef.value = false
    }
    // loadingRef.value = false
  }

  function getOtherQuery(query: LocationQuery) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as LocationQuery)
  }
</script>
<template>
  <div
    class="flex items-center justify-center min-h-screen px-4 py-12 bg-center bg-no-repeat bg-cover  bg-gray-50 sm:px-6 lg:px-8"
    style="background-image: url(/img/login-bgc.jpg)"
  >
    <div class="w-full max-w-sm p-3 px-8 space-y-8 bg-white bg-opacity-75 shadow-lg rounded-xl">
      <div
        class="flex items-center justify-center w-20 h-20 mx-auto -mt-10 text-5xl transform -translate-y-4 bg-white rounded-full "
      >
        <base-icon icon="all" class="mx-auto" />
      </div>
      <div class="space-y-2">
        <div class="relative">
          <input v-model="loginFormModelRef.username" placeholder="请输入用户名" class="input" />
        </div>
        <div class="relative">
          <input
            v-model="loginFormModelRef.password"
            placeholder="请输入密码"
            :type="showPassword ? 'text' : 'password'"
            class="input"
          />
          <div class="suffix" @click.stop="handleTogglePasswordStatus">
            <base-icon icon="all" class="icon"></base-icon>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="w-full h-full leading-8 text-white bg-blue-400 rounded-sm shadow-md"
          @click="handleSubmit"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .input {
    @apply w-full h-8 px-1 outline-none border-2 border-transparent hover:border-blue-400;
  }
  .suffix {
    @apply absolute right-1 top-0 h-full flex justify-center items-center hover:text-blue-400 cursor-pointer;
  }
</style>
