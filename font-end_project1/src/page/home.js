import { Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import background1 from "../asset/background1.gif";
import URL from "../Config/URL";
import { login, updateUserInfo } from "../features/auth/authSlice";
import "./homeStyle.css";
const Home = () => {
  const history = useHistory();

  const handleClickButton =()=>{
       history.push("/login")
  }
  return (
    <div className="container">
      <div className="header-container">
      
          <h2 className="header-title-1">
           
              <font>
                Tổ chức các cuộc họp,tạo khảo sát <br/> một cách dễ dàng
              </font>
          
          </h2>
          <h3 className="header-title-2">
          
              <font >
                Sắp xếp ngày của bạn và tiết kiệm thời gian 
              </font>
           
          </h3>
        </div>  
       <div className="container-button">
          <button onClick={handleClickButton}>Bắt đầu ngay </button>
       </div>
    </div>
  );
};

export default Home;
