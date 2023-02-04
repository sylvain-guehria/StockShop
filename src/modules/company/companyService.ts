import { v4 as uuidV4 } from 'uuid';

import type CompanyEntity from './CompanyEntity';
import type { CompanyRepository } from './companyRepository';
import type { Company } from './companyType';

class CompanyService {
  companyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async createCompany(): Promise<CompanyEntity> {
    const companyToAdd: Company = {
      id: uuidV4(),
      name: 'Mon entreprise',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const createdCompany = await this.companyRepository.add(companyToAdd);

    if (!createdCompany) throw new Error('Company not created');

    return createdCompany as CompanyEntity;
  }
}

export default CompanyService;
