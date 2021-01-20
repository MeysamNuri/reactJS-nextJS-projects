import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async registerData(
    userMobile,
    fname,
    lname,
    nationalId,
    sheba,
    email,
    storeName,
    category,
    tel,
    address,
    storeLatLng,
    getRegionId,
    link
  ) {
    const { data } = await axios.post("profile/register", {
      mobile: userMobile,
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
      region_id: getRegionId,
      link: link,
    });
    return data;
  },
  async registerDataWeb(
    userMobile,
    fname,
    lname,
    nationalId,
    sheba,
    email,
    storeName,
    category,
    tel,
    address,
    storeLatLng,
    getRegionId,
    link
  ) {
    const { data } = await axios.post("profile/register", {
      mobile: userMobile,
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
      region_id: getRegionId,
      link: link,
    });
    return data;
  },
};

export default APIs;
