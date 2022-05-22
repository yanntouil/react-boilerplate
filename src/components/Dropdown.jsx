import React, { createContext, useContext, useRef, useState, useCallback, Children, cloneElement } from "react";
import { classNames } from "../app/helpers";
import { useOnClickOutside } from "../app/hooks";

/**
 * Dropdown
 * @param {{
 *      children: JSX.Element,
 *      className: string,
 * }}
 */
const Dropdown = ({ children, className }) => {

    /**
     * Dropdown
     */
    const [ open, setOpen ] = useState(false)
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    const dropdownRef = useRef(null)
    useOnClickOutside(dropdownRef, onClose)
    const onBlur = ({ relatedTarget }) => {
        if (!dropdownRef?.current.contains(relatedTarget)) {
            onClose()
        }
    }

    /**
     * Render
     */
    return (
        <div 
            className={className ? className : 'relative'}
            ref={dropdownRef}
        >
            {Children.map(children, (child) => typeof child === 'string' ? child : cloneElement(child, { open, onClose, onOpen, onBlur }))}
        </div>
    )
}

/**
 * Dropdown button
 * @param {{
 *      children: JSX.Element,
 *      open: boolean,
 *      onClose: () => void,
 *      onOpen: () => void,
 *      onBlur: (e) => void,
 *      className: string,
 *      icon?: boolean,
 * }} props
 * @returns {JSX.Element}
 */
 const DropdownButton = ({ 
    children, 
    open, 
    onClose, 
    onOpen,
    onBlur,
    className, 
    icon = false, 
}) => {
 
    /**
     * Render
     */
    return (
        <button 
            className={classNames([
                {'flex items-center h-16 pl-4': icon},
                className,
            ])}
            onClick={() => open ? onClose() : onOpen()}
            onBlur={onBlur}
        >
            {children}
            {icon && (
                <span className="flex justify-center items-center w-12 h-16 text-neutral-800" aria-hidden="true">
                    <svg className={classNames([
                        'w-4 h-4 fill-current transition-transform duration-300 ease-in-out',
                        open ? 'rotate-180' : 'rotate-0'
                    ])} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M362.71 203.889L202.719 347.898C196.594 353.367 187.407 353.367 181.282 347.898L21.292 203.889C14.729 197.982 14.198 187.857 20.104 181.295C26.376 174.377 36.499 174.512 42.729 180.107L192.001 314.475L341.272 180.107C347.866 174.23 357.96 174.746 363.897 181.295C369.803 187.857 369.272 197.982 362.71 203.889Z"/></svg>
                </span>
            )}

        </button>
    )
}


/**
 * Dropdown menu
 * @param {{
 *      children: JSX.Element,
 *      open: boolean,
 *      onClose: () => void,
 *      onOpen: () => void,
 *      onBlur: (e) => void,
 *      className: string,
 *      bottom?: boolean
 *      left?: boolean
 *      right?: boolean
 * }}
 */
const DropdownMenu = ({ 
    children, 
    open, 
    onClose, 
    onOpen,
    onBlur,
    className, 
    bottom = false, 
    left = false,
    right = false,
}) => {


    /**
     * Render
     */
    return open ? (
        <ul 
            className={classNames([
                'absolute z-10 flex flex-col items-stretch bg-white shadow-md',
                bottom ? 'top-full' : 'top-0',
                {
                    'right-0': right || !left,
                    'left-0': !right && left,
                },
                className
            ])}
        >
            {Children.map(children, (child, optionIndex) => typeof child === 'string' ? child : cloneElement(child, { open, onClose, onOpen, onBlur }))}
        </ul>
    ) : <></>
}

/**
 * Dropdown item
 * @param {{
 *      children: JSX.Element,
 *      onClose: () => void,
 *      onBlur: (e) => void,
 *      onClick: () => void,
 *      clickAndClose: boolean,
 *      className: string,
 * }}
 */
const DropdownMenuItem = ({ 
    children, 
    onClose,
    onBlur,
    onClick,
    clickAndClose = true,
    className,
}) => {

    /**
     * Handle click
     */
    const handleClick = () => {
        onClick()
        clickAndClose && onClose()
    }

    /**
     * Render
     */
    return (
        <li className="flex flex-col items-stretch">
            <button 
                onBlur={onBlur}
                onClick={handleClick} 
                className={classNames([
                    'flex min-w-max flex-grow p-4 text-neutral-800 hover:bg-sky-100 focus:bg-sky-100',
                    className,
                ])}
            >
                {children}
            </button>
        </li>
    )
}

export { Dropdown, DropdownMenu, DropdownMenuItem, DropdownButton }