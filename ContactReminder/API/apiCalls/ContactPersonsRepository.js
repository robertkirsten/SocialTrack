import Repository from "../repository";

const resource = "/contactPersons";

export default ({

  get(id) {
      return Repository.get(`${resource}/${id}`);
  },
  getPostId(test){
    return Repository.get(`${resource}/${test}`)
  }

})