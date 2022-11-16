import type { Address, Company } from './companyType';

class CompanyEntity implements Company {
  uid: string;

  name: string;

  vat: string;

  address: Address;

  static new(company?: Company): CompanyEntity {
    return new CompanyEntity(company || {});
  }

  constructor(company: Company) {
    this.uid = company.uid || '';
    this.name = company.name || '';
    this.vat = company.vat || '';
    this.address = company.address || {};
  }

  getUid(): string {
    return this.uid;
  }

  setUid(uid: string): CompanyEntity {
    this.uid = uid;
    return this;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): CompanyEntity {
    this.name = name;
    return this;
  }

  getVat(): string {
    return this.vat;
  }

  setVat(vat: string): CompanyEntity {
    this.vat = vat;
    return this;
  }

  getAddress(): Address {
    return this.address;
  }

  setAddress(address: Address): CompanyEntity {
    this.address = address;
    return this;
  }
}

export default CompanyEntity;
