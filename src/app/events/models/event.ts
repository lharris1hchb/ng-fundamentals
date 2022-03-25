import { ISession } from "./session";
import { ILocation } from "./location";

export interface IEvent {
  id: number,
  name: string,
  date: string,
  time: string,
  price: number,
  imageUrl: string,
  location: ILocation,
  onlineUrl?: string,
  sessions: ISession[],
}
