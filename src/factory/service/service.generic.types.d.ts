import { IErrorGeneric } from "@/common/error.generic.types"

export interface IServiceGeneric<T> {
    read: (id: string) => Promise<T | IErrorGeneric>
    create: (id: string, data: T) => Promise<T | IErrorGeneric>
    update: (id: string, data: Partial<T>) => Promise<T | IErrorGeneric>
    delete: (id: string) => Promise<void | IErrorGeneric>
}