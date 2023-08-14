import $ from 'jquery';
import {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import Footer from "./Footer";
import * as common from "./js/common";
import * as calendar from "./js/calendar";

function App() {
    useEffect(() => {
        setSearchDate('50', 'strtDtm', 'endDtm'); // 3개월 날짜 세팅
        doList();
        setCalendarLayerPopup();
    }, [])

    // 캘린더 팝업 열기
    function setCalendarLayerPopup() {
        $(document).on('click','.calendar-pop-layer', function(e) {
            var y = '';
            var m = '';
            var d = '';

            var inputName = $(this).closest("a").find("input").attr("name");
            var dateArray = $(this).closest("a").find("input").val().split("-");
            var defaultValueFlag = false;

            if(dateArray.length == 3){
                for(var i = 0; i < dateArray.length; i++){
                    if(dateArray[i].length == 0 ||isNaN(Number(dateArray[i]))){
                        defaultValueFlag = true;
                    }
                }
            }else{
                defaultValueFlag = true;
            }

            if(defaultValueFlag){
                var date = new Date(); // 날짜 객체 생성
                y = date.getFullYear(); // 현재 연도
                m = date.getMonth()+1; // 현재 월
                d = date.getDate(); // 현재 일
            }else{
                y = Number(dateArray[0]); // 현재 연도
                m = Number(dateArray[1]); // 현재 월
                d = Number(dateArray[2]); // 현재 일
            }
            calendar.create_calendar_layer_Pop(setCalendar(y,m,d,inputName));
            var $open_btn = $(this);
        });
    };

    // 캘린더 날짜 세팅하기
    function setCalendar(y,m,d,inputName){
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

        var month = m.toString().length < 2 ? "0" + m : m;

        var html = [];
        html.push("<div class='cal-layer' id='calendar-pop' style='left: 70px; top: 121px'>");
        html.push("<a href='javascript:changeCalendar(\"MONTH\", \"-\");' class='month-prev'><span class='hdn'>이전달</span></a>");
        html.push("<a href='javascript:changeCalendar(\"MONTH\", \"+\");' class='month-next'><span class='hdn'>다음달</span></a>");
        html.push("<div class='clearfix'>");
        html.push("<div class='datepicker'>");
        html.push("<div id='calendarInputName' style='display: none;'>"+inputName+"</div>");
        html.push("<div class='month'>");
        html.push("<a href='javascript:changeCalendar(\"YEAR\", \"-\");\' class='year-prev'><span class='hdn'>이전년도</span></a>");
        html.push("<a href='javascript:changeCalendar(\"MONTH\", \"-\");' class='month-prev'><span class='hdn'>이전달</span></a>");
        html.push("<span id='calendarYear'>"+y+"</span>.<span id='calendarMonth'>"+month+"</span>");
        html.push("<a href='javascript:changeCalendar(\"MONTH\", \"+\");' class='month-next'><span class='hdn'>다음달</span></a>");
        html.push("<a href='javascript:changeCalendar(\"YEAR\", \"+\");' class='year-next'><span class='hdn'>다음년도</span></a>");
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
                            html.push("<td><div class='day sun' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'><span class='picker'>" + dNum + "</span></div></td>");
                        }else{
                            html.push("<td><div class='day sun' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }
                    }else if(k == 7){
                        if(dNum == d){
                            html.push("<td><div class='day' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'><span class='picker'>" + dNum + "</span></div></td>");
                        }else{
                            html.push("<td><div class='day sat' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'>" + dNum + "</div></td>");
                        }
                    }else{
                        if(dNum == d){
                            html.push("<td><div class='day' onClick='setCalendarDate(\""+inputName+"\",\""+y+"-"+month+"-"+strdNum+"\")'><span class='picker'>" + dNum + "</span></div></td>");
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

        html.push("</div>");
        html.push("<button type='button' class='btn btn-middle btn-filled-second mgt_20 w100 pop-close'>닫기</button>");
        html.push("</div>");
        html.push("</div>");

        return html.join("");
    };

    common.layer_Pop();

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
            term = parseInt(term);
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

    // 쿠폰 조회하기
    function doSearch(cpnUseCd) {
        $("#pageNo").val(1);
        if(typeof(cpnUseCd) != "undefined"){
            $("input[name=cpnUseCd]").val(cpnUseCd);
        }
        doList();
    }
    function doList() {
        $(".result-term").html("<span>조회기간</span>"+$("#strtDtm").val()+" ~ "+$("#endDtm").val());

        var cpnUseCd = $("input[name=cpnUseCd]").val();

        if(cpnUseCd == "30"){
            $("#cpnUseCd10").removeClass("on");
            $("#cpnUseCd30").addClass("on");
            $("input[name=cpnUseCd]").val("30");
        }else{
            $("#cpnUseCd10").addClass("on");
            $("#cpnUseCd30").removeClass("on");
            $("input[name=cpnUseCd]").val("10");
        }

        $.ajax({
            url : '/mypage/s_MyPageCouponList.do',
            data : $("#formSrch").serialize(),
            dataType : 'html',
            type : 'post',
            success:function(data) {
                $("#couponList").html(data);
            },
            error:function(data) {
                alert("시스템 장애입니다. 잠시후에 다시 시도해 주십시요.");
            }
        });
    }

    // 쿠폰 등록하기
    function couponIssu(){
        var cpnNoInpt = $("#cpnNoInpt").val();

        if(cpnNoInpt != ""){
            var params = {
                cpnNoInpt : cpnNoInpt
            }

            $.ajax({
                type : "POST",
                url : "/mypage/s_insertMyPageCouponIssu.do",
                data : params,
                dataType : "json",
                success : function(data){
                    if(data.result == "0000"){
                        common.cmnAlertLayer('btn1','쿠폰이 발행되었습니다.');
                    }else if(data.result == "0100"){
                        common.cmnAlertLayer('btn1','쿠폰 발급 횟수를 초과하였습니다.');
                    }else if(data.result == "0200"){
                        common.cmnAlertLayer('btn1','쿠폰 발급 횟수를 초과하였습니다.');
                    }else if(data.result == "0300"){
                        common.cmnAlertLayer('btn1','쿠폰 발행 날짜를 확인해주세요.');
                    }else if(data.result == "0400"){
                        common.cmnAlertLayer('btn1','쿠폰 번호를 확인해주세요.');
                    }else if(data.result == "0500"){
                        common.cmnAlertLayer('btn1','발급 가능한 쿠폰이 아닙니다.');
                    }else{
                        common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                    }
                    doSearch();
                }
            });
        }else{
            common.cmnAlertLayer('btn1','쿠폰 번호를 입력해주세요.');
        }
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="/mypage" className="btnPrev">이전</a>
                    <h1>쿠폰</h1>
                </div>
            </div>

            <div id="content">
                <form method="post" name="formSrch" id="formSrch">
                    <input type="hidden" name="limit" id="limit" value="6"/>
                    <input type="hidden" name="pageNo" id="pageNo" value="1"/>
                    <input type="hidden" name="cpnNo" id="cpnNo"/>
                    <input type="hidden" name="cpnUseCd" id="cpnUseCd" value="10"/>

                    <div className="searchArea v1">
                        <ul className="term">
                            <li><a // href="javascript:void(0);"
                                   data-value="50"
                                   // onClick="doMonthSearch(this);"
                                   onClick={(event) => doMonthSearch(event.currentTarget)}
                                   id="3month">3개월</a></li>
                            <li><a // href="javascript:void(0);"
                                   data-value="60"
                                   // onClick="doMonthSearch(this);"
                                   onClick={(event) => doMonthSearch(event.currentTarget)}
                                   id="6month">6개월</a></li>
                            <li><a // href="javascript:void(0);"
                                   className="set">기간설정</a></li>
                        </ul>

                        <a href="#couponAddPOP" className="top-btn pop-layer">쿠폰등록</a>
                        <div className="data-set v1 mgt_30">
                            <div className="rafer">조회기준 : 쿠폰등록일</div>
                            <div className="tabArea mgt_10 mgb_30">
                                <ul className="tab v1">
                                    <li data-tab="tab1">
                                        <a // href="javascript:void(0);"
                                           data-value="40" data-type="tab"
                                           // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >1개월</a>
                                    </li>
                                    <li data-tab="tab2">
                                        <a // href="javascript:void(0);"
                                           data-value="50" data-type="tab"
                                           // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >3개월</a>
                                    </li>
                                    <li data-tab="tab3">
                                        <a // href="javascript:void(0);"
                                           data-value="60" data-type="tab"
                                           // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >6개월</a>
                                    </li>
                                    <li data-tab="tab4" className="current">
                                        <a // href="javascript:void(0);"
                                           data-value="70" data-type="tab"
                                           // onClick="doMonthSearch(this);"
                                           onClick={(event) => doMonthSearch(event.currentTarget)}
                                        >기간설정</a>
                                    </li>
                                </ul>
                                <div id="tab1" className="tabcontent current">
                                    <div className="info_form">
                                        <dl className="inputArea">
                                            <dt className="hidden mgt_0">기간설정</dt>
                                            <dd>
                                                <p className="input_inline">
                                                    <span className="w100 mgt_10 vam">
                                                        <span className="input_cal v2">
                                                            <input type="text" id="strtDtm" name="strtDtm" readOnly="readonly"/>
                                                            <a // href="javascript:void(0);"
                                                               className="btnCal calendar-pop-layer"
                                                                onClick={() => calendar.create_calendar_layer_Pop("#strtDtm")}
                                                            >달력</a>
                                                        </span>
                                                        <span>~</span>
                                                        <span className="input_cal v3">
                                                            <input type="text" id="endDtm" name="endDtm" readOnly="readonly"/>
                                                            <a // href="javascript:void(0);"
                                                               className="btnCal calendar-pop-layer"
                                                               onClick={() => calendar.create_calendar_layer_Pop("#endDtm")}
                                                            >달력</a>
                                                        </span>
                                                    </span>
                                                </p>
                                            </dd>
                                        </dl>
                                        <a // href="javascript:void(0);"
                                           className="lbtn filled btn-large mgt_20"
                                           style={{background: "#466cc2", border: "1px solid #466cc2"}}
                                           // onClick="doSearch();"
                                           onClick={() => doSearch()}
                                        >조회</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="tabArea2">
                    <div className="tab02 mgt_10">
                        <ul className="tab">
                            <li className="current" data-tab="couponList">
                                <a // href="javascript:doSearch('10');"
                                    // href="javascript:void(0);"
                                    onClick={() => doSearch('10')}
                                    id="cpnUseCd10" className="type1 on">사용가능</a>
                            </li>
                            <li className="" data-tab="couponList">
                                <a // href="javascript:doSearch('30');"
                                    // href="javascript:void(0);"
                                    onClick={() => doSearch('30')}
                                    id="cpnUseCd30" className="type2">사용완료/만료</a>
                            </li>
                        </ul>
                    </div>
                    <div id="couponList" className="tabcontent current">
                        <div className="couponArea">
                            <div className="im-coupon">사용가능 쿠폰 <span>0</span>장</div>
                            <div className="nodata empty-c"><strong>쿠폰이 없습니다.</strong></div>
                        </div>

                        <div id="pagingList" className="pagination">
                        </div>
                    </div>
                </div>

                <div id="couponAddPOP" className="popup-box">
                    <div className="popWrap">
                        <a // href="javascript:void(0);"
                           className="pop-close layer-close">닫기</a>
                        <div className="pop-tit">쿠폰(프로모션) 등록</div>
                        <div className="pop-cont">
                            <div className="couponAdd">
                                <p className="mgb_20">보유하고 계신 쿠폰( 프로모션) 코드를 등록하시면 결제 시 할인율 적용 받으실 수 있습니다. </p>
                                <div className="info_form">
                                    <div className="inputArea">
                                        <p className="input_inline">
                                            <input id="cpnNoInpt" name="cpnNoInpt" type="text" className="mgr_5"
                                                   placeholder="등록하실 쿠폰 번호 입력"/>
                                            <a // href="javascript:void(0);"
                                               // onClick="couponIssu();"
                                               onClick={() => couponIssu()}
                                               className="mbtn lbtn filled btn-large "
                                               style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}>쿠폰등록</a>
                                        </p>
                                    </div>
                                </div>
                                <p className="mgt_10">
                                    <span className="rafer-red">
                                        쿠폰 코드 1종류 당 1회만 입력 가능합니다.<br/>
                                        등록한 쿠폰의 사용가능기간을 꼭 확인해 주세요.
                                    </span>
                                </p>
                            </div>
                            <div className="btnArea mgt_20">
                                <a // href="#none"
                                   className="lbtn btn-large filled"
                                   // onClick="couponIssu();"
                                   onClick={() => couponIssu()}
                                   style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}>확인</a>
                            </div>
                        </div>
                    </div>
                </div>
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
                        <a href="#" className="btm-layer-btn mgt_25 pop-close">닫기</a>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
  );
}

export default App;
