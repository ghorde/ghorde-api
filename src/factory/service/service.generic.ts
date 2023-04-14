import Surreal from 'surrealdb.js'
import { mainLogger } from '../../main';
import { IServiceGeneric } from './service.generic.types';
import { IErrorGeneric } from '@/common/error.generic.types';

export default class ServiceGeneric<T> implements IServiceGeneric<T> {
    private db: Surreal
    private readonly dbtable: string
    constructor(db: Surreal, table: string) {
        this.db = db
        this.dbtable = table
    }

    private errorHandler(e: any) {
        mainLogger.error(`❌ Error while performing DB op on ${this.dbtable} table/collection. \n${e}`)
        return {error: true}
    }

    public set currDb(db: Surreal) {
        this.db = db
    }

    public get table() {
        return this.table
    }

    public async read(id: string) {
        let selected = this.db.select(`${this.dbtable}:${id}`).catch((e) => {
            const err = this.errorHandler(e)
            return err
        }) as T | IErrorGeneric
        return selected
    }

    public async create(id: string, data: T) {
        let created = this.db.create(`${this.dbtable}:${id}`, data as Record<string, unknown>).catch((e) => {
            const err = this.errorHandler(e)
            return err
        }) as T | IErrorGeneric
        return created
    }

    public async update(id: string, data: Partial<T>) {
        let updated = await this.db.change(`${this.dbtable}:${id}`, data as Record<string, unknown>).catch((e) => {
            const err = this.errorHandler(e)
            return err
        }) as T | IErrorGeneric
        return updated
    }

    public async delete(id: string) {
        let deleted = await this.db.delete(`${this.dbtable}:${id}`).catch((e) => {
            const err = this.errorHandler(e)
            return err
        }) as void | IErrorGeneric
        return deleted
    }

    public async advanced(query: string) {
        mainLogger.warn(`⚠ Base Query used for table: ${this.dbtable} \n😕 It is not recommended that this method is used unless absolutely necessary due to SOC and layout of this app...`)
        let res = await this.db.query(query, {
            tb: this.dbtable
        }).catch((e) => {
            const err = this.errorHandler(e)
            return err
        }) as T | IErrorGeneric
        return res
    }
}