import { useEffect, useState } from 'react'
import axios from 'axios';

const REPLICATE_API_TOKEN = "Token 0e7d85ae952a8f85575433e4aeb83021e063f12b";
const API_URL = "https://api.replicate.com/v1/predictions"



const headers = {
  'Content-Type': 'application/json',
  "Authorization": "Token 0e7d85ae952a8f85575433e4aeb83021e063f12b",
  "webhook" : "https://webhook.site/e26f713c-25ec-4ba2-8c19-9c4882deb4d2"
} 

function App(): JSX.Element {

  const [file, setFile] = useState<any>(null);
  const [promUrl, setPromUrl] = useState("");
  const [status, setStatus] = useState("");
  const [output, setOutput] = useState("");
  const [fileUrl, setFileUrl] = useState<any>();
  const [intervalId, setIntervalId] = useState<number>();
  
  // Get Effect
  useEffect(() => {
    if (file) {

      var interval = setInterval(pollAPI, 2000);
      setIntervalId(interval);
      
    }
  }, [promUrl]);

  useEffect( () => {
    if (status == "succeeded") {
      console.log("STOPPING POLL", intervalId);
      clearInterval(intervalId);
      
    } else if (status == "failed") {
      clearInterval(intervalId);
    }

  }, [status])

  // Post Effect
  useEffect(() => {
    if (fileUrl) {
      let postData = {
        version: "50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
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

  const pollAPI = async () => {
    axios.get(promUrl, { 
      headers: { 
        "Authorization": "Token 0e7d85ae952a8f85575433e4aeb83021e063f12b"
      }}
    )
    .then((response) => {
      console.log(response.data);
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
    <div>
      <h1 className='text-3xl'>
        be my eyes
      </h1>
      <br />
      <h1>
        An Image Description Tool for the Visually Impaired.
      </h1>
      <br />
        Uses AI to give an approximation of an uploaded Image

      <br />
      <br /> 
      Upload image below
      <div>
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
