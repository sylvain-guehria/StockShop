import UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import { SUBROLES } from '@/modules/user/userType';

import { chooseSubRoleOnFirstConnection } from './chooseSubRoleOnFirstConnection';

let userRepository: UserRepository;

beforeEach(() => {
  userRepository = {
    add: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
  };
});

it('The user want to be a buyer only', async () => {
  const email = 'sylvain.guehria@gmail.com';

  const user = UserEntity.new({ email });

  const expectedUser = UserEntity.new({ email });
  expectedUser.hasInventoryManagementServiceActivated = false;
  expectedUser.hasSeenFirstConnectionModal = true;

  await chooseSubRoleOnFirstConnection(userRepository)(user, SUBROLES.BUYER);

  expect(userRepository.update).toHaveBeenCalledWith(expectedUser);
});

it('The user want to become a seller', async () => {
  const email = 'sylvain.guehria@gmail.com';

  const user = UserEntity.new({ email });
  const expectedUser = UserEntity.new({ email });

  expectedUser.hasInventoryManagementServiceActivated = true;
  expectedUser.hasSeenFirstConnectionModal = true;

  await chooseSubRoleOnFirstConnection(userRepository)(user, SUBROLES.SELLER);

  expect(userRepository.update).toHaveBeenCalledWith(expectedUser);
});
