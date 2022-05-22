import { useState, useEffect } from "react"
import { Dialog, DialogBackdrop, DialogClose, DialogPannel } from "../components/Dialog"
import { Dropdown, DropdownMenu, DropdownMenuItem, DropdownButton } from "../components/Dropdown"
import FormAddressAutocomplete from "../components/FormAddressAutocomplete"
import FormCheckbox from "../components/FormCheckbox"
import FormLocationAutocomplete from "../components/FormLocationAutocomplete"
import FormSelect from "../components/FormSelect"
import FormSelectAutocomplete from "../components/FormSelectAutocomplete"
import FormText from "../components/FormText"
import FormToggle from "../components/FormToggle"
import FormUpload from "../components/FormUpload"
import FormValidate from "../components/FormValidate"





/**
 * Index page
 */
 const IndexPage = () => {
    const [ dialog1, setDialog1 ] = useState(false)
    const [ dialog2, setDialog2 ] = useState(false)

    const [ location, setLocation ] = useState({
        location: '',
        coordinates: []
    })
    const onLocationSubmit = (value) => {
        console.log(value)
    }

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' },
    ]

    const optionsAutocomplete = [
        { label: 'Jonathan Clauss', value: 'option01' },
        { label: 'Christopher Nkunku', value: 'option02' },
        { label: 'William Saliba', value: 'option03' },
        { label: 'Moussa Diaby', value: 'option04' },
        { label: 'Mattéo Guendouzi', value: 'option05' },
        { label: 'Théo Hernandez', value: 'option06' },
        { label: 'Jules Koundé', value: 'option07' },
        { label: 'Nordi Mukiele', value: 'option08' },
        { label: 'Aurélien Tchouaméni', value: 'option09' },
        { label: 'Jordan Veretout', value: 'option10' },
    ]

    const [ formData, setFormData ] = useState({
        username: '',
        password: '',
        termsAndConditions: false,
        privacyPolicy: false,
        upload: '',
        player: '',
        option: '',
        address: {
            address: '',
            coordinates: [],
            error: '',
        },
        addressError: ''
    })

    const formValidation = {
        username: formData.username.length >= 3,
        password: formData.password.length >= 8,
        termsAndConditions: formData.termsAndConditions,
        privacyPolicy: formData.privacyPolicy,
        upload: formData.upload && ((formData.upload.size / 1048576).toFixed(1) < 4),
        uploadMaxSize: formData.upload && ((formData.upload.size / 1048576).toFixed(1) > 4),// 4Mo
        player: formData.player,
        option: formData.option,
        address: formData.address.coordinates.length === 2,
    }

    const [ formValidate, setFormValidate ] = useState(false)

    useEffect(() => {
        if (formData.upload) console.log(formData.upload.size / 1048576, formValidation.uploadMaxSize)//
    }, [formData, formValidation.uploadMaxSize])

    /**
     * Render
     */
    return (
        <>
            <h1 className="container mx-auto py-16 text-4xl font-medium">Sandbox</h1>
            <div className="container mx-auto">
                <nav className="flex shadow my-8">
                    <Dropdown>
                        <DropdownButton icon>
                            Dropdown
                        </DropdownButton>
                        <DropdownMenu bottom left>
                            <DropdownMenuItem onClick={() => true}>
                                An item
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => true}>
                                An other item
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => true}>
                                An other item again
                            </DropdownMenuItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownButton className="relative flex items-center h-16 px-4">
                            Dropdown 2
                        </DropdownButton>
                        <DropdownMenu>
                            <DropdownMenuItem onClick={() => true}>
                                An item
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => true}>
                                An other item
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => true}>
                                An other item again
                            </DropdownMenuItem>
                        </DropdownMenu>
                    </Dropdown>
                    <button
                        className="flex items-center px-4 h-16"
                        onClick={() => setDialog1(true)}
                    >Dialog 1</button>
                    <button
                        className="flex items-center px-4 h-16"
                        onClick={() => setDialog2(true)}
                    >Dialog 2</button>
                </nav>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="flex flex-col gap-8">
                        <FormLocationAutocomplete 
                            setLocation={setLocation}
                            placeholder="Enter your location" 
                            onSubmit={onLocationSubmit} 
                            activeGeolocation 
                        />

                        <FormValidate
                            message={"Your address is mandatory"}
                            isValid={formValidation.address}
                            validate={formValidate}
                        >
                            <FormAddressAutocomplete
                                value={formData.address}
                                setValue={(address) => setFormData({ ...formData, address })}
                                placeholder="Enter your address" 
                                geolocation 
                                clear 
                            />
                        </FormValidate>

                        <FormValidate
                            message={'You need select an option'}
                            isValid={formValidation.option}
                            validate={formValidate}
                        >
                            <FormSelect
                                value={formData.option}
                                clear
                                setValue={(option) => setFormData({ ...formData, option })}
                                placeholder="Select an option"
                                labelIcon={(
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M255.975 415.994H128.025C119.18 415.994 112.012 423.173 112.025 432.02L112.063 454.412C112.072 460.685 113.932 466.813 117.406 472.035L134.502 497.72C139.727 505.575 151.723 512 161.156 512H222.875C232.293 512 244.266 505.587 249.482 497.748L266.551 472.102C269.504 467.661 271.93 459.665 271.937 454.334L271.975 432.02C271.988 423.173 264.82 415.994 255.975 415.994ZM239.91 454.377L223.742 478.886C223.266 479.32 222.057 479.968 222.875 480.003L162.588 480.12C162.164 480.015 161.475 479.687 161.189 479.687C161.049 479.687 161.006 479.769 161.141 479.995L144.062 454.361L144.053 447.991H239.99L239.994 453.17C239.93 453.619 239.678 454.486 239.795 454.486C239.816 454.486 239.854 454.451 239.91 454.377ZM315.781 51.297C282.453 18.081 237.563 -1.135 191.438 0.052C94.703 0.333 16 79.888 16 177.378C16 220.28 31.469 261.713 59.547 293.991C72.875 309.302 95.391 343.58 103.281 370.014C104.359 378.701 112.125 384.638 120.922 383.732C129.625 382.763 135.906 374.764 135.031 366.077L134.422 362.765C124.109 327.8 98.422 289.929 83.687 272.993C60.672 246.527 48 212.562 48 177.378C48 96.136 111.047 32.299 191.531 32.049H192C230.125 32.049 266.047 46.922 293.188 73.982C320.797 101.479 336 138.225 336 177.378C336 212.562 323.328 246.527 300.328 272.993C285.578 289.929 259.891 327.8 249.578 362.765L248.953 366.109C247.906 374.858 253.891 383.701 262.625 384.794C263.406 384.888 264.156 384.95 264.906 384.95C272.703 384.95 279.266 379.826 280.266 371.827C288.609 343.58 311.125 309.302 324.469 293.991C352.531 261.713 368 220.28 368 177.378C368 129.664 349.453 84.887 315.781 51.297ZM208 80.044C208 71.201 200.844 64.045 192 64.045C130.25 64.045 80 114.271 80 176.026C80 184.869 87.156 192.025 96 192.025S112 184.869 112 176.026C112 131.925 147.875 96.038 192 96.038C200.844 96.038 208 88.887 208 80.044Z"/></svg>
                                )}
                                options={options}
                            />
                        </FormValidate>
                        <FormValidate
                            message={"You need select a player"}
                            isValid={formValidation.player}
                            validate={formValidate}
                        >
                            <FormSelectAutocomplete
                                value={formData.player}
                                setValue={(player) => setFormData({ ...formData, player })}
                                placeholder="Select a player"
                                clear
                                labelIcon={(
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M368.792 119.812L326.932 113.688L308.21 75.598C300.602 60.117 275.524 60.148 267.979 75.598L249.225 113.688L207.272 119.844C198.725 121.066 191.776 126.938 189.114 135.164C186.452 143.422 188.645 152.25 194.811 158.246L225.149 187.766L217.948 229.715C216.54 238.227 219.983 246.672 226.934 251.727C233.917 256.688 242.901 257.441 250.508 253.391L287.985 233.641L325.43 253.391C328.749 255.148 332.348 256 335.919 256C340.551 256 345.155 254.555 349.098 251.664C356.049 246.578 359.462 238.133 358.022 229.652L350.821 187.766L381.159 158.246C387.358 152.219 389.549 143.391 386.887 135.133C384.227 126.906 377.276 121.035 368.792 119.812ZM316.381 176.523L323.114 215.836L287.985 197.34L252.858 215.836L259.589 176.523L231.161 148.828L270.516 143.078L288.079 107.375L305.643 143.078L344.809 148.797L316.381 176.523ZM572.227 76.719C570.665 69.312 564.135 64 556.575 64H447.954C447.94 57.828 447.864 51.992 447.733 46.656C447.077 20.5 425.991 0 399.749 0H176.253C150.01 0 128.924 20.5 128.268 46.656C128.137 51.992 128.061 57.828 128.047 64H19.426C11.866 64 5.337 69.312 3.774 76.719C2.899 80.906 -17.189 180.781 45.044 272.844C86.715 334.484 154.919 376.859 247.577 399.539C261.872 403.039 272.005 415.766 272.005 430.488V480H176.034C167.2 480 160.04 487.164 160.04 496S167.2 512 176.034 512H399.967C408.801 512 415.962 504.836 415.962 496S408.801 480 399.967 480H303.997V430.488C303.997 415.766 314.13 403.039 328.424 399.539C421.083 376.859 489.286 334.484 530.958 272.844C593.19 180.781 573.102 80.906 572.227 76.719ZM71.786 255.281C29.204 192.562 30.547 123.812 33.329 96H128.714C131.729 173.707 148.005 284.602 209.907 354.977C148.391 332.875 101.907 299.648 71.786 255.281ZM288.001 374.625C166.913 320.156 158.258 128.375 160.258 47.469C160.477 38.781 167.506 32 176.253 32H399.749C408.495 32 415.524 38.781 415.743 47.469C417.743 128.375 409.089 320.156 288.001 374.625ZM504.215 255.281C474.096 299.648 427.61 332.875 366.094 354.977C427.997 284.602 444.272 173.707 447.288 96H542.672C545.454 123.812 546.797 192.562 504.215 255.281Z"/></svg>
                                )}
                                options={optionsAutocomplete.map(option => ({ ...option, icon: (
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 16C123.451 16 16 123.453 16 256S123.451 496 256 496S496 388.547 496 256S388.549 16 256 16ZM272 146.91V112.07L336.646 64.281C366.389 76.844 392.504 96.234 413.314 120.328L387.932 196.332L355.006 207.027L272 146.91ZM333.189 230.723L303.902 321.062H208.365L178.838 230.715L256 174.816L333.189 230.723ZM256 84.113L213.205 52.473C227.025 49.57 241.33 48 256 48S284.975 49.57 298.795 52.473L256 84.113ZM240 112.07V146.91L156.994 207.027L124.068 196.332L98.686 120.328C119.496 96.234 145.611 76.844 175.354 64.281L240 112.07ZM92.508 202.895L49.225 233.797C52.35 204.492 61.689 177.07 75.736 152.668L92.508 202.895ZM114.174 226.73L147.383 237.52L179.121 334.609L158.469 363.031L78.383 363.684C62.08 336.898 51.615 306.242 48.879 273.352L114.174 226.73ZM154.965 395.078L170.938 445.613C144.637 433.766 121.314 416.598 102.166 395.5L154.965 395.078ZM184.336 381.832L205.244 353.062H306.756L327.664 381.832L303.498 458.316C288.215 461.906 272.363 464 256 464S223.785 461.906 208.502 458.316L184.336 381.832ZM353.531 363.031L333.063 334.867L364.629 237.516L397.826 226.73L463.121 273.352C460.385 306.242 449.92 336.898 433.617 363.684L353.531 363.031ZM409.834 395.5C390.686 416.598 367.363 433.766 341.062 445.613L357.035 395.078L409.834 395.5ZM419.492 202.895L436.264 152.668C450.311 177.07 459.65 204.492 462.775 233.797L419.492 202.895Z"/></svg>
                                )}))}
                            />
                        </FormValidate>
                        
                        <FormValidate
                            message="Your username must contain at least 3 characters"
                            isValid={formValidation.username}
                            validate={formValidate}
                        >
                            <FormText 
                                value={formData.username}
                                setValue={(username) => setFormData({ ...formData, username })}
                                placeholder="Your username"
                                name="form-username"
                                labelIcon={(
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM224 32C276.936 32 320 75.064 320 128C320 180.934 276.936 224 224 224S128 180.934 128 128C128 75.064 171.064 32 224 32ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304ZM413.336 480H34.664C33.195 480 32 478.803 32 477.332C32 399.4 95.402 336 173.336 336H274.664C352.598 336 416 399.4 416 477.332C416 478.803 414.805 480 413.336 480Z"/></svg>
                                )}
                            />
                        </FormValidate>
                        <FormValidate
                            message="Your password must contain at least 8 characters"
                            isValid={formValidation.password}
                            validate={formValidate}
                        >
                            <FormText 
                                value={formData.password}
                                setValue={(password) => setFormData({ ...formData, password })}
                                placeholder="Your password"
                                password
                                name="form-password"
                                labelIcon={(
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 224H384V128C384 57.406 326.594 0 256 0S128 57.406 128 128V224H96C60.654 224 32 252.652 32 288V448C32 483.346 60.654 512 96 512H416C451.348 512 480 483.346 480 448V288C480 252.652 451.348 224 416 224ZM160 128C160 75.062 203.062 32 256 32S352 75.062 352 128V224H160V128ZM448 448C448 465.645 433.645 480 416 480H96C78.355 480 64 465.645 64 448V288C64 270.355 78.355 256 96 256H416C433.645 256 448 270.355 448 288V448Z"/></svg>
                                )}
                            />
                        </FormValidate>
                        <FormValidate
                            isValid={formValidation.termsAndConditions}
                            validate={formValidate}
                        >
                            <FormCheckbox 
                                value={formData.termsAndConditions}
                                setValue={(termsAndConditions) => setFormData({ ...formData, termsAndConditions })}
                                name="form-terms-and-conditions"
                                label="By ticking, you are confirming that you have read, understood and agree terms and conditions"
                            />
                        </FormValidate>
                        <FormValidate
                            isValid={formValidation.privacyPolicy}
                            validate={formValidate}
                        >
                            <FormToggle 
                                value={formData.privacyPolicy}
                                setValue={(privacyPolicy) => setFormData({ ...formData, privacyPolicy })}
                                name="form-privacy-policy"
                                label="Accept the privacy policy"
                                labelIcon={(
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M466.5 83.75L274.5 3.75C268.625 1.25 262.344 0 256.062 0S243.5 1.25 237.625 3.75L45.625 83.75C27.75 91.125 16 108.625 16 128C16 385.451 205.434 512 255.938 512C305.196 512 496 387.357 496 128C496 108.625 484.25 91.125 466.5 83.75ZM255.967 32H255.814C255.867 32 255.914 32 255.967 32ZM48 128C48 121.5 51.875 115.75 57.75 113.25L240 37.312V474.246C145.131 430.555 48 298.094 48 128ZM463.875 128.318C463.875 298.329 366.732 430.683 272 474.297V37.367L454.125 113.25C463.273 117.062 463.875 125.848 463.875 128.318Z "></path></svg>
                                )}
                            />
                        </FormValidate>
                        <FormValidate
                            message={formValidation.uploadMaxSize ? 'Your profile picture must not exceed 8Mo' : 'You must upload a profile photo'}
                            isValid={formValidation.upload}
                            validate={formValidate}
                        >
                            <FormUpload 
                                value={formData.upload}
                                setValue={(upload) => setFormData({ ...formData, upload })}
                                clear
                                accept="image/png, image/jpeg"
                                placeholder="Add a file"
                                labelIcon={(
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M365.256 125.254L258.746 18.746C246.744 6.742 230.465 0 213.49 0H64C28.654 0 0 28.654 0 64V448C0 483.346 28.654 512 64 512H320C355.348 512 384 483.346 384 448V170.51C384 153.535 377.258 137.258 365.256 125.254ZM342.627 147.879C346.08 151.332 348.357 155.523 349.924 160H240C231.188 160 224 152.828 224 144V34.076C228.477 35.643 232.666 37.922 236.119 41.375L342.627 147.879ZM352 448C352 465.645 337.645 480 320 480H64C46.355 480 32 465.645 32 448V64C32 46.355 46.355 32 64 32H192V144C192 170.469 213.531 192 240 192H352V448Z"/></svg>
                                )}
                            />
                        </FormValidate>
                    </div>
                    <div>
                        <div>
                            <FormToggle 
                                value={formValidate}
                                setValue={setFormValidate}
                                label="Form validation"
                                name="form-validation"
                                labelIcon={(
                                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M320 64C311.156 64 304 71.156 304 80S311.156 96 320 96C337.641 96 352 110.344 352 128V448C352 465.656 337.641 480 320 480H64C46.359 480 32 465.656 32 448V128C32 110.344 46.359 96 64 96C72.844 96 80 88.844 80 80S72.844 64 64 64C28.703 64 0 92.719 0 128V448C0 483.281 28.703 512 64 512H320C355.297 512 384 483.281 384 448V128C384 92.719 355.297 64 320 64ZM112 128H272C280.844 128 288 120.844 288 112S280.844 96 272 96H247.123C252.621 86.555 256 75.717 256 64C256 28.654 227.346 0 192 0S128 28.654 128 64C128 75.717 131.379 86.555 136.877 96H112C103.156 96 96 103.156 96 112S103.156 128 112 128ZM192 32C209.645 32 224 46.355 224 64S209.645 96 192 96S160 81.645 160 64S174.355 32 192 32ZM84.688 299.312L148.688 363.312C151.812 366.438 155.906 368 160 368S168.188 366.438 171.312 363.312L299.312 235.312C305.562 229.062 305.562 218.937 299.312 212.688S282.937 206.438 276.688 212.688L160 329.375L107.312 276.688C101.062 270.438 90.937 270.438 84.688 276.688S78.438 293.062 84.688 299.312Z"/></svg>
                                )}
                            />
                        </div>
                        <div className="flex flex-col mt-8 gap-8">
                            {Object.entries(formData).map((formInput, index) => (
                                <div className="grid grid-cols-2" key={`input-${index}`}>
                                    <div className="font-semibold">{formInput[0]}</div>
                                    <pre>{JSON.stringify(formInput[1])}</pre>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
                <div className="mb-40"></div>
            </div>
            <Dialog open={dialog1} onClose={() => setDialog1(false)} onClickOutside={() => setDialog1(false)}>
                <DialogBackdrop />
                <DialogPannel>
                    <DialogClose />
                    <div className="flex flex-col gap-8 px-16 py-24 pb-16">
                        <h1 className="text-4xl">Modal title</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        
                    </div>
                </DialogPannel>
            </Dialog>
            <Dialog open={dialog2} onClose={() => setDialog2(false)} onClickOutside={() => setDialog2(false)}>
                <DialogBackdrop />
                <DialogPannel center className="max-w-2xl">
                    <DialogClose />
                    <div className="flex flex-col gap-8 px-8 pt-12 pb-8">
                        <h1 className="text-2xl leading-6">Modal title</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aliquid nulla soluta autem dolores velit quo doloribus, quis officiis harum praesentium enim ab deleniti suscipit! Dolore, blanditiis! Corporis, debitis veniam?</p>
                        <div className="flex justify-end gap-8">
                            <button 
                                className="flex items-center h-12 px-8 bg-red-500 text-white text-lg font-medium" 
                                onClick={() => setDialog2(false)}
                            >Cancel</button>
                            <button 
                                className="flex items-center h-12 px-8 bg-sky-500 text-white text-lg font-medium" 
                                onClick={() => setDialog2(false)}
                            >Next</button>
                        </div>
                    </div>
                </DialogPannel>
            </Dialog>

        </>
    )
}
export default IndexPage