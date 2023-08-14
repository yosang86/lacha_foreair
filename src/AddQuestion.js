import $ from 'jquery';
import {ko} from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import * as common from "./js/common";
import * as base from "./js/find";
import "./css/Faq.css";
import Footer from "./Footer";
import {useRef, useState} from "react";

function App() {
    // 카테고리 설정
    const setCategory = (element) => {
        $('.cate').find('a').each(function() {
            $(this).removeClass('select');
        });
        // $(this).addClass('select');
        $(element).addClass('select');

        // if($(this).data('type') == '001010') {
        if($(element).data('type') == '001010') {
            $('#tit').val('적립금 환불 신청');
            $('#cont').val(`&lt;적립금 환불 신청&gt;\n보유 적립금 :\n은행명 :\n계좌번호 :\n계좌주 :\n연락처 :\n\n※ 잔여 적립금은 나의정보>적립금 메뉴에서 확인해주세요.\n※ 적립금 환불은 계정소유자 명의의 계좌로만 가능합니다.\n※ 보유 적립금 전액이 환불됩니다. (일부만 환불 요청 불가합니다.)\n※ 환불 신청 후 7일 이내 신청하신 계좌로 입금 예정입니다.`);
        }
    }

    // 문의하기 내용 글자수 제한
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

    // 작성 내용 초기화
    const contInit = () => {
        $('#cont').val('');
        $('#contCnt').text('0');
    }

    // 문의하기 등록
    const questionInsert = () => {
        var sctCd = '';
        $('.cate').find('a').each(function() {
            var cls = $(this).attr('class');
            if(cls == 'select') {
                sctCd = $(this).attr('data-type');
            }
        });

        // var resign = $('#resign').val();
        // var resignYn = $('#resignYn').is(':checked');
        var tit = $('#tit').val();
        var titTxt = $('#tit option:checked').text();
        var titCd = $('#tit').val();
        var cont = $('#cont').val();


        // if(resign == 'Y') {
        //     if(titCd == '' || titCd == null) {
        //         common.cmnAlertLayer('btn1','탈퇴사유를 선택해주십시오.');
        //         return;
        //     }
        // } else {
            if(tit == '' || tit == null) {
                common.cmnAlertLayer('btn1','제목를 입력해주십시오.');
                return;
            }
        // }

        // if(resign == 'Y') {
        //     if(titCd == '7') {
        //         if(cont == '' || cont == null) {
        //             common.cmnAlertLayer('btn1','내용을 입력해주십시오.');
        //             return;
        //         }
        //     }
        //     tit = titTxt;
        // } else {
            if(cont == '' || cont == null) {
                common.cmnAlertLayer('btn1','내용을 입력해주십시오.');
                return;
            }
        // }

        // if(!resignYn && resign == 'Y'){
        //     common.cmnAlertLayer('btn1','유의사항 확인이 체크되지 않았습니다.\n체크 후 회원 탈퇴 신청을 해주십시오.');
        //     return;
        // }

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

        $.ajax({
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
                    <a // href="javascript:void(0);"
                       onClick={() => base.doHistoryBack()} className="btnClose full-pop-close">닫기</a>
                    <h1>1:1 문의하기</h1>
                </div>
            </div>

            <div id="content">
                <div className="questionWrap">
                    <div className="topIntro">
                        <h2>안내 및 유의사항</h2>
                        <div className="introTxt" style={{display: "block"}}>
                            <ul>
                                <li>1:1 문의는 사이트 이용 등 일반 상담만 가능합니다.</li>
                                <li>주문, 취소, 반품 등 처리가 필요한 요청사항을 제외한 궁금사항을 남겨 주세요.</li>
                                <li className="rafer-red">1:1 문의를 통한 취소/반품/주문/예약/변경/교환 접수 요청 글은 처리 불가합니다. 답변되지 않으니 반드시 고객센터로 전화 부탁드립니다.</li>
                                <li>주문 및 여행에 관련한 접수 요청사항은 고객센터로 전화 주셔야 가능여부 확인이 가능합니다.</li>
                                <li>1:1 문의 답변은 나의 정보→1:1문의 내역에서 확인이 가능합니다.</li>
                                <li>문의에 대한 답변이 늦어질 경우 전화 주시면 빠른 상담 가능합니다.</li>
                            </ul>
                            <p className="rafer-red">고객센터 : 02-568-1220</p>
                            <p className="rafer-red">운영시간 : 평일 9시 ~ 17시 | 토,일 공휴일 휴무</p>
                        </div>
                    </div>

                    <div className="questionForm">
                        <dl className="cate" id="sctCd">
                            <dt>카테고리</dt>
                            <dd className="">
                                <a // href="javascript:void(0);"
                                   className="select" data-type="001001"
                                    onClick={(e) => setCategory(e.currentTarget)}
                                >포인트</a>
                                <a // href="javascript:void(0);"
                                   className="" data-type="001002"
                                    onClick={(e) => setCategory(e.currentTarget)}
                                >복지제도</a>
                                <a // href="javascript:void(0);"
                                   className="" data-type="001003"
                                    onClick={(e) => setCategory(e.currentTarget)}
                                >회원정보</a>
                            </dd>
                            <dd className="mgt_5">
                                <a // href="javascript:void(0);"
                                   className="" data-type="001006"
                                    onClick={(e) => setCategory(e.currentTarget)}
                                >상품/제휴서비스</a>
                                <a // href="javascript:void(0);"
                                   className="" data-type="001007"
                                    onClick={(e) => setCategory(e.currentTarget)}
                                >적립금/쿠폰</a>
                                <a // href="javascript:void(0);"
                                   className="" data-type="001008"
                                    onClick={(e) => setCategory(e.currentTarget)}
                                >불편/건의/기타</a>
                            </dd>
                        </dl>

                        <dl>
                            <dt>제목</dt>
                            <dd>
                                <input type="text" placeholder="제목을 입력해 주세요. (최대 40자)" maxLength="40" id="tit"/>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                내용
                                <a // href="javascript:void(0);"
                                   className="sbtn border"
                                    style={{color: "#466cc2", border: "1px solid #466cc2"}}
                                    // onClick="contInit();"
                                    onClick={() => contInit()}
                                >작성내용초기화</a>
                            </dt>
                            <dd>
                                <div className="textarea">
                                    <textarea id="cont"
                                        placeholder="1:1 문의를 통한 취소/반품/주문/예약/변경/교환 접수 요청 글은 처리 불가합니다. 답변되지 않으니 반드시 고객센터로 연락해주세요."
                                        onKeyUp={(e) => updateLength(e.currentTarget)}
                                    ></textarea>
                                    <p><span id="contCnt">0</span>/1500자</p>
                                </div>
                            </dd>
                        </dl>
                        {/* <!-- 				<dl> -->*/}
                        {/* <!-- 					<dt>파일첨부</dt> -->*/}
                        {/* <!-- 					<dd>입력후 -->*/}
                        {/* <!-- 						<div class="fileAdd"> -->*/}
                        {/* <!-- 							<div><label for="upload">첨부</label><input type="file" name="" id="upload" /></div> -->*/}
                        {/* <!-- 							<div><input type="text" value="Screenshot1.jpg"><a href="javascript:void(0);"><span class="hdn">삭제</span></a></div> -->*/}
                        {/* <!-- 						</div> -->*/}
                        {/* <!-- 					</dd> -->*/}
                        {/* <!-- 					<dd>입력전 -->*/}
                        {/* <!-- 						<div class="fileAdd"> -->*/}
                        {/* <!-- 							<div><label for="upload">첨부</label><input type="file" name="" id="upload" /></div> -->*/}
                        {/* <!-- 							<div><input type="text"></div> -->*/}
                        {/* <!-- 						</div> -->*/}
                        {/* <!-- 					</dd> -->*/}
                        {/* <!-- 				</dl> -->*/}
                        {/* <!-- <p>*/}
                        {/*     <span class="check">*/}
                        {/*         <input type="checkbox" id="check01" name="" value="Y"><label for="check01">이메일로 답변 받기</label>*/}
                        {/*     </span>*/}
                        {/*     <span class="check">*/}
                        {/*         <input type="checkbox" id="check02" name="" value="N"><label for="check02">문자로 답변 받기</label>*/}
                        {/*     </span>*/}
                        {/* </p> -->*/}
                        <div className="flexWrap mgt_30">
                            <a href="/question" className="lbtn filled-g btn-large">취소</a>
                            <a // href="javascript:void(0);"
                                // onClick="questionInsert();"
                                onClick={() => questionInsert()}
                                className="lbtn filled btn-large"
                                style={{background: "#466cc2", border: "1px solid #466cc2"}}>접수</a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default App;