import { cssRGBtoWebRgb, isHex, isRgb } from './colors'

describe('colors', () => {
  describe('cssRGBtoWebRgb', () => {
    test('return the correct value', () => {
      expect(cssRGBtoWebRgb('rgb(1, 1, 1)')).toEqual([1, 1, 1])
      expect(cssRGBtoWebRgb('rgba(1, 1, 1)')).toEqual([1, 1, 1])
      expect(cssRGBtoWebRgb('rgba(1, 1, 1, .8)')).toEqual([1, 1, 1, 0.8])
      expect(cssRGBtoWebRgb('rgba(1, 1, 1, 0.8)')).toEqual([1, 1, 1, 0.8])
      expect(cssRGBtoWebRgb('rgba(1 1 1)')).toEqual([1, 1, 1])
    })

    test('return the default array', () => {
      expect(cssRGBtoWebRgb('rg(1, 1, 1)')).toEqual([0, 0, 0])
      expect(cssRGBtoWebRgb('rgb(' + ')')).toEqual([0, 0, 0])
    })
  })
  describe('isRgb', () => {
    test('return correct value', () => {
      expect(isRgb('rgb(0, 0, 0, .8)')).toBeTruthy()
      expect(isRgb('rgba(0, 0, 0, .8)')).toBeTruthy()
      expect(isRgb('hsla(0, 0, 0, .8)')).toBeFalsy()
    })
  })
  describe('isHex', () => {
    test('return correct value', () => {
      expect(isHex('#ff0000')).toBeTruthy()
      expect(isHex('#f00')).toBeTruthy()
      expect(isHex('#ff')).toBeFalsy()
      expect(isHex('#ff00zz')).toBeFalsy()
    })
  })
})
