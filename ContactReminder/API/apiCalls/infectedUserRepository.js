import Repository from "../repository";

const resource = "/infectedUser";


export default ({
    postInfectedUser(userId)
    {
        return Repository.post(`${resource}`, {
                userId: `${userId}`,
            }
        )
    }
});
