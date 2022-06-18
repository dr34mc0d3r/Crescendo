import React from 'react'
import { useLocation } from 'react-router-dom';

function Detail() {
    const location = useLocation();
const data = location.state;
console.log(data);

  return (
    <div>Detail</div>
  )
}

export default Detail