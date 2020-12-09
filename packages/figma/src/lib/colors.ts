export type webRGBA = [number, number, number, number]

const defaultWebRgb = [0, 0, 0]

export const cssRGBtoWebRgb = (rgb: string) => {
  const match = rgb.match(/rgba?\((.*?)\)/)
  const values = match && match[1].trim()
  if (values) {
    const sep = values.includes(',') ? ',' : ' '
    const parts = values.split(sep)
    const result = []
    result.push(Number(parts[0]))
    result.push(Number(parts[1]))
    result.push(Number(parts[2]))
    if (parts[3]) {
      result.push(Number(parts[3]))
    }
    return result as webRGBA
  }
  return defaultWebRgb as webRGBA
}
export const isRgb = (value: string) => value.startsWith('rgb(') || value.startsWith('rgba(')
export const hexRegex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
export const isHex = (value: string) => value.match(hexRegex)
