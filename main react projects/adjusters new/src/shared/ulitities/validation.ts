export const checkValidity = (value: any, rules: any): any => {
  let isValid = true;
  let validationMessage = "";
  if (!rules || rules.length === 0) {
    return [isValid, validationMessage];
  } else {
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].required) {
        isValid = value.toString().trim() !== "" && isValid;
        // if(value.toString().trim() == '')
        if (!isValid) {
          validationMessage = rules[i].message;
          break;
        }
      }
      if (rules[i].min) {
        isValid =
          value.toString().length >= rules[i].min &&
          value.toString().trim() !== "" &&
          isValid;
        // if(value.toString().length < r.min && value.toString().trim() != '')
        if (!isValid) {
          validationMessage = rules[i].message;
          break;
        }
      }
      if (rules[i].max) {
        isValid =
          value.toString().length <= rules[i].max &&
          value.toString().trim() !== "" &&
          isValid;
        // if(value.toString().length > rules.max && value.toString().trim() != '')
        if (!isValid) {
          validationMessage = rules[i].message;
          break;
        }
      }
      // if (rules[i].pattern) {
      //     const pattern = rules[i].pattern;
      //     isValid = pattern.test(value) && isValid;
      //     if(!isValid) {

      //         validationMessage = rules[i].message;
      //         break;
      //     }

      // }
    }
  }

  // if(isValid) {
  //    validationTitle = ''
  // }

  // if (rules.isEmail) {
  //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //     isValid = pattern.test(value) && isValid;
  //     if(!pattern.test(value) && value.trim() != ''){validationTitle =`ایمیل اشتباه`}
  // }
  // if (rules.isNumeric) {
  //     const pattern = /^\d+$/;
  //     isValid = pattern.test(value) && isValid
  // }

  return [isValid, validationMessage];
};
