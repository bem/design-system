import React, { FunctionComponent, useCallback } from 'react'

import { Active } from '../../global'
import './Nav.css'

interface NavProps {
  active: Active
  setActive: (active: Active) => void
}

export const Nav: FunctionComponent<NavProps> = ({ active, setActive }) => {
  const onClick = useCallback(
    ({
      currentTarget: {
        dataset: { navigationItem },
      },
    }) => setActive(navigationItem as Active),
    [setActive],
  )
  return (
    <div className="Nav" role="navigation">
      {(['json', 'tokens', 'inspector', 'components'] as Active[]).map((item) => {
        return (
          <button disabled={item === active} data-navigation-item={item} key={item} onClick={onClick}>
            {item}
          </button>
        )
      })}
    </div>
  )
}
