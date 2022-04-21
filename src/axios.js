import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/wurklo-web-app/us-central1/' // THE API (cloud function) URL
});

export default instance;