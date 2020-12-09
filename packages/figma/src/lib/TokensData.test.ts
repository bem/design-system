import { isTokenPrimitiveValue, isTokensGroup, isTokenValue, TokensData } from './TokensData'

describe('TokenData', () => {
  test('tokensJSON set', () => {
    expect(new TokensData(JSON.stringify('{}')).tokensJSON).toBeTruthy()
  })

  test('#getTokenValueByAlias return correct alias value', () => {
    const tokens = {
      colors: {
        Red: {
          '100': '#ff0000',
        },
        Action: {
          Focus: '{colors.Red.100}',
        },
      },
    }
    expect(new TokensData(JSON.stringify(tokens)).getTokenValueByAlias('{colors.Red.100}')).toBe('#ff0000')
  })

  test('static#isAlias', () => {
    expect(TokensData.isAlias('{colors.Red.100}')).toBeTruthy()
    expect(TokensData.isAlias('colors.Red.100')).toBeFalsy()
    expect(TokensData.isAlias('$colors.Red.100')).toBeFalsy()
  })

  test('#resolvedTokens get resolved tokens', () => {
    const tokens = {
      colors: {
        Red: {
          '100': '#ff0000',
        },
        Action: {
          Focus: '{colors.Red.100}',
        },
      },
    }
    expect(new TokensData(JSON.stringify(tokens)).resolvedTokens).toEqual({
      colors: {
        Red: {
          '100': '#ff0000',
        },
        Action: {
          Focus: '#ff0000',
        },
      },
    })
  })
  test('#resolvedTokens get resolved tokens alias-to-alias', () => {
    const tokens = {
      colors: {
        Red: {
          '50': '#ff0000',
          '100': '{colors.Red.50}',
        },
        Action: {
          Focus: '{colors.Red.100}',
        },
      },
    }
    expect(new TokensData(JSON.stringify(tokens)).resolvedTokens).toEqual({
      colors: {
        Red: {
          '50': '#ff0000',
          '100': '#ff0000',
        },
        Action: {
          Focus: '#ff0000',
        },
      },
    })
  })
})

describe('isTokenPrimitiveValue', () => {
  test('return correct value', () => {
    expect(isTokenPrimitiveValue('100px')).toBeTruthy()
    expect(isTokenPrimitiveValue(100)).toBeTruthy()
    expect(isTokenPrimitiveValue({ blah: {} })).toBeFalsy()
    expect(isTokenPrimitiveValue({ value: 'rgba(0 0 0)' })).toBeFalsy()
  })
})

describe('isTokenValue', () => {
  test('return correct value', () => {
    expect(isTokenValue({ value: 'rgba(0 0 0)' })).toBeTruthy()
    expect(isTokenValue('100px')).toBeFalsy()
    expect(isTokenValue(100)).toBeFalsy()
    expect(isTokenValue({ colors: {} })).toBeFalsy()
  })
})

describe('isTokenGroup', () => {
  test('return correct value', () => {
    expect(isTokensGroup({ colors: {} })).toBeTruthy()
    expect(isTokensGroup({ value: 'rgba(0 0 0)' })).toBeFalsy()
    expect(isTokensGroup('100px')).toBeFalsy()
    expect(isTokensGroup(100)).toBeFalsy()
  })
})
