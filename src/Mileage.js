import $ from 'jquery';
import {useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    common.full_layer_Pop();

    function toDateObject(time) { // parseTime(time)
        var year = time.substr(0, 4);
        var month = time.substr(4, 2) - 1; // 1월=0,12월=11
        var day = time.substr(6, 2);
        return new Date(year, month, day);
    }
    function toDateString(date, dele) { // formatTime(date)
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
        var day = date.getDate();

        if (("" + month).length == 1) {
            month = "0" + month;
        }
        if (("" + day).length == 1) {
            day = "0" + day;
        }

        return ("" + year + dele + month + dele + day);
    }
    function shiftDate(time, y, m, d, dele) { // moveTime(time,y,m,d)
        var date = toDateObject(time);
        date.setFullYear(date.getFullYear() + y); // y년을 더함
        date.setMonth(date.getMonth() + m); // m월을 더함
        date.setDate(date.getDate() + d); // d일을 더함
        return toDateString(date, dele);
    }
    function getCurrentTime() {
        return toTimeString(new Date(), 'N');
    }
    function toTimeString(date, secondYn) { // formatTime(date)
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();

        if (("" + month).length == 1) {
            month = "0" + month;
        }
        if (("" + day).length == 1) {
            day = "0" + day;
        }
        if (("" + hour).length == 1) {
            hour = "0" + hour;
        }
        if (("" + min).length == 1) {
            min = "0" + min;
        }
        if (("" + second).length == 1) {
            second = "0" + second;
        }

        if (secondYn == 'Y') {
            return ("" + year + month + day + hour + min + second);
        } else {
            return ("" + year + month + day + hour + min);
        }
    }
    function toFormatString(time, dele) { // parseTime(time)
        var year = time.substr(0, 4);
        var month = time.substr(4, 2); // 1월=0,12월=11
        var day = time.substr(6, 2);

        return ("" + year + dele + month + dele + day);
    }

    function setSearchDate(term, startObj, endObj, obj) {
        var startDate = '';
        var endDate = '';

        if (term == "10") {
            startDate = shiftDate(getCurrentTime(), 0, 0, 0, "-");
        } else if (term == "20") {
            startDate = shiftDate(getCurrentTime(), 0, 0, -7, "-");
        } else if (term == "30") {
            startDate = shiftDate(getCurrentTime(), 0, 0, -15, "-");
        } else if (term == "40") {
            startDate = shiftDate(getCurrentTime(), 0, -1, 0, "-");
        } else if (term == "50") {
            startDate = shiftDate(getCurrentTime(), 0, -3, 0, "-");
        } else if (term == "60") {
            startDate = shiftDate(getCurrentTime(), 0, -6, 0, "-");
        } else if (term == "70") {
            startDate = shiftDate(getCurrentTime(), 0, -12, 0, "-");
        } else if (term == "100") {
            startDate = shiftDate(getCurrentTime(), 0, -120, 0, "-");
        } else {
            term	= parseInt(term);
            startDate = shiftDate(getCurrentTime(), 0, 0, term, "-");
        }
        endDate = toFormatString(getCurrentTime(), "-");

        if(obj) {
            obj.find("input[name=" + startObj + "]").val(startDate);
            obj.find("input[name=" + endObj + "]").val(endDate);
        } else {
            $("input[name=" + startObj + "]").val(startDate);
            $("input[name=" + endObj + "]").val(endDate);
        }

    }

    function doMonthSearch(obj) {
        if($(obj).closest("ul").find(".selected").length > 0) {
            $(obj).closest("ul").find(".selected").removeClass();
            $(obj).addClass("selected");
        }
        setSearchDate($(obj).data("value"), 'strtDtm', 'endDtm');

        // 기간 설정 토글 닫기
        if($(obj).data("type") != "tab") {
            $(".data-set").hide();
            $(".set").removeClass("active");
        } else {
            $(obj).closest("ul").find(".current").removeClass("current");
            $(obj).parent().addClass("current");
        }
        // 검색
        doList();
    }

    function doList() {
        $.ajax({
            url : '/mypage/s_MyMileageList.do',
            data : $("#formSrch").serialize(),
            dataType : 'html',
            type : 'post',
            success:function(data) {
                $("#pointTab").html(data);
            },
            error:function(data) {
                alert("시스템 장애입니다. 잠시후에 다시 시도해 주십시요.");
            }
        });
    }

    function doTab(obj) {
        $("#srchMlaStatType").val($(obj).data("value"));
        $(".tabSub").removeClass("current");
        $(obj).closest("li").addClass("current");

        doList();
    }


    // setCalendar
    const selectedInput = useRef(null);

    const create_calendar_layer_Pop = (inputId) => {
        selectedInput.current = inputId

        $(".react-datepicker__aria-live").css("display", "none");

        $("body").append($("<div id='dimmd-layer'></div>"));
        // $("#dimmd-layer").attr("tabindex", "0").fadeIn().focus();
        var $el = $("#calendar-pop");
        $el.attr("tabindex", "0").fadeIn().focus();

        var $elWidth = $el.outerWidth(),
            $elHeight = $el.outerHeight(),
            docWidth = $(document).width(),
            docHeight = $(document).height();

        if ($elHeight < docHeight || $elWidth < docWidth) {
            $el.css({
                marginTop: - $elHeight / 2,
                marginLeft: - $elWidth / 2,
            })
        } else {
            $el.css({top: 0, left: 0});
        }

        $el.find('.pop-close').click(function(){
            $el.fadeOut().removeAttr("tabindex");
            $("#dimmd-layer").remove();
            // $("#dimmd-layer").removeAttr("tabindex").fadeOut();
            // $("#calendar-pop").remove();
            return false;
        });
    };

    const changeCalendar = (type, action) => {
        var calendarYear = Number($("#calendarYear").text());
        var calendarMonth = Number($("#calendarMonth").text());
        var inputName = $("#calendarInputName").text();

        //년
        if(type == "YEAR"){

            if(action == "+"){
                calendarYear++;
            } else{
                calendarYear--;
            }

            //월
        } else if(type == "MONTH"){

            if(action == "+"){
                calendarMonth++;

                if(calendarMonth > 12){
                    calendarMonth = 1;
                    calendarYear++;
                }
            } else{
                calendarMonth--;

                if(calendarMonth < 1){
                    calendarMonth = 12;
                    calendarYear--;
                }
            }
        }

        calendarMonth = calendarMonth.toString().length < 2 ? "0" + calendarMonth : calendarMonth;
        $("#calendar-pop").remove();
        $("body").append(setCalendar(calendarYear, calendarMonth, '01', inputName)); //달력 셋팅
        var $el = $("#calendar-pop");
        $el.show();
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

        $el.find('.pop-close').click(function(){
            $("#dimmd-layer").remove();
            $el.fadeOut().removeAttr("tabindex");
            $("#calendar-pop").remove();
            return false;
        });
    };

    const setCalendar = (y, m, d, inputName) => {
        // 현재 년(y)월(m)의 1일(1)의 요일을 구합니다.
        var theDate = new Date(y,m-1,1);

        // 그 날의 요일은?
        var theDay = theDate.getDay();

        /* 현재 월의 마지막 일을 구합니다. */
        // 1월부터 12월까지의 마지막 일을 배열로 만듭니다.
        var last = [31,28,31,30,31,30,31,31,30,31,30,31];
        // 4년마다 있는 윤년을 계산합니다.(100년||400년 주기는 제외)
        if (y%4 == 0 && y%100 != 0 || y%400 == 0) {
            lastDate = last[1] = 29;
        }
        // 현재 월의 마지막 일이 며칠인지 구합니다.
        var lastDate = last[m-1];


        /* 현재 월의 달력에 필요한 행의 개수를 구합니다. */
        // theDay(빈 칸의 수), lastDate(월의 전체 일수)
        var row = Math.ceil((theDay+lastDate)/7);

//	jQuery("#calendarYear").text(y);
//	jQuery("#calendarMonth").text(m.toString().length < 2 ? "0" + m : m);

        var month = m.toString().length < 2 ? "0" + m : m;

        var html = [];
        html.push("<div id='calendar-pop' class='popup-box'>");
        html.push("<div class='popWrap'>");
        html.push("<a href='javascript:void(0);' class='pop-close layer-close'>닫기</a>");
        html.push("<div class='pop-cont'>");
        html.push("<!-- S:layer content -->");
        html.push("<div class='datepicker'>");
        html.push("<div id='calendarInputName' style='display: none;'>"+inputName+"</div>");
        html.push("<div class='month'>      ");
        html.push("<ul>");
        html.push("<li class='year-prev'><a href='javascript:changeCalendar(\"YEAR\", \"-\");\'>이전년도</a></li>");
        html.push("<li class='month-prev'><a href='javascript:changeCalendar(\"MONTH\", \"-\");'>이전달</a></li>");
        html.push("<li><span id='calendarYear'>"+y+"</span>.<span id='calendarMonth'>"+month+"</span></li>");
        html.push("<li class='month-next'><a href='javascript:changeCalendar(\"MONTH\", \"+\");'>다음달</a></li>");
        html.push("<li class='year-next'><a href='javascript:changeCalendar(\"YEAR\", \"+\");'>다음년도</a></li>");
        html.push("</ul>");
        html.push("</div>");
        html.push("<table>");
        html.push("<caption>datepicker</caption>");
        html.push("<col width='14.2%'>");
        html.push("<col width='14.2%'>");
        html.push("<col width='14.2%'>");
        html.push("<col width='14.2%'>");
        html.push("<col width='14.2%'>");
        html.push("<col width='14.2%'>");
        html.push("<col width='*'>");
        html.push("<thead>");
        html.push("<tr>");
        html.push("<th class='sun'>일</th>");
        html.push("<th>월</th>");
        html.push("<th>화</th>");
        html.push("<th>수</th>");
        html.push("<th>목</th>");
        html.push("<th>금</th>");
        html.push("<th class='sat'>토</th>");
        html.push("</tr>");
        html.push("</thead>");
        html.push("<tbody>");

        // 달력에 표기되는 일의 초기값!
        var dNum = 1;
        var strdNum = 1;
        for (var i=1; i<=row; i++) { // 행 만들기
            html.push("<tr>");
            for (var k=1; k<=7; k++) { // 열 만들기
                // 월1일 이전 + 월마지막일 이후 = 빈 칸으로!
                if(i===1 && k<=theDay || dNum>lastDate) {
                    html.push("<td><div class='day next'></div></td>");
                } else {
                    if(dNum < 10){
                        strdNum = "0"+dNum;
                    }else{
                        strdNum = dNum;
                    }
                    if(k == 1){
                        if(dNum == d){
                            html.push("<td><div class='day sun picker' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }else{
                            html.push("<td><div class='day sun' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }
                    }else if(k == 7){
                        if(dNum == d){
                            html.push("<td><div class='day picker' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }else{
                            html.push("<td><div class='day sat' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }
                    }else{
                        if(dNum == d){
                            html.push("<td><div class='day picker' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }else{
                            html.push("<td><div class='day' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }
                    }
                    dNum++;
                }
            }
            html.push("</tr>");
        }

        html.push("</tbody>");
        html.push("</table>");
        html.push("<a href='#' class='btm-layer-btn mgt_25 pop-close'>닫기</a>");
        html.push("</div>");
        html.push("</div>");
        html.push("</div>");
        html.push("</div>");

        return html.join("");
    };

    const setCalendarDate = (inputTarget, value) => {
        $("input[name="+inputTarget+"]").val(value);
        $("#dimmd-layer").remove();
        var $el = $("#calendar-pop");
        $el.fadeOut().removeAttr("tabindex");
        $("#calendar-pop").remove();
    }

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

    const [selectedRange, setSelectedRange] = useState({
        startDate: null,
        endDate: null,
    });
    const onChange = (date) => {
        $(selectedInput.current).val(formatDate(date));
        $("#calendar-pop .pop-close").click();
    }
    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="/mypage" className="btnPrev">이전</a>
                    <h1>적립금</h1>
                    <a href="#" className="btnBasket">장바구니</a>
                </div>
            </div>

            <div id="content">
                <div className="use_point">
                    <div className="point">
                        <dl className="myPoint1">
                            <dt><strong>라차적립금</strong><span className="">사용 가능한<p>적립금</p></span></dt>
                            <dd>0</dd>
                        </dl>
                        <dl className="myPoint2">
                            <dt>소멸예정 적립금</dt>
                            <dd>0</dd>
                        </dl>
                    </div>
                </div>

                <form name="formSrch" id="formSrch" method="post">
                    <input type="hidden" name="srchMlaStatType" id="srchMlaStatType"/>

                    <div className="searchArea v1">
                        <ul className="term">
                            <li>
                                <a href="javascript:void(0);" data-value="50"
                                   // onClick="doMonthSearch(this);"
                                   onClick={(event) => doMonthSearch(event.currentTarget)}
                                   id="3month" className="selected">3개월</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" data-value="60"
                                   // onClick="doMonthSearch(this);"
                                   onClick={(event) => doMonthSearch(event.currentTarget)}
                                   id="6month">6개월</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" className="set">기간설정</a>
                            </li>
                        </ul>
                        <a href="#pointIntroPOP" className="top-btn full-pop-layer">적립금안내</a>
                        <div className="data-set v1 mgt_30">
                            <div className="tabArea mgt_10 mgb_30">
                                <ul className="tab v1">
                                    <li data-tab="tab1">
                                        <a href="javascript:void(0);" data-value="40" data-type="tab"
                                            // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >1개월</a>
                                    </li>
                                    <li data-tab="tab2">
                                        <a href="javascript:void(0);" data-value="50" data-type="tab"
                                            // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >3개월</a>
                                    </li>
                                    <li data-tab="tab3">
                                        <a href="javascript:void(0);" data-value="60" data-type="tab"
                                            // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >6개월</a>
                                    </li>
                                    <li data-tab="tab4" className="current">
                                        <a href="javascript:void(0);"
                                           data-value="70" data-type="tab"
                                            // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >기간설정</a>
                                    </li>
                                </ul>
                                <div id="tab4" className="tabcontent current">
                                    <div className="info_form">
                                        <dl className="inputArea">
                                            <dt className="hidden mgt_0">기간설정</dt>
                                            <dd>
                                                <p className="input_inline">
                                                    <span className="w100 mgt_10 vam">
                                                        <span className="input_cal v2">
                                                            <input type="text" id="strtDtm" name="strtDtm" readOnly="readonly"/>
                                                            <a href="javascript:void(0);" className="btnCal calendar-pop-layer"
                                                               onClick={(e) => create_calendar_layer_Pop("#strtDtm")}
                                                            >달력</a>
                                                        </span>
                                                        <span>~</span>
                                                        <span className="input_cal v3">
                                                            <input type="text" id="endDtm" name="endDtm" readOnly="readonly"/>
                                                            <a href="javascript:void(0);" className="btnCal calendar-pop-layer"
                                                               onClick={(e) => create_calendar_layer_Pop("#endDtm")}
                                                            >달력</a>
                                                        </span>
                                                    </span>
                                                </p>
                                            </dd>
                                        </dl>
                                        <a href="javascript:void(0);"
                                           // onClick="doSearch();"
                                           onClick={() => doList()}
                                           className="lbtn filled btn-large mgt_20"
                                           style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="tabArea2">
                    <div className="tab02 mgt_10">
                        <ul className="tab v1">
                            <li className="tabSub current" data-tab="pointTab">
                                <a href="javascript:void(0);" data-value="all"
                                   // onClick="doTab(this);"
                                   onClick={() => doTab(this)}
                                >전체</a>
                            </li>
                            <li className="tabSub" data-tab="pointTab">
                                <a href="javascript:void(0);" data-value="save"
                                    // onClick="doTab(this);"
                                   onClick={() => doTab(this)}
                                >적립</a>
                            </li>
                            <li className="tabSub" data-tab="pointTab">
                                <a href="javascript:void(0);" data-value="use"
                                    // onClick="doTab(this);"
                                   onClick={() => doTab(this)}
                                >사용</a>
                            </li>
                            <li className="tabSub" data-tab="pointTab">
                                <a href="javascript:void(0);" data-value="passing"
                                    // onClick="doTab(this);"
                                   onClick={() => doTab(this)}
                                >소멸</a>
                            </li>
                        </ul>
                    </div>
                    <div id="pointTab" className="tabcontent p0 current">
                        <div className="nodata empty-point">
                            <strong>적립금이 없습니다.</strong>
                        </div>
                        <div className="pointList">
                            <ul>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="pointIntroPOP" className="full-layer">
                    <div className="popWrap">
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1>적립금 안내</h1>
                                <a href="#" className="btnClose full-pop-close">닫기</a>
                            </div>
                        </div>
                        <div className="pop-cont">
                            <div className="pointIntro">
                                <div className="couponAdd" style={{padding: "15px"}}>
                                    <p><strong>적립금이란?</strong></p>
                                    <p>적립금은 일종의 사이버머니로 저희 온라인 몰 내에서 현금처럼 자유롭게 사용하실 수 있으며 적립금 지급 유형은 아래와 같습니다. </p>
                                    <p>· 상품 구매 시 지급되는 적립금 (대상 상품과 적립률이 상이하오니, 구매 시 반드시 확인해주시기 바랍니다.)</p>
                                    <p>· 각종 이벤트 참여 시 경품으로 지급되는 적립금</p>

                                    <p className="mgt_30"><strong>적립금 사용</strong></p>
                                    <p>· 적립금은 은 저희 쇼핑몰에서 상품 구매 시 사용 가능합니다</p>
                                    <p>· 1포인트 = 1원의 가치를 가지며 금액 제한 없이 사용할 수 있습니다.</p>
                                    <p>· 적립금은 현금 출금이 불가합니다.
                                        <span className="rafer-red mgb_0 mgt_10">단, 상품에 따라서 적립금 사용이 불가능한 경우가 있을 수 있습니다.</span>
                                    </p>
                                    <p className="mgt_30"><strong>적립금 유효기간 </strong></p>
                                    <p>· 상품 구매 적립금의 <span style={{color: "#ee5a5c!important"}}>유효기간은 적립 후 5년입니다.</span></p>
                                    <p>· 이벤트 참여 시 경품으로 지급되는 적립금의 유효기간은 해당 이벤트 공지에 따라 별도 지급 관리 됩니다. </p>
                                    <p>· 유효기간이 지난 적립금은 소멸되며, 사용이 불가합니다.</p>
                                    <p>· 적립금의 유효기간이 지난 후 상품구매를 취소한 경우 (취소, 환불, 반품 등) 적립금은 환불이 불가하며 소멸됩니다. </p>
                                    <p>· 소멸 예정 적립금은 30일 내로 유효기간이 만료되는 포인트입니다. </p>
                                    <p>· 적립금 내역이 상이할 경우, 고객센터 (02-568-1220) 및 1:1 게시판에 문의해 주세요. </p>
                                </div>
                            </div>
                            <div className="btnArea pdl_15 pdr_15">
                                <a href="#none" className="lbtn btn-large filled mgt_30 mgb_30 full-pop-close"
                                   style={{background: "#466cc2", border: "1px solid #466cc2"}}>확인</a>
                            </div>
                        </div>
                    </div>
                </div>

                <form name="formOrderDetail" id="formOrderDetail" method="post">
                    <input type="hidden" name="ordNo" id="ordNo"/>
                </form>
            </div>

            <div id="calendar-pop" className="popup-box">
                <div className="popWrap">
                    <a href="javascript:void(0);" className="pop-close layer-close">닫기</a>
                    <div className="pop-cont">
                        <DatePicker
                            id="ForeCAL_1"
                            onChange={onChange}
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

            <Footer/>
        </>
  );
}

export default App;
