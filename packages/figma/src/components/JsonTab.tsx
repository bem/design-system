import React, { useCallback, useState } from 'react'
import { useTokensDispatch, useTokensState } from '../state/TokensContext'

export const JsonTab = () => {
  const { tokensData } = useTokensState()
  const [value, setValue] = useState(tokensData.tokensJSON)
  const { setTokens } = useTokensDispatch()
  const onInput = useCallback(({ currentTarget: { value: v } }) => setValue(v), [setValue])
  const setDefaultTokensHandler = useCallback(() => setTokens(value), [value, setTokens])
  return (
    <>
      <textarea placeholder="Paste json" style={{ width: '100%' }} rows={25} defaultValue={value} onInput={onInput} />
      <button onClick={setDefaultTokensHandler}>Update Tokens</button>
    </>
  )
}
