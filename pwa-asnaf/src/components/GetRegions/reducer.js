
const RegionReducer = (state = [], action = {})=>{

    switch (action.type) {
        case 'SET_REGION_ID':
      return {
        ...state,
        regionId: action.regionId,
      };
      case 'SET_SELECTED_REGION':
        return {
          ...state,
          selectedRegion: action.selectedRegion,
        };
        default:
          return state;

    }
}
export default RegionReducer