/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CandidatCard } from "@/components/cards/candidat_card";
import { CANDIDATE_HOOKS } from "@/hooks/candidate_hook";
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";
import { useState } from "react";
import { SingleCandidateLayout } from "./single_candidate_layout";
import { CandidateRepository } from "@/repository/candidate_repository";
import { _candidateFormCleanFields } from "../forms/candidate_form_clean_fields";


const candidate = new CandidateRepository();





export function CandidateLayoutWrap() {
  const [_upSetCandidateDatas, setUpSetCandidateDatas] = useState<CandidatePersonalDataTypes[]>()
  const [showModal, setShowModal] = useState<boolean>(false);
  const [_currentData, setCurrentData] = useState<CandidatePersonalDataTypes>();

  CANDIDATE_HOOKS({
    upSetCandidateDatas(data) {
      setUpSetCandidateDatas(data)
    },
  });



  /// getDataForCandidate
  function getDataForCandidate(arg: any){
    candidate.candidate_find_one(arg).then(res => {
      setCurrentData(res);
      setShowModal(true);
    }).catch(err => console.log(err));
  }

  return <div className="wrap-container w-[95%] flex gap-2 pb-10 p-2">
    {_upSetCandidateDatas?.map((items, key)=> (
      <div
        className="w-full max-w-[235px]"
        key={key}
        onClick={()=> getDataForCandidate(items.uid)}
      >
        <CandidatCard item={items} />
      </div>
    ))}

    {/*** *SingleCandidateLayout */}
    <SingleCandidateLayout
      show={showModal}
      data={_currentData}
      onDismiss={()=>{
        setShowModal(false);
        setCurrentData(_candidateFormCleanFields())
      }}
      cb={()=>{
        setShowModal(false);
        setCurrentData(_candidateFormCleanFields())
      }}

    />
  </div>
}