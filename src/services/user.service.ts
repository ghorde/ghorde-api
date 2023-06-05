export class IUser {
  hordeToken?: string;
  negativePrompt: string[];
}

export function isUserDoc(arg: any): arg is IUser {
  return arg && arg.id && typeof arg.id == "string";
}