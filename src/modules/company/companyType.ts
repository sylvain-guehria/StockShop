export interface Company {
  uid?: string;
  name?: string;
  vat?: string;
  address?: Address;
}

export type Address = {
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
};
