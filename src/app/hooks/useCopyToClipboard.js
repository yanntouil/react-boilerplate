import { useState } from 'react'


/**
 * This React hook provides a copy method to save a string in the clipboard and the copied value (default: null).
 * If anything doesn't work, it prints a warning in the console and the value will be null.
 * @returns {[copiedText: (string | null), copy: (text: string) => Promise<boolean>]}
 */
const useCopyToClipboard = () => {
    const [ copiedText, setCopiedText ] = useState(null)

    const copy = async text => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported')
            return false
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            return true
        } catch (error) {
            console.warn('Copy failed', error)
            setCopiedText(null)
            return false
        }
    }

    return [ copiedText, copy ]
}

export default useCopyToClipboard