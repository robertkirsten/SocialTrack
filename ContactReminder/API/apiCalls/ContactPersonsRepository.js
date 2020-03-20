import Repository from "../repository";

const resource = "/contactPersons";

export default ({

  postInfectiction(user){
    return Repository.post(`${resource}/infected`, {user})
      .then(res => {
        console.log("Infection succesfully added");
        console.log(res.data);
      })
      .catch(error => {
        console.log("Error occured: ", error);
      })
  }

})