/* eslint-disable class-methods-use-this */

import type CompanyEntity from './CompanyEntity';

/**
 * @abstract
 */
export abstract class CompanyRepository {
  constructor() {
    if (this.constructor === CompanyRepository) {
      throw new TypeError(
        'Abstract class "CompanyRepository" cannot be instantiated, it can only be extended.'
      );
    }
  }

  getById(id: string): Promise<CompanyEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async add(company: CompanyEntity, userId: string): Promise<CompanyEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${company}, userId:${userId}`
    );
  }

  async delete(id: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async getAll(): Promise<CompanyEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(company: CompanyEntity): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ company }}`
    );
  }

  async getCompanyByUserId(userId: string): Promise<CompanyEntity | null> {
    throw new Error(`You tried to call an abstract methode, arg: ${userId}`);
  }
}

export default CompanyRepository;
