import { api, apiRegistrationToken } from "../../../httpServices/service";
const APIS = {
  /**
   * workExperince
   */

  async fetchLegalCertificateWorkExperienceList(
    legalDraftId: number,
    certificateId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${legalDraftId}/legal/work-experience/${certificateId}/certificate-info-list`
    );
    return data;
  },
  async fetchLegalCertificateWorkExperienceListEdit(
    gotIdForMainEdit: number,
    certificateId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `applicant/work-experience/${certificateId}/certificate-info-list?id=${gotIdForMainEdit}`
    );
    return data;
  },
  async getWorkExperienceCertificateHandler(
    legalDraftId: number,
    experienceTempId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${legalDraftId}/legal/work-experience/${experienceTempId}/certificate-info-list`
    );

    return data;
  },
};

export default APIS;
