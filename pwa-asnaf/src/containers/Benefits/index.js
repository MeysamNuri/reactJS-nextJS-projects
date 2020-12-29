/**
 *
 * Benefits
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'
// ------------------- components --------------------------
import Titles from './Titles';
import MainBox from './mainBox';
import Header from '../../components/Header';

import './style.less';


function Benefits() {
  /* eslint-disable no-unused-vars */
  // const { benefits } = useSelector(stateSelector);
  const history = useHistory();
  /* eslint-enable no-unused-vars */

  return (
    <>
      <Header
        title="لیست پاداش ها"
        leftIcon='assets/images/arrow-w-rotate.svg'
        back={null}
        handleLeftClick={()=>history.push('points')}
      />
      <div className="benefit_container">
          <Titles />
          <MainBox />
      </div>
    </>
  );
}

Benefits.propTypes = {};

export default Benefits;
