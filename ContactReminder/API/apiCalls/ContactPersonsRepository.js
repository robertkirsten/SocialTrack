import Repository from "../repository";

const resource = "/contactPersons";

export default ({

  postInfectionCall(user, contacted){
    return Repository.post(`${resource}/infected`, {user})
  },
  getContactPersons(id){
    return Repository.get(`${resource}/infected`)
  }

})