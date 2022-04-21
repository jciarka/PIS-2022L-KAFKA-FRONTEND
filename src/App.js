import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from "react";

function App() {


// axios.defaults.proxy.host = process.env.REACT_APP_BACKEND_URL
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL

// const test = async() => {
//   const result = await axios.get('/api/test/')
//   console.log(result)
// }

let fetchedTest = axios.get(`/api/test`);


useEffect(() => {
  test();
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>API_URL: {process.env.REACT_APP_BACKEND_URL}</p>
        <p>Greetings from our team</p>
        <p>{fetchedTest.comment}</p>
      </header>
    </div>
  );
}

export default App;
