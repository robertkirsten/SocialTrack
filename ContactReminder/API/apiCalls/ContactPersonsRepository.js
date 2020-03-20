import Repository from "../repository";

const resource = "/posts";

export default ({

  get(id) {
      return Repository.get(`${resource}/${id}`);
  },
  getPostId(test){
    return Repository.get(`${resource}/${test}`)
  }

})