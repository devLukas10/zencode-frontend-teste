/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const uri = process.env.NEXT_PUBLIC_SERVER_WEB_URL;
const axio = axios.create({baseURL: uri});

export class ServerApi {

    async GET(path: string): Promise<any> {
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_KEY as string)
   
        return (await axio.get(path, {
            headers: {Authorization: `Bearer ${token}`}
        })).data;
    }

    async POST(path: string, data: any): Promise<any> {
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_KEY as string)
        return (await axio.post(path, data, {
            headers: {Authorization: `Bearer ${token}`}
        })).data;
    }
}