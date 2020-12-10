import { mapTokensGroupToFigmaGroup, toFigmaRGB, updatePaintStyle, updatePaintStyles } from './updatePaintStyles'
import * as B from './updatePaintStyles'

// Mock global the figma namespace
Object.defineProperty(global, 'figma', {
  value: {
    createPaintStyle() {
      return {}
    },
  },
  writable: true,
})

describe('toFigmaRGB', () => {
  test('return value as figma PaintStyle', () => {
    expect(toFigmaRGB('#fff')).toMatchSnapshot()
    expect(toFigmaRGB('rgba(0, 0, 0)')).toMatchSnapshot()
    expect(toFigmaRGB('rgba(0, 0, 0, 0.8)')).toMatchSnapshot()
  })

  test('return default value as figma PaintStyle', () => {
    expect(toFigmaRGB('hsl(0, 0, 0)')).toMatchSnapshot()
  })
})

describe('updatePaintStyle', () => {
  test('createPaintStyle have been called and return object', () => {
    const spy = jest.spyOn(figma, 'createPaintStyle')
    const paintStyle = updatePaintStyle('Red', toFigmaRGB('#f00'), 'Basic color')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(paintStyle).toMatchSnapshot()
    spy.mockRestore()
  })
})

describe('updatePaintStyles', () => {
  test('call updatePaintStyle', () => {
    const mock = jest.spyOn(B, 'updatePaintStyle')
    updatePaintStyles({
      Red: {
        '100': '#f00',
        '200': {
          value: '#f10',
          description: 'Basic color',
        },
      },
      Action: {
        Base: {
          value: '#0ff',
          description: 'Basic color',
        },
      },
    })

    expect(mock).toHaveBeenNthCalledWith(1, 'Red/100', toFigmaRGB('#f00'))
    expect(mock).toHaveBeenNthCalledWith(2, 'Red/200', toFigmaRGB('#f10'), 'Basic color')
    expect(mock).toHaveBeenNthCalledWith(3, 'Action/Base', toFigmaRGB('#0ff'), 'Basic color')
    mock.mockRestore()
  })
})

describe('mapTokensGroupToFigmaGroup', () => {
  test('return correct mapping', () => {
    expect(
      mapTokensGroupToFigmaGroup({
        Red: {
          '100': '#f00',
          '200': {
            value: '#f10',
            description: 'Basic color',
          },
        },
        Action: {
          Base: {
            value: '#0ff',
            description: 'Basic color',
          },
        },
      }),
    ).toMatchSnapshot()
  })
})
