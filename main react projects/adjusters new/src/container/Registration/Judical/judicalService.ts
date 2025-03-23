import {
  apiWithoutToken,
  apiRegistrationToken,
} from "../../../httpServices/service";
const APIS = {
  async fetchJudicalCertificateInfoListDraft(
    draftId: number,
    workExperienceTempId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${draftId}/judicial/work-experience/${workExperienceTempId}/certificate-info-list`
    );
    return data;
  },

  async fetchJudicalCertificateInfoListEdit(
    gotIdForMainEdit: number,
    workExperienceTempId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `applicant/work-experience/${workExperienceTempId}/certificate-info-list?id=${gotIdForMainEdit}`
    );
    return data;
  },

  /***
   * Document
   */
  async fetchJudicialDocuments(judicaldraftId: number) {
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${judicaldraftId}/judicial/document-list`
    );
    return data;
  },
  async fetchJudicialDocumentsEdit(selectableDocument: any) {
    const { data } = await apiRegistrationToken.post(
      `/document/list`,
      selectableDocument
    );
    return data;
  },

  async uploadJudicalDocumentDraft(
    judicalDraftId: number,
    documentTypeId: string,
    file: any
  ) {
    let formData = new FormData();
    formData.append("DocumentFile", file);
    const { data } = await apiRegistrationToken.post(
      `/registration/draft/${judicalDraftId}/judicial/document/${documentTypeId}`,
      formData
    );
    return data;
  },

  async uploadJudicalDocumentEdit(
    gotIdForMainEdit: number,
    documentTypeId: string,
    file: any
  ) {
    let formData = new FormData();
    formData.append("DocumentFile", file);
    formData.append("adjusterTypeId", "3");
    formData.append("documentTypeId", documentTypeId);
    formData.append("description", "1");
    const { data } = await apiRegistrationToken.post(
      `/document?id=${gotIdForMainEdit}`,
      formData
    );
    return data;
  },

  async getJudicalContentDocumentTypeId(
    judicalDraftId: number,
    documentTypeId: string
  ) {
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${judicalDraftId}/judicial/document/${documentTypeId}/content`,
      {
        responseType: "blob",
      }
    );
    return data;
  },

  async deletJudicalDocumentTypeIdDraft(
    judicalDraftId: number,
    documentTypeId: string
  ) {
    const { data } = await apiRegistrationToken.delete(
      `registration/draft/${judicalDraftId}/judicial/document/${documentTypeId}`
    );
    return data;
  },

  async deletJudicalDocumentTypeIdEdit(
    gotIdForMainEdit: number,
    documentTypeId: string
  ) {
    const { data } = await apiRegistrationToken.delete(
      `/document/${documentTypeId}/3?id=${gotIdForMainEdit}`
    );
    return data;
  },

  async getJudicaLInquire80HoursDraft(
    judicialDraftId: number,
    certificateNo: string,
  
  ) {
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${judicialDraftId}/judicial/inquire-80hour-certificate?certificateNo=${certificateNo}`
    );
    return data;
  },

  async getJudicaLInquire80HoursEdit(
    gotIdForMainEdit: number,
    certificateNo: string,
    fieldId:number
  ) {
    const { data } = await apiRegistrationToken.post(
      `applicant-inquire?id=${gotIdForMainEdit}&fieldId=${fieldId}&certificateNo=${certificateNo}`
    );
    return data;
  },

  /**
   * FINALIZE
   */

  async registerationjudicalFinalize(JudicalDraftId: number) {
    const { data } = await apiWithoutToken.get(
      `/registration/draft/${JudicalDraftId}/finalize`
    );
    return data;
  },

  async registerationJudicalGetAllinfo(JudicalDraftId: number) {
    const { data } = await apiRegistrationToken.get(
      `/registration/draft/${JudicalDraftId}/judicial`
    );
    return data;
  },
};

export default APIS;
