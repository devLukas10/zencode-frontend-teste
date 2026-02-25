/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CandidateRepository } from "@/repository/candidate_repository";
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";
import { useEffect } from "react";

const candidate = new CandidateRepository();


export function CANDIDATE_HOOKS({
    upSetCandidateDatas,
}: {
    upSetCandidateDatas: (data: CandidatePersonalDataTypes[])=> void;
}) {

    useEffect(()=> {
        candidate.candidate_find_all().then(res => {
            upSetCandidateDatas(res);
        }).catch(err => console.log(err));
    }, [ upSetCandidateDatas, ]);
}