"use client";
import { BiSolidBell } from "react-icons/bi";
import { SelectGroup } from "../widgets/select_group";
import { useState } from "react";import { CircularAvatar } from "../widgets/circular_avatar";
import { USER_HOOKS } from "@/hooks/user_hook";
import { UserTypes } from "@/types/user_types";
import Link from "next/link";
import { HEADER_CONTEXT_LABELS } from "@/constants/app_contexts";
import { APP_CONFIG } from "@/constants/app_config";
import { ButtonGroup, ButtonGroupType } from "../widgets/button_group";
import { LuLogOut } from "react-icons/lu";
import { APP_ROUTE_NAMES } from "@/constants/app_route_name";





function RenderDropmenu({data, show}:{data?: UserTypes, show?: boolean}) {
    const [_btnState, setBtnState] = useState<ButtonGroupType>({loading: false, disabled: false});
    


    function LogOut() {
        setBtnState({loading: true});

        setTimeout(()=> {
            localStorage.clear()
            location.reload();
        }, 1500);      
    }

    if(!show) return <div className="hidden"/>;


    return <div className="w-[230px] h-[250] bg-white rounded-xl p-4 shadow-md fixed top-[90px] right-[25px]
        flex flex-col items-center gap-2
    ">
        <CircularAvatar
            className="w-[70px] h-[70px] text-[20pt] bg-gray-200 "
            src={data?.picture_uri}
        />
        <span className="text-gray-600 text-[11pt] ">
            {data?.firstname} {data?.lastname}
        </span>
        <span className="text-gray-600 text-[11pt] ">
            {data?.email}
        </span> 
        <br />
        <ButtonGroup.CustomButton
            className="w-[200px] p-2 rounded-md bg-red-100 flex items-center mt-2 gap-4"
            loading={_btnState.loading}
            disabled={_btnState.disabled}
            onClick={LogOut}
        >   
            <LuLogOut color='red' />
            <span className="text-red-500">{HEADER_CONTEXT_LABELS.lab2}</span>
        </ButtonGroup.CustomButton>
    </div>
}


export const HeaderComponent = ()=> {
    const [_upSetUserData, setUpSetUserData] = useState<UserTypes>();
    const [_showDropMenu, setShowDropMenu] = useState<boolean>(false);


    USER_HOOKS({
        upSetUserData(data) {
            setUpSetUserData(data);
        },
    });
    

    


    return <div className="w-[95%] flex items-center justify-between p-4 rounded-md bg-white ">
        <nav className="flex items-center">
            <Link href={APP_ROUTE_NAMES.add_candidate}
                className="p-2 rondend-md bg-blue-400 text-white font-bold shadow-md cursor-pointer"
            >
                {HEADER_CONTEXT_LABELS.lab1}
            </Link>
        </nav>
        <nav className="flex items-center gap-4">

            {/** PAGE TRANSLATE BUTTON */}
            <SelectGroup.Custom
                className="w-[120px] h-[42px] pl-2 pr-2 pt-1 bg-blue-50 rounded-md "
                onChange={(e)=> console.log(e)}
                placeholder={'Português'}
            />

            <button className="p-3 rounded-md bg-blue-50 hover:bg-blue-50 cursor-pointer ">
                <BiSolidBell color={'blue'} />
            </button>

            <div className="flex items-center">
                <span className="font-bold text-gray-700">{APP_CONFIG.name}</span>
                <span className="font-light text-gray-400">{APP_CONFIG.slog}</span>
            </div>

            {/*** CircularAvatar */}
            <CircularAvatar
                onClick={()=> setShowDropMenu(!_showDropMenu ? true : false)}
                className="w-[40px] h-[40px] bg-gray-200 "
                src={_upSetUserData?.picture_uri}
            />
        </nav>

        {/*** RenderDropmenu */}
        <RenderDropmenu
            data={_upSetUserData}
            show={_showDropMenu}
        />
    </div>
}