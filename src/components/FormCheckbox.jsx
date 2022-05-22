import { classNames } from "../app/helpers"

/**
 * Form Checkbox
 * @param {{
 *      value: string, 
 *      setValue: React.Dispatch<string>,
 *      label: string,
 *      name?: string,
 *      isValid?: boolean,
 *      validate?: boolean,
 * }} props
 * @returns {JSX.Element}
 */
 const FormCheckbox = ({ 
     value, 
    setValue, 
    label, 
    name = 'form-checkbox',
    isValid, 
    validate,
}) => {

    /**
     * Render
     */
    return (
        <div className="relative flex items-stretch w-full">
            <button 
                className={classNames([
                    'flex justify-center items-center w-8 h-8 flex-shrink-0 m-4 border shadow transition-colors duration-300 ease-in-out',
                    value ? 'bg-sky-500' : 'bg-white',
                    { 'border border-red-200 shadow-red-200 text-red-500': validate && !isValid }
                ])}
                type="button"
                aria-hidden="true"
                onClick={() => setValue(!value)}
            >
                {!!value && (
                    <span className="flex w-2 h-3 mb-0.5 border-b-2 border-r-2 border-white rotate-[35deg]"/>
                )}
            </button>
            <input 
                type="checkbox"
                id={name}
                className="absolute w-0 h-0 opacity-0"
                checked={value ? 'checked' : ''}
                onChange={({ target }) => setValue(target.checked)}
                tabIndex="-1"
            />
            <label htmlFor={name} className="flex grow pr-4 pt-4 text-lg">
                {label}
            </label>
        </div>
    )
}
export default FormCheckbox