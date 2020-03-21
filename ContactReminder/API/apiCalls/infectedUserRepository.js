import Repository from '../repository';

const resource = '/infected';

export default ({
  postInfectedUser(userId) {
    return Repository.post(resource, {
      id: userId,
      infected: 1,
    });
  },
  postHealthenedUser(userId) {
    return Repository.post(resource, {
      id: userId,
      infected: 0,
    });
  },
});
