import type { Company } from './companyType';

class CompanyEntity implements Company {
  id: string;

  name: string;

  vat: string;

  addressId: string;

  static new(company?: Company): CompanyEntity {
    return new CompanyEntity(company || {});
  }

  constructor(company: Company) {
    this.id = company.id || '';
    this.name = company.name || '';
    this.vat = company.vat || '';
    this.addressId = company.addressId || '';
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

  getAddressId(): string {
    return this.addressId;
  }

  setAddressId(addressId: string): CompanyEntity {
    this.addressId = addressId;
    return this;
  }
}

export default CompanyEntity;
