import {useEffect, useState, useRef} from "react";
import $ from 'jquery';
import {ko} from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import Slider from 'rc-slider';
import * as common from './js/common';
import * as custom from './js/custom';
import 'rc-slider/assets/index.css';
// import './css/MyPage.css';
import './css/common.css';
import './css/search-content.css';
import './css/ReactRangeSlider.css';
import Footer from "./Footer";

function MyPage() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const country = [
        {kor : "국내", eng : "KOR", list : [
                {kor: "김포", eng: "GMP"},
                {kor: "인천", eng: "ICN"},
                {kor: "서울", eng: "SEL"},
                {kor: "제주", eng: "CJU"},
                {kor: "울산", eng: "USN"},
                {kor: "부산", eng: "PUS"},
                {kor: "대구", eng: "TAE"},
                {kor: "여수", eng: "RSU"},
                {kor: "광주", eng: "KWJ"},
            ]},
        {kor : "일본", eng : "JPN", list : [
                {kor: "도쿄", eng: "TYO"},
                {kor: "오사카", eng: "OSA"},
                {kor: "후쿠오카", eng: "FUK"},
                {kor: "삿포로", eng: "SPK"},
                {kor: "오키나와", eng: "OKA"},
                {kor: "나고야", eng: "NGO"},
                {kor: "미야자키", eng: "KMI"},
                {kor: "가고시마", eng: "KOJ"},
                {kor: "센다이", eng: "SDJ"},
            ]},
        {kor : "홍콩/대만/중국", eng : "CHI", list : [
                {kor: "상해/푸동", eng: "PVG"},
                {kor: "상해/홍차오", eng: "SHA"},
                {kor: "북경", eng: "BJS"},
                {kor: "청도", eng: "TAO"},
                {kor: "하얼빈", eng: "HRB"},
                {kor: "위해", eng: "WEH"},
                {kor: "광주", eng: "CAN"},
                {kor: "홍콩", eng: "HKG"},
                {kor: "타이페이", eng: "TPE"},
                {kor: "마카오", eng: "MFM"},
            ]},
        {kor : "아시아", eng : "ASIA", list : [
                {kor: "방콕", eng: "BKK"},
                {kor: "세부", eng: "CEB"},
                {kor: "발리", eng: "DPS"},
                {kor: "다낭", eng: "DAD"},
                {kor: "하노이", eng: "HAN"},
                {kor: "호치민", eng: "SGN"},
                {kor: "싱가포르", eng: "SIN"},
                {kor: "코타키나발루", eng: "BKI"},
                {kor: "나트랑/캄란", eng: "CXR"},
                {kor: "쿠알라룸푸르", eng: "KUL"},
            ]},
        {kor : "미주", eng : "AMCA", list : [
                {kor: "뉴욕/존에프케네디", eng: "JFK"},
                {kor: "로스앤젤레스", eng: "LAX"},
                {kor: "샌프란시스코", eng: "SFO"},
                {kor: "하와이/호놀룰루", eng: "HNL"},
                {kor: "토론토", eng: "YTO"},
                {kor: "밴쿠버", eng: "YVR"},
                {kor: "시애틀", eng: "SEA"},
                {kor: "시카고", eng: "CHI"},
                {kor: "애틀랜타", eng: "ATL"},
                {kor: "라스베가스", eng: "LAS"},
                {kor: "댈러스", eng: "DFW"},
            ]},
        {kor : "유럽", eng : "EUR", list : [
                {kor: "파리", eng: "PAR"},
                {kor: "런던", eng: "LON"},
                {kor: "로마", eng: "ROM"},
                {kor: "밀라노", eng: "MIL"},
                {kor: "프라하", eng: "PRG"},
                {kor: "이스탄불", eng: "IST"},
                {kor: "바르셀로나", eng: "BCN"},
                {kor: "프랑크푸르트", eng: "FRA"},
                {kor: "블라디보스토크", eng: "VVO"},
                {kor: "취리히", eng: "ZRH"},
                {kor: "암스테르담", eng: "AMS"},
            ]},
        {kor : "대양주", eng : "SOPA", list : [
                {kor: "시드니", eng: "SYD"},
                {kor: "오클랜드", eng: "AKL"},
                {kor: "브리즈번", eng: "BNE"},
                {kor: "멜버른", eng: "MEL"},
                {kor: "괌", eng: "GUM"},
                {kor: "사이판", eng: "SPN"},
                {kor: "코로르/팔라우", eng: "ROR"},
                {kor: "타히티", eng: "PPT"},
            ]},
        {kor : "중동", eng : "MID", list : [
                {kor: "두바이", eng: "DXB"},
            ]},
        {kor : "중남미", eng : "CSAM", list : [
                {kor: "멕시코시티", eng: "MEX"},
                {kor: "상파울로/과를류스", eng: "GRU"},
                {kor: "칸쿤", eng: "CUN"},
            ]},
    ];
    const airline = [
        {kor: "스타얼라이언스", id: "cbx_airline_0", list: [
            {kor: "에어캐나다", eng: "AC", id: "cbx_airline_0_chk2",},
            {kor: "유나이티드", eng: "UA", id: "cbx_airline_0_chk3",},
            {kor: "아시아나항공", eng: "OZ", id: "cbx_airline_0_chk10",},
            {kor: "LOT 폴란드 항공", eng: "LO", id: "cbx_airline_0_chk11",},
            {kor: "터키항공", eng: "TK", id: "cbx_airline_0_chk17",},
            {kor: "에바항공", eng: "BR", id: "cbx_airline_0_chk25",},
        ]},
        {kor: "스카이팀", id: "cbx_airline_1", list: [
            {kor: "대한항공", eng: "KE", id: "cbx_airline_1_chk1",},
            {kor: "델타항공", eng: "DL", id: "cbx_airline_1_chk3",},
            {kor: "에어프랑스", eng: "AF", id: "cbx_airline_1_chk4",},
            {kor: "KLM네덜란드항공", eng: "KL", id: "cbx_airline_1_chk6",},
            {kor: "중화항공", eng: "CI", id: "cbx_airline_1_chk13",},
        ]},
        {kor: "원월드", id: "chk_airline_2", list: [
            {kor: "핀에어", eng: "AY", id: "cbx_airline_2_chk5",},
            {kor: "일본항공", eng: "JL", id: "cbx_airline_2_chk7",},
            {kor: "카타르항공", eng: "QR", id: "cbx_airline_2_chk10",},
        ]},
        {kor: "기타", id: "chk_airline_6", list: [
            {kor: "에티하드항공", eng: "EY",id: "cbx_airline_6_chk0",},
            {kor: "필리핀항공", eng: "PR", id: "cbx_airline_6_chk1",},
            {kor: "에미레이트항공", eng: "EK", id: "cbx_airline_6_chk2",},
        ]},
    ];
    const sortTypeList = [
        {kor: "가격 낮은 순", eng: "priceLow"},
        {kor: "가격 높은 순", eng: "priceHigh"},
        {kor: "총 비행시간 짧은 순", eng: "lowFlightTime"},
        {kor: "총 비행시간 긴 순", eng: "highFlightTime"},
        {kor: "가는편 출발시간 빠른 순", eng: "fastStart"},
        {kor: "오는편 출발시간 빠른 순", eng: "fastArrive"},
        {kor: "경유 적은 순", eng: "lowWayPoint"},
    ]

    const comma = (str) => {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    const time = (str) => {
        let padTime = String(str).padStart(4, '0');
        let hour = padTime.substr(0, 2);
        let min = padTime.substr(2, 2);
        if (min >= '60') {
            min = '00';
            hour = (hour * 1) + 1 + "";
            hour = hour.padStart(2, '0');
        }

        if (hour >= '24') {
            hour = '24';
        }

        return hour + ":" + min;
    }
    const timeSlider = (str) => {
        let padTime = String(str).padStart(4, '0');
        let hour = padTime.substr(0, 2);
        let min = padTime.substr(2, 2);
        if (min >= '60') {
            min = '00';
            hour = (hour * 1) + 1 + "";
            hour = hour.padStart(2, '0');
        }

        return hour + ":" + min;
    }

    let temp;
    let calendarType;
    let calendarImgVal;
    // let selectCalendarF = null;
    // let selectCalendarS = null;
    const [selectCalendarF, setSelectCalendarF] = useState(null);
    const [selectCalendarS, setSelectCalendarS] = useState(null);
    let selectCalendar0 = null;
    let selectCalendar1 = null;
    let selectCalendar2 = null;
    let selectCalendar3 = null;
    let multiGenId = 1;
    let useFilter = false;
    let lowCostValue = 0;
    let highCostValue = 0;
    let timeStartValue = [0, 9900];
    let timeArrvValue = [0, 9900];
    const timeInitValue = [0, 2400];
    const filterObject = new Object();

    // $('.pop-again').on('click', function(){
    const showPopup = () => {
        if( $('.pop-again').length === 1 ) {
            $('.top-sheet-order.sort').eq(0).addClass('active');
            $('.top-sheet-order.sort').eq(1).removeClass('active');
        } else if( $('.pop-again').length >= 2) {
            $('.top-sheet-order.sort').eq(1).addClass('active');
        } else {
            $('.top-sheet-order.sort').removeClass('active');
        }
        $('.pop-again').hide();
        $('.btnUpagain').show();
    }
    // });
    // $('.btnUpagain').on('click', function(){
    const hiddenPopup = () => {
        $('.top-sheet-order.sort').removeClass('active');
        $('#dimmd-layer2').remove();
        $('.pop-again').show();
        $('.btnUpagain').hide();
    }
    // });

    // $('.pop-sort').on('click', function(){
    const showSortPopup = () => {
        if( $('.pop-sort').length === 1 ) {
            $('.bottom-sheet-order.sort').eq(0).addClass('active');
            $('.bottom-sheet-order.sort').eq(1).removeClass('active');
        } else if( $('.pop-sort').length >= 2) {
            $('.bottom-sheet-order.sort').eq(1).addClass('active');
        } else {
            $('.bottom-sheet-order.sort').removeClass('active');
        }
    }
    // });

    // $('.bottom-sheet-order .btn-close').on('click', function(){
    const hiddenSortPopup = () => {
        $('.bottom-sheet-order.sort').removeClass('active');
        $("#dimmd-layer").remove();
    }
    // });

    // $('.btn-goods-more').on('click', function(){
    //     $('.goods-explan').toggleClass('active');
    //     console.log( $('.btn-goods-more').find('>span').text() );
    //     $('.btn-goods-more').find('>span').text( $('.btn-goods-more').find('>span').text() === '접기' ? '펼쳐보기' : '접기' )
    // });

    // $("#slider-range").slider({
    //     range: true,
    //     orientation: "horizontal",
    //     min: 0,
    //     max: 9999900,
    //     values: [0, 9999900],
    //     step: 100,
    //
    //     slide: function(event, ui) {
    //         if (ui.values[0] == ui.values[1]) {
    //             return false;
    //         }
    //
    //         $("#min_price").val(comma(ui.values[0]));
    //         $("#max_price").val(comma(ui.values[1]));
    //     }
    // });
    //
    // $("#min_price").val(comma($("#slider-range").slider("values", 0)));
    // $("#max_price").val(comma($("#slider-range").slider("values", 1)));
    //
    // $("#start").slider({
    //     range: true,
    //     orientation: "horizontal",
    //     min: 0,
    //     max: 2359,
    //     values: [0, 2400],
    //     step: 1,
    //
    //     slide: function(event, ui) {
    //         if (ui.values[0] == ui.values[1]) {
    //             return false;
    //         }
    //
    //         $("#min_start").val(time(ui.values[0]));
    //         $("#max_start").val(time(ui.values[1]));
    //     }
    // });
    //
    // $("#min_start").val(time($("#start").slider("values", 0)));
    // $("#max_start").val(time($("#start").slider("values", 1)));
    //
    // $("#arrive").slider({
    //     range: true,
    //     orientation: "horizontal",
    //     min: 0,
    //     max: 2359,
    //     values: [0, 2400],
    //     step: 1,
    //
    //     slide: function(event, ui) {
    //         if (ui.values[0] == ui.values[1]) {
    //             return false;
    //         }
    //
    //         $("#min_arrive").val(time(ui.values[0]));
    //         $("#max_arrive").val(time(ui.values[1]));
    //     }
    // });
    //
    // $("#min_arrive").val(time($("#arrive").slider("values", 0)));
    // $("#max_arrive").val(time($("#arrive").slider("values", 1)));
    //
    // $("#start_time").slider({
    //     range: true,
    //     orientation: "horizontal",
    //     min: 0,
    //     max: 9900,
    //     values: timeStartValue,
    //     step: 1,
    //
    //     slide: function(event, ui) {
    //         if (ui.values[0] == ui.values[1]) {
    //             return false;
    //         }
    //
    //         $("#min_start_time").val(time(ui.values[0]));
    //         $("#max_start_time").val(timeSlider(ui.values[1]));
    //     }
    // });
    //
    // $("#min_start_time").val(time($("#start_time").slider("values", 0)));
    // $("#max_start_time").val(timeSlider($("#start_time").slider("values", timeStartValue[1])));
    //
    // $("#arrive_time").slider({
    //     range: true,
    //     orientation: "horizontal",
    //     min: 0,
    //     max: 9900,
    //     values: timeArrvValue,
    //     step: 1,
    //
    //     slide: function(event, ui) {
    //         if (ui.values[0] == ui.values[1]) {
    //             return false;
    //         }
    //
    //         $("#min_arrive_time").val(time(ui.values[0]));
    //         $("#max_arrive_time").val(timeSlider(ui.values[1]));
    //     }
    // });
    //
    // $("#min_arrive_time").val(time($("#arrive_time").slider("values", 0)));
    // $("#max_arrive_time").val(timeSlider($("#arrive_time").slider("values", timeArrvValue[1])));

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const dateFormat = (date) => {
        const month = (date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        const dateStr = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "." + month + "." + dateStr;
    }
    const onChange = (dates) => {
        let start, end;
        if (dates.length == 2) [start, end] = dates;
        else {
            start = dates;
            end = null;
        }

        setStartDate(start);
        setEndDate(end);

        if (start != null) {
            // selectCalendarF = dateFormat(start).replaceAll(".", "");
            setSelectCalendarF(dateFormat(start).replaceAll(".", ""));
            $('#CAL_START + dd').addClass('select');
            $('#CAL_START + dd > a').text(dateFormat(start));
        }
        else {
            // selectCalendarF = null;
            setSelectCalendarF(null);
            $('#CAL_START + dd').removeClass('select');
            $('#CAL_START + dd > a').text('날짜 선택');
        }

        if (end != null) {
            // selectCalendarS = dateFormat(end).replaceAll(".", "");
            setSelectCalendarS(dateFormat(end).replaceAll(".", ""));
            $('#CAL_END + dd').addClass('select');
            $('#CAL_END + dd > a').text(dateFormat(end));
        }
        else {
            // selectCalendarS = null;
            setSelectCalendarS(null);
            $('#CAL_END + dd').removeClass('select');
            $('#CAL_END + dd > a').text('날짜 선택');
        }

        console.log(selectCalendarF, selectCalendarS);

        if (!selectsRange) setFromToVal();
        // if (!selectsRange) closeCalendar();
    };


    const [selectedMultiCalendar, setSelectedMultiCalendar] = useState(null);
    const [selectedMultiDate, setSelectedMultiDate] = useState(null);
    const [multiDate, setMultiDate] = useState({
        selectCalendar0: null,
        selectCalendar1: null,
        selectCalendar2: null,
        selectCalendar3: null,
    });
    const [multiDateStr, setMultiDateStr] = useState({
            selectCalendar0: null,
            selectCalendar1: null,
            selectCalendar2: null,
            selectCalendar3: null,
    });
    const multiTravelDateSetChange = (dates) => {
        setSelectedMultiDate(dates);

        const targetId = "selectCalendar" + selectedMultiCalendar.split("_")[2];
        const targetStr = dateFormat(dates).replaceAll(".", "");
        setMultiDate({...multiDate, [targetId]: dates});
        setMultiDateStr({...multiDateStr, [targetId]: targetStr});
    };

    const searchForeCityCode = () => {
        var inputWord = $("#searchForeWord").val();
        const dataObject = {
            keyword: $("#searchForeWord").val()
        }
        // controller.ajaxSend({
        //     url : "/foreign/reserve/CitySearch.json"
        //     ,type : "post"
        //     ,dataType : "json"
        //     ,data : dataObject
        //     ,successCall : function(data) {
        //         viewChange(false);
        //         const searchList = data.searchResult;
        //         const target = document.getElementById("searchTarget");
        //         for (var i = 0; i < searchList.length; i++) {
        //             let liEl = document.createElement("li");
        //             liEl.setAttribute("onclick", "setForeList(this)");
        //             let spanEl1 = document.createElement("span");
        //             spanEl1.className = "airport";
        //             spanEl1.innerText = searchList[i].cityCd;
        //             liEl.appendChild(spanEl1);
        //             let spanEl2 = document.createElement("span");
        //             spanEl2.style.display = "none";
        //             spanEl2.innerText = searchList[i].cityInfo.split(',')[1];
        //             liEl.appendChild(spanEl2);
        //             let spanEl3 = document.createElement("span");
        //             spanEl3.innerText = searchList[i].cityInfo;
        //             liEl.appendChild(spanEl3);
        //             target.appendChild(liEl);
        //         }
        //     }
        //     , error:function(data) {
        //         cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
        //         return;
        //     }
        // });
    }
    const setClickDataVal = (selectVal) => {
        var checkVal = "" + selectVal;
        if (calendarType == 0) {
            var rtnString = checkVal.substr(0,4) + "." + checkVal.substr(4,2) + "." + checkVal.substr(6,2);
            $(popupOpenElement).text(rtnString);
            $(popupOpenElement).addClass("select");
            $(popupOpenElement).removeClass("dimColor");

            closeCalendar();
        } else if (calendarType == 1) {
            if (selectCalendarF == null && selectCalendarS == null) {
                // selectCalendarF = selectVal;
                setSelectCalendarF(selectVal);
                var htmlText = "<span class='picker'>" + $(".calendarArea").find("#calendar_" + selectVal).find("div").text() + "</span>";
                $(".calendarArea").find("#calendar_" + selectVal).find("div").html(htmlText);
            }
            else if (selectCalendarF != null && selectCalendarS == null) {
                // selectCalendarS = selectVal;
                setSelectCalendarS(selectVal);

                if (parseInt(selectCalendarS) > parseInt(selectCalendarF)) {
                    var d_date = "" + selectCalendarF;
                    var a_date = "" + selectCalendarS;
                    d_date = d_date.substr(0,4) + "." + d_date.substr(4,2) + "." + d_date.substr(6,2);
                    a_date = a_date.substr(0,4) + "." + a_date.substr(4,2) + "." + a_date.substr(6,2);
                    $("#CALENDAR_D_DATE").closest("dd").addClass("select");
                    $("#CALENDAR_A_DATE").closest("dd").addClass("select");
                    $("#CALENDAR_D_DATE").text(d_date);
                    $("#CALENDAR_A_DATE").text(a_date);
                    // 달력 시작 종료 그리기
                    calendarFromTo();
                } else if (parseInt(selectCalendarS) == parseInt(selectCalendarF)) {
// 						if (calendarImgVal == '1') {
// 							cmnAlertLayer("", "가는날과 오는날은 다른날로 선택해 주세요.");
// 						} else if (calendarImgVal == '2') {
// 							cmnAlertLayer("", "체크인과 체크아웃은 다른날로 선택해 주세요.");
// 						}
                    if (calendarImgVal == '2') {
                        cmnAlertLayer("", "체크인과 체크아웃은 다른날로 선택해 주세요.");
                    } else {
                        var d_date = "" + selectCalendarF;
                        var a_date = "" + selectCalendarS;
                        d_date = d_date.substr(0,4) + "." + d_date.substr(4,2) + "." + d_date.substr(6,2);
                        a_date = a_date.substr(0,4) + "." + a_date.substr(4,2) + "." + a_date.substr(6,2);
                        $("#CALENDAR_D_DATE").closest("dd").addClass("select");
                        $("#CALENDAR_A_DATE").closest("dd").addClass("select");
                        $("#CALENDAR_D_DATE").text(d_date);
                        $("#CALENDAR_A_DATE").text(a_date);
                        // 달력 시작 종료 그리기
                        calendarFromTo();
                    }
                } else if (parseInt(selectCalendarS) < parseInt(selectCalendarF)) {
                    var changeVal = selectCalendarF;
                    // selectCalendarF = selectCalendarS;
                    // selectCalendarS = changeVal;
                    setSelectCalendarF(selectCalendarS);
                    setSelectCalendarS(changeVal);

                    var d_date = "" + selectCalendarF;
                    var a_date = "" + selectCalendarS;
                    d_date = d_date.substr(0,4) + "." + d_date.substr(4,2) + "." + d_date.substr(6,2);
                    a_date = a_date.substr(0,4) + "." + a_date.substr(4,2) + "." + a_date.substr(6,2);
                    $("#CALENDAR_D_DATE").closest("dd").addClass("select");
                    $("#CALENDAR_A_DATE").closest("dd").addClass("select");
                    $("#CALENDAR_D_DATE").text(d_date);
                    $("#CALENDAR_A_DATE").text(a_date);
                    // 달력 시작 종료 그리기
                    calendarFromTo();
                }
            } else if (selectCalendarF != null && selectCalendarS != null) {
                $("#CALENDAR_D_DATE").closest("dd").removeClass("select");
                $("#CALENDAR_A_DATE").closest("dd").removeClass("select");
                $("#CALENDAR_D_DATE").text("날짜 선택");
                $("#CALENDAR_A_DATE").text("날짜 선택");

                // 표시 클래스 삭제
                $(".calendarArea").find(".picker").each(function() {
                    var textVal = $(this).text();
                    $(this).closest("div").html(textVal);
                });
                $(".picker-txt").remove();
                $(".bg-select-first").removeClass("bg-select-first");
                $(".bg-select").removeClass("bg-select");
                $(".bg-select-last").removeClass("bg-select-last");

                // selectCalendarF = null;
                // selectCalendarS = null;
                setSelectCalendarF(null);
                setSelectCalendarS(null)
            }
        }
    }
    const calendarFromTo = () => {
        if (selectCalendarF != selectCalendarS) {
            var d_date = "" + selectCalendarF;
            var a_date = "" + selectCalendarS;

            // 가는날
            $(".calendarArea").find("#calendar_" + d_date).find("div").addClass("bg-select-first");
            var d_htmlText = "<span class='picker'>" + parseInt(d_date.substr(6,2)) + "</span>";
            $(".calendarArea").find("#calendar_" + d_date).find("div").html(d_htmlText);
            if (calendarImgVal == '1') {
                $(".calendarArea").find("#calendar_" + d_date).append("<div class='picker-txt'>가는날</div>");
            } else if (calendarImgVal == '2') {
                $(".calendarArea").find("#calendar_" + d_date).append("<div class='picker-txt'>체크인</div>");
            }
            // 오는날
            $(".calendarArea").find("#calendar_" + a_date).find("div").addClass("bg-select-last");
            var a_htmlText = "<span class='picker'>" + parseInt(a_date.substr(6,2)) + "</span>";
            $(".calendarArea").find("#calendar_" + a_date).find("div").html(a_htmlText);
            if (calendarImgVal == '1') {
                $(".calendarArea").find("#calendar_" + a_date).append("<div class='picker-txt'>오는날</div>");
            } else if (calendarImgVal == '2') {
                $(".calendarArea").find("#calendar_" + a_date).append("<div class='picker-txt'>체크아웃</div>");
            }

            d_date = parseInt(d_date);
            a_date = parseInt(a_date);

            $("[id^=calendar_]").each(function() {
                var id_text = parseInt($(this).attr("id").split("_")[1]);
                if (id_text > d_date && id_text < a_date) {
                    $(this).find("div").addClass("bg-select");
                }
            });
        } else {
            var d_date = "" + selectCalendarF;

            // 가는날
            var d_htmlText = "<span class='picker'>" + parseInt(d_date.substr(6,2)) + "</span>";
            $(".calendarArea").find("#calendar_" + d_date).find("div").html(d_htmlText);
            $(".calendarArea").find("#calendar_" + d_date).append("<div class='picker-txt'>선택일</div>");
        }
    }

    const foreignAirWayTypeList = {
        0: {type: "RT", id: "AIR_FORE_TAB_1", kor: "왕복"},
        1: {type: "OW", id: "AIR_FORE_TAB_2", kor: "편도"},
        2: {type: "MT", id: "AIR_FORE_TAB_3", kor: "다구간"},
    };
    const [foreignAirWayType, setForeignAirWayType] = useState(0);
    const setForeignAirWayTypeFunction = (element, ord) => {
        const targetId = element.nodeName === "LI" ? element.id : element.parentNode.id;

        $("#" + targetId).closest(".tab").find("li").removeClass("current");
        $("#" + targetId).addClass("current");

        if (ord == 0) {
            $("#AIR_FORE_DATASEL").find("dl").eq(1).show();
            $("#AIR_FORE_DATASEL").removeClass("v1");
            $("#AIR_FORE_DATASEL").addClass("v2");
            // $("#AIR_FORE_DATASEL").find("dl").eq(1).find("dd").removeClass("select");
            // $("#AIR_FORE_DATASEL").find("dl").eq(1).find("dd").text("날짜 선택");
        } else if (ord == 1) {
            $("#AIR_FORE_DATASEL").find("dl").eq(1).hide();
            $("#AIR_FORE_DATASEL").removeClass("v2");
            $("#AIR_FORE_DATASEL").addClass("v1");
            // $("#AIR_FORE_DATASEL").find("dl").eq(1).find("dd").removeClass("select");
            // $("#AIR_FORE_DATASEL").find("dl").eq(1).find("dd").text("날짜 선택");
        }

        if (ord == 2) {
            $("#useMulti").show();
            $("#noneMulti").hide();
            $("#foreTravelAdd").show();
        } else {
            $("#useMulti").hide();
            $("#noneMulti").show();
            $("#foreTravelAdd").hide();
        }
    }

    const openCity = (evt, cityName) => {
        var i, cityTabcontent, tablinks;
        cityTabcontent = document.getElementsByClassName("cityTabcontent");
        for (i = 0; i < cityTabcontent.length; i++) {
            cityTabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        // evt.currentTarget.className += " active";
        evt.className += " active";
    }

    const [popupOpenElement, setPopupOpenElement] = useState();
    const foreOpenAirStation = (element, txt) => {
        // popupOpenelement = element;
        setPopupOpenElement(element);
        $("#foreAirStationHeader").text(txt);
        $("section").hide();
        $("#mainHeader").hide();
        $("#footer").hide();
        $("#reSelectPop").hide();
        $("#content").hide();

        $(".foreAirStationArea").show();
        $("#airStationSearch").val('');
        $(".foreAirStationArea").find("li").show();
        $("#foreHeader").addClass("center");

        if($(element).attr("id") == "AIR_whereDepCity") {
            $("#foreInputArea").val("departCity");
            // airLine("");
        } else {
            $("#foreInputArea").val("arrivelCity");
        }
    }
    const closeForeAirStation = () => {
        $("section").show();
        $("#mainHeader").show();
        $("#footer").show();
        $("#reSelectPop").show();
        $("#content").show();

        $(".foreAirStationArea").hide();
    }

    const setForeList = (element) => {
        const currentType = $("#travelType").find(".current").attr("data");
        const code = element.childNodes[0].innerHTML;
        const name = element.childNodes[1].innerHTML;
        const id = $(popupOpenElement).attr("id");
        if(id.startsWith("AIR_whereDepartCity")) {
            if (currentType == "MT") {
                multiTravelDataSet(true, code, name);
            } else {
                document.getElementById("departCity").value = code;
                $("#foreInputArea").val("departCity");
            }
        } else {
            let startCityCode;
            if (id.indexOf("City_") != -1) {
                const idNumber = id.split("_")[2];
                startCityCode = document.getElementById("departCity_" + idNumber).value;
            } else {
                startCityCode = document.getElementById("departCity").value;
            }
            if (startCityCode != "" && startCityCode == code) {
                cmnAlertLayer("", "출발지, 도착지는<br/>동일하게 설정 불가능합니다.");
                return;
            }

            if (currentType == "MT") {
                multiTravelDataSet(false, code, name);
            } else {
                document.getElementById("arrivelCity").value = code;
                $("#foreInputArea").val("arrivelCity");
            }
        }
        $(popupOpenElement).innerText = code;
        const targetId = $(popupOpenElement).attr("id");
        const aTarget = document.getElementById(targetId);
        setMainViewCityData(aTarget, code, name);
        closeForeAirStation()
    }

    const viewChange = (bool) => {
        const textValue = document.getElementById("searchForeWord").value;
        if (textValue == "") {
            $("#searchTarget").empty();
            $("#allCity").show();
            $("#searchCity").hide();
            return;
        }

        $("#searchTarget").empty();
        if (bool) {
            document.getElementById("searchForeWord").value = "";
            $("#allCity").show();
            $("#searchCity").hide();
        } else {
            $("#allCity").hide();
            $("#searchCity").show();
        }

    }


    const multiTravelDataSet = (type, code, name) => {
        const id = $(popupOpenElement).attr("id");
        const number = id.split("_")[2];
        if (type) {
            document.getElementById("departCity_" + number).value = code;
            $("#foreInputArea").val("departCity");
        } else {
            document.getElementById("arrivelCity_" + number).value = code;
            $("#foreInputArea").val("arrivelCity");
            if (number != multiGenId) {
                let targetNumber = (number * 1 + 1);
                document.getElementById("departCity_" + targetNumber).value = code;
                const targetId = "AIR_whereDepartCity_" + targetNumber;
                let target = document.getElementById(targetId);
                setMainViewCityData(target, code, name);
                $("#foreInputArea").val("departCity");
            }
        }
    }

    const setMainViewCityData = (target, code, name) => {
        target.innerText = code;
        target.className = "select";
        const spanEl = document.createElement("span");
        spanEl.className = "country";
        spanEl.innerText = name;
        target.appendChild(spanEl);
    }

    const swapArea = () => {
        // var depCity = $("#depCity").val();
        // var arrCity = $("#arrCity").val();
        // var depCityTit = $("#AIR_whereDepCity1").html();
        // var arrCityTit = $("#AIR_whereArrCity1").html();
        var depCity = $("#departCity").val();
        var arrCity = $("#arrivelCity").val();
        var depCityTit = $("#AIR_whereDepartCity").html();
        var arrCityTit = $("#AIR_whereArrivelCity").html();

        if(depCity != "" && arrCity != "") {
            // $("#depCity").val(arrCity);
            // $("#arrCity").val(depCity);
            // $("#AIR_whereDepCity1").html(arrCityTit);
            // $("#AIR_whereArrCity1").html(depCityTit);
            $("#departCity").val(arrCity);
            $("#arrivelCity").val(depCity);
            $("#AIR_whereDepartCity").html(arrCityTit);
            $("#AIR_whereArrivelCity").html(depCityTit);
        }
    }

    const [selectsRange, setSelectsRange] = useState(true);
    const openCalendar = (element, typeVal, imgVal) => {
        window.oriScroll = $(window).scrollTop();

        // popupOpenelement = element;
        setPopupOpenElement(element);
        calendarType = typeVal;
        calendarImgVal = imgVal
        $("section").hide();
        $("#footer").hide();
        $("#reSelectPop").hide();
        $("#content").hide();

        var elementId = $(element).attr("id").split("_")[0];
        if (elementId == 'AIR') {
            eventControll('bind', "", 0, 0);
        }


        var $el = $(element);

        if (typeVal == 0) {
            // 값 세팅
            if ($el.hasClass("select")) {
                var textVal = $el.text();
                textVal = textVal.replaceAll(".", "");
                var htmlText = "<span class='picker'>" + $(".calendarArea").find("#calendar_" + textVal).find("div").text() + "</span>";
                $(".calendarArea").find("#calendar_" + textVal).find("div").html(htmlText);
            }
        } else if (typeVal == 1) {
            var selectText = $el.closest(".tabcont").find(".tab").find(".current").find("a").text();
            if (selectText != '편도') {
                $(".CALENDAR_DBL").show();
                if (imgVal == '1') {
                    $(".CALENDAR_TP").removeClass("v3");
                    $(".CALENDAR_TP").addClass("v2");
                    $("#CAL_START").text("가는날");
                    $("#CAL_END").text("오늘날");
                } else if (imgVal == '2') {
                    $(".CALENDAR_TP").removeClass("v2");
                    $(".CALENDAR_TP").addClass("v3");
                    $("#CAL_START").text("체크인");
                    $("#CAL_END").text("체크아웃");
                }
                // 값 세팅
                var d_date = $el.closest(".tabcont").find(".CAL_DATE").eq(0).text();
                var a_date = $el.closest(".tabcont").find(".CAL_DATE").eq(1).text();

                $("#CALENDAR_D_DATE").text(d_date);
                $("#CALENDAR_A_DATE").text(a_date);

                if ($("#CALENDAR_D_DATE").text() != '날짜 선택') {
                    $("#CALENDAR_D_DATE").closest("dd").addClass("select");
                }
                if ($("#CALENDAR_A_DATE").text() != '날짜 선택') {
                    $("#CALENDAR_A_DATE").closest("dd").addClass("select");
                }

                // 기간 표시
                d_date = d_date.replaceAll(".", "");
                a_date = a_date.replaceAll(".", "");

                if ($("#CALENDAR_A_DATE").text() != '날짜 선택' && $("#CALENDAR_A_DATE").text() != '날짜 선택') {
                    // 전역변수 세팅
                    // selectCalendarF = d_date;
                    // selectCalendarS = a_date;
                    setSelectCalendarF(d_date);
                    setSelectCalendarS(a_date);
                    // 달력 시작 종료 그리기
                    calendarFromTo();
                }
                setSelectsRange(true);
            } else {
                calendarType = 0;
                // 값 세팅
                if ($el.hasClass("select")) {
                    var textVal = $el.text();
                    textVal = textVal.replaceAll(".", "");
                    var htmlText = "<span class='picker'>" + $(".calendarArea").find("#calendar_" + textVal).find("div").text() + "</span>";
                    $(".calendarArea").find("#calendar_" + textVal).find("div").html(htmlText);
                }

                setSelectsRange(false);
            }
        }

        $(".calendarArea").show();
    }

    const eventControll = (typeVal, calVal, loopVal, startVal) => {
        var date = new Date(); // 날짜 객체 생성
        var startInt = 1;
        if (typeof startVal !== 'undefind') {
            startInt = startVal;
        }
        for(let i = startInt; i < loopVal; i++) {
            if (i > 0) {
                date.setDate(date.getDate() + 1);
            }
            var y = date.getFullYear(); // 현재 연도
            var m = date.getMonth()+1; // 현재 월
            var d = date.getDate(); // 현재 일

            if(m < 10) {
                m = "0" + m;
            } else {
                m = "" + m;
            }

            if(d < 10) {
                d = "0" + d;
            } else {
                d = "" + d;
            }

            var idVal = "" + y + m + d;
            if (typeVal == 'bind') {
                $(".calendarArea" + calVal).find("#calendar_" + idVal).find(".day").css("color", "#d6d6d6");
                $(".calendarArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", "");
            } else {
                $(".calendarArea" + calVal).find("#calendar_" + idVal).find(".day").css("color", "");
                var onclickVal = "setClickDataVal2('" + idVal + "')";
                $(".calendarArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", onclickVal);
            }
        }
    }

    const setFromToVal = () => {
        // 값 세팅
        if (!selectsRange) {
            var $el = $(popupOpenElement);
            var d_date = "" + selectCalendarF;
            var rtnString = d_date.substr(0,4) + "." + d_date.substr(4,2) + "." + d_date.substr(6,2);
            $el.closest(".tabcont").find(".CAL_DATE").eq(0).text(rtnString);
            $el.closest(".tabcont").find(".CAL_DATE").eq(0).addClass("select");
            $el.closest(".tabcont").find(".CAL_DATE").eq(0).removeClass("dimColor");

            closeCalendar();
            return;
        }

        if (selectCalendarF != null && selectCalendarS != null) {
            var $el = $(popupOpenElement);

            var d_date = "" + selectCalendarF;
            var a_date = "" + selectCalendarS;

            var rtnString = d_date.substr(0,4) + "." + d_date.substr(4,2) + "." + d_date.substr(6,2);
            $el.closest(".tabcont").find(".CAL_DATE").eq(0).text(rtnString);
            $el.closest(".tabcont").find(".CAL_DATE").eq(0).addClass("select");
            $el.closest(".tabcont").find(".CAL_DATE").eq(0).removeClass("dimColor");
            rtnString = a_date.substr(0,4) + "." + a_date.substr(4,2) + "." + a_date.substr(6,2);
            $el.closest(".tabcont").find(".CAL_DATE").eq(1).text(rtnString);
            $el.closest(".tabcont").find(".CAL_DATE").eq(1).addClass("select");
            $el.closest(".tabcont").find(".CAL_DATE").eq(1).removeClass("dimColor");

            closeCalendar();
        }
        else {
            if (calendarImgVal == '1') {
                cmnAlertLayer("", "가는날과 오는날을 모두 선택해 주세요.");
            } else if (calendarImgVal == '2') {
                cmnAlertLayer("", "체크인과 체크아웃을 모두 선택해 주세요.");
            }
        }
    }

    const closeCalendar = () => {
        $(window).scrollTop(window.oriScroll);

        $("section").show();
        $("#footer").show();
        $("#reSelectPop").show();
        $("#content").show();
        $(".calendarArea").hide();
        $("#header").removeClass("center");
        $(".CALENDAR_DBL").hide();
        $("#CALENDAR_D_DATE").closest("dd").removeClass("select");
        $("#CALENDAR_A_DATE").closest("dd").removeClass("select");
        $("#CALENDAR_D_DATE").text("날짜 선택");
        $("#CALENDAR_A_DATE").text("날짜 선택");

        // 표시 클래스 삭제
        $(".calendarArea").find(".picker").each(function() {
            var textVal = $(this).text();
            $(this).closest("div").html(textVal);
        });
        $(".calendarArea2").find(".picker").each(function() {
            var textVal = $(this).text();
            $(this).closest("div").html(textVal);
        });
        $(".picker-txt").remove();
        $(".bg-select-first").removeClass("bg-select-first");
        $(".bg-select").removeClass("bg-select");
        $(".bg-select-last").removeClass("bg-select-last");

        // 전역 변수 설정
        // selectCalendarF = null;
        // selectCalendarS = null;
        setSelectCalendarF(null);
        setSelectCalendarS(null);

        eventControll('unbind', "", 3, 0);
    }

    const regDateCheck = RegExp(/^\d{4}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[01])$/);
    const openMultiCalendar = (element, typeVal, imgVal) => {
        window.oriScroll = $(window).scrollTop();

        setSelectedMultiCalendar(element.id);

        if (element.innerHTML == "날짜 선택") setSelectedMultiDate(null);
        else {
            const targetId = "selectCalendar" + element.id.split("_")[2]
            const selected = multiDate[targetId];
            setSelectedMultiDate(selected);
        }

        // popupOpenelement = element;
        setPopupOpenElement(element);
        calendarType = typeVal;
        calendarImgVal = imgVal
        $("section").hide();
        $("#footer").hide();
        $("#reSelectPop").hide();
        $("#content").hide();

        var elementId = $(element).attr("id").split("_")[0];
        if (elementId == 'AIR') {
            eventControllMulti('bind', "", 0, 0);
        }

        $("#multiTravelDateList").show();
        $(".foreAirDateArea").show();
    }
    const closeMultiCalendar = () => {
        // const checkElement = document.getElementById("date_multi").children;
        // for (let i = 0; i < checkElement.length; i++) {
        //     const checkTarget = document.getElementById("date_multi_" + i);
        //     const checkData = checkTarget.getAttribute("data");
        //     if (checkData == undefined || !regDateCheck.test(checkData)) {
        //         cmnAlertLayer("", "날짜를 선택하세요");
        //         return;
        //     }
        // }

        $("section").show();
        $("#footer").show();
        $("#reSelectPop").show();
        $("#content").show();
        $("#header").removeClass("center");
        $(".foreAirDateArea").hide();
        $("#multiTravelDateList").hide();

        // 값 설정
        $(window).scrollTop(window.oriScroll);

        let dateValue = multiDate["selectCalendar" + selectedMultiCalendar.split("_")[2]];
        dateValue = dateFormat(dateValue);
        if (dateValue == null || dateValue == undefined || dateValue == "") dateValue = "날짜 선택";
        let targetElement = document.getElementById(selectedMultiCalendar);
        targetElement.innerHTML = dateValue;
        targetElement.className = "CAL_DATE select";
        targetElement.style.fontSize = "17px";

        // const travelCount = document.getElementById("date_multi").childElementCount;
        // let dateValue = document.getElementById("date_multi_" + i).getAttribute("data");
        // if (dateValue == "" || dateValue == undefined) dateValue = "날짜 선택";
        // let targetElement = document.getElementById("AIR_whereDepartDate_" + i);
        // targetElement.innerHTML = dateValue;
        // targetElement.className = "CAL_DATE select";
        // targetElement.style.fontSize = "17px";

        // 전역 변수 설정
        // selectCalendarF = null;
        // selectCalendarS = null;

        eventControllMulti('unbind', "", 3, 0);
    }
    const eventControllMulti = (typeVal, calVal, loopVal, startVal) => {
        var date = new Date(); // 날짜 객체 생성
        var startInt = 1;
        if (typeof startVal !== 'undefind') {
            startInt = startVal;
        }
        for(let i = startInt; i < loopVal; i++) {
            if (i > 0) {
                date.setDate(date.getDate() + 1);
            }
            var y = date.getFullYear(); // 현재 연도
            var m = date.getMonth()+1; // 현재 월
            var d = date.getDate(); // 현재 일

            if(m < 10) {
                m = "0" + m;
            } else {
                m = "" + m;
            }

            if(d < 10) {
                d = "0" + d;
            } else {
                d = "" + d;
            }

            var idVal = "" + y + m + d;
            if (typeVal == 'bind') {
                $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").css("color", "#d6d6d6");
                $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", "");
            } else {
                $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").css("color", "");
                var onclickVal = "setClickDataVal3('" + idVal + "')";
                $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", onclickVal);
            }
        }
    }
    const openAirMemberAndSeat = (element) => {
        // popupOpenelement = element;
        setPopupOpenElement(element);
        $("section").hide();
        $("#mainHeader").hide();
        $("#footer").hide();
        $("#reSelectPop").hide();
        $("#content").hide();
        $(".foreAirMemberAndSeatArea").show();
    }
    const closeAirMemberAndSeat = () => {
        const message = "명";
        let count = "";
        let typeList = ['성인', '소아', '유아'];
        for (let i = 1; i < 4; i++) {
            let cnt = document.getElementById("AIR_F_C_" + i).value;
            if (i == 1) console.log(cnt);

            if (cnt > 0 && i > 1) count += " ";
            if (cnt > 0) {
                count += typeList[i - 1];
                count += cnt;
            }
        }

        if (count.length < 5) count += message;

        document.getElementById("AIR_F_whereACnt").innerText = count;
        $("section").show();
        $("#mainHeader").show();
        $("#footer").show();
        $("#reSelectPop").show();
        $("#content").show();

        $(".foreAirMemberAndSeatArea").hide();
    }
    const updateCount = (element, type, countId) => {
        const c1=parseInt($('#AIR_Count_1').text());
        const c2=parseInt($('#AIR_Count_2').text());
        const c3=parseInt($('#AIR_Count_3').text());

        const targetId = element.parentNode.id;
        const target = element.parentNode.childNodes[1];
        let nowCount = parseInt(element.parentNode.childNodes[1].innerHTML);

        let updateCount = nowCount;
        if (type) {
            if (targetId == "adult" && nowCount > 1 || targetId != "adult" && nowCount > 0) {
                updateCount = nowCount - 1;
            }
        }
        else {
            if( (c1+c2+c3)>8 ){
                alert("인원은 9명을 초과할 수 없습니다.");
                return;
            }
            updateCount = nowCount + 1;
        }

        let adultCount = c1;
        const parentTarget = document.getElementById("adult");
        if (countId == "AIR_F_C_3" && updateCount > adultCount) {
            cmnAlertLayer("", "성인 1인당, 유아 1인까지 동반 탑승 가능합니다");
        } else {
            target.innerHTML = updateCount;
            document.getElementById(countId).value = updateCount;
        }
    }
    const setSeatVal = (element) => {
        let $el = $(element);
        const target = document.getElementById("AIR_F_S");
        target.value = element.getAttribute("data");
        $el.closest(".seat-btn").find("li").removeClass("on select");
        element.className = "on select";
        document.getElementById("AIR_F_Seat").innerText = element.innerText;
    }
    const addForeTravel = () => {
        if (multiGenId >= 3) return;
        if ($("#closeTargetid")) {
            $("#closeTargetid").remove();
        }

        // const travelCount = document.getElementById("date_multi").childElementCount;
        // for (i = 0; i < travelCount; i++) {
        //     let targetElement = document.getElementById("AIR_whereDepartDate_" + i);
        //     targetElement.innerHTML = "날짜 선택";
        //     targetElement.className = "CAL_DATE";
        //     targetElement.style.fontSize = "";
        // }
        // for (var i = 0; i <= multiGenId; i++) {
        //     const clearTarget = document.getElementById("date_multi_" + i);
        //     clearTarget.setAttribute("data", "");
        //     clearTarget.getElementsByTagName("a")[0].innerHTML = "날짜선택";
        // }

        $(".foreAirDateArea").find(".picker").each(function() {
            var textVal = $(this).text();
            $(this).closest("div").html(textVal);
        });
        $(".picker-txt").remove();
        $(".bg-select-first").removeClass("bg-select-first");
        $(".bg-select").removeClass("bg-select");
        $(".bg-select-last").removeClass("bg-select-last");

        // clearCal();
        // deleteCityValue();
        const target = document.getElementById("useMulti");
        multiGenId++;
        const newId = multiGenId;
        target.appendChild(setNewTravelList("", newId));
        // addDateList();

        // dateCount = 0;
        // lastSelectTravel = 0;
    }
    const setNewTravelList = (reValue, newId) => {
        const newDiv = document.createElement("div");
        newDiv.id = reValue + "multi_cell_" + newId;
        newDiv.className = "placeSel";
        const travelDiv = document.createElement("div");
        travelDiv.id = reValue + "multi_travel_" + newId;
        travelDiv.className = "multiSel";
        const departAEl = document.createElement("a");
        departAEl.id = reValue + "AIR_whereDepartCity_" + newId;
        departAEl.className = "start";
        // departAEl.setAttribute("onclick", "foreOpenAirStation(this, '출발지')");
        departAEl.addEventListener("click", function(e) {foreOpenAirStation(e.currentTarget, '출발지')});
        departAEl.innerText = "출발";
        travelDiv.appendChild(departAEl);
        if (reValue == "") {
            const departInputHidden = document.createElement("input");
            departInputHidden.type = "hidden";
            departInputHidden.name = "depCity";
            departInputHidden.id = "departCity_" + newId;
            travelDiv.appendChild(departInputHidden);
        }
        const onewayAEl = document.createElement("a");
        onewayAEl.className = "oneway";
        travelDiv.appendChild(onewayAEl);
        if (reValue == "") {
            const arrivelInputHidden = document.createElement("input");
            arrivelInputHidden.type = "hidden";
            arrivelInputHidden.name = "arrCity";
            arrivelInputHidden.id = "arrivelCity_" + newId;
            travelDiv.appendChild(arrivelInputHidden);
        }
        const arriveAEl = document.createElement("a");
        arriveAEl.id = reValue + "AIR_whereArrivelCity_" + newId;
        arriveAEl.className = "arrive";
        // arriveAEl.setAttribute("onclick", "foreOpenAirStation(this, '도착지')");
        arriveAEl.addEventListener("click", function(e) {foreOpenAirStation(e.currentTarget, '도착지')});
        arriveAEl.innerText = "도착";
        travelDiv.appendChild(arriveAEl);
        newDiv.appendChild(travelDiv);

        const dateDiv = document.createElement("div");
        dateDiv.id = reValue + "multi_date_" + newId;
        dateDiv.className = "dateSel v5";
        const dlEl = document.createElement("dl");
        const dtEl = document.createElement("dt");
        dtEl.innerText = "가는날";
        dlEl.appendChild(dtEl);
        const ddEl = document.createElement("dd");
        ddEl.innerText = "날짜 선택";
        // ddEl.setAttribute("onclick", "openMultiCalendar(this, 1, 1, 1)");
        ddEl.addEventListener("click", function(e) {openMultiCalendar(e.currentTarget, 1, 1, 1)});
        ddEl.id = reValue + "AIR_whereDepartDate_" + newId;
        ddEl.className = "CAL_DATE";
        dlEl.appendChild(ddEl);
        dateDiv.appendChild(dlEl);
        dateDiv.appendChild(createDeleteIcon(reValue));
        newDiv.appendChild(dateDiv);
        return newDiv;
    }
    const addDateList = () => {
        const target = document.getElementById("date_multi");
        const dlEl = document.createElement("dl");
        dlEl.id = "date_multi_" + multiGenId;
        const dtEl = document.createElement("dt");
        dtEl.innerHTML = "여정" + (multiGenId + 1);
        dlEl.appendChild(dtEl);
        const ddEl = document.createElement("dd");
        ddEl.className = "select";
        const aEl = document.createElement("a");
        aEl.innerHTML = "날짜선택";
        ddEl.appendChild(aEl);
        dlEl.appendChild(ddEl);
        target.appendChild(dlEl);
    }
    const deleteTravel = () => {
        console.log(multiDate);
        console.log(multiDateStr);

        // clearCal();
        // deleteCityValue();
        $("#multi_cell_" + multiGenId).remove();
        // $("#date_multi_" + multiGenId).remove();
        setMultiDate({...multiDate, ["selectCalendar" + multiGenId]: null});
        setMultiDateStr({...multiDateStr, ["selectCalendar" + multiGenId]: null});
        multiGenId--;
        console.log(multiGenId);
        if (multiGenId != 1) {
            const addTarget = document.getElementById("multi_date_" + multiGenId);
            addTarget.appendChild(createDeleteIcon(""));
        }

        // for (var i = 0; i <= multiGenId; i++) {
        //     const clearTarget = document.getElementById("date_multi_" + i);
        //     clearTarget.setAttribute("data", "");
        //     clearTarget.getElementsByTagName("a")[0].innerHTML = "날짜선택";
        // }

        $(".foreAirDateArea").find(".picker").each(function() {
            var textVal = $(this).text();
            $(this).closest("div").html(textVal);
        });
        $(".picker-txt").remove();
        $(".bg-select-first").removeClass("bg-select-first");
        $(".bg-select").removeClass("bg-select");
        $(".bg-select-last").removeClass("bg-select-last");

        // selectCalendar0 = null;
        // selectCalendar1 = null;
        // selectCalendar2 = null;
        // selectCalendar3 = null;

        // const travelCount = document.getElementById("date_multi").childElementCount;
        // for (i = 0; i < travelCount; i++) {
        //     let targetElement = document.getElementById("AIR_whereDepartDate_" + i);
        //     targetElement.innerHTML = "날짜 선택";
        //     targetElement.className = "CAL_DATE";
        //     targetElement.style.fontSize = "";
        // }

        // dateCount = 0;
        // lastSelectTravel = 0;
        console.log(multiDate);
        console.log(multiDateStr);
    }

    const createDeleteIcon = (reValue) => {
        const closeAEl = document.createElement("a");
        closeAEl.className = "onway_close";
        closeAEl.id = reValue + "closeTargetid";
        // closeAEl.setAttribute("onclick", "deleteTravel()")
        closeAEl.addEventListener("click", deleteTravel);

        return closeAEl;
    }

    function initFTSlider(){
        // var min_1=9999;
        // var max_1=0;
        // var min_2=9999;
        // var max_2=0;
        //
        // let avail_list=xmlData.getElementsByTagName("AVAIL")
        // let len=avail_list.length
        // for(var i=0;i<len;i++){
        //     var _in=avail_list[i].getElementsByTagName("IN")[0].innerHTML
        //     //var in= avail_list[i].getElementsByTagName("IN")[0].innerHTML
        //     var ft=avail_list[i].getElementsByTagName("FLIGHT_TIME")[0].innerHTML
        //     //console.log(ft)
        //     if(_in=="1"){
        //         if(ft<min_1)	min_1=ft;
        //         if(ft>max_1)	max_1=ft;
        //     }else if(_in=="2"){
        //         if(ft<min_2)	min_2=ft;
        //         if(ft>max_2)	max_2=ft;
        //     }
        // }
        //
        // $('#start_time').slider("option","values",[parseInt(min_1),parseInt(max_1)])
        // $('#start_time').slider("option","min",parseInt(min_1))
        // $('#start_time').slider("option","max",parseInt(max_1))
        //
        // var min_st=timeSlider(min_1);
        // var max_st=timeSlider(max_1)
        //
        // $('#min_start_time').val(min_st)
        // $('#max_start_time').val(max_st)
        //
        // var min_arr=timeSlider(min_2);
        // var max_arr=timeSlider(max_2)
        // // console.log(min_1+","+max_1+","+min_2+","+max_2)
        // // console.log(min_st+","+max_st+","+min_arr+","+max_arr)
        // $('#min_arrive_time').val(min_arr)
        // $('#max_arrive_time').val(max_arr)
        //
        // $('#arrive_time').slider("option","values",[parseInt(min_2),parseInt(max_2)])
        // $('#arrive_time').slider("option","min",parseInt(min_2))
        // $('#arrive_time').slider("option","max",parseInt(max_2))

        setStartHour([0, 1439]);
        setArriveHour([0, 1439]);
    }

    function setAllianceAirLineInfo(data) {
        console.log(data)
        $("#airLineListArea").empty();
        const set = new Set(searchAirlineArray);
        searchAirlineArray = [...set];
        const targetAirLineArea = document.getElementById("airLineListArea");
        const allDt = document.createElement("dt");
        const allInput = document.createElement("input");
        allInput.type = "checkbox";
        allInput.value = "";
        allInput.id = "allInputCheckBox";
        allDt.appendChild(allInput);
        const allLabel = document.createElement("label");
        allLabel.setAttribute("for", "chk_airline_ALL");
        allLabel.setAttribute("onclick", "checkAirline(this, 'chk_airline_ALL')");
        allLabel.innerHTML = "전체"
        allDt.appendChild(allLabel);
        targetAirLineArea.appendChild(allDt);

        // 항공사연합 코드 리스트 개수에 맞추어 반복문 돌린다.
        const airLineAllianceList = data.airAllianceList;
        for (var i = 0; i < airLineAllianceList.length; i++) {
            const allianceData = airLineAllianceList[i];
            const allianceName = allianceData.name;
            const allianceList = allianceData.data;

            const allianceDt = document.createElement("dt");
            const allianceInput = document.createElement("input");
            allianceInput.type = "checkbox";
            allianceInput.value = "";
            allianceInput.setAttribute("name", "chk_airline_ALL");
            allianceInput.setAttribute("onclick", "checkAirline(this, 'chk_airline_" + i + "')");
            allianceInput.id = "cbx_airline_" + i;
            allianceDt.appendChild(allianceInput);
            const allianceLabel = document.createElement("label");
            allianceLabel.setAttribute("for", "chk_airline_" + i);
            allianceLabel.setAttribute("onclick", "checkAirline(this, 'chk_airline_" + i + "')");
            allianceLabel.innerHTML = allianceName;
            allianceDt.appendChild(allianceLabel);
            var airlineCount = 0;
            for (var j = 0; j < allianceList.length; j++) {
                const airLineCode = allianceList[j].AIRLINE_CD;
                for (var k = 0; k < searchAirlineArray.length; k++) {
                    if (airLineCode === searchAirlineArray[k]) {
                        const airDd = document.createElement("dd");
                        const airInput = document.createElement("input");
                        airInput.type = "checkbox";
                        airInput.id = "cbx_airline_" + i + "_chk" + (j + 1);
                        airInput.setAttribute("name", "chk_airline_" + i);
                        airInput.value = airLineCode;
                        airDd.appendChild(airInput);
                        const airLabel = document.createElement("label");
                        airLabel.setAttribute("for", "cbx_airline_" + i + "_chk" + (j + 1));
                        airLabel.innerHTML = allianceList[j].AIRLINE_NM;
                        airDd.appendChild(airLabel);
                        if (airlineCount === 0) targetAirLineArea.appendChild(allianceDt);
                        targetAirLineArea.appendChild(airDd);
                        if (k === 0) {
                            searchAirlineArray.shift();
                        } else {
                            searchAirlineArray.splice(k, 1);
                        }

                        airlineCount++;
                        break;
                    }
                }
            }
        }

        const etcAirLineDt = document.createElement("dt");
        const etcInput = document.createElement("input");
        etcInput.type = "checkbox";
        etcInput.value = "";
        etcInput.setAttribute("name", "chk_airline_ALL");
        etcInput.setAttribute("onclick", "checkAirline(this, 'chk_airline_" + airLineAllianceList.length + "')");
        etcInput.id = "cbx_airline_" + airLineAllianceList.length;
        etcAirLineDt.appendChild(etcInput);
        const allianceLabel = document.createElement("label");
        allianceLabel.setAttribute("for", "chk_airline_" + airLineAllianceList.length);
        allianceLabel.setAttribute("onclick", "checkAirline(this, 'chk_airline_" + airLineAllianceList.length + "')");
        allianceLabel.innerHTML = '기타';
        etcAirLineDt.appendChild(allianceLabel);
        targetAirLineArea.appendChild(etcAirLineDt);
        for (var i = 0; i < searchAirlineArray.length; i++) {
            const airDd = document.createElement("dd");
            const airInput = document.createElement("input");
            airInput.type = "checkbox";
            airInput.id = "cbx_airline_" + i + "_chk" + (j + 1);
            airInput.setAttribute("name", "chk_airline_" + i);
            airInput.value = searchAirlineArray[i];
            airDd.appendChild(airInput);
            const airLabel = document.createElement("label");
            airLabel.setAttribute("for", "cbx_airline_" + i + "_chk" + (j + 1));
            airLabel.innerHTML = searchAirlineMap.get(searchAirlineArray[i]);
            airDd.appendChild(airLabel);
            targetAirLineArea.appendChild(airDd);
        }
    }
    function setSearchList(data, count, travelType) {
        $("#ticketArea").empty();
        const target = document.getElementById("ticketArea");

        // 데이터 추출
        fareList = data.getElementsByTagName("FARES")[0].children;
        availsList = data.getElementsByTagName("AVAILS")[0].children;
        mappingList = data.getElementsByTagName("MAPPINGS")[0].children;
        mappingListSort(false);
        setTopValueArea();
        setSearchData(target, count, travelType);
    }
    const setSearchData = (target, count, travelType) => {
        for (var i = 0; i < count; i++) {
            const ticketNew = document.createElement("div");
            ticketNew.className = "ticket_new";
            const ticketInner = document.createElement("div");
            ticketInner.className = "ticketInner";
            // 잔여좌석
            let seatCount = getLeftSeatCount(i, true);
            setTicketSitInfo(ticketInner, seatCount, i, travelType, true);

            // 티켓정보
            setAirLineInfo(ticketInner, mappingList[i], travelType);
            // 할인
            setDefineInfo(ticketInner, mappingList[i], i, true);

            ticketNew.appendChild(ticketInner);
            target.appendChild(ticketNew);
        }

        // 조회 개수 입력해주기
        document.getElementById("searchCount").innerHTML = count;
    }

    function zeroFormat(value) {
        if (value.toString().length == 1) return "0" + value;
        else return value;
    }

    let fareList;
    let availsList;
    let mappingList;
    let newMappingList;

    let sortType = "priceLow";
    const setSortType = (element, type) => {
        sortType = type;

        var $el = $(element);
        $el.closest(".arraySelect").find("p").removeClass("on");
        $el.addClass("on");
        document.getElementById("updateSort").click();
        // mappingListSort(true);
    }
    const checkDirectValue = (element) => {
        const selectBox = document.getElementsByName("chk_direct");
        selectBox.forEach((cb) => { cb.checked = false; })
        element.checked = true;
        filterObject.directType = element.value;
    }
    const checkCashValue = (element) => {
        const selectBox = document.getElementsByName("chk_fee");
        selectBox.forEach((cb) => { cb.checked = false; })
        element.checked = true;
        filterObject.costType = element.value;
    }
    const checkAirline = (element, name) => {
        // if (name === 'chk_airline_ALL') {
        //     const isCheck = document.getElementById("allInputCheckBox").checked;
        //     document.getElementById("allInputCheckBox").checked = !isCheck;
        // }
        // const selectBox = document.getElementsByName(name);
        // selectBox.forEach((cb) => {cb.click()});

        if (name === 'allInputCheckBox') {
            const isCheck = !document.getElementById("allInputCheckBox").checked;
            $("#airLineListArea input:not(#allInputCheckBox)").prop("checked", isCheck);
            return;
        }
        const checked = !$("#"+name).is(":checked");
        const selectBox = document.getElementsByName(name);
        selectBox.forEach((cb) => {cb.checked = checked});
    }
    const getLeftSeatCount = (index, type) => {
        const mappingData = type ? mappingList[index].getAttribute("LANDINGPARAM").split("&") : newMappingList[index].getAttribute("LANDINGPARAM").split("&");
        let tempCount = 0;
        for (let i = 0; i < mappingData.length; i++) {
            if (mappingData[i].indexOf("seatcount=") != -1) {
                let seatCount = mappingData[i].split("=")[1];
                if (tempCount === 0) {
                    tempCount = Number(seatCount);
                } else if (tempCount >= Number(seatCount)) {
                    tempCount = Number(seatCount);
                }
            }
        }

        return tempCount;
    }
    const setAirLineInfoDetail = (ticketInfo, costInfo, travelType, direction) => {
        const arrCnt = costInfo.getElementsByTagName("SEG").length;
        const divEl = document.createElement("div");
        divEl.className = "titWrap";
        const divAirNew = document.createElement("div");
        divAirNew.className = "airline_new";
        const airLineCode = costInfo.getElementsByTagName("AIR_CD")[0].innerHTML;
        const imgEl = document.createElement("img");
        imgEl.src = "/smart/images/sub/logo/" + airLineCode + ".png";
        imgEl.className = "logo";
        divAirNew.appendChild(imgEl);
        const divAirInfo = document.createElement("div");
        divAirInfo.className = "airInfo";
        const divAirTime = document.createElement("div");
        divAirTime.className = "airTime";
        const deptTime = costInfo.getElementsByTagName("DEP_TM")[0].innerHTML;
        divAirTime.appendChild(document.createTextNode(convertStringToTime(deptTime)));
        const dashTag = document.createElement("span");
        dashTag.innerText = "-"
        divAirTime.appendChild(dashTag);
        const arrTime = costInfo.getElementsByTagName("ARR_TM")[arrCnt - 1].innerHTML;
        divAirTime.appendChild(document.createTextNode(convertStringToTime(arrTime)));
        divAirInfo.appendChild(divAirTime);

        const divAirName = document.createElement("div");
        divAirName.className = "airName";
        divAirName.innerText = costInfo.getElementsByTagName("AIR_NM")[0].innerHTML;
        const cd_share=costInfo.getElementsByTagName("CD_SHARE_YN")[0].innerHTML
        // console.log(cd_share)
        if(cd_share=="Y")   divAirName.innerText += "(공동운항)"

        const cityCodeTag = document.createElement("span");
        let codeTagString = costInfo.getElementsByTagName("DEP_CT")[0].innerHTML + "-";
        codeTagString = codeTagString + costInfo.getElementsByTagName("ARR_CT")[arrCnt - 1].innerHTML;
        cityCodeTag.innerText = codeTagString;
        divAirName.appendChild(cityCodeTag);
        divAirInfo.appendChild(divAirName);
        const directionDiv = document.createElement("div");
        if (travelType) {
            directionDiv.className = "directionDepa";
        } else {
            directionDiv.className = "directionArri";
        }

        directionDiv.innerText = direction;
        divAirInfo.appendChild(directionDiv);
        divAirNew.appendChild(divAirInfo);
        divEl.appendChild(divAirNew);

        const divReserveInfo = document.createElement("div");
        divReserveInfo.className = "reserveInfo_new";
        const divInfo1 = document.createElement("div");
        divInfo1.className = "info1";
        const exchangeCount = costInfo.getElementsByTagName("STOP_CNT")[0].innerHTML;
        if ("0" !== exchangeCount) {
            divInfo1.innerText = "경유 " + exchangeCount + "회";
        }
        divReserveInfo.appendChild(divInfo1);
        const divInfo2 = document.createElement("div");
        divInfo2.className = "info2";
        let flightTime = costInfo.getElementsByTagName("JRNY_YM")[0].innerHTML;
        if (arrCnt > 1) {
            const jrnyArray = new Array();
            const connArray = new Array();
            for (var i = 0; i < arrCnt; i++) {
                jrnyArray.push(costInfo.getElementsByTagName("JRNY_YM")[i].innerHTML);
                const conTime = costInfo.getElementsByTagName("CON_TM")[i];
                if (conTime !== undefined) connArray.push(conTime.innerHTML);
            }

            let jrnyHour = 0, jrnyMin = 0, conHour = 0, conMin = 0;
            for (var i = 0; i < jrnyArray.length; i++) {
                jrnyHour += (jrnyArray[i].substring(0, 2) * 1);
                jrnyMin += (jrnyArray[i].substring(2, jrnyArray[i].length) * 1);
            }

            for (var i = 0; i < connArray.length; i++) {
                conHour += (connArray[i].substring(0, 2) * 1);
                conMin += (connArray[i].substring(2, connArray[i].length) * 1);
            }

            let calcMin = (jrnyMin + conMin) % 60;
            if (calcMin < 10) calcMin = "0" + calcMin;
            let calcHour = Math.floor((jrnyMin + conMin) / 60);
            if (calcHour > 0) jrnyHour += calcHour;
            flightTime = (jrnyHour + conHour) + "" + calcMin;
            flightTime = flightTime.padStart(4, '0');
        }
        divInfo2.innerText = flightTime.substring(0, 2) + "시간 " + flightTime.substring(2, flightTime.length) + "분";
        divReserveInfo.appendChild(divInfo2);
        divEl.appendChild(divReserveInfo);
        ticketInfo.appendChild(divEl);
    }
    const setTicketSitInfo = (ticketInner, count, mappingTargetIndex, travelType, mappingType) => {
        const sit = document.createElement("div");
        sit.className = "sit titWrap";
        const noneDiv = document.createElement("div");
        noneDiv.innerText = "잔여좌석 ";
        const noneSpan = document.createElement("span");
        noneSpan.innerText = count + "석";
        noneDiv.appendChild(noneSpan);
        sit.appendChild(noneDiv);
        const sitMore = document.createElement("div");
        sitMore.className = "sitMore";
        const aDetailSchedule = document.createElement("a");
        aDetailSchedule.className = "full-pop-layer linkOpen";
        aDetailSchedule.innerText = "상세 스케줄";
        aDetailSchedule.setAttribute("onclick", "showDetailTravelInfo(" + mappingTargetIndex + ", '" + travelType + "' , " + mappingType + ")");
        sitMore.appendChild(aDetailSchedule);
        sit.appendChild(sitMore);
        ticketInner.appendChild(sit);
    }
    const setAirLineInfo = (ticketInner, mappingData, travelType) => {
        const ticketInfo = document.createElement("div");
        ticketInfo.className = "ticketInfo";
        let anValue = mappingData.getAttribute("AN1");
        let targetXml = getTargetAvailsData(1 + "", anValue);
        setAirLineInfoDetail(ticketInfo, targetXml, true, travelType === "OW" || travelType === "RT" ? "가는날" : "여정1");
        anValue = mappingData.getAttribute("AN2");
        if ("0" !== anValue) {
            targetXml = getTargetAvailsData(2 + "", anValue);
            setAirLineInfoDetail(ticketInfo, targetXml, travelType !== "RT", travelType === "RT" ? "오는날" : "여정2");
        }
        anValue = mappingData.getAttribute("AN3");
        if ("0" !== anValue) {
            targetXml = getTargetAvailsData(3 + "", anValue);
            setAirLineInfoDetail(ticketInfo, targetXml, true, "여정3");
        }
        anValue = mappingData.getAttribute("AN4");
        if ("0" !== anValue) {
            targetXml = getTargetAvailsData(4 + "", anValue);
            setAirLineInfoDetail(ticketInfo, targetXml, true, "여정4");
        }

        ticketInner.appendChild(ticketInfo);
    }
    const convertStringToTime = (str) => {
        return str.substring(0, 2) + ":" + str.substring(2, str.length);
    }
    const setDefineInfo = (ticketInner, data, index, mappingType) => {
        let targetFareId = data.getAttribute("FN");
        const targetFareData = getTargetFareData(targetFareId);
        const define = document.createElement("div");
        define.className = "define";
        let normalCost = targetFareData.getElementsByTagName("AD_AMT")[0].innerHTML;
        normalCost = (normalCost * 1) + (targetFareData.getElementsByTagName("AD_TASF")[0].innerHTML * 1);
        getReservationLine(define, normalCost, "할인요금", index, false);

        const reservLast = document.createElement("div");
        reservLast.className = "reservationLine last mgt_5 mgb_15";
        const ulEl = document.createElement("ul");
        ulEl.className = "detailRule reLine";
        const liEl = document.createElement("li");
        const pEl = document.createElement("p");
        pEl.className = "cost";
        const costDetail = document.createElement("a");
        costDetail.className = "full-pop-layer linkOpen";
        costDetail.setAttribute("onclick", "openCostDetail(" + index + ", " + mappingType + ")");
        costDetail.innerText = "요금상세 보기";
        pEl.appendChild(costDetail);
        const costRule = document.createElement("a");
        costRule.className = "full-pop-layer linkOpen";
        costRule.setAttribute("onclick", "openCostRule(" + index + ", " + mappingType + ")");
        costRule.innerText = "요금규정 보기";
        pEl.appendChild(costRule);

        liEl.appendChild(pEl);
        ulEl.appendChild(liEl);
        reservLast.appendChild(ulEl);
        define.appendChild(reservLast);
        ticketInner.appendChild(define);
    }
    const getReservationLine = (appendTarget, price, title, index, type) => {
        const reservationLineDiv = document.createElement("div");
        reservationLineDiv.className = "reservationLine mgt_15";
        reservationLineDiv.id = "reservationLineArea";
        const ulEl = document.createElement("ul");
        ulEl.className = "detailRule reLine";
        const liEl1 = document.createElement("li");
        const pTit1 = document.createElement("p");
        pTit1.className = "tit";
        pTit1.innerText = "성인";
        liEl1.appendChild(pTit1);
        const pCost1 = document.createElement("p");
        pCost1.className = "cost";
        pCost1.innerText = comma(price) + "원";
        liEl1.appendChild(pCost1);
        ulEl.appendChild(liEl1);
        const liEl2 = document.createElement("li");
        const pTit2 = document.createElement("p");
        pTit2.className = "tit";
        pTit2.innerText = title;
        liEl2.appendChild(pTit2);
        const pCost2 = document.createElement("p");
        pCost2.className = "cost";
        const reserveButton = document.createElement("a");
        reserveButton.className = "btnReservation";
        reserveButton.setAttribute("onclick", "reservationTicket(" + index + ", " + type + ")")
        reserveButton.innerText = "예약하기";
        pCost2.appendChild(reserveButton);
        liEl2.appendChild(pCost2);
        ulEl.appendChild(liEl2);
        reservationLineDiv.appendChild(ulEl);
        appendTarget.appendChild(reservationLineDiv);
    }
    const getTargetFareData = (fnValue) => {
        let targetXml = null;
        for (let i = 0; i < fareList.length; i++) {
            let tempFnValue = fareList[i].getElementsByTagName("FN")[0].innerHTML;
            if (tempFnValue !== fnValue) continue;
            targetXml = fareList[i];
        }

        return targetXml;
    }

    let xmlData = null;
    let searchAirlineArray = [];
    let searchAirlineMap = new Map();
    let timearrvValue = [0, 9900];
    const boardingMap = new Map();

    let reservedType = false;
    let mappingIndexTransferArray = new Array();

    function reservationTicket(mappingIndex, type) {
        reservedType = type;
        const travelType = $("#travelType").find(".current").attr("data");
        let visitCountry = "";
        if ("OW" === travelType || "RT" === travelType) {
            visitCountry = document.getElementById("AIR_whereArrivelCity").children[0].innerHTML;
        } else {
            const elementCount = document.getElementById("useMulti").childElementCount
            for (var i = 0; i < elementCount; i++) {
                visitCountry = document.getElementById("arrivelCity_" + i).value;
                if (i !== elementCount - 1) {
                    visitCountry += ";"
                }
            }
        }

        $.ajax({
            url : "/foreign/reserve/searchImmigrationList.json",
            type : "post",
            dataType : "json",
            data : visitCountry,
            success : function(data) {
                const immigrationInfoList = data.immigrationInfoList;
                for (var i = 0; i < immigrationInfoList.length; i++) {
                    const immigrationInfo = immigrationInfoList[i];
                    let genMessage = "";
                    const splitInfo = immigrationInfo.split(";");
                    for (var j = 0; j < splitInfo.length; j++) {
                        if (j === 0) {
                            genMessage += '<div class="pop-tit-head txt-c">';
                            genMessage += splitInfo[j];
                            genMessage += '</div>'
                        } else {
                            genMessage += splitInfo[j];
                        }
                        genMessage += "<br>";
                    }

                    if (i === immigrationInfoList.length - 1) {
                        mappingIndexTransferArray[0] = mappingIndex;
                        cmnCustromAlertLayer("", genMessage, '네, 확인했습니다.', openReservedPage);
                    } else {
                        cmnCustromAlertLayer("", genMessage, '네, 확인했습니다.');
                    }
                }

            },
            error:function(data) {
                cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function cmnCustromAlertLayer(targetId, msg, confirmMsg, callback) {
        var $open_btn = $("#" + targetId);

        $("input").each(function() {
            var $element = $(this);
            if ($element.attr("readonly") != 'readonly') {
                $element.attr("readonly", true);
                $element.addClass("LAYER");
            }
        });

        var html = [];

        html.push("<div id='" + targetId + "_layer' class='alert-box wd90'>");
        html.push("<div class='popWrap'>");
        html.push("<div class='alert-cont txt-l'>");
        html.push(msg);
        html.push("</div>");
        html.push("<div class='btnArea mgt_20'>");
        html.push("<a href='#none' class='lbtn btn-m filled alert-close' style='background: #466cc2; border:1px solid #466cc2'>" + confirmMsg + "</a>");
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
            $open_btn.focus();
            if(typeof callback != 'undefined' && callback != null) {
                callback();
            }

            return false;
        });
    };

    function setTravelInfo(data) {
        const target = document.getElementById("planInfo");
        const dtEl = document.createElement("dt");
        let dtTextValue = "";
        switch (data.travelType) {
            case "RT" : dtTextValue = dtTextValue + "[왕복] "; break;
            case "OW" : dtTextValue = dtTextValue + "[편도] "; break;
            default : dtTextValue = dtTextValue + "[다구간] ";
        }

        dtTextValue = dtTextValue + data.startCityCode;
        dtEl.appendChild(document.createTextNode(dtTextValue));
        let spanEl1 = document.createElement("span");
        spanEl1.className = "sz";
        spanEl1.innerHTML = data.startCity;
        dtEl.appendChild(spanEl1);
        let spanElChange = document.createElement("span");
        spanElChange.className = "change";
        dtEl.appendChild(spanElChange);
        dtEl.appendChild(document.createTextNode(data.endCityCode));
        let spanEl2 = document.createElement("span");
        spanEl2.className = "sz";
        spanEl2.innerHTML = data.endCity;
        dtEl.appendChild(spanEl2);
        target.appendChild(dtEl);

        const ddEl = document.createElement("dd");
        // let startTime = moment(data.startDate).format("YY.MM.DD(ddd)");
        let startTime = custom.getFormatDate(data.startDate);
        if (data.travelType != "OW") {
            // startTime = startTime + " ~ " + moment(data.endDate).format("YY.MM.DD(ddd)");
            startTime = startTime + " ~ " + custom.getFormatDate(data.endDate);
        }

        let boardingCount = "";
        for (let i = 0; i < data.count.length; i++) {
            const count = data.count[i];
            boardingCount = boardingCount + boardingMap.get(count.ageClass) + " " + count.count;
            if (i < data.count.length - 1 && data.count.length != 1) boardingCount = boardingCount + ", ";
        }

        if (data.count.length == 1) boardingCount = boardingCount + "명";
        const ddTextValue = startTime + " / " + boardingCount;
        ddEl.appendChild(document.createTextNode(ddTextValue));
        target.appendChild(ddEl);
    }
    function checkMultiTravel() {
        let result = false;
        const elementCount = document.getElementById("useMulti").childElementCount;
        for (let i = 0; i < elementCount; i++) {
            let saveValue = document.getElementById("departCity_" + i).value;
            if (null == saveValue || "" == saveValue) {
                result = true;
                break;
            }

            saveValue = document.getElementById("arrivelCity_" + i).value;
            if (null == saveValue || "" == saveValue) {
                result = true;
                break;
            }
        }

        return result;
    }
    function getTravelInfoList() {
        const type = $("#travelType").find(".current").attr("data");
        if (type != "MT") return null;
        let multiTravelList = new Array();
        const elementCount = document.getElementById("useMulti").childElementCount;
        for (let i = 0; i < elementCount; i++) {
            let travelInfo = new Object();
            travelInfo.startCityCode = document.getElementById("departCity_" + i).value;
            travelInfo.startCity = document.getElementById("AIR_whereDepartCity_" + i).children[0].innerHTML;
            travelInfo.endCityCode = document.getElementById("arrivelCity_" + i).value;
            travelInfo.endCity = document.getElementById("AIR_whereArrivelCity_" + i).children[0].innerHTML;
            travelInfo.startDate = document.getElementById("AIR_whereDepartDate_" + i).innerHTML;
            multiTravelList.push(travelInfo);
        }

        return multiTravelList;
    }
    function getCountList() {
        let ageClassType = ["A", "C", "B"];
        let countList = new Array();
        for (let i = 1; i < 4; i++) {
            let object = new Object();
            let count = document.getElementById("AIR_F_C_" + i).value;
            if (count > 0) {
                object.count = count;
                object.ageClass = ageClassType[i - 1];
                object.cabinClass = document.getElementById("AIR_F_S").value;
                countList.push(object);
            }
        }

        return countList;
    }

    function setNoSearchList() {
        $("#ticketArea").empty();
        const target = document.getElementById("ticketArea");
        const mainWrap = document.createElement("div");
        mainWrap.className = "errorNo_wrap";
        const contentWrap = document.createElement("div");
        contentWrap.className = "errorNo";
        const strongEl = document.createElement("strong");
        strongEl.innerText = "항공 정보가 없습니다.";
        const pEl = document.createElement("p");
        pEl.innerText = "항공 조회 조건을 변경한 뒤 다시 검색해 주세요.";
        contentWrap.appendChild(strongEl);
        contentWrap.appendChild(pEl);
        const aEl = document.createElement("a");
        aEl.className = "mgt_20 btnResearch";
        aEl.setAttribute("onclick", "newRequestSearchSchedule()");
        aEl.innerText = "다시 검색";
        contentWrap.appendChild(aEl);
        mainWrap.appendChild(contentWrap);
        target.appendChild(mainWrap);
    }

    function newRequestSearchSchedule() {
        let startCode, endCode, startDate, endDate, isDirect, travelType, cabinClass, startCity, endCity, cabinName;
        try {
            travelType = $("#travelType").find(".current").attr("data");
            isDirect = document.getElementById('tripPlan').checked ? 'Y' : 'N';
            cabinClass = document.getElementById("AIR_F_S").value;
            cabinName = document.getElementById("AIR_F_Seat").innerHTML;
            if (travelType != "MT") {
                startCode = document.getElementById("departCity").value;
                endCode = document.getElementById("arrivelCity").value;
                startCity = document.getElementById("AIR_whereDepartCity").children[0].innerHTML;
                endCity = document.getElementById("AIR_whereArrivelCity").children[0].innerHTML;
                startDate = document.getElementById("AIR_whereDepartDate").innerHTML;
                endDate = document.getElementById("AIR_whereArrivelDate").innerHTML;
            } else {
                const elementCount = document.getElementById("useMulti").childElementCount - 1;
                startCode = document.getElementById("departCity_0").value;
                endCode = document.getElementById("arrivelCity_" + elementCount).value;
                startCity = document.getElementById("AIR_whereDepartCity_0").children[0].innerHTML;
                endCity = document.getElementById("AIR_whereArrivelCity_" + elementCount).children[0].innerHTML;
                startDate = document.getElementById("AIR_whereDepartDate_0").innerHTML;
                endDate = document.getElementById("AIR_whereDepartDate_" + elementCount).innerHTML;
            }
        } catch (e) {
            cmnAlertLayer("", "입력한 정보를 확인해 주세요.")
            return;
        }

        if (startCode == null || "" == startCode) {cmnAlertLayer("", "출발지를 선택해 주세요."); return true;}
        if (endCode == null || "" == endCode) {cmnAlertLayer("", "도착지를 선택해 주세요."); return true;}
        if (startDate == null || "날짜 선택" == startDate) {cmnAlertLayer("", "가는날을 선택해 주세요."); return true;}
        if ((endDate == null || "날짜 선택" == endDate) && travelType != "OW") {cmnAlertLayer("", "오는날을 선택해 주세요."); return true;}
        if (checkMultiTravel() && travelType == "MT") {cmnAlertLayer("", "모든 다구간 여정을 선택해 주세요."); return true;}
        const countInfo = getCountList();
        const travelInfo = getTravelInfoList();

        let dataObject = {
            "startCityCode":startCode,
            "endCityCode":endCode,
            "startCity":startCity,
            "endCity":endCity,
            "startDate":startDate,
            "endDate":endDate,
            "isDirect":isDirect,
            "travelType":travelType,
            "cabinClass":cabinClass,
            "cabinName":cabinName,
            "travelInfo":travelInfo,
            "count":countInfo
        }

        $('.btnUpagain').click()
        $("#searchingImage").show();
        $("#planInfo").empty();
        setTravelInfo(dataObject);
        dataObject = {
            "startCityCode":startCode,
            "endCityCode":endCode,
            "startCity":startCity,
            "endCity":endCity,
            "startDate":startDate,
            "endDate":endDate,
            "isDirect":isDirect,
            "travelType":travelType,
            "cabinClass":cabinClass,
            "cabinName":cabinName,
            "travelInfo":JSON.stringify(travelInfo),
            "count":JSON.stringify(countInfo)
        }
        requestSearchSchedule(dataObject);
    }

    let rqInfo;
    let statusInfo;

    function requestSearchSchedule(data) {
        const travelType = data.travelType;
        $.ajax({
            url : "/foreign/reserve/searchTicketList.json",
            type : "post",
            dataType : "json",
            data : data,
            success : function(data) {
                if (undefined != data.planInfo.responseCode && data.planInfo.responseCode === 503) {
                    cmnAlertLayer("", "조회 중 오류가 발생하였습니다.<br>관리자에게 문의하시거나 나중에 다시 시도하여주십시오.");
                    setNoSearchList();
                    $("#searchingImage").hide();
                    return
                }

                let parser = new DOMParser();
                xmlData = parser.parseFromString(data.planInfo.resultData, "text/xml");
                //console.log(xmlData);
                let isSuccess = xmlData.getElementsByTagName("status")[0].innerHTML;
                if (isSuccess === "FAILURE") {
                    setNoSearchList();
                    let errorMessage = xmlData.getElementsByTagName("returnMessage")[0].innerHTML;
                    if (errorMessage.indexOf("출발 일정이 임박") != -1) {
                        cmnAlertLayer("", errorMessage);
                    } else {
                        cmnAlertLayer("", "조회 중 오류가 발생하였습니다.<br>조건을 변경하거나 다시 시도하여주십시오.");
                    }
                    setNoSearchList();
                    $("#searchingImage").hide();
                    return;
                }

                if (xmlData.getElementsByTagName("returnMessage").length > 0 && xmlData.getElementsByTagName("returnMessage")[0].innerHTML.indexOf("연결이 원활하지 않습니다") !== -1) {
                    cmnAlertLayer("", "항공사 시스템과의 연결이 원활하지 않습니다.<br>잠시 후 다시 시도해 주십시오.");
                    setNoSearchList();
                    $("#searchingImage").hide();
                    return;
                }

                rqInfo = xmlData.getElementsByTagName("rqInfo")[0];
                let dataList = xmlData.getElementsByTagName("fareScheduleSearchProcessRS")[0];
                let dataCount = dataList.getElementsByTagName("MAPPINGS")[0].childElementCount;
                if (dataCount > 0) {
                    setSearchList(dataList, dataCount, travelType);
                    for (var i = 0; i < fareList.length; i++) {
                        const fareData = fareList[i];
                        //console.log(fareData);
                        const airLineCode = fareData.getElementsByTagName("AIR_CD")[0].innerHTML;
                        let airLineName = fareData.getElementsByTagName("AIR_NM")[0].innerHTML;

                        if ("" !== airLineCode) {
                            searchAirlineArray[i] = airLineCode;
                            searchAirlineMap.set(airLineCode, airLineName);
                        }
                    }

                    setAllianceAirLineInfo(data);
                    checkAirline(null, "chk_airline_ALL");
                    statusInfo = xmlData.getElementsByTagName("statusInfo")[0];
                } else {
                    setNoSearchList();
                }

                $("#searchingImage").hide();
                useFilter = false;
                initFTSlider();

            }
            , error:function(data) {
                $("#searchingImage").hide();
                cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }
    function openReservedPage() {
        let startCode, endCode, startDate, endDate, isDirect, travelType, cabinClass, startCity, endCity, cabinName;
        const mappingIndex = mappingIndexTransferArray[0];
        const mappingData = useFilter ? newMappingList[mappingIndex] : mappingList[mappingIndex];
        let endDateInfo, targetXml, segCount;
        travelType = $("#travelType").find(".current").attr("data");
        isDirect = document.getElementById('tripPlan').checked ? 'Y' : 'N';
        cabinClass = document.getElementById("AIR_F_S").value;
        cabinName = document.getElementById("AIR_F_Seat").innerHTML;
        if (travelType != "MT") {
            startCode = document.getElementById("departCity").value;
            endCode = document.getElementById("arrivelCity").value;
            startCity = document.getElementById("AIR_whereDepartCity").children[0].innerHTML;
            endCity = document.getElementById("AIR_whereArrivelCity").children[0].innerHTML;
            startDate = document.getElementById("AIR_whereDepartDate").innerHTML;
            // endDate = document.getElementById("AIR_whereArrivelDate").innerHTML;
            targetXml = getTargetAvailsData("1", mappingData.getAttribute("AN1"));
            segCount = targetXml.getElementsByTagName("SEGS")[0].childElementCount // 경유 횟수
        } else {
            const elementCount = document.getElementById("useMulti").childElementCount - 1;
            startCode = document.getElementById("departCity_0").value;
            endCode = document.getElementById("arrivelCity_" + elementCount).value;
            startCity = document.getElementById("AIR_whereDepartCity_0").children[0].innerHTML;
            endCity = document.getElementById("AIR_whereArrivelCity_" + elementCount).children[0].innerHTML;
            startDate = document.getElementById("AIR_whereDepartDate_0").innerHTML;
            // endDate = document.getElementById("AIR_whereDepartDate_" + elementCount).innerHTML;
            targetXml = getTargetAvailsData(elementCount + "", mappingData.getAttribute("AN" + elementCount));
            segCount = targetXml.getElementsByTagName("SEGS")[0].childElementCount // 경유 횟수
        }

        endDateInfo = targetXml.getElementsByTagName("SEG")[segCount - 1].getElementsByTagName("ARR_DT")[0].innerHTML;
        // endDate = moment(endDateInfo).format("YYYY.MM.DD");
        const tempEndDate = new Date(endDateInfo);
        endDate = tempEndDate.getFullYear() + "." + (tempEndDate.getMonth() + 1) + "." + tempEndDate.getDate();
        const countInfo = getCountList();
        const travelInfo = getTravelInfoList();

        if (startCode == null || "" === startCode) {cmnAlertLayer("", "출발지를 선택해 주세요."); return true;}
        if ((endCode == null || "" === endCode) && travelType !== "OW") {cmnAlertLayer("", "도착지를 선택해 주세요."); return true;}
        if (startDate == null || "날짜 선택" === startDate) {cmnAlertLayer("", "가는날을 선택해 주세요."); return true;}
        if ((endDate == null || "날짜 선택" === endDate) && travelType !== "OW") {cmnAlertLayer("", "오는날을 선택해 주세요."); return true;}
        if (checkMultiTravel() && travelType == "MT") {cmnAlertLayer("", "모든 다구간 여정을 선택해 주세요."); return true;}

        let dataObject = {
            "startCityCode":startCode,
            "endCityCode":endCode,
            "startCity":startCity,
            "endCity":endCity,
            "startDate":startDate,
            "endDate":endDate,
            "isDirect":isDirect,
            "travelType":travelType,
            "cabinClass":cabinClass,
            "cabinName":cabinName,
            "travelInfo":travelInfo,
            "count":countInfo
        }

        localStorage.setItem("mappingData", new XMLSerializer().serializeToString(mappingData));
        const fareData = getFareData(mappingData.getAttribute("FN"));
        localStorage.setItem("fareData", new XMLSerializer().serializeToString(fareData));
        localStorage.setItem("rqInfo", new XMLSerializer().serializeToString(rqInfo));
        localStorage.setItem("reservedData", JSON.stringify(dataObject));
        localStorage.setItem("statusInfo", new XMLSerializer().serializeToString(statusInfo));
        localStorage.setItem("reservedType", String(reservedType));
        localStorage.setItem("ruleParam", mappingData.getAttribute("RULEPARAM"));

        const availList = new Array();
        let airlineCodeList = new Array();
        for (var i = 1; i < 5; i++) {
            const anValue = mappingData.getAttribute("AN" + i);
            if (anValue === "0") break;
            const availData = getTargetAvailsData(i + "", anValue);
            const selectAvailList = availData.getElementsByTagName('SEG');
            for (var j = 0; j < selectAvailList.length; j++) {
                const airLineCode = selectAvailList[j].getElementsByTagName('ARR_CT')[0].innerHTML;
                airlineCodeList.push(airLineCode);
            }
            availList.push(new XMLSerializer().serializeToString(availData));
        }

        localStorage.setItem("availList", JSON.stringify(availList));
        const set = new Set(airlineCodeList);
        airlineCodeList = [...set];
        let airLineCodeListString = "";
        for (var i = 0; i < airlineCodeList.length; i++) {
            airLineCodeListString += airlineCodeList[i];
            if (i !== airlineCodeList.length - 1) airLineCodeListString += ";";
        }

        localStorage.setItem("airLineCode", airLineCodeListString);
        var fmOption = {
            "method" : "post",
            "target" : "_self",
            "action" : "/foreign/reserve/s_ReservedTicket.do"
        };

        var data = {
            "queryString" : mappingData.getAttribute("LANDINGPARAM")
        }

        $.ajax({
            url : "/foreign/reserve/getReservedTicketSession.json",
            type : "post",
            dataType : "json",
            data : data,
            success : function(data) {
                if (data.session) {
                    localStorage.setItem("cookieValue", data.cookie);
                    // controller.createForm(fmOption);
                    // controller.setSerializedFormData(data);
                    // controller.formSubmit();
                } else {
                    cmnAlertLayer('','항공권 예약프로세스 요청 중 오류가 발생하였습니다. 잠시후에 다시 시도해 주십시오.');
                    return;
                }
            }
            , error:function(data) {
                cmnAlertLayer('','항공권 예약프로세스 요청 중 오류가 발생하였습니다. 잠시후에 다시 시도해 주십시오.');
                return;
            }
        });
    }

    const [defaultPrice, setDefaultPrice] = useState([0, 9999900]);
    const [startTime, setStartTime] = useState([0, 1439]);
    const [arriveTime, setArriveTime] = useState([0, 1439]);
    const [startHour, setStartHour] = useState([0, 1439]);
    const [arriveHour, setArriveHour] = useState([0, 1439]);
    const initSlider = (type, id1, id2) => {
        if (type) {
            // $("#slider-range").slider({values: [lowCostValue, highCostValue]});
            // $("#min_price").val(comma(lowCostValue));
            // $("#max_price").val(comma(highCostValue));
            // $("#start_time").slider({values: timeStartValue});
            // $("#arrive_time").slider({values: timeArrvValue});
            // $("#max_start_time").val(timeSlider(timeStartValue[1]));
            // $("#max_arrive_time").val(timeSlider(timeArrvValue[1]));

            setDefaultPrice([0, 9999900]);
        } else {
            // $("#" + id1).slider({values: [0, 2400]});
            // $("#" + id2).slider({values: [0, 2400]});
            // $("#min_" + id1).val(time(timeInitValue[0]));
            // $("#min_" + id2).val(time(timeInitValue[0]));
            // $("#max_" + id1).val(time(timeInitValue[1]));
            // $("#max_" + id2).val(time(timeInitValue[1]));

            setStartTime([0, 1439]);
            setArriveTime([0, 1439]);
        }
    }
    // function mappingListSort(callType) {
    //     //console.log(useFilter)
    //     const targetMappingList = useFilter ? newMappingList : mappingList;
    //     // const targetMappingList =  mappingList;
    //     // console.log(mappingList);
    //     //console.log(newMappingList);
    //     const tempMappingList = [];
    //     for (var i = 0; i < targetMappingList.length; i++) {
    //         const fnValue = targetMappingList[i].getAttribute("FN");
    //         const fareData = getFareData(fnValue);
    //         if (sortType === "priceLow" || sortType === "priceHigh") {
    //             const tempObject = new Object();
    //             tempObject.fnValue = i;
    //             tempObject.targetValue = fareData.getElementsByTagName("AD_AMT")[0].innerHTML;
    //             tempMappingList[i] = tempObject;
    //         } else if (sortType === "lowFlightTime" || sortType === "highFlightTime") {
    //             let flightTime = 0;
    //             for (var j = 1; j < 5; j++) {
    //                 const anValue = targetMappingList[i].getAttribute("AN" + j);
    //                 if (anValue === "0") break;
    //                 const targetXml = getTargetAvailsData(j + "", anValue);
    //                 const time = targetXml.getElementsByTagName("FLIGHT_TIME")[0].innerHTML;
    //                 flightTime += time * 1;
    //             }
    //
    //             const tempObject = new Object();
    //             tempObject.fnValue = i;
    //             tempObject.targetValue = flightTime;
    //             tempMappingList[i] = tempObject;
    //         } else if (sortType.startsWith("fast")) {
    //             const travelType = $("#travelType").find(".current").attr("data");
    //             let time;
    //             let targetXml;
    //             //console.log(mappingList[i]);
    //             if (sortType === "fastArrive" && travelType === "RT") {
    //                 targetXml = getTargetAvailsData("2", mappingList[i].getAttribute("AN2"));
    //                 //console.log(targetXml)
    //             } else {
    //                 targetXml = getTargetAvailsData("1", mappingList[i].getAttribute("AN1"));
    //             }
    //
    //             time = targetXml.getElementsByTagName("DEP_TM")[0].innerHTML;
    //             const tempObject = new Object();
    //             tempObject.fnValue = i;
    //             tempObject.targetValue = time;
    //             tempMappingList[i] = tempObject;
    //         } else {
    //             const tempObject = new Object();
    //             tempObject.fnValue = i;
    //             tempObject.targetValue = fareData.getElementsByTagName("STOP_CNT")[0].innerHTML;
    //             tempMappingList[i] = tempObject;
    //         }
    //     }
    //
    //     if (sortType === "priceLow" || sortType === "priceHigh") {
    //         if(sortType === "priceLow") {
    //             tempMappingList.sort(function (a, b) {
    //                 return a.targetValue - b.targetValue;
    //             });
    //         } else {
    //             tempMappingList.sort(function (a, b) {
    //                 return b.targetValue - a.targetValue;
    //             });
    //         }
    //     } else if (sortType === "lowFlightTime" || sortType === "highFlightTime") {
    //         if(sortType === "lowFlightTime") {
    //             tempMappingList.sort(function (a, b) {
    //                 return a.targetValue - b.targetValue;
    //             });
    //         } else {
    //             tempMappingList.sort(function (a, b) {
    //                 return b.targetValue - a.targetValue;
    //             });
    //         }
    //     } else if (sortType.startsWith("fast")) {
    //
    //         if(sortType === "fastStart") {
    //             tempMappingList.sort(function (a, b) {
    //                 return a.targetValue - b.targetValue;
    //             });
    //         } else {
    //             tempMappingList.sort(function (a, b) {
    //                 return a.targetValue - b.targetValue;
    //             });
    //         }
    //     } else {
    //         tempMappingList.sort(function (a, b) {
    //             return a.targetValue - b.targetValue;
    //         })
    //     }
    //
    //     const sortMappingList = [];
    //     for (var i = 0; i < tempMappingList.length; i++) {
    //         const index = tempMappingList[i].fnValue;
    //         sortMappingList[i] = targetMappingList[index];
    //     }
    //
    //     //useFilter ? newMappingList = sortMappingList : mappingList = sortMappingList;
    //     mappingList=sortMappingList;
    //     if (callType) {
    //         $("#ticketArea").empty();
    //         const travelType = $("#travelType").find(".current").attr("data");
    //         const target = document.getElementById("ticketArea");
    //         setSearchData(target, (useFilter ? newMappingList.length : mappingList.length), travelType);
    //     }
    // }

    const getTargetAvailsData = (inValue, anValue) => {
        let targetXml = null;
        for (let i = 0; i < availsList.length; i++) {
            let tempInValue = availsList[i].getElementsByTagName("IN")[0].innerHTML;
            let tempAnValue = availsList[i].getElementsByTagName("AN")[0].innerHTML;
            if (tempInValue !== inValue) continue;
            if (tempAnValue !== anValue) continue;
            if (tempInValue === inValue && tempAnValue === anValue) {
                targetXml = availsList[i];
                break;
            }
        }

        return targetXml;
    }
    const showDetailTravelInfo = (index, travelType, type) => {
        // const target = document.getElementById("airTimeLineArea");
        // const mappingData = type ? mappingList[index] : newMappingList[index];
        //
        // for (let i = 1; i < 5; i++) {
        //     let targetXml = getTargetAvailsData(i + "", mappingData.getAttribute("AN" + i));
        //     if (null == targetXml) break;
        //     const timeLineDiv = document.createElement("div");
        //     timeLineDiv.className = "timeLine";
        //
        //     const airTitleSpan = document.createElement("span");
        //     airTitleSpan.className = "airTitle mgb_10";
        //     if ("OW" === travelType || "RT" === travelType) {
        //         if (i === 1) {
        //             airTitleSpan.innerText = "가는편";
        //         } else {
        //             airTitleSpan.innerText = "오는편";
        //         }
        //     } else {
        //         airTitleSpan.innerText = "가는편";
        //     }
        //     timeLineDiv.appendChild(airTitleSpan);
        //
        //     const ontheWayDl = document.createElement("dl");
        //     ontheWayDl.className = "ontheWay";
        //     const ontheWayDt = document.createElement("dt");
        //     const segCount = targetXml.getElementsByTagName("SEGS")[0].childElementCount // 경유 횟수
        //     const startAirName = targetXml.getElementsByTagName("SEG")[0].getElementsByTagName("DEP_NM")[0].innerHTML;
        //     ontheWayDt.appendChild(document.createTextNode(startAirName));
        //     const changeSpan = document.createElement("span");
        //     changeSpan.className = "change";
        //     ontheWayDt.appendChild(changeSpan);
        //     const endAirName = " " + targetXml.getElementsByTagName("SEG")[segCount - 1].getElementsByTagName("ARR_NM")[0].innerHTML;
        //     ontheWayDt.appendChild(document.createTextNode(endAirName));
        //     ontheWayDl.appendChild(ontheWayDt);
        //
        //     const travelStartTimeDd = document.createElement("dd");
        //     const dateInfo = targetXml.getElementsByTagName("SEG")[0].getElementsByTagName("DEP_DT")[0].innerHTML;
        //     const timeInfo = targetXml.getElementsByTagName("SEG")[0].getElementsByTagName("DEP_TM")[0].innerHTML;
        //     console.log(dateInfo);
        //     // travelStartTimeDd.innerText = moment(dateInfo).format("YY.MM.DD(ddd)") + " " + time(timeInfo);
        //     travelStartTimeDd.innerText = "" + " " + time(timeInfo);
        //     ontheWayDl.appendChild(travelStartTimeDd);
        //
        //     const segCountDd = document.createElement("dd");
        //     let travelName;
        //     if ("OW" === travelType) travelName = "편도";
        //     else if ("RT" === travelType) travelName = "왕복";
        //     else travelName = "다구간";
        //     segCountDd.innerText = travelName + (segCount - 1 === 0 ? "" : " / 경유 " + (segCount - 1) + "회");
        //     ontheWayDl.appendChild(segCountDd);
        //     timeLineDiv.appendChild(ontheWayDl);
        //
        //     const timeListDiv = document.createElement("div");
        //     timeListDiv.className = "timeList mgt_30";
        //     const timeListWrapUl = document.createElement("ul");
        //     timeListWrapUl.className = "timeList_wrap";
        //     for (var j = 0; j < segCount; j++) {
        //         const startLi = document.createElement("li");
        //         const badgeArea = document.createElement("div");
        //         badgeArea.className = "badgeArea";
        //         badgeArea.innerText = "출발";
        //         startLi.appendChild(badgeArea);
        //         const startDl = document.createElement("dl");
        //         startDl.className = "ontheWay";
        //         const startDt = document.createElement("dt");
        //         const startAprApName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_AP_NM")[0].innerHTML;
        //         const startAprName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_NM")[0].innerHTML;
        //         const startAprCode = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_CT")[0].innerHTML;
        //         startDt.innerText = ("" !== startAprApName ? startAprApName : startAprName) + " " + startAprCode;
        //         startDl.appendChild(startDt);
        //         const startTimeDd = document.createElement("dd");
        //         const startDateInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_DT")[0].innerHTML;
        //         const startTimeInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_TM")[0].innerHTML;
        //         console.log("startDateInfo : " + startDateInfo);
        //         // startTimeDd.innerText = moment(startDateInfo).format("YY.MM.DD(ddd)") + " " + time(startTimeInfo);
        //         startTimeDd.innerText = "" + " " + time(startTimeInfo);
        //         startDl.appendChild(startTimeDd);
        //         const startAirInfoDd = document.createElement("dd");
        //         const startAirInfoUl = document.createElement("ul");
        //         startAirInfoUl.className = "detailBox mgt_15";
        //         const startLi1 = document.createElement("li");
        //         const li1Img = document.createElement("img");
        //         const airLineCode = targetXml.getElementsByTagName("AIR_CD")[j].innerHTML;
        //         li1Img.src = "/smart/images/sub/logo/" + airLineCode + ".png";
        //         li1Img.className = "logo";
        //         startLi1.appendChild(li1Img);
        //         const startAirLineCode = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("AIR_CD")[0].innerHTML;
        //         let startAirLineName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("AIR_NM")[0].innerHTML;
        //         const cd_share=targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("CODE_SHARE")[0].innerHTML;
        //         // console.log(targetXml)
        //         temp=targetXml.getElementsByTagName("SEG")[j];
        //         console.log(temp)
        //         console.log(cd_share);
        //         if(cd_share!=''){
        //             console.log("find")
        //             const share_nm    =targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("CODE_SHARE_NM")[0].innerHTML;
        //             // startAirLineName += "(공동운항, 실제탑승:"+share_nm+")"
        //             startAirLineName += "(공동운항)"
        //         }
        //         const startAirFlightNo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("FLIGHT_NO")[0].innerHTML;
        //         // startLi1.innerText = startAirLineName + " " + startAirLineCode + startAirFlightNo.padStart(4, '0');
        //         startLi1.appendChild(document.createTextNode(startAirLineName + " " + startAirLineCode + startAirFlightNo.padStart(4, '0')));
        //         startAirInfoUl.appendChild(startLi1);
        //         const startLi2 = document.createElement("li");
        //         startLi2.innerText = "" !== startAprApName ? startAprApName : startAprName
        //         startLi2.className = "pdl_20";
        //         startAirInfoUl.appendChild(startLi2);
        //         const startLi3 = document.createElement("li");
        //         const fareData = getFareData(mappingData.getAttribute("FN"));
        //         const freeBag = fareData.getElementsByTagName("FAB")[j].getElementsByTagName("BAG_INFO")[0].innerHTML;
        //         startLi3.innerText = "무료수하물 " + freeBag;
        //         startLi3.className = "pdl_20";
        //         startAirInfoUl.appendChild(startLi3);
        //         const startLi4 = document.createElement("li");
        //         const li4Img = document.createElement("img");
        //         li4Img.src = "/pc/images/images/common/ico_time.png";
        //         li4Img.className = "time";
        //         startLi4.appendChild(li4Img);
        //         // <img src="../../images/common/ico_time.png" alt="시간" class="time">
        //         const flightTime = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("JRNY_YM")[0].innerHTML;
        //         const startHour = flightTime.substring(0, 2);
        //         const startMin = flightTime.substring(2, 4);
        //         const flightTimeSpan = document.createElement("span");
        //         flightTimeSpan.className = "txtTotal";
        //         flightTimeSpan.innerText = (startHour.startsWith("0") ? startHour.substring(1, 2) : startHour) + "시간 " + (startMin.startsWith("0") ? startMin.substring(1, 2) : startMin) + "분 비행";
        //         startLi4.appendChild(flightTimeSpan);
        //         startAirInfoUl.appendChild(startLi4);
        //         startAirInfoDd.appendChild(startAirInfoUl);
        //         startDl.appendChild(startAirInfoDd);
        //         startLi.appendChild(startDl);
        //         timeListWrapUl.appendChild(startLi);
        //         const endLi = document.createElement("li");
        //         const badgeArr = document.createElement("div");
        //         badgeArr.className = j !== (segCount - 1) ? "badgeArea arri" : "badgeArea last";
        //         badgeArr.innerText = "도착";
        //         endLi.appendChild(badgeArr);
        //         const endDl = document.createElement("dl");
        //         endDl.className = "ontheWay";
        //         const endDt = document.createElement("dt");
        //         const endAprApName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_AP_NM")[0].innerHTML;
        //         const endAprName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_NM")[0].innerHTML;
        //         const endAprCode = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_CT")[0].innerHTML;
        //         endDt.innerText = ("" !== endAprApName ? endAprApName : endAprName) + " " + endAprCode;
        //         endDl.appendChild(endDt);
        //         const endTimeDd = document.createElement("dd");
        //         const endDateInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_DT")[0].innerHTML;
        //         const endTimeInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_TM")[0].innerHTML;
        //         // endTimeDd.innerText = moment(endDateInfo).format("YY.MM.DD(ddd)") + " " + time(endTimeInfo);
        //         endTimeDd.innerText = "" + " " + time(endTimeInfo);
        //         endDl.appendChild(endTimeDd);
        //         // const endAirInfoDd = document.createElement("dd");
        //         // const endAirInfoUl = document.createElement("ul");
        //         // endAirInfoUl.className = "detailBox mgt_15";
        //         // const endLi1 = document.createElement("li");
        //         // endLi1.innerText = startAirLineName + " " + startAirLineCode + startAirFlightNo.padStart(4, '0');
        //         // endAirInfoUl.appendChild(endLi1);
        //         // endAirInfoDd.appendChild(endAirInfoUl);
        //         // endDl.appendChild(endAirInfoDd);
        //         endLi.appendChild(endDl);
        //         timeListWrapUl.appendChild(endLi);
        //
        //         if (j !== (segCount - 1)) {
        //             const segLiEl = document.createElement("li");
        //             const badgeAreaDiv = document.createElement("div");
        //             badgeAreaDiv.className = "badgeArea badge";
        //             badgeAreaDiv.innerText = "경유";
        //             segLiEl.appendChild(badgeAreaDiv);
        //             const badgeDl = document.createElement("dl");
        //             badgeDl.className = "ontheWay badge";
        //             const badgeDt = document.createElement("dt");
        //             const segAprApName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_AP_NM")[0].innerHTML;
        //             const segAprName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_NM")[0].innerHTML;
        //             badgeDt.innerText = "" !== segAprApName ? segAprApName : segAprName;
        //             badgeDl.appendChild(badgeDt);
        //             const badgeDd = document.createElement("dd");
        //             const connectTime = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("CON_TM")[0].innerHTML;
        //             badgeDd.innerText = "00" === connectTime.substring(0, 2) ? "" : connectTime.substring(0, 2) + "시간 " + connectTime.substring(2, 4) + "분 대기";
        //             badgeDl.appendChild(badgeDd);
        //             segLiEl.appendChild(badgeDl);
        //             timeListWrapUl.appendChild(segLiEl);
        //         }
        //     }
        //     timeListDiv.appendChild(timeListWrapUl);
        //     timeLineDiv.appendChild(timeListDiv);
        //
        //     target.appendChild(timeLineDiv);
        // }


        $("#travelDetailInformation").show();
    }
    const removeDetailTravelInfo = () => {
        $("#travelDetailInformation").hide();
        $("#airTimeLineArea").empty();
    }

    const getFareData = (fnValue) => {
        let targetXml = null;
        for (let i = 0; i < fareList.length; i++) {
            let tempFnValue = fareList[i].getElementsByTagName("FN")[0].innerHTML;
            if (tempFnValue !== fnValue) continue;
            targetXml = fareList[i];
        }

        return targetXml;
    }
    const openCostDetail = (index, type) => {
        // const landingParam = type ? mappingList[index].getAttribute("LANDINGPARAM") : newMappingList[index].getAttribute("LANDINGPARAM");
        // const mappingData = JSON.parse('{"' + decodeURI(landingParam).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        // const target = document.getElementById("costDetailList");
        // let totalCost = 0
        // if ('0' !== mappingData.adultCount_S) {
        //     let count = mappingData.adultCount_S;
        //     let h2El = document.createElement("h2");
        //     h2El.innerText = "성인 " + count + "명";
        //     target.appendChild(h2El);
        //     let taxValue = (mappingData.adtfuel * 1 + mappingData.adtqamt * 1) + (mappingData.adttax * 1);
        //     let airCost = mappingData.adtamt * 1 - taxValue;
        //     let defaultUl = document.createElement("ul");
        //     defaultUl.className = "detailRule";
        //     let liEl1 = document.createElement("li");
        //     let titPEl1 = document.createElement("p");
        //     titPEl1.className = "tit";
        //     titPEl1.innerText = "항공운임";
        //     liEl1.appendChild(titPEl1);
        //     let costPEl1 = document.createElement("p");
        //     costPEl1.className = "cost";
        //     costPEl1.innerText = comma(airCost) + "원";
        //     liEl1.appendChild(costPEl1);
        //     defaultUl.appendChild(liEl1);
        //     let liEl2 = document.createElement("li");
        //     let titPEl2 = document.createElement("p");
        //     titPEl2.className = "tit";
        //     titPEl2.innerText = "유류할증료";
        //     liEl2.appendChild(titPEl2);
        //     let costPEl2 = document.createElement("p");
        //     costPEl2.className = "cost";
        //     costPEl2.innerText = comma(mappingData.adtfuel * 1 + mappingData.adtqamt * 1) + "원";
        //     liEl2.appendChild(costPEl2);
        //     defaultUl.appendChild(liEl2);
        //     let liEl3 = document.createElement("li");
        //     let titPEl3 = document.createElement("p");
        //     titPEl3.className = "tit";
        //     titPEl3.innerText = "제세공과금";
        //     liEl3.appendChild(titPEl3);
        //     let costPEl3 = document.createElement("p");
        //     costPEl3.className = "cost";
        //     costPEl3.innerText = comma(mappingData.adttax) + "원";
        //     liEl3.appendChild(costPEl3);
        //     defaultUl.appendChild(liEl3);
        //     let liEl4 = document.createElement("li");
        //     let titPEl4 = document.createElement("p");
        //     titPEl4.className = "tit";
        //     titPEl4.innerText = "발권대행료";
        //     liEl4.appendChild(titPEl4);
        //     let costPEl4 = document.createElement("p");
        //     costPEl4.className = "cost";
        //     costPEl4.innerText = comma(mappingData.adttasf) + "원";
        //     liEl4.appendChild(costPEl4);
        //     defaultUl.appendChild(liEl4);
        //     target.appendChild(defaultUl);
        //
        //     let totalDetailUl = document.createElement("ul");
        //     totalDetailUl.className = "detailRule";
        //     let totalDetailLi = document.createElement("li");
        //     let titPEl = document.createElement("p");
        //     titPEl.className = "tit";
        //     titPEl.innerText = "1인 합계";
        //     totalDetailLi.appendChild(titPEl);
        //     let costPEl = document.createElement("p");
        //     costPEl.className = "cost";
        //     costPEl.innerText = comma((mappingData.adttasf * 1) + (mappingData.adtamt * 1)) + "원";
        //     totalDetailLi.appendChild(costPEl);
        //     totalDetailUl.appendChild(totalDetailLi);
        //     target.appendChild(totalDetailUl);
        //
        //     totalCost += ((mappingData.adttasf * 1) + (mappingData.adtamt * 1)) * (count * 1);
        // }
        //
        // if ('0' !== mappingData.childCount_S) {
        //     target.appendChild(document.createElement("br"));
        //     let count = mappingData.childCount_S;
        //     let h2El = document.createElement("h2");
        //     h2El.innerText = "소아 " + count + "명";
        //     target.appendChild(h2El);
        //     let taxValue = (mappingData.chdfuel * 1 + mappingData.chdqamt * 1) + (mappingData.chdtax * 1);
        //     let airCost = mappingData.chdamt * 1 - taxValue;
        //     let defaultUl = document.createElement("ul");
        //     defaultUl.className = "detailRule";
        //     let liEl1 = document.createElement("li");
        //     let titPEl1 = document.createElement("p");
        //     titPEl1.className = "tit";
        //     titPEl1.innerText = "항공운임";
        //     liEl1.appendChild(titPEl1);
        //     let costPEl1 = document.createElement("p");
        //     costPEl1.className = "cost";
        //     costPEl1.innerText = comma(airCost) + "원";
        //     liEl1.appendChild(costPEl1);
        //     defaultUl.appendChild(liEl1);
        //     let liEl2 = document.createElement("li");
        //     let titPEl2 = document.createElement("p");
        //     titPEl2.className = "tit";
        //     titPEl2.innerText = "유류할증료";
        //     liEl2.appendChild(titPEl2);
        //     let costPEl2 = document.createElement("p");
        //     costPEl2.className = "cost";
        //     costPEl2.innerText = comma(mappingData.chdfuel * 1 + mappingData.chdqamt * 1) + "원";
        //     liEl2.appendChild(costPEl2);
        //     defaultUl.appendChild(liEl2);
        //     let liEl3 = document.createElement("li");
        //     let titPEl3 = document.createElement("p");
        //     titPEl3.className = "tit";
        //     titPEl3.innerText = "제세공과금";
        //     liEl3.appendChild(titPEl3);
        //     let costPEl3 = document.createElement("p");
        //     costPEl3.className = "cost";
        //     costPEl3.innerText = comma(mappingData.chdtax) + "원";
        //     liEl3.appendChild(costPEl3);
        //     defaultUl.appendChild(liEl3);
        //     let liEl4 = document.createElement("li");
        //     let titPEl4 = document.createElement("p");
        //     titPEl4.className = "tit";
        //     titPEl4.innerText = "발권대행료";
        //     liEl4.appendChild(titPEl4);
        //     let costPEl4 = document.createElement("p");
        //     costPEl4.className = "cost";
        //     costPEl4.innerText = comma(mappingData.chdtasf) + "원";
        //     liEl4.appendChild(costPEl4);
        //     defaultUl.appendChild(liEl4);
        //     target.appendChild(defaultUl);
        //
        //     let totalDetailUl = document.createElement("ul");
        //     totalDetailUl.className = "detailRule";
        //     let totalDetailLi = document.createElement("li");
        //     let titPEl = document.createElement("p");
        //     titPEl.className = "tit";
        //     titPEl.innerText = "1인 합계";
        //     totalDetailLi.appendChild(titPEl);
        //     let costPEl = document.createElement("p");
        //     costPEl.className = "cost";
        //     costPEl.innerText = comma((mappingData.chdtasf * 1) + (mappingData.chdamt * 1)) + "원";
        //     totalDetailLi.appendChild(costPEl);
        //     totalDetailUl.appendChild(totalDetailLi);
        //     target.appendChild(totalDetailUl);
        //
        //     totalCost += ((mappingData.chdtasf * 1) + (mappingData.chdamt * 1)) * (count * 1);
        // }
        //
        // if ('0' !== mappingData.infantCount_S) {
        //     target.appendChild(document.createElement("br"));
        //     let count = mappingData.infantCount_S;
        //     let h2El = document.createElement("h2");
        //     h2El.innerText = "유아 " + count + "명";
        //     target.appendChild(h2El);
        //     let taxValue = (mappingData.inffuel * 1 + mappingData.infqamt * 1) + (mappingData.inftax * 1);
        //     let airCost = mappingData.infamt * 1 - taxValue;
        //     let defaultUl = document.createElement("ul");
        //     defaultUl.className = "detailRule";
        //     let liEl1 = document.createElement("li");
        //     let titPEl1 = document.createElement("p");
        //     titPEl1.className = "tit";
        //     titPEl1.innerText = "항공운임";
        //     liEl1.appendChild(titPEl1);
        //     let costPEl1 = document.createElement("p");
        //     costPEl1.className = "cost";
        //     costPEl1.innerText = comma(airCost) + "원";
        //     liEl1.appendChild(costPEl1);
        //     defaultUl.appendChild(liEl1);
        //     let liEl2 = document.createElement("li");
        //     let titPEl2 = document.createElement("p");
        //     titPEl2.className = "tit";
        //     titPEl2.innerText = "유류할증료";
        //     liEl2.appendChild(titPEl2);
        //     let costPEl2 = document.createElement("p");
        //     costPEl2.className = "cost";
        //     costPEl2.innerText = comma(mappingData.inffuel * 1 + mappingData.infqamt * 1) + "원";
        //     liEl2.appendChild(costPEl2);
        //     defaultUl.appendChild(liEl2);
        //     let liEl3 = document.createElement("li");
        //     let titPEl3 = document.createElement("p");
        //     titPEl3.className = "tit";
        //     titPEl3.innerText = "제세공과금";
        //     liEl3.appendChild(titPEl3);
        //     let costPEl3 = document.createElement("p");
        //     costPEl3.className = "cost";
        //     costPEl3.innerText = comma(mappingData.inftax) + "원";
        //     liEl3.appendChild(costPEl3);
        //     defaultUl.appendChild(liEl3);
        //     let liEl4 = document.createElement("li");
        //     let titPEl4 = document.createElement("p");
        //     titPEl4.className = "tit";
        //     titPEl4.innerText = "발권대행료";
        //     liEl4.appendChild(titPEl4);
        //     let costPEl4 = document.createElement("p");
        //     costPEl4.className = "cost";
        //     costPEl4.innerText = comma(mappingData.inftasf) + "원";
        //     liEl4.appendChild(costPEl4);
        //     defaultUl.appendChild(liEl4);
        //     target.appendChild(defaultUl);
        //
        //     let totalDetailUl = document.createElement("ul");
        //     totalDetailUl.className = "detailRule";
        //     let totalDetailLi = document.createElement("li");
        //     let titPEl = document.createElement("p");
        //     titPEl.className = "tit";
        //     titPEl.innerText = "1인 합계";
        //     totalDetailLi.appendChild(titPEl);
        //     let costPEl = document.createElement("p");
        //     costPEl.className = "cost";
        //     costPEl.innerText = comma((mappingData.inftasf * 1) + (mappingData.infamt * 1)) + "원";
        //     totalDetailLi.appendChild(costPEl);
        //     totalDetailUl.appendChild(totalDetailLi);
        //     target.appendChild(totalDetailUl);
        //
        //     totalCost += ((mappingData.inftasf * 1) + (mappingData.infamt * 1)) * (count * 1);
        // }
        //
        // const totalCostUl = document.createElement("ul");
        // totalCostUl.className = "detailRule total";
        // const totalCostLi = document.createElement("li");
        // const titPEl = document.createElement("p");
        // titPEl.className = "tit";
        // titPEl.innerText = "최종 결제 금액";
        // totalCostLi.appendChild(titPEl);
        // const costPEl = document.createElement("p");
        // costPEl.className = "cost";
        // costPEl.innerText = comma(String(totalCost)) + "원";
        // totalCostLi.appendChild(costPEl);
        // totalCostUl.appendChild(totalCostLi);
        // target.appendChild(totalCostUl);
        //
        // const addTxt = document.createElement("div");
        // addTxt.className = "popAddTxt";
        // const addTxtP = document.createElement("p");
        // addTxtP.innerHTML = "※ 상세 요금 정보는 라쿠카라차 특가 기준으로 노출됩니다.";
        // addTxt.appendChild(addTxtP);
        // target.appendChild(addTxt);

        $("#costDetailInformation").show();
    }
    const removeCostDetail = () => {
        $("#costDetailList").empty();
        $("#costDetailInformation").hide();
    }
    const openCostRule = (index, type) => {
        // 요금규정 호출
        $("#header").hide();
        $("#content").hide();
        $("#footer").hide();
        $("#searchingDefaultImage").show();
        // const data = type ? mappingList[index].getAttribute("RULEPARAM") : newMappingList[index].getAttribute("RULEPARAM");
        // controller.ajaxSend({
        // $(document).ajaxSend({
        //     url : "/foreign/reserve/searchCostRule.json"
        //     ,type : "post"
        //     ,dataType : "json"
        //     ,data : data
        //     ,successCall : function(data) {
        //         let parser = new DOMParser();
        //         let xmlData = parser.parseFromString(data.costInfo.resultData, "text/xml");
        //         let isSuccess = xmlData.getElementsByTagName("status")[0].innerHTML;
        //         if (isSuccess === "FAILURE") {
        //             cmnAlertLayer("", "조회 중 오류가 발생하였습니다.");
        //             $("#searchingDefaultImage").hide();
        //             return;
        //         }
        //
        //         const dataTabTarget = document.getElementById("ruleList");
        //         let costInfoList = xmlData.getElementsByTagName("fareRuleTextInfoGrp");
        //         for (let i = 0; i < costInfoList.length; i++) {
        //             const liEl = document.createElement("li");
        //             if (i === 0) liEl.className = "current";
        //
        //             const tabId = "tab" + (i + 1) + "" + (i + 1);
        //             liEl.dataset.tab = tabId;
        //             liEl.setAttribute("onclick", "changeCostTab(this)");
        //             const aEl = document.createElement("a");
        //             aEl.innerText = "요금규정" + (i + 1);
        //             liEl.appendChild(aEl);
        //             dataTabTarget.appendChild(liEl);
        //
        //             const targetDiv = document.getElementById(tabId);
        //             const costInfo = costInfoList[i].children;
        //             for (let j = 0; j < costInfo.length; j++) {
        //                 const singleCostInfo = costInfo[j];
        //                 if (singleCostInfo.nodeName === "fcartruleyn") continue;
        //                 const ruleDiv = document.createElement("div");
        //                 ruleDiv.className = "feeRule";
        //                 const dlEl = document.createElement("dl");
        //                 const dtEl = document.createElement("dt");
        //                 dtEl.innerHTML = singleCostInfo.getElementsByTagName("title")[0].innerHTML;
        //                 dlEl.appendChild(dtEl);
        //                 const ddEl = document.createElement("dd");
        //                 let tempPre = document.getElementById("htmlTempProcess");
        //                 tempPre.innerHTML = singleCostInfo.getElementsByTagName("content")[0].innerHTML;
        //                 ddEl.innerHTML = tempPre.innerText;
        //                 dlEl.appendChild(ddEl);
        //                 ruleDiv.appendChild(dlEl);
        //                 targetDiv.appendChild(ruleDiv);
        //             }
        //         }
        //
        //         $("#costDefineInformation").show();
        //         $("#searchingDefaultImage").hide();
        //     }
        //     , error:function(data) {
        //         $("#searchingDefaultImage").hide();
        //         cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
        //         return;
        //     }
        // });
    }
    // const changeCostTab = (element) => {
    //     const id = element.dataset.tab;
    //     const parent = element.parentElement;
    //     for (var i = 0; i < parent.childElementCount; i++) {
    //         const child = parent.children[i];
    //         const className = child.className;
    //         if (className === "current") {
    //             const tempId = child.dataset.tab;
    //             if (id !== tempId) {
    //                 child.className = "";
    //                 element.className = "current";
    //                 $("#" + tempId).removeClass("current");
    //                 $("#" + id).addClass("current");
    //                 break;
    //             }
    //         }
    //     }
    // }
    const removeCostRule = () => {
        $("#footer").show();
        $("#content").show();
        $("#header").show();

        $("#costDefineInformation").hide();
        $("#ruleList").empty();
        $("#tab11").empty();
        $("#tab22").empty();
        $("#tab33").empty();
        $("#tab44").empty();
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

    const [filter, setFilter] = useState({
        flightType: 0,
        feeType: 0,
        feeRange: [0, 9999900],
        dTimeRange: [0, 24],
        aTimeRange: [0, 24],
        dFlightRange: [0, 60],
        aFlightRange: [0, 60],
    });
    const updateSearchList = () => {
        mappingList = xmlData.getElementsByTagName("fareScheduleSearchProcessRS")[0].getElementsByTagName("MAPPINGS")[0].children;
        newMappingList = new Array();
        let checkBox = document.getElementsByName("chk_direct");
        let directValue = "A";  // A : 그냥, Y : 직항만, N : 경유 1회인 아이들 포함된 것만
        checkBox.forEach((cb) => { if (cb.checked) directValue = cb.value; });
        checkBox = document.getElementsByName("chk_fee");
        let feeValue = "A"; // A : 그냥 , Y : 성인만(fn 5000번대 제외), N : 장애인만(fn 5000번대만)
        checkBox.forEach((cb) => { if (cb.checked) feeValue = cb.value; });

        const minPrice = document.getElementById("min_price").value.replaceAll(",", "");
        const maxPrice = document.getElementById("max_price").value.replaceAll(",", "");
        const minStart = document.getElementById("min_start").value.replace(":", "");
        const maxStart = document.getElementById("max_start").value.replace(":", "");
        const minArrive = document.getElementById("min_arrive").value.replace(":", "");
        const maxArrive = document.getElementById("max_arrive").value.replace(":", "");
        const minStartTime = document.getElementById("min_start_time").value.replace(":", "");
        const maxStartTime = document.getElementById("max_start_time").value.replace(":", "");
        const minArriveTime = document.getElementById("min_arrive_time").value.replace(":", "");
        const maxArriveTime = document.getElementById("max_arrive_time").value.replace(":", "");

        const airLineList = document.getElementById("airLineListArea").getElementsByTagName("dd");
        const selectAirLineArray = new Array();
        for (var i = 0; i < airLineList.length; i++) {
            if (airLineList[i].children[0].checked) {
                selectAirLineArray.push(airLineList[i].children[0].value);
            }
        }

        const travelType = $("#travelType").find(".current").attr("data");
        for (var i = 0; i < mappingList.length; i++) {
            const fnValue = mappingList[i].getAttribute("FN");
            const targetFareXml = getFareData(fnValue);
            const stopCount = targetFareXml.getElementsByTagName("STOP_CNT")[0].innerHTML;
            //const stopCount2 = targetFareXml.innerHTML.getElementsByTagName("STOP_CNT");

            if (directValue === "N") {
                if (stopCount !== "1") continue;
            } else if (directValue === "Y") {
                if (stopCount !== "0") continue;
            }

            if (feeValue === "N") {
                if (!fnValue.startsWith("50")) continue;
            } else {
                if (feeValue === "Y" && fnValue.startsWith("50")) continue;
            }

            let costValue = targetFareXml.getElementsByTagName("AD_AMT")[0].innerHTML;
            costValue = (costValue * 1) + (targetFareXml.getElementsByTagName("AD_TASF")[0].innerHTML * 1);
            if (minPrice > costValue || maxPrice < costValue) continue;
            let checkTimeValue = false;
            for (var j = 1; j < 5; j++) {
                const anValue = mappingList[i].getAttribute("AN" + j);
                if (anValue === "0") continue;
                const targetAvailXml = getTargetAvailsData(j + "", anValue);
                const deptTime = targetAvailXml.getElementsByTagName("DEP_TM")[0].innerHTML * 1;
                if ((minStart * 1) > deptTime || (maxStart * 1) < deptTime) checkTimeValue = true;
                const arrTime = targetAvailXml.getElementsByTagName("ARR_TM")[0].innerHTML * 1;
                if((minArrive * 1) > arrTime || (maxArrive * 1) < arrTime) checkTimeValue = true;
                let flightTime = targetAvailXml.getElementsByTagName("FLIGHT_TIME")[0].innerHTML * 1;
                if (j === 2 && travelType === 'RT') {
                    if ((minArriveTime * 1) > flightTime || (maxArriveTime * 1) < flightTime) checkTimeValue = true;
                } else {
                    if ((minStartTime * 1) > flightTime || (maxStartTime * 1) < flightTime) checkTimeValue = true;
                }
            }

            if (checkTimeValue) continue;
            let airLineValue = true;
            const airLineCode = targetFareXml.getElementsByTagName("AIR_CD")[0].innerHTML;
            for (var j = 0; j < selectAirLineArray.length; j++) {
                if (airLineCode === selectAirLineArray[j]) airLineValue = false;
            }
            if (airLineValue) continue;
            newMappingList.push(mappingList[i]);
        }

        mappingListSort(false);
        useFilter = true;
        $("#ticketArea").empty();
        const target = document.getElementById("ticketArea");
        for (var i = 0; i < newMappingList.length; i++) {
            const ticketNew = document.createElement("div");
            ticketNew.className = "ticket_new";
            const ticketInner = document.createElement("div");
            ticketInner.className = "ticketInner";
            // 잔여좌석
            let seatCount = getLeftSeatCount(i, false);
            setTicketSitInfo(ticketInner, seatCount, i, travelType, false);

            // 티켓정보
            setAirLineInfo(ticketInner, newMappingList[i], travelType);
            // 할인
            setDefineInfo(ticketInner, newMappingList[i], i, false);

            ticketNew.appendChild(ticketInner);
            target.appendChild(ticketNew);
        }

        if (newMappingList.length === 0) setNoSearchList();

        // 조회 개수 입력해주기
        document.getElementById("searchCount").innerHTML = newMappingList.length;

        // $("#filterPOP").hide();
    }
    function mappingListSort(callType) {
        //console.log(useFilter)
        const targetMappingList = useFilter ? newMappingList : mappingList;
        // const targetMappingList =  mappingList;
        // console.log(mappingList);
        //console.log(newMappingList);
        const tempMappingList = [];
        for (var i = 0; i < targetMappingList.length; i++) {
            const fnValue = targetMappingList[i].getAttribute("FN");
            const fareData = getFareData(fnValue);
            if (sortType === "priceLow" || sortType === "priceHigh") {
                const tempObject = new Object();
                tempObject.fnValue = i;
                tempObject.targetValue = fareData.getElementsByTagName("AD_AMT")[0].innerHTML;
                tempMappingList[i] = tempObject;
            } else if (sortType === "lowFlightTime" || sortType === "highFlightTime") {
                let flightTime = 0;
                for (var j = 1; j < 5; j++) {
                    const anValue = targetMappingList[i].getAttribute("AN" + j);
                    if (anValue === "0") break;
                    const targetXml = getTargetAvailsData(j + "", anValue);
                    const time = targetXml.getElementsByTagName("FLIGHT_TIME")[0].innerHTML;
                    flightTime += time * 1;
                }

                const tempObject = new Object();
                tempObject.fnValue = i;
                tempObject.targetValue = flightTime;
                tempMappingList[i] = tempObject;
            } else if (sortType.startsWith("fast")) {
                const travelType = $("#travelType").find(".current").attr("data");
                let time;
                let targetXml;
                //console.log(mappingList[i]);
                if (sortType === "fastArrive" && travelType === "RT") {
                    targetXml = getTargetAvailsData("2", mappingList[i].getAttribute("AN2"));
                    //console.log(targetXml)
                } else {
                    targetXml = getTargetAvailsData("1", mappingList[i].getAttribute("AN1"));
                }

                time = targetXml.getElementsByTagName("DEP_TM")[0].innerHTML;
                const tempObject = new Object();
                tempObject.fnValue = i;
                tempObject.targetValue = time;
                tempMappingList[i] = tempObject;
            } else {
                const tempObject = new Object();
                tempObject.fnValue = i;
                tempObject.targetValue = fareData.getElementsByTagName("STOP_CNT")[0].innerHTML;
                tempMappingList[i] = tempObject;
            }
        }

        if (sortType === "priceLow" || sortType === "priceHigh") {
            if(sortType === "priceLow") {
                tempMappingList.sort(function (a, b) {
                    return a.targetValue - b.targetValue;
                });
            } else {
                tempMappingList.sort(function (a, b) {
                    return b.targetValue - a.targetValue;
                });
            }
        } else if (sortType === "lowFlightTime" || sortType === "highFlightTime") {
            if(sortType === "lowFlightTime") {
                tempMappingList.sort(function (a, b) {
                    return a.targetValue - b.targetValue;
                });
            } else {
                tempMappingList.sort(function (a, b) {
                    return b.targetValue - a.targetValue;
                });
            }
        } else if (sortType.startsWith("fast")) {

            if(sortType === "fastStart") {
                tempMappingList.sort(function (a, b) {
                    return a.targetValue - b.targetValue;
                });
            } else {
                tempMappingList.sort(function (a, b) {
                    return a.targetValue - b.targetValue;
                });
            }
        } else {
            tempMappingList.sort(function (a, b) {
                return a.targetValue - b.targetValue;
            })
        }

        const sortMappingList = [];
        for (var i = 0; i < tempMappingList.length; i++) {
            const index = tempMappingList[i].fnValue;
            sortMappingList[i] = targetMappingList[index];
        }

        //useFilter ? newMappingList = sortMappingList : mappingList = sortMappingList;
        mappingList=sortMappingList;
        if (callType) {
            $("#ticketArea").empty();
            const travelType = $("#travelType").find(".current").attr("data");
            const target = document.getElementById("ticketArea");
            setSearchData(target, (useFilter ? newMappingList.length : mappingList.length), travelType);
        }
    }
    const filterClear = () => {
        const checkBox = document.getElementsByName("chk_direct");
        checkBox.forEach((cb) => { cb.checked = false; });
        document.getElementById("cbx_direct_chkAll").checked = true;

        const costFee = document.getElementsByName("chk_fee");
        costFee.forEach((cb) => { cb.checked = false; });
        document.getElementById("cbx_fee_chkAll").checked = true;

        initSlider(true, '', '');
        initSlider(false, 'start', 'arrive');
        // initSlider(false, 'start_time', 'arrive_time');
        initFTSlider();
        // checkAirline(null, "chk_airline_ALL");
        $("#airLineListArea input").prop("checked", true);

        const target = document.getElementById("ticketArea");
        $("#ticketArea").empty();
        const travelType = $("#travelType").find(".current")[0].getAttribute("data");
        setSearchData(target, mappingList.length, travelType);

        $("#filterPOP").hide();
    }

    function setTopValueArea() {
        for (var i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    sortType = "priceLow";
                    break;
                case 1:
                    sortType = "priceHigh";
                    break;
                case 2:
                    sortType = "highFlightTime";
                    break;
            }

            mappingListSort(false);
            let normalCost = "0";
            let hour = 0;
            let min = 0;
            try {
                if ((newMappingList !== undefined && newMappingList.length !== 0) || mappingList.length !== 0) {
                    const mappingData = useFilter ? newMappingList[0] : mappingList[0];
                    let targetFareId = mappingData.getAttribute("FN");
                    const targetFareData = getTargetFareData(targetFareId);
                    normalCost = targetFareData.getElementsByTagName("AD_AMT")[0].innerHTML;
                    normalCost = (normalCost * 1) + (targetFareData.getElementsByTagName("AD_TASF")[0].innerHTML * 1);

                    let tempFlightTime = "";
                    let startFlightTime = "";
                    let arriveFlightTime = "";
                    let anValue = mappingData.getAttribute("AN1");
                    let targetXml = getTargetAvailsData(1 + "", anValue);
                    tempFlightTime = targetXml.getElementsByTagName("FLIGHT_TIME")[0].innerHTML;
                    tempFlightTime = tempFlightTime.padStart(4, '0');
                    hour = tempFlightTime.substring(0, 2) * 1;
                    min = tempFlightTime.substring(2, 4) * 1;
                    startFlightTime = (hour * 1) + ((min - (min % 60)) / 60) + "" + (min % 60 + '').padStart(2, '0');
                    anValue = mappingData.getAttribute("AN2");
                    if ("0" !== anValue) {
                        targetXml = getTargetAvailsData(2 + "", anValue);
                        tempFlightTime = targetXml.getElementsByTagName("FLIGHT_TIME")[0].innerHTML;
                        tempFlightTime = tempFlightTime.padStart(4, '0');
                        hour += tempFlightTime.substring(0, 2) * 1;
                        min += tempFlightTime.substring(2, 4) * 1;
                    }
                    anValue = mappingData.getAttribute("AN3");
                    if ("0" !== anValue) {
                        targetXml = getTargetAvailsData(3 + "", anValue);
                        tempFlightTime = targetXml.getElementsByTagName("FLIGHT_TIME")[0].innerHTML;
                        tempFlightTime = tempFlightTime.padStart(4, '0');
                        hour += tempFlightTime.substring(0, 2) * 1;
                        min += tempFlightTime.substring(2, 4) * 1;
                    }
                    anValue = mappingData.getAttribute("AN4");
                    if ("0" !== anValue) {
                        targetXml = getTargetAvailsData(4 + "", anValue);
                        tempFlightTime = targetXml.getElementsByTagName("FLIGHT_TIME")[0].innerHTML;
                        tempFlightTime = tempFlightTime.padStart(4, '0');
                        hour += tempFlightTime.substring(0, 2) * 1;
                        min += tempFlightTime.substring(2, 4) * 1;
                    }

                    hour = (hour * 1) + ((min - (min % 60)) / 60);
                    min = min % 60 + '';
                    arriveFlightTime = hour + "" + min.padStart(2, '0');

                    if (i === 0) {
                        lowCostValue = normalCost;
                    } else if (i == 1) {
                        highCostValue = normalCost;
                    } else if (i == 2) {
                        timeStartValue[1] = startFlightTime;
                        timearrvValue[1] = arriveFlightTime;
                        initSlider(true, '', '');
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }

        sortType = "priceLow";
        mappingListSort(false);
    }

    const scrollBottom = () => {
        $("html, body").animate({ scrollTop: $(document).height() }, 500);
    }


    return (
        <>
            <div id="header" className="center"></div>
            <div className="loadWrap-new" id="searchingImage"
                 style={{display:"none"}}
            >
                <div className="loader2">
                    <span>선택하신 여정의 항공 스케줄을 검색 중입니다.</span>
                </div>
            </div>
            <div className="loadWrap-new" id="searchingDefaultImage"
                 style={{display:"none"}}
            >
                <div className="loader2">
                    <span>선택하신 여정의 정보를 불러오는 중입니다.</span>
                </div>
            </div>

            <div id="header">
                <div className="header_top center">
                    <a href="#" className="btnPrev" onClick={() => window.history.back()}>이전</a>
                    <h1>
                        예약
                    </h1>
                </div>
            </div>
            <div id="content" className="orderDone">
                <div className="planOne_wrap">
                    <div className="planOne_l">
                        <dl id="planInfo">
                            <dt>[왕복] ICN<span className="sz">인천</span><span className="change"></span>JFK<span
                                className="sz">뉴욕/존에프케네디</span></dt>
                            <dd>23.06.01(목) ~ 23.06.30(금) / 성인 1명</dd>
                        </dl>
                    </div>
                    <div className="planOne_r">
                        <a className="pop-again pop-layer3 btnAgain" onClick={() => showPopup()}>재선택</a>
                        <a className="btnUpagain" style={{display:"none"}} onClick={() => hiddenPopup()}>접기</a>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="allCount_wrap titWrap">
                    <div>
                        <div className="allCountD">검색결과</div>
                        <div className="allCount">
                            총 <span className="fbd" id="searchCount">260</span>개 요금
                            <a // href="#costInfomation"
                               className="pop-layer question" onClick={() => {
                                const div = document.createElement("div");
                                div.setAttribute("id", "dimmd-layer");
                                document.body.appendChild(div);
                                $("#costInfomation").show();
                            }}>툴팁</a>
                        </div>
                    </div>
                    <div>
                        <a href="#" className="pop-sort icSort pop-layer" onClick={() => showSortPopup()}>정렬</a>
                        <a // href="#filterPOP"
                           className="icFilter top-btn full-pop-layer" onClick={() => $("#filterPOP").show()}>필터</a>
                    </div>
                </div>

                <div className="ticketWrap" id="ticketArea">
                    <div className="ticket_new">
                        <div className="ticketInner">
                            <div className="sit titWrap">
                                <div>잔여좌석 <span>6석</span></div>
                                <div className="sitMore"><a className="full-pop-layer linkOpen"
                                    // onClick="showDetailTravelInfo(0, 'RT' , true)"
                                    onClick={() => showDetailTravelInfo(0, 'RT' , true)}
                                >상세 스케줄</a>
                                </div>
                            </div>
                            <div className="ticketInfo">
                                <div className="titWrap">
                                    <div className="airline_new">
                                        <img src="/smart/images/sub/logo/EY.png" className="logo"/>
                                        <div className="airInfo">
                                            <div className="airTime">17:55<span>-</span>16:00</div>
                                            <div className="airName">에티하드항공<span>ICN-JFK</span></div>
                                            <div className="directionDepa">가는날</div>
                                        </div></div>
                                    <div className="reserveInfo_new">
                                        <div className="info1">경유 1회</div>
                                        <div className="info2">35시간 05분</div>
                                    </div>
                                </div>
                                <div className="titWrap">
                                    <div className="airline_new">
                                        <img src="/smart/images/sub/logo/EY.png" className="logo"/>
                                        <div className="airInfo">
                                            <div className="airTime">14:30<span>-</span>11:40</div>
                                            <div className="airName">에티하드항공<span>JFK-ICN</span></div>
                                            <div className="directionArri">오는날</div>
                                        </div></div>
                                    <div className="reserveInfo_new">
                                        <div className="info1">경유 1회</div>
                                        <div className="info2">32시간 10분</div>
                                    </div>
                                </div>
                            </div>
                            <div className="define">
                                <div className="reservationLine mgt_15" id="reservationLineArea">
                                    <ul className="detailRule reLine">
                                        <li>
                                            <p className="tit">성인</p>
                                            <p className="cost">2,806,100원</p>
                                        </li>
                                        <li>
                                            <p className="tit">할인요금</p>
                                            <p className="cost">
                                                <a className="btnReservation"
                                                   // onClick="reservationTicket(0, false)"
                                                   onClick={() => reservationTicket(0, false)}
                                                >예약하기</a>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="reservationLine last mgt_5 mgb_15">
                                    <ul className="detailRule reLine">
                                        <li><p className="cost">
                                            <a className="full-pop-layer linkOpen"
                                                // onClick="openCostDetail(0, true)"
                                                onClick={() => openCostDetail(0, true)}
                                            >요금상세 보기</a>
                                            <a className="full-pop-layer linkOpen"
                                                // onClick="openCostRule(0, true)"
                                                onClick={() => openCostRule(0, true)}
                                            >요금규정 보기</a>
                                        </p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="allSns01" className="popup-box">
                    <div className="popWrap">
                        <a // href="javascript:void(0);"
                           className="pop-close layer-close">닫기</a>
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1>공유하기</h1>
                            </div>
                        </div>
                        <div className="pop-cont mgt_20">
                            <div className="alert-cont">
                                <div className="shareCon">
                                    <ul>
                                        <li>
                                            <a href="#" className="facebook">페이스북</a>
                                        </li>
                                        <li>
                                            <a href="#" className="kakao">카카오톡</a>
                                        </li>
                                        <li>
                                            <a href="#" className="urlcopy">URL 복사</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="reSelectPop" className="top-sheet-order sort" style={{position: "absolute"}}>
                    <div id="re_search" className="order-price m-quick">
                        <div className="tabcont">
                            <div className="s-tabArea">
                                <ul className="tab" id="travelType">
                                    {/*<li data="RT" className="current"*/}
                                    {/*    // onClick="setForeignAirWayType(this, 0);"*/}
                                    {/*    onClick={(e) => setForeignAirWayType(e.currentTarget, 0)}*/}
                                    {/*    id="AIR_FORE_TAB_1">*/}
                                    {/*    <a href="#">왕복</a>*/}
                                    {/*</li>*/}
                                    {/*<li data="OW" onClick="setForeignAirWayType(this, 1);" id="AIR_FORE_TAB_2">*/}
                                    {/*    <a href="#">편도</a>*/}
                                    {/*</li>*/}
                                    {/*<li data="MT" onClick="setForeignAirWayType(this, 2);" id="AIR_FORE_TAB_3">*/}
                                    {/*    <a href="#">다구간</a>*/}
                                    {/*</li>*/}
                                    {Object.values(foreignAirWayTypeList).map((a, index) =>
                                        <li id={a.id} className={index == foreignAirWayType ? "current" : ""} data-type={a.type} key={index}
                                            // onClick={() => setForeignAirWayType(index)}
                                            onClick={(e) => setForeignAirWayTypeFunction(e.currentTarget, index)}
                                        >
                                            <a href="#">{a.kor}</a>
                                        </li>
                                    )}
                                    <li className="check_trip" style={{position: "absolute!important", right: "13px"}}>
                                        <input id="tripPlan" type="checkbox"/><label htmlFor="tripPlan">직항</label>
                                    </li>
                                </ul>
                                <div id="tab7-1" className="tabcontent current">
                                    <div className="quick-option">
                                        <div id="noneMulti">
                                            <div id="fore_travel_0" className="placeSel">
                                                <a // href="javascript:void(0);"
                                                   className="select"
                                                   // onClick="foreOpenAirStation(this, '출발지');"
                                                   onClick={(e) => foreOpenAirStation(e.currentTarget, '출발지')}
                                                   id="AIR_whereDepartCity">
                                                    ICN<span className="country">인천</span>
                                                </a>
                                                <input type="hidden" name="depCity" id="departCity" value="ICN"/>
                                                <a // href="javascript:void(0);"
                                                   className="change"
                                                    // onClick="swapArea();"
                                                    onClick={() => swapArea()}
                                                ></a>
                                                <a // href="javascript:void(0);"
                                                   className="select"
                                                   // onClick="foreOpenAirStation(this, '도착지');"
                                                   onClick={(e) => foreOpenAirStation(e.currentTarget, '도착지')}
                                                   id="AIR_whereArrivelCity">
                                                    JFK<span className="country">뉴욕/존에프케네디</span>
                                                </a>
                                                <input type="hidden" name="arrCity" id="arrivelCity" value="JFK"/>
                                            </div>
                                            <div id="AIR_FORE_DATASEL" className="dateSel v2">
                                                <dl>
                                                    <dt>가는날</dt>
                                                    <dd
                                                        // onClick="openCalendar(this, 1, 1, 1);"
                                                        onClick={(e) => openCalendar(e.currentTarget, 1, 1, 1)}
                                                        id="AIR_whereDepartDate" className="CAL_DATE select" style={{fontSize: "17px",}}>2023.06.01
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>오는날</dt>
                                                    <dd
                                                        // onClick="openCalendar(this, 1, 1, 1);"
                                                        onClick={(e) => openCalendar(e.currentTarget, 1, 1, 1)}
                                                        id="AIR_whereArrivelDate" className="CAL_DATE select" style={{fontSize: "17px"}}>2023.06.30
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>

                                        <div id="useMulti" style={{display:"none"}}>
                                            <div id="multi_cell_0" className="placeSel">
                                                <div id="multi_travel_0" className="multiSel">
                                                    <a href="#" className="start"
                                                       // onClick="foreOpenAirStation(this, '출발지');"
                                                       onClick={(e) => foreOpenAirStation(e.currentTarget, '출발지')}
                                                       id="AIR_whereDepartCity_0">
                                                        출발<span className="country">지역</span>
                                                    </a>
                                                    <input type="hidden" name="depCity" id="departCity_0"/>
                                                    <a className="oneway"></a>
                                                    <input type="hidden" name="arrCity" id="arrivelCity_0"/>
                                                    <a href="#" className="arrive"
                                                       // onClick="foreOpenAirStation(this, '도착지');"
                                                       onClick={(e) => foreOpenAirStation(e.currentTarget, '도착지')}
                                                       id="AIR_whereArrivelCity_0">
                                                        도착<span className="country">지역</span>
                                                    </a>
                                                </div>
                                                <div id="multi_date_0" className="dateSel v5">
                                                    <dl>
                                                        <dt>가는날</dt>
                                                        <dd
                                                            // onClick="openMultiCalendar(this, 1, 1, 1);"
                                                            onClick={(e) => openMultiCalendar(e.currentTarget, 1, 1, 1)}
                                                            id="AIR_whereDepartDate_0" className="CAL_DATE">날짜 선택
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                            <div id="multi_cell_1" className="placeSel">
                                                <div id="multi_travel_1" className="multiSel">
                                                    <a href="#" className="start"
                                                       // onClick="foreOpenAirStation(this, '출발지');"
                                                       onClick={(e) => foreOpenAirStation(e.currentTarget, '출발지')}
                                                       id="AIR_whereDepartCity_1">
                                                        출발<span className="country">지역</span>
                                                    </a>
                                                    <input type="hidden" name="depCity" id="departCity_1"/>
                                                    <a className="oneway"></a>
                                                    <input type="hidden" name="arrCity" id="arrivelCity_1"/>
                                                    <a href="#" className="arrive"
                                                       // onClick="foreOpenAirStation(this, '도착지');"
                                                       onClick={(e) => foreOpenAirStation(e.currentTarget, '도착지')}
                                                       id="AIR_whereArrivelCity_1">
                                                        도착<span className="country">지역</span>
                                                    </a>
                                                </div>
                                                <div id="multi_date_1" className="dateSel v5">
                                                    <dl>
                                                        <dt>가는날</dt>
                                                        <dd
                                                            // onClick="openMultiCalendar(this, 1, 1, 1);"
                                                            onClick={(e) => openMultiCalendar(e.currentTarget, 1, 1, 1)}
                                                            id="AIR_whereDepartDate_1" className="CAL_DATE">날짜 선택
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="foreTravelAdd" className="wayArea" style={{display:"none"}}
                                             // onClick="addForeTravel()"
                                             onClick={() => addForeTravel()}
                                        >
                                            <a href="#">여정추가</a>
                                        </div>
                                        <div className="dateSel v1"
                                            // onClick="openAirMemberAndSeat(this);"
                                            onClick={(e) => openAirMemberAndSeat(e.currentTarget)}
                                        >
                                            <dl>
                                                <dt>인원</dt>
                                                <dd className="select">
                                                    <a // href="javascript:void(0);"
                                                       id="AIR_F_whereACnt">성인 1명</a>
                                                </dd>
                                                <input type="hidden" id="AIR_F_C_1" value="1"/>
                                                <input type="hidden" id="AIR_F_C_2" value="0"/>
                                                <input type="hidden" id="AIR_F_C_3" value="0"/>
                                            </dl>
                                            <dl>
                                                <dt>좌석</dt>
                                                <dd className="select">
                                                    <a // href="javascript:void(0);"
                                                       id="AIR_F_Seat">일반석</a>
                                                </dd>
                                                <input type="hidden" id="AIR_F_S" value="Y"/>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btnArea">
                                <a href="#" className="lbtn filled"
                                    // onClick="newRequestSearchSchedule()"
                                    onClick={() => newRequestSearchSchedule()}
                                >항공권 검색</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-sheet-order sort">
                    <button type="button" className="btn-close" id="updateSort"
                        onClick={() => hiddenSortPopup()}
                    ></button>
                    <div className="order-price">
                        <strong className="sortTit">정렬기준</strong>
                        <div className="arraySelect">
                            {sortTypeList.map((a, index) =>
                                <p className={index == 0 ? "on" : ""}
                                    onClick={(e) => setSortType(e.currentTarget, a.eng)}>
                                    <a href="#">{a.kor}</a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div id="filterPOP" className="full-layer"
                    // style={{display: "block"}}
                    tabIndex="0">
                    <div className="popWrap">
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1>필터</h1>
                                <a href="#" className="btnClose full-pop-close"
                                   onClick={() => $("#filterPOP").hide()}
                                >닫기</a>
                            </div>
                        </div>
                        <div className="pop-cont">
                            <div className="boxCont msgBox">
                                <h2>직항/경유</h2>
                                <div className="tableD noBor">
                                    <div className="chkBox">
                                        <input type="checkbox" id="cbx_direct_chkAll" name="chk_direct" value="A"
                                            // onClick="checkDirectValue(this)"
                                            onClick={(e) => checkDirectValue(e.currentTarget)}
                                            // checked="checked"
                                        />
                                        <label htmlFor="cbx_direct_chkAll">전체</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" id="cbx_direct_chk1" name="chk_direct" value="Y"
                                            // onClick="checkDirectValue(this)"
                                            onClick={(e) => checkDirectValue(e.currentTarget)}
                                        />
                                        <label htmlFor="cbx_direct_chk1">직항</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" id="cbx_direct_chk2" name="chk_direct" value="N"
                                            // onClick="checkDirectValue(this)"
                                            onClick={(e) => checkDirectValue(e.currentTarget)}
                                        />
                                        <label htmlFor="cbx_direct_chk2">경유1회</label>
                                    </div>
                                </div>

                                <h2 className="mgt_20">요금조건</h2>
                                <div className="tableD noBor">
                                    <div className="chkBox">
                                        <input type="checkbox" id="cbx_fee_chkAll" name="chk_fee" value="A"
                                            // onClick="checkCashValue(this)"
                                            onClick={(e) => checkCashValue(e.currentTarget)}
                                            // checked="checked"
                                        />
                                        <label htmlFor="cbx_fee_chkAll">전체</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" id="cbx_fee_chk1" name="chk_fee"
                                            // onClick="checkCashValue(this)"
                                            onClick={(e) => checkCashValue(e.currentTarget)}
                                            value="Y"/>
                                        <label htmlFor="cbx_fee_chk1">성인</label>
                                    </div>
                                    <div className="chkBox">
                                        <input type="checkbox" id="cbx_fee_chk2" name="chk_fee"
                                            // onClick="checkCashValue(this)"
                                            onClick={(e) => checkCashValue(e.currentTarget)}
                                            value="N"/>
                                        <label htmlFor="cbx_fee_chk2">장애인</label>
                                    </div>
                                </div>

                                <div className="titWrap">
                                    <h2 className="mgt_20">1명 기준요금</h2>
                                    <a href="#" className="btn_reset"
                                        // onClick="initSlider(true, '', '')"
                                        onClick={() => initSlider(true, '', '')}
                                    >초기화</a>
                                </div>


                                <div className="handler_wrap">
                                    <div className="wonHandler">
                                        <div className="price-min">
                                            <input type="text" id="min_price" className="price-range-field" value={defaultPrice[0].toLocaleString("ko-KR")} readOnly={true}/>
                                            <span className="min_won">원</span>
                                        </div>

                                        <div className="price-max">
                                            <input type="text" id="max_price" className="price-range-field" value={defaultPrice[1].toLocaleString("ko-KR")} readOnly={true}/>
                                            <span className="max_won">원</span>
                                        </div>
                                    </div>

                                    {/*<div id="slider-range"*/}
                                    {/*     className="price-filter-range mgt_10 ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"*/}
                                    {/*     name="rangeInput">*/}
                                    {/*    <div className="ui-slider-range ui-corner-all ui-widget-header" style={{left: "28.1363%", width: "33.8373%"}}></div>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "28.1363%"}}></span>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "61.9736%"}}></span>*/}
                                    {/*</div>*/}

                                    <Slider
                                        range
                                        allowCross={false}
                                        defaultValue={[0, 9999900]}
                                        onChange={(value) => {
                                            setDefaultPrice(value);
                                            // defaultPrice.current = value;
                                            // $("#min_price").val(value[0].toLocaleString("ko-KR"));
                                            // $("#max_price").val(value[1].toLocaleString("ko-KR"));
                                        }}
                                        value={defaultPrice}
                                        min={0}
                                        max={9999900}
                                    />
                                </div>

                                <div className="titWrap">
                                    <h2 className="mgt_20">시간대</h2>
                                    <a href="#" className="btn_reset"
                                        // onClick="initSlider(false, 'start', 'arrive')"
                                        onClick={() => initSlider(false, 'start', 'arrive')}
                                    >초기화</a>
                                </div>
                                <div className="handler_wrap">
                                    <div className="wonHandler">
                                        <span className="handlerTxt">가는날 출발시간</span>
                                        <div className="price-min">
                                            <input type="text" id="min_start" className="price-range-field" value={zeroFormat(Math.floor(startTime[0] / 60)) + ":" + zeroFormat(startTime[0] % 60)} readOnly={true}/>
                                        </div>
                                        <div className="price-max">
                                            <input type="text" id="max_start" className="price-range-field" value={zeroFormat(Math.floor(startTime[1] / 60)) + ":" + zeroFormat(startTime[1] % 60)} readOnly={true}/>
                                        </div>
                                    </div>
                                    {/*<div id="start"*/}
                                    {/*     className="price-filter-range mgt_10 ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"*/}
                                    {/*     name="startInput" style={{marginBottom: "10px"}}>*/}
                                    {/*    <div className="ui-slider-range ui-corner-all ui-widget-header" style={{left: "0%", width: "100%"}}></div>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "0%"}}></span>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "100%"}}></span>*/}
                                    {/*</div>*/}
                                    <Slider
                                        range
                                        allowCross={false}
                                        defaultValue={[0, 1439]}
                                        onChange={(value) => {
                                            setStartTime(value);
                                        }}
                                        value={startTime}
                                        min={0}
                                        max={1439}
                                    />

                                    <div className="wonHandler">
                                        <span className="handlerTxt">오는날 출발시간</span>
                                        <div className="price-min">
                                            <input type="text" id="min_arrive" className="price-range-field" value={zeroFormat(Math.floor(arriveTime[0] / 60)) + ":" + zeroFormat(arriveTime[0] % 60)} readOnly={true}/>
                                        </div>
                                        <div className="price-max">
                                            <input type="text" id="max_arrive" className="price-range-field" value={zeroFormat(Math.floor(arriveTime[1] / 60)) + ":" + zeroFormat(arriveTime[1] % 60)} readOnly={true}/>
                                        </div>
                                    </div>
                                    {/*<div id="arrive"*/}
                                    {/*     className="price-filter-range mgt_10 ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"*/}
                                    {/*     name="arriveInput" style={{marginBottom: "10px"}}>*/}
                                    {/*    <div className="ui-slider-range ui-corner-all ui-widget-header" style={{left: "0%", width: "100%"}}></div>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "0%"}}></span>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "100%"}}></span>*/}
                                    {/*</div>*/}
                                    <Slider
                                        range
                                        allowCross={false}
                                        defaultValue={[0, 1439]}
                                        onChange={(value) => {
                                            setArriveTime(value);
                                        }}
                                        value={arriveTime}
                                        min={0}
                                        max={1439}
                                    />
                                </div>

                                <div className="titWrap">
                                    <h2 className="mgt_20">소요시간</h2>
                                    <a href="#" className="btn_reset"
                                        // onClick="initFTSlider()"
                                        onClick={() => initFTSlider()}
                                    >초기화</a>
                                </div>
                                <div className="handler_wrap">
                                    <div className="wonHandler">
                                        <span className="handlerTxt">가는날 소요시간</span>
                                        <div className="price-min">
                                            <input type="text" id="min_start_time" className="price-range-field" value={zeroFormat(Math.floor(startHour[0] / 60)) + ":" + zeroFormat(startHour[0] % 60)} readOnly={true}/>
                                        </div>
                                        <div className="price-max">
                                            <input type="text" id="max_start_time" className="price-range-field" value={zeroFormat(Math.floor(startHour[1] / 60)) + ":" + zeroFormat(startHour[1] % 60)} readOnly={true}/>
                                        </div>
                                    </div>
                                    {/*<div id="start_time"*/}
                                    {/*     className="price-filter-range mgt_10 ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"*/}
                                    {/*     name="startTimeInput" style={{marginBottom: "10px"}}>*/}
                                    {/*    <div className="ui-slider-range ui-corner-all ui-widget-header" style={{left: "0%", width: "100%"}}></div>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "0%"}}></span>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "100%"}}></span>*/}
                                    {/*</div>*/}
                                    <Slider
                                        range
                                        allowCross={false}
                                        defaultValue={[0, 1439]}
                                        onChange={(value) => {
                                            setStartHour(value);
                                        }}
                                        value={startHour}
                                        min={0}
                                        max={1439}
                                    />

                                    <div className="wonHandler">
                                        <span className="handlerTxt">오는날 소요시간</span>
                                        <div className="price-min">
                                            <input type="text" id="min_arrive_time" className="price-range-field" value={zeroFormat(Math.floor(arriveHour[0] / 60)) + ":" + zeroFormat(arriveHour[0] % 60)} readOnly={true}/>
                                        </div>
                                        <div className="price-max">
                                            <input type="text" id="max_arrive_time" className="price-range-field" value={zeroFormat(Math.floor(arriveHour[1] / 60)) + ":" + zeroFormat(arriveHour[1] % 60)} readOnly={true}/>
                                        </div>
                                    </div>
                                    {/*<div id="arrive_time"*/}
                                    {/*     className="price-filter-range mgt_10 ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"*/}
                                    {/*     name="arriveTimeInput" style={{marginBottom: "10px"}}>*/}
                                    {/*    <div className="ui-slider-range ui-corner-all ui-widget-header" style={{left: "0%", width: "100%"}}></div>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "0%"}}></span>*/}
                                    {/*    <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{left: "100%"}}></span>*/}
                                    {/*</div>*/}
                                    <Slider
                                        range
                                        allowCross={false}
                                        defaultValue={[0, 1439]}
                                        onChange={(value) => {
                                            setArriveHour(value);
                                        }}
                                        value={arriveHour}
                                        min={0}
                                        max={1439}
                                    />

                                </div>

                                <h2 className="pdt_20">항공사</h2>
                                <section className="mgt_20 goods-detail airline" id="openAirlineList">
                                    <div className="tab02 goods-detail-info">
                                        <div className="tabcontent current">
                                            <div className="goods-explan">
                                                <div className="inner">
                                                    <dl className="airline_dl" id="airLineListArea">
                                                        <dt>
                                                            <input type="checkbox" value="" id="allInputCheckBox"/>
                                                            <label htmlFor="allInputCheckBox"
                                                                // onClick="checkAirline(this, 'chk_airline_ALL')"
                                                                // onClick={(event) => checkAirline(event.currentTarget, 'chk_airline_ALL')}
                                                                onClick={(event) => checkAirline(event.currentTarget, 'allInputCheckBox')}
                                                            >전체</label>
                                                        </dt>

                                                        {airline.map(a =>
                                                            <>
                                                                <dt>
                                                                    <input type="checkbox"
                                                                           // value=""
                                                                           // name="chk_airline_ALL"
                                                                        // onClick={(e) => checkAirline(e.currentTarget, a.id)}
                                                                        id={a.id}/>
                                                                    <label
                                                                        // htmlFor="chk_airline_0"
                                                                        htmlFor={a.id}
                                                                        onClick={(e) => checkAirline(e.currentTarget, a.id)}
                                                                    >{a.kor}</label>
                                                                </dt>
                                                                {a.list.map((item, index) =>
                                                                    <dd>
                                                                        <input type="checkbox" id={item.id} name={a.id} value={item.eng}/>
                                                                        <label htmlFor={item.id}>{item.kor}</label>
                                                                    </dd>
                                                                )}
                                                            </>
                                                        )}

                                                        {/*<dt>*/}
                                                        {/*    <input type="checkbox" value="" name="chk_airline_ALL" onClick="checkAirline(this, 'chk_airline_0')" id="cbx_airline_0"/>*/}
                                                        {/*    <label htmlFor="chk_airline_0" onClick="checkAirline(this, 'chk_airline_0')">스타얼라이언스</label>*/}
                                                        {/*</dt>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_0_chk2" name="chk_airline_0" value="AC"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_0_chk2">에어캐나다</label>*/}
                                                        {/*</dd>*/}

                                                        {/*<dt>*/}
                                                        {/*    <input type="checkbox" value="" name="chk_airline_ALL" onClick="checkAirline(this, 'chk_airline_1')" id="cbx_airline_1"/>*/}
                                                        {/*    <label htmlFor="chk_airline_1" onClick="checkAirline(this, 'chk_airline_1')">스카이팀</label>*/}
                                                        {/*</dt>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_1_chk1" name="chk_airline_1" value="KE"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_1_chk1">대한항공</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_1_chk3" name="chk_airline_1" value="DL"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_1_chk3">델타항공</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_1_chk4" name="chk_airline_1" value="AF"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_1_chk4">에어프랑스</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_1_chk6" name="chk_airline_1" value="KL"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_1_chk6">KLM네덜란드항공</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_1_chk13" name="chk_airline_1" value="CI"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_1_chk13">중화항공</label>*/}
                                                        {/*</dd>*/}

                                                        {/*<dt>*/}
                                                        {/*    <input type="checkbox" value="" name="chk_airline_ALL" onClick="checkAirline(this, 'chk_airline_2')" id="cbx_airline_2"/>*/}
                                                        {/*    <label htmlFor="chk_airline_2" onClick="checkAirline(this, 'chk_airline_2')">원월드</label>*/}
                                                        {/*</dt>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_2_chk5" name="chk_airline_2" value="AY"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_2_chk5">핀에어</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_2_chk7" name="chk_airline_2" value="JL"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_2_chk7">일본항공</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_2_chk10" name="chk_airline_2" value="QR"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_2_chk10">카타르항공</label>*/}
                                                        {/*</dd>*/}

                                                        {/*<dt>*/}
                                                        {/*    <input type="checkbox" value="" name="chk_airline_ALL" onClick="checkAirline(this, 'chk_airline_6')" id="cbx_airline_6"/>*/}
                                                        {/*    <label htmlFor="chk_airline_6" onClick="checkAirline(this, 'chk_airline_6')">기타</label>*/}
                                                        {/*</dt>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_0_chk6" name="chk_airline_0" value="EY"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_0_chk6">에티하드항공</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_1_chk6" name="chk_airline_1" value="PR"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_1_chk6">필리핀항공</label>*/}
                                                        {/*</dd>*/}
                                                        {/*<dd>*/}
                                                        {/*    <input type="checkbox" id="cbx_airline_2_chk6" name="chk_airline_2" value="EK"/>*/}
                                                        {/*    <label htmlFor="cbx_airline_2_chk6">에미레이트항공</label>*/}
                                                        {/*</dd>*/}
                                                    </dl>
                                                </div>
                                                <div className="more">
                                                    <button type="button" className="btn-goods-more"
                                                        onClick={() => {
                                                            let $goodsExplan = $('.goods-explan'), $goodsMoreBtn = $('.btn-goods-more');
                                                                $goodsExplan.toggleClass('active');
                                                                $goodsMoreBtn.find('>span').text( $goodsMoreBtn.find('>span').text() === '접기' ? '펼쳐보기' : '접기' )
                                                        }}>
                                                        <span>펼쳐보기</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="btnArea mgt_30">
                                    <a // href="#none"
                                       className="lbtn btn-large filled"
                                       style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                                       // onClick="updateSearchList()"
                                       onClick={() => updateSearchList()}
                                    >확인</a>
                                </div>
                                <div className="txt-c mgt_20">
                                    <a href="#" className="btn_allReset"
                                        // onClick="filterClear()"
                                        onClick={() => filterClear()}
                                    >전체 초기화</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="lacha01" className="popup-box">
                    <div className="popWrap">
                        <a // href="javascript:void(0);"
                           className="pop-close layer-close">닫기</a>
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1>라쿠카라차 특가</h1>
                            </div>
                        </div>
                        <div className="pop-cont">
                            <div className="alert-cont left">
                                (내용이 없어 더현대트래블 복사)<br/>
                                혜택 적용 현대카드 외 기타 신용카드(타 현대카드 포함) 및 현금 결제 시 적용됩니다.
                            </div>
                        </div>
                    </div>
                </div>

                <div id="skpoint01" className="popup-box">
                    <div className="popWrap">
                        <a // href="javascript:void(0);"
                           className="pop-close layer-close">닫기</a>
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1>SK 포인트 특가</h1>
                            </div>
                        </div>
                        <div className="pop-cont">
                            <div className="alert-cont left">
                                (내용이 없어 더현대트래블 복사)<br/>
                                ※ 항공권 청구 할인은 순수 항공운임에서 10%적용됩니다.<br/>
                                (단, 일 할인한도 최대 10 만원 / the Red 2일 할인한도 없음)<br/><br/>
                            <span className="f13 cGray4">
					※ 전월 실적에 따라 적용 혜택이 달라질 수 있습니다.<br/>
					(카드별 한도가 상이하므로 상세내용을 현대카드 홈페이지참고)
					</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="foreAirStationArea" style={{display:"none"}}>
                <input type="hidden" name="foreInputArea" id="foreInputArea"/>
                <div id="header" className="center">
                    <div className="header_top">
                        <a // href="javascript:void(0);"
                           className="btnPrev foreAirStationArea"
                           // onClick="closeForeAirStation();"
                           onClick={() => closeForeAirStation()}
                        >이전</a>
                        <h1 className="foreAirStationArea"><span id="foreAirStationHeader"></span> 선택</h1>
                    </div>
                </div>
                <div style={{paddingTop : "57px"}}>
                        <div className="searchWrap v1">
                            <div className="searchForm">
                                <input type="text" id="searchForeWord" placeholder="도시, 공항명 또는 장소를 검색"
                                    // onChange="searchForeCityCode()"
                                    onChange={() => searchForeCityCode()}
                                />
                                <a href="#" className="btn-closed"
                                    // onClick="viewChange(true)"
                                    onClick={() => viewChange(true)}
                                >
                                    <span className="hdn">검색</span>
                                </a>
                            </div>
                        </div>
                        <div className="start-p" id="allCity">
                            <div className="whole-city">전체도시</div>
                            <div className="whole-tab">
                                <div className="city-btn" id="tablinkArea">
                                    {/*<button className="tablinks active" onClick="openCity(event,'KOR')">국내</button>*/}
                                    {country.map((item, index)=>
                                        <button className={`tablinks ${index == 0 ? "active" : ""}`} key={index}
                                            onClick={(e) => openCity(e.currentTarget, item.eng)}
                                        >{item.kor}</button>)}
                                </div>
                                {/*<div className="cityTabcontent" id="KOR" style={{display: "block"}}>*/}
                                {/*    <p className="place"><a href="#" onClick="setForeList(this)">*/}
                                {/*        <span className="airport">GMP</span><span className="city">김포</span>*/}
                                {/*    </a></p>*/}
                                {/*</div>*/}
                                {country.map((item, index)=>
                                    <div className="cityTabcontent" id={item.eng} key={index} style={index == 0 ? {display: "block",} : {display: "none",}}>
                                        {/*<p className="place"><a href="#" onClick="setForeList(this)"><span className="airport">ICN</span><span className="city">인천</span></a></p>*/}
                                        {item.list.map((city, cIndex) =>
                                            <p className="place" key={cIndex}>
                                                <a href="#"
                                                   onClick={(e) => setForeList(e.currentTarget)}
                                                >
                                                    <span className="airport">{city.eng}</span>
                                                    <span className="city">{city.kor}</span>
                                                </a>
                                            </p>
                                        )}
                                    </div>)}
                            </div>
                        </div>
                        <div className="start-p" id="searchCity">
                            <ul id="searchTarget">
                            </ul>
                        </div>
                    </div>
            </div>

            <div className="foreAirDateArea" style={{display:"none", paddingTop: "57px",}}>
                <div id="header" className="center">
                    <div className="header_top">
                        <a // href="javascript:void(0);"
                           className="btnPrev foreCalendarArea"
                            // onClick="closeMultiCalendar();"
                            onClick={() => closeMultiCalendar()}
                        >이전</a>
                        <h1 className="foreCalendarArea">날짜 선택</h1>
                    </div>
                </div>
                {/*<div id="multiTravelDateList" className="quick-option CALENDAR_DBL"*/}
                {/*     style={{display: "none", paddingTop: "57px",}}>*/}
                {/*    <div id="date_multi" className="dateSel vMulti bg">*/}
                {/*        <dl id="date_multi_0">*/}
                {/*            <dt>여정1</dt>*/}
                {/*            <dd className=""><a href="#">날짜선택</a></dd>*/}
                {/*        </dl>*/}
                {/*        <dl id="date_multi_1">*/}
                {/*            <dt>여정2</dt>*/}
                {/*            <dd className=""><a href="#">날짜선택</a></dd>*/}
                {/*        </dl>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <DatePicker
                    id="ForeCAL_1"
                    // onChange={onChange}
                    onChange={multiTravelDateSetChange}
                    selected={selectedMultiDate}
                    // startDate={startDate}
                    // endDate={endDate}
                    dateFormat="yyyy.MM.dd"
                    // selectsRange={true}
                    inline

                    locale={ko}
                    monthsShown={12}
                    minDate={new Date()}
                    renderCustomHeader={({
                        monthDate,
                        // date,
                        // customHeaderCount,
                        // prevMonthButtonDisabled,
                        // nextMonthButtonDisabled,
                    }) => (
                        <div>{monthDate.getFullYear()}.{monthDate.getMonth() + 1}</div>
                    )}
                    renderDayContents={(day) => (<div><span>{day}</span></div>)}
                />

                <div className="btmBtn-fixed cal ">
                    <a // href="javascript:void(0);"
                       className="lbtn filled btn-large mgt_30"
                        style={{background: "#466cc2", border: "1px solid #466cc2",}}
                        onClick={() => closeMultiCalendar()}
                    >선택 완료</a>
                </div>
            </div>

            <div className="foreAirMemberAndSeatArea" style={{display:"none"}}>
                <div id="header" className="center">
                    <div className="header_top">
                        <a href="#" className="btnPrev"
                            // onClick="closeAirMemberAndSeat()"
                            onClick={() => closeAirMemberAndSeat()}
                        >이전</a>
                        <h1>탑승객 및 좌석 선택</h1>
                    </div>
                </div>
                <div id="content">
                    <div className="passenger-title">탑승객</div>
                    <ul className="person-sel">
                        <li>
                            <dl>
                                <dt>성인</dt>
                                <dd>만 12세 이상</dd>
                            </dl>
                            <div id="adult">
                                <button type="button" className="minus"
                                    // onClick="updateCount(this, true, 'AIR_F_C_1')"
                                    onClick={(e) => updateCount(e.currentTarget, true, 'AIR_F_C_1')}
                                ></button>
                                <span id="AIR_Count_1">1</span>
                                <button type="button" className="plus"
                                    // onClick="updateCount(this, false, 'AIR_F_C_1')"
                                    onClick={(e) => updateCount(e.currentTarget, false, 'AIR_F_C_1')}
                                ></button>
                            </div>
                        </li>
                        <li>
                            <dl>
                                <dt>소아</dt>
                                <dd>만 2세~12세 미만</dd>
                            </dl>
                            <div id="kid">
                                <button type="button" className="minus"
                                    // onClick="updateCount(this, true, 'AIR_F_C_2')"
                                    onClick={(e) => updateCount(e.currentTarget, true, 'AIR_F_C_2')}
                                ></button>
                                <span id="AIR_Count_2">0</span>
                                <button type="button" className="plus"
                                    // onClick="updateCount(this, false, 'AIR_F_C_2')"
                                    onClick={(e) => updateCount(e.currentTarget, false, 'AIR_F_C_2')}
                                ></button>
                            </div>
                        </li>
                        <li>
                            <dl>
                                <dt>유아</dt>
                                <dd>만 2세 미만</dd>
                            </dl>
                            <div id="baby">
                                <button type="button" className="minus"
                                    // onClick="updateCount(this, true, 'AIR_F_C_3')"
                                    onClick={(e) => updateCount(e.currentTarget, true, 'AIR_F_C_3')}
                                ></button>
                                <span id="AIR_Count_3">0</span>
                                <button type="button" className="plus"
                                    // onClick="updateCount(this, false, 'AIR_F_C_3')"
                                    onClick={(e) => updateCount(e.currentTarget, false, 'AIR_F_C_3')}
                                ></button>
                            </div>
                        </li>
                        <div className="passenger-comment">*만 2세미만 유아의 경우 좌석이 없습니다. 별도 좌석에 탑승하려면 소아로 선택해 주세요</div>
                    </ul>

                    <div className="passenger-title hr">좌석</div>
                    <ul className="seat-btn">
                        <li className="on select" data="Y" id="seat_btn_Y"
                            // onClick="setSeatVal(this)"
                            onClick={(e) => setSeatVal(e.currentTarget)}
                        ><a href="#">일반석</a></li>
                        <li data="W" id="seat_btn_W"
                            // onClick="setSeatVal(this)"
                            onClick={(e) => setSeatVal(e.currentTarget)}
                        ><a href="#">프리미엄 일반석</a></li>
                        <li data="C" id="seat_btn_C"
                            // onClick="setSeatVal(this)"
                            onClick={(e) => setSeatVal(e.currentTarget)}
                        ><a href="#">비즈니스석</a></li>
                        <li data="F" id="seat_btn_F"
                            // onClick="setSeatVal(this)"
                            onClick={(e) => setSeatVal(e.currentTarget)}
                        ><a href="#">일등석</a></li>
                    </ul>

                    <div className="btmBtn-fixed">
                        <a // href="#none"
                           className="lbtn filled btn-large mgt_30"
                            style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                            // onClick="closeAirMemberAndSeat()"
                            onClick={() => closeAirMemberAndSeat()}
                        >확인</a>
                    </div>
                </div>
            </div>

            <div className="calendarArea" style={{display:"none"}}>
                <div id="header" className="center">
                    <div className="header_top">
                        <a // href="javascript:void(0);"
                           className="btnPrev calendarArea"
                            // onClick="closeCalendar();"
                            onClick={() => closeCalendar()}
                        >이전</a>
                        <h1 className="calendarArea">날짜 선택</h1>
                    </div>
                </div>
                <div id="travelDateList" className="quick-option CALENDAR_DBL" style={{display: "none", paddingTop: "57px",}}>
                    <div className="dateSel v2 bg CALENDAR_TP">
                        <dl>
                            <dt id="CAL_START">가는날</dt>
                            <dd><a // href="javascript:void(0);"
                                   id="CALENDAR_D_DATE">날짜 선택</a></dd>
                        </dl>
                        <dl>
                            <dt id="CAL_END">오는날</dt>
                            <dd><a // href="javascript:void(0);"
                                   id="CALENDAR_A_DATE">날짜 선택</a></dd>
                        </dl>
                    </div>
                </div>

                <DatePicker
                    id="CAL_1"
                    onChange={onChange}
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy.MM.dd"
                    selectsRange={selectsRange}
                    inline

                    locale={ko}
                    monthsShown={12}
                    minDate={new Date()}
                    renderCustomHeader={({
                                             monthDate,
                                             // date,
                                             // customHeaderCount,
                                             // prevMonthButtonDisabled,
                                             // nextMonthButtonDisabled,
                                         }) => (
                        <div>{monthDate.getFullYear()}.{monthDate.getMonth() + 1}</div>
                    )}
                    renderDayContents={(day) => (<div><span>{day}</span></div>)}
                />

                <div className="btmBtn-fixed cal CALENDAR_DBL" style={{display:"none"}}>
                    <a // href="javascript:void(0);"
                       className="lbtn filled btn-large mgt_30"
                        style={{background: "#466cc2", border: "1px solid #466cc2",}}
                        // onClick="setFromToVal();"
                        onClick={() => setFromToVal()}
                    >선택 완료</a>
                </div>

            </div>

            <div id="costInfomation" className="popup-box" style={{top: "calc(50% - 125px)", left: 0}}>
                <div className="popWrap">
                    {/*<a href="javascript:void(0);" className="pop-close layer-close"*/}
                    {/*    onClick={() => {*/}
                    {/*        $("#costInfomation").hide();*/}
                    {/*        document.getElementById("dimmd-layer").remove();*/}
                    {/*    }}*/}
                    {/*>닫기</a>*/}
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>요금 안내</h1>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="alert-cont left">
                            목록에 표시된 금액은<br/>
                            세금 및 수수료를 모두 포함한<br/>
                            1인 기준 요금입니다.
                        </div>
                        <div className="flexWrap btnArea mgt_20">
                            {/*<a href="javascript:void(0);" className="lbtn filled-g btn-m filled alert-close">취소</a>*/}
                            <a // href="javascript:void(0);"
                               className="lbtn btn-m filled alert-close"
                                style={{background: "#4a6cb3", border: "1px solid #4a6cb3",}}
                                onClick={() => {
                                    $("#costInfomation").hide();
                                    document.getElementById("dimmd-layer").remove();
                                }}
                            >확인</a>
                        </div>
                    </div>
                </div>
            </div>

            <div id="travelDetailInformation" className="full-layer" style={{display:"none"}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>상세 스케줄</h1>
                            <a href="#" className="btnClose full-pop-close"
                                // onClick="removeDetailTravelInfo()"
                                onClick={() => removeDetailTravelInfo()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        {/*<div className="boxCont msgBox" id="airTimeLineArea"></div>*/}
                        <div className="boxCont msgBox" id="airTimeLineArea">
                            <div className="timeLine"><span className="airTitle mgb_10">가는편</span>
                                <dl className="ontheWay">
                                    <dt>서울<span className="change"></span> 뉴욕</dt>
                                    <dd>23.06.01(목) 17:55</dd>
                                    <dd>왕복 / 경유 1회</dd>
                                </dl>
                                <div className="timeList mgt_30">
                                    <ul className="timeList_wrap">
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>인천 ICN</dt>
                                                <dd>23.06.01(목) 17:55</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>
                                                            <img src="/smart/images/sub/logo/EY.png" className="logo"/>
                                                            에티하드항공 EY0857
                                                        </li>
                                                        <li className="pdl_20">인천</li>
                                                        <li className="pdl_20">무료수하물 2개</li>
                                                        <li>
                                                            <img src="/pc/images/images/common/ico_time.png" className="time"/>
                                                            <span className="txtTotal">9시간 45분 비행</span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea arri">도착</div>
                                            <dl className="ontheWay">
                                                <dt>아부다비 AUH</dt>
                                                <dd>23.06.01(목) 22:40</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea badge">경유</div>
                                            <dl className="ontheWay badge">
                                                <dt>아부다비</dt>
                                                <dd>11시간 05분 대기</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>아부다비 AUH</dt>
                                                <dd>23.06.02(금) 09:45</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>
                                                            <img src="/smart/images/sub/logo/EY.png" className="logo"/>
                                                            에티하드항공 EY0101
                                                        </li>
                                                        <li className="pdl_20">아부다비</li>
                                                        <li className="pdl_20">무료수하물 2개</li>
                                                        <li>
                                                            <img src="/pc/images/images/common/ico_time.png" className="time"/>
                                                            <span className="txtTotal">14시간 15분 비행</span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea last">도착</div>
                                            <dl className="ontheWay">
                                                <dt>존에프케네디 JFK</dt>
                                                <dd>23.06.02(금) 16:00</dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="timeLine"><span className="airTitle mgb_10">오는편</span>
                                <dl className="ontheWay">
                                    <dt>뉴욕<span className="change"></span> 서울</dt>
                                    <dd>23.06.30(금) 14:30</dd>
                                    <dd>왕복 / 경유 1회</dd>
                                </dl>
                                <div className="timeList mgt_30">
                                    <ul className="timeList_wrap">
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>존에프케네디 JFK</dt>
                                                <dd>23.06.30(금) 14:30</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>
                                                            <img src="/smart/images/sub/logo/EY.png" className="logo"/>
                                                            에티하드항공 EY0102
                                                        </li>
                                                        <li className="pdl_20">존에프케네디</li>
                                                        <li className="pdl_20">무료수하물 2개</li>
                                                        <li>
                                                            <img src="/pc/images/images/common/ico_time.png" className="time"/>
                                                            <span className="txtTotal">12시간 50분 비행</span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea arri">도착</div>
                                            <dl className="ontheWay">
                                                <dt>아부다비 AUH</dt>
                                                <dd>23.07.01(토) 11:20</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea badge">경유</div>
                                            <dl className="ontheWay badge">
                                                <dt>아부다비</dt>
                                                <dd>10시간 55분 대기</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>아부다비 AUH</dt>
                                                <dd>23.07.01(토) 22:15</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>
                                                            <img src="/smart/images/sub/logo/EY.png" className="logo"/>
                                                            에티하드항공 EY0856
                                                        </li>
                                                        <li className="pdl_20">아부다비</li>
                                                        <li className="pdl_20">무료수하물 2개</li>
                                                        <li>
                                                            <img src="/pc/images/images/common/ico_time.png" className="time"/>
                                                            <span className="txtTotal">8시간 25분 비행</span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea last">도착</div>
                                            <dl className="ontheWay">
                                                <dt>인천 ICN</dt>
                                                <dd>23.07.02(일) 11:40</dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="costDetailInformation" className="full-layer" style={{display:"none"}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>요금상세정보</h1>
                            <a href="#" className="btnClose full-pop-close"
                                // onClick="removeCostDetail()"
                                onClick={() => removeCostDetail()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        {/*<div className="boxCont msgBox" id="costDetailList"></div>*/}
                        <div className="boxCont msgBox" id="costDetailList"><h2>성인 1명</h2>
                            <ul className="detailRule">
                                <li><p className="tit">항공운임</p><p className="cost">2,062,600원</p></li>
                                <li><p className="tit">유류할증료</p><p className="cost">537,600원</p></li>
                                <li><p className="tit">제세공과금</p><p className="cost">151,600원</p></li>
                                <li><p className="tit">발권대행료</p><p className="cost">61,800원</p></li>
                            </ul>
                            <ul className="detailRule">
                                <li><p className="tit">1인 합계</p><p className="cost">2,813,600원</p></li>
                            </ul>
                            <ul className="detailRule total">
                                <li><p className="tit">최종 결제 금액</p><p className="cost">2,813,600원</p></li>
                            </ul>
                            <div className="popAddTxt"><p>※ 상세 요금 정보는 라쿠카라차 특가 기준으로 노출됩니다.</p></div>
                            {/*.popAddTxt p {*/}
                            {/*    padding-left: 13px;*/}
                            {/*    text-indent: -13px;*/}
                            {/*    font-size: 12px;*/}
                            {/*    line-height: 16px;*/}
                            {/*    color: #797979;*/}
                            {/*    font-weight: 300;*/}
                            {/*}*/}
                        </div>
                    </div>
                </div>
            </div>

            <pre id="htmlTempProcess" style={{display:"none"}}></pre>

            <div id="costDefineInformation" className="full-layer" style={{display:"none"}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>요금규정</h1>
                            <a href="#" className="btnClose full-pop-close"
                               // onClick="removeCostRule()"
                               onClick={() => removeCostRule()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <p className="f13 gray mgb_20">전체 여정에 <span className="cRed">상이한 운임과 규정</span>이 적용되었으며, 각 운임
                                규정 중 가장 제한적인 규정이 적용됩니다. 이와 관련한 상세 운임규정은 담당자를 통해서 재확인 하시기 바랍니다.</p>

                            <div className="tabArea2 full seatBtn">
                                <div className="tab02">
                                    <ul className="tab seat-btn" id="ruleList">
                                    </ul>
                                </div>

                                <div id="tab11" className="tabcontent current">
                                </div>

                                <div id="tab22" className="tabcontent">
                                </div>

                                <div id="tab33" className="tabcontent">
                                </div>

                                <div id="tab44" className="tabcontent">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default MyPage;
