/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import CompanyEntity from './CompanyEntity';
import { CompanyRepository } from './companyRepository';

class FirebaseCompanyRepository extends CompanyRepository {
  baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

  async getById(uid: string): Promise<CompanyEntity> {
    console.info('get company in db with uid: ', uid);
    const response = await axios.get(`/api/company/${uid}`);
    const { name, vat, address } = response.data;

    return CompanyEntity.new({
      uid,
      name,
      vat,
      address,
    });
  }

  async add(company: CompanyEntity): Promise<string> {
    console.info('adding company in db...');
    const res = await axios.post('/api/company/add', {
      uid: company.getUid(),
      name: company.getName(),
      vat: company.getVat(),
      address: company.getAddress(),
    });
    console.info('Company added in DB, uid: ', company.getUid());
    return res.data;
  }

  async delete(uid: string): Promise<void> {
    console.info(`Deleting company with uid ${uid} in db...`);
    return axios.post('/api/company/delete', { uid });
  }

  async getAll(): Promise<CompanyEntity[]> {
    console.info('get all companys in db');
    const response = await axios.get('/api/company/getAll');
    return response.data.map(
      (company: CompanyEntity) =>
        new CompanyEntity({
          uid: company.uid,
          name: company.name,
          vat: company.vat,
          address: company.address,
        })
    );
  }

  async update(company: CompanyEntity): Promise<void> {
    console.info('update company uid: ', company.getUid());
    await axios.put(`/api/company/${company.getUid()}`, {
      uid: company.getUid(),
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
    const { name, vat, address, uid } = response.data;

    return uid
      ? CompanyEntity.new({
          uid,
          name,
          vat,
          address,
        })
      : null;
  }

  async createCompanyByUserId(userId: string): Promise<CompanyEntity> {
    console.info('create company in db with userId: ', userId);
    const response = await axios.post(`${this.baseUrl}/api/company/add`, {
      userId,
    });
    const { name, vat, address, uid } = response.data;

    return CompanyEntity.new({
      uid,
      name,
      vat,
      address,
    });
  }
}

export default FirebaseCompanyRepository;