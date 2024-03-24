import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Coopkies from 'js-cookie';
import Cookies from 'js-cookie';
const Protected = (props) => {
const {Component}=props;
const navigate=useNavigate();
useEffect(()=>{
let login=Cookies.get('authToken');
if(!login){
    navigate('/');
}
})
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected
