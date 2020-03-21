import Repository from '../repository';

const resource = '/contacted';

export default (
    {
  postcontactedUsers(userId1, userId2) {
    console.log("GDHJWGDKJW");
    return Repository.post(resource, {
      id1: userId1,
      id2: userId2,
    });
  },
  getUsers(userId) {
    return Repository.get(`${resource}?id=${userId}`);
  },
});
