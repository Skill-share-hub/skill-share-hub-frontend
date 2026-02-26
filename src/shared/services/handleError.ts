import axios from "axios";

export default function handleError(error:unknown){
  if(axios.isAxiosError(error)){
    console.log(error.message);
    return error.message;
  }
  console.log("Unknown Error!");
  return "Unknown Error!"
}