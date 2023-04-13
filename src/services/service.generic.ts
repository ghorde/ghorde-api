import Surreal from 'surrealdb.js'
import { mainLogger } from '../main';

// <T> implements IServiceGeneric<T>
export default class ServiceGeneric {
    db: Surreal
    dbtable: string
    constructor(db: Surreal, table: string) {
        this.db = db
        this.dbtable = table
    }

    private errorHandler(e: any) {
        mainLogger.error(`❌ Error while performing DB op on ${this.dbtable} table/collection. \n${e}`)
    }

    public set currDb(db: Surreal) {
        this.db = db
    }

    public get table() {
        return this.table
    }

    public async select(id: string) {
        let selected = this.db.select(`${this.dbtable}:${id}`).catch((e) => {
            this.errorHandler(e)
        })
        return selected
    }

    public async create(id: string, data?: any) {
        let created = this.db.create(`${this.dbtable}:${id}`, data).catch((e) => {
            this.errorHandler(e)
        })
        return created
    }

    public async change(id: string, data: any) {
        let updated = await this.db.change(`${this.dbtable}:${id}`, data).catch((e) => {
            this.errorHandler(e)
        })
        return updated
    }

    public async delete(id: string) {
        this.db.delete(`${this.dbtable}:${id}`).catch((e) => {
            this.errorHandler(e)
        })
    }
}