import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


function Main() {
    
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult 
            ? <div className='showContant'>
              <div className="greet">
                <p><span>Hello,</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                  <div className="card card1">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.bulb_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.message_icon} alt="" />
                  </div>
                  <div className="card">
                    <p>Brainstorm team bonding acticities for our work retreat</p>
                    <img src={assets.code_icon} alt="" />
                  </div>
            </div>
            <div className='paraBottom_container'>
              <p className='paraBottom'>Humans review some saved chats to improve Google AI. To stop this for future chats, turn off Gemini Apps Activity. If this setting is on, don't enter info you wouldn’t want reviewed or used.</p>
              <div className="btns">
                <button className='btn1'>Manage Activity</button>
                <button className='btn2'>Dismiss</button>
              </div>
             </div>
            </div>
            : <div className='result'>
                   <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                   </div>
                   <div className="result-data">
                     <img src={assets.gemini_icon} alt="" />
                     {loading 
                     ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                     </div>
                     :<p dangerouslySetInnerHTML={{__html:resultData}} className='reasultPara'></p>
                    }
                   </div>
            </div>
            }
            

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" onChange={(e) => {setInput(e.target.value)}} value={input} placeholder='Enter a prompt here'/>
                    <div>
                       <img src={assets.gallery_icon} alt="" />
                       <img src={assets.mic_icon} alt="" />
                       {input?<img onClick={() => {onSent()}} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
