import { v4 as uuidV4 } from 'uuid';

import CompanyEntity from './CompanyEntity';
import type { CompanyRepository } from './companyRepository';

class CompanyService {
  companyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async createCompanyByUserId(userId: string): Promise<CompanyEntity> {
    const company = CompanyEntity.new({
      id: uuidV4(),
      name: 'Mon entreprise',
    });

    return this.companyRepository.add(company, userId);
  }
}

export default CompanyService;
