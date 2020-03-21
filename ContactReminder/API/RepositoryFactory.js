import contactedUsersRepository from "./apiCalls/contactedUsersRepository"
import PostUserIdRepository from "./apiCalls/scannedQRCodeRepo"
import InfectedUserIdRepository from "./apiCalls/infectedUserRepository"

const repositories = {
    contactedUsersRepository: contactedUsersRepository,
    postUserId: PostUserIdRepository,
    infectedUser: InfectedUserIdRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};