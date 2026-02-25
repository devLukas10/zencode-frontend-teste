
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, useState } from 'react';
import  { BiChevronDown, BiChevronUp } from 'react-icons/bi';

type selectTypes = {
    placeholder?: string | null;
    children?: ReactNode;
    datas?: any[];
    onChange: (value: string)=> void;
    className?: string;
}


/// WithTextOption
function WithTextOption({placeholder, onChange}: selectTypes){

    const [_showDropMenu, setShowDropMenu] = useState<boolean>(false);
    const [_value, setValue] = useState<any>(null);

    return <>
        <div className="relative w-full h-[50px] max-w-[250px] p-2 rounded-md bg-white gap-4">
            <div
                className="w-full h-[35px] flex items-center justify-between cursor-pointer gap-4"
                onClick={()=> {
                    setShowDropMenu(_showDropMenu ? false: true);
                }}
            >
                {!_value ? (
                    <span className="text-gray-500 text-[11pt] ">
                        {placeholder}
                    </span>
                ):(
                    <span className="text-gray-600 text-[11pt] ">
                        {_value}
                    </span>
                )}
                
                {!_showDropMenu ? (
                    <span className="bg-blue-100 rounded-sm ">
                        <BiChevronDown color='blue' size={15} />
                    </span>
                ): (
                    <span className="bg-blue-100 rounded-sm ">
                        <BiChevronUp color='blue' size={15} />
                    </span>
                )}                
            </div>
            {!_showDropMenu ? <div /> : (
                <div className="w-full bg-gray-50 p-1 rounded-md mt-3 shadow-sm">
                    <div className={`p-2 w-full hover:bg-gray-100 cursor-pointer`}
                        onClick={()=>{
                            onChange("");
                            setValue("Frontend developer");
                            setShowDropMenu(false);
                        }}
                    >
                        <span className={`text-[11pt] text-gray-600`}>
                            Frontend developer
                        </span>
                    </div>
                </div>
            )}
        </div>
    </>
}

/// Custom
function Custom({placeholder, onChange, className}: selectTypes){

    const [_showDropMenu, setShowDropMenu] = useState<boolean>(false);
    const [_value, setValue] = useState<any>(null);

    return <>
        <div className={className}>
            <div
                className="w-full h-[35px] flex items-center justify-between cursor-pointer gap-4"
                onClick={()=> {
                    setShowDropMenu(_showDropMenu ? false: true);
                }}
            >
                {!_value ? (
                    <span className="text-gray-500 text-[11pt] ">
                        {placeholder}
                    </span>
                ):(
                    <span className="text-gray-600 text-[11pt] ">
                        {_value}
                    </span>
                )}
                
                {!_showDropMenu ? (
                    <span className="bg-blue-100 rounded-sm ">
                        <BiChevronDown color='blue' size={15} />
                    </span>
                ): (
                    <span className="bg-blue-100 rounded-sm ">
                        <BiChevronUp color='blue' size={15} />
                    </span>
                )}                
            </div>
            {!_showDropMenu ? <div /> : (
                <div className="w-full bg-gray-50 p-1 rounded-md mt-3 shadow-sm">
                    <div className={`p-2 w-full hover:bg-gray-100 cursor-pointer`}
                        onClick={()=>{
                            onChange("");
                            setValue("Frontend developer");
                            setShowDropMenu(false);
                        }}
                    >
                        <span className={`text-[11pt] text-gray-600`}>
                            English
                        </span>
                    </div>
                </div>
            )}
        </div>
    </>
}




export const SelectGroup = {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    WithTextOption,
    Custom,
}
