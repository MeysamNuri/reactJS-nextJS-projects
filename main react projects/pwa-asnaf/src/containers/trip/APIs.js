import { axiosInstance as axios } from "../../constants/axios";

const APIs = {
  async requestTourAllowance(
    selectedTripType,
    selectedPoint,
    counter,
    selectedAmount
  ) {
    const { data } = await axios.post("tourism/allowance/request", {
      internal_external: selectedTripType,
      needed_rep_num: selectedPoint,
      companions_num: counter,
      requested_credit: selectedAmount,
    });
    return data;
  }
};

export default APIs;
