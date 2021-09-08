import { Toast } from 'vant'
export const message = {
  ...Toast,
  success: Toast.success,
  error: Toast.fail,
  loading: Toast.loading,
  info: Toast,
  close: Toast.clear,
}
