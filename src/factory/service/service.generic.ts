import Surreal, { Result } from 'surrealdb.js'
import { serviceLogger } from '@/main';
import { IServiceGeneric } from './service.generic.types';
import ErrorGeneric from '@/common/error.generic';

export default class ServiceGeneric<T> implements IServiceGeneric<T> {
    private db: Surreal
    public readonly dbtable: string
    constructor(db: Surreal, table: string) {
        this.db = db
        this.dbtable = table
    }

    private errorHandler(e: any) {
        const errMsg =  `❌ Error while performing DB op on ${this.dbtable} table/collection. \n${e}`
        serviceLogger.error(errMsg)
        return new ErrorGeneric(true, errMsg)
    }

    public set changeDb(db: Surreal) {
        this.db = db
    }

    public get table() {
        return this.table
    }

    public async read(id: string) {
        let selected = (await this.db.select(`${this.dbtable}:${id}`).catch((e) => {
            const err = this.errorHandler(e)
            return err
        })) as Result<T> | ErrorGeneric
        return selected
    }

    public async create(id: string, data: T) {
        let created = (await this.db.create(`${this.dbtable}:${id}`, data as Record<string, unknown>).catch((e) => {
            const err = this.errorHandler(e)
            return err
        })) as Result<T> | ErrorGeneric
        return created
    }

    public async update(id: string, data: Partial<T>) {
        let updated = (await this.db.change(`${this.dbtable}:${id}`, data as Record<string, unknown>).catch((e) => {
            const err = this.errorHandler(e)
            return err
        })) as Result<T> | ErrorGeneric
        return updated
    }

    public async delete(id: string) {
        let deleted = (await this.db.delete(`${this.dbtable}:${id}`).catch((e) => {
            const err = this.errorHandler(e)
            return err
        })) as void | ErrorGeneric
        return deleted
    }

    public async advanced(dbquery: string) {
        serviceLogger.warn(`⚠ Base Query used for table: ${this.dbtable} \n😕 It is not recommended that this method is used unless absolutely necessary due to SOC and layout of this app...`)
        serviceLogger.info(`Running base surreal query for service: ${this.dbtable} \n${dbquery}`)
        let res = (await this.db.query<T>(dbquery, {}).catch((e) => {
            const err = this.errorHandler(e)
            return err
        })) as ErrorGeneric | Result<T>[]
        return res
    }
} // 69 line perfection