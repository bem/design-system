import React, { useCallback, useState } from 'react'
import { TokensProvider } from '../../state/TokensContext'
import { StartScreen } from '../StartScreen/StartScreen'
import { JsonTab } from '../JsonTab'
import { Nav } from '../Nav/Nav'
import './App.css'
import { Active } from '../../global'
import { TokensTab } from '../TokensTab'

export const App = () => {
  const [active, setActive] = useState('start')

  const screenHandler = useCallback(() => setActive('json'), [])

  return (
    <TokensProvider>
      {active === 'start' && <StartScreen screenHandler={screenHandler} />}
      {active !== 'start' && <Nav active={active as Active} setActive={setActive} />}
      {active === 'json' && <JsonTab />}
      {active === 'tokens' && <TokensTab />}
    </TokensProvider>
  )
}
