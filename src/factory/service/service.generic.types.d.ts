import ErrorGeneric from "../../common/error.generic"
import { Result } from "surrealdb.js"

export interface IServiceGeneric<T> {
    read: (id: string) => Promise<Result<T> | ErrorGeneric>
    create: (id: string, data: T) => Promise<Result<T> | ErrorGeneric>
    update: (id: string, data: Partial<T>) => Promise<Result<T> | ErrorGeneric>
    delete: (id: string) => Promise<void | ErrorGeneric>
    advanced: (query: string) => Promise< ErrorGeneric |Result<T>[]>
    isThere: (id: string) => Promise<boolean>
}