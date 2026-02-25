export interface CandidatePersonalDataTypes {
    uid?: string;
    id?: number;
    picture?: null;
    fullname?: string;
    number?: string;
    email?: string;
    address?: string;

    /// Profisional
    position?: string;
    level?: string;
    time_availabled?: string;
    estimat_salary?: string;

    /// experience
    experience_years?: string;
    current_company?: string;
    technlogies?: string;
    //email?: string;,

    /// portfolio
    likendin?: string;
    github?: string;
    web_porfolio?: string;
    cv_uri?: string;
    ///
    status?: string;
    created_at?: string;
}