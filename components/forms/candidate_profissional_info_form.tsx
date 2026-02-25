/* eslint-disable @typescript-eslint/no-explicit-any */
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";
import { useState } from "react";
import { ButtonGroup, ButtonGroupType } from "../widgets/button_group"
import { InputGroup } from "../widgets/input_group";
import { CandidateFormTypes } from "./candidate_personal_data_form";
import { CandidateRepository } from "@/repository/candidate_repository";
import { CANDIDATE_FORM_CONTETX_LABELS } from "@/constants/app_contexts";

const repository = new CandidateRepository();

export const CadidateProfissionaInfoForm = ({show, data, next, onPreview, cb}: CandidateFormTypes)=> {
    const [_currentData, setCurrentData] = useState<CandidatePersonalDataTypes>();
    const [_btnState, setBtnState] = useState<ButtonGroupType>({loading: false, disabled: false});
    

    function submit(e: any) {
        e.preventDefault();
        setBtnState({loading: true});

        repository.candidate_create({...data, ..._currentData}, null, (code, datas)=> {
            
            if (code !== 200) return setTimeout(()=> {
                setBtnState({loading: false});
            }, 1500);

            cb!(datas);

            setTimeout(()=> {
                next!();
                setBtnState({loading: false});
            }, 1500);
        }); 
    }

    if (!show) return <div className='hidden' />

    return <form onSubmit={(e)=> submit(e)}
        className={`w-full flex flex-col h-[200px] gap-2 mt-[20px]`}
    >
        <InputGroup.Root
            label={CANDIDATE_FORM_CONTETX_LABELS.lab5}
            errorText=""
        >
            <InputGroup.Input
                value={_currentData?.position}
                onChange={(txt)=> setCurrentData({..._currentData, position: txt})}

                type="text"
                placeholder="- - - - - -"
                className="w-full"
                required={true}
            />
        </InputGroup.Root>
        <InputGroup.Root
            type="text"
            label={CANDIDATE_FORM_CONTETX_LABELS.lab6}
            errorText=""
        >
            <InputGroup.Input
                value={_currentData?.level}
                onChange={(txt)=> setCurrentData({..._currentData, level: txt})}
                placeholder="- - - - - -"
                className="w-full"
                required={true}
            />
        </InputGroup.Root>
        <InputGroup.Root
            type="text"
            label={CANDIDATE_FORM_CONTETX_LABELS.lab7}
            errorText=""
        >
            <InputGroup.Input
                value={_currentData?.time_availabled}
                onChange={(txt)=> setCurrentData({..._currentData, time_availabled: txt})}
                placeholder="- - - - - -"
                className="w-full"
                required={true}
            />
        </InputGroup.Root>
        <InputGroup.Root
            type="number"
            label={CANDIDATE_FORM_CONTETX_LABELS.lab8}
            errorText=""
        >
            <InputGroup.Input
                value={_currentData?.estimat_salary}
                onChange={(txt)=> setCurrentData({..._currentData, estimat_salary: txt})}
                placeholder="0-1000, 1000-10,000"
                className="w-full"
                required={true}
            />
        </InputGroup.Root>


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
                className="w-[120px] rounded-md p-3 bg-blue-500 flex items-center justify-center cursor-pointer"
            >
                <span className="font-bold text-white">
                    {CANDIDATE_FORM_CONTETX_LABELS.lab18}
                </span>
            </ButtonGroup.CustomButton>
        </div>

        
    </form>
}