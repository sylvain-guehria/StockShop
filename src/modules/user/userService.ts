import type UserEntity from './UserEntity';
import type { UserRepository } from './userRepository';

class UserService {
  userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  setUserAsSeller(user: UserEntity) {
    user.markFirstConnectionModalAsSeen();
    user.activateSockManagement();
    this.userRepository.update(user);
  }
}

export default UserService;
