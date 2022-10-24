import type UserRepository from './userRepository';

class UserService {
  userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}

export default UserService;
