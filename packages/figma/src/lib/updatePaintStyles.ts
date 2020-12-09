import { isTokenPrimitiveValue, isTokensGroup, isTokenValue, TokensGroup } from './TokensData'
import { hexToFigmaRGB, webRGBToFigmaRGB } from '@figma-plugin/helpers'
import { cssRGBtoWebRgb, isHex, isRgb } from './colors'

export const toFigmaRGB = (value: string) => {
  if (isHex(value)) {
    return hexToFigmaRGB(value)
  } else if (isRgb(value)) {
    return webRGBToFigmaRGB(cssRGBtoWebRgb(value))
  }
  return hexToFigmaRGB('#000')
}

export const updatePaintStyles = (colors: TokensGroup) => {
  const styles: TokensGroup = {}

  const queue = Object.entries(colors)

  while (queue.length > 0) {
    const entry = queue.shift()

    if (!entry) continue

    const [key, value] = entry
    if (isTokenPrimitiveValue(value) || isTokenValue(value)) {
      styles[key] = value
    } else if (isTokensGroup(value)) {
      Object.entries(value).forEach(([itemKey, itemValue]) => {
        queue.push([`${key}/${itemKey}`, itemValue])
      })
    }
  }

  for (const [name, value] of Object.entries(styles)) {
    const paintStyle = figma.createPaintStyle()
    paintStyle.name = name

    if (isTokenPrimitiveValue(value)) {
      paintStyle.paints = [
        {
          type: 'SOLID',
          color: toFigmaRGB(value as string),
          opacity: 1,
        },
      ]
    } else if (isTokenValue(value)) {
      paintStyle.paints = [
        {
          type: 'SOLID',
          color: toFigmaRGB(value.value as string),
          opacity: 1,
        },
      ]
      if (value.description) {
        paintStyle.description = value.description
      }
    }
  }
}
