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
      loginFormModelRef.username.trim() === '' || loginFormModelRef.password.trim() === '' //||
      // loginFormModelRef.code.trim() === ''
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

  // const showPassword = ref(false)

  // const handleTogglePasswordStatus = () => {
  //   showPassword.value = !showPassword.value
  // }

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
    <div class="w-full max-w-sm p-2 px-4 space-y-8 bg-white bg-opacity-75 shadow-lg rounded-xl">
      <div
        class="flex items-center justify-center w-20 h-20 mx-auto -mt-10 text-5xl transform -translate-y-4 bg-white rounded-full "
      >
        <base-icon icon="svg-all" class="mx-auto" />
      </div>

      <van-form @submit="handleSubmit">
        <van-cell-group inset>
          <van-field
            v-model="loginFormModelRef.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginFormModelRef.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="m-4">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loadingRef"
            :disabled="loginDisabled"
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
