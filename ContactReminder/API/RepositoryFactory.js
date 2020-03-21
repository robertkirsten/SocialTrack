import contactedUsersRepository from './apiCalls/contactedUsersRepository';
import PostUserIdRepository from './apiCalls/scannedQRCodeRepo';
import InfectedUserIdRepository from './apiCalls/infectedUserRepository';
import UserRepository from './apiCalls/UserRepository';

const repositories = {
  contactedUsersRepository,
  postUserId: PostUserIdRepository,
  infectedUser: InfectedUserIdRepository,
  user: UserRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
