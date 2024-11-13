export const setSelectedRegion = selectedRegion => {
    return {
      type: 'SET_SELECTED_REGION',
      selectedRegion: selectedRegion
    };
  };

  export const setRegionId = regionId => {
    return {
      type: 'SET_REGION_ID',
      regionId: regionId
    };
  };