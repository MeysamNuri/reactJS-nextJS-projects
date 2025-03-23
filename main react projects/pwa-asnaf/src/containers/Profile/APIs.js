import { axiosInstance as axios } from '../../constants/axios';

const APIs = {
  async uploadAvatar(formData) {
    const { data } = await axios.post('profile/avatar/upload', formData);
    return data;
  },
  async uploadSheba(sheba,headers) {
    const { data } = await axios.post('profile/sheba/update', {iban: sheba});
    return data;
  }

};

export default APIs;