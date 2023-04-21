import ServiceGeneric from "./service.generic";

export interface IService<T> {
  name: string;
  service: ServiceGeneric<T>;
}
