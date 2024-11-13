import { apiRegistrationToken } from "../../../httpServices/service";
const APIS = {
  async fetchCertificateInfoListDraft(draftId: number, certificateId: string) {
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/work-experience/${certificateId}/certificate-info-list`
    );
    return data;
  },
  async fetchCertificateInfoListEdit(
    gotIdForMainEdit: number,
    certificateId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `applicant/work-experience/${certificateId}/certificate-info-list?id=${gotIdForMainEdit}`
    );
    return data;
  },

  /***
   * Document
   */
  async fetchDocumentsDraft(draftId: number) {
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/natural/document-list`
    );
    return data;
  },

  async fetchDocumentsEdit(selectableDocument: any) {
    const { data } = await apiRegistrationToken.post(
      `/document/list`,
      selectableDocument
    );
    return data;
  },

  async uploadDocumentHandlerDraft(
    draftId: number,
    documentTypeId: string,
    file: any
  ) {
    let formData = new FormData();
    formData.append("DocumentFile", file);
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${draftId}/natural/document/${documentTypeId}`,
      formData
    );
    return data;
  },

  async uploadDocumentHandlerEdit(
    gotIdForMainEdit: number,
    documentTypeId: string,
    file: any
  ) {
    let formData = new FormData();
    formData.append("DocumentFile", file);
    formData.append("adjusterTypeId", "1");
    formData.append("documentTypeId", documentTypeId);
    formData.append("description", "");
    const { data } = await apiRegistrationToken.post(
      `/document?id=${gotIdForMainEdit}`,
      formData
    );
    return data;
  },

  async getContentDocumentTypeIdHandler(
    draftId: number,
    documentTypeId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/natural/document/${documentTypeId}/content`
    );
    return data;
  },

  async deletDocumentTypeIdHandlerDraft(
    draftId: number,
    documentTypeId: string
  ) {
    const { data } = await apiRegistrationToken.delete(
      `registration/draft/${draftId}/natural/document/${documentTypeId}`
    );
    return data;
  },

  async deletDocumentTypeIdHandlerEdit(
    gotIdForMainEdit: number,
    documentTypeId: string
  ) {
    const { data } = await apiRegistrationToken.delete(
      `/document/${documentTypeId}?id=${gotIdForMainEdit}`
    );
    return data;
  },

  /**
   * WorkExperince
   */
  async deletWorkExperienceHandler(
    draftId: number,
    workExperienceTempId: string
  ) {
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${draftId}/natural/work-experience/${workExperienceTempId}`
    );
    return data;
  },
  async deletWorkExperienceCertificateHandler(
    draftId: number,
    workExperienceTempId: string,
    certificateTempId: string
  ) {
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${draftId}/natural/work-experience/${workExperienceTempId}/certificate/${certificateTempId}/content`
    );
    return data;
  },

  /**
   * FINALIZE
   */

  async registerationFinalize(draftId: number) {
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/finalize`
    );
    return data;
  },

  async registerationRealGetAllinfo(draftId: number) {
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${draftId}/natural`
    );
    return data;
  },
};

export default APIS;
