import { axiosInstance as axios } from '../../config/axios';

const APIs = {
   async businessSubcategories() {
      const { data } = await axios.get('marketer/business_subcategories');
      return data;
   },
   async fetchMarketerNames() {
      const { data } = await axios.get('marketer/list');
      return data;
   },
   async pozList() {
      const { data } = await axios.get('marketer/poz/list');
      return data;
   },
   async cities() {
      const { data } = await axios.get('cities');
      return data;
   },
   async selectedCities(selectedCity) {
      const { data } = await axios.get(`regions/${selectedCity}`);
      return data;
   },
   async sendData(marketer_id,name_shop, fname, lname, id_national, mobile, tel, meters, address, place_status, permission, poz,  latitude,longitude, sub_category_id, insurance, discount, partners, identification_number, father_name, birth_date, from, region_id, footy, poz_requests, description, postal_code, start_contract_date, license_num) {

      // const datas = { name_shop:name_shop, name_manager:name_manager, id_national:id_national, mobile:mobile, tel:tel, meters:meters, address:address, place_status:place_status, permission:permission, poz:poz, longitude:longitude, latitude:latitude, sub_category_id:sub_category_id, insurance:insurance, discount:discount, partners:partners, identification_number:identification_number, father_name:father_name, birth_date:birth_date, from:from, region_id:region_id, footy:footy, poz_requests:poz_requests, description:description, postal_code:postal_code, start_contract_date:start_contract_date }
      
      const { data } = await axios.post('marketer/array/reg', {marketer_id:marketer_id, name_shop:name_shop, fname:fname, lname:lname, id_national:id_national, mobile:mobile, tel:tel, meters:meters, address:address, place_status:place_status, permission:permission, poz:poz,  latitude:latitude, longitude:longitude, sub_category_id:sub_category_id, insurance: isNaN(insurance) || insurance === '' ? 0 : insurance, discount:discount, partners:partners, identification_number:identification_number, father_name:father_name, birth_date:birth_date, from:from, region_id:region_id, footy:footy, poz_requests:poz_requests, description:description, postal_code:postal_code, start_contract_date:start_contract_date, license_num: license_num });
      return data;
   }
}
export default APIs;