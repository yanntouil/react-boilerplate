/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'

/**
 * Just modified version of useEffect that's executed only one time, at the mounting time.
 * @param {React.EffectCallback} effect 
 */
function useEffectOnce(effect) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}

export default useEffectOnce