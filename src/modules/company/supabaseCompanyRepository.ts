/* eslint-disable no-console */
import axios from 'axios';

import CompanyEntity from './CompanyEntity';
import { CompanyRepository } from './companyRepository';

class SupabaseCompanyRepository extends CompanyRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<CompanyEntity> {
    console.info('get company in db with id: ', id);
    const response = await axios.get(`${this.baseUrl}/api/company/${id}`);
    const { name, vat, address } = response.data;

    return CompanyEntity.new({
      id,
      name,
      vat,
      address,
    });
  }

  async add(company: CompanyEntity, userId: string): Promise<CompanyEntity> {
    console.info('adding company in db...');
    const res = await axios.post(`${this.baseUrl}/api/company/add`, {
      userId,
      company: {
        id: company.getId(),
        name: company.getName(),
        vat: company.getVat(),
        address: company.getAddress(),
      },
    });
    const { id, name } = res.data;
    console.info('Company added in DB, id: ', company.getId());
    return CompanyEntity.new({
      id,
      name,
    });
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
          address: company.address,
        })
    );
  }

  async update(company: CompanyEntity): Promise<void> {
    console.info('update company id: ', company.getId());
    await axios.put(`${this.baseUrl}/api/company/${company.getId()}`, {
      id: company.getId(),
      name: company.getName(),
      vat: company.getVat(),
      address: company.getAddress(),
    });
  }

  async getCompanyByUserId(userId: string): Promise<CompanyEntity | null> {
    console.info('get company in db with userId: ', userId);
    const response = await axios.get(
      `${this.baseUrl}/api/company/getCompanyByUserId`,
      {
        params: { userId },
      }
    );
    const { name, vat, address, id } = response.data;

    return id
      ? CompanyEntity.new({
          id,
          name,
          vat,
          address,
        })
      : null;
  }
}

export default SupabaseCompanyRepository;
