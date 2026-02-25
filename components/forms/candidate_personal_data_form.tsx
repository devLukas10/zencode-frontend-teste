/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ButtonGroup, ButtonGroupType } from "../widgets/button_group"
import { InputGroup } from "../widgets/input_group";
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";
import { LuUser } from "react-icons/lu";
import { CandidateRepository } from "@/repository/candidate_repository";
import { CANDIDATE_FORM_CONTETX_LABELS } from "@/constants/app_contexts";

export interface CandidateFormTypes {
    data?: null | any;
    show?: boolean;
    next?: ()=> void;
    onPreview?:()=> void;
    cb?: (data: any)=> void;
}


const repository = new CandidateRepository();

export const CadidatePersonalDataForm = ({show, next, cb}: CandidateFormTypes)=> {
    const [_currentData, setCurrentData] = useState<CandidatePersonalDataTypes>();
    const [_btnState, setBtnState] = useState<ButtonGroupType>({loading: false, disabled: true});
    const [_file, setFile] = useState<any>(null);
    const [_fileView, setFileView] = useState<any>(null);
    const [_upSetData, setupSetData] = useState<CandidatePersonalDataTypes>();
    

    function submit(e: any) {
        e.preventDefault();
        setBtnState({loading: true});

        repository.candidate_create({..._currentData, ..._upSetData}, _file, (code, data)=> {
            
            if (code !== 200) return setTimeout(()=> {
                setBtnState({loading: false});
            }, 1500);

            cb!(data);
            setupSetData(data);

            setTimeout(()=> {
                next!();
                setBtnState({loading: false});
            }, 1500);
        });        
    }

    if (!show) return <div className='hidden' />

    return <div className="w-full flex flex-col h-[200px] mt-[20px]">
        <label htmlFor="input-avatar" className="m-0 mb-[35px] w-[100px] h-[100px]">
            <div className="w-[100px] h-[100px] rounded-full border border-gray-200 cursor-pointer flex items-center justify-center"
                style={{
                    backgroundImage: `url(${_fileView})`,
                    backgroundPosition: 'center',
                    backgroundSize:'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {!_fileView ? <LuUser size={40} color='gray' /> : ''}                
            </div>
        </label>
        
        <form onSubmit={(e)=> submit(e)}
            className={`w-full flex flex-col h-[200px] gap-2`}
        >
            <InputGroup.Root
                label={CANDIDATE_FORM_CONTETX_LABELS.lab1}
                errorText=""
            >
                <InputGroup.Input
                    value={_currentData?.fullname}
                    onChange={(txt)=> setCurrentData({..._currentData, fullname: txt})}

                    type="text"
                    placeholder="- - - - - -"
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
            <InputGroup.Root
                type="email"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab2}
                errorText=""
            >
                <InputGroup.Input
                    value={_currentData?.email}
                    onChange={(txt)=> setCurrentData({..._currentData, email: txt})}

                    type='email'
                    placeholder="- - - - - -"
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab3}
                errorText=""
            >
                <InputGroup.Input
                    value={_currentData?.number}
                    onChange={(txt)=> setCurrentData({..._currentData, number: txt})}

                    placeholder="- - - - - -"
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab4}
                errorText=""
            >
                <InputGroup.Input
                    value={_currentData?.address}
                    onChange={(txt)=> setCurrentData({..._currentData, address: txt})}
                    placeholder="- - - - - -"
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>

            <ButtonGroup.CustomButton
                className="w-full rounded-md p-3 bg-blue-500 flex items-center justify-center cursor-pointer mt-[10px] "
                loading={_btnState.loading}
                disabled={_btnState.disabled}
            >
                <span className="font-bold text-white">
                    {CANDIDATE_FORM_CONTETX_LABELS.lab18}
                </span>
            </ButtonGroup.CustomButton>

            {/***  */}
            
        </form>

        <input
            onChange={(e)=> {
                const res = Array.from(e.target.files as any)[0];
                setFile(res);
                setFileView(URL.createObjectURL(res as Blob))
            }}
            id="input-avatar"
            type="file"
            accept="image/.png .jpg .jpeg"
            className="w-0 h-0 text-transparent p-0 bg-transparent"
        />
    </div>
    
}