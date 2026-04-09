import { IPremium } from './i-premium';
import { Icustomer } from './icustomer';
import { Inominees } from './inominees';
import { IpolicyDetails } from './ipolicy-details';

export interface IcreatePolicy {
  customer: Icustomer;
  policy: IpolicyDetails;
  nominees: Inominees[];
  premium: IPremium;
}
