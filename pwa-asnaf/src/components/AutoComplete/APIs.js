import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async getCategories() {
    const { data } = await axios.get("subcategories");
    return data;
  },

  
};

export default APIs;