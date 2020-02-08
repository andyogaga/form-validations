import React from 'react'
import Home from './Home';
import PropTypes from 'prop-types'

const HomeContainer = props => {
  const {history} = props;
  return <Home history={history}/>
}

HomeContainer.defaultProps = {
  history: {}
}

HomeContainer.propTypes = {
  history: PropTypes.shape({})
}

export default HomeContainer
