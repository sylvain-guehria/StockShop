/* eslint-disable class-methods-use-this */

import type CompanyEntity from './CompanyEntity';
import type { Company } from './companyType';

/**
 * @abstract
 */
export abstract class CompanyRepository {
  constructor() {
    if (this.constructor === CompanyRepository) {
      throw new TypeError(
        'Abstract class "CompanyRepository" cannot be instantiated, it can only be extended.',
      );
    }
  }

  getById(id: string): Promise<CompanyEntity | null> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async add(company: Company): Promise<CompanyEntity | null> {
    throw new Error(`You tried to call an abstract methode, arg: ${company}`);
  }

  async update(company: CompanyEntity): Promise<CompanyEntity | null> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ company }}`,
    );
  }

  async delete(id: string): Promise<boolean> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async getAll(): Promise<CompanyEntity[] | null> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }
}

export default CompanyRepository;
