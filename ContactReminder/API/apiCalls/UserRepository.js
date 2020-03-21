import Repository from "../repository";

const resource = "/user";
/*

 */

export default ({
    getUser(userId){
        return Repository.get(`${resource}?id=${userId}`)
    },
    postUser(userId, infected, firstname, lastname)
    {
        return Repository.post(`${resource}`, {
    firstName: `${firstname}`,
        lastName: `${lastname}`,
        infected: `${infected}`,
        id: `${userId}`,
}
)
}
});
