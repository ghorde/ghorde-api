export class User {
  token?: string;
  lastLogin?: number;
  tokenExpiry?: number;
  refreshToken?: string;
  readonly id: string;
  readonly name: string;
  readonly subdomain: string;
  readonly avatar?: string;
  readonly banner?: string;
}
