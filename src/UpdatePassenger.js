import $ from 'jquery';
import {useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";
import UpdateTab from "./UpdateTab";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const newCompanionArea = () => {
        $("#footer").hide();
        $("#C4_b").show();
    }
    const closeCompanionArea = () => {
        $("#C4_b").hide();
        $("#footer").show();
    }

    const korRegex = /^[ㄱ-ㅎ|가-힣]+$/;
    const engRegex = /^[a-z|A-Z]+$/;
    const checkString = (str, type, id) => {
        let checkResult;
        if (type) {
            checkResult = korRegex.test(str);
        } else {
            document.getElementById(id).value = str.toUpperCase();
            checkResult = engRegex.test(str);
        }

        let target = $("#" + id);
        let childrenLength = target.parent().children().length;
        if (checkResult || '' === str) {  // 재대로 입력된 경우
            target.removeClass("err-input");
            if (childrenLength > 1) {
                $("#" + id).parent().children()[childrenLength - 1].remove();
            }
        } else {            // 재대로 입력이 안된경우
            target.addClass("err-input");
            if (childrenLength <= 1) {
                if (type) {
                    $("#" + id).parent().append('<p class="err"><i class="bgiNone">*</i> 한글만 입력 가능합니다</p>');
                } else {
                    $("#" + id).parent().append('<p class="err"><i class="bgiNone">*</i> 영문만 입력 가능합니다</p>');
                }
            }
        }
    }

    const checkStringValue = (element) => {
        const id = element.id;
        const type = element.getAttribute("data1") == "true";
        const value = document.getElementById(id).value;
        checkString(value, type, id);
    }

    const dateReg = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

    const putNewCompanion = () => {
        let checkValue = false;
        let korNameLast = document.getElementById("kor_name_last").value;
        checkValue = "" === korNameLast;
        let korNameFirst = document.getElementById("kor_name_first").value;
        checkValue = "" === korNameFirst;
        let engNameLast = document.getElementById("eng_name_last").value;
        checkValue = "" === engNameLast;
        let engNameFirst = document.getElementById("eng_name_first").value;
        checkValue = "" === engNameFirst;
        let birthday = document.getElementById("birthday").value;
        checkValue = "" === birthday;
        if (checkValue) {
            common.cmnAlertLayer("", "필수값을 모두 입력하여 주십시오.");
            return;
        }

        if (!dateReg.test(birthday)) {
            common.cmnAlertLayer("", "입력된 생일정보를 정확하게 입력하여주십시오.<br/>생일은 숫자와 하이픈(-)만 가능합니다.<br/>예)1996-06-21");
            return;
        }

        let genderType = "";
        var genderList = document.querySelectorAll(".inpax");
        for (let i = 0; i < genderList.length; i++) {
            let selectGenderListClass = genderList[i].getAttribute("class");
            if (selectGenderListClass.indexOf("on") != -1) {
                genderType = genderList[i].getAttribute("data1");
            }
        }

        let nationalName = "";
        let nationalType = document.getElementById("nationalType");
        nationalName = nationalType.options[nationalType.selectedIndex].text;
        let sn = document.getElementById("companionInfo").getAttribute("data1");
        const companionData = {
            "nameFKor":korNameFirst,
            "nameLKor":korNameLast,
            "nameFEng":engNameFirst,
            "nameLEng":engNameLast,
            "birthday":birthday.replace(/-/gi, ""),
            "gender":genderType,
            "na":nationalName,
            "sn":sn
        }

        $.ajax({
            url : "/foreign/mypage/postNewCompanion.json",
            type : "post",
            dataType : "json",
            data : companionData,
            success : function(data) {
                let isSuccess = data.isSuccess;
                if (isSuccess != true) {
                    common.cmnAlertLayer('','저장 중 오류가 발생하였습니다.<br/>잠시후에 다시 시도해 주십시요.');
                    return;
                }
                document.location.href = "/foreign/mypage/s_MyPageCompanion.do";
            }
            , error:function(data) {
                common.cmnAlertLayer('','저장 중 오류가 발생하였습니다.<br/>잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    const updateMyCompanion = (snValue) => {
        let data = {"sn":snValue};
        $.ajax({
            url : "/foreign/mypage/getCompanion.json",
            type : "post",
            dataType : "json",
            data : data,
            success : function(data) {
                let isSuccess = data.isSuccess;
                if (isSuccess != true) {
                    common.cmnAlertLayer('','조회 중 오류가 발생하였습니다.<br/>잠시후에 다시 시도해 주십시요.');
                    return;
                }

                let companion = data.companion;
                document.getElementById("companionInfo").setAttribute("data1", companion.sn);
                document.getElementById("kor_name_last").value = companion.nameLKor;
                document.getElementById("kor_name_first").value = companion.nameFKor;
                document.getElementById("eng_name_last").value = companion.nameLEng;
                document.getElementById("eng_name_first").value = companion.nameFEng;
                document.getElementById("birthday").value = companion.birthday.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');

                let genderType = "";
                var genderList = document.querySelectorAll(".inpax");
                for (let i = 0; i < genderList.length; i++) {
                    let selectGenderListClass = genderList[i].getAttribute("class");
                    if (genderList[i].getAttribute("data1") === companion.gender) {
                        $("#" + genderList[i].id).addClass("on");
                    } else {
                        $("#" + genderList[i].id).removeClass("on");
                    }
                    if (selectGenderListClass.indexOf("on") != -1) {
                        genderType = genderList[i].getAttribute("data1");
                    }
                }

                let selectBox = document.getElementById("nationalType");
                for (let i = 0; i < selectBox.options.length; i++) {
                    if(selectBox.options[i].value == companion.na){
                        selectBox.options[i].selected = true;
                        break;
                    }
                }

                $("#footer").hide();
                $("#C4_b").show();
            },
            error : function(data) {
                common.cmnAlertLayer('','조회 중 오류가 발생하였습니다.<br/>잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    const deleteMyCompanion = (snValue) => {
        let data = {"sn":snValue};
        $.ajax({
            url : "/foreign/mypage/deleteCompanion.json",
            type : "post",
            dataType : "json",
            data : data,
            success : function(data) {
                let isSuccess = data.isSuccess;
                if (isSuccess != true) {
                    common.cmnAlertLayer('','삭제 중 오류가 발생하였습니다.<br/>잠시후에 다시 시도해 주십시요.');
                    return;
                }
                window.location.reload();
            },
            error:function(data) {
                common.cmnAlertLayer('','삭제 중 오류가 발생하였습니다.<br/>잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function changeGenderType(element) {
        const beforeSelectId = document.querySelectorAll(".inpax.on")[0].id;
        const id = element.id;
        if (beforeSelectId != id) {
            $("#" + beforeSelectId).removeClass("on");
            $("#" + id).addClass("on");
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

            <div id="content">
                {/*<div className="tab02 slideTab">*/}
                {/*    <ul className="swiper-wrapper tab">*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageBase.do" className="type1">기본정보</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageAddr.do" className="type2">배송지관리</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageExtra.do" className="type3">부가정보</a></li>*/}
                {/*        <li className="swiper-slide current"><a href="/foreign/mypage/s_MyPageCompanion.do" className="type3">나의여행자</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageConsent.do" className="type3">정보수신동의여부</a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <UpdateTab name="passenger"/>

                <section className="mgb_0">
                    <div className="box2" id="companionListArea">
                        <div className="schedule-title pdt_0">
                            <div className="sch_btn">
                                <a href="#" className="go colBlue"
                                   // onClick="newCompanionArea()"
                                   onClick={() => newCompanionArea()}
                                >여행자 등록</a>
                            </div>
                        </div>

                        {/*등록된 정보가 없을 때*/}
                        {/*<div className="ticketWrap">*/}
                        {/*    <div className="errorNo_wrap">*/}
                        {/*        <div className="errorNo">*/}
                        {/*            <strong>등록된 여행자 정보가 없습니다.</strong>*/}
                        {/*            <p>상단의 여행자 등록 버튼을 눌러<br/>여행자를 추가해 주세요</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*등록된 정보가 있을 때*/}
                        <div className="section-eTit mgb_20 bLine">총 1 명</div>
                        <ul className="sectionGroup">
                            <li className="section-f">
                                <div className="f_left">
                                    유/ㅎㅎ상<br/>
                                    YIO/JOSAMF<br/>
                                    <span>남</span><span>1986-11-11</span><span>대한민국</span>
                                </div>
                                <div className="mgt_10">
                                    <a href="#" className="btnGray"
                                       // onClick="updateMyCompanion('{ad678099-4277-4d20-9343-e0a187d41eb3}')"
                                       onClick={() => updateMyCompanion('{ad678099-4277-4d20-9343-e0a187d41eb3}')}
                                    >수정</a>
                                    <a href="#" className="btnGray"
                                       // onClick="deleteMyCompanion('{ad678099-4277-4d20-9343-e0a187d41eb3}')"
                                       onClick={() => deleteMyCompanion('{ad678099-4277-4d20-9343-e0a187d41eb3}')}
                                    >삭제</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                <div id="C4_b" className="full-layer">
                    <div className="popWrap">
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1>여행자 등록 및 수정</h1>
                                <a href="#" className="btnClose full-pop-close"
                                   // onClick="putNewCompanion(false)"
                                   // onClick={() => putNewCompanion(false)}
                                   onClick={() => closeCompanionArea()}
                                >닫기</a>
                            </div>
                        </div>
                        <div className="pop-cont">
                            <section>
                                <div className="box">
                                    <div className="info_form" id="companionInfo" data1="">
                                        <div className="flexWrap">
                                            <div className="flexCont">
                                                <dl className="inputArea">
                                                    <dt><i className="err bgiNone">*</i> 한글 성</dt>
                                                    <dd>
                                                        <input type="text" id="kor_name_last" data1="true"
                                                           className="mgt_10" placeholder="예)홍"
                                                           // onChange="checkStringValue(this)"
                                                           onChange={(event) => checkStringValue(event.currentTarget)}
                                                           autoComplete="off"
                                                        />
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div className="flexCont mgl_5">
                                                <dl className="inputArea">
                                                    <dt><i className="err bgiNone">*</i> 한글 이름</dt>
                                                    <dd>
                                                        <input type="text" id="kor_name_first" data1="true"
                                                           className="mgt_10" placeholder="예)길동"
                                                           // onChange="checkStringValue(this)"
                                                           onChange={(event) => checkStringValue(event.currentTarget)}
                                                           autoComplete="off"
                                                        />
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="flexWrap">
                                            <div className="flexCont">
                                                <dl className="inputArea">
                                                    <dt><i className="err bgiNone">*</i> 영문 성</dt>
                                                    <dd>
                                                        <input type="text" id="eng_name_last" data1="false"
                                                           className="mgt_10" placeholder="예)HONG"
                                                           // onChange="checkStringValue(this)"
                                                           onChange={(event) => checkStringValue(event.currentTarget)}
                                                           autoComplete="off"
                                                        />
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div className="flexCont mgl_5">
                                                <dl className="inputArea">
                                                    <dt><i className="err bgiNone">*</i> 영문 이름</dt>
                                                    <dd>
                                                        <input type="text" id="eng_name_first" data1="false"
                                                           className="mgt_10" placeholder="예)GILDONG"
                                                           // onChange="checkStringValue(this)"
                                                           onChange={(event) => checkStringValue(event.currentTarget)}
                                                           autoComplete="off"
                                                        />
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <dl className="inputArea">
                                            <dt><i className="err bgiNone">*</i> 생년월일</dt>
                                            <dd>
                                                <input type="text" className="mgt_10" id="birthday"
                                                       placeholder="예)1996-06-21"
                                                       autoComplete="off"
                                                />
                                            </dd>
                                            <dt><i className="err bgiNone">*</i> 성별</dt>
                                            <dd>
                                                <a href="#" data1="1" id="male" className="inpax on"
                                                   // onClick="changeGenderType(this)"
                                                   onClick={(event) => changeGenderType(event.currentTarget)}
                                                >남성</a>
                                                <a href="#" data1="2" id="female" className="inpax"
                                                   // onClick="changeGenderType(this)"
                                                   onClick={(event) => changeGenderType(event.currentTarget)}
                                                >여성</a>
                                            </dd>
                                            <dt>국적</dt>
                                            <dd>
                                                <div className="mgt_10">
                                                    <select id="nationalType" defaultValue={"대한민국"}>
                                                        <option value="미국">미국</option>
                                                        <option value="호주">호주</option>
                                                        <option value="대한민국">대한민국</option>
                                                        <option value="일본">일본</option>
                                                        <option value="중국">중국</option>
                                                    </select>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>

                                    <div className="btnArea">
                                        <a href="#none" className="lbtn btn-large filled mgt_30 mgb_20 "
                                           style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                                           // onClick="putNewCompanion()"
                                           onClick={() => putNewCompanion()}
                                        >확인</a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default App;