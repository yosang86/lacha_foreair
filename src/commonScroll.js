import $ from 'jquery';
import {useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";

function App() {
    return(
        <>
            <div className="scroll-element scroll-x scroll-scrolly_visible">
                <div className="scroll-element_outer">
                    <div className="scroll-element_size"></div>
                    <div className="scroll-element_track"></div>
                    <div className="scroll-bar"
                         style={{width: "88px"}}
                    ></div>
                </div>
            </div>
            <div className="scroll-element scroll-y scroll-scrolly_visible">
                <div className="scroll-element_outer">
                    <div className="scroll-element_size"></div>
                    <div className="scroll-element_track"></div>
                    <div className="scroll-bar"
                         style={{height: "93px", top: "0px",}}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default App;