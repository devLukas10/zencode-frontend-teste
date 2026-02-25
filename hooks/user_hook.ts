"use client";
import { UserRepository } from "@/repository/user_repository";
import { UserTypes } from "@/types/user_types";
import { useEffect } from "react";

const user = new UserRepository();

export function USER_HOOKS({upSetUserData}: {upSetUserData: (data: UserTypes)=> void}) {

    useEffect(()=> {
        user.user_find_account().then(res => {
            upSetUserData(res);
        })
        .catch(err => console.log(err));
    }, [upSetUserData]);
}