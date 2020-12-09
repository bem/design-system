import { TokensData } from './TokensData'

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
