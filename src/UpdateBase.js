import $ from 'jquery';
import {useRef} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";
import * as pcert from "./js/phoneCert";
import UpdateTab from "./UpdateTab";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const saveBaseInfo = () => {
        var param = mypage.setData();

        if(param) {
            common.cmnConfirmLayer('수정 하시겠습니까?', function () {
                $.ajax( {
                    url : '/mypage/s_UpdateMyInfo.do',
                    data : param,
                    dataType : 'json',
                    type : 'post',
                    success:function(data) {
                        var status = data.retCode;

                        if(status == '0000') {
                            $('#chgFlag').val('');
                            common.cmnAlertLayer('btn1','수정 하였습니다.');

                        } else if(status == '0004') {
                            common.cmnAlertLayer('btn1','비밀번호 변경 실패 하였습니다.');

                        } else if(status == '0005') {
                            common.cmnAlertLayer('btn1','이메일 수정 실패 하였습니다.');
                        }
                    },
                    error:function(data) {
                        common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                    }
                });
            });
        }
    }

    const updateEmailInput = (element) => {
        if ($(element).val() == "80") $("#emailInput").parent().css("display", "");
        else $("#emailInput").parent().css("display", "none");
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="/mypage" className="btnPrev">이전</a>
                    <h1>개인정보수정</h1>
                </div>
            </div>

            <div id="content">
                {/*<div className="tab02 slideTab" id="slideTab">*/}
                {/*    <ul className="swiper-wrapper tab" id="swiper">*/}
                {/*        <li className="swiper-slide current">*/}
                {/*            <a href="javascript:void(0);" className="type1">기본정보</a>*/}
                {/*        </li>*/}
                {/*        <li className="swiper-slide">*/}
                {/*            <a href="javascript:void(0);" className="type2"*/}
                {/*                // onClick="pageMove('/mypage/s_MyPageAddr.do');"*/}
                {/*                onClick={() => mypage.pageMove("/mypage/s_MyPageAddr.do")}*/}
                {/*            >배송지관리</a>*/}
                {/*        </li>*/}
                {/*        <li className="swiper-slide">*/}
                {/*            <a href="javascript:void(0);" className="type3"*/}
                {/*                // onClick="pageMove('/mypage/s_MyPageExtra.do');"*/}
                {/*                onClick={() => mypage.pageMove("/mypage/s_MyPageExtra.do")}*/}
                {/*            >부가정보</a>*/}
                {/*        </li>*/}
                {/*        <li className="swiper-slide">*/}
                {/*            <a href="javascript:void(0);" className="type3"*/}
                {/*                // onClick="pageMove('/foreign/mypage/s_MyPageCompanion.do');"*/}
                {/*                onClick={() => mypage.pageMove("/mypage/s_MyPageCompanion.do")}*/}
                {/*            >나의여행자</a>*/}
                {/*        </li>*/}
                {/*        <li className="swiper-slide">*/}
                {/*            <a href="javascript:void(0);" className="type3"*/}
                {/*                onClick="pageMove('/mypage/s_MyPageConsent.do');"*/}
                {/*                onClick={() => mypage.pageMove("/mypage/s_MyPageConsent.do")}*/}
                {/*            >정보수신동의여부</a>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <UpdateTab name="base"/>

                <section className="mgb_0">
                    <div className="box2">
                        <h2 className="tit2">가입정보</h2>
                        <div className="info_form mgt_20">
                            <dl className="inputArea">
                                <dt>아이디</dt>
                                <dd>
                                    <input type="text" id="loginId" className="mgt_10" value="korailtest" disabled/>
                                </dd>
                                <dt>
                                    비밀번호<a href="/changePw" className="change">변경</a>
                                </dt>
                                <dd>
                                    <input type="password" id="pwd" className="mgt_10" value="●●●●●●" disabled/>
                                    <input type="hidden" name="passwd" id="passwd" value="" readOnly="readonly"/>
                                    <input type="hidden" name="changePwdFst" id="changePwdFst" value="" readOnly="readonly"/>
                                    <input type="hidden" name="changePwdScd" id="changePwdScd" value="" readOnly="readonly"/>
                                </dd>
                                <dt>이름</dt>
                                <dd>
                                    <input type="text" id="mbrNm" className="mgt_10" value="코레일테스트" disabled/>
                                </dd>
                                <dt>이메일</dt>
                                <dd>
                                    <p className="input_inline">
								        <span className="w100 mgt_10 vam">
                                            <span className="input_email">
                                                {/*<input type="text" name="email" id="email" value="korail"/>*/}
                                                <input type="text" name="email" id="email" autoComplete="off"/>
                                            </span>
                                            @
                                            <span className="input_email">
                                                {/*<input type="text" name="emailInput" id="emailInput" value="hcclab.com"/>*/}
                                                <input type="text" name="emailInput" id="emailInput" autoComplete="off"/>
                                            </span>
                                            <span className="input_email">
                                                <select id="emailAddr" name="emailAddr"
                                                    onChange={(event) => updateEmailInput(event.currentTarget)}
                                                >
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
                                    <p className="err" id="emailChkValid" style={{display: "none"}}></p>
                                    {/*<!-- 에러 메세지 -->*/}
                                    <p></p>
                                </dd>
                                <dt>
                                    휴대폰
                                    <a href="javascript:void(0);" className="change"
                                        // onClick="callKmcert(this);"
                                        onClick={(e) => pcert.callKmcert(e.currentTarget)}
                                    >변경</a>
                                </dt>
                                <dd>
                                    <input type="text" className="mgt_10 onlyNum" id="cellNo" name="cellNo"
                                           value="01033335555" maxLength="11" readOnly="readonly"/>
                                </dd>
                            </dl>
                        </div>
                        <input type="hidden" className="mgt_10" id="chgFlag" value="" readOnly="readonly"/>
                        <form name="baseForm" id="baseForm" method="post" action="/mypage/s_MyPageBase.do">
                        </form>
                        <div className="mgt_30">
                            <p className="rafer-red">개인정보 수정시 주의사항</p>
                            <ul className="intro-txt">
                                <li>정보 수정 후 반드시 '변경내용저장'을 진행해 주세요.</li>
                            </ul>
                        </div>
                        <div className="btnArea mgt_20">
                            <a href="javascript:void(0);" className="lbtn btn-large filled"
                               style={{background: "#466cc2", border: "1px solid #466cc2"}}
                               // onClick="saveBaseInfo();"
                               onClick={() => saveBaseInfo()}
                            >변경내용저장</a>
                        </div>
                    </div>
                </section>

                <form id="formKmcert" name="formKmcert" method="post" target="kmcert">
                    <input type="hidden" name="urlCode" id="urlCode" value="005002"/>
                    <input type="hidden" name="cscoNo" id="cscoNo" value="2001"/>
                    <input type="hidden" name="loginId" id="loginId" value="korailtest"/>
                    <input type="hidden" name="dbCheckType" id="dbCheckType" value="loginId"/>

                    <div className="full-layer default-layer" id="kmcertLayer">
                        <div className="popWrap">
                            <div className="pop-header">
                                <div className="pop-tit">
                                    <h1 className="pop-name">휴대폰인증</h1>
                                    <a href="javascript:void(0);"
                                       className="btnClose full-pop-close">닫기</a>
                                </div>
                            </div>

                            <div className="pop-cont"></div>
                        </div>
                    </div>
                </form>
            </div>

            <Footer/>
        </>
  );
}

export default App;
