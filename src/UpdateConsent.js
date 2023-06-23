import $ from 'jquery';
import {useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";
import UpdateTab from "./UpdateTab";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const updateConsent = () => {
        var formData = {};
        var formType = $('[data-dbtype="checkbox"]', $("#mypageConsentUpdateForm"));
        var cnt = formType.length;
        for(var i = 0; i < cnt; i++) {
            var id = $(formType[i]).attr('id');
            var checked = $(formType[i]).is(":checked");
            if(checked) {
                formData[id] = 'Y';
            } else {
                formData[id] = 'N';
            }
        }

        common.cmnConfirmLayer('수정한 내용을 저장하시겠습니까?', function () {
            $.ajax( {
                url : '/mypage/s_MyPageConsentUpdate.json',
                data : formData,
                dataType : 'json',
                type : 'post',
                success:function(data) {
                    var status = data.status;
                    if(status == 'succ') {
                        common.cmnAlertLayer('btn1','수정 하였습니다.', function () {
                            getMbrInfo();
                        });

                    } else {
                        common.cmnAlertLayer('btn1','실패하였습니다.');
                    }
                },
                error:function(data) {
                    common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                }
            });
        });

    }

    const getMbrInfo = () => {
        $.ajax( {
            url : '/mypage/s_MyPageMbrInfo.json',
            data : '',
            dataType : 'json',
            type : 'post',
            success : function(data) {
                var detail = data.detail;
                createMbrInfo(detail);
            },
            error : function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    const createMbrInfo = (detail) => {
        var formType = $('[data-dbtype="checkbox"]', $("#mypageConsentUpdateForm"));
        var cnt = formType.length;
        for(var i = 0; i < cnt; i++) {
            var id = $(formType[i]).attr('id');
            for(var key in detail) {
                var $val = detail[key];
                if(id == key && $val == 'Y') {
                    $(formType[i]).prop('checked', true);
                } else if(id == key && $val == 'N') {
                    $(formType[i]).prop('checked', false);
                }
            }
        }
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="/mypage" className="btnPrev">이전</a>
                    <h1>개인정보수정</h1>
                </div>
            </div>

            <form name="mypageConsentUpdateForm" id="mypageConsentUpdateForm" method="post">
                <div id="content">
                    {/*<div className="tab02 slideTab">*/}
                    {/*    <ul className="swiper-wrapper tab">*/}
                    {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageBase.do" className="type1">기본정보</a></li>*/}
                    {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageAddr.do" className="type2">배송지관리</a></li>*/}
                    {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageExtra.do" className="type3">부가정보</a></li>*/}
                    {/*        <li className="swiper-slide"><a href="/foreign/mypage/s_MyPageCompanion.do" className="type3">나의여행자</a></li>*/}
                    {/*        <li className="swiper-slide current"><a href="/mypage/s_MyPageConsent.do" className="type3">정보수신동의여부</a></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    <UpdateTab name="consent"/>

                    <section className="mgb_0">
                        <div className="box">
                            <h2 className="tit1">정보 수신 동의 여부</h2>
                            <ul className="list_type">
                                <li>제도, 포인트, 적립금, 결제 관련 안내 등 [라쿠카라차] 의</li>
                                <li>종합쇼핑몰 운영과 관련된 안내를 받으실 수 있습니다.</li>
                                <li>운영정보(제도) 수신동의와 관련된 사항은 담당자에게 문의하여 주시기 바랍니다.</li>
                            </ul>
                            <div className="info_form">
                                <dl className="inputArea">
                                    <dt>관심분야</dt>
                                    <dd className="mgt_10 select-option">
                                        <span className="check">
                                            <input id="mngMailAgrYn" name="mngMailAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="mngMailAgrYn">이메일</label>
                                        </span>
                                        <span className="check">
                                            <input id="mngAltalkAgrYn" name="mngAltalkAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="mngAltalkAgrYn">알림톡</label>
                                        </span>
                                        <span className="check">
                                            <input id="mngPushAgrYn" name="mngPushAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="mngPushAgrYn">푸쉬</label>
                                        </span>
                                        <span className="check">
                                            <input id="mngSmsAgrYn" name="mngSmsAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="mngSmsAgrYn">문자</label>
                                        </span>
                                        <span className="check">
                                            <input id="mngPostAgrYn" name="mngPostAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="mngPostAgrYn">우편</label>
                                        </span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </section>

                    <section className="mgb_0">
                        <div className="box">
                            <h2 className="tit1">혜택 수신 동의 여부</h2>
                            <ul className="list_type">
                                <li>수신 동의한 채널의 고객정보를 활용하여 이벤트, 할인혜택, 기획전 등 최신정보를 받아 보실 수 있습니다.</li>
                                <li>수신 거부해도 주문내역 및 회사의 주요정책 관련 공지내용은 발송됩니다.</li>
                            </ul>
                            <div className="info_form">
                                <dl className="inputArea">
                                    <dt>관심분야</dt>
                                    <dd className="mgt_10 select-option">
                                        <span className="check">
                                            <input id="fvrEmailAgrYn" name="fvrEmailAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="fvrEmailAgrYn">이메일</label>
                                        </span>
                                        <span className="check">
                                            <input id="fvrAltalkAgrYn" name="fvrAltalkAgrYn" type="checkbox"
                                                   data-dbtype="checkbox"/>
                                            <label htmlFor="fvrAltalkAgrYn">알림톡</label>
                                        </span>
                                        <span className="check">
                                            <input id="fvrPushAgrYn" name="fvrPushAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="fvrPushAgrYn">푸쉬</label>
                                        </span>
                                        <span className="check">
                                            <input id="fvrSmsAgrYn" name="fvrSmsAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="fvrSmsAgrYn">문자</label>
                                        </span>
                                        <span className="check">
                                            <input id="fvrPostAgrYn" name="fvrPostAgrYn" type="checkbox" data-dbtype="checkbox"/>
                                            <label htmlFor="fvrPostAgrYn">우편</label>
                                        </span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="btnArea mgt_30">
                                <a href="#none" className="lbtn btn-large filled"
                                   style={{background: "#466cc2", border: "1px solid #466cc2"}}
                                   // onClick="updateConsent();"
                                   onClick={() => updateConsent()}
                                >변경 내용 저장</a>
                            </div>
                        </div>
                    </section>
                </div>
            </form>

            <Footer/>
        </>
    );
}

export default App;