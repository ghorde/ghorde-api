export class ServerDoc {
  prefix?: string;
}

export function isServerDoc(arg: any): arg is ServerDoc {
  return arg && arg.prefix && typeof arg.prefix == "string";
}
