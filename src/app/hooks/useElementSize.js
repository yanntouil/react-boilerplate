import { useCallback, useEffect, useState } from 'react'
import { useEventListener } from './'

function useElementSize () {
    const [ref, setRef] = useState(null)
    const [size, setSize] = useState({
      width: 0,
      height: 0,
    })
  
    // Prevent too many rendering using useCallback
    const handleSize = useCallback(() => {
      setSize({
        width: ref?.offsetWidth || 0,
        height: ref?.offsetHeight || 0,
      })
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.offsetHeight, ref?.offsetWidth])
  
    useEventListener('resize', handleSize)
  
    useEffect(() => {
      handleSize()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.offsetHeight, ref?.offsetWidth])
  
    return [setRef, size]
  }
  
export default useElementSize