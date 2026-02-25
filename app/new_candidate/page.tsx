/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CadidateExperienceInfoForm } from "@/components/forms/candidate_experience_info_form";
import { CandidateFormGroup } from "@/components/forms/candidate_form_group";
import { CadidatePersonalDataForm } from "@/components/forms/candidate_personal_data_form";
import { CadidatePorfolioAndLinkInfoForm } from "@/components/forms/candidate_portfolio_and_link_info_form";
import { CadidateProfissionaInfoForm } from "@/components/forms/candidate_profissional_info_form";
import { ModalCenterSheet } from "@/components/widgets/modal_center_sheet";
import { useState } from "react";

export default function NewCandidatePage() {
    const [_screens, setScreen] = useState({s1: true, s2: false, s3: false, s4: false});
    const [_currentStep, setCurrentStep] = useState<number>(1);
    const [_currentData, setCurrentData] = useState<any>();

    return <ModalCenterSheet
            title="Personal Information"
            leadChild={<CandidateFormGroup.Step value={_currentStep} />}
            show={true}
            onDismiss={()=> { history.back(); }}
            className="max-w-[500px] w-full min-h-[600px] bg-white rounded-md"
        >
            <CandidateFormGroup.Root>
                {/*** CadidatePersonalDataForm */}
                <CadidatePersonalDataForm
                    show={_screens.s1}
                    cb={(data)=> setCurrentData(data)}
                    next={()=> {
                        setCurrentStep(2);
                        setScreen({s1: false, s2: true, s3: false, s4: false});
                    }}
                />

                {/*** CadidateProfissionaInfoForm */}
                <CadidateProfissionaInfoForm
                    show={_screens.s2}
                    data={_currentData}
                    cb={(data)=> setCurrentData(data)}
                    onPreview={()=> {
                        setCurrentStep(1);
                        setScreen({s4: false, s2: false, s1: true, s3: false});
                    }}
                    next={()=> {
                        setCurrentStep(3);
                        setScreen({..._screens, s2: false, s3: true});
                    }}                    
                />

                {/*** CadidateExperienceInfoForm */}
                <CadidateExperienceInfoForm
                    show={_screens.s3}
                    data={_currentData}
                    cb={(data)=> setCurrentData(data)}
                    onPreview={()=> {
                        setCurrentStep(2);
                        setScreen({..._screens, s3: false, s2: true, s4: false});
                    }}
                    next={()=> {
                        setCurrentStep(4);
                        setScreen({..._screens, s3: false, s4: true});
                    }} 
                />

                {/**** CadidatePorfolioAndLinkInfoForm */}
                <CadidatePorfolioAndLinkInfoForm
                    show={_screens.s4}
                    data={_currentData}
                    onPreview={()=> {
                        setCurrentStep(3);
                        setScreen({..._screens, s4: false, s3: true});
                    }}
                />
            </CandidateFormGroup.Root>
    </ModalCenterSheet>
}