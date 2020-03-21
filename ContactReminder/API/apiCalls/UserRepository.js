import Repository from "../repository";

const resource = "/user";

export default ({
    getUser(userId){
        return Repository.get(`${resource}?id=${userId}`)
    },
    postUserData(userId, infected, firstname, lastname) {
        console.log(userId + firstname);

        return Repository.post(resource, {
            id: userId,
            firstname: firstname,
            lastname: lastname,
            infected: infected,
        },
            {
                headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    console.log(response.data);
                }
        )}

    }
    );
