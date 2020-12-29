import React from 'react';
import PropTypes from 'prop-types';

const Marker = props => (
  <div className="wrapperrr"
  id={props.id}
  style={{cursor:`${props => (props.onClick ? 'pointer' : 'default')}`}}
    alt={props.text}
    {...props.onClick ? { onClick: props.onClick } : {}}
  />
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;