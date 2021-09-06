import { ref, Ref, UnwrapRef } from 'vue'

type ModalHook<T> = [
  visible: Ref<boolean>,
  dataSource: Ref<UnwrapRef<T> | null>,
  actions: {
    setData: Fn<UnwrapRef<T> | null, void>
    close: Fn
    show: Fn
  }
]

export const useModal = <T = any>(): ModalHook<T> => {
  const visible = ref(false)
  const dataSource = ref<T | null>(null)

  const reset = () => {
    dataSource.value = null
  }
  const setData = (data: UnwrapRef<T> | null) => {
    dataSource.value = data
  }

  const close = () => {
    reset()
    visible.value = false
  }
  const show = () => {
    visible.value = true
  }

  return [visible, dataSource, { setData, close, show }]
}
