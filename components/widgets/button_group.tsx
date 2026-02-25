/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ButtonGroupType  {
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: ()=> void;
    children?: ReactNode;
}

function CustomButton({
    className,
    children,
    disabled,
    loading,
    onClick,
}: ButtonGroupType) {
    return <button>
        <div
            className={className}
            onClick={disabled ? ()=>{} : loading ? ()=>{} : onClick }
        >  
            {loading 
                ? <div className="load-button w-[20px] h-[20px] rounded-full p-2 " />
                :  children
            }
        </div>
    </button>
}



export const ButtonGroup = {
    CustomButton
}