import React from "react";
import { Link } from "react-router-dom";
import './NotFoundStyle.css'
const NotFound = () => {
  return (
    <div className="mainbox">
      <div className="err">4</div>
      <i className="far fa-question-circle fa-spin"></i>
      <div className="err2">4</div>
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
