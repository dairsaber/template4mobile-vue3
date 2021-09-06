import { UploadApiResult } from './model/upload.model'
import { request } from '@/utils/http'
import { UploadFileParams } from '#/axios'
import { useGlobSetting } from '@/hooks/setting'
import type { AxiosResponse } from 'axios'

const { uploadUrl = '' } = useGlobSetting()

/**
 * @description: Upload interface
 */
export function uploadApi(params: UploadFileParams, onUploadProgress: (progressEvent: ProgressEvent) => void): Promise<null> | Promise<AxiosResponse<UploadApiResult>> {
  return request.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params
  )
}
