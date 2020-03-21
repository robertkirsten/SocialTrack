import ContactPersonsRepository from "./apiCalls/ContactPersonsRepository"

const repositories = {
    infection: ContactPersonsRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};