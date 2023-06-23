import $ from "jquery";

export var x;
export var key = "";
export var loginId = "";
export const doTab = (element, gbn) => {
    $(element).parent().siblings().removeClass("current");
    $(element).parent().addClass("current");

    if(gbn == 'cert') {
        $("#cert_div").show();
        $("#cellEmail_div").hide();

        $("#tab01").addClass("on");
        $("#tab02").removeClass("on");
        $("#tab03").removeClass("on");
        $("#cellEmail_div").children("p").text("휴대폰번호로 전송된 인증번호 입력하세요.");
        $("#platFormType").val("cert");
    } else if(gbn == 'cellNo') {
        $("#cert_div").hide();
        $("#cellEmail_div").show();

        $(".cellNo").show();
        $(".email").hide();
        $("#tab01").removeClass("on");
        $("#tab02").addClass("on");
        $("#tab03").removeClass("on");
        $("#cellEmail_div").children("p").text("휴대폰번호로 전송된 인증번호 입력하세요.");
        $("#platFormType").val("cellNo");
    } else if(gbn == "email") {
        $("#cert_div").hide();
        $("#cellEmail_div").show();

        $(".email").show();
        $(".cellNo").hide();
        $("#tab01").removeClass("on");
        $("#tab02").removeClass("on");
        $("#tab03").addClass("on");
        $("#cellEmail_div").children("p").text("이메일로 전송된 인증번호를 입력하세요.");
        $("#platFormType").val("email");
    }

    // 인증초기화
    clearInterval(x);
    $("#sendBtn").text("인증번호발송");
    $("#em_time").html("");
    $("#confirmCnBtn").show();
    $("#confirmBtn").hide();
    $("#sendBtn").removeClass("disable");
    $("#time_err").html("시간 안에 인증번호를 입력해주세요.");
}
export const emailValidate = (str) => {
    var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if(!regExp.test(str)){
        return true;
    } else {
        return false;
    }
};
export const sendKey = (element) => {
    if($("#platFormType").val() == "email") {
        var email1 = $("#email1").val();
        var emailAddr 	= $('#emailAddr option:checked').text();
        var emailVal 	= $('#emailAddr option:checked').val();
        var email = email1 + "@" + emailAddr;
        if(emailVal == "80") {
            email = email1 + "@" + $('#emailInput').val();
        }

        if($("#email1").val() == "") {
            alert('이메일을 입력하세요.');
            $("#email1").focus();
            return;
        }
        if(emailVal == "") {
            alert('이메일 주소를 선택하세요.');
            $("#emailAddr").focus();
            return;

            if(emailVal == "80") {
                alert('이메일 주소를 입력하세요.');
                $("#emailInput").focus();
                return;
            }
        }
        if (emailValidate(email)) {
            alert('올바른 이메일 형식이 아닙니다.');
            $("#email1").focus();
            return;
        }
    } else {
        if($("#mbrNm").val() == "") {
            alert('이름을 입력하세요.');
            $("#mbrNm").focus();
            return;
        }
        if($("#cellNo").val() == "") {
            alert('휴대폰번호를 입력하세요.');
            $("#cellNo").focus();
            return;
        }
    }

    if(!$("#sendBtn").hasClass("disable")) {
        // $.ajax({
        //     url : '/login/SendRandomkey.json',
        //     data : {
        //         "platFormType" : $("#platFormType").val(),
        //         "mbrNm" : $("#mbrNm").val(),
        //         "cellNo" : $("#cellNo").val(),
        //         "email" : email,
        //     },
        //     dataType : 'json',
        //     type : 'post',
        //     success:function(result) {
        //         if (result.retCode == "0000") {
        //             key = result.confirmKey;
        //             loginId = result.loginId;

        checkTime();
        //         } else if(result.retCode == "0001") {
        //             alert('회원 정보가 없습니다.');
        //             return;
        //         } else if(result.retCode == "0002") {
        //             alert('고객사 정보가 없습니다. 다시 접속하세요.');
        //             return;
        //         }
        //     },
        //     error:function(data) {
        //         alert('시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
        //         return;
        //     }
        // });
    } else {
        alert('3분후 다시 요청하세요.');
        return;
    }
}
export const checkTime = () => {
    var time = 180;
    var min = "";
    var sec = "";

    x = setInterval(function() {
        $("#confirmBtn").show();
        $("#confirmCnBtn").hide();

        $("#sendBtn").addClass("disable");

        $("#time_err").html("시간 안에 인증번호를 입력해주세요.");
        $("#sendBtn").text("인증번호발송");

        min = parseInt(time/60);
        sec = time%60 < 10 ? "0" + time%60 : time%60 ;

        $("#em_time").html(min+":"+sec);
        time--;

        if(time < 0) {
            clearInterval(x);
            $("#time_err").html("인증시간이 만료 되었습니다. 다시 요청하세요.");

            $("#sendBtn").text("인증번호재발송");
            $("#sendBtn").removeClass("disable");

            $("#confirmBtn").hide();
            $("#confirmCnBtn").show();
        }
    }, 1000);
}
export const checkEmailType = (element) => {
    var sel = $(element).val();
    $('#emailInput').val('');
    $('#emailChkValid').hide();
    if(sel == '80') {
        $('#emailInput').parent().show();
    } else {
        $('#emailInput').parent().hide();
    }
}
export const passwordChange = () => {
    if($("#platFormType").val() == "email") {
        if($("#email1").val() == "") {
            alert('이메일을 입력하세요.');
            $("#email1").focus();
            return;
        }
    } else if($("#platFormType").val() == "cellNo") {
        if($("#mbrNm").val() == "") {
            alert('이름을 입력하세요.');
            $("#mbrNm").focus();
            return;
        }
        if($("#cellNo").val() == "") {
            alert('핸드폰번호를 입력하세요.');
            $("#cellNo").focus();
            return;
        }
    } else {
        alert('준비중입니다!');
        return;
    }

    if(key == "") {
        alert('인증번호를 요청하세요.');
        return;
    }

    var confirmKey = $("#tab_number").val();
    if(confirmKey == "") {
        alert('인증번호를 입력하세요.');
        $("#tab_number").focus();
        return;
    }

    if($("#confirmCnBtn").is(':visible')) {
        alert('인증시간이 만료되었습니다. 다시 요청하세요');
        return;
    }

    if(key != confirmKey) {
        alert('인증번호가 다릅니다. 다시 확인하세요.');
        $("#tab_number").focus();
        return;
    }

    alert('인증이 완료 되었습니다.');
    loginSrchResult();
}
export const loginSrchResult = () => {
    $("#findId").hide();
    $("#findResult").show();
    $("#resultIdTxt").html(idMask(loginId));
}
export const idMask = (str) => {

    var originStr = str;
    var maskingStr = '';

    if (originStr == null || originStr == '') {
        return '';
    }

    let len = originStr.length;
    maskingStr = len <= 3 ? originStr : originStr.substring(0, len - 3) + new Array(4).join('*');

    return maskingStr;
}
export const doHistoryBack = () => {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href="/";
    }
}
export const scrollBottom = () => {
    $("html, body").animate({ scrollTop: $(document).height() }, 500);
}