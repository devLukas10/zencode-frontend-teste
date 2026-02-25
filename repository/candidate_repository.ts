/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ServerApi } from "@/lib/server_api";
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types";
import { ROUTE_NAMES } from "@/types/route_name";


export class CandidateRepository {
    private api = new ServerApi();

    async candidate_create(data: CandidatePersonalDataTypes | any, file: any, cb:(code: number, data?: any)=> void): Promise<void> {
        try{
            const form = new FormData();
            form.append('documents', file);
            form.append('data', JSON.stringify({...data, created_at: Date.now()}));
            const res = await this.api.POST(ROUTE_NAMES.candidate_create, form);

            cb!(200, res);
        }
        catch(err){
            console.log(err);
            cb(400);
        }
    }

    async candidate_destroyOne(uid: string, cb:(code: number)=> void): Promise<void> {
        try{
            await this.api.POST(ROUTE_NAMES.candidate_destroyOne, {uid});
            cb!(200);
        }
        catch(err){
            console.log(err);
            cb(400);
        }
    }

    async candidate_find_all(): Promise<any> {
        try{
            return await this.api.GET(ROUTE_NAMES.candidate_find_all);
        }
        catch(err){
            console.log(err);
        }
    } 
    
    async candidate_find_one(uid: any): Promise<any> {
        try{
           return await this.api.POST(ROUTE_NAMES.candidate_find_one, {uid});
        }
        catch(err){
            console.log(err);
            return {};
        }
    }


}