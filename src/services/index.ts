import { db } from '@/main'
import {default as ServiceGeneric} from './service.generic'
// define services here
export const ServerService = new ServiceGeneric(db, 'server')
export default ServiceGeneric