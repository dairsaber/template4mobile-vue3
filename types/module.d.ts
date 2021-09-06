declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<Recordable, Recordable, any>
  export default Component
}

declare module 'virtual:*' {
  const result: any
  export default result
}
