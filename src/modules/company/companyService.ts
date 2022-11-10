import type { CompanyRepository } from './companyRepository';

class CompanyService {
  companyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }
}

export default CompanyService;
