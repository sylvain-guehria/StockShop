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

  getById(uid: string): Promise<CompanyEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async add(company: CompanyEntity): Promise<string> {
    throw new Error(`You tried to call an abstract methode, arg: ${company}`);
  }

  async delete(uid: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async getAll(): Promise<CompanyEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(company: CompanyEntity): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ company }}`
    );
  }
}

export default CompanyRepository;
