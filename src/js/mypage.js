import $ from "jquery";
import * as common from "./common"

export const pageMove = (url) => {
    var chgFlag = $('#chgFlag').val();
    var passwd = $('#passwd').val();
    // swiper = $('#swiper').clone();
    if(chgFlag == '' && passwd == '') {
        $('#baseForm').attr('action', url);
        $('#baseForm').submit();
    } else {
        $('#slideTab').empty();
        common.cmnConfirmLayer('변경하신 내용을 저장 하시겠습니까?', function() {
            var param = setData();

            if(param) {
                $.ajax( {
                    url : '/mypage/s_UpdateMyInfo.do',
                    data : param,
                    dataType : 'json',
                    type : 'post',
                    success:function(data) {
                        var status = data.retCode;
                        if(status == '0000') {
                            $('#chgFlag').val('');
                            common.cmnAlertLayer('btn1','수정 하였습니다.', function () {
                                $('#baseForm').attr('action', url);
                                $('#baseForm').submit();
                            });

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
            }
        });

        // $('#slideTab').append(swiper);
    }
}

export const setData = () => {
    var email 		= $('#email').val();
    var cellNo 		= $('#cellNo').val();
    var emailAddr 	= $('#emailAddr option:checked').text();
    var emailVal 	= $('#emailAddr option:checked').val();

    var passwd			= $('#passwd').val();
    var changePwdFst	= $('#changePwdFst').val();
    var changePwdScd	= $('#changePwdScd').val();

    if (email == "") {
        common.cmnAlertLayer('email','이메일 아이디를 입력해주세요.');
        return false;
    }

    if(emailVal != '80') {
        email += '@' + emailAddr;
    } else {
        var emailInput = $('#emailInput').val();
        email += '@' + emailInput;
    }

    $('#emailChkValid').hide();

    //var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!regExp.test(email)){
        $('#emailChkValid').text('이메일을 확인해주십시오.');
        $('#emailChkValid').show();
        return false;
    }

    var param = {
        email: email,
        cellNo: cellNo,
        passwd: passwd,
        changePwdFst: changePwdFst,
        changePwdScd: changePwdScd,
    }

    return param;
}