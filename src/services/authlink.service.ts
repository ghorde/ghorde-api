import axios, { AxiosInstance } from "axios";
import { URLSearchParams  } from "url";

export interface IGetToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export class Authlink {
    private _baseurl: string;
    private _axios: AxiosInstance;
    constructor(){
        this._baseurl = "https://authlink.guildedapi.com/api/v1/";
        this._axios = axios.create({baseURL : this._baseurl});
    };

    public async exchangeInitialToken(code: string): Promise<IGetToken> {
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        const grant_type = "authorization_code";
        const response = await this._axios.post("token", new URLSearchParams({code, client_id, client_secret, grant_type}));
        return response.data;
    }

    public async refreshToken(refresh_token: string): Promise<IGetToken> {
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        const grant_type = "refresh_token";
        const response = await this._axios.post("token", new URLSearchParams({refresh_token, client_id, client_secret, grant_type}));
        return response.data;
    }
    public async revokeToken(refresh_token: string): Promise<void> {
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        await this._axios.post("revoke", new URLSearchParams({refresh_token, client_id, client_secret}));
        return;
    }

    public async getUserInfo(access_token: string): Promise<any> {
        const response = await this._axios.get("users/@me", {headers: {Authorization: `Bearer ${access_token}`}});
        return response.data;
    }

    public async getGuilds(access_token: string): Promise<any> {
        const response = await this._axios.get("users/@me/servers", {headers: {Authorization: `Bearer ${access_token}`}});
        return response.data;
    }

    public async getGuildInfo(access_token: string, guildId: string): Promise<any> {
        const response = await this._axios.get(`servers/${guildId}`, {headers: {Authorization: `Bearer ${access_token}`}});
        return response.data;
    }

    public async getUserInGuild(access_token: string, guildId:string): Promise<any>{
        const response = await this._axios.get(`users/@me/servers/${guildId}/member`, {headers: {Authorization: `Bearer ${access_token}`}});
        return response.data;
    }
}