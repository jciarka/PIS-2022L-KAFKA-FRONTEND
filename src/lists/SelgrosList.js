import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fileDownload from 'js-file-download';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import '../mystyles.css'

const SelgrosList = () => {
  const [items, setItems] = useState([]);
  let counter = 0;

  const [ean, setEan] = useState(null);
  const [purchasersCode, setPurchasersCode] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [dateFromReport, setDateFromReport] = useState(null);
  const [dateToReport, setDateToReport] = useState(null);
  const [reportType, setreportType] = useState('Top Purchaser by orders');
  const [dateFromSpreadsheet, setDateFromSpreadsheet] = useState(null);
  const [dateToSpreadsheet, setDateToSpreadsheet] = useState(null);
  const [limit, setLimit] = useState(null);

  const fetchItems = async () => {
    let result;
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/order/selgros/items', { params: {dateFrom, dateTo, purchasersCode, ean}});
    console.log(result.data.items);
    setItems(result.data.items)
  };

  const fetchPDFReport = async () => {
    let result;
    let url;
    if(reportType === 'Top products'){
      url = '/products'
    } else if(reportType === 'Top Purchaser by items'){
      url = '/clients/byItems'
    } else if(reportType === 'Top Purchaser by orders'){
      url = '/clients/byOrders'
    }
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/reports' + url, { responseType: 'blob', params: {dateFrom, dateTo, limit}});
    console.log(result);
    if(result.status === 200 ) {
      fileDownload(result.data, 'report.pdf')
    }
  };

  const fetchExcelReport = async () => {
    let result;
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/reports/excel', { responseType: 'blob', params: {dateFrom, dateTo}});
    console.log(result);
    if(result.status === 200 ) {
      fileDownload(result.data, 'report.xlsx')
    }
  };

  return (
    <div className="container">
      
      <div
        className="card m-4 p-4 w-100 big panel"
        style={{ border: "#8f8f8fb6" }}
      >
        <div className="row justify-content-center mb-2">
          <h5>Search ordered Selgros items</h5>
        </div>

        
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="row d-flex justify-content-around">
            <div className="px-2 col-3" style={{color: "white"}}>
              <TextField
                size="small"
                value={ean}
                id="outlined-basic"
                label="EAN"
                variant="outlined"
                onChange={(e) => {
                  e.target.value !== "" ? setEan(e.target.value) : setEan(null);
                }}
              />
            </div>
            <div className="px-2 col-3">
              <TextField
                size="small"
                value={purchasersCode}
                id="outlined-basic"
                label="Purchasers code"
                variant="outlined"
                onChange={(e) => {
                  e.target.value !== "" ? setPurchasersCode(e.target.value) : setPurchasersCode(null);
                }}
              />
            </div>
            <div className="px-2 col-3">
              <DatePicker
                size="small"
                clearable
                label="Date from"
                inputFormat="YYYY-MM-DD"
                value={dateFrom}
                onChange={e => e ? setDateFrom(dayjs(e).format('YYYY-MM-DDTHH:mm:ss.sssZ')) : setDateFrom(null)}
                renderInput={(params) => <TextField size="small" { ...params} />}
              />
            </div>
            <div className="px-2 col-3">
              <DatePicker              
                size="small"
                label="Date to"
                clearable
                inputFormat="YYYY-MM-DD"
                value={dateTo}
                onChange={e => e ? setDateTo(dayjs(e).format('YYYY-MM-DDTHH:mm:ss')) : setDateTo(null)}
                renderInput={(params) => <TextField sx={{color: 'white'}}  value={"text"} size="small" {...params} />}
              />
            </div>
          </div>
          </LocalizationProvider>
        </FormControl>

        <div className="row justify-content-end">
          <Button 
            size="small" 
            disableElevation={true} 
            variant="contained" 
            className="mt-2 mb-0 pb-0"
            onClick={fetchItems}
            >
              Search
            </Button>
        </div>
        <div className="row justify-content-center mb-2">
          <h5>Excel Report</h5>
        </div>
        <div className="row justify-content-end">
          <Button 
            size="small" 
            disableElevation={true} 
            variant="contained" 
            className="mt-2 mb-0 pb-0"
            onClick={fetchExcelReport}
            >
              Download Spreadsheet
            </Button>
        </div>
      
      
      <div className="row justify-content-center mb-2">
          <h5>PDF Report</h5>
        </div>
        
          <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>

          <div className="row d-flex justify-content-around">
            <div className="px-2 col-3">
            <TextField
              id="outlined-basic"
              select
              label="Report type"
              value={reportType}
              onChange={(e) => {
                e.target.value !== "" ? setreportType(e.target.value) : setreportType(null);
              }}
              helperText="Select report type"
            >
              <MenuItem value={'Top products'}>Top products</MenuItem>
              <MenuItem value={'Top Purchaser by items'}>Top Purchaser by items</MenuItem>
              <MenuItem value={'Top Purchaser by orders'}>Top Purchaser by orders</MenuItem>
            </TextField>
            
            </div>
            <div className="px-2 col-3">
              <TextField
                size="small"
                value={limit}
                id="outlined-basic"
                label="Entries limit "
                variant="outlined"
                onChange={(e) => {
                  e.target.value !== "" ? setLimit(e.target.value) : setLimit(null);
                }}
              />
            </div>
            
          </div>
          </LocalizationProvider>
        </FormControl>

        <div className="row justify-content-end">
          <Button 
            size="small" 
            disableElevation={true} 
            variant="contained" 
            className="mt-2 mb-0 pb-0"
            onClick={fetchPDFReport}
            >
              Download Report
            </Button>
        </div>          
      </div>          



      {
        items && items.length > 0 &&
        <div
          className="card m-4 p-4 rounded rounded-lg w-100 shadow border rounded-0"
          style={{ border: "#8f8f8fb6" }}
          >
        <div className="row justify-content-center mb-2">
          <h6>Filtered items list</h6>
        </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Num.</TableCell>
                <TableCell align="center">Purchaser</TableCell>
                <TableCell align="center">EAN</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Recieved at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{i + 1}.</TableCell>
                  <TableCell align="center">{row.purchasersCode}</TableCell>
                  <TableCell align="center">{row.ean}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.recievedAt && row.recievedAt.replace("T", " at ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }

    </div> 
  );
};

export default SelgrosList;
