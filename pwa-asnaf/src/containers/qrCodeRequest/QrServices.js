import axios from "axios";
import http from '../../utils/httpServices'
import config from '../../utils/config.json'

// export const GEtQrCode=(RequestAmount,paymentCode)=>{
//   return http.get(`${config.QrCodeUrl}/validateqr/dynamic`,{
//     params:{
//       payment_code: paymentCode,
//       amount: RequestAmount,
//     }
//   })
// }

export const GEtQrCode = async (RequestAmount, paymentCode) => {
  let token = await localStorage.getItem("token");
  token = token.slice(1, token.length - 1);
  return axios({
    method: "get",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    baseURL: "https://api.daapapp.com/api/v1/agency/business/",
    url: `validateqr/dynamic`,
    params: {
      payment_code: paymentCode,
      amount: RequestAmount,
    },
  })
};
