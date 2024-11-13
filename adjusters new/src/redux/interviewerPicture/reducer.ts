
  const INIT_STATE = {
    image: null
  };
  
  export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
      case 'SAVE_interviewer_IMAGE_STATE':
          return { ...state, image: action.payload }
      case 'CLAER_INTERVIEWR_PICTURE':
        return {...state, image: null}    
      default:
        return { ...state };
    }
  };
  