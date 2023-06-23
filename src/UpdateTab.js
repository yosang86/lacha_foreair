import $ from 'jquery';
import {useRef} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";

function App(props) {

    return(
        <div className="tab02 slideTab">
            <ul className="swiper-wrapper tab">
                <li className={`swiper-slide ${props.name == "base" ? "current" : ""}`}><a href="/updateBase" className="type1">기본정보</a></li>
                <li className={`swiper-slide ${props.name == "address" ? "current" : ""}`}><a href="/updateAddr" className="type2">배송지관리</a></li>
                <li className={`swiper-slide ${props.name == "extra" ? "current" : ""}`}><a href="/updateExtra" className="type3">부가정보</a></li>
                <li className={`swiper-slide ${props.name == "passenger" ? "current" : ""}`}><a href="/updatePassenger" className="type3">나의여행자</a></li>
                <li className={`swiper-slide ${props.name == "consent" ? "current" : ""}`}><a href="/updateConsent" className="type3">정보수신동의여부</a></li>
            </ul>
        </div>
    );
}

export default App;
