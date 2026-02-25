/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ServerApi } from "@/lib/server_api";
import { ROUTE_NAMES } from "@/types/route_name";
import { UserTypes } from "@/types/user_types";


export class UserRepository {
    private api = new ServerApi();

    auth_locally(): boolean {
        const token = process.env.NEXT_PUBLIC_LOCAL_TOKEN_KEY as string;
        if (localStorage.getItem(token) === undefined || localStorage.getItem(token) === null) return true;
        return false;
    }

    async auth_login_user(data: UserTypes): Promise<void> {
        const token = process.env.NEXT_PUBLIC_LOCAL_TOKEN_KEY as string;
        const response = await this.api.POST(ROUTE_NAMES.auth_login_user, data);
        
        localStorage.setItem(token, response);
        setTimeout(()=>{ location.reload(); }, 1500);
    }

    async user_find_account(): Promise<UserTypes> {
        return await this.api.GET(ROUTE_NAMES.user_find_account);
    }


}