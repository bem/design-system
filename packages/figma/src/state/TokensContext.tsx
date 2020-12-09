import React, { createContext, PropsWithChildren, useContext, useMemo, useReducer } from 'react'
import packageJson from '../../package.json'
import defaultLight from '../config/default.light.json'
import { TokensData } from '../lib/TokensData'

const TokensStateContext = createContext<any>(undefined)
// @ts-ignore
const TokensDispatchContext = createContext<TokensDispatchContext>(null)

type TokensConfigData = Record<string, string>

interface TokensConfig {
  version: string
  data: TokensConfigData
}

const defaultTokens: TokensConfig = {
  version: packageJson.version,
  data: {
    values: JSON.stringify(defaultLight, null, 2),
  },
}

const emptyTokens = {
  version: packageJson.version,
  data: {
    values: JSON.stringify({}, null, 2),
  },
}

interface TokensDispatchContext {
  setDefaultTokens(): void
  setTokens: (tokensJSON: string) => void
  createPaintStyles(): void
  removePaintStyles(): void
}

export enum ActionType {
  SetDefaultTokens = 'SET_DEFAULT_TOKENS',
  SetTokens = 'SET_TOKENS',
  CreatePaintStyles = 'CREATE_PAINT_STYLES',
  RemovePaintStyles = 'REMOVE_PAINT_STYLES',
}

const tokensReducer = (state: any, { type, data }: { type: ActionType; data?: any }) => {
  switch (type) {
    case ActionType.SetDefaultTokens:
      return {
        ...state,
        ...data,
      }
    case ActionType.SetTokens:
      return {
        ...state,
        ...data,
      }
    case ActionType.CreatePaintStyles:
      parent.postMessage(
        {
          pluginMessage: {
            type: 'create-paint-styles',
            tokens: state.tokensData.resolvedTokens,
          },
        },
        '*',
      )
      return state
    case ActionType.RemovePaintStyles:
      parent.postMessage(
        {
          pluginMessage: {
            type: 'remove-paint-styles',
            tokens: state.tokensData.resolvedTokens,
          },
        },
        '*',
      )
      return state
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const initialState = {
  tokensData: new TokensData(emptyTokens.data.values),
}

const TokensProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducer(tokensReducer, initialState)

  const tokensContext = useMemo<TokensDispatchContext>(
    () => ({
      setDefaultTokens() {
        dispatch({ type: ActionType.SetDefaultTokens, data: { tokensData: new TokensData(defaultTokens.data.values) } })
      },

      setTokens(tokensJson) {
        dispatch({ type: ActionType.SetTokens, data: { tokensData: new TokensData(tokensJson) } })
      },

      createPaintStyles() {
        dispatch({ type: ActionType.CreatePaintStyles })
      },

      removePaintStyles() {
        dispatch({ type: ActionType.RemovePaintStyles })
      },
    }),
    [],
  )

  return (
    <TokensStateContext.Provider value={state}>
      <TokensDispatchContext.Provider value={tokensContext}>{children}</TokensDispatchContext.Provider>
    </TokensStateContext.Provider>
  )
}

const useTokensState = () => {
  const context = useContext(TokensStateContext)
  if (context === undefined) {
    throw new Error('useTokensState must be used within a TokensProvider')
  }
  return context
}

const useTokensDispatch = () => {
  const context = useContext(TokensDispatchContext)
  if (context === undefined) {
    throw new Error('useTokensDispatch must be used within a TokensProvider')
  }
  return context
}

export { TokensProvider, useTokensState, useTokensDispatch }
