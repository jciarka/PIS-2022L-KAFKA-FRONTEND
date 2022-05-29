import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import "../../mystyles.css"
import selgrosLogo from "../../icons/selgros.jpg"
import batmaidLogo from "../../icons/batmaid.webp"
import orlenLogo from "../../icons/orlen.jpg"
import pepsiLogo from "../../icons/pepsi.png"
import dhlLogo from "../../icons/dhl.png"

const suppliers = [
  {
    name: "Selgros",
    path: "selgros",
    logo: selgrosLogo
  },
  {
    name: "Pepsi",
    path: "pepsi",
    logo: pepsiLogo
  },
  {
    name: "Orlen",
    path: "orlen",
    logo: orlenLogo
  },
  {
    name: "DHL",
    path: "dhl",
    logo: dhlLogo
  },
]

var SuppliersList = ({type}) => {
  return (
    <>
    <div>
      <div className="d-flex justify-content-center ml-0 mr-0 mt-0 row ">
        {
          suppliers.map(supplier => 
            <Link key={supplier.path} to={`/${type}/${supplier.path}`}> 
              <Box            
                className="box d-flex justify-content-center align-items-center"
                >
                  <div className="box-container">
                    <strong id="brand-name">{supplier.name}</strong>
                    <img id="brand-logo" src={supplier.logo} style={{width: "10vw"}}></img>
                  </div>
              </Box>
          </Link>
        )}

      </div>
    </div>
    </>
  );
                      
};

export default SuppliersList;
