/* eslint-disable no-console */
import axios from 'axios';
import { logInfoInConsole } from 'logger';

import CompanyEntity from './CompanyEntity';
import { CompanyRepository } from './companyRepository';
import type { Company } from './companyType';

class SupabaseCompanyRepository extends CompanyRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<CompanyEntity | null> {
    logInfoInConsole(`get company in db with id: ${id}`);
    const { data } = await axios.get(`${this.baseUrl}/api/company/${id}`);
    return data ? CompanyEntity.new(data) : null;
  }

  async add(company: Company): Promise<CompanyEntity | null> {
    logInfoInConsole('adding company in db...');
    const { data } = await axios.post(
      `${this.baseUrl}/api/company/add`,
      company,
    );
    logInfoInConsole(`Company added in DB, id: ${company.id}`);
    return data ? CompanyEntity.new(data) : null;
  }

  async update(company: CompanyEntity): Promise<CompanyEntity | null> {
    logInfoInConsole(`update company id: ${company.getId()}`);
    const { data } = await axios.post(
      `${this.baseUrl}/api/company/${company.getId()}`,
      company,
    );
    return data ? CompanyEntity.new(data) : null;
  }

  async delete(id: string): Promise<boolean> {
    logInfoInConsole(`Deleting company with id ${id} in db...`);
    const { data } = await axios.post(`${this.baseUrl}/api/company/delete`, {
      id,
    });
    return data;
  }

  async getAll(): Promise<CompanyEntity[] | null> {
    logInfoInConsole('get all companys in db');
    const { data } = await axios.get('/api/company/getAll');
    return data
      ? data.map((company: CompanyEntity) => new CompanyEntity(company))
      : null;
  }
}

export default SupabaseCompanyRepository;
