"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";
import { useState } from "react";
import { ButtonGroup, ButtonGroupType } from "../widgets/button_group"
import { InputGroup } from "../widgets/input_group";
import { CandidateFormTypes } from "./candidate_personal_data_form";
import { CandidateRepository } from "@/repository/candidate_repository";
import { CANDIDATE_FORM_CONTETX_LABELS } from "@/constants/app_contexts";
import { useRouter } from "next/navigation";

const repository = new CandidateRepository();

export const CadidatePorfolioAndLinkInfoForm = ({show, data, next, onPreview}: CandidateFormTypes)=> {
    const route = useRouter();
    const [_currentData, setCurrentData] = useState<CandidatePersonalDataTypes>();
    const [_btnState, setBtnState] = useState<ButtonGroupType>({loading: false, disabled: false});
    const [_file, setFile] = useState<any>(null);
    

    function submit(e: any) {
        e.preventDefault();
        setBtnState({loading: true});

        repository.candidate_create({...data, ..._currentData}, _file, (code, datas)=> {
            if (code !== 200) return setTimeout(()=> {
                setBtnState({loading: false});
            }, 1500);

            setTimeout(()=> {
                setBtnState({loading: false});
                route.back();
            }, 1500);
        }); 
    }

    if (!show) return <div className='hidden' />
    
    return <form onSubmit={(e)=> submit(e)}
        className={`w-full max-w-[500px] flex flex-col h-[200px] gap-2 mt-[20px]`}
    >
        <InputGroup.Root
            label={CANDIDATE_FORM_CONTETX_LABELS.lab13}
            errorText=""
        >
            <InputGroup.Input
                value={_currentData?.likendin}
                onChange={(txt)=> setCurrentData({..._currentData, likendin: txt})}
                type="text"
                placeholder="Your Linkedin"
                className="w-full"
            />
        </InputGroup.Root>
        <InputGroup.Root
            type="text"
            label={CANDIDATE_FORM_CONTETX_LABELS.lab14}
            errorText=""
        >
            <InputGroup.Input
                value={_currentData?.github}
                onChange={(txt)=> setCurrentData({..._currentData, github: txt})}
                placeholder="- - - - - -"
                className="w-full"
            />
        </InputGroup.Root>
        <InputGroup.Root
            type="text"
            label={CANDIDATE_FORM_CONTETX_LABELS.lab15}
            errorText=""
        >
            <InputGroup.Input
                value={_currentData?.web_porfolio}
                onChange={(txt)=> setCurrentData({..._currentData, web_porfolio: txt})}
                placeholder="- - - - - - -"
                className="w-full"
            />
        </InputGroup.Root>

        <div className="w-full flex flex-col gap-2">
            <span className="">{CANDIDATE_FORM_CONTETX_LABELS.lab16}</span>
            <input
                onChange={(e)=> setFile(Array.from(e.target.files as any)[0]) }
                type="file"
                accept=".pdf"
                required
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md mb-[20px]"
            />
        </div>


        <div className="flex w-full items-center justify-end gap-4 mt-[30px] ">
            <ButtonGroup.CustomButton
                onClick={onPreview}
                loading={_btnState.loading}
                disabled={_btnState.disabled}
                className="w-[120px] rounded-md p-3 bg-gray-500 flex items-center justify-center cursor-pointer"
            >
                <span className="font-bold text-white">
                    {CANDIDATE_FORM_CONTETX_LABELS.lab17}
                </span>
            </ButtonGroup.CustomButton>

            <ButtonGroup.CustomButton
                loading={_btnState.loading}
                disabled={_btnState.disabled}
                className="min-w-[120px] rounded-md p-3 bg-blue-500 flex items-center justify-center cursor-pointer"
            >
                <span className="font-bold text-white">
                    {CANDIDATE_FORM_CONTETX_LABELS.lab19}
                </span>
            </ButtonGroup.CustomButton>
        </div>
    </form>
}