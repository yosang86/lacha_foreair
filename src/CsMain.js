import {useRef} from "react";
import $ from 'jquery';
import * as common from "./js/find";
import Footer from "./Footer";

function App() {
    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a // href="javascript:void(0);"
                       onClick={() => common.doHistoryBack()} className="btnPrev">이전</a>
                    <h1>고객센터</h1>
                </div>
            </div>

            <div id="content">
                <div className="cs-main">
                    <h2>무엇을 도와드릴까요?</h2>
                    <div className="cs-info">
                        <strong>02.568.1220</strong>
                        <strong className="mgb_20">help@hcclab.com</strong>
                        <p>평일 09:00~17:00</p>
                        <p>점심 12:00~13:00</p>
                        <p>주말 및 공휴일 휴무</p>
                    </div>
                    <ul>
                        <li><a href="/notice">공지사항</a></li>
                        <li><a href="/faq">자주 묻는 질문</a></li>
                        <li><a href="/question" className="full-pop-layer">1:1문의</a></li>
                        <li><a href="/withdraw" className="full-pop-layer">회원탈퇴</a></li>
                    </ul>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default App;