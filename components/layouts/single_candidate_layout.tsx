/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ButtonGroupType, ButtonGroup } from "@/components/widgets/button_group";
import { InputGroup } from "@/components/widgets/input_group";
import { ModalCenterSheet } from "@/components/widgets/modal_center_sheet";
import { APP_CONFIG } from "@/constants/app_config";
import { CANDIDATE_FORM_CONTETX_LABELS } from "@/constants/app_contexts";
import { CandidateRepository } from "@/repository/candidate_repository";
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";
import { useState } from "react";
import { LuUser } from "react-icons/lu";


interface SingleTypes{
    show?: boolean;
    data?: CandidatePersonalDataTypes;
    onDismiss?: ()=> void;
    cb?: ()=> void;
}

const repository = new CandidateRepository();

export function SingleCandidateLayout({show, data, onDismiss, cb}: SingleTypes){
    
    const [_upSetCandidateDatas, setSetOnCandidateDatas] = useState<CandidatePersonalDataTypes>()
    const [_btnState, setBtnState] = useState<ButtonGroupType>({loading: false, disabled: false});
    const [_fileView, setFileView] = useState<any>(data?.picture);
    const [_document, setDocument] = useState<any>(null);
    const avatar = `${APP_CONFIG.server_uri}${data?.picture}`;



    /// onsubmit picture
    async function updatePicture(file: any | null) {
        repository.candidate_create({...data, ..._upSetCandidateDatas}, file, (code, data)=> {
            setSetOnCandidateDatas(data);
        });
    }

    /// updateManyData
    function updateManyData() {
        setBtnState({loading: true});

        repository.candidate_create({...data, ..._upSetCandidateDatas}, _document, (code, data)=> {

            if (code !== 200) return setTimeout(()=> {
                setBtnState({loading: false});
            }, 1500);

            setSetOnCandidateDatas(data);
            setTimeout(()=> { setBtnState({loading: false}); }, 1500);
        }); 
    }

    /// updateManyData
    function destroyOne() {
        setBtnState({loading: true});

        repository.candidate_destroyOne(data?.uid as string, (code)=> {

            if (code !== 200) return setTimeout(()=> {
                setBtnState({loading: false});
            }, 1500);

            setTimeout(()=> { setBtnState({loading: false}); cb!() }, 1500);
        }); 
    }


    return <ModalCenterSheet
        title={data?.fullname || ""}
        show={show}
        onDismiss={onDismiss}
        className="max-w-[1300px] w-full min-h-[600px] bg-white rounded-md"
    >
        <div className="wrap-container w-full flex gap-2">
        <label htmlFor="input-avatar" className="m-0 mb-[35px] w-[100px] h-[100px]">
            <div className="w-[100px] h-[100px] rounded-full border border-gray-200 cursor-pointer flex items-center justify-center"
                style={{
                    backgroundImage: `url(${!_fileView ? avatar : _fileView})`,
                    backgroundPosition: 'center',
                    backgroundSize:'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {!_fileView ? !data?.picture ? <LuUser size={40} color='gray' /> : '' : ''}                
            </div>
        </label>
        <div className="w-full"></div>
        
        {/** **** ** * */}
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                label={CANDIDATE_FORM_CONTETX_LABELS.lab1}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.fullname}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, fullname: txt})}

                    type="text"
                    placeholder="- - - - -"
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="email"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab2}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.email}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, email: txt})}

                    type='email'
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab3}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.number}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, number: txt})}

                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab4}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.address}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, address: txt})}
                    placeholder="- - - - -"
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        {/**** *****   */}
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                label={CANDIDATE_FORM_CONTETX_LABELS.lab5}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.position}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, position: txt})}

                    type="text"
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab6}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.level}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, level: txt})}

                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab7}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.time_availabled}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, time_availabled: txt})}

                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="number"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab8}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.estimat_salary}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, estimat_salary: txt})}
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        {/*** * ** ** */}
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                label={CANDIDATE_FORM_CONTETX_LABELS.lab10}
                errorText=""
            >
            <InputGroup.Input
                value={data?.experience_years}
                onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, experience_years: txt})}
                type="text"
                className="w-full"
                required={true}
            />
        </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab11}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.current_company}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, current_company: txt})}
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab12}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.technlogies}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, technlogies: txt})}
                    className="w-full"
                    required={true}
                />
            </InputGroup.Root>
        </div>
        {/**** ****  */}
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                label={CANDIDATE_FORM_CONTETX_LABELS.lab13}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.likendin}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, likendin: txt})}
                    type="text"
                    placeholder="Your Linkedin"
                    className="w-full"
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab14}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.github}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, github: txt})}
                    className="w-full"
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <InputGroup.Root
                type="text"
                label={CANDIDATE_FORM_CONTETX_LABELS.lab15}
                errorText=""
            >
                <InputGroup.Input
                    value={data?.web_porfolio}
                    onChange={(txt)=> setSetOnCandidateDatas({..._upSetCandidateDatas, web_porfolio: txt})}
                    className="w-full"
                />
            </InputGroup.Root>
        </div>
        <div className="w-full max-w-[280px]">
            <div className="w-full flex flex-col gap-2">
                <span className="text-[11pt] text-gray-600 ">{CANDIDATE_FORM_CONTETX_LABELS.lab16}</span>
                <input
                    onChange={(e)=> setDocument(Array.from(e.target.files as any)[0]) }
                    type="file"
                    accept=".pdf"
                    required
                    className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md mb-[20px]"
                />
            </div>
        </div>

        {/***** btn */}
        <div className="flex w-full items-center justify-end gap-4">

            <ButtonGroup.CustomButton
                onClick={updateManyData}
                loading={_btnState.loading}
                disabled={_btnState.disabled}
                className="min-w-[120px] rounded-md p-3 bg-blue-500 flex items-center justify-center cursor-pointer"
            >
                <span className="font-bold text-white">
                    {CANDIDATE_FORM_CONTETX_LABELS.lab21}
                </span>
            </ButtonGroup.CustomButton>

            <ButtonGroup.CustomButton
                onClick={destroyOne}
                loading={_btnState.loading}
                disabled={_btnState.disabled}
                className="w-[120px] rounded-md p-3 bg-red-500 flex items-center justify-center cursor-pointer"
            >
                <span className="font-bold text-white">
                    {CANDIDATE_FORM_CONTETX_LABELS.lab22}
                </span>
            </ButtonGroup.CustomButton>
        </div>

        {/***  */}
        <input
            onChange={async (e)=> {
                const res = Array.from(e.target.files as any)[0];
                await updatePicture(res);
                setFileView(URL.createObjectURL(res as Blob))
            }}
            id="input-avatar"
            type="file"
            accept="image/*"
            className="w-0 h-0 text-transparent p-0 bg-transparent"
        />
        </div>
    </ModalCenterSheet>
}