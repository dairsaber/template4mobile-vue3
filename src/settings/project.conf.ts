import type { ProjectConfig } from '#/config'

import { SessionTimeoutProcessingEnum } from '@/enums/app.enum'

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
}

export default setting
