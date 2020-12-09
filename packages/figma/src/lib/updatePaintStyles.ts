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

export function mapTokensGroupToFigmaGroup(tokensGroup: TokensGroup) {
  const styles: TokensGroup = {}

  const queue = Object.entries(tokensGroup)

  while (queue.length > 0) {
    const entry = queue.shift()!

    const [key, value] = entry
    if (isTokenPrimitiveValue(value) || isTokenValue(value)) {
      styles[key] = value
    } else if (isTokensGroup(value)) {
      Object.entries(value).forEach(([itemKey, itemValue]) => {
        queue.push([`${key}/${itemKey}`, itemValue])
      })
    }
  }
  return styles
}

export const updatePaintStyle = (name: string, color: ReturnType<typeof toFigmaRGB>, description?: string) => {
  return Object.assign(figma.createPaintStyle(), {
    name,
    paints: [
      {
        type: 'SOLID',
        color,
        opacity: 1,
      },
    ],
    description,
  })
}

export const updatePaintStyles = (colors: TokensGroup) => {
  const styles = mapTokensGroupToFigmaGroup(colors)

  for (const [name, value] of Object.entries(styles)) {
    if (isTokenPrimitiveValue(value)) {
      updatePaintStyle(name, toFigmaRGB(value as string))
    } else if (isTokenValue(value)) {
      updatePaintStyle(name, toFigmaRGB(value.value as string), value.description)
    }
  }
}
