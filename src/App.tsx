import React from 'react';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import Inputs from "./Components/Inputs"
import Filedrop from './Components/Filedrop';
import Navbar from "./Components/Navbar";
import AccountContext from './contexts/AccountContext';


import {COLORS} from "./values/colors";


// Constants
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
/**
 * Main app component for homepage
 * @returns homepage component tree
 */
function App() {

  const [file, setFile] = useState<any>(null);
  const [promUrl, setPromUrl] = useState(""); // Promise URL for api used
  const [status, setStatus] = useState(""); // Status of api request
  const [output, setOutput] = useState(""); // Output of api request
  const [fileStr, setFileStr] = useState<any>(); // Stringified file contents
  const [poll, setPoll] = useState(false); // Flag for polling api request
  const [intervalId, setIntervalId] = useState<number>(); // Interval ID for polling api request
  const [task, setTask] = useState("image_captioning"); // Current task being run for api request
  const [input, setInput] = useState("") // Current input being used for api request
  const [loggedIn, setLoggedIn] = useState(false); // Flag for whether user is logged in
  const [userInfo, setUserInfo] = useState({}); // User info for logged in user


  
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
      if (status == "succeeded") { // if api request succeeded
        console.log("SUCCEEDED");
        console.log("Stopping Poll : ", intervalId);
        clearInterval(intervalId);
        setPoll(false);
        console.log("OUTPUT : ", output);
      } else if (status == "failed") { // if api request failed
        console.log("FAILED");
        console.log("Stopping Poll : ", intervalId);
        clearInterval(intervalId);
        setPoll(false);
      } else if (status == "canceled") { // if api request canceled
        console.log("CANCELED");
        console.log("Stopping Poll : ", intervalId);
        clearInterval(intervalId);
        setPoll(false);
      } else if (status == "starting") { // if api request starting
        console.log("STARTING...");
      } else if (status == "processing") { // if api request processing
        console.log("PROCESSING...");
      } else {                     
        console.log("Status not Recognized")
        console.log("Stopping Poll : ", intervalId);
      }
    }
  }, [status])

  // Post Effect used for initial post request and inputs
  useEffect(() => {
    if (poll) {
      console.log("FINAL INPUT : ", input, "     FINAL TASK : ", task);
      let postData: Object = {}
      
      // check if the a necessary input is provided
      if (input == "" && (task == "visual_question_answering" || task == "image_text_matching")) {
        setPoll(false);
        setOutput("Please Choose an Input");
      }

      // Building of inputs for the post request depending on the task
      let inputs = {};
      if (task == "visual_question_answering") {
        inputs = {
          image: fileStr,
          task: task,
          question: input,
        }
      } else if (task == "image_text_matching") {
        inputs = {
          image: fileStr,
          task: task,
          caption: input,
        }
      } else {
        inputs = {
          image: fileStr,
          task: task,
        }
      }
      
      postData = {
        version: "2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
        input: inputs
      }

      // Post
      console.log("POST DATA : ", postData);
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
    if (poll) {
      axios.get(promUrl, {headers: GET_HEADERS})
      .then((response) => {
        setStatus(response.data.status);
        if (response.data.status == "succeeded") {
          setOutput(response.data.output);
        }
      })
      .catch((error) => {console.log(error)});
    }
  }

  // Upload button clicked
  const onFileUpload = async () => {
    if (file) {
      setPoll(true);
    } else {
      console.log("No File Inputted");
      setOutput("No Image Uploaded");
    }
  };


  return (
    <div className='flex flex-col w-full h-screen bg-slate-50'>
      <AccountContext.Provider value={{loggedIn, setLoggedIn, userInfo, setUserInfo}}>
      <Navbar />
      <h1 className='text-center mt-1'>
        An Image Description Tool for the Visually Impaired.
      </h1>
      
      <br /> 
      <div className='flex flex-row'>

        {/* Photo viewer and file drop */}
        <div className="flex flex-col w-1/2">

          <Filedrop setFile={setFile} file={file} setFileStr={setFileStr} />
        
          {file ? 
          <div className='mx-6'>
            <img className="display-block border-2 border-black mb-6" src={file}/>
          </div> : 
          <div className='mx-6'>
            <div className='flex justify-center items-center flex-col bg-cgrey w-full h-44 border-2 border-black'>
              <img className="mx-auto" src="/noimage.svg" alt="Yet to Upload Image"/>
              <h1> Please Upload File Above</h1>
            </div>
          </div>}

        </div>
        
        {/* Right side */}
        <div className='flex flex-col w-1/2'>
          <div className='mx-6'>
            
            
            <Inputs setTask={setTask} setInput={setInput} onFileUpload={onFileUpload}/>

            
          </div>
        </div>
      </div>

      {output ? <div className="mt-4 mx-auto bg-cnight text-white text-center border-choney border-2 text-sm rounded-sm block w-4/6 p-2.5 ">{output.toUpperCase()}</div> : ''}

      <br />
      <br />
      
      {/* States for testing */}
      {/* <h1>status {status} </h1>
      <h1>interval {intervalId}</h1>
      <h1>promURL {promUrl}</h1>
      <h1>fileStr {fileStr}</h1> */}
      </AccountContext.Provider>
    </div>
  )
}

export default App;

