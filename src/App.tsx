import { useEffect, useState } from 'react'
import axios from 'axios';
import Logo from "./Components/logo"

const REPLICATE_API_TOKEN = "Token 0e7d85ae952a8f85575433e4aeb83021e063f12b";
const API_URL = "https://api.replicate.com/v1/predictions"



const headers = {
  'Content-Type': 'application/json',
  "Authorization": "Token 0e7d85ae952a8f85575433e4aeb83021e063f12b",
} 

function App(): JSX.Element {

  const [file, setFile] = useState<any>(null);
  const [promUrl, setPromUrl] = useState("");
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");
  const [fileUrl, setFileUrl] = useState<any>();
  const [intervalId, setIntervalId] = useState<number>();
  
  // Effect hook used to continously poll the API every 2 seconds
  useEffect(() => {
    if (file) {

      var interval = setInterval(pollAPI, 2000);
      console.log("Starting Poll : ", interval);
      setIntervalId(interval);
      
    }
  }, [promUrl]);
  
  // Status effect hook, used to stop poll if necessary
  useEffect( () => {
    if (status == "succeeded") {
      console.log("SUCCEEDED");
      console.log("Stopping Poll : ", intervalId);
      clearInterval(intervalId);
      console.log("OUTPUT : ", output);
    } else if (status == "failed") {
      console.log("FAILED");
      console.log("Stopping Poll : ", intervalId);
      clearInterval(intervalId);
    } else if (status == "canceled") {
      console.log("CANCELED");
      console.log("Stopping Poll : ", intervalId);
      clearInterval(intervalId);
    } else if (status == "starting") {
      console.log("STARTING...");
    } else if (status == "processing") {
      console.log("PROCESSING...");
    }

  }, [status])

  // Post Effect
  useEffect(() => {
    if (fileUrl) {
      let postData = {
        version: "2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
        input: {
          image: fileUrl
        }
      }
  
      axios.post(API_URL, postData, {headers: headers})
      .then((res) => {
        console.log(res.data);
        
        if (res.data.status != "failed") {
          setStatus(res.data.status);
          setPromUrl(res.data.urls.get);
        }
      })
      .catch((err) => {console.log(err)})
    }
  }, [fileUrl])

  // Async function that checks the API's current status
  const pollAPI = async () => {
    axios.get(promUrl, { 
      headers: { 
        "Authorization": "Token 0e7d85ae952a8f85575433e4aeb83021e063f12b"
      }}
    )
    .then((response) => {
      setStatus(response.data.status);
      if (response.data.status == "succeeded") {
        setOutput(response.data.output);
      }
    })
    .catch((error) => {console.log(error)});
  }

  // Selection of file
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList) return;

    setFile(fileList[0]);
  };

  // Upload button clicked
  const onFileUpload = async () => {
    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => {setFileUrl(reader.result)}
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className='flex flex-col items-center w-full h-screen bg-slate-50'>
      <Logo />
      <br />
      <h1>
        An Image Description Tool for the Visually Impaired.
      </h1>
      <br />
        Uses AI to give an approximation of an uploaded Image

      <br />
      
      <br /> 
      Upload image below
      <div className='mx-auto'>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>
          Upload
        </button>
      
      <h1>status {status} </h1>
      <h1>interval {intervalId}</h1>
      <h1>promURL {promUrl}</h1>
      <h1>fileUrl {fileUrl}</h1>
      </div>
      
    </div>
  )
}

export default App
