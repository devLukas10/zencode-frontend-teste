"use client";
import { BsGoogle } from "react-icons/bs";
import { ButtonGroup, ButtonGroupType } from "@/components/widgets/button_group";
import { FirebaseService } from "@/services/firebase.service";
import { useState } from "react";
import { AlertModalGroup, AlertModalType } from "@/components/widgets/alert_modal_group";
import { AUTH_LOGIN_CONTEXT_LABELS } from "@/constants/app_contexts";
import { APP_CONFIG } from "@/constants/app_config";
import Image from "next/image";



const service = new FirebaseService();


export function AuthLoginLayout(){
    const [_btnState, setBtnState] = useState<ButtonGroupType>({loading: false, disabled: true});
    const [_alertState, seAlertState] = useState<AlertModalType>();
    

    async function submit(){
        setBtnState({..._btnState, loading: true});

        await service.siginWidthGoogleProvider({cb: (res)=> {
            setBtnState({..._btnState, loading: false});
            
            if(res === 200) return seAlertState({
                message: AUTH_LOGIN_CONTEXT_LABELS.lab8,
                show: true,
                isSucess: true,
            });

            seAlertState({
                message: AUTH_LOGIN_CONTEXT_LABELS.lab9,
                show: true,
                isSucess: false,
            });
        }})
    }


    return <div className="w-full h-screen flex items-center justify-center">
        {/**** AlertModalGroup */}
        <AlertModalGroup
            show={_alertState?.show}
            message={_alertState?.message}
            duration={_alertState?.duration}
            isSucess={_alertState?.isSucess}
        />


        {/**** */}
        <div className="w-full max-w-[450px] m-2 flex flex-col gap-4 rounded-md p-8 bg-white min-h-[470px] shadow-md">
            <div className="flex items-center w-full gap-10">
                <Image
                    src={APP_CONFIG.icons[0]}
                    alt={APP_CONFIG.display_name}
                    width={50}
                    height={50}
                />
                <div className="h-[100px] w-[2px] bg-gray-200 rounded-md "></div>
                <div className="flex flex-col justify-center h-[100px] gap-1">
                    <span className="text-gray-500">{AUTH_LOGIN_CONTEXT_LABELS.lab1}</span>
                    <span className="text-gray-500">{AUTH_LOGIN_CONTEXT_LABELS.lab2}</span>
                </div>
            </div>

            <h1 className="text-gray-600 font-bold text-2xl">
                {AUTH_LOGIN_CONTEXT_LABELS.lab3}
            </h1>
            <span className="text-gray-500">
                {AUTH_LOGIN_CONTEXT_LABELS.lab4} <br />
                {AUTH_LOGIN_CONTEXT_LABELS.lab5} <br /><br />
                {AUTH_LOGIN_CONTEXT_LABELS.lab6}
            </span>

            <br />
            <ButtonGroup.CustomButton
                onClick={submit}
                loading={_btnState.loading}
                className="w-full border border-gray-200 bg-blue-500 rounded-md p-4 flex items-center justify-center gap-4"
            >
                <BsGoogle color='#fff' />
                <span className="text-white font-bold">
                    {AUTH_LOGIN_CONTEXT_LABELS.lab7}
                </span>
            </ButtonGroup.CustomButton>
        </div>
    </div>
}