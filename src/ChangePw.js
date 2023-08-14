import $ from 'jquery';
import {useEffect, useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
// import * as common from "./js/find";

function App() {
    useEffect(() => {
        // 비밀번호 사용가능 여부
        $("#changePwdFst").on({
            "keyup" : function() {
                var pwd = $("#changePwdFst").val();
                var pwdPassChk = true;

                pwdPassChk = regExpPwdCheck1($("#changePwdFst"));

                // 결과표시
                $("#changePwdFst").removeClass("is-valid is-invalid");
                if (pwdPassChk) {
                    $("#changePwdFst").addClass("is-valid");

                    $("#changePwdFst").closest("dd").find("em").show();
                    $("#pwValid").hide();
                }else {
                    $("#changePwdFst").addClass("is-invalid");

                    $("#changePwdFst").closest("dd").find("em").hide();
                    $("#pwValid").show();
                }

                $("#changePwdScd").val("");
            },
            "focusout" : function() {
                var pwdPassChk = true;

                pwdPassChk = regExpPwdCheck1($("#changePwdFst"));

                // 결과표시
                $("#changePwdFst").removeClass("is-valid is-invalid");
                if (pwdPassChk) {
                    $("#changePwdFst").addClass("is-valid");

                    $("#changePwdFst").closest("dd").find("em").show();
                    $("#pwValid").hide();
                }else {
                    $("#changePwdFst").addClass("is-invalid");

                    $("#changePwdFst").closest("dd").find("em").hide();
                    $("#pwValid").show();
                }

                $("#changePwdScd").val("");
            }
        });

        // 비밀번호 동일 확인
        $("#changePwdScd").on({
            "keyup" : function() {
                var pwd = $("#passwd").val();
                var pwdChk = $("#changePwdScd").val();

                $("#changePwdScd").removeClass("is-valid is-invalid");
                if (pwd == pwdChk) {
                    $("#changePwdScd").addClass("is-valid");

                    $("#changePwdScd").closest("dd").find("em").show();
                    $("#pwChkValid").hide();
                }else {
                    $("#changePwdScd").addClass("is-invalid");

                    $("#changePwdScd").closest("dd").find("em").hide();
                    $("#pwChkValid").show();
                    $("#pwChkValid").text("비밀번호와 일치하지 않습니다.");
                }
            },
            "focusout" : function() {
                var pwd = $("#changePwdFst").val();
                var pwdChk = $("#changePwdScd").val();

                // 파이어폭스 한글 keyup이벤트 불가 처리(다른 브라우저도 그러면 브라우저 체크 삭제해서 조건없이 실행)
                $("#changePwdScd").removeClass("is-valid is-invalid");
                if (pwd == pwdChk) {
                    $("#changePwdScd").addClass("is-valid");

                    $("#changePwdScd").closest("dd").find("em").show();
                    $("#pwChkValid").hide();
                }else {
                    $("#changePwdScd").addClass("is-invalid");

                    $("#changePwdScd").closest("dd").find("em").hide();
                    $("#pwChkValid").show();
                    $("#pwChkValid").text("비밀번호와 일치하지 않습니다.");
                }
            }
        });
    }, [])

    // 기존 비밀번호 및 새 비밀번호 확인
    function passwordChange() {
        var passwd = $("#passwd").val();
        var changePwdFst = $("#changePwdFst").val();
        var pwdFstClass = $("#changePwdFst").attr("class");
        var changePwdScd = $("#changePwdScd").val();

        if (passwd == "") {
            common.cmnAlertLayer('btn1',"비밀번호는 필수 입력 사항입니다.");
            $("#passwd").focus();
            return;
        }

        if (changePwdFst == "") {
            common.cmnAlertLayer('btn1',"새 비밀번호는 필수 입력 사항입니다.");
            $("#changePwdFst").focus();
            return;
        }

        if (pwdFstClass.search("is-valid") == -1) {
            common.cmnAlertLayer('btn1',"영문/숫자/특수문자(~!@#$%^&*)만 조합하여 8~20자 이내로 입력해주세요.");
            $("#changePwdFst").focus();
            return;
        }

        if (changePwdScd == "") {
            common.cmnAlertLayer('btn1',"비밀번호 확인을 입력해주세요.");
            $("#changePwdScd").focus();
            return;
        }

        if (changePwdFst != changePwdScd) {
            common.cmnAlertLayer('btn1',"새 비밀번호와 일치하지 않습니다.");
            $("#changePwdScd").focus();
            return;
        }

        // var param = $("#passwordForm").serializeJson();
        var param = $("#passwordForm").serialize();

        $.ajax({
            url : '/mypage/s_PasswordChange.do',
            data : param,
            dataType : 'json',
            type : 'post',
            success:function(data) {
                var status = data.retCode;

                if(status == '0000') {
                    pageMove();
                } else {
                    common.cmnAlertLayer('btn1','실패 하였습니다.');
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    // 비밀번호 변경
    function pageMove() {
        $('#passwordForm').submit();
    }

    // 비밀번호 유효성 체크
    function regExpPwdCheck1(element) {
        var textVal = $(element).val();
        var textArray = textVal.split("");
        var numCnt = 0;

        // 길이
        if (textArray.length < 8 || textArray.length > 20) {
            $("#pwValid").text("8자이상 ~ 20자 이하의 비밀번호를 입력해주세요.");
            return false;
        }

        var regexNo = /(\w)\1\1/;
        if (!regexNo.test(textVal)) {
            if (!stck(textVal, 3)) {
                $("#pwValid").text("3개이상의 연속된 숫자 혹은 문자가 존재합니다.");
                return false;
            }
        } else {
            $("#pwValid").text("3개이상의 동일문자가 존재합니다.");
            return false;
        }

        for (let i = 0; i < textArray.length; i++) {
            // 스페이스
            if (textArray[i] == ' ' || textArray[i] == null) {
                $("#pwValid").text("띄어쓰기는 입력 될 수 없습니다.");
                $(element).val("");
                return false;
            }

            // 허용문자
            var exp =  /[a-zA-Z0-9]|[ ~!@#$%^&*]/g;
            if( !exp.test(textArray[i])) {
                $("#pwValid").text("대소문자, 숫자, 특수문자입력은 (~!@#$%^&*)만 가능합니다.");
                return false;
                break;
            }
            // 숫자만
            var regex= /^[0-9]/g;
            if( regex.test(textArray[i])) {
                numCnt++;
            }
        }

        if (textArray.length == numCnt) {
            $("#pwValid").text("비밀번호는 숫자로만 입력될 수 없습니다.");
            return false;
        }

        var regexEach = /(?=.*\d{1,50})(?=.*[~!@#$%^&*]{1,50})(?=.*[a-zA-Z]{1,50}).{8,20}$/;

        if (!regexEach.test(textVal)) {
            $("#pwValid").text("영문, 숫자, 특수기호(~!@#$%^&*)조합으로만 입력해야 합니다.");
            return false;
        }

        return true;
    };

    function stck(str, limit) {
        // var o, d, p, n = 0, l = limit == null ? 4 : limit;
        var o = 0, d = 0, p = 0, n = 0, l = limit == null ? 4 : limit;

        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (i > 0 && (p = o - c) > -2 && p < 2 && (n = p == d ? n + 1 : 0) > l - 3)
                return false;
            // d = p, o = c;
            d = p;
            o = c;
        }
        return true;
    }

    return(
        <>
            <div id="header" className="center">
                {/*<div className="header_top center">*/}
                <div className="header_top">
                    <a // href="javascript:void(0);"
                       onClick={() => common.doHistoryBack()} className="btnClose">이전</a>
                    <h1>비밀번호 변경</h1>
                </div>
            </div>

            <div id="content">
                <section>
                    <div className="box2">
                        <form name="passwordForm" id="passwordForm" method="post" action="/mypage/s_MyPageBase.do">
                            <div className="info_form">
                                <input type="hidden" id="loginId" className="mgt_10" value=""/>
                                <dl className="inputArea">
                                    <dt className="mgt_0">기존 비밀번호 입력<span className="ess bgRed">필수</span></dt>
                                    <dd>
                                        <input type="password" name="passwd" id="passwd" maxLength="20"
                                               className="mgt_10" placeholder="8자~20자 영문/숫자/특수문자 조합"/>
                                    </dd>
                                    <dt className="">새 비밀번호 입력<span className="ess bgRed">필수</span></dt>
                                    <dd>
                                        <input type="password" name="changePwdFst" id="changePwdFst"
                                               maxLength="20" className="mgt_10"
                                               placeholder="8자~20자 영문/숫자/특수문자 조합"/>
                                        <em className="success" style={{display: "none"}}>정상입력</em>
                                        <p className="err" id="pwValid" style={{display: "none"}}></p>
                                    </dd>
                                    <dt>새 비밀번호 확인<span className="ess bgRed">필수</span></dt>
                                    <dd>
                                        <input type="password" name="changePwdScd" id="changePwdScd"
                                               maxLength="20" className="mgt_10"/>
                                        <em className="success" style={{display: "none"}}>정상입력</em>
                                        <p className="err" id="pwChkValid" style={{display: "none"}}></p>
                                    </dd>
                                </dl>
                                <a // href="#none"
                                   className="lbtn filled btn-large mgt_30"
                                   style={{background: "#466cc2", border: "1px solid #466cc2"}}
                                   // onClick="passwordChange();"
                                   onClick={() => passwordChange()}
                                >확인</a>
                                <div className="mgt_30">
                                    <p className="rafer-red">재발급 시 주의사항</p>
                                    <ul className="intro-txt">
                                        <li>8자 이상 ~20자 이하의 영문 대소문자와 숫자의 조합을 입력해 주세요.&nbsp;&nbsp;&nbsp;</li>
                                        <li>특수문자는 (~!@#$%^&amp;*-_) 범위에서 입력해 주세요.</li>
                                        <li>3자리 이상의 동일 또는 연속된 문자, 숫자는 입력이 불가합니다.</li>
                                        <li>영문자 대/소문자가 구분됩니다.</li>
                                        <li>띄어쓰기는 허용되지 않습니다.</li>
                                        <li>기존의 비밀번호와 동일하게 사용 가능합니다.</li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
  );
}

export default App;
