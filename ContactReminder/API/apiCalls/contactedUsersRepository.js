import Repository from "../repository";

const resource = "/contactedUsers";

export default ({
    postcontactedUsers(userId1, userId2)
    {
        return Repository.post(`${resource}`, {
                userId1: `${userId1}`,
                userId2: `${userId2}`,
            }
        )
    },
    getUsers(userId){
        //returns an array of persons which user contacted
        return Repository.get(`${resource}?userId=${userId}`)

    }
});
