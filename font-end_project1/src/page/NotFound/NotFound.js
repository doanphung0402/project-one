import React from "react";
import { Link } from "react-router-dom";
import './NotFoundStyle.css'
const NotFound = () => {
  return (
    <div className="mainbox"style={{width:"100%"}}>
      <div className="err">404</div>
      <div className="msg">
         Có vẻ trang bạn truy cập không tồn tại 
        <p>
        Trở về <Link to="/home">trang chủ </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
