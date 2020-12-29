import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async registerData(
    mobile,
    fname,
    lname,
    nationalId,
    sheba,
    email,
    storeName,
    category,
    tel,
    address,
    storeLatLng
  ) {
    const { data } = await axios.post("profile/register", {
      mobile: mobile,
      name: fname,
      family: lname,
      national_id: nationalId,
      sheba: sheba,
      email: email,
      shop_name: storeName,
      sub_category_id: category,
      tel: tel,
      address: address,
      latitude: storeLatLng.lat,
      longitude: storeLatLng.lng,
    });
    return data;
  },
};

export default APIs;
