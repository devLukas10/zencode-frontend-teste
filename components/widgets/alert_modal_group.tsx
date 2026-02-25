/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { BsExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
export interface AlertModalType {
    message?:  string;
    isSucess?: boolean;
    duration?: number;
    show?: boolean;
}

export function AlertModalGroup({show, message, isSucess}: AlertModalType) {

    if (!show) return <div className='hidden' />

    return <div className="w-full max-w-[400px] min-h-[40px] p-2 flex  fixed top-0 right-0 z-4">
        {!isSucess? (
            <div className="w-full rounded-md bg-red-200 flex items-center p-4 gap-2 shadow-sm">
                <BsExclamationCircleFill color='red' />
                <span className="text-red-600 text-[11pt]">
                    {message}
                </span>
            </div>
        ): (
            <div className="w-full rounded-md bg-green-200 flex items-center p-4 gap-2 shadow-sm">
                <BsCheckCircleFill color='green' />
                <span className="text-green-600 text-[11pt]">
                    {message}
                </span>
            </div>
        )}
        
    </div>
}