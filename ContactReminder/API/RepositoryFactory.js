import ContactPersonsRepository from "./apiCalls/ContactPersonsRepository"

const repositories = {
    contactPersons: ContactPersonsRepository,
    infection: ContactPersonsRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
};