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

class Cardboard {
  private _baseurl: string;
  private _axios: AxiosInstance;

  constructor() {
    // this is the base url of the carboard api
    this._baseurl = "https://cardboard.ink/api/v1/";
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
    ).catch((err) => {console.log(err)});
    return;
  }

  public async checkToken(access_token: string): Promise<any> {
    const token = access_token;
    const response = await this._axios.post(
      "token/check",
      new URLSearchParams({ token }),
    )
    return response.data;
  }

  public async getUserInfo(access_token: string): Promise<any> {
    console.log("here", access_token)
    const response = await this._axios.get("users/@me", {
      headers: { authorization: `Bearer ${access_token}` },
    });
    return response.data;
  }
}

export default new Cardboard();
