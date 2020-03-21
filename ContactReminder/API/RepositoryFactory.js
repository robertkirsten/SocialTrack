import ContactPersonsRepository from "./apiCalls/ContactPersonsRepository"
import PostUserIdRepository from "./apiCalls/scannedQRCodeRepo"

const repositories = {
    infection: ContactPersonsRepository,
    postUserId: PostUserIdRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};