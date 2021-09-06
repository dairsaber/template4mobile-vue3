# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"

## 注意事项

### 安装插件

- 安装 volar vscode 插件
- 禁用 vetur 插件
- 项目采用 antd-vue ui 框架 可以使用 ant-design-helper 来帮助只能提示
- 项目集成了 tailwind 使用 Tailwind css Intellisense 插件来帮助开发
- 项目采用 prettier 格式化 必须装上 prettier 插件用于格式化

### 其他注意

- 项目中可以使用 js 但是不建议 采用 ts 写

## 规范

### 命名规范

- 文件夹名称采用-命名方式 `error-page`
- 组件名称 首字母大写 大坨峰命名规则 `SvgIcon.vue`
- 公共类型声明以 `.d.ts` 声明
- hook 文件名 以 use 开头 小驼峰 `usePagination.ts`
- api 文件 以 .apt.ts 结尾 `user.api.ts`
- model 模型文件以 .model.ts 结尾 `user.model.ts`
- 状态文件 store 以.store.ts 结尾 `user.store.ts`
- 服务类文件 services 以 .services.ts 结尾 `user.services.ts`
- 配置类文件 settings 或者 setting 以.conf.ts 结尾 `pagination.conf.ts`
- 枚举文件以 .enum.ts 结尾 `app.enum.ts`
- 路由文件 以.route.ts 结尾 `constant.route.ts`
- 页面文件 以.page.ts 结尾 `Login.page.ts`

### 使用注意

- vue3 现在仍处于踩坑阶段 尽量少用 tsx jsx 等 这边会出现 一些特性支持不是很完全

### 公用组件说明

#### dict-select 字典选择控件 （已注册全局）




### 数据请求

- 这边前端一般请求的返回体 {code,msg,data} => data 中存储这核心数据
-

### 关于样式

- 这边集成了 `tailwind.css` 尽量是用它提供的样式类进行页面开发效果展示, 最大程度的样式复用
