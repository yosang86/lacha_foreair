import $ from 'jquery';
import {ko} from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import * as common from "./js/common";
import * as base from "./js/find";
import "./css/Faq.css";
import Footer from "./Footer";
import {useRef, useState} from "react";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const updateTitle = (element) => {
        // var cd = $(this).val();
        var cd = $(element).val();

        if(cd == '7') {
            $("#resignPop_cont").show();
        } else {
            $("#resignPop_cont").hide();
        }
    }

    const updateLength = (element) => {
        // var txt = $(this).val();
        var txt = $(element).val();
        var len = txt.length;
        if(len <= 1500) {
            $('#contCnt').text(len);
        } else {
            txt = txt.substring(0, 1500);
            // $(this).val(txt);
            $(element).val(txt);
        }
    }

    const contInit = () => {
        $('#cont').val('');
        $('#contCnt').text('0');
    }

    const questionInsert = () => {
        var sctCd = '';
        $('.cate').find('a').each(function() {
            var cls = $(this).attr('class');
            if(cls == 'select') {
                sctCd = $(this).attr('data-type');
            }
        });

        var resign = $('#resign').val();
        var resignYn = $('#resignYn').is(':checked');
        var tit = $('#tit').val();
        var titTxt = $('#tit option:checked').text();
        var titCd = $('#tit').val();
        var cont = $('#cont').val();


        // if(resign == 'Y') {
            if(titCd == '' || titCd == null) {
                common.cmnAlertLayer('btn1','탈퇴사유를 선택해주십시오.');
                return;
            }
        // } else {
        //     if(tit == '' || tit == null) {
        //         common.cmnAlertLayer('btn1','제목를 입력해주십시오.');
        //         return;
        //     }
        // }

        // if(resign == 'Y') {
            if(titCd == '7') {
                if(cont == '' || cont == null) {
                    common.cmnAlertLayer('btn1','내용을 입력해주십시오.');
                    return;
                }
            }
            tit = titTxt;
        // } else {
        //     if(cont == '' || cont == null) {
        //         common.cmnAlertLayer('btn1','내용을 입력해주십시오.');
        //         return;
        //     }
        // }

        if(!resignYn && resign == 'Y'){
            common.cmnAlertLayer('btn1','유의사항 확인이 체크되지 않았습니다.\n체크 후 회원 탈퇴 신청을 해주십시오.');
            return;
        }

        var delYn = '';
        $('input:checkbox[name=delYn]').each(function() {
            if(this.checked){//checked 처리된 항목의 값
                var val = this.value;
                delYn = val;
            }
        });

        var param = {
            sctCd : sctCd,
            tit : tit,
            cont : cont,
            delYn : delYn
        }

        $.ajax( {
            url : '/newnotice/s_QuestionInsert.json',
            data : param,
            dataType : 'json',
            type : 'post',
            success : function(data) {
                var status = data.status;
                if(status == 'succ') {
                    common.cmnAlertLayer('btn1','등록하였습니다.', function() {
                        window.location.href = "/question";
                    });
                } else {
                    common.cmnAlertLayer('btn1','실패하였습니다.');
                }
            },
            error : function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="javascript:void(0);" onClick={() => base.doHistoryBack()} className="btnClose full-pop-close">닫기</a>
                    <h1>회원탈퇴요청</h1>
                </div>
            </div>

            <div id="content">
                <div className="questionWrap">
                    <div className="topIntro">
                        <h2>회원탈퇴 안내 및 유의사항</h2>
                        <div className="introTxt" style={{display: "block"}}>
                            <ul>
                                <li>회원탈퇴 시, 본 사이트의 이용내역은 모두 삭제되며 복원이 불가능합니다.</li>
                                <li>탈퇴 시 구매내역 및 보유하셨던 쿠폰, 적립금, 포인트는 모두 소멸되며 재가입 또는 회원탈퇴 철회시 복원하여 사용할 수 없습니다.</li>
                                <li>주문 중인 상품이 있을 경우 구매 절차를 완료 후 회원탈퇴를 진행해 주세요.
                                    구매확정 또는 사용완료가 되지 않은 시점에 탈퇴하실 경우 생기는 불이익은 본인이 부담하셔야 합니다.
                                </li>
                                <li>회원탈퇴 시 회원 정보는 소비자보호법에 관한 법률에 의거한 고객정보 보호 정책에 따라 관리됩니다. (자세한 내용은 개인정보처리방침 참조)</li>
                                <li>탈퇴 후 재가입을 원하실 경우 고객센터를 통해서만 조치 가능합니다.</li>
                            </ul>
                            <p className="rafer-red">고객센터 : 02-568-1220<br/>운영시간 : 평일 9시 ~ 17시 / 토, 일 공휴일 휴무</p>
                        </div>
                    </div>

                    <div className="questionForm">
                        <input type="hidden" id="resign" name="resign" value="Y"/>

                        <dl className="cate" id="sctCd" style={{display: "none"}}>
                            <dt>카테고리</dt>
                            <dd className="mgt_5">
                                <a href="javascript:void(0);" className="select" data-type="001009">회원탈퇴</a>
                            </dd>
                        </dl>

                        <dl>
                            <dt>탈퇴사유</dt>
                            <dd>
                                <select className="input_select" style={{width: "100%"}} name="tit" id="tit"
                                        title="탈퇴사유" data-type="select"
                                        onChange={(e) => updateTitle(e.currentTarget)}>
                                    <option value="">탈퇴사유를 선택해주세요.</option>
                                    <option value="1" title="방문 빈도 낮음">방문 빈도 낮음</option>
                                    <option value="2" title="이벤트 기간 종료">이벤트 기간 종료</option>
                                    <option value="3" title="원하는 상품 없음">원하는 상품 없음</option>
                                    <option value="4" title="가격 불만족">가격 불만족</option>
                                    <option value="5" title="배송 불만족">배송 불만족</option>
                                    <option value="6" title="서비스 이용 불편">서비스 이용 불편</option>
                                    <option value="8" title="고객 서비스 불만">고객 서비스 불만</option>
                                    <option value="9" title="기타">기타</option>
                                </select>
                                {/*<!-- <input type="text" placeholder="제목을 입력해 주세요. (최대 40자)" maxlength="40" id="tit" > -->*/}
                            </dd>
                        </dl>

                        <dl id="resignPop_cont" style={{display: "none"}}>
                            <dt>
                                내용<a href="javascript:void(0);" className="sbtn border"
                                     style={{color: "#466cc2", border: "1px solid #466cc2"}}
                                     onClick={() => contInit()}>작성내용초기화</a>
                            </dt>
                            <dd>
                                <div className="textarea">
                                    <textarea id="cont" placeholder="기타 사유의 자세한 내용을 적어주시기 바랍니다."
                                        onKeyUp={(e) => updateLength(e.currentTarget)}
                                    ></textarea>
                                    <p><span id="contCnt">0</span>/1500자</p>
                                </div>
                            </dd>
                        </dl>
                        <div className="mgb_10 p_re">
                            <span className="check">
                                <input id="resignYn" name="resignYn" type="checkbox" value="Y"/>
                                <label htmlFor="resignYn">유의사항을 확인하였으며, 회원탈퇴를 요청합니다.</label>
                            </span>
                        </div>
                        <div className="flexWrap mgt_30">
                            <a href="/csMain" className="lbtn filled-g btn-large">취소</a>
                            <a href="javascript:void(0);" onClick={() => questionInsert()}
                               className="lbtn filled btn-large"
                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>회원 탈퇴 신청</a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default App;