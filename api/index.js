import axios from 'axios';


const SERVER_ENDPOINT = 'http://localhost:8000';

export default {
  getContactData: (payload) => {
    return axios.get(`${SERVER_ENDPOINT}/`, payload);
  },
  addContactForm: (payload) => {
    return axios.post(`${SERVER_ENDPOINT}/add/contact/`, payload);
  },
  updateContact: (payload, userId) => {
    return axios.patch(`${SERVER_ENDPOINT}/edit/contact/${userId}/`, payload);
  },
  deleteContact: (userId) => {
    return axios.delete(`${SERVER_ENDPOINT}/delete/contact/${userId}/`);
  },
  getContactDataBySearch: (searchText) => {
    return axios.get(`${SERVER_ENDPOINT}/search/contact/${searchText}/`);
  },
};
