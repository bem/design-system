import { cssRGBtoWebRgb } from './colors'

describe('colors', () => {
  describe('cssRGBtoWebRgb', () => {
    test('should return correct value', () => {
      expect(cssRGBtoWebRgb('rgba(1, 1, 1)')).toEqual([1, 1, 1])
      expect(cssRGBtoWebRgb('rgba(1, 1, 1, .8)')).toEqual([1, 1, 1, 0.8])
      expect(cssRGBtoWebRgb('rgba(1, 1, 1, 0.8)')).toEqual([1, 1, 1, 0.8])
    })

    test('should return default array', () => {
      expect(cssRGBtoWebRgb('rg(1, 1, 1)')).toEqual([0, 0, 0])
      expect(cssRGBtoWebRgb('rgb(' + ')')).toEqual([0, 0, 0])
    })
  })
})
