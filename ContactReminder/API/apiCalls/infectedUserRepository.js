import Repository from "../repository";

const resource = "/infected";



export default ({
    postInfectedUser(userId)
    {
        return Repository.post(resource, {
                id: `${userId}`,
            }
        );

    },
    posthealthenedUser(userId)
    {
        //Set boolean to false
        return Repository.post(resource, {
                id: `${userId}`,
            }
        );

    }
});
