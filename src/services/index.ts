import { ServerDoc } from './server.service';
import Service from '../factory/service/service';
import { ImageDoc } from './image.service';

export const Server = new Service<ServerDoc>('server')
export const Image = new Service<ImageDoc>('image')

// be sure to add any services you add to this list as 
// it's used to log em in while configuring db
export const allServices: Service<any>[] = [Server, Image]