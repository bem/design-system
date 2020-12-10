export type TokenPrimitiveValue = string | number

export type TokenValue = {
  value: TokenPrimitiveValue
  description?: string
}

export type TokensGroup = { [key: string]: TokenPrimitiveValue | TokenValue | TokensGroup }

export const isTokenPrimitiveValue = (value: any): value is TokenPrimitiveValue => {
  return typeof value === 'string' || typeof value === 'number'
}

export const isTokenValue = (value: any): value is TokenValue => {
  return !isTokenPrimitiveValue(value) && 'value' in value
}

export const isTokensGroup = (value: any): value is TokensGroup => {
  return !(isTokenPrimitiveValue(value) || isTokenValue(value))
}

export class TokensData {
  tokens: TokensGroup = {}

  resolvedTokens: TokensGroup = {}

  constructor(public tokensJSON: string) {
    this.setTokens()
    this.setResolvedTokens()
  }

  private setTokens() {
    this.tokens = JSON.parse(this.tokensJSON)
  }

  private setResolvedTokens() {
    this.resolvedTokens = JSON.parse(this.tokensJSON, this.resolveAliases)
  }

  private resolveAliases = (key: string, value: TokenPrimitiveValue) => {
    if (typeof value === 'string' && TokensData.isAlias(value)) {
      // @todo: what about circularly references in aliases
      const nextValue = this.getTokenValueByAlias(value)
      if (typeof nextValue === 'string' && TokensData.isAlias(nextValue)) {
        return this.getTokenValueByAlias(nextValue)
      }
      return nextValue
    }
    return value
  }

  static isAlias(value: string) {
    return value.startsWith('{') && value.endsWith('}')
  }

  getTokenValueByAlias(value: string) {
    const parts = (value.slice(1, value.length - 1) as string).split('.')
    let val: any = this.tokens
    for (const part of parts) {
      if (typeof val[part] !== 'undefined') {
        val = val[part]
      } else {
        // @todo: error handling
        return value
      }
    }
    return val
  }
}
