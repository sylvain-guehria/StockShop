import type { Address, Company } from './companyType';

class CompanyEntity implements Company {
  id: string;

  name: string;

  vat: string;

  address: Address;

  static new(company?: Company): CompanyEntity {
    return new CompanyEntity(company || {});
  }

  constructor(company: Company) {
    this.id = company.id || '';
    this.name = company.name || '';
    this.vat = company.vat || '';
    this.address = company.address || {};
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): CompanyEntity {
    this.id = id;
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
