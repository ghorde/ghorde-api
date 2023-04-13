import Surreal from 'surrealdb.js'
import { mainLogger } from '../main';

export default class ServiceGeneric {
    db: Surreal
    table: string
    constructor(db: Surreal, table: string) {
        this.db = db
        this.table = table
    }

    private errorHandler(e: any) {
        mainLogger.error(`❌ Error while performing DB op. \n ${e}`)
    }

    async select(id: string) {
        let selected = this.db.select(`${this.table}:${id}`).catch((e) => {
            this.errorHandler(e)
        })
        return selected
    }

    async create(id: string, data?: Record<string, unknown>) {
        let created = this.db.create(`${this.table}:${id}`, data).catch((e) => {
            this.errorHandler(e)
        })
        return created
    }

    async change(id: string, data: Record<string, unknown>) {
        let updated = await this.db.change(`${this.table}:${id}`, data).catch((e) => {
            this.errorHandler(e)
        })
        return updated
    }

    async delete(id: string) {
        this.db.delete(`${this.table}:${id}`).catch((e) => {
            this.errorHandler(e)
        })
    }
}