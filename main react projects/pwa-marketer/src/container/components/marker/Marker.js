import React from 'react';
import PropTypes from 'prop-types';
import '../style.css'

const Marker = ({ text, newMarker }) => (
   <div className='markerCont'>
   <div className='marker' style={{ backgroundColor: '#F430FF55' }}></div>
   <div className='markerText'>{text}</div>
</div>

)

Marker.propTypes = {
   text: PropTypes.string.isRequired,
   newMarker: PropTypes.bool
}

export default Marker;