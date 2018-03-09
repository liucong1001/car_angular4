import {PersonModel} from './person.model';
export class BuyerModel extends PersonModel {
  buyerAddress?: object;
  buyerTrustee?: object;
}
