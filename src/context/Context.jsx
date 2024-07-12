import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompt,setPrevPrompt] = useState([])
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

     const delayPara = (index,nextword) => {
          setTimeout(() => {
            setResultData(prev => prev+nextword)
          },100*index)
     }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompt(prev => [...prev,input])
        const response = await run(input)
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i = 0;i < responseArray.length;i++){
            if(i === 0 || i % 2 !== 1){
                newResponse += responseArray[i];
            }else{
                newResponse+= "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for(let i = 0;i < newResponseArray.length;i++){
            const nextword = newResponseArray[i];
            delayPara(i,nextword +" ")
        }
        setResultData(newResponse2)
        setLoading(false)
        setInput("");
    }

    
    const contextValue = {
           prevPrompt,
           setPrevPrompt,
           onSent,
           setRecentPrompt,
           recentPrompt,
           showResult,
           loading,
           resultData,
           input,
           setInput
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider