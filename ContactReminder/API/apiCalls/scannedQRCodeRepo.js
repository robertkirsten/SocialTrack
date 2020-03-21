import Repository from '../repository';

const resource = '/userID';

export default ({
  postInfection(id) {
    return Repository.post(`${resource}?userId=`, { id });
  },
});
