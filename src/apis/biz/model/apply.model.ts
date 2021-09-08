export type ApplyPlan = {
  id: string
  // 申报单号
  applyCode: string
  createTime: string
  // 所属仓库
  repository: string
  // 申请单位
  applyCrop: string
  // 审核人
  checkUser: string
  // 审核状体
  checkStatus: string
  // 工程编码
  projectCode: string

  // 工程名称
  projectName: string
  // 申报人
  applyUser: string
  // 项目经理
  projectManager: string

  // 制表日期
  formCreateDate: string
  // 状态
  status: string
  // 备注
  remark: string

  // 制单部门
  formCreateDept: string
  // 制单人
  formCreateUser: string
  // 申报班组
  applyGroup: string
  // 物料类型
  objectType: string
}
