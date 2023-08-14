import {useRef} from "react";
import $ from 'jquery';
import * as common from "./js/find";
import Footer from "./Footer";

function App() {
    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <h1>회원가입</h1>
                </div>
            </div>

            <div id="content">
                <section>
                    <div className="box2" style={{paddingTop : "100px"}}>
                        <div className="stepFixed">
                            <div className="stepBox">
                                <ol className="stepList">
                                    <li>
                                        <div className="step01"></div>
                                        <em>약관동의</em>
                                    </li>
                                    <li>
                                        <div className="step02"></div>
                                        <em>정보입력</em>
                                    </li>
                                    <li>
                                        <div className="step03 on"></div>
                                        <em>가입완료</em>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="infoBox bg01">
                            <p className="lacuca">
                                <strong>라차</strong><br/>회원가입이 <br/>완료되었습니다.
                            </p>
                            <p className="infoTxt">로그인 후 다양한 서비스를<br/> 이용하실 수 있습니다.</p>
                        </div>
                        <div className="btnArea">
                            <a href="/login" className="lbtn btn-large filled"
                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>로그인페이지로 이동</a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    )
}

export default App;