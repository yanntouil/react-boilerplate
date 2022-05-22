import { useState, useRef } from "react"
import { classNames } from "../app/helpers"


/**
 * Form upload
 * @param {{
 *      value: string, 
 *      setValue: React.Dispatch<string>,
 *      labelIcon: JSX.Element,
 *      placeholder?: string,
 *      name?: string,
 *      password?: boolean,
 *      clear?: boolean,
 *      isValid?: boolean,
 *      validate?: boolean,
 * }} props
 * @returns {JSX.Element}
 */
const FormUpload = ({ 
    value, 
    setValue, 
    accept= '*',
    labelIcon, 
    placeholder = '', 
    name = 'form-upload', 
    clear = false,
    isValid, 
    validate,
}) => {
    const [ fileName, setFileName ] = useState('')

    const fieldRef = useRef(null)

    const onChange = ({ target }) => {
        setValue(target.files[0])
        setFileName(target.files[0].name)
    }
    
    const onClear = () => {
        setValue('')
        setFileName('')
    }

    /**
     * Render
     */
    return (
        <div className="relative flex w-full h-16" >
            {!!labelIcon && (
                <label className="absolute inset-y-0 left-0 flex justify-center items-center w-16 h-16 flex-shrink-0 text-neutral-500" htmlFor={name}>
                    {labelIcon}
                </label>
            )}
            <button 
                className={classNames([
                    'flex items-center w-full h-16 shadow',
                    !!labelIcon ? 'pl-16' : 'pl-4',
                    !!value && clear ? 'pr-16' : 'pr-4',
                    { 'shadow-red-300 border border-red-200': validate && !isValid }
                ])}
                onClick={() => fieldRef?.current.click()}
                type="button"
            >
                <span className={classNames([
                    'block truncate',
                    { 'text-neutral-500': !fileName }
                ])}>{fileName || placeholder}</span>
            </button>
            {!!value && clear && (
                <button 
                    className="absolute inset-y-0 right-0 flex justify-center items-center w-16 h-16 text-neutral-500"
                    type="button"
                    onClick={onClear}
                >
                    <svg className="w-4 h-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M315.31 411.31C309.056 417.563 298.936 417.563 292.682 411.31L160 278.627L27.318 411.31C21.064 417.563 10.944 417.563 4.69 411.31C-1.563 405.056 -1.563 394.936 4.69 388.682L137.373 256L4.69 123.318C-1.563 117.064 -1.563 106.944 4.69 100.69C10.944 94.437 21.064 94.437 27.318 100.69L160 233.373L292.682 100.69C298.936 94.437 309.056 94.437 315.31 100.69C321.563 106.944 321.563 117.064 315.31 123.318L182.627 256L315.31 388.682C321.563 394.936 321.563 405.056 315.31 411.31Z"/></svg>
                    <span className="sr-only">Remove file</span>
                </button>
            )}
            <input 
                className="absolute w-0 h-0 opacity-0"
                type="file"
                tabIndex="-1"
                id={name}
                name={name}
                ref={fieldRef}
                onChange={onChange}
                accept={accept}
            />
        </div>
    )
}
export default FormUpload