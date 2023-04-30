import axios, { AxiosInstance } from "axios";
import { URLSearchParams } from "url";
import { client_id } from "../config";
import { client_secret } from "../config";
export interface IGetToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

class Authlink {
  private _baseurl: string;
  private _axios: AxiosInstance;
  constructor() {
    this._baseurl = "https://ghorde-authlink.kodski.com/api/v1/";
    this._axios = axios.create({ baseURL: this._baseurl });
  }

  public async exchangeInitialToken(code: string): Promise<IGetToken> {
    const grant_type = "authorization_code";
    const response = await this._axios.post(
      "token",
      new URLSearchParams({ code, client_id, client_secret, grant_type })
    );
    return response.data;
  }

  public async refreshToken(refresh_token: string): Promise<IGetToken> {
    const grant_type = "refresh_token";
    const response = await this._axios.post(
      "token",
      new URLSearchParams({
        refresh_token,
        client_id,
        client_secret,
        grant_type,
      })
    );
    return response.data;
  }
  public async revokeToken(token: string): Promise<void> {
    await this._axios.post(
      "token/revoke",
      new URLSearchParams({ client_id, client_secret, token })
    );
    return;
  }

  public async getUserInfo(access_token: string): Promise<any> {
    const response = await this._axios.get("users/@me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  }

  public async getGuilds(access_token: string): Promise<any> {
    const response = await this._axios.get("users/@me/servers", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  }

  public async getGuildInfo(
    access_token: string,
    guildId: string
  ): Promise<any> {
    const response = await this._axios.get(`servers/${guildId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  }

  public async getUserInGuild(
    access_token: string,
    guildId: string
  ): Promise<any> {
    const response = await this._axios.get(
      `users/@me/servers/${guildId}/member`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  }
}

export default new Authlink();
