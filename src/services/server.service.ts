export interface IServerDoc {
    prefix: string
}

export function isServerDoc(arg: any): arg is IServerDoc {
    return arg && arg.prefix && typeof(arg.prefix) == 'string'
}
