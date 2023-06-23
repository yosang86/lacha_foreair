import $ from 'jquery';
import {useRef} from "react";
import * as common from "./js/find";
import Footer from "./Footer";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="javascript:void(0);"
                        // onClick="doHistoryBack();"
                        onClick={() => common.doHistoryBack()}
                        className="btnPrev">이전</a>
                    <h1>비밀번호 찾기</h1>
                </div>
            </div>

            <div id="content">
                <section>
                    <div className="box2">
                        <div className="tabArea">
                            <ul className="tab">
                                <li id="tab01" className="current">
                                    <a href="javascript:void(0);"
                                        // onClick="doTab('cellNo');"
                                        onClick={(e) => common.doTab(e.currentTarget, 'cellNo')}
                                    >휴대폰으로 찾기</a>
                                </li>
                                <li id="tab02">
                                    <a href="javascript:void(0);"
                                        // onClick="doTab('email');"
                                        onClick={(e) => common.doTab(e.currentTarget, 'email')}
                                    >이메일로 찾기</a>
                                </li>
                            </ul>

                            <input type="hidden" name="platFormType" id="platFormType" value="cellNo"/>

                            <div id="tab" className="tabcontent current">
                                <div className="info_form mgt_20">
                                    <p className="rafer cellNo">휴대폰번호로 전송된 인증번호 입력하세요.</p>
                                    <p className="rafer email" style={{display: "none"}}>
                                        메일주소로 전송된 인증번호 입력하세요.
                                        <br/>이메일로 실명인증을 하셨을 경우 추후 결제 등의 과정에서
                                        휴대폰 또는 신용카드 인증을 추가로 요청 할 수 있습니다.
                                    </p>
                                    <dl className="inputArea">
                                        <dt className="cellNo">이름 <span className="ess bgRed">필수</span></dt>
                                        <dd className="cellNo">
                                            <input type="text" name="mbrNm" id="mbrNm" className="mgt_10"
                                                placeholder="이름을 입력해주세요" maxLength="20" autoComplete="off"/>
                                        </dd>
                                        <dt className="cellNo">휴대폰번호 <span className="ess bgRed">필수</span></dt>
                                        <dd className="cellNo">
                                            <input type="text" name="cellNo" id="cellNo" className="mgt_10 onlyNum"
                                                placeholder="숫자만 입력" maxLength="11" autoComplete="off"/>
                                        </dd>
                                        <dt className="email" style={{display: "none"}}>
                                            이메일 <span className="ess bgRed">필수</span>
                                        </dt>
                                        <dd className="email" style={{display: "none"}}>
                                            <p className="input_inline">
                                                <span className="w100 mgt_10 vam">
                                                    <span className="input_email">
                                                        <input type="text" name="email1" id="email1" maxLength="50"/>
                                                    </span>
                                                    @<span className="input_email" style={{display: "none"}}>
                                                        <input type="text" name="emailInput" id="emailInput"/>
                                                    </span>
                                                    <span className="input_email">
                                                        <select id="emailAddr" name="emailAddr"
                                                            onChange={(e) => common.checkEmailType(e.currentTarget)}
                                                        >
                                                            <option value="">선택</option>
                                                            <option value="10">naver.com</option>
                                                            <option value="20">daum.net</option>
                                                            <option value="30">gmail.com</option>
                                                            <option value="40">nate.com</option>
                                                            <option value="50">yahoo.co.kr</option>
                                                            <option value="60">paran.com</option>
                                                            <option value="70">hotmail.com</option>
                                                            <option value="80">직접입력</option>
                                                        </select>
                                                    </span>
                                                </span>
                                            </p>
                                        </dd>
                                        <dt>인증번호</dt>
                                        <dd>
                                            <p className="input_inline">
                                                <a href="javascript:void(0);" id="sendBtn"
                                                    // onClick="sendKey(this);"
                                                    onClick={(event) => common.sendKey(event.currentTarget)}
                                                    className="mbtn mgt_10 lbtn filled btn-large mgr_5"
                                                    style={{background: "#466cc2", border: "1px solid #466cc2",}}>인증번호발송</a>
                                                <input type="text" id="tab_number" className="mgt_10 mgr_0" maxLength="6"/>
                                                <em id="em_time"></em>
                                            </p>
                                            <div className="right mgt_10">
                                                <span className="rafer-red" id="time_err">시간 안에 인증번호를 입력해주세요.</span>
                                            </div>
                                        </dd>
                                    </dl>
                                    <div className="btnArea mgt_30">
                                        <a href="javascript:void(0);" id="confirmCnBtn"
                                           className="lbtn disable btn-large">인증완료하기</a>
                                        <a href="javascript:void(0);"
                                           // onClick="passWordChange();"
                                           onClick={() => common.passwordChange()}
                                           id="confirmBtn" className="lbtn btn-large filled"
                                           style={{background: "#466cc2", border: "1px solid #466cc2", display: "none"}}>인증완료하기</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
  );
}

export default App;
