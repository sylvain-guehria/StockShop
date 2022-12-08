// import type {
//   CollectionReference,
//   DocumentData,
//   DocumentReference,
//   OrderByDirection,
//   Query,
//   WhereFilterOp,
// } from 'firebase/firestore';

import type { firestore } from 'firebase-admin';

export class FirebaseQueryBuilder {
  ref: firestore.DocumentReference | firestore.CollectionReference;

  query: firestore.Query;

  constructor(
    firebaseRef: firestore.DocumentReference | firestore.CollectionReference
  ) {
    this.ref = firebaseRef;
    this.query = firebaseRef as firestore.Query;
  }

  where(property: string, operator: firestore.WhereFilterOp, value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.query = this.query.where(property, operator, value);
    }
    return this;
  }

  orderBy(
    property: string,
    order: firestore.OrderByDirection = 'asc',
    enable = false
  ) {
    if (!property || !enable) return this;
    this.query = this.query.orderBy(property, order);
    return this;
  }

  limit(limit: number) {
    const limitNumber = asNumber(limit);
    this.query = limitNumber ? this.query.limit(limitNumber) : this.query;
    return this;
  }

  offset(offset: number) {
    const offsetNumber = asNumber(offset);
    this.query = this.query.offset(offsetNumber || 0);
    return this;
  }

  get() {
    return this.query.get();
  }

  toDocumentRefType(): firestore.DocumentReference {
    return this.query as unknown as firestore.DocumentReference;
  }

  toCollectionRefType(): firestore.CollectionReference {
    return this.query as firestore.CollectionReference;
  }
}

export const isNumber = (input: any): boolean => {
  // eslint-disable-next-line no-restricted-globals
  return typeof input === 'number' && !isNaN(input);
};

export const asNumber = (input: any): number | null => {
  if (isNumber(input)) return input;
  if (typeof input === 'string') {
    const parsedInput = parseInt(input, 10);
    if (isNumber(parsedInput)) return parsedInput;
  }
  return null;
};
