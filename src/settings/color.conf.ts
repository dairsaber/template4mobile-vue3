export const colorTypes = {
  DANGER: '#f56c5f',
  INFO: '#35b100',
  WARN: '#f99625',
  DEFAULT: '#1890ff',
}

export type ColorType = keyof typeof colorTypes

export const tagColorTypes = {
  DANGER: 'red',
  INFO: 'cyan',
  WARN: 'orange',
  DEFAULT: 'blue',
}
