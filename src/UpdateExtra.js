import $ from 'jquery';
import {useEffect, useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as calendar from "./js/calendar";
import UpdateTab from "./UpdateTab";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const [isMarried, setIsMarried] = useState(false);

    $.fn.serializeObject = function() {
        var obj = null;
        try {
            if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
                var arr = this.serializeArray();
                console.log(arr);
                if(arr){
                    obj = {};
                    $.each(arr, function() {
                        // obj[this.name] = this.value;
                        if (this.value != '') obj[this.name] = this.value;
                    });
                }
            }
        }catch(e) {
            alert(e.message);
        }finally  {}
        return obj;
    }

    useEffect(() => {
        $('#myPhNum').on('click', function() {
            var tempCellNo = $('#tempCellNo').val();
            tempCellNo = tempCellNo.replace(/-/gi, "");
            if($(this).is(":checked")) {
                $('#cellNo').val(tempCellNo);
            } else {
                $('#cellNo').val('');
            }
        });

        $('[name="weddYn"]').on('change', function() {
            var weddYn = $(this).val();
            if(weddYn == 'N') {
                $('.weddYn').hide();
            } else {
                $('.weddYn').show();
            }
        });

        $('[name="shySctYn"]').on('change', function() {
            var shySctYn = $(this).val();
            if(shySctYn == 'N') {
                $('[name="shySctCd"]:checkbox').prop("checked",false);

            } else {
                $('[name="shySctCd"]:checkbox[value="1"]').prop("checked",true);
            }
        });

        $('[name="shySctCd"]').on('click', function() {
            var chkLen = $('input:checkbox[name="shySctCd"]:checked').length;

            if(chkLen > 0) {
                $('input:radio[name=shySctYn]:input[value=Y]').prop("checked", true);
            } else {
                $('input:radio[name=shySctYn]:input[value=N]').prop("checked", true);
            }
        });
    }, [])

    // function getMbrExtra() {
    //     $.ajax( {
    //         url : '/mypage/s_MyPageMbrInfo.json',
    //         data : '',
    //         dataType : 'json',
    //         type : 'post',
    //         success : function(data) {
    //             var detail = data.detail;
    //             createMbrExtra(detail);
    //         },
    //         error : function(data) {
    //             common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
    //         }
    //     });
    // }
    //
    // function createMbrExtra(data) {
    //     var cashReceipt = data.cashReceipt;
    //     if(cashReceipt != '' && cashReceipt != null && typeof cashReceipt != 'undefined') {
    //         $('#cellNo').val(cashReceipt);
    //         $('#myPhNum').prop("checked",true);
    //     } else {
    //         $('#cellNo').val('');
    //         $('#myPhNum').prop("checked",false);
    //     }
    //
    //     var weddYn = data.weddYn;
    //     $('[name="weddYn"]:radio[value=' + weddYn + ']').prop("checked",true);
    //     if(weddYn == 'Y') {
    //         $('.weddYn').show();
    //         var weddDt = data.weddDt;
    //         $('#weddDt').val(weddDt);
    //     } else {
    //         $('.weddYn').hide();
    //     }
    //
    //     var shySctCd = data.shySctCd;
    //     if(shySctCd != null && shySctCd != '') {
    //         var shySctCdArr = [];
    //         if(shySctCd.indexOf(',') > -1) {
    //             shySctCdArr = shySctCd.split(',');
    //         } else {
    //             shySctCdArr.push(shySctCd);
    //         }
    //         var len = shySctCdArr.length;
    //         $('input:radio[name=shySctYn]:input[value=Y]').prop("checked", true);
    //
    //         for(var i = 0; i< len; i++) {
    //             var temp = shySctCdArr[i];
    //             $('[name="shySctCd"]:checkbox[value=' + temp + ']').prop("checked",true);
    //         }
    //     } else {
    //         $('input:radio[name=shySctYn]:input[value=N]').prop("checked", true);
    //     }
    //
    //     var cncnAreasCd = data.cncnAreasCd;
    //     if(cncnAreasCd != null && cncnAreasCd != '') {
    //         var cncnAreasCdArr = [];
    //         if(cncnAreasCd.indexOf(',') > -1) {
    //             cncnAreasCdArr = cncnAreasCd.split(',');
    //         } else {
    //             cncnAreasCdArr.push(cncnAreasCd);
    //         }
    //         for(var i = 0; i< cncnAreasCdArr.length; i++) {
    //             var temp = cncnAreasCdArr[i];
    //             $('[name="cncnAreasCd"]:checkbox[value=' + temp + ']').prop("checked",true);
    //         }
    //     }
    // }

    const updateMerExtra = () => {
        // var formData = $("#mypageExtraUpdateForm").serializeJson();
        var formData = $("#mypageExtraUpdateForm").serializeObject();
        // var cellNo = $('#cellNo').val();
        // formData.cashReceipt = cellNo;

        var weddYn = formData.weddYn;
        // var weddYn = $('input[name=weddYn]:checked').val();
        if(weddYn == 'Y') {
            var weddDt = $('#weddDt').val();
            if(weddDt == '') {
                // return common.cmnAlertLayer('btn1','결혼 기념일을 지정하여 주십시오.');
            }
        }

        var shySctCd = '';
        var cncnAreasCd = '';

        // var shySctCdArr = formData.shySctCd;
        // if(typeof shySctCdArr != 'undefined') {
        var shySctCdArr = $('input[name=shySctCd]:checked');
        if(shySctCdArr.length > 0) {
            for(var i = 0; i < shySctCdArr.length; i++) {
                var temp = shySctCdArr[i].value;
                if(i == 0) {
                    shySctCd = temp;
                } else {
                    shySctCd += ',' + temp;
                }
            }
        }

        if (shySctCd != '') formData.shySctCd = shySctCd;

        // var cncnAreasCdArr = formData.cncnAreasCd;
        // if(typeof cncnAreasCdArr != 'undefined') {
        var cncnAreasCdArr = $('input[name=cncnAreasCd]:checked');
        if(cncnAreasCdArr.length > 0) {
            for(var i = 0; i < cncnAreasCdArr.length; i++) {
                var temp = cncnAreasCdArr[i].value;
                if(i == 0) {
                    cncnAreasCd = temp;
                } else {
                    cncnAreasCd += ',' + temp;
                }
            }
        }

        if (cncnAreasCd != '') formData.cncnAreasCd = cncnAreasCd;

        //console.log(JSON.stringify(formData));
        $.ajax( {
            url : '/mypage/s_MyPageMbrExtraUpdate.json',
            data : formData,
            // data : JSON.stringify(formData),
            dataType : 'json',
            type : 'post',
            success:function(data) {
                var status = data.status;

                if(status == 'succ') {
                    // common.cmnAlertLayer('btn1','수정 하였습니다.', function() {
                    //     getMbrExtra();
                    // });
                    common.cmnAlertLayer('btn1','수정 하였습니다.');

                } else {
                    common.cmnAlertLayer('btn1','실패하였습니다.');
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    // setCalendar
    const selectedInput = useRef(null);
    const [selectedRange, setSelectedRange] = useState({
        startDate: null,
        endDate: null,
    });

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
                {/*        <li className="swiper-slide current"><a href="/mypage/s_MyPageExtra.do" className="type3">부가정보</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/foreign/mypage/s_MyPageCompanion.do" className="type3">나의여행자</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageConsent.do" className="type3">정보수신동의여부</a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <UpdateTab name="extra"/>

                <section className="mgb_0">
                    <div className="box">
                        <form name="mypageExtraUpdateForm" id="mypageExtraUpdateForm" method="post">
                            <h2 className="tit1">부가정보 입력</h2>
                            <ul className="list_type">
                                <li>부가정보를 입력하고, 더 많은 혜택정보를 받아 보시기 바랍니다.</li>
                            </ul>
                            <div className="info_form">
                                <dl className="inputArea">
                                    <dt>결혼여부</dt>
                                    <dd className="mgt_10 select-option">
                                        <span className="radio">
                                            <input id="radio03" name="weddYn" type="radio" value="N"
                                                   onClick={() => setIsMarried(false)}/>
                                            <label htmlFor="radio03">미혼</label>
                                        </span>
                                        <span className="radio">
                                            <input id="radio04" name="weddYn" type="radio" value="Y"
                                            onClick={() => setIsMarried(true)}/>
                                            <label htmlFor="radio04">기혼</label>
                                        </span>
                                    </dd>
                                    <dt className="weddYn" style={isMarried ? {} : {display: "none"}}>결혼기념일</dt>
                                    <dd className="mgt_10 weddYn" style={isMarried ? {} : {display: "none"}}>
                                        <span className="w100 mgt_10 vam">
                                            <a // href="#datepicker"
                                               className="input_cal calendar-pop-layer"
                                               onClick={(e) => calendar.create_calendar_layer_Pop("#weddDt")}
                                            >
                                                <input type="text" id="weddDt" name="weddDt" readOnly="readonly"/>
                                                <span className="btnCal">달력</span>
                                            </a>
                                        </span>
                                    </dd>
                                    <dt className="weddYn" style={isMarried ? {} : {display: "none"}}>자녀유무</dt>
                                    <dd className="mgt_10 select-option weddYn" style={isMarried ? {} : {display: "none"}}>
                                        <span className="radio">
                                            <input id="shySctYn_01" name="shySctYn" type="radio" value="Y"/>
                                            <label htmlFor="shySctYn_01">자녀있음</label>
                                        </span>
                                        <span className="radio">
                                            <input id="shySctYn_02" name="shySctYn" type="radio" value="N"/>
                                            <label htmlFor="shySctYn_02">자녀없음</label>
                                        </span>
                                    </dd>
                                    <dt className="weddYn" style={isMarried ? {} : {display: "none"}}>학년구분</dt>
                                    <dd className="mgt_10 select-option weddYn" style={isMarried ? {} : {display: "none"}}>
                                        <span className="check">
                                            <input id="shySctCd_01" name="shySctCd" type="checkbox" value="1"/>
                                            <label htmlFor="shySctCd_01">영유아</label>
                                        </span>
                                        <span className="check">
                                            <input id="shySctCd_02" name="shySctCd" type="checkbox" value="2"/>
                                            <label htmlFor="shySctCd_02">초등</label>
                                        </span>
                                        <span className="check">
                                            <input id="shySctCd_03" name="shySctCd" type="checkbox" value="3"/>
                                            <label htmlFor="shySctCd_03">중/고등</label>
                                        </span>
                                        <span className="check">
                                            <input id="shySctCd_04" name="shySctCd" type="checkbox" value="4"/>
                                            <label htmlFor="shySctCd_04">대학생</label>
                                        </span>
                                    </dd>
                                    <dt>관심분야</dt>
                                    <dd className="mgt_10 select-option">
                                        <span className="check">
                                            <input id="cncnAreasCd_01" name="cncnAreasCd" type="checkbox" value="1"/>
                                            <label htmlFor="cncnAreasCd_01">건강정보</label>
                                        </span>
                                        <span className="check">
                                            <input id="cncnAreasCd_02" name="cncnAreasCd" type="checkbox" value="2"/>
                                            <label htmlFor="cncnAreasCd_02">해외여행</label>
                                        </span>
                                        <span className="check">
                                            <input id="cncnAreasCd_03" name="cncnAreasCd" type="checkbox" value="3"/>
                                            <label htmlFor="cncnAreasCd_03">도서정보</label>
                                        </span>
                                        <span className="check">
                                            <input id="cncnAreasCd_04" name="cncnAreasCd" type="checkbox" value="4"/>
                                            <label htmlFor="cncnAreasCd_04">대학생</label>
                                        </span>
                                        <span className="check">
                                            <input id="cncnAreasCd_05" name="cncnAreasCd" type="checkbox" value="5"/>
                                            <label htmlFor="cncnAreasCd_05">국내여행</label>
                                        </span>
                                        <span className="check">
                                            <input id="cncnAreasCd_06" name="cncnAreasCd" type="checkbox" value="6"/>
                                            <label htmlFor="cncnAreasCd_06">체험여행</label>
                                        </span>
                                    </dd>
                                </dl>
                            </div>
                        </form>
                        <div className="btnArea mgt_30">
                            <a // href="#none"
                               className="lbtn btn-large filled"
                               style={{background: "#466cc2", border: "1px solid #466cc2"}}
                               // onClick="updateMerExtra();"
                               onClick={() => updateMerExtra()}
                            >변경 내용 저장</a>
                        </div>
                    </div>
                </section>
            </div>

            <div id="calendar-pop" className="popup-box">
                <div className="popWrap">
                    <a // href="javascript:void(0);"
                       className="pop-close layer-close">닫기</a>
                    <div className="pop-cont">
                        <DatePicker
                            id="ForeCAL_1"
                            onChange={calendar.onChange}
                            // selected={startDate}
                            // startDate={selectedRange.startDate}
                            // endDate={selectedRange.endDate}
                            dateFormat="yyyy.MM.dd"
                            // selectsRange={true}
                            inline
                            locale={ko}
                            maxDate={new Date()}
                            renderCustomHeader={({
                                                     monthDate,
                                                     // date,
                                                     // customHeaderCount,
                                                     changeYear,
                                                     decreaseMonth,
                                                     increaseMonth,
                                                 }) => (
                                <div className="month">
                                    <ul>
                                        <li className="year-prev">
                                            {/*<a href="javascript:changeCalendar(&quot;YEAR&quot;, &quot;-&quot;);">이전년도</a>*/}
                                            <a onClick={() => changeYear(monthDate.getFullYear() - 1)}>이전년도</a>
                                        </li>
                                        <li className="month-prev">
                                            {/*<a href="javascript:changeCalendar(&quot;MONTH&quot;, &quot;-&quot;);">이전달</a>*/}
                                            <a onClick={decreaseMonth}>이전달</a>
                                        </li>
                                        <li><span id="calendarYear">{monthDate.getFullYear()}</span>.<span id="calendarMonth">{monthDate.getMonth() + 1 < 10 ? "0" : ""}{monthDate.getMonth() + 1}</span></li>
                                        <li className="month-next">
                                            {/*<a href="javascript:changeCalendar(&quot;MONTH&quot;, &quot;+&quot;);">다음달</a>*/}
                                            <a onClick={increaseMonth}>다음달</a>
                                        </li>
                                        <li className="year-next">
                                            {/*<a href="javascript:changeCalendar(&quot;YEAR&quot;, &quot;+&quot;);">다음년도</a>*/}
                                            <a onClick={() => changeYear(monthDate.getFullYear() + 1)}>다음년도</a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            renderDayContents={(day) => (<div><span>{day}</span></div>)}
                        />
                        <a // href="#"
                           className="btm-layer-btn mgt_25 pop-close">닫기</a>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
  );
}

export default App;