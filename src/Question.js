import {useEffect, useRef, useState} from "react";
import $ from 'jquery';
import {ko} from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import * as common from "./js/common";
import * as calendar from "./js/calendar";
import * as base from "./js/find";
import "./css/Faq.css";
import Footer from "./Footer";

function App() {
    useEffect(() => {
        $('.term').on('click', '.date', function() {
            var style = $('.data-set').attr('style');
            //console.log('style : ', style);
            if(style == 'display: none;' || typeof style == 'undefined') {
                $('.term').find('.date').each(function() {
                    $(this).find('a').removeClass('selected');
                })
                $(this).find('a').addClass('selected');
                var num = $(this).attr('data-num');
                var dataType = $(this).attr('data-type');
                if(num != '0') {
                    getDate(num);
                    $("#formSrch").find('#dataType').val(dataType);
                    common.questionSearch(1);
                }
            }
        })

        $('.tab').on('click', '.date', function() {
            $('.tab').find('.date').each(function() {
                $(this).removeClass('current');
            })
            $(this).addClass('current');
            var num = $(this).attr('data-num');
            var dataType = $(this).attr('data-type');
            if(num != '0') {
                getDate(num);
                $("#formSrch").find('#dataType').val(dataType);
            }
        })
    }, [])

    const getDate = (num) => {
        var today = new Date();
        var endDtm = common.dateFormat(today);
        var year = today.getFullYear();
        var month = today.getMonth() - num;
        var day = today.getDate()
        // console.log(year, month, day);
        var strtDtm = new Date(year, month, day);
        strtDtm = common.dateFormat(strtDtm);

        //console.log('startDate : ', strtDtm, ' , endDate : ', endDtm);
        $('#strtDtm').val(strtDtm);
        $('#endDtm').val(endDtm);
    }

    const formatDate = (date, num) => {
        var today = date != null ? date : new Date();
        var year = today.getFullYear();
        var month = num != null ? today.getMonth() - num : today.getMonth();
        var day = today.getDate();
        var strtDtm = new Date(year, month, day);
        strtDtm = common.dateFormat(strtDtm);

        return strtDtm;
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a // href="javascript:void(0);"
                       onClick={() => base.doHistoryBack()} className="btnPrev">이전</a>
                    <h1>1:1 문의 내역</h1>
                </div>
            </div>

            <div id="content">
                <div className="searchArea v1">
                    <ul className="term">
                        <li className="date" data-num="3"><a // href="javascript:void(0);"
                                                             className="selected"
                            // onClick={() => setQuestionRange()}
                        >3개월</a></li>
                        <li className="date" data-num="6"><a // href="javascript:void(0);"
                            // onClick={() => setQuestionRange()}
                        >6개월</a></li>
                        <li className="date" data-num="0"><a // href="javascript:void(0);"
                                                             className="set"
                            // onClick={() => setQuestionRange()}
                        >기간설정</a></li>
                    </ul>
                    <div className="data-set v1 mgt_30">
                        <div className="rafer">조회기준 : 문의 등록일</div>
                        <div className="tabArea mgt_10 mgb_30">
                            <ul className="tab v1">
                                <li className="date" data-tab="tab1" data-num="1"><a // href="javascript:void(0);"
                                    // onClick={(e) => setQuestionRangeDetail(e.currentTarget.parentNode)}
                                >1개월</a></li>
                                <li className="date" data-tab="tab2" data-num="3"><a // href="javascript:void(0);"
                                    // onClick={(e) => setQuestionRangeDetail(e.currentTarget.parentNode)}
                                >3개월</a></li>
                                <li className="date" data-tab="tab3" data-num="6"><a // href="javascript:void(0);"
                                    // onClick={(e) => setQuestionRangeDetail(e.currentTarget.parentNode)}
                                >6개월</a></li>
                                <li className="current date" data-tab="tab4" data-num="0"><a // href="javascript:void(0);"
                                    // onClick={(e) => setQuestionRangeDetail(e.currentTarget.parentNode)}
                                >기간설정</a></li>
                            </ul>
                            <div id="tab1" className="tabcontent current">
                                <div className="info_form">
                                    <form name="formSrch" id="formSrch" method="post">
                                        <input type="hidden" name="offset" id="offset" value="0"/>
                                        <input type="hidden" name="limit" id="limit" value="6"/>
                                        <input type="hidden" name="pageNo" id="pageNo" value=""/>

                                        <dl className="inputArea">
                                            <dt className="hidden mgt_0">기간설정</dt>
                                            <dd>
                                                <p className="input_inline">
										            <span className="w100 mgt_10 vam">
                                                        <span className="input_cal v2">
                                                            <input type="text" id="strtDtm" name="strtDtm" readOnly="readonly"
                                                                value={formatDate(null, 6)}
                                                            />
                                                            <a // href="javascript:void(0);"
                                                               className="btnCal calendar-pop-layer"
                                                               // onClick={(e) => setCalendarLayerPopup(e.currentTarget)}
                                                               onClick={(e) => calendar.create_calendar_layer_Pop("#strtDtm")}
                                                            >달력</a>
                                                        </span>
                                                        <span>~</span>
                                                        <span className="input_cal v3">
                                                            <input type="text" id="endDtm" name="endDtm" readOnly="readonly"
                                                                value={formatDate(null)}
                                                            />
                                                            <a // href="javascript:void(0);"
                                                               className="btnCal calendar-pop-layer"
                                                               // onClick={(e) => setCalendarLayerPopup(e.currentTarget)}
                                                               onClick={(e) => calendar.create_calendar_layer_Pop("#endDtm")}
                                                            >달력</a>
                                                        </span>
										            </span>
                                                </p>
                                            </dd>
                                        </dl>
                                    </form>
                                    <a // href="javascript:void(0);"
                                       className="lbtn filled btn-large mgt_20"
                                       // onClick="questionSearch(1)"
                                       onClick={() => common.questionSearch(1)}
                                       style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <div className="qnaListWrap mgt_10">
                        <div className="totalNum">
                            <a
                               // href="/newnotice/s_QuestionAdd.do"
                               href="/addQuestion"
                               className="sbtn filled"
                               style={{background: "#466cc2", border: "1px solid #466cc2"}}
                               // onClick="questionAdd();"
                            >1:1 문의하기</a>
                            <span id="cnt">총 0건</span>
                        </div>
                        <div className="qnaList" id="questionList">
                            <div className="nodata empty-qna">
                                <strong>나의 상담 내역이 없습니다.</strong>
                            </div>
                        </div>
                        <div id="pagingList" className="pagination">
                        </div>
                    </div>
                    <div className="box7">
                        <p className="rafer mgt_15">상담내역 검색은 최대 6개월 까지만 가능합니다.</p>
                        <div className="btnArea mgt_30 mgb_30">
                            <a
                               // href="/newnotice/s_QuestionAdd.do"
                               href="/addQuestion"
                               className="lbtn btn-large filled"
                               style={{background: "#466cc2", border: "1px solid #466cc2"}}
                                // onClick="questionAdd();"
                            >1:1 문의하기</a>
                        </div>
                        <ul className="list-txt">
                            <li>1:1 문의는 사이트 이용 등 일반 상담만 가능합니다.</li>
                            <li>주문, 취소, 반품 등 처리가 필요한 요청사항을 제외한 궁금사항을 남겨 주세요.</li>
                            <li className="red">1:1 문의를 통한 취소/반품/주문/예약/변경/교환 접수 요청 글은 처리 불가합니다. 답변되지 않으니 반드시 고객센터로 전화
                                부탁드립니다.
                            </li>
                            <li>주문 및 여행에 관련한 접수 요청사항은 고객센터로 전화 주셔야 가능여부 확인이 가능합니다.</li>
                            <li>1:1 문의 답변은 나의 정보→1:1문의 내역에서 확인이 가능합니다.</li>
                            <li>문의에 대한 답변이 늦어질 경우 전화 주시면 빠른 상담 가능합니다.</li>
                        </ul>
                        <p className="rafer-red mgb_10">고객센터 : 02-568-1220</p>
                        <p className="rafer-red mgb_30">운영시간 : 평일 9시 ~ 17시 | 토,일 공휴일 휴무</p>
                    </div>
                </section>
            </div>

            <form name="questionForm" id="questionForm" method="post" action="/newnotice/s_QuestionDetail.do">
                <input type="hidden" id="bbSn" name="bbSn" value=""/>
            </form>

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
                        <a href="#" className="btm-layer-btn mgt_25 pop-close">닫기</a>
                    </div>
                </div>
            </div>

            {/*<div id='dimmd-layer' style={{display: "none"}}></div>*/}

            <Footer/>
        </>
    )
}

export default App;