export const setFNameLName = (full_name) =>{
   return{
      type: 'SET_FNAME_LNAME',
      full_name: full_name
   }
}
export const setIdeNum = (birth_certificate_number) =>{
   return{
      type: 'SET_IDE_NUM',
      birth_certificate_number: birth_certificate_number
   }
}
export const setInsFatherName = (father_name) =>{
   return{
      type: 'SET_INSURANCE_FATHER_NAME',
      father_name: father_name
   }
}
export const setRel = (relationship) =>{
   return{
      type: 'SET_REL',
      relationship: relationship
   }
}
export const setInsBirthdate = (birth_date) =>{
   return{
      type: 'SET_INSURANCE_BIRTHDATE',
      birth_date: birth_date
   }
}
export const setInsNationalId = (national_id) =>{
   return{
      type: 'SET_INSURANCE_NATIONAL_ID',
      national_id: national_id
   }
}
export const setInsuranceNum = (notebook_number) =>{
   return{
      type: 'SET_INSURANCE_NUM',
      notebook_number: notebook_number
   }
}
export const setInsuranceArr = insuranceArr => {
   return {
     type: 'SET_INSURANCE_ARR',
     insuranceArr: insuranceArr
   };
 };
export const removeInsuranceArr = () => {
   return {
      type: 'REMOVE_INSURANCE_ARR'
    };
 };