import Surreal from 'surrealdb.js';
import ServiceGeneric from './service.generic';
import { IService } from './service.types';
import { db } from '@/main';
export default class Service<T> implements IService<T> {
    readonly name: string
    private currDb: Surreal
    readonly service: ServiceGeneric<T>
    constructor(name: string) {
        this.name = name
        this.service = new ServiceGeneric<T>(this.currDb, name)
    }
    set db(db: Surreal) {
        this.currDb = db
    }
}