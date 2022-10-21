import type UserEntity from './UserEntity';
import type UserRepository from './userRepository';

class UserService {
  userRepository;

  storageFunctions;

  constructor(userRepository: UserRepository, storageFunctions: any) {
    this.userRepository = userRepository;
    this.storageFunctions = storageFunctions;
  }

  async addInUserHistory({
    user,
  }: {
    itemsQuantityBought: Record<string, number>;
    ticketsQuantityBought: Record<string, number>;
    user: UserEntity;
  }): Promise<void> {
    return this.userRepository.update(user);
  }
}

export default UserService;
