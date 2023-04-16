import Surreal, { Result } from 'surrealdb.js'
import { serviceLogger } from '../../main';
import { IServiceGeneric } from './service.generic.types';
import ErrorGeneric, { ErrorCodes, isError } from '../../common/error.generic';

export default class ServiceGeneric<T> implements IServiceGeneric<T> {
    constructor(private db: Surreal, private dbtable: string){}

    private errorHandler(e: any, status: ErrorCodes) {
        const errMsg =  `Error while performing DB op on ${this.dbtable} table/collection. \n${e}`
        const error =  new ErrorGeneric(errMsg, status)
        serviceLogger.error(error.errMsg)
        return error
    }

    public set changeDb(db: Surreal) {
        this.db = db
    }

    public get table() {
        return this.table
    }

    public async read(id: string) {
        let selected = (await this.db.select(`${this.dbtable}:${id}`).catch((e) => {
            const err = this.errorHandler(e, 500)
            return err
        })) as Result<T> | ErrorGeneric
        return selected
    }

    public async create(data: T, id?: string) {
        let created = (await this.db.create(`${this.dbtable}${id ? `:${id}` : ''}`, data as Record<string, unknown>).catch((e) => {
            const err = this.errorHandler(e, 500)
            return err
        })) as Result<T> | ErrorGeneric
        return created
    }

    public async update(id: string, data: Partial<T>) {
        let updated = (await this.db.change(`${this.dbtable}:${id}`, data as Record<string, unknown>).catch((e) => {
            const err = this.errorHandler(e, 500)
            return err
        })) as Result<T> | ErrorGeneric
        return updated
    }

    public async delete(id: string) {
        let deleted = (await this.db.delete(`${this.dbtable}:${id}`).catch((e) => {
            const err = this.errorHandler(e, 500)
            return err
        })) as void | ErrorGeneric
        return deleted
    }

    public async advanced(dbquery: string) {
        serviceLogger.warn(`⚠ Base Query used for table: ${this.dbtable} \n😕 It is not recommended that this method is used unless absolutely necessary due to SOC and layout of this app...`)
        serviceLogger.info(`Running base surreal query for service: ${this.dbtable} \n${dbquery}`)
        let res = (await this.db.query<T>(dbquery, {}).catch((e) => {
            const err = this.errorHandler(e, 500)
            return err
        })) as ErrorGeneric | Result<T>[]
        return res
    }

    public async isThere(id: string) {
        const dbres = (await this.db.query(`select * from ${this.dbtable} where id = ${this.dbtable}:${id}`).catch((e) => {
            const err = this.errorHandler(e, 500)
            return [err]
        }))[0]
        if ( !(isError(dbres)) && (dbres.result as Array<Result<T>>).length > 0) {
            return true
        }
        return false
    }

    public async find(data: Omit<Partial<T>, "id">) {
        let query = ""
        Object.keys(data).forEach((key, i) => {
            if (data[key] === undefined) {
                delete data[key]
                return
            }
            if (i > 0) {
                query += " and "
            }
            query += `${key} = ${data[key]}`
        })
        const dbres = (await this.db.query<T>(`select * from ${this.dbtable} where ${query}`).catch((e) => {
            const err = this.errorHandler(e, 500)
            return [err]
        }))[0] as Result<T> | ErrorGeneric
        if ( !(isError(dbres)) && (dbres.result as Array<Result<T>>).length > 0) {
            return dbres.result as Result<T>
        }
        return dbres
    }
}