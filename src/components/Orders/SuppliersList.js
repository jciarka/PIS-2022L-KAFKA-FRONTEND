import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

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
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        {
          suppliers.map(supplier => 
            <Link key={supplier.path} to={`/${type}/${supplier.path}`}> 
              <Box
                
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: 'black',
                  '&:hover': {
                    backgroundColor: 'grey.main',
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
                className="d-flex justify-content-center align-items-center"
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
