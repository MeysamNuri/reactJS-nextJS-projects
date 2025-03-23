import { axiosInstance as axios } from '../../config/axios';

const APIs = {
   async cities() {
      const { data } = await axios.get('https://api.daapapp.com/api/v1/marketer/location/cities');
      return data;
   },
   async selectedCities(selectedCity) {
      const { data } = await axios.get(`https://api.daapapp.com/api/v1/marketer/location/regions/${selectedCity}`);
      return data;
   }
}
export default APIs;