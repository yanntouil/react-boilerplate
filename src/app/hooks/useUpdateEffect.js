// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { useIsFirstRender } from './'

/**
 * Just modified version of useEffect that is skipping the first render.
 * @param {React.EffectCallback} effect 
 * @param {React.DependencyList} deps 
 */
function useUpdateEffect(effect, deps = []) {
    const isFirst = useIsFirstRender()
    useEffect(() => {
        if (!isFirst) return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

export default useUpdateEffect