import React, { useCallback } from 'react'
import { useTokensDispatch } from '../state/TokensContext'

export function TokensTab() {
  const { createPaintStyles, removePaintStyles } = useTokensDispatch()
  const createPaintStylesHandler = useCallback(() => createPaintStyles(), [createPaintStyles])
  const removePaintStylesHandler = useCallback(() => removePaintStyles(), [removePaintStyles])

  return (
    <>
      <h1>Tokens tab</h1>
      <button onClick={createPaintStylesHandler}>Create Paint styles</button>
      <button onClick={removePaintStylesHandler}>Remove Paint styles</button>
    </>
  )
}
