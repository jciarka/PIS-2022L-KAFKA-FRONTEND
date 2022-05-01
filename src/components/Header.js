import React from "react";
import { Link } from "react-router-dom";
// import HomeIcon from "../icons/exit.svg";


var Header = () => {
  return (
    <>
      {/*<!-- NAVBAR -->*/}
      <nav
        className="navbar navbar-expand-lg navbar-light shadow shadow-sm border-bottom border-dark"
        style={{ border: "#8f8f8fb6" }}
      >
        <Link to="/">
          <button
            className="btn btn-light rounded-circle btn-primary p-0"
            style={{
              display: "block",
              width: "40px",
              height: "40px",
            }}
          >
  
          </button>
        </Link>
        {/*<!-- Links -->*/}
        <div className="navbar-brand text-center m-0 p-0">
          <div className=" m-0 p-0">
            <div className="prompt" style = {
              {
                'marginLeft': '20px',
                'marginTop': '10px',
                'fontSize':'25px'
              }
            }>
              {" "}
              <strong>Ordering app</strong>
            </div>
            <div className="d-flex justify-content-start p-0">
       
                <>
                  <Link to="/customerApp">
                    <button
                      className="btn btn-dark nav-button rounded-0"
                      style={{ position: "relative", top: "9px" }}
                    >
                      {/* <img src={RestaurantLogo} width="20" height="20" alt=""/> */}
                      Customers App
                    </button>
                  </Link>
                  <Link to="/aggregatorApp">
                    <button
                      className="btn btn-dark nav-button rounded-0"
                      style={{ position: "relative", top: "9px" }}
                    >
                      {/* <img src={HistoryLogo} width="20" height="20" alt=""/> */}
                      Aggregated orders
                    </button>
                  </Link>   
                </>
    
            </div>
          </div>
        </div>

        {/*<!-- LOGIN -->*/}
        {/* <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
  
    
                <div className="nav-item dropdown position-static justify-content-end">
                  <button
                    className="btn btn-light rounded-circle btn-primary p-0"
                    style={{ display: "block", width: "40px", height: "40px" }}
                  >
                    <i
                      className="fa fa-user-circle-o fa-lg"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
            </li>
          </ul>
        </div> */}
      </nav>
    </>
  );
                      
};

export default Header;
