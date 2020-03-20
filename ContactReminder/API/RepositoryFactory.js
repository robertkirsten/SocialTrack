import ContactPersons from "./apiCalls/ContactPersonsRepository"

const repositories = {
    contactPersons: ContactPersons
}

export const RepositoryFactory = {
    get: name => repositories[name]
};