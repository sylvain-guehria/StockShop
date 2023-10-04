/* eslint-disable no-console */
import axios from 'axios';

import CompanyEntity from './CompanyEntity';
import { CompanyRepository } from './companyRepository';
import type { Company } from './companyType';

class SupabaseCompanyRepository extends CompanyRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<CompanyEntity> {
    console.info('get company in db with id: ', id);
    const response = await axios.get(`${this.baseUrl}/api/company/${id}`);
    const { name, vat, addressId } = response.data;

    return CompanyEntity.new({
      id,
      name,
      vat,
      addressId,
    });
  }

  async add(company: Company): Promise<CompanyEntity | null> {
    console.info('adding company in db...');

    const res = await axios.post(`${this.baseUrl}/api/company/add`, company);
    console.log('res', res);
    const success = res.data;
    if (success) {
      console.info('Company added in DB, id: ', company.id);
      return CompanyEntity.new({ ...company });
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    console.info(`Deleting company with id ${id} in db...`);
    return axios.post(`${this.baseUrl}/api/company/delete`, { id });
  }

  async getAll(): Promise<CompanyEntity[]> {
    console.info('get all companys in db');
    const response = await axios.get('/api/company/getAll');
    return response.data.map(
      (company: CompanyEntity) =>
        new CompanyEntity({
          id: company.id,
          name: company.name,
          vat: company.vat,
          addressId: company.addressId,
        }),
    );
  }

  async update(company: CompanyEntity): Promise<void> {
    console.info('update company id: ', company.getId());
    await axios.put(`${this.baseUrl}/api/company/${company.getId()}`, {
      id: company.getId(),
      name: company.getName(),
      vat: company.getVat(),
      addressId: company.getAddressId(),
    });
  }
}

export default SupabaseCompanyRepository;
