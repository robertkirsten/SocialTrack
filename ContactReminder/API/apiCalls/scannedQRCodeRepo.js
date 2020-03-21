import Repository from "../repository";

const resource = "/userID";

export default ({
//TODO: Schöne API modellieren!
    postInfection(id){
        return Repository.post(`${resource}?userId=`, {id})
    }

})