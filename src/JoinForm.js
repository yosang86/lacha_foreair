import {useRef} from "react";
import $ from 'jquery';
import * as common from "./js/common";
import * as find from "./js/find";
import * as pcert from "./js/phoneCert";
import DaumPostcodeEmbed from "react-daum-postcode";
import './css/Postcode.css';
import Footer from "./Footer";

export default App;

function App() {
    const currentScroll = useRef();

    const controller = new common.controller();

    // 카카오 우편번호 검색창 열기
    const openPostcode = (e) => {
        var $open_btn = $(e.currentTarget);
        var $el = $("#addr-layer");
        $el.css("z-index", "102");

        $("body").append($("<div id='dimmd-layer'></div>"));
        $el.attr("tabindex", "0").fadeIn().focus();

        $el.find('.full-pop-close').click(function(){
            $("#dimmd-layer").remove();
            $el.fadeOut().removeAttr("tabindex");
            $el.css("z-index", "20");
            $open_btn.focus();
            return false;
        });

        e.preventDefault();

        // 현재 scroll 위치를 저장해놓는다.
        // var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        currentScroll.current = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        console.log(currentScroll.current);

        // element_wrap.style.display = 'block';
        document.getElementById("addr-layer").style.display = 'block';
    }

    // 주소 및 우편번호 입력 후 검색창 닫기
    const handleComplete = (data) => {
        var $open_btn = $(".search-zipcode");
        var $el = $("#addr-layer");
        $("#dimmd-layer").remove();
        $el.fadeOut().removeAttr("tabindex");
        $open_btn.focus();
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ''; // 도로명 조합형 주소 변수

        // 법정동명이 있을 경우 추가한다.
        if(data.bname !== ''){
            extraRoadAddr += data.bname;
        }
        // 건물명이 있을 경우 추가한다.
        if(data.buildingName !== ''){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
        if(fullRoadAddr !== ''){
            fullRoadAddr += extraRoadAddr;
        }else{
        //도로명 주소가 없는 경우 지번 주소로 대체한다.
        fullRoadAddr =  data.jibunAddress;
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        //document.getElementById("sample4_postcode1").value = data.postcode1;
        //document.getElementById("sample4_postcode2").value = data.postcode2;
        //document.getElementById("sample4_roadAddress").value = fullRoadAddr;
        //document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

        //6자리 우편번호
        //$("#"+post1_id).val(data.postcode1);
        //$("#"+post2_id).val(data.postcode2);

        //$("#"+post_id).val(data.zonecode); //5자리 새우편번호 사용

        //6자리 우편번호 없으면 5자리 우편번호로
        if(data.postcode1 =='' & data.postcode2=='') {
        $("#postNo").val(data.zonecode);
        } else {
        $("#postNo").val(data.postcode1 + data.postcode2);
        }

        $("#postAddr").val(fullRoadAddr);
        $("#postAddrDtl").focus();

        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        /* if(data.autoRoadAddress) {
            //예상되는 도로명 주소에 조합형 주소를 추가한다.
            var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            document.getElementById("guide").innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

        } else if(data.autoJibunAddress) {
            var expJibunAddr = data.autoJibunAddress;
            document.getElementById("guide").innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

        } else {
            document.getElementById("guide").innerHTML = '';
        } */


        // iframe을 넣은 element를 안보이게 한다.
        // element_wrap.style.display = 'none';
        document.getElementById("addr-layer").style.display = 'none';

        // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
        document.body.scrollTop = currentScroll.current;
    };

    var browser = document.getElementsByTagName('html')[0].className;
    var numReg = /^(?=.*[0-9])/;
    var alphabetReg = /^(?=.*[a-zA-Z])/;
    var specialReg = /^(?=.*[!@#$%^*+=_])/;
    var korReg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    var korEngReg = /[가-힝a-zA-Z]/g;

    const doCheckAll = () => {
        if($("#allCheck").prop("checked")) {
            $("input:checkbox").prop("checked",true);
            $("input[name=agrYn]").val("Y");
        } else {
            $("input:checkbox").prop("checked",false);
            $("input[name=agrYn]").val("N");
        }

        doCheck();
    }
    // 동의 체크
    const doSelectCheckTerm = (obj) => {
        if($(obj).prop("checked")) {
            $(obj).closest("div").find("#agrYn").val("Y");
        } else {
            $(obj).closest("div").find("#agrYn").val("N");
        }

        doCheck();
    }
    // 선택동의 체크
    const doSelectCheck = (obj, id) => {
        if($(obj).prop("checked")) {
            $("#"+id).closest("div").find("input:checkbox").prop("checked",true);
            $(obj).closest("div").find("#agrYn").val("Y");
        } else {
            $("#"+id).closest("div").find("input:checkbox").prop("checked",false);
            $(obj).closest("div").find("#agrYn").val("N");
        }

        $(obj).closest("div").addClass("active");
        $(obj).closest("div").parent().closest("div").find(".reception").show();
    }
    const doToggleReception = (obj) => {
        $(obj).closest("div").toggleClass("active");
        if ($(obj).closest("div").hasClass("active")) {
            $(obj).closest("div").siblings(".reception").show();
        }
        else {
            $(obj).closest("div").siblings(".reception").hide();
        }
    }
    const doCheck = () => {
        var checkflag = false;
        // <c:forEach var="row" items="${termList}" varStatus="i">
        //     <c:if test="${row.agrTpCd eq '01'}">
        //         if(!$("#termsCheck_<c:out value="${row.termAplyNo}" /><c:out value="${row.termNo}" />").is(":checked")) {
        //         checkflag = false;
        //     }
        //     </c:if>
        // </c:forEach>

        if ($("#termsCheck_21").is(":checked") && $("#termsCheck_23").is(":checked")) checkflag = true;

        if(checkflag) {
            $("#agreeConfirm").removeClass("disable");
            $("#agreeConfirm").addClass("filled-g");
        } else {
            $("#agreeConfirm").addClass("disable");
            $("#agreeConfirm").removeClass("filled-g");
        }
    }
    const doTermLayer = (obj, id) => {
        if($("#"+id).length == 0) {
            $("#content").append($(".full-layer").eq(0).clone().attr("id", id));
            $("#"+id).closest("div").find(".pop-name").html($(obj).closest("div").find("#termTit").val());
            $("#"+id).closest("div").find(".termTxt").html($(obj).closest("div").find("#termCont").val());
        }

        pcert.cmnFullLayerPopup(obj, id);
    }
    const doCheckAgrYn = (obj) => {
        var $el = $(obj);
        if($el.closest("div").find('input:checkbox:checked').length == 0) {
            $el.closest("div").parent().siblings("div").find("input:checkbox[name=termCheck]").prop("checked", false);
        } else {
            $el.closest("div").parent().siblings("div").find("input:checkbox[name=termCheck]").prop("checked", true);
        }
    }
    // const cmnFullLayerPopup = (element, targetId) => {
    //     var $open_btn = $(element);
    //     var $el = $("#" + targetId);
    //
    //     $("body").append($("<div id='dimmd-layer'></div>"));
    //     $el.attr("tabindex", "0").fadeIn().focus();
    //     $el.css("z-index", "101");
    //
    //     $el.find('.full-pop-close').click(function(){
    //         $("#dimmd-layer").remove();
    //         $el.fadeOut().removeAttr("tabindex");
    //         $el.css("z-index", "20");
    //         $open_btn.focus();
    //         return false;
    //     });
    // };

    // const cmnAlertLayer = (targetId, msg, callback) => {
    //     // var $open_btn = $("#" + targetId);
    //     var $open_btn = targetId != "" ? $("#" + targetId) : "";
    //
    //     $("input").each(function() {
    //         var $element = $(this);
    //         if ($element.attr("readonly") != 'readonly') {
    //             $element.attr("readonly", true);
    //             $element.addClass("LAYER");
    //         }
    //     });
    //
    //     var html = [];
    //
    //     html.push("<div id='" + targetId + "_layer' class='alert-box'>");
    //     html.push("<div class='popWrap'>");
    //     html.push("<div class='alert-cont'>");
    //     html.push(msg);
    //     html.push("</div>");
    //     html.push("<div class='btnArea mgt_20'>");
    //     html.push("<a href='#none' class='lbtn btn-m filled alert-close' style='background: #466cc2; border:1px solid #466cc2'>확인</a>");
    //     html.push("</div>");
    //     html.push("</div>");
    //     html.push("</div>");
    //     $("body").append(html.join(""));
    //
    //     var $el = $("#" + targetId + "_layer");
    //     $("body").append($("<div id='dimmd-layer'></div>"));
    //     $el.attr("tabindex", "0").fadeIn().focus();
    //
    //     var $elWidth = $el.outerWidth(),
    //         $elHeight = $el.outerHeight(),
    //         docWidth = $(document).width(),
    //         docHeight = $(document).height();
    //
    //     if ($elHeight < docHeight || $elWidth < docWidth) {
    //         $el.css({
    //             marginTop: -$elHeight /2,
    //             marginLeft: -$elWidth/2
    //         })
    //     } else {
    //         $el.css({top: 0, left: 0});
    //     }
    //
    //     $el.find('.alert-close').click(function(){
    //         $("#dimmd-layer").remove();
    //         $(".alert-box").remove();
    //         $(".LAYER").attr("readonly", false);
    //         $(".LAYER").removeClass("LAYER");
    //         $el.fadeOut().removeAttr("tabindex");
    //         // $open_btn.focus();
    //         if ($open_btn != "") {
    //             $open_btn.focus();
    //         }
    //         if(typeof callback != 'undefined' && callback != null) {
    //             callback();
    //         }
    //
    //         return false;
    //     });
    // };

    // 아이디 유효성 체크
    const checkId = () => {
        if($("#idChk").attr("disabled") == "disabled") {
            return;
        }

        var loginId = $("#loginId").val();

        if(loginId == "") {
            common.cmnAlertLayer('loginId','아이디를 입력하세요.');
            return;
        }

        if(loginId.length < 5) {
            common.cmnAlertLayer('loginId','아이디는 5자리이상 입니다.');
            return;
        }

        $.ajax({
            url : '/join/IdOverlapCheck.json',
            data : $("#memberForm").serialize(),
            dataType : 'json',
            type : 'post',
            isBlock : true,
            isOverLap : true,
            successCall:function(jsonObj) {
            // success : function(jsonObj) {
                var passYn = controller.nvl(jsonObj.passYn,"");

                if(passYn != "Y"){
                // if(jsonObj.passYn != "Y"){
                    common.cmnAlertLayer('loginId','이미 사용중인 아이디입니다.');

                    $("#loginId").addClass("err-input");
                    $("#loginId").focus();
                    $("#idChkYn").val("N");
                    return;
                } else {
                    // 성공
                    common.cmnAlertLayer('','사용 가능한 아이디입니다.');

                    $("#loginId").closest("p").find("em").show();
                    $("#idValid").hide();
                    $("#loginId").removeClass("err-input");
                    $("#idChkYn").val("Y");
                }
            },
            error:function(data) {
                common.cmnAlertLayer('','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                $("#idChkYn").val("N");
            }
        });
    }
    const resetCheckId = () => {
        $("#id_text").text("");
        $("#id_text").removeClass();
        $("#idChkYn").val("N");
    }

    // 회원가입
    // var saveFlag = true;
    var saveFlag = useRef(true);
    const join = () => {
        if(saveFlag) {
            var mbrNm = $("#mbrNm").val();
            var loginId = $("#loginId").val();
            var loginIdClass = $("#loginId").attr("class");
            var idChkYn = $("#idChkYn").val();
            var passwd = $("#passwd").val();
            var passwdClass = $("#passwd").attr("class");
            var passwdChk = $("#passwdChk").val();
            var postNo = $("#postNo").val();
            var postAddr = $("#postAddr").val();
            var postAddrDtl = $("#postAddrDtl").val();
            var mbrPositSctCd = $("input:radio[name=mbrPositSctCdRadio]:checked").val();
            var certYn = $("#certYn").val();
            var cellNo = $("#cellNo").val();

            var email1 		= $('#email1').val();
            var email1Class = $("#email1").attr("class");
            var emailAddr 	= $('#emailAddr option:checked').text();
            var emailVal 	= $('#emailAddr option:checked').val();

            // 이메일
            var email = email1 + "@" + emailAddr;
            if(emailVal == '80') {
                var emailInput = $('#emailInput').val();
                email = email1 + '@' + emailInput;
            }

            $("#email").val(email);

            if(!korEngReg.test(mbrNm)) {
                common.cmnAlertLayer('mbrNm','이름은 한글, 영문만 가능합니다.');
                return;
            }

            if (mbrNm == "") {
                common.cmnAlertLayer('mbrNm','이름을 입력해주세요.');
                return;
            }

            if (loginId == "" && passwd == "") {
                common.cmnAlertLayer('loginId','아이디또는 비밀번호가 입력되지 않았습니다.');
                return;
            }

            if (loginId == "") {
                common.cmnAlertLayer('loginId','아이디를 입력해주세요.');
                return;
            }

            if (idChkYn == "N") {
                common.cmnAlertLayer('loginId','아이디 중복조회를 진행해주세요.');
                return;
            }

            if (passwd == "") {
                common.cmnAlertLayer('passwd','비밀번호는 필수 입력 사항입니다.');
                return;
            }

            if (passwdClass.search("is-valid") == -1) {
                common.cmnAlertLayer('passwd','영문/숫자/특수문자를 조합하여 8~20자 이내로 입력해주세요.');
                return;
            }

            if (passwdChk == "") {
                common.cmnAlertLayer('passwdChk','비밀번호 확인을 입력해주세요.');
                return;
            }

            if (passwd != passwdChk) {
                common.cmnAlertLayer('passwdChk','비밀번호와 일치하지 않습니다.');
                return;
            }

            if (email1 == "") {
                common.cmnAlertLayer('email1','이메일 아이디를 입력해주세요.');
                return;
            }

            if (emailVal == "") {
                common.cmnAlertLayer('emailVal','이메일을 주소를 선택하세요.');
                return;
            } else {
                if(emailVal == "80" && $('#emailInput').val() == "") {
                    common.cmnAlertLayer('emailInput','이메일을 주소를 입력해주세요.');
                    return;
                }
            }

            if (find.emailValidate(email)) {
                common.cmnAlertLayer('email1','올바른 이메일 주소를 입력해주세요.');
                return;
            }

            if (cellNo == "") {
                common.cmnAlertLayer('cellNo','휴대폰번호를 입력해주세요.');
                return;
            }

            if (cellNo.length < 10) {
                common.cmnAlertLayer('cellNo','휴대폰번호를 정확하게 입력해주세요.');
                return;
            }

            var regExpCellNo = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
            if(!regExpCellNo.test(cellNo)) {
                common.cmnAlertLayer('cellNo','유효한 핸드폰 번호가 아닙니다. 다시 입력해주세요.');
                return;
            }

            if(certYn == "N") {
                common.cmnAlertLayer('cellNo','휴대폰인증이 필요합니다.');
                return;
            }

            if (postNo == "") {
                common.cmnAlertLayer('postNo','주소는 필수 입력 사항입니다.');
                return;
            }

            if (postAddr == "") {
                common.cmnAlertLayer('postAddr','주소는 필수 입력 사항입니다.');
                return;
            }

            if (postAddrDtl == "") {
                common.cmnAlertLayer('postAddrDtl','주소는 필수 입력 사항입니다.');
                return;
            }

            // 우편번호
            $("input[name=postNo]").val(postNo);
            $("input[name=postAddr]").val(postAddr);

            // saveFlag = false;
            saveFlag.current = false;

            $.ajax({
                url : '/join/SignUpInsert.json',
                data : $("#memberForm").serialize(),
                dataType : 'json',
                type : 'post',
                isBlock : true,
                isOverLap : true,
                success:function(jsonObj) {
                    var resultCode = jsonObj.resultCode;
                    if (resultCode == "0000") {
                        // window.location.href = "/join/JoinComplete.do";
                        window.location.href = "/joinComplete";
                        // saveFlag = true;
                        saveFlag.current = true;
                    } else if (resultCode == "0001") {
                        common.cmnAlertLayer('passwd','비밀번호를 다시 확인해 주십시요.');
                        return;
                    } else if (resultCode == "0002") {
                        common.cmnAlertLayer('passwd','비밀번호는 영문,숫자 특수문자 3종류를 조합하여 8~20자리로 구성할 수 있습니다. 비밀번호를 확인해주세요.');
                        return;
                    } else if (resultCode == "0003") {
                        common.cmnAlertLayer('','죄송합니다. 잠시후에 다시 시도해 주십시요.');
                        return;
                    } else if (resultCode == "0004") {
                        common.cmnAlertLayer('','이미 등록된 아이디입니다.');
                        return;
                    } else if (resultCode == "0005") {
                        common.cmnAlertLayer('','구독 회원이 아닙니다.');
                        return;
                    } else {
                        common.cmnAlertLayer('','죄송합니다. 잠시후에 다시 시도해 주십시요.');
                        window.location.reload();
                    }
                },
                error:function(data) {
                    common.cmnAlertLayer('','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                    return false;
                }
            });
        } else {
            common.cmnAlertLayer('','처리중입니다.');
            return false;
        }
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a // href="javascript:void(0);"
                        // onClick="doHistoryBack();"
                        onClick={() => find.doHistoryBack()}
                        className="btnPrev">이전</a>
                    <h1>회원가입</h1>
                </div>
            </div>

            <div id="content">
                <form method="post" name="memberForm" id="memberForm">
                    <input type="hidden" name="email" id="email"/>
                    <input type="hidden" name="mbrPositSctCd" id="mbrPositSctCd"/>
                    <input type="hidden" name="bdNm" id="bdNm"/>
                    <input type="hidden" name="certYn" id="certYn" value="N"/>
                    <input type="hidden" name="certType" id="certType" value=""/>
                    <input type="hidden" name="personYn" id="personYn" value=""/>
                    <input type="hidden" name="smsReceptionYn" id="smsReceptionYn" value=""/>
                    <input type="hidden" name="emailReceptionYn" id="emailReceptionYn" value=""/>
                    <input type="hidden" name="kakaoReceptionYn" id="kakaoReceptionYn" value=""/>
                    <input type="hidden" name="mbrSctCd" id="mbrSctCd" value=""/>
                    <input type="hidden" name="bday" id="bday" value=""/>
                    <input type="hidden" name="resultCode" id="resultCode" value="0000"/>
                    <input type="hidden" name="kakaoSSO" id="kakaoSSO" value=""/>
                    <input type="hidden" name="naverSSO" id="naverSSO" value=""/>
                    <input type="hidden" name="svcMgmtNum" id="svcMgmtNum" value=""/>
                    <input type="hidden" name="mngMailAgrYn" id="mngMailAgrYn" value="Y"/>
                    <input type="hidden" name="mngSmsAgrYn" id="mngSmsAgrYn" value="Y"/>
                    <input type="hidden" name="mngAltalkAgrYn" id="mngAltalkAgrYn" value="Y"/>
                    <input type="hidden" name="mngPushAgrYn" id="mngPushAgrYn" value="Y"/>
                    <input type="hidden" name="mngPostAgrYn" id="mngPostAgrYn" value="Y"/>
                    <input type="hidden" name="fvrEmailAgrYn" id="fvrEmailAgrYn" value="Y"/>
                    <input type="hidden" name="fvrAltalkAgrYn" id="fvrAltalkAgrYn" value="Y"/>
                    <input type="hidden" name="fvrPushAgrYn" id="fvrPushAgrYn" value="Y"/>
                    <input type="hidden" name="fvrSmsAgrYn" id="fvrSmsAgrYn" value="Y"/>
                    <input type="hidden" name="fvrPostAgrYn" id="fvrPostAgrYn" value="Y"/>
                    <input type="hidden" name="agrInfo" id="agrInfo" value="[{&quot;termNo&quot;:&quot;1&quot;,&quot;termAplyNo&quot;:&quot;2&quot;,&quot;agrYn&quot;:&quot;Y&quot;},{&quot;termNo&quot;:&quot;3&quot;,&quot;termAplyNo&quot;:&quot;2&quot;,&quot;agrYn&quot;:&quot;Y&quot;},{&quot;termNo&quot;:&quot;999998&quot;,&quot;agrYn&quot;:&quot;Y&quot;},{&quot;termNo&quot;:&quot;999999&quot;,&quot;agrYn&quot;:&quot;Y&quot;}]"/>
                    <input type="hidden" name="mobileCI" id="mobileCI"/>

                    <div id="content">
                        <section>
                            <div className="box2">
                                <div className="stepFixed">
                                    <div className="stepBox">
                                        <ol className="stepList">
                                            <li>
                                                <div className="step01"></div>
                                                <em>약관동의</em>
                                            </li>
                                            <li>
                                                <div className="step02 on"></div>
                                                <em>정보입력</em>
                                            </li>
                                            <li>
                                                <div className="step03"></div>
                                                <em>가입완료</em>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="info_form mgt_80">
                                    <dl className="inputArea">
                                        <dt>이름 <span className="ess bgRed">필수</span></dt>
                                        <dd>
                                            <input type="text" name="mbrNm" id="mbrNm" maxLength="15" className="mgt_10" readOnly="readonly" placeholder="본인인증 후 자동입력"/>
                                        </dd>
                                        <input type="hidden" name="idChkYn" id="idChkYn" value="N"/>
                                        <dt>아이디 <span className="ess bgRed">필수</span></dt>
                                        <dd>
                                            <p className="input_inline">
                                                <input type="text" name="loginId" id="loginId" maxLength="50" className="mgt_10 mgr_5 onlyNumEngSp" placeholder="5~50자 영문소문자/숫자 조합/특수문자"
                                                    autoComplete="off"
                                                    onChange={() => resetCheckId()}
                                                />
                                                <a
                                                    // href="javascript:void(0);"
                                                   id="idChk" className="mbtn mgt_10 lbtn filled btn-large "
                                                    style={{background: "#466cc2", border: "1px solid #466cc2",}}
                                                    onClick={() => checkId()}
                                                >중복조회</a>
                                                <em className="success rgt" style={{display: "none"}}>정상입력</em>
                                            </p>
                                            <p className="err" id="idValid" style={{display: "none"}}>
                                                <i></i>
                                            </p>
                                        </dd>
                                        <dt>비밀번호 <span className="ess bgRed">필수</span></dt>
                                        <dd>
                                            <input type="password" name="passwd" id="passwd" maxLength="20" className="mgt_10" placeholder="8자~20자 영문/숫자/특수문자 조합"/>
                                            <em className="success" style={{display: "none"}}>정상입력</em>
                                            <p className="err" id="pwValid" style={{display: "none"}}>
                                                <i></i>
                                            </p>
                                        </dd>
                                        <dt>비밀번호재입력 <span className="ess bgRed">필수</span></dt>
                                        <dd>
                                            <input type="password" name="passwdChk" id="passwdChk" maxLength="20" className="mgt_10"/>
                                            <em className="success" style={{display: "none"}}>정상입력</em>
                                            <p className="err" id="pwChkValid" style={{display: "none"}}>
                                                <i></i>
                                            </p>
                                        </dd>
                                        <dt>이메일 <span className="ess bgRed">필수</span></dt>
                                        <dd>
                                            <p className="input_inline">
                                                <span className="w100 mgt_10 vam">
                                                    <span className="input_email">
                                                        <input type="text" name="email1" id="email1" autoComplete="off"/>
                                                    </span>
                                                    @
                                                    <span className="input_email" style={{display: "none"}}>
                                                        <input type="text" name="emailInput" id="emailInput"/>
                                                    </span>
                                                    <span className="input_email">
                                                        <select id="emailAddr" name="emailAddr"
                                                            onChange={(e) => find.checkEmailType(e.currentTarget)}
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
                                        <dt>휴대폰번호 <span className="ess bgRed">필수</span></dt>
                                        <dd>
                                            <p className="input_inline">
                                                <input type="text" name="cellNo" id="cellNo" className="mgt_10 mgr_5 onlyNum" maxLength="11" placeholder="숫자만 입력"
                                                    autoComplete="off"/>
                                                <a
                                                    // href="javascript:void(0);"
                                                   className="mbtn mgt_10 lbtn filled btn-large " style={{background: "#466cc2", border: "1px solid #466cc2",}}
                                                    // onClick="callKmcert(this);"
                                                    onClick={(e) => pcert.callKmcert(e.currentTarget)}
                                                >본인인증</a>
                                            </p>
                                        </dd>
                                        <dt>배송주소 <span className="ess bgRed">필수</span>
                                            <span className="check schk">
			            			            <input type="checkbox" id="check03"/>
                                                <label htmlFor="check03">기본주소로 설정</label>
			            		            </span>
                                        </dt>

                                        {/*우편번호 api 스크립트*/}
                                        <div id="addr-layer" className="full-layer">
                                            <div className="popWrap">
                                                <div className="pop-header">
                                                    <div className="pop-tit center">
                                                        <h1 className="pop-name">주소검색</h1>
                                                        <a href="#" className="btnClose full-pop-close"
                                                            onClick={() => {document.getElementById("addr-layer").style.display = "";}}
                                                        >닫기</a>
                                                    </div>
                                                </div>
                                                <div className="pop-cont" style={{paddingTop: "12px"}}>
                                                    <div id="zipcode-wrap"
                                                        style={{borderBottom: "solid 1px #ccc", width: "100%",
                                                            height: "100%", position: "relative", left: 0, top: 0, zIndex: 9999,}}
                                                    >
                                                        <DaumPostcodeEmbed
                                                            autoClose={false}
                                                            onComplete={handleComplete}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <dd>
                                            <p className="input_inline">
                                                <a // href="javascript:void(0);"
                                                   className="mbtn mgt_10 lbtn filled btn-large mgr_5 search-zipcode"
                                                   style={{background: "#466cc2", border: "1px solid #466cc2"}}
                                                   data-post_id="postNo" data-addr1_id="postAddr" data-addr2_id="postAddrDtl"
                                                   onClick={(e) => openPostcode(e)}
                                                >주소검색</a>
                                                <input type="text" name="postNo" id="postNo" className="mgt_10" readOnly="readonly"/>
                                            </p>
                                            <input type="text" name="postAddr" id="postAddr" className="mgt_10" readOnly="readonly"/>
                                            <input type="text" name="postAddrDtl" id="postAddrDtl" maxLength="120" className="mgt_10" placeholder="상세 주소 입력" autoComplete="off"/>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </section>

                        {/*추후 현금영수증 발행연동시 주석 해제 및 저장*/}
                        <section>
                            <div className="box">
                                <div className="btnArea mgt_30">
                                    {/*<a href="#none" class="lbtn disable btn-large">가입하기</a>  비활성화*/}
                                    <a
                                        // href="javascript:void(0);"
                                       id="joinBtn" className="lbtn btn-large filled" style={{background: "#466cc2", border: "1px solid #466cc2",}}
                                        onClick={() => join()}
                                    >가입하기</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </form>

                <form id="formKmcert" name="formKmcert" method="post" target="kmcert">
                    <input type="hidden" name="urlCode" id="urlCode"/>
                    <input type="hidden" name="dbCheckType" id="dbCheckType"/>
                    <input type="hidden" name="cscoNo" id="cscoNo" value="2001"/>

                    <div className="full-layer default-layer" id="kmcertLayer">
                        <div className="popWrap">
                            <div className="pop-header">
                                <div className="pop-tit">
                                    <h1 className="pop-name">휴대폰인증</h1>
                                    <a
                                        // href="javascript:void(0);"
                                       className="btnClose full-pop-close">닫기</a>
                                </div>
                            </div>

                            <div className="pop-cont">
                            </div>

                        </div>
                    </div>
                </form>
            </div>

            <Footer/>
        </>
    )
}
