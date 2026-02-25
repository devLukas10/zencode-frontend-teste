/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const uri = process.env.NEXT_PUBLIC_SERVER_WEB_URL;
const axio = axios.create({baseURL: uri});

export class ServerApi {
    private token = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_TOKEN_KEY as string) || "";

    async GET(path: string): Promise<any> {
        return (await axio.get(path, {
            headers: {"Authorization": `Bearer ${this.token}`}
        })).data;
    }

    async POST(path: string, data: any): Promise<any> {
        return (await axio.post(path, data, {
            headers: {"Authorization": `Bearer ${this.token}`}
        })).data;
    }
}