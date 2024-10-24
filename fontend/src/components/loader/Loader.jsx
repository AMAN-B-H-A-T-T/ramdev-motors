import React, { useContext } from 'react'
import './style.css';
import { LoadingContext } from '../../context/LoadingContext';
const Loader = () => {
    const loading = useContext(LoadingContext);
  return (
    loading && (
        <div className="global-loader">
          Loading...
        </div>
      )
  )
}

export default Loader