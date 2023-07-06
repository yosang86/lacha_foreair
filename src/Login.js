import './css/Login.css';
import $ from 'jquery';
import Footer from "./Footer";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const scrollBottom = () => {
        $("html, body").animate({ scrollTop: $(document).height() }, 500);
    }

    const keypressEvent = (e, element) => {
        if (e.keyCode === 13) {
            const eId = element.getAttribute("id");
            // if (eId === "loginId") {
            //     e.preventDefault();
            //     $("#btnLogin").trigger("click");
            // }
            // else if (eId === "passwd") {
            //     e.preventDefault();
            //     $("#btnLogin").trigger("click");
            // }
            if (eId === "loginId" || eId === "passwd") {
                tryLogin();
            }
        }
    }

    const tryLogin = () => {
        // if ($.trim($("#loginId").val()) == "" && $.trim($("#passwd").val()) == "") {
        //     cmnAlertLayer("loginId", "아이디 또는 비밀번호가 입력되지 않았습니다.");
        //     $("#loginId").focus();
        //     return;
        // }

        if ($.trim($("#loginId").val()) == "") {
            cmnAlertLayer("loginId", "아이디를 입력해주세요");
            $("#loginId").focus();
            return;
        }

        if ($.trim($("#passwd").val()) == "") {
            cmnAlertLayer("passwd", "비밀번호를 입력해주세요");
            $("#passwd").focus();
            return;
        }

        loginProc();
    }

    const loginProc = () => {
        var isClick = false;
        var loginId = $.trim($("#loginId").val());
        var passwd = $.trim($("#passwd").val());
        var cscoNo = $.trim($("#cscoNo").val());
        var returnUrl = $.trim($("#returnUrl").val());

        var loginData = {
            "loginId" : loginId,
            "passwd" : passwd,
            "cscoNo" : cscoNo,
            "returnUrl" : returnUrl
        };

        if(isClick){
            return;
        }
        isClick = true;

        $.ajax({
            url : '/login/s_Login.json',
            data : loginData,
            dataType : 'json',
            type : 'post',
            success: function(result) {
//                 var retCode = result.retCode;
//                 var pwdErrUseYn = result.pwdErrUseYn;
//                 var pwdErrCnt = controller.nvl(result.pwdErrCnt, 0);
//                 var passwdFailCnt = controller.nvl(result.passwdFailCnt, 0);
//                 var returnUrl = controller.nvl(result.returnUrl, "");
//                 var monthChk = controller.nvl(result.monthChk, 0);
//                 var mbrSctCdType = result.mbrSctCdType;
//                 var mbrSctCd = result.mbrSctCd;
//                 var confirmObj = new Object();
//
//                 if(retCode == "0001"){
//                     passwdFailCnt = Number(passwdFailCnt);
//                     if(pwdErrUseYn == "Y" && pwdErrCnt >= passwdFailCnt) {
//                         confirmObj.pwdErrCnt = pwdErrCnt;
//                         checkConfirm('0001', confirmObj);
// //					if(confirm("아이디 또는 비밀번호가 "+pwdErrCnt+"회이상 실패했습니다. 비밀번호 찾기 화면으로 이동하시겠습니까?")){
// //						location.href="/login/LoginPwdSearch.do";
// //					}else{
// //						isClick = false;
// //						return false;
// //					}
//                     } else {
//                         cmnAlertLayer("loginId", "아이디 또는 비밀번호가 일치하지않습니다. 다시 입력해주세요.");
//                         $("#loginId").addClass("is-invalid");
//                         $("#passwd").addClass("is-invalid");
//                         $("#idPwErorrText").show();
//                         $("#loginId").focus();
//                         isClick = false;
//                         return false;
//                     }
//                 }else if(retCode == "0002" || retCode == "0004"){
//                     cmnAlertLayer("loginId", "아이디 또는 비밀번호가 일치하지않습니다.");
//                     $("#loginId").addClass("is-invalid");
//                     $("#passwd").addClass("is-invalid");
//                     $("#idPwErorrText").show();
//
//                     $("#loginId").val("");
//                     $("#passwd").val("");
//                     $("#loginId").focus();
//                     isClick = false;
//                     return false;
//                 }else if(retCode == "0007"){
//                     confirmObj.pwdErrCnt = pwdErrCnt;
//                     checkConfirm('0007', confirmObj);
//                 }else if(retCode == "0008"){
//                     cmnAlertLayer("loginId", "사이트오픈일이 아닙니다.");
//                     isClick = false;
//                     return false;
//                 }else if(retCode == "0009"){
//                     cmnAlertLayer("loginId", "서비스기간이 종료 되었습니다.");
//                     isClick = false;
//                     return false;
//                 }else if(retCode == "0010"){
//                     checkConfirm('0010', confirmObj);
//                 }else if (retCode == "0013") {
//                     cmnAlertLayer("loginId", "탈퇴한 계정입니다.");
//                     isClick = false;
//                     return;
//                 }else if (retCode == "0014") {
//                     location.href = "/main/s_MainView.do";
//                     return;
//                 }else if (retCode == "0015") {
//                     cmnAlertLayer("loginId", "관리자에 의해 잠긴 계정입니다.");
//                     isClick = false;
//                     return;
//                 }else if (retCode == "0016") {
//                     cmnAlertLayer("loginId", "재직중인 계정이 아닙니다.");
//                     isClick = false;
//                     return;
//                 }else if (retCode == "0017") {
//                     cmnAlertLayer("loginId", "구독중인 계정이 아닙니다.<br/>T우주 구독서비스를 신청해 주세요.");
//                     isClick = false;
//                     return;
//                 }else if(retCode == "9999"){
//                     cmnAlertLayer("loginId", "시스템 장애입니다. 잠시후에 다시 시도해 주십시요.");
//                     isClick = false;
//                     return false;
//                 }else if(retCode == "0000"){
//                     // 앱 자동로그인 체크
//                     if(appCall && $("#autoLogin").is(":checked")) {
//                         if(isMobile.Android()){
//                             window.hccApp.saveLoginInfo(loginId, passwd, window.location.hostname);
//                         }else if(isMobile.iOS()){
//                             var message = {
//                                 "loginId": loginId,
//                                 "passwd" : passwd,
//                                 "hostname": window.location.hostname
//                             };
//                             window.webkit.messageHandlers.saveLoginInfo.postMessage(message);
//                         }
//                     }
//
//                     isClick = true;
//                     $("#loginId").removeClass("is-invalid");
//                     $("#passwd").removeClass("is-invalid");
//                     $("#idPwErorrText").hide();
//
//                     if(monthChk == "1"){
//                         var formOption = {
//                             "method" : "get"
//                             , "action" : "/login/NinetyDayPwdChange.do"
//                         };
//
//                         controller.createForm(formOption);
//                         controller.formSubmit();
//                     }else{
//                         if(returnUrl != ""){
//                             location.href = returnUrl;
//                         }else{
//                             location.href = "/main/s_MainView.do";
//                         }
//                     }
//                 }
            },
            error:function(data) {
                //console.log(JSON.stringify(data));
                cmnAlertLayer("loginId", "시스템 장애입니다. 잠시후에 다시 시도해 주십시요.");
                isClick = false;
                return false;
            }
        });
    }

    const cmnAlertLayer = (targetId, msg, callback) => {
        // var $open_btn = $("#" + targetId);
        var $open_btn = targetId != "" ? $("#" + targetId) : "";

        $("input").each(function() {
            var $element = $(this);
            if ($element.attr("readonly") != 'readonly') {
                $element.attr("readonly", true);
                $element.addClass("LAYER");
            }
        });

        var html = [];

        html.push("<div id='" + targetId + "_layer' class='alert-box'>");
        html.push("<div class='popWrap'>");
        html.push("<div class='alert-cont'>");
        html.push(msg);
        html.push("</div>");
        html.push("<div class='btnArea mgt_20'>");
        html.push("<a href='#none' class='lbtn btn-m filled alert-close' style='background: #466cc2; border:1px solid #466cc2'>확인</a>");
        html.push("</div>");
        html.push("</div>");
        html.push("</div>");
        $("body").append(html.join(""));

        var $el = $("#" + targetId + "_layer");
        $("body").append($("<div id='dimmd-layer'></div>"));
        $el.attr("tabindex", "0").fadeIn().focus();

        var $elWidth = $el.outerWidth(),
            $elHeight = $el.outerHeight(),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: -$elHeight /2,
                marginLeft: -$elWidth/2
            })
        } else {
            $el.css({top: 0, left: 0});
        }

        $el.find('.alert-close').click(function(){
            $("#dimmd-layer").remove();
            $(".alert-box").remove();
            $(".LAYER").attr("readonly", false);
            $(".LAYER").removeClass("LAYER");
            $el.fadeOut().removeAttr("tabindex");
            // $open_btn.focus();
            if ($open_btn != "") {
                $open_btn.focus();
            }
            if(typeof callback != 'undefined' && callback != null) {
                callback();
            }

            return false;
        });
    };


    return (
    <>
        <div id="content">
            <section className="mgb_0">
                <div className="login_box">
                    <div className="login_tit">
                        <h2>
                            <img
                                src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/custComp/1658467680751.png"
                                alt="회사명"/>
                        </h2>
                        <p></p>
                    </div>
                    <div className="login_con">
                        <h3 className="tit">라쿠카라차</h3>
                        <div className="login_form">
                            <input type="hidden" name="cscoNo" id="cscoNo" value="2001"/>
                            <input type="hidden" name="returnUrl" id="returnUrl" value=""/>

                            <p className="input">
                                <input type="text" name="loginId" id="loginId" placeholder="아이디를 입력해 주세요." autoComplete="off"
                                    onKeyUp={(e) => keypressEvent(e, e.currentTarget)}
                                />
                            </p>
                            <p>
                                <input type="password" name="passwd" id="passwd" placeholder="비밀번호를 입력해 주세요." autoComplete="off"
                                    onKeyUp={(e) => keypressEvent(e, e.currentTarget)}
                                />
                            </p>
                            <p className="check">
                                <input type="checkbox" name="idSave" id="idSave"/>
                                <label htmlFor="idSave">아이디저장</label>
                                <input type="checkbox" name="autoLogin" id="autoLogin"/>
                                <label htmlFor="autoLogin" style={{display: "none"}}>자동로그인</label>
                            </p>
                            <div className="btnArea">
                                <a // href="javascript:void(0);"
                                   className="lbtn btn-large filled"
                                   style={{background: "#466cc2", border: "1px solid #466cc2",}} id="btnLogin"
                                    onClick={() => tryLogin()}
                                >로그인</a>
                            </div>
                            <div className="btnArea" style={{marginTop: "20px", textAlign: "center",}}>
                                <a href="https://kauth.kakao.com/oauth/authorize?client_id=e86737bb86820f48254d0c630c6b4fe4&amp;redirect_uri=https%3A%2F%2Fhcclab.com%2Fapi%2Fs_kakaoLoginCheck.do&amp;response_type=code&amp;state=2001"><img
                                    style={{width: "150px"}} src="./images/common/btn_kakao_login.png"/></a>
                                <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&amp;client_id=kjDL5xUvvXy6b42CHqwg&amp;state=247127984701204589269840777656545205581&amp;redirect_uri=https%3A%2F%2Fhcclab.com%2Fapi%2Fs_naverLoginCheck.do%3FcscoNo%3D2001"><img
                                    style={{width: "135px"}} src="./images/common/btn_naver_login.png"/></a>
                            </div>

                            <p className="txtBtn">
                                {/*<a href="javascript:void(0);" id="btnIdSearch">아이디 찾기</a>*/}
                                {/*<a href="javascript:void(0);" id="btnPdSearch">비밀번호 찾기</a>*/}
                                {/*<a href="javascript:void(0);" id="btnSJoin">신규회원가입</a>*/}
                                <a href="findId" id="btnIdSearch">아이디 찾기</a>
                                <a href="findPw" id="btnPdSearch">비밀번호 찾기</a>
                                <a href="joinAgree" id="btnSJoin">신규회원가입</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div id="popupArea"></div>
        </div>

        <Footer happytalk={false}/>

    </>
  );
}

export default App;
