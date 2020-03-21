import Repository from "../repository";

const resource = "/infected";

export default ({
    postInfectedUser(userId) {
        return Repository.post(resource, {
            id: userId,
        });
    },
    posthealthenedUser(userId) {
        return Repository.post(resource, {
            id: userId,
        });
    }
});
