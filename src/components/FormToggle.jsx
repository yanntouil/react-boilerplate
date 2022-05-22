import { classNames } from "../app/helpers"

/**
 * Form Checkbox
 * @param {{
 *      value: string, 
 *      setValue: React.Dispatch<string>,
 *      label: string,
 *      labelIcon: JSX.Element,
 *      name?: string,
 *      isValid?: boolean,
 *      validate?: boolean,
 * }} props
 * @returns {JSX.Element}
 */
 const FormToggle = ({ 
    value, 
    setValue, 
    label, 
    labelIcon, 
    name = 'form-toggle',
    isValid, 
    validate,
}) => {

    /**
     * Render
     */
    return (
        <div className="relative flex items-stretch w-full">
            <label 
                htmlFor={name} 
                className={classNames([
                    'flex items-center grow text-lg',
                    { 'pl-4': !labelIcon }
                ])}
            >
                {!!labelIcon && (
                    <span className="flex justify-center items-center w-16 h-16 flex-shrink-0 text-neutral-500" htmlFor={name}>
                        {labelIcon}
                    </span>
                )}
                {label}
            </label>
            <button 
                className={classNames([
                    'flex justify-start items-center w-14 h-8 p-1 flex-shrink-0 m-4 rounded-full border transition-colors duration-300 ease-in-out',
                    {
                        'border-sky-500': (validate && isValid && value) || (!validate && value),
                        'border-neutral-500': (validate && isValid && !value) || (!validate && !value),
                        'border-red-500': validate && !isValid && value,
                        'border-red-300': validate && !isValid && !value,
                    }
                ])}
                type="button"
                aria-hidden="true"
                onClick={() => setValue(!value)}
            >
                <span className={classNames([
                    'flex w-6 h-6 rounded-full transition-all',
                    {
                        'bg-sky-500 translate-x-6': (validate && isValid && value) || (!validate && value),
                        'bg-neutral-500': (validate && isValid && !value) || (!validate && !value),
                        'bg-red-500 translate-x-6': validate && !isValid && value,
                        'bg-red-400': validate && !isValid && !value,
                    }
                ])} />
            </button>
            <input 
                className="absolute w-0 h-0 opacity-0" 
                type="checkbox" 
                id={name} 
                checked={value ? 'checked' : ''}
                onChange={({ target }) => setValue(target.checked)}
                tabIndex="-1"
            />
        </div>
    )
}
export default FormToggle