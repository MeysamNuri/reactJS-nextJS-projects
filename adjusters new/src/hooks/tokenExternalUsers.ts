import axios from "axios";
import HttpBaseConstant from "../controler/services/HttpBaseConstant";

export async function getTokenExternalUser() {
  try {
    const data = await axios.post(
      `${HttpBaseConstant.url}/registration/external-login`
    );

    const token = data?.data?.Token;
    const refreshToken = data?.data?.RefreshToken;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    const postOldTokAndRefTok = async () => {
      try {
        const oldToken = localStorage.getItem("token");
        const oldRefreshToken = localStorage.getItem("refreshToken");
        let oldTokAndRefTok = {
          token: oldToken,
          refreshToken: oldRefreshToken,
        };

        const data = await axios.post(
          `${HttpBaseConstant.url}/registration/refresh-token`,
          oldTokAndRefTok
        );

        const token = data?.data?.Token;
        const refreshToken = data?.data?.RefreshToken;

        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      } catch (er) {
     
      }
    };

    //setInterval(postOldTokAndRefTok, 19 * 60 * 1000);
    setInterval(postOldTokAndRefTok, 100 * 1000);
  } catch (er) {
  
  }
}
