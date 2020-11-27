import React from 'react'
import ReactDom from 'react-dom'
import { App } from './App'

ReactDom.render(<App />, document.getElementById('root'))

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
