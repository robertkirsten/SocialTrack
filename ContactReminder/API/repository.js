import axios from 'axios';

const baseDomain = 'http://45.10.24.251:3000';

export default axios.create({
  baseURL: baseDomain,
});
