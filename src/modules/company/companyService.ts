import { v4 as uuidV4 } from 'uuid';

import CompanyEntity from './CompanyEntity';
import type { CompanyRepository } from './companyRepository';

class CompanyService {
  companyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async createCompanyByUserId(userUid: string): Promise<CompanyEntity> {
    const company = CompanyEntity.new({
      uid: uuidV4(),
      name: 'Mon entreprise',
    });

    return this.companyRepository.add(company, userUid);
  }
}

export default CompanyService;
