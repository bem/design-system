import React, { FunctionComponent, useCallback } from 'react'
import { useTokensDispatch } from '../../state/TokensContext'

interface StartScreenProps {
  screenHandler: () => void
}

export const StartScreen: FunctionComponent<StartScreenProps> = ({ screenHandler }) => {
  const { setDefaultTokens } = useTokensDispatch()
  const onClick = useCallback(() => {
    setDefaultTokens()
    screenHandler()
  }, [screenHandler, setDefaultTokens])
  return (
    <div>
      <h1>Start screen</h1>
      <button onClick={onClick}>Next</button>
    </div>
  )
}
