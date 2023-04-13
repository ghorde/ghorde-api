import { ServiceGeneric } from '@/services'
import Surreal from 'surrealdb.js';

export const instanceServices = async(db: Surreal, serviceList: string[]) => {
    const Services = new Map<string, ServiceGeneric>()
    serviceList.forEach((service) => {
        Services.set(service, new ServiceGeneric(db, service))
    })
    
    return Services
}