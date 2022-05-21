import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import '../../mystyles.css'

const suppliers = [
  {
    name: "Selgros",
    path: "selgros"
  },
  {
    name: "Pepsi",
    path: "pepsi"
  },
  {
    name: "Orlen",
    path: "orlen"
  },
  {
    name: "Batmaid",
    path: "batmaid"
  },
  {
    name: "DHL",
    path: "dhl"
  },
]

var SuppliersList = ({type}) => {
  return (
    <>
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
        {
          suppliers.map(supplier => 
            <Link key={supplier.path} to={`/${type}/${supplier.path}`}> 
              <Box            
                sx={{
                  width: 200,
                  height: 200,
                  '&:hover': {
                    opacity: [0.8, 0.7, 0.6],
                  },
                }}
                className="d-flex justify-content-center align-items-center big panel"
                >
                  <div>
                    <strong style={{color: "white", fontSize: "30px"}}>{supplier.name}</strong>
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
