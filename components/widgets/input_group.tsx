/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react"

type inputGroupType = {
    type?: 'text' | 'number' | 'password' | 'email' | 'address',
    placeholder?: string,
    value?: string,
    label?: string;
    errorText?: string;
    isInvalid?: boolean;
    required?: boolean;
    onChange?: (value: any)=> void;
    startElement?: null | ReactNode;
    endElement?: null | ReactNode;
    className?: string;
    children?:  ReactNode;
}

export const Input = ({type, placeholder, className, onChange, value, isInvalid, required}: inputGroupType)=> {
    return <input
        type={type}
        placeholder={placeholder}
        className={className + `${isInvalid? 'border border-red-500' : ''}`}
        onChange={(e)=> onChange!(e.target.value)}
        value={value}
        required={required}
    />
}

const Root = ({children, startElement, endElement, label, errorText,}: inputGroupType)=> {
    return <div className="w-full flex flex-col gap-2">
        <span className="text-gray-600 text-[11pt] ">{label}</span>
        <div className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 flex items-center justify-between gap-2">
            {startElement ? (
                <div className="items-center flex">
                    {startElement}
                </div>
            ): <div className='hidden' />}
            
            <div className="items-center flex w-full">
                {children}
            </div>

            {endElement? (
                <div className="items-center flex">
                    {endElement}
                </div>
            ): <div className='hidden' />}

        </div>
        <span className="text-red-500">{errorText}</span>
    </div>
}

export const InputGroup = {
    Root,
    Input
}