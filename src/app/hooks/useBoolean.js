// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'


/**
 * A simple abstraction to play with a boolean state
 * @param {boolean} [defaultValue = false]
 * @return {[
 *    value: boolean,
 *    setValue: React.Dispatch<React.SetStateAction<boolean>>,
 *    setTrue: () => void,
 *    setFalse: () => void,
 *    toggle: () => void,
 * ]}
 */
const useBoolean = (defaultValue = false) => {
    const [ value, setValue ] = useState(!!defaultValue)

    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)
    const toggle = () => setValue(x => !x)

    return [ value, setValue, setTrue, setFalse, toggle ]
}

export default useBoolean