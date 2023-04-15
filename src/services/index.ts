import { IServerDoc } from './server.service';
import Service from '../factory/service/service';

export const Server = new Service<IServerDoc>('server')

// be sure to add any services you add to this list as 
// it's used to log em in while configuring db
export const allServices: Service<any>[] = [Server]