import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";

export function _candidateFormCleanFields(): CandidatePersonalDataTypes{
    return {
      uid: "",
      picture: null,
      fullname: "",
      number: "",
      email: "",
      address: "",
      position: "",
      level: "",
      time_availabled: "",
      estimat_salary: "",
      experience_years: "",
      current_company: "",
      technlogies: "",
      likendin: "",
      github: "",
      web_porfolio: "",
      cv_uri: "",
      status: "",
      created_at: "",
    }
  }