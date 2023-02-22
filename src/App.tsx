import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "./Components/Logo";
import Filedrop from './Components/Filedrop';
import Navbar from "./Components/Navbar";

const REPLICATE_API_TOKEN = "Token 0e7d85ae952a8f85575433e4aeb83021e063f12b";
const API_URL = "https://api.replicate.com/v1/predictions"

const POST_HEADERS = {
  'Content-Type': 'application/json',
  "Authorization": REPLICATE_API_TOKEN,
} 

const GET_HEADERS = {
  'Content-Type': 'application/json',
  "Authorization": REPLICATE_API_TOKEN,
} 

function App() {

  const [file, setFile] = useState<any>(null);
  const [promUrl, setPromUrl] = useState("");
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");
  const [fileStr, setFileStr] = useState<any>();
  const [poll, setPoll] = useState(false);
  const [intervalId, setIntervalId] = useState<number>();
  
  // Effect hook used to continously poll the API every 2 seconds
  useEffect(() => {
    if (file) {

      var interval = setInterval(pollAPI, 1000);
      console.log("Starting Poll : ", interval);
      setIntervalId(interval);
      
    }
  }, [promUrl]);
  
  // Status effect hook, used to stop poll if necessary
  useEffect( () => {
    if (status) {
      if (status == "succeeded") {
        console.log("SUCCEEDED");
        console.log("Stopping Poll : ", intervalId);
        clearInterval(intervalId);
        setPoll(false);
        console.log("OUTPUT : ", output);
      } else if (status == "failed") {
        console.log("FAILED");
        console.log("Stopping Poll : ", intervalId);
        clearInterval(intervalId);
        setPoll(false);
      } else if (status == "canceled") {
        console.log("CANCELED");
        console.log("Stopping Poll : ", intervalId);
        clearInterval(intervalId);
        setPoll(false);
      } else if (status == "starting") {
        console.log("STARTING...");
      } else if (status == "processing") {
        console.log("PROCESSING...");
      } else {
        console.log("Status not Recognized")
        console.log("Stopping Poll : ", intervalId);
      }
    }
  }, [status])

  // Post Effect
  useEffect(() => {
    if (poll) {
      let postData = {
        version: "2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
        input: {
          image: fileStr
        }
      }
      
      
      axios.post(API_URL, postData, {headers: POST_HEADERS})
      .then((res) => {
        console.log(res.data);
        
        if (res.data.status != "failed") {
          setStatus(res.data.status);
          setPromUrl(res.data.urls.get);
        }
      })
      .catch((err) => {console.log(err)})
    }
  }, [poll])

  // Async function that checks the API's current status
  const pollAPI = async () => {
    axios.get(promUrl, {headers: GET_HEADERS})
    .then((response) => {
      setStatus(response.data.status);
      if (response.data.status == "succeeded") {
        setOutput(response.data.output);
      }
    })
    .catch((error) => {console.log(error)});
  }

  // Upload button clicked
  const onFileUpload = async () => {
    if (file) {
      setPoll(true);
    } else {
      console.log("No File Inputted");
    }
  };


  return (
    <div className='flex flex-col w-full h-screen bg-slate-50'>
      <Navbar />
      <h1 className='text-center mt-1'>
        An Image Description Tool for the Visually Impaired.
      </h1>
      
      <br /> 
      <div className='flex flex-col items-center'>
        <br />
        
        
        <br />
        <h1>status {status} </h1>
        <h1>interval {intervalId}</h1>
        <h1>promURL {promUrl}</h1>
        <h1>fileStr {fileStr}</h1>
        <Filedrop setFile={setFile} file={file} setFileStr={setFileStr} />
        <button type="button" className='mx-6 rounded-md px-2 border-black border-[1px]' onClick={onFileUpload}>
          Upload
        </button>
        {output ? output : ''}
        {console.log(file)}
        <img src={file}/>
      </div>
      
    </div>
  )
}

export default App
