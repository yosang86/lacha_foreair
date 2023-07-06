import {useEffect, useState, useRef} from "react";
import $ from 'jquery';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import Footer from "./Footer";
import * as common from './js/common';
import './css/common.css';
import './css/Main2.css';
import './css/swiper.css';
import './css/ReactDatepicker.css';

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const country = [
        {kor : "국내", eng : "KOR", list : [
            {kor: "인천", eng: "ICN"},
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

    let $mainQuick = $('.m-quick'),
        $mainTab = $('.m-quick-tab'),
        $mainTabItem = $mainTab.find('li'),
        $mainTabLink = $mainTab.find('a'),
        $mainTabCont = $('.m-quick-tabcont .tabcont'),
        tabRandom = Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        bgRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    // Init(배경 랜덤, 탭 랜덤)
    const initFunc = () => {
        $mainQuick.addClass('visual0' + bgRandom);
    }
    initFunc();

    const onScroll = (event) => {
        if (event.target.scrollTop > 0) document.getElementById("mainHeader").classList.add("sticky");
        else document.getElementById("mainHeader").classList.remove("sticky");
    }
    var nowTab = 'S_4';

    var holidayList = "";
    const eventControll = (typeVal, calVal, loopVal, startVal) => {
        var date = new Date(); // 날짜 객체 생성
        var startInt = 1;
        if (typeof startVal !== 'undefined') {
            startInt = startVal;
        }
        // SR1314 12/2~8 선택 불가
        // SR1320 기차 API 오픈 전 판매 중지
        // SR1322 기차 판매중지 원복
        /*
        $(".calendarArea"+ calVal).find("[id^=calendar_]").each(function() {
            var id_text = parseInt($(this).attr("id").split("_")[1]);
             if (id_text > "20221201" && id_text < "20231231") {
                $(".calendarArea" + calVal).find("#calendar_" + id_text).find(".day").css("color", "#d6d6d6");
                $(".calendarArea" + calVal).find("#calendar_" + id_text).find(".day").attr("onclick", "");
            }
        });
        */
        // SR1366 20230120,21 설연휴 특송기간 수기기차 제외처리 하드코딩
        $(".calendarArea" + calVal).find("#calendar_20230120").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20230120").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20230121").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20230121").find(".day").attr("onclick", "");

        //2022.07.31부터 제외처리 20220701 코레일 이유
        /*  $(".calendarArea"+ calVal).find("[id^=calendar_]").each(function() {
            var id_text = parseInt($(this).attr("id").split("_")[1]);
            if (id_text > "20220730") {
                $(".calendarArea" + calVal).find("#calendar_" + id_text).find(".day").css("color", "#d6d6d6");
                $(".calendarArea" + calVal).find("#calendar_" + id_text).find(".day").attr("onclick", "");
            }
        });  */
        //2022.11.05부터 제외처리 20221004 요청
        /* $(".calendarArea"+ calVal).find("[id^=calendar_]").each(function() {
            var id_text = parseInt($(this).attr("id").split("_")[1]);
            if (id_text > "20221104") {
                $(".calendarArea" + calVal).find("#calendar_" + id_text).find(".day").css("color", "#d6d6d6");
                $(".calendarArea" + calVal).find("#calendar_" + id_text).find(".day").attr("onclick", "");
            }
        }); */

        // 20220511 5월15일~17일 제외처리 하드코딩, 추가 5/18~19, 5/20~22, 6/4~6
        $(".calendarArea" + calVal).find("#calendar_20220515").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220515").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220516").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220516").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220517").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220517").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220518").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220518").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220519").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220519").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220520").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220520").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220521").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220521").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220522").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220522").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220604").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220604").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220605").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220605").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220606").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220606").find(".day").attr("onclick", "");

        // 20220805 9/5, 9/8~12 제외처리 하드코딩 - 220808 9/5 제외처리 취소
        $(".calendarArea" + calVal).find("#calendar_20220908").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220908").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220909").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220909").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220910").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220910").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220911").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220911").find(".day").attr("onclick", "");
        $(".calendarArea" + calVal).find("#calendar_20220912").find(".day").css("color", "#d6d6d6");
        $(".calendarArea" + calVal).find("#calendar_20220912").find(".day").attr("onclick", "");

        //시간체크(오후 5시 이후 열린 날짜중 하루 먼저 진행함)
        var chkTime = new Date(date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + " 17:00:00");
        console.log(chkTime);
        if(date > chkTime) {
            loopVal++;
        }

        //주말, 주일, 휴일이 제외일자 중 존재할 경우 loopVal 값 상승처리
        var week = new Array('일', '월', '화', '수', '목', '금', '토');
        for (var i = 0; i < loopVal; i++){
            var getDate = date.getDate();
            var dateChk = new Date();
            dateChk.setDate(getDate + i);
            var dateStr = dateChk.toISOString().split("T")[0].replace(/-/g,'');
            var dateLabel = week[dateChk.getDay()];
            //휴일
            if (holidayList.indexOf(dateStr) > 1) {
                if (dateLabel != "일" && dateLabel != "토") {
                    loopVal++;
                }
            }
            //주말, 주일
            if (dateLabel == "일" || dateLabel == "토") {
                loopVal++;
            }
        }

        for(i=startInt;i < loopVal;i++) {
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
                $(".calendarArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", "");;
            } else {
                $(".calendarArea" + calVal).find("#calendar_" + idVal).find(".day").css("color", "");
                var onclickVal = "setClickDataVal2('" + idVal + "')";
                $(".calendarArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", onclickVal);
            }
        }
    };

    function swapArea() {
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

    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [singleDate, setSingleDate] = useState({
        startDate: null,
        endDate: null,
    });
    const [multiDate, setMultiDate] = useState({
        date0: null,
        date1: null,
        date2: null,
        date3: null,
    })

    const foreignAirWayTypeList = {
        0: {type: "RT", id: "AIR_FORE_TAB_1", kor: "왕복"},
        1: {type: "OW", id: "AIR_FORE_TAB_2", kor: "편도"},
        2: {type: "MT", id: "AIR_FORE_TAB_3", kor: "다구간"},
    };

    const foreignAirWayType = useRef(0);
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

        // setForeignAirWayType(ord);
        foreignAirWayType.current = ord;
        if (singleDate.startDate != null && ord == 1) {
            // setEndDate(startDate);
            setSingleDate({
                ...singleDate,
                endDate: singleDate.startDate,
            })
            selectCalendar.current = {
                ...selectCalendar.current,
                selectCalendarS: dateFormat(singleDate.startDate).replaceAll(".", ""),
            }
        }
    }

    function searchForeCityCode() {
        var inputWord = $("#searchForeWord").val();
        const dataObject = {
            keyword: $("#searchForeWord").val()
        }
        $.ajax({
            url : "/foreign/reserve/CitySearch.json",
            type : "post",
            dataType : "json",
            data : dataObject,
            success : function(data) {
                viewChange(false);
                const searchList = data.searchResult;
                const target = document.getElementById("searchTarget");
                for (var i = 0; i < searchList.length; i++) {
                    let liEl = document.createElement("li");
                    liEl.setAttribute("onclick", "setForeList(this)");
                    let spanEl1 = document.createElement("span");
                    spanEl1.className = "airport";
                    spanEl1.innerText = searchList[i].cityCd;
                    liEl.appendChild(spanEl1);
                    let spanEl2 = document.createElement("span");
                    spanEl2.style.display = "none";
                    spanEl2.innerText = searchList[i].cityInfo.split(',')[1];
                    liEl.appendChild(spanEl2);
                    let spanEl3 = document.createElement("span");
                    spanEl3.innerText = searchList[i].cityInfo;
                    liEl.appendChild(spanEl3);
                    target.appendChild(liEl);
                }
            },
            error: function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }
    function viewChange(bool) {
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

    // const [popupOpenElement, setPopupOpenElement] = useState();
    const popupOpenElement = useRef();
    const foreOpenAirStation = (element, txt) => {
        // popupOpenelement = element;
        popupOpenElement.current = element;
        // $("#foreAirStationHeader").text(txt + " 선택");
        $("#foreAirStationHeader").text(txt);
        $("section").hide();
        $("#mainHeader").hide();
        $("#footer").hide();

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

        $(".foreAirStationArea").hide();
    }
    const multiTravelDataSet = (type, code, name) => {
        const id = $(popupOpenElement.current).attr("id");
        const number = id.split("_")[2];
        if (type) {
            document.getElementById("departCity_" + number).value = code;
            $("#foreInputArea").val("departCity");
        } else {
            document.getElementById("arrivelCity_" + number).value = code;
            $("#foreInputArea").val("arrivelCity");
            if (number != multiGenId.current) {
                let targetNumber = (number * 1 + 1);
                document.getElementById("departCity_" + targetNumber).value = code;
                const targetId = "AIR_whereDepartCity_" + targetNumber;
                let target = document.getElementById(targetId);
                setMainViewCityData(target, code, name);
                $("#foreInputArea").val("departCity");
            }
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
        evt.className += " active";
    }
    const setForeList = (element) => {
        const currentType = $("#travelType").find(".current").attr("data");
        const code = element.childNodes[0].innerHTML;
        const name = element.childNodes[1].innerHTML;
        const id = $(popupOpenElement.current).attr("id");
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
                common.cmnAlertLayer("", "출발지, 도착지는<br/>동일하게 설정 불가능합니다.");
                return;
            }

            if (currentType == "MT") {
                multiTravelDataSet(false, code, name);
            } else {
                document.getElementById("arrivelCity").value = code;
                $("#foreInputArea").val("arrivelCity");
            }
        }
        $(popupOpenElement.current).innerText = code;
        const targetId = $(popupOpenElement.current).attr("id");
        const aTarget = document.getElementById(targetId);
        setMainViewCityData(aTarget, code, name);
        closeForeAirStation()

    }
    const setMainViewCityData = (target, code, name) => {
        target.innerText = code;
        target.className = "select";
        const spanEl = document.createElement("span");
        spanEl.className = "country";
        spanEl.innerText = name;
        target.appendChild(spanEl);
    }

    // const foreOpenAirStation = (element, txt) => {
    //     $('#foreAirStationHeader').text(txt);
    //     $('.foreAirStationArea').siblings().css('display', 'none');
    //     $('.foreAirStationArea').css('display', 'block');
    // }
    // const closeForeAirStation = () => {
    //     $('.foreAirStationArea').siblings('*:not(.modal)').css('display', '');
    //     $('.foreAirStationArea').css('display', 'none');
    // }

    const selectCalendar = useRef({
        selectCalendarF: null,
        selectCalendarS: null,
    });
    const selectCalendarMulti = useRef({
        selectCalendar0: null,
        selectCalendar1: null,
        selectCalendar2: null,
        selectCalendar3: null,
    })

    const dateFormat = (date) => {
        const month = (date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        const dateStr = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "." + month + "." + dateStr;
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        if (foreignAirWayType.current == 1) {
            // setStartDate(start);
            // setEndDate(start);
            setSingleDate({
                startDate: start,
                endDate: start,
            })

            selectCalendar.current = {
                selectCalendarF: dateFormat(start).replaceAll(".", ""),
                selectCalendarS: dateFormat(start).replaceAll(".", ""),
            }

            $('#CAL_START + dd').addClass('select');
            $('#CAL_START + dd > a').text(dateFormat(start));

            setFromToVal();

            return;
        }

        // setStartDate(start);
        // setEndDate(end);
        setSingleDate({
            startDate: start,
            endDate: end,
        })

        if (end != null) {
            selectCalendar.current = {
                selectCalendarF: dateFormat(start).replaceAll(".", ""),
                selectCalendarS: dateFormat(end).replaceAll(".", ""),
            }

            $('#CAL_START + dd').addClass('select');
            $('#CAL_END + dd').addClass('select');
            $('#CAL_START + dd > a').text(dateFormat(start));
            $('#CAL_END + dd > a').text(dateFormat(end));
        }
        else {
            selectCalendar.current = {
                selectCalendarF: null,
                selectCalendarS: null,
            }

            $('#CAL_START + dd').removeClass('select');
            $('#CAL_END + dd').removeClass('select');
            $('#CAL_START + dd > a').text('날짜 선택');
            $('#CAL_END + dd > a').text('날짜 선택');
        }
    };
    const calendarType = useRef();
    const calendarImgVal = useRef();

    const calendarFromTo = () => {
        // if (selectCalendarF != selectCalendarS) {
        if (selectCalendar.current.selectCalendarF != selectCalendar.current.selectCalendarS) {
            // var d_date = "" + selectCalendarF;
            // var a_date = "" + selectCalendarS;
            var d_date = "" + selectCalendar.current.selectCalendarF;
            var a_date = "" + selectCalendar.current.selectCalendarS;

            // 가는날
            $(".calendarArea").find("#calendar_" + d_date).find("div").addClass("bg-select-first");
            var d_htmlText = "<span class='picker'>" + parseInt(d_date.substr(6,2)) + "</span>";
            $(".calendarArea").find("#calendar_" + d_date).find("div").html(d_htmlText);
            if (calendarImgVal.current == '1') {
                $(".calendarArea").find("#calendar_" + d_date).append("<div class='picker-txt'>가는날</div>");
            } else if (calendarImgVal.current == '2') {
                $(".calendarArea").find("#calendar_" + d_date).append("<div class='picker-txt'>체크인</div>");
            }
            // 오는날
            $(".calendarArea").find("#calendar_" + a_date).find("div").addClass("bg-select-last");
            var a_htmlText = "<span class='picker'>" + parseInt(a_date.substr(6,2)) + "</span>";
            $(".calendarArea").find("#calendar_" + a_date).find("div").html(a_htmlText);
            if (calendarImgVal.current == '1') {
                $(".calendarArea").find("#calendar_" + a_date).append("<div class='picker-txt'>오는날</div>");
            } else if (calendarImgVal.current == '2') {
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
            // var d_date = "" + selectCalendarF;
            var d_date = "" + selectCalendar.current.selectCalendarF;

            // 가는날
            var d_htmlText = "<span class='picker'>" + parseInt(d_date.substr(6,2)) + "</span>";
            $(".calendarArea").find("#calendar_" + d_date).find("div").html(d_htmlText);
            $(".calendarArea").find("#calendar_" + d_date).append("<div class='picker-txt'>선택일</div>");
        }
    };
    const setFromToVal = () => {
        // 값 세팅
        // if (selectCalendarF != null && selectCalendarS != null) {
        if (selectCalendar.current.selectCalendarF != null && selectCalendar.current.selectCalendarS != null) {
            var $el = $(popupOpenElement.current);

            // var d_date = "" + selectCalendarF;
            // var a_date = "" + selectCalendarS;
            var d_date = "" + selectCalendar.current.selectCalendarF;
            var a_date = "" + selectCalendar.current.selectCalendarS;

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
            if (calendarImgVal.current == '1') {
                common.cmnAlertLayer("", "가는날과 오는날을 모두 선택해 주세요.");
            } else if (calendarImgVal.current == '2') {
                common.cmnAlertLayer("", "체크인과 체크아웃을 모두 선택해 주세요.");
            }
        }
    };

    const openCalendar = (element, typeVal, imgVal) => {
        window.oriScroll = $(window).scrollTop();

        // popupOpenelement = element;
        // calendarType = typeVal;
        // calendarImgVal = imgVal;
        popupOpenElement.current = element;
        calendarType.current = typeVal;
        calendarImgVal.current = imgVal;
        $("section").hide();
        $("#footer").hide();

        var elementId = $(element).attr("id").split("_")[0];
        if (elementId == 'AIR') {
            //2022.07.20 국내항공 일시 폐쇠
            // 2022.11.15 비즈플레이(31) 제외 제거
            /*
                if(cscoNo == 31){
                    common.cmnAlertLayer("airStationSearch", "리뉴얼 중입니다. 새로운 모습으로 찾아뵙겠습니다.");
                    $(".bodyArea").show();
                    return;
                }
             */
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
        }
        else if (typeVal == 1) {
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
                var d_date = $el.closest("section").find(".CAL_DATE").eq(0).text();
                var a_date = $el.closest("section").find(".CAL_DATE").eq(1).text();

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
                    selectCalendar.current = {
                        selectCalendarF: d_date,
                        selectCalendarS: a_date,
                    }
                    // 달력 시작 종료 그리기
                    calendarFromTo();
                }
            }
            else {
                // calendarType = 0;
                calendarType.current = 0;
                // 값 세팅
                if ($el.hasClass("select")) {
                    var textVal = $el.text();
                    textVal = textVal.replaceAll(".", "");
                    var htmlText = "<span class='picker'>" + $(".calendarArea").find("#calendar_" + textVal).find("div").text() + "</span>";
                    $(".calendarArea").find("#calendar_" + textVal).find("div").html(htmlText);
                }
            }
        }

        $(".calendarArea").show();
    };
    const closeCalendar = () => {
        $(window).scrollTop(window.oriScroll);

        $("section").show();
        $("#footer").show();
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
        selectCalendar.current = {
            selectCalendarF: null,
            selectCalendarS: null,
        }

        eventControll('unbind', "", 3, 0);
    };

    const onChangeMulti = (dates) => {
        const targetId = $(popupOpenElement.current).attr("id").split("_")[2];

        // setStartDate(dates);
        // setEndDate(dates);
        setMultiDate({
            ...multiDate,
            ["date"+targetId]: dates,
        })
        selectCalendarMulti.current = {
            ...selectCalendarMulti.current,
            ["selectCalendar"+targetId]: dateFormat(dates).replaceAll(".", ""),
        }
        $(popupOpenElement.current).addClass('select');
        $(popupOpenElement.current).text(dateFormat(dates));
        $(popupOpenElement.current).css("font-size", "17px");

        closeCalendarMulti();
    };
    const openCalendarMulti = (element, typeVal, imgVal) => {
        window.oriScroll = $(window).scrollTop();

        popupOpenElement.current = element;
        calendarType.current = typeVal;
        calendarImgVal.current = imgVal;
        $("section").hide();
        $("#footer").hide();

        var $el = $(element);

        // 값 세팅
        if ($el.hasClass("select")) {
            var textVal = $el.text();
            textVal = textVal.replaceAll(".", "");
            var htmlText = "<span class='picker'>" + $(".foreAirDateArea").find("#calendar_" + textVal).find("div").text() + "</span>";
            $(".foreAirDateArea").find("#calendar_" + textVal).find("div").html(htmlText);
        }

        $("#multiTravelDateList").show();
        $(".foreAirDateArea").show();
    }

    const regDateCheck = RegExp(/^\d{4}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[01])$/);
    const closeCalendarMulti = () => {
        $("section").show();
        $("#mainHeader").show();
        $("#footer").show();
        $(".foreAirDateArea").hide();
        if (nowTab !== "S_7") $("#recentSearchArea").hide();

        $("#header").removeClass("center");
        $("#multiTravelDateList").hide();
        // 값 설정

        $(window).scrollTop(window.oriScroll);

        // eventControlMulti('unbind', "", 3, 0);
    }

    // const eventControlMulti = (typeVal, calVal, loopVal, startVal) => {
    //     var date = new Date(); // 날짜 객체 생성
    //     var startInt = 1;
    //     if (typeof startVal !== 'undefined') {
    //         startInt = startVal;
    //     }
    //     for(let i = startInt; i < loopVal; i++) {
    //         if (i > 0) {
    //             date.setDate(date.getDate() + 1);
    //         }
    //         var y = date.getFullYear(); // 현재 연도
    //         var m = date.getMonth()+1; // 현재 월
    //         var d = date.getDate(); // 현재 일
    //
    //         if(m < 10) {
    //             m = "0" + m;
    //         } else {
    //             m = "" + m;
    //         }
    //
    //         if(d < 10) {
    //             d = "0" + d;
    //         } else {
    //             d = "" + d;
    //         }
    //
    //         var idVal = "" + y + m + d;
    //         if (typeVal == 'bind') {
    //             $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").css("color", "#d6d6d6");
    //             $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", "");
    //         } else {
    //             $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").css("color", "");
    //             var onclickVal = "setClickDataVal3('" + idVal + "')";
    //             $(".foreAirDateArea" + calVal).find("#calendar_" + idVal).find(".day").attr("onclick", onclickVal);
    //         }
    //     }
    // }


    const [member, setMember] = useState({adult: 1, kid: 0, baby: 0});
    // useEffect(() => {
    //     console.log(member);
    // }, [member]);

    const seatTypeList = ([
        {type: "Y", kor: "일반석"},
        {type: "W", kor: "프리미엄 일반석"},
        {type: "C", kor: "비즈니스석"},
        {type: "F", kor: "일등석"},
    ]);
    const [seat, setSeat] = useState("Y");

    const openAirMemberAndSeat = (element) => {
        // popupOpenelement = element;
        popupOpenElement.current = element;
        $("section").hide();
        $("#mainHeader").hide();
        $("#footer").hide();
        $(".foreAirMemberAndSeatArea").show();
    }
    const closeAirMemberAndSeat = () => {
        // const message = "명";
        // let count = "";
        // let typeList = ['성인', '소아', '유아'];
        // for (var i = 1; i < 4; i++) {
        //     let cnt = document.getElementById("AIR_F_C_" + i).value;
        //     if (cnt > 0 && i > 0) count += " ";
        //     if (cnt > 0) {
        //         count += typeList[i - 1];
        //         count += i === 1 && cnt === 0 ? 1 : cnt;
        //     }
        // }
        //
        // if (count.length < 5) count += message;
        //
        // document.getElementById("AIR_F_whereACnt").innerText = count;

        $("section").show();
        $("#mainHeader").show();
        $("#footer").show();

        $(".foreAirMemberAndSeatArea").hide();
    }

    // const openAirMemberAndSeat = () => {
    //     $('.foreAirMemberAndSeatArea').siblings().css('display', 'none');
    //     $('.foreAirMemberAndSeatArea').css('display', 'block');
    // }
    // const closeAirMemberAndSeat = () => {
    //     $('.foreAirMemberAndSeatArea').siblings('*:not(.modal)').css('display', '');
    //     $('.foreAirMemberAndSeatArea').css('display', 'none');
    // }


    const updateCount = (element, type, countId) => {
        const targetId = element.parentNode.id;
        const target = element.parentNode.childNodes[1];
        let nowCount = parseInt(element.parentNode.childNodes[1].innerHTML);

        let updateCount = nowCount;
        if (type) {
            if ((targetId == "adult" && nowCount > 1)
                || (targetId != "adult" && nowCount > 0)) {
                updateCount = nowCount - 1;
            }
        } else {
            updateCount = nowCount + 1;
        }

        const parentTarget = document.getElementById("adult");
        let adultCount = parentTarget.childNodes[1].innerHTML * 1;
        if (countId == "AIR_F_C_3" && updateCount > adultCount) {
            common.cmnAlertLayer("_layer", "성인 1인당, 유아 1인까지 동반 탑승 가능합니다");
        } else {
            target.innerHTML = updateCount;
            document.getElementById(countId).value = updateCount;

            setMember({
                ...member,
                [targetId]: updateCount
            });
        }
    }

    const setSeatVal = (element, type) => {
        let $el = $(element);
        const target = document.getElementById("AIR_F_S");
        target.value = type;
        setSeat(type);
        $el.closest(".seat-btn").find("li").removeClass("on select");
        element.className = "on select";
        // document.getElementById("AIR_F_Seat").innerText = element.innerText;
        // console.log(seatTypeList.filter(a => a.type == seat).map(a => a.kor)[0]);
    }

    // 비동기인 setState가 처리되고 난 후 실행되는 함수
    // 여기서는 seat 값이 변경되면 해당 함수가 실행된다
    // useEffect(() => {
    //     console.log("seat : " + seat);
    // }, [seat]);

    let multiGenId = useRef(1);
    const addForeTravel = () => {
        if (multiGenId.current >= 3) return;
        if ($("#closeTargetid")) {
            $("#closeTargetid").remove();
        }

        // const travelCount = document.getElementById("date_multi").childElementCount;
        // for (i = 0; i < travelCount; i++) {
        // for (var i = 0; i <= multiGenId; i++) {
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

        // selectCalendar0 = null;
        // selectCalendar1 = null;
        // selectCalendar2 = null;
        // selectCalendar3 = null;
        // selectCalendarMulti.current = {
        //     selectCalendar0: null,
        //     selectCalendar1: null,
        //     selectCalendar2: null,
        //     selectCalendar3: null,
        // }


        // clearCal();
        // deleteCityValue();
        const target = document.getElementById("useMulti");
        multiGenId.current++;
        const newId = multiGenId.current;
        target.appendChild(setNewTravelList("", newId));
        // addDateList();

        // dateCount = 0;
        // lastSelectTravel = 0;
    }
    // const addForeTravel = () => {
    //     const placeSelLength = $('#useMulti').find('.placeSel').length;
    //     if (placeSelLength == 4) return;
    //
    //     const text = `
    //         <div id="multi_cell_` + placeSelLength + `" class="placeSel">
    //             <div id="multi_travel_` + placeSelLength + `" class="multiSel">
    //                 <a id="AIR_whereDepartCity_` + placeSelLength + `" class="start">출발</a>
    //                 <input type="hidden" name="depCity" id="departCity_` + placeSelLength + `">
    //                 <a class="oneway"></a>
    //                 <input type="hidden" name="arrCity" id="arrivelCity_` + placeSelLength + `">
    //                 <a id="AIR_whereArrivelCity_` + placeSelLength + `" class="arrive">도착</a>
    //             </div>
    //             <div id="multi_date_` + placeSelLength + `" class="dateSel v5">
    //                 <dl>
    //                     <dt>가는날</dt>
    //                     <dd onclick="openCalendarMulti(this, 1, 1, 1)" id="AIR_whereDepartDate_` + placeSelLength + `" class="CAL_DATE">날짜 선택</dd>
    //                 </dl>
    //                 <a class="onway_close" id="closeTargetid" onclick="deleteTravel()"></a>
    //             </div>
    //         </div>`;
    //
    //     $('#useMulti').append(text);
    //     const departId = `AIR_whereDepartCity_` + placeSelLength;
    //     document.getElementById(departId).addEventListener('click', function() {foreOpenAirStation('출발지')});
    //     const arrivalId = `AIR_whereArrivelCity_` + placeSelLength;
    //     document.getElementById(arrivalId).addEventListener('click', function() {foreOpenAirStation('도착지')});
    //     $('#useMulti').find('.placeSel:not(:last-child) .onway_close').remove();
    // }
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
        // ddEl.setAttribute("onclick", "openCalendarMulti(this, 1, 1, 1)");
        ddEl.addEventListener("click", function(e) {openCalendarMulti(e.currentTarget, 1, 1, 1)});
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
        dlEl.id = "date_multi_" + multiGenId.current;
        const dtEl = document.createElement("dt");
        dtEl.innerHTML = "여정" + (multiGenId.current + 1);
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
        // clearCal();
        // deleteCityValue();
        $("#multi_cell_" + multiGenId.current).remove();
        // $("#date_multi_" + multiGenId).remove();
        selectCalendarMulti.current = {
            ...selectCalendarMulti.current,
            ["selectCalendar" + multiGenId.current]: null,
        }
        multiGenId.current--;
        if (multiGenId.current != 1) {
            const addTarget = document.getElementById("multi_date_" + multiGenId.current);
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
    }
    const createDeleteIcon = (reValue) => {
        const closeAEl = document.createElement("a");
        closeAEl.className = "onway_close";
        closeAEl.id = reValue + "closeTargetid";
        closeAEl.addEventListener("click", deleteTravel);

        return closeAEl;
    }

    const openSearchSchedule = (element) => {
        // popupOpenelement = element;
        popupOpenElement.current = element;
        $("#openAirlineList").show();
        const check = searchTicket();
        if (check) {return;}
    }
    const searchTicket = () => {
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
            console.log(e);
            common.cmnAlertLayer("", "입력한 정보를 확인해 주세요.")
            return;
        }

        if (startCode == null || "" == startCode) {common.cmnAlertLayer("", "출발지를 선택해 주세요."); return true;}
        if (endCode == null || "" == endCode) {common.cmnAlertLayer("", "도착지를 선택해 주세요."); return true;}
        if (startDate == null || "날짜 선택" == startDate) {common.cmnAlertLayer("", "가는날을 선택해 주세요."); return true;}
        if ((endDate == null || "날짜 선택" == endDate) && travelType != "OW") {common.cmnAlertLayer("", "오는날을 선택해 주세요."); return true;}
        if (checkMultiTravel() && travelType == "MT") {common.cmnAlertLayer("", "모든 다구간 여정을 선택해 주세요."); return true;}
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

        localStorage.setItem("data", JSON.stringify(dataObject));

        var fmOption = {
            "method" : "post",
            "target" : "_self",
            "action" : "/foreign/reserve/s_SearchTicketList.do"
        };

        // controller.createForm(fmOption);
        // controller.setSerializedFormData();
        // controller.formSubmit();
        const newForm = document.createElement("form");
        newForm.setAttribute("method", "post");
        newForm.setAttribute("target", "_self");
        newForm.setAttribute("action", "/foreign/reserve/s_SearchTicketList");
        document.body.appendChild(newForm);
        newForm.submit();
    }
    const checkMultiTravel = () => {
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
    const getTravelInfoList = () => {
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
    const getCountList = () => {
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


    // const controller = {};
    const controller = common.controller;

    // const cmnAlertLayer = (targetId, msg, callback) => {
    //     // var $open_btn = $("#" + targetId);
    //     var $open_btn = targetId != "" ? $("#" + targetId) : "";
    //
    //     $("input").each(function() {
    //         var $element = $(this);
    //         if ($element.attr("readonly") != 'readonly') {
    //             $element.attr("readonly", true);
    //             $element.addClass("LAYER");
    //         }
    //     });
    //
    //     var html = [];
    //
    //     html.push("<div id='" + targetId + "_layer' class='alert-box'>");
    //     html.push("<div class='popWrap'>");
    //     html.push("<div class='alert-cont'>");
    //     html.push(msg);
    //     html.push("</div>");
    //     html.push("<div class='btnArea mgt_20'>");
    //     html.push("<a href='#none' class='lbtn btn-m filled alert-close' style='background: #466cc2; border:1px solid #466cc2'>확인</a>");
    //     html.push("</div>");
    //     html.push("</div>");
    //     html.push("</div>");
    //     $("body").append(html.join(""));
    //
    //     var $el = $("#" + targetId + "_layer");
    //     $("body").append($("<div id='dimmd-layer'></div>"));
    //     $el.attr("tabindex", "0").fadeIn().focus();
    //
    //     var $elWidth = $el.outerWidth(),
    //         $elHeight = $el.outerHeight(),
    //         docWidth = $(document).width(),
    //         docHeight = $(document).height();
    //
    //     if ($elHeight < docHeight || $elWidth < docWidth) {
    //         $el.css({
    //             marginTop: -$elHeight /2,
    //             marginLeft: -$elWidth/2
    //         })
    //     } else {
    //         $el.css({top: 0, left: 0});
    //     }
    //
    //     $el.find('.alert-close').click(function(){
    //         $("#dimmd-layer").remove();
    //         $(".alert-box").remove();
    //         $(".LAYER").attr("readonly", false);
    //         $(".LAYER").removeClass("LAYER");
    //         $el.fadeOut().removeAttr("tabindex");
    //         // $open_btn.focus();
    //         if ($open_btn != "") {
    //             $open_btn.focus();
    //         }
    //         if(typeof callback != 'undefined' && callback != null) {
    //             callback();
    //         }
    //
    //         return false;
    //     });
    // };

    const getRecentForeAirList = () => {
        // controller.ajaxSend({
        $.ajax({
            url : "/foreign/reserve/RecentList.json",
            type : "post",
            dataType : "json",
            // successCall : function(data) {
            success : function(data) {
                if (data.recentList.length > 0) {
                    const targetArea = document.getElementById("recentSearchArea");
                    for (var i = 0; i < data.recentList.length; i++) {
                        const singleData = data.recentList[i];
                        const span = document.createElement("span");
                        span.className = "word";
                        const a1 = document.createElement("a");
                        a1.setAttribute("onclick", "setForeList(this)");
                        a1.setAttribute("data1", singleData.cityCdStart);
                        a1.setAttribute("data2", singleData.cityNmStart);
                        a1.innerHTML = singleData.cityNmStart;
                        const a2 = document.createElement("a");
                        a2.className = "del";
                        a2.setAttribute("data1", singleData.sn);
                        a2.setAttribute("onclick", "deleteRecentSearch(this)");

                        span.appendChild(a1);
                        span.appendChild(a2);
                        targetArea.appendChild(span);
                    }
                } else {
                    $("#recentSearchArea").empty();
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }
    const setRecentSearchData = (element) => {
        document.getElementById("tripPlan").checked = element.getAttribute("data2") !== "N";
        let targetId = "AIR_FORE_TAB_1";
        let ordNo = 0;
        if (element.getAttribute("data1") === "MT") {
            targetId = "AIR_FORE_TAB_3";
            ordNo = 2;
        } else if (element.getAttribute("data1") === "OW") {
            targetId = "AIR_FORE_TAB_2";
            ordNo = 1;
        }

        // setForeignAirWayType(document.getElementById(targetId), ordNo);
        setForeignAirWayTypeFunction(document.getElementById(targetId), ordNo);
        if (element.getAttribute("data1") === "MT") {
            const list = JSON.parse(element.getAttribute("data15"));
            // console.log(list);
            for (var i = 0; i < list.length; i++) {
                if (i > 1 && document.getElementById("useMulti").childElementCount < list.length) {addForeTravel();}
                const data = list[i];
                setMainViewCityData(document.getElementById("AIR_whereDepartCity_" + i), data.cityCdStart, data.cityNmStart);
                document.getElementById("departCity_" + i).value = data.cityCdStart;
                setMainViewCityData(document.getElementById("AIR_whereArrivelCity_" + i), data.cityCdEnd, data.cityNmEnd);
                document.getElementById("arrivelCity_" + i).value = data.cityCdEnd;

                const deptDate = document.getElementById("AIR_whereDepartDate_" + i);
                // deptDate.innerHTML =  moment(data.startDate).format("YYYY.MM.DD");
                deptDate.innerHTML = data.startDate.slice(0, 4) + "." + data.startDate.slice(4, 6) + "." + data.startDate.slice(6, 8);
                deptDate.className = "CAL_DATE select";
                deptDate.style.fontSize = "17px";
            }
        } else {
            setMainViewCityData(document.getElementById("AIR_whereDepartCity"), element.getAttribute("data4"), element.getAttribute("data3"));
            document.getElementById("departCity").value = element.getAttribute("data4");
            setMainViewCityData(document.getElementById("AIR_whereArrivelCity"), element.getAttribute("data6"), element.getAttribute("data5"));
            document.getElementById("arrivelCity").value = element.getAttribute("data6");

            const deptDate = document.getElementById("AIR_whereDepartDate");
            // deptDate.innerHTML =  moment(element.getAttribute("data7")).format("YYYY.MM.DD");
            const deptDateStr = element.getAttribute("data7");
            deptDate.innerHTML =  deptDateStr.slice(0, 4) + "." + deptDateStr.slice(4, 6) + "." + deptDateStr.slice(6, 8);
            deptDate.className = "CAL_DATE select";
            const arrvDate = document.getElementById("AIR_whereArrivelDate");
            // arrvDate.innerHTML =  moment(element.getAttribute("data8")).format("YYYY.MM.DD");
            const arrvDateStr = element.getAttribute("data8");
            if (arrvDateStr != "날짜 선택") arrvDate.innerHTML = arrvDateStr.slice(0, 4) + "." + arrvDateStr.slice(4, 6) + "." + arrvDateStr.slice(6, 8);
            else arrvDate.innerHTML = arrvDateStr;
            arrvDate.className = "CAL_DATE select";
        }

        // document.getElementById("AIR_F_whereACnt").innerHTML = element.getAttribute("data11");
        // document.getElementById("AIR_F_C_1").value = element.getAttribute("data12");
        // document.getElementById("AIR_F_C_2").value = element.getAttribute("data13");
        // document.getElementById("AIR_F_C_3").value = element.getAttribute("data14");
        setMember({
            adult: element.getAttribute("data12"),
            kid: element.getAttribute("data13"),
            baby: element.getAttribute("data14"),
        })
    }
    const deleteRecentSearch = (element) => {
        const dataObject = {
            "sn":element.getAttribute("data1")
        }
        // controller.ajaxSend({
        $.ajax({
            url : "/foreign/reserve/deleteRecentSearch.json",
            type : "post",
            dataType : "json",
            data :dataObject,
            success : function(data) {
                $(element).closest('div').remove();
                $("#recentSearchArea").empty();
                getRecentForeAirList();
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });

        if ($('#recentSwiperArea').children().length == 0) {
            $('#recentSearchArea').css('display', 'none');
            // $('#recentSearchArea').remove();
        }
    }

    var cscoNo = '<c:out value="${sessionUtil:getUserProfile().cscoNo}"/>';

    function applyCallBack() {
        insertAlgncombrAgr();
        // if (mthdNmElement == 'ktxSubmit') {
        //     ktxSubmit();
        // } else if (mthdNmElement == 'srtSubmit') {
        //     srtSubmit();
        // } else if (mthdNmElement == 'airSubmit') {
        airSubmit();
        // }
        //     else if (mthdNmElement == 'trnSubmit') {
        //     trnSubmit();
        // } else if (mthdNmElement == 'hotelSubmit') {
        //     hotelSubmit();
        // }
    };

    function insertAlgncombrAgr() {
        $.ajax({
            url : '/etc/s_InsertAlgncombrAgr.do',
            dataType : 'json',
            type : 'post',
            data : {
                "algncoScrtkey" : "32b9859741c620860e3b5376a0af78e71647b9c9c0695ad5bb6e0baa0e165542"
            },
            success:function(jsonObj) {

            }
            , error:function(data) {

            }
        });
    };

    function airSubmit() {
        if (cscoNo == 1002) {
            common.cmnAlertLayer("airStationSearch", "리뉴얼 중입니다. 새로운 모습으로 찾아뵙겠습니다.");
            return;
        }

        if (airValidate()) {
            var inrVal = "false";

            if ($("#AIR_TAB").hasClass("current")) {
                inrVal = "true";
            }
            // 기본값 세팅
            if ($("#AIR_whereDepDate").text() == '날짜 선택') {
                var d_date = new Date();
                d_date.setDate(d_date.getDate() + 4);

                var d_y_data = d_date.getFullYear();
                var d_m_data = d_date.getMonth()+1;
                var d_d_data = d_date.getDate();

                $("#AIR_whereDepDate").text(d_y_data + "." + d_m_data + "." + d_d_data);
                $("#AIR_whereDepDate").addClass("select");

                if ($("#AIR_TAB").hasClass("current") && $("#AIR_whereArrDate").text() == '날짜 선택') {
                    var a_date = new Date();
                    a_date.setDate(a_date.getDate() + 6);

                    var a_y_data = a_date.getFullYear();
                    var a_m_data = a_date.getMonth()+1;
                    var a_d_data = a_date.getDate();

                    $("#AIR_whereArrDate").text(a_y_data + "." + a_m_data + "." + a_d_data);
                    $("#AIR_whereArrDate").addClass("select");
                }
            }
            if ($("#AIR_TAB").hasClass("current") && $("#AIR_whereArrDate").text() == '날짜 선택') {
                var d_text = $("#AIR_whereDepDate").text().split(".");

                var a_date = new Date(d_text[0], d_text[1]-1, d_text[2]);
                a_date.setDate(a_date.getDate() + 2);

                var a_y_data = a_date.getFullYear();
                var a_m_data = a_date.getMonth()+1;
                var a_d_data = a_date.getDate();

                $("#AIR_whereArrDate").text(a_y_data + "." + a_m_data + "." + a_d_data);
                $("#AIR_whereArrDate").addClass("select");
            }

            var cabinClass = 'Normal';
            if ($("#AIR_question").text() == '비지니스석') {
                cabinClass = 'Business';
            } else if($("#AIR_question").text() == '전체') {
                cabinClass = 'All';
            }

            var obj = {
                "isRound" : inrVal
                , "depDate" : $("#AIR_whereDepDate").text().replaceAll(".", "-")
                , "arrDate" : $("#AIR_whereArrDate").text().replaceAll(".", "-")
                , "depCity" : $("#depCity").val()
                , "arrCity" : $("#arrCity").val()
                , "adultCnt" : $("#AIR_C_1").val()
                , "childCnt" : $("#AIR_C_2").val()
                , "infantCnt" : $("#AIR_C_3").val()
                , "reverse" : "false"
                , "carriers" : ""
                , "cabinClass" : cabinClass
                , "searchYN" : "Y"
                , "depCityNm" : $("#AIR_whereDepCity1").text()
                , "arrCityNm" : $("#AIR_whereArrCity1").text()
            }
            var fmOption = {
                "method" : "post",
                "target" : "_self",
                "action" : "/goods/air/s_AirList.do"
            };

            // controller.createForm(fmOption);
            // controller.setSerializedFormData(obj);
            // controller.formSubmit();
        }
    };

    function airValidate() {
        if ($("#AIR_whereDepCity1").text() == '출발') {
            common.cmnAlertLayer("", "출발지를 선택하세요.");
            return false;
        }
        if ($("#AIR_whereArrCity1").text() == '도착') {
            common.cmnAlertLayer("", "도착지를 선택하세요.");
            return false;
        }
// 			if ($("#AIR_whereDepDate").text() == '날짜 선택') {
// 				cmnAlertLayer("", "가는날을 선택하세요.");
// 				return false;
// 			}
// 			if ($("#AIR_TAB").hasClass("current") && $("#AIR_whereArrDate").text() == '날짜 선택') {
// 				cmnAlertLayer("", "오는날을 선택하세요.");
// 				return false;
// 			}

        return true;
    };

    return (
    <div style={{width: "100%", height: "100vh", overflow: "scroll",}}
        onScroll={(e) => onScroll(e)}>

        {/*<div id="header" className="center">*/}
        {/*</div>*/}

        {/*<a href="/" id="mva" style={{display:"none"}}>이동</a>*/}

        <div id="mainHeader">
            <div className="header_top">
                <h1>
                    {/*<a href="/" className="home">*/}
                    {/*    <img src="/smart/images/main/m_logo_b_lacha.png" alt="HCC"/>*/}
                    {/*</a>*/}
                    <a href="/" className="home">
                        <img src="./images/main/m_logo_b_lacha.png" alt="HCC"/>
                    </a>
                </h1>
                {/*<a href="/mypage/s_MyPageInfo.do" className="topMenu">*/}
                {/*    <img src="/smart/images/main/m_menu_b.png" alt="메뉴"/>*/}
                {/*</a>*/}
                <a href="/mypage" className="topMenu">
                    <img src="./images/main/m_menu_b.png" alt="메뉴"/>
                </a>
            </div>
        </div>

        <main>
            {/*<div>*/}
            {/*    <a target="" herf="#" id="mva">이동</a>*/}
            {/*</div>*/}
            {/*<div className="notUseQuick" style={{height: "70px"}}></div>*/}
            <div id="htmlDispCont11">
                <section className="m-quick visual01 visual02" style={{height: "auto",}}>
                    <div className="m-quick-box">
                        <div className="m-quick-tab">
                            <ul>
                                <li className="item01 4" style={{flex: "0 0 33.3%"}}>
                                    <a
                                        // href="javascript:void(0);"
                                        // onClick="openSession(4);"
                                    >기차여행</a>
                                </li>
                                <li className="item02 0" style={{display: "none", flex: "0 0 33.3%"}}>
                                    <a
                                        // href="javascript:void(0);"
                                        // onClick="openSession(0);"
                                    >KTX</a>
                                </li>
                                <li className="item05 3" style={{flex: "0 0 33.3%"}}>
                                    <a
                                        // href="javascript:void(0);"
                                        // onClick="openSession(3);"
                                    >숙박</a>
                                </li>
                                <li className="item06 5" style={{display: "none", flex: "0 0 33.3%"}}>
                                    <a
                                        // href="javascript:void(0);"
                                        // onClick="openSession(5);"
                                    >1+1</a>
                                </li>
                                <li className="item04 7 active" style={{flex: "0 0 33.3%"}}>
                                    <a
                                        // href="javascript:void(0);"
                                        // onClick="openSession(7);"
                                    >항공</a>
                                </li>
                            </ul>
                        </div>
                        <div className="m-quick-tabcont">
                            <div id="S_5" className="tabcont item06" style={{display: "none"}}>
                                <div className="s-tabArea">
                                    <ul className="tab" style={{marginTop: "10px", marginBottom: "10px"}}>
                                        <input type="hidden" id="trnSctCd" value="10"/>
                                        <li className="current"
                                            // onClick="setTrnType(this, 0);"
                                        ><a href="#">KTX</a></li>
                                        <li style={{fontSize: "small"}}>&nbsp; 예매 시 기차표 or 숙박쿠폰 추가 제공</li>
                                    </ul>
                                    <div id="tab1-1" className="tabcontent current">
                                        <div className="quick-option">
                                            <div className="placeSel">
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="start"
                                                    // onClick="openStation(this, '출발지');"
                                                   id="dptSttNm">출발</a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="change"
                                                   // onClick="exchangeVal(this);"
                                                ></a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="arrive"
                                                    // onClick="openStation(this, '도착지');"
                                                   id="arrvSttNm">도착</a>
                                            </div>
                                            <div className="dateSel v1">
                                                <dl>
                                                    <dt>가는 날</dt>
                                                    <dd
                                                        // onClick="openCalendar2(this, 0);"
                                                        id="trnDt"
                                                        className="CAL_DATE">날짜 선택
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>인원</dt>
                                                    <dd className="select">
                                                        <a
                                                            // href="javascript:void(0);"
                                                            className="" id="TRN_whereACnt">
                                                            성인 1명
                                                        </a>
                                                    </dd>
                                                    <input type="hidden" id="trnCnt" value="1"/>
                                                    <input type="hidden" id="trnChldCnt" value="0"/>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnArea">
                                    <a
                                        // href="javascript:void(0);"
                                        className="lbtn filled"
                                        // onClick="confirmPopup(this, 'trnSubmit');"
                                    >열차검색</a>
                                </div>
                            </div>

                            <div id="S_4" className="tabcont item01" style={{display: "none"}}>
                                <div className="s-tabArea">
                                    <ul className="tab" style={{marginTop: "10px", marginBottom: "10px"}}>
                                        <input type="hidden" id="trnSctCd" value="10"/>
                                        <li className="current"
                                            // onClick="setTrnType(this, 0);"
                                        ><a href="#">KTX</a></li>
                                    </ul>
                                    <div id="tab1-1" className="tabcontent current">
                                        <div className="quick-option">
                                            <div className="placeSel">
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="start"
                                                    // onClick="openStation(this, '출발지');"
                                                   id="dptSttNm">출발</a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="change"
                                                    // onClick="exchangeVal(this);"
                                                ></a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="arrive"
                                                    // onClick="openStation(this, '도착지');"
                                                   id="arrvSttNm">도착</a>
                                            </div>
                                            <div className="dateSel v1">
                                                <dl>
                                                    <dt>가는 날</dt>
                                                    <dd
                                                        // onClick="openCalendar2(this, 0);"
                                                        id="trnDt"
                                                        className="CAL_DATE">날짜 선택
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>인원</dt>
                                                    <dd className="select">
                                                        <a
                                                            // href="javascript:void(0);"
                                                            className=""
                                                            // onClick="openTrnMember(this);"
                                                            id="TRN_whereACnt">성인 1명</a>
                                                    </dd>
                                                    <input type="hidden" id="trnCnt" value="1"/>
                                                    <input type="hidden" id="trnChldCnt" value="0"/>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnArea">
                                    <a
                                        // href="javascript:void(0);"
                                        className="lbtn filled"
                                        // onClick="confirmPopup(this, 'trnSubmit');"
                                    >열차검색</a>
                                </div>
                            </div>

                            <div id="S_0" className="tabcont item02" style={{display: "none"}}>
                                <div className="s-tabArea">
                                    <ul className="tab">
                                        <li className="current"
                                            // onClick="setWayType(this, 0);"
                                            id="KTX_TAB">
                                            <a href="#">편도</a>
                                        </li>
                                        <li
                                            // onClick="setWayType(this, 1);"
                                        >
                                            <a href="#">왕복</a>
                                        </li>
                                    </ul>
                                    <div id="tab10" className="tabcontent current">
                                        <div className="quick-option">
                                            <div className="placeSel">
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="start"
                                                    // onClick="openKtxStation(this, '출발지');"
                                                    id="KTX_w1DepCity">출발</a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="change"
                                                    // onClick="exchangeVal(this);"
                                                ></a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="arrive"
                                                    // onClick="openKtxStation(this, '도착지');"
                                                    id="KTX_w1ArrCity">도착</a>
                                            </div>
                                            <div className="dateSel">
                                                <dl>
                                                    <dt>가는 날</dt>
                                                    <dd
                                                        // onClick="openCalendar2(this, 1, 1, 1);"
                                                        id="KTX_wDepDate"
                                                        className="CAL_DATE">날짜 선택
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>성인</dt>
                                                    <dd>
                                                    </dd>
                                                    <dd>
                                                        <a
                                                            // href="javascript:void(0);"
                                                            className="person-sel"
                                                            // onClick="selectboxEvent(this, 0);"
                                                            id="KTX_w1ACnt">1명</a>
                                                    </dd>
                                                    <div className="person-num" style={{display: "none"}}>
                                                        <div className="numlist">
                                                            <ul>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 1, 1);"
                                                                >1명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 2, 1);"
                                                                >2명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 3, 1);"
                                                                >3명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 4, 1);"
                                                                >4명</li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </dl>
                                                <dl>
                                                    <dt>소아</dt>
                                                    <dd>
                                                    </dd>
                                                    <dd>
                                                        <a href="#" className="person-sel"
                                                           // onClick="selectboxEvent(this, 1);"
                                                           id="KTX_w1CCnt">0명</a>
                                                    </dd>
                                                    <div className="person-num" style={{display: "none"}}>
                                                        <div className="numlist">
                                                            <ul>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 0, 1);"
                                                                >0명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 1, 1);"
                                                                >1명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 2, 1);"
                                                                >2명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 3, 1);"
                                                                >3명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 4, 1);"
                                                                >4명</li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </dl>
                                            </div>
                                            <div className="dateSel" style={{display: "none"}}>
                                                <dl>
                                                    <dt>오는 날</dt>
                                                    <dd
                                                        // onClick="openCalendar2(this, 1, 1, 1);"
                                                        id="KTX_wArrDate"
                                                        className="CAL_DATE">날짜 선택
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>성인</dt>
                                                    <dd>
                                                    </dd>
                                                    <dd>
                                                        <a
                                                            // href="javascript:void(0);"
                                                            className="person-sel"
                                                            // onClick="selectboxEvent(this, 0);"
                                                        >1명</a>
                                                    </dd>
                                                    <div className="person-num" style={{display: "none"}}>
                                                        <div className="numlist">
                                                            <ul>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 1, 0);"
                                                                >1명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 2, 0);"
                                                                >2명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 3, 0);"
                                                                >3명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 0, 4, 0);"
                                                                >4명</li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </dl>
                                                <dl>
                                                    <dt>소아</dt>
                                                    <dd>
                                                    </dd>
                                                    <dd>
                                                        <a href="#" className="person-sel"
                                                           // onClick="selectboxEvent(this, 1);"
                                                        >0명</a>
                                                    </dd>
                                                    <div className="person-num" style={{display: "none"}}>
                                                        <div className="numlist">
                                                            <ul>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 0, 0);"
                                                                >0명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 1, 0);"
                                                                >1명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 2, 0);"
                                                                >2명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 3, 0);"
                                                                >3명</li>
                                                                <li
                                                                    // onClick="setSelectBoxVal(this, 1, 4, 0);"
                                                                >4명</li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnArea">
                                    <a
                                        // href="javascript:void(0);"
                                        className="lbtn filled"
                                        // onClick="confirmPopup(this, 'ktxSubmit');"
                                    >열차검색</a>
                                </div>
                            </div>

                            <div id="S_1" className="tabcont item03" style={{display: "none"}}>
                                <div className="s-tabArea">
                                    <ul className="tab">
                                        <li className="current" data-tab="tab3-1"><a href="#">편도</a></li>
                                    </ul>
                                    <div id="tab3-1" className="tabcontent current">
                                        <div className="quick-option">
                                            <div className="placeSel">
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="start"
                                                    // onClick="openSrtStation(this, '출발지');"
                                                    id="SRT_D">출발</a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="change"
                                                    // onClick="exchangeVal(this);"
                                                ></a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="arrive"
                                                    // onClick="openSrtStation(this, '도착지');"
                                                    id="SRT_A">도착</a>
                                            </div>
                                            <div className="dateSel">
                                                <dl>
                                                    <dt>가는 날</dt>
                                                    <dd
                                                        // onClick="openCalendar2(this, 0);"
                                                        id="SRT_wDepDate"
                                                        className="CAL_DATE">날짜 선택
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>성인</dt>
                                                    <dd>
                                                        <a href="#" className="person-sel"
                                                           // onClick="selectboxEvent(this, 0);"
                                                           id="SRT_w1ACnt">1명</a>
                                                        <div className="person-num" style={{display: "none"}}>
                                                            <div className="numlist">
                                                                <ul>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 1);"
                                                                    >1명</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 2);"
                                                                    >2명</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 3);"
                                                                    >3명</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 4);"
                                                                    >4명</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnArea">
                                    <a
                                        // href="javascript:void(0);"
                                        className="lbtn filled"
                                        // onClick="confirmPopup(this, 'srtSubmit');"
                                    >열차검색</a>
                                </div>
                            </div>

                            <div id="S_2" className="tabcont item04" style={{display: "none"}}>
                                <div className="s-tabArea">
                                    <ul className="tab">
                                        <li className="current"
                                            // onClick="setAirWayType(this, 0);"
                                            id="AIR_TAB"><a href="#">왕복</a></li>
                                        <li
                                            // onClick="setAirWayType(this, 1);"
                                        ><a href="#">편도</a></li>
                                    </ul>
                                    <div id="tab4-1" className="tabcontent current">
                                        <div className="quick-option">
                                            <div className="placeSel">
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="start"
                                                    // onClick="openAirStation(this, '출발지');"
                                                    id="AIR_whereDepCity1">출발</a>
                                                <input type="hidden" name="depCity" id="depCity"/>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="change"
                                                    // onClick="swapArea();"
                                                ></a>
                                                <a
                                                    // href="javascript:void(0);"
                                                    className="arrive"
                                                    // onClick="openAirStation(this, '도착지');"
                                                    id="AIR_whereArrCity1">도착</a>
                                                <input type="hidden" name="arrCity" id="arrCity"/>
                                            </div>
                                            <div id="AIR_DATASEL" className="dateSel v2">
                                                <dl>
                                                    <dt>가는날</dt>
                                                    <dd
                                                        // onClick="openCalendar(this, 1, 1, 1);"
                                                        id="AIR_whereDepDate"
                                                        className="CAL_DATE">날짜 선택
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>오는날</dt>
                                                    <dd
                                                        // onClick="openCalendar(this, 1, 1, 1);"
                                                        id="AIR_whereArrDate"
                                                        className="CAL_DATE">날짜 선택
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div className="dateSel v1">
                                                <dl>
                                                    <dt>인원</dt>
                                                    <dd className="select">
                                                        <a
                                                            // href="javascript:void(0);"
                                                            // onClick="openAirMember(this);"
                                                            id="AIR_whereACnt">성인 1명</a>
                                                    </dd>
                                                    <input type="hidden" id="AIR_C_1" value="1"/>
                                                    <input type="hidden" id="AIR_C_2" value="0"/>
                                                    <input type="hidden" id="AIR_C_3" value="0"/>
                                                </dl>
                                                <dl>
                                                    <dt>좌석</dt>
                                                    <dd className="select">
                                                        <a
                                                            // href="javascript:void(0);"
                                                            // onClick="openAirSeat(this);"
                                                            id="AIR_question">전체</a></dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnArea">
                                    <a
                                        // href="javascript:void(0);"
                                        className="lbtn filled"
                                        // onClick="confirmPopup(this, 'airSubmit');"
                                    >항공권 검색</a>
                                </div>
                            </div>

                            <div id="S_3" className="tabcont item05" style={{display: "none"}}>
                                <div className="s-tabArea">
                                    <ul className="tab">
                                        <li className="current"
                                            // onClick="setHotelType(this, 0);"
                                            data-cd=""><a
                                            href="#">전체</a></li>
                                        <li
                                            // onClick="setHotelType(this, 1);"
                                            data-cd="01"><a href="#">호텔</a></li>
                                        <li
                                            // onClick="setHotelType(this, 2);"
                                            data-cd="05"><a href="#">모텔</a></li>
                                        <li
                                            // onClick="setHotelType(this, 3);"
                                            data-cd="02"><a href="#">리조트</a></li>
                                        <li
                                            // onClick="setHotelType(this, 4);"
                                            data-cd="04"><a href="#">펜션</a></li>
                                        <li
                                            // onClick="setHotelType(this, 5);"
                                            data-cd="03"><a href="#">레지던스</a></li>
                                    </ul>
                                    <div className="searchWrap">
                                        <div className="searchForm">
                                            <input type="text" id="HOTEL_aName" placeholder="도시, 지역, 숙소명, 관광 명소 등으로 검색"/>
                                            <a
                                                // href="javascript:void(0);"
                                                className="btn-srh"
                                                // onClick="hotelSubmit();"
                                            >
                                                <span className="hdn">검색</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div id="tab5-1" className="tabcontent current">
                                        <div className="quick-option">
                                            <div className="dateSel v3">
                                                <dl>
                                                    <dt>체크인</dt>
                                                    <dd className="CAL_DATE"
                                                        // onClick="openCalendar(this, 1, 2, 2);"
                                                        id="HOTEL_wDepDate">날짜 선택
                                                    </dd>
                                                </dl>
                                                <dl>
                                                    <dt>체크아웃</dt>
                                                    <dd className="CAL_DATE dimColor"
                                                        // onClick="openCalendar(this, 1, 2, 2);"
                                                        id="HOTEL_wArrDate">날짜 선택
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div className="dateSel v1">
                                                <dl>
                                                    <dt>객실수</dt>
                                                    <dd className="blk">
                                                        <a
                                                            // href="javascript:void(0);"
                                                           className="person-sel"
                                                           // onClick="selectboxEvent(this, 0);"
                                                           id="HOTEL_rCnt">1개</a>
                                                        <div className="person-num" style={{display: "none"}}>
                                                            <div className="numlist">
                                                                <ul>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 0);"
                                                                    >0개</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 1);"
                                                                    >1개</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 2);"
                                                                    >2개</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 3);"
                                                                    >3개</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 0, 4);"
                                                                    >4개</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </dd>

                                                </dl>
                                                <dl>
                                                    <dt>인원</dt>
                                                    <dd>
                                                        <a
                                                            // href="javascript:void(0);"
                                                           className="person-sel"
                                                           // onClick="selectboxEvent(this, 1);"
                                                           id="HOTEL_aCnt">2명</a>
                                                        <div className="person-num" style={{display: "none"}}>
                                                            <div className="numlist">
                                                                <ul>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 1, 1);"
                                                                    >1명</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 1, 2);"
                                                                    >2명</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 1, 3);"
                                                                    >3명</li>
                                                                    <li
                                                                        // onClick="setSelectBoxVal(this, 1, 4);"
                                                                    >4명</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnArea">
                                    <a
                                        // href="javascript:void(0);"
                                       className="lbtn filled"
                                       // onClick="confirmPopup(this, 'hotelSubmit');"
                                    >숙소 검색</a>
                                </div>
                            </div>

                            <div id="S_7" className="tabcont active item04" style={{display: "block"}}>
                                <div className="s-tabArea">
                                    <ul className="tab" id="travelType">
                                        {Object.values(foreignAirWayTypeList).map((a, index) =>
                                            <li id={a.id} className={index == foreignAirWayType.current ? "current" : ""} data-type={a.type} key={index}
                                                // onClick={() => setForeignAirWayType(index)}
                                                onClick={(e) => setForeignAirWayTypeFunction(e.currentTarget, index)}
                                            >
                                                <a href="#">{a.kor}</a>
                                            </li>
                                        )}

                                        {/*<li data="RT" className="current" onClick="setForeignAirWayType(this, 0);"*/}
                                        {/*    id="AIR_FORE_TAB_1"><a href="#">왕복</a></li>*/}
                                        {/*<li data="OW" onClick="setForeignAirWayType(this, 1);" id="AIR_FORE_TAB_2"><a*/}
                                        {/*    href="#">편도</a></li>*/}
                                        {/*<li data="MT" onClick="setForeignAirWayType(this, 2);" id="AIR_FORE_TAB_3"><a*/}
                                        {/*    href="#">다구간</a></li>*/}

                                        <li className="check_trip" style={{position: "absolute!important", right: "13px"}}>
                                            <input id="tripPlan" type="checkbox"/><label htmlFor="tripPlan">직항</label>
                                        </li>
                                    </ul>
                                    <div id="tab7-1" className="tabcontent current">
                                        <div className="quick-option">
                                            <div id="noneMulti" style={foreignAirWayType.current == 0 || foreignAirWayType.current == 1 ? {display: "block"} : {display: "none"}}>
                                                <div id="fore_travel_0" className="placeSel">
                                                    <a
                                                        // href="javascript:void(0);"
                                                       className="start"
                                                       // onClick="foreOpenAirStation(this, '출발지');"
                                                       onClick={(e) => foreOpenAirStation(e.currentTarget, '출발지')}
                                                       id="AIR_whereDepartCity">출발</a>
                                                    <input type="hidden" name="depCity" id="departCity"/>
                                                    <a
                                                        // href="javascript:void(0);"
                                                        className="change"
                                                       // onClick="swapArea();"
                                                       onClick={() => swapArea()}
                                                    ></a>
                                                    <a
                                                        // href="javascript:void(0);"
                                                       className="arrive"
                                                       // onClick="foreOpenAirStation(this, '도착지');"
                                                       onClick={(e) => foreOpenAirStation(e.currentTarget, '도착지')}
                                                       id="AIR_whereArrivelCity">도착</a>
                                                    <input type="hidden" name="arrCity" id="arrivelCity"/>
                                                </div>

                                                <div id="AIR_FORE_DATASEL"
                                                     // className="dateSel v2"
                                                     className={`dateSel ${foreignAirWayType.current == 1 ? 'v1' : 'v2'}`}
                                                >
                                                    <dl>
                                                        <dt>가는날</dt>
                                                        <dd
                                                            // onClick="openCalendar(this, 1, 1, 1);"
                                                            onClick={(e) => openCalendar(e.currentTarget, 1, 1)}
                                                            id="AIR_whereDepartDate" className="CAL_DATE">날짜 선택
                                                        </dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>오는날</dt>
                                                        <dd
                                                            // onClick="openCalendar(this, 1, 1, 1);"
                                                            onClick={(e) => openCalendar(e.currentTarget, 1, 1)}
                                                            id="AIR_whereArrivelDate" className="CAL_DATE">날짜 선택
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                            <div id="useMulti"
                                                 // style={{display: "none"}}
                                                 style={foreignAirWayType.current == 2 ? {display: "block"} : {display: "none"}}
                                            >
                                                <div id="multi_cell_0" className="placeSel">
                                                    <div id="multi_travel_0" className="multiSel">
                                                        <a href="#" className="start"
                                                           // onClick="foreOpenAirStation(this, '출발지');"
                                                           onClick={(e) => foreOpenAirStation(e.currentTarget, '출발지')}
                                                           id="AIR_whereDepartCity_0">출발<span
                                                            className="country">지역</span></a>
                                                        <input type="hidden" name="depCity" id="departCity_0"/>
                                                        <a className="oneway"></a>
                                                        <input type="hidden" name="arrCity" id="arrivelCity_0"/>
                                                        <a href="#" className="arrive"
                                                           // onClick="foreOpenAirStation(this, '도착지');"
                                                           onClick={(e) => foreOpenAirStation(e.currentTarget, '도착지')}
                                                           id="AIR_whereArrivelCity_0">도착<span className="country">지역</span></a>
                                                    </div>
                                                    <div id="multi_date_0" className="dateSel v5">
                                                        <dl>
                                                            <dt>가는날</dt>
                                                            <dd
                                                                // onClick="openCalendarMulti(this, 1, 1, 1);"
                                                                onClick={(e) => openCalendarMulti(e.currentTarget, 1, 1, 1)}
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
                                                           id="AIR_whereDepartCity_1">출발<span
                                                            className="country">지역</span></a>
                                                        <input type="hidden" name="depCity" id="departCity_1"/>
                                                        <a className="oneway"></a>
                                                        <input type="hidden" name="arrCity" id="arrivelCity_1"/>
                                                        <a href="#" className="arrive"
                                                           // onClick="foreOpenAirStation(this, '도착지');"
                                                           onClick={(e) => foreOpenAirStation(e.currentTarget, '도착지')}
                                                           id="AIR_whereArrivelCity_1">도착<span className="country">지역</span></a>
                                                    </div>
                                                    <div id="multi_date_1" className="dateSel v5">
                                                        <dl>
                                                            <dt>가는날</dt>
                                                            <dd
                                                                // onClick="openCalendarMulti(this, 1, 1, 1);"
                                                                onClick={(e) => openCalendarMulti(e.currentTarget, 1, 1, 1)}
                                                                id="AIR_whereDepartDate_1" className="CAL_DATE">날짜 선택
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="foreTravelAdd" className="wayArea"
                                                 // style={{display: "none"}}
                                                 style={foreignAirWayType.current == 2 ? {display: "block"} : {display: "none"}}
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
                                                        <a
                                                            // href="javascript:void(0);"
                                                           id="AIR_F_whereACnt">
                                                            {/*성인 1명*/}
                                                            {member.adult > 0 ? `성인${member.adult}` : ``}
                                                            {member.adult > 0 && (member.kid > 0 || member.baby > 0) ? ` ` : ``}
                                                            {member.kid > 0 ? `소아${member.kid}` : ``}
                                                            {member.kid && member.baby > 0 > 0 ? ` ` : ``}
                                                            {member.baby > 0 ? `유아${member.baby}` : ``}
                                                        </a>
                                                    </dd>
                                                    {/*<input type="hidden" id="AIR_F_C_1" value="1"/>*/}
                                                    {/*<input type="hidden" id="AIR_F_C_2" value="0"/>*/}
                                                    {/*<input type="hidden" id="AIR_F_C_3" value="0"/>*/}
                                                    <input type="hidden" id="AIR_F_C_1" value={member.adult}/>
                                                    <input type="hidden" id="AIR_F_C_2" value={member.kid}/>
                                                    <input type="hidden" id="AIR_F_C_3" value={member.baby}/>
                                                </dl>
                                                <dl>
                                                    <dt>좌석</dt>
                                                    <dd className="select">
                                                        <a
                                                            // href="javascript:void(0);"
                                                           id="AIR_F_Seat">
                                                            {seatTypeList.filter(a => a.type == seat).map(a => a.kor)[0]}
                                                            {/*일반석*/}
                                                        </a>
                                                    </dd>
                                                    <input type="hidden" id="AIR_F_S" value="Y"/>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btnArea">
                                    <a href="#none" className="lbtn filled"
                                       // onClick="openSearchSchedule(this)"
                                       // onClick={(e) => openSearchSchedule(e.currentTarget)}
                                       onClick={(e) => window.location.href="/searchTicketList"}
                                    >항공권 검색</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="theme-area v1 vSearch" id="recentSearchArea">
                    <h2>최근 검색 이력</h2>
                    <div className="swiper-container mSliderSearch">
                        <div className="swiper-wrapper" id="recentSwiperArea" style={{overflowX: "scroll"}}>
                            <div data1="RT" data2="N" data3="인천" data4="ICN" data5="후쿠오카" data6="FUK" data7="20230718"
                                 data8="20230721" data9="1" data10="" data11="성인 1명" data12="1" data13="0" data14="0"
                                 data15="[{&quot;sn&quot;:null,&quot;startDate&quot;:&quot;20230718&quot;,&quot;endDate&quot;:&quot;20230721&quot;,&quot;travelMulti&quot;:null,&quot;directYn&quot;:null,&quot;cityCdStart&quot;:&quot;ICN&quot;,&quot;cityNmStart&quot;:&quot;인천&quot;,&quot;cityCdEnd&quot;:&quot;FUK&quot;,&quot;cityNmEnd&quot;:&quot;후쿠오카&quot;,&quot;travelList&quot;:null,&quot;count&quot;:null,&quot;cabinClass&quot;:null,&quot;countString&quot;:null,&quot;adtCnt&quot;:0,&quot;chdCnt&quot;:0,&quot;infCnt&quot;:0}]"
                                 // onClick="setRecentSearchData(this)"
                                 onClick={(e) => setRecentSearchData(e.currentTarget)}
                                 className="swiper-slide">
                                <dl>
                                    <dt>인천 ICN - 후쿠오카 FUK</dt>
                                    <dd><span className="bold">왕복</span> / 23.07.18(화) ~ 23.07.21(금) / 1명 /</dd>
                                </dl>
                                <a className="onway_close" // onClick="deleteRecentSearch(this)"
                                      onClick={(e) => deleteRecentSearch(e.currentTarget)}
                                   data1="202306c56bc56b6a3c490b82b72e23e02561f9"></a>
                            </div>
                            <div data1="MT" data2="N" data3="인천" data4="ICN" data5="인천" data6="ICN" data7="20230601"
                                 data8="20230630" data9="3" data10="" data11="성인 1명 소아 1명 유아 1명" data12="1" data13="1"
                                 data14="1"
                                 data15="[{&quot;sn&quot;:null,&quot;startDate&quot;:&quot;20230601&quot;,&quot;endDate&quot;:null,&quot;travelMulti&quot;:null,&quot;directYn&quot;:null,&quot;cityCdStart&quot;:&quot;ICN&quot;,&quot;cityNmStart&quot;:&quot;인천&quot;,&quot;cityCdEnd&quot;:&quot;TYO&quot;,&quot;cityNmEnd&quot;:&quot;도쿄&quot;,&quot;travelList&quot;:null,&quot;count&quot;:null,&quot;cabinClass&quot;:null,&quot;countString&quot;:null,&quot;adtCnt&quot;:0,&quot;chdCnt&quot;:0,&quot;infCnt&quot;:0},{&quot;sn&quot;:null,&quot;startDate&quot;:&quot;20230615&quot;,&quot;endDate&quot;:null,&quot;travelMulti&quot;:null,&quot;directYn&quot;:null,&quot;cityCdStart&quot;:&quot;TYO&quot;,&quot;cityNmStart&quot;:&quot;도쿄&quot;,&quot;cityCdEnd&quot;:&quot;BJS&quot;,&quot;cityNmEnd&quot;:&quot;북경&quot;,&quot;travelList&quot;:null,&quot;count&quot;:null,&quot;cabinClass&quot;:null,&quot;countString&quot;:null,&quot;adtCnt&quot;:0,&quot;chdCnt&quot;:0,&quot;infCnt&quot;:0},{&quot;sn&quot;:null,&quot;startDate&quot;:&quot;20230630&quot;,&quot;endDate&quot;:null,&quot;travelMulti&quot;:null,&quot;directYn&quot;:null,&quot;cityCdStart&quot;:&quot;BJS&quot;,&quot;cityNmStart&quot;:&quot;북경&quot;,&quot;cityCdEnd&quot;:&quot;ICN&quot;,&quot;cityNmEnd&quot;:&quot;인천&quot;,&quot;travelList&quot;:null,&quot;count&quot;:null,&quot;cabinClass&quot;:null,&quot;countString&quot;:null,&quot;adtCnt&quot;:0,&quot;chdCnt&quot;:0,&quot;infCnt&quot;:0}]"
                                 // onClick="setRecentSearchData(this)"
                                 onClick={(e) => setRecentSearchData(e.currentTarget)}
                                 className="swiper-slide">
                                <dl>
                                    <dt>인천 ICN - 인천 ICN</dt>
                                    <dd><span className="bold">다구간</span> / 23.06.01(목) / 3명 /</dd>
                                </dl>
                                <a className="onway_close" // onClick="deleteRecentSearch(this)"
                                   onClick={(e) => deleteRecentSearch(e.currentTarget)}
                                   data1="2023052af9bd2d22c546029b7c46df5dc4e4b8"></a>
                            </div>
                            <div data1="OW" data2="N" data3="인천" data4="ICN" data5="프랑크푸르트" data6="FRA" data7="20230720"
                                 data8="날짜 선택" data9="1" data10="" data11="성인 1명" data12="1" data13="0" data14="0"
                                 data15="[{&quot;sn&quot;:null,&quot;startDate&quot;:&quot;20230720&quot;,&quot;endDate&quot;:null,&quot;travelMulti&quot;:null,&quot;directYn&quot;:null,&quot;cityCdStart&quot;:&quot;ICN&quot;,&quot;cityNmStart&quot;:&quot;인천&quot;,&quot;cityCdEnd&quot;:&quot;FRA&quot;,&quot;cityNmEnd&quot;:&quot;프랑크푸르트&quot;,&quot;travelList&quot;:null,&quot;count&quot;:null,&quot;cabinClass&quot;:null,&quot;countString&quot;:null,&quot;adtCnt&quot;:0,&quot;chdCnt&quot;:0,&quot;infCnt&quot;:0}]"
                                 // onClick="setRecentSearchData(this)"
                                 onClick={(e) => setRecentSearchData(e.currentTarget)}
                                 className="swiper-slide">
                                <dl>
                                    <dt>인천 ICN - 프랑크푸르트 FRA</dt>
                                    <dd><span className="bold">편도</span> / 23.07.20(목) / 1명 /</dd>
                                </dl>
                                <a className="onway_close"
                                   // onClick="deleteRecentSearch(this)"
                                   onClick={(e) => deleteRecentSearch(e.currentTarget)}
                                   data1="20230521fb85c47977427a9d36956150eef273"></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/*<section className="theme-area">*/}
            {/*    <h2>추천 여행지 &amp; 인기숙소</h2>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <img*/}
            {/*                src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/spdp/1674799515787.jpg"*/}
            {/*                alt="" onClick="location.href='/main/s_spdpDetailView.do?spdpSn=512';"*/}
            {/*                onError="this.src='/smart/images/common/noimg_1n1.png';"/>*/}
            {/*            <dl>*/}
            {/*                <dt>물놀이 호캉스 숙소</dt>*/}
            {/*                <dd><span>#가족 #연인 #애견</span></dd>*/}
            {/*            </dl>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <img*/}
            {/*                src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/spdp/1677485943650.jpg"*/}
            {/*                alt="" onClick="location.href='/main/s_spdpDetailView.do?spdpSn=496';"*/}
            {/*                onError="this.src='/smart/images/common/noimg_1n1.png';"/>*/}
            {/*            <dl>*/}
            {/*                <dt>봄엔 제주도여행</dt>*/}
            {/*                <dd><span>#푸른경치 #맛난음식</span></dd>*/}
            {/*            </dl>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</section>*/}

            {/*<section className="brn-area">*/}
            {/*    <div className="swiper-container mSlider01 swiper-container-initialized swiper-container-horizontal swiper-container-android">*/}
            {/*        <div className="swiper-wrapper" id="swiper-wrapper-a400bff35974913a" aria-live="off"*/}
            {/*             style={{transform: "translate3d(0px, 0px, 0px)", transitionDuration: "0ms"}}>*/}
            {/*            <div className="swiper-slide BNR_12683 swiper-slide-active" role="group" aria-label="1 / 2"*/}
            {/*                 style={{width: "375px"}}>*/}
            {/*                <img*/}
            {/*                    src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/banner/1680667302452.jpg"*/}
            {/*                    alt="" onClick="moveSite('/goods/air/s_AirList2.do','_blank');"/>*/}
            {/*            </div>*/}
            {/*            <div className="swiper-slide BNR_7285 swiper-slide-next" role="group" aria-label="2 / 2"*/}
            {/*                 style={{width: "375px"}}>*/}
            {/*                <img*/}
            {/*                    src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/banner/1660197150881.jpg"*/}
            {/*                    alt="" onClick="moveSite('/main/s_spdpDetailView.do?spdpSn=284','_blank');"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className="swiper-pagination mSlider01-paging swiper-pagination-clickable swiper-pagination-bullets">*/}
            {/*            <span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabIndex="0"*/}
            {/*                  role="button" aria-label="Go to slide 1"></span>*/}
            {/*            <span className="swiper-pagination-bullet" tabIndex="0"*/}
            {/*                  role="button" aria-label="Go to slide 2"></span>*/}
            {/*        </div>*/}
            {/*        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*<section className="theme-area v1">*/}
            {/*    <h2>제철 대게 본고장🦀, 경북 동해안 여행</h2>*/}
            {/*    <div className="swiper-container mSlider02 swiper-container-initialized swiper-container-horizontal swiper-container-android">*/}
            {/*        <div className="swiper-wrapper" id="swiper-wrapper-296510e864c5f9ed" aria-live="polite"*/}
            {/*             style={{transform: "translate3d(0px, 0px, 0px)"}}>*/}
            {/*            <div className="swiper-slide swiper-slide-active" role="group" aria-label="1 / 10"*/}
            {/*                 style={{width: "132.593px", marginRight: "10px"}}>*/}
            {/*                <img*/}
            {/*                    src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/spdp/1674808751129.png"*/}
            {/*                    style={{objectFit: "cover", height: "120px",}} alt=""*/}
            {/*                    onClick="location.href='/main/s_spdpDetailView.do?spdpSn=543';"*/}
            {/*                    onError="this.src='/smart/images/common/noimg_1n1.png';"/>*/}
            {/*                <div className="item" onClick="location.href='/main/s_spdpDetailView.do?spdpSn=543';">*/}
            {/*                    [울진] 산포리 펜션<br/>175,000원 부터~*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <select
                // onChange="chgMain(this)"
                style={{display:"none"}}
                defaultValue={"01"}
            >
                {/*<option value="01" selected="selected">숙박</option>*/}
                <option value="01">숙박</option>
                <option value="02">도서</option>
                <option value="03">골프</option>
            </select>
        </main>

        <div id="pwdInfoPOP" className="full-layer">
            <div className="popWrap">
                <div className="pop-header">
                    <div className="pop-tit">
                        <h1>비밀번호 안내</h1>
                        <a href="#" className="btnClose full-pop-close">닫기</a>
                    </div>
                </div>
                <div className="pop-cont">
                    <p className="mgr_20 mgb_10">
                        <img alt="" src="/pc/images/content/icon_warning.png"
                             style={{float: "left", margin: "-5px 10px 0px 10px", width: "40px", height: "36px"}}/>
                        <span style={{fontWeight: "bold"}}>HCC 이용 아이디는 비즈플레이 아이디와 동일하며, 비밀번호 변경 후 이용해주세요.</span>
                    </p>

                    <div className="boxCont a-service">
                        <h2><span>안전한 서비스<br/> 이용을 위한</span> <br/>비밀번호 변경 안내</h2>
                        <p className="mgt_25 mgb_15 gray">최초 서비스 이용시 비밀번호는 핸드폰번호로 등록되어 있습니다.예)01012341234</p>
                        <p className="mgb_30">아래 순서대로 접근하시면 비밀번호가 변경되오니 안전한 서비스 이용을 위해 비밀번호 변경을 추천드립니다.</p>
                        <img alt="" src="/smart/images/content/pwd_info.png"/>
                        <div className="flexWrap mgt_20">
                            <a href="/mypage/s_MyPageInfo.do" className="lbtn filled btn-large"
                               style={{background: "#333", border: "1px solid #333"}}>비밀번호 변경하러 가기</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="popupArea"></div>

        <div className="foreAirStationArea" style={{display: "none"}}>
            <input type="hidden" name="foreInputArea" id="foreInputArea"/>
            <div id="header" className="center">
                <div className="header_top">
                    <a
                        // href="javascript:void(0);"
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
                        ><span className="hdn">검색</span></a>
                    </div>
                </div>
                <div className="start-p" id="allCity">
                    <div className="whole-city">전체도시</div>
                    <div className="whole-tab">
                        <div className="city-btn" id="tablinkArea">
                                {/*<button className="tablinks active" onClick="openCity(event,'KOR')">국내</button>*/}
                            {country.map((item, index)=>
                                <button className={`tablinks ${index == 0 ? "active" : ""}`} key={index} onClick={(e) => openCity(e.currentTarget, item.eng)}>{item.kor}</button>)}
                        </div>

                        {/*<div className="cityTabcontent" id="KOR" style={{display: "block"}}>*/}
                        {/*    <p className="place"><a href="#" onClick="setForeList(this)">*/}
                        {/*        <span className="airport">ICN</span><span className="city">인천</span></a>*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        {country.map((item, index)=>
                            <div className="cityTabcontent" id={item.eng} key={index} style={index == 0 ? {display: "block",} : {display: "none",}}>
                                {/*<p className="place"><a href="#" onClick="setForeList(this)"><span className="airport">ICN</span><span className="city">인천</span></a></p>*/}
                                {item.list.map((city, cIndex) =>
                                    <p className="place" key={cIndex}>
                                        <a href="#" onClick={(e) => setForeList(e.currentTarget)}>
                                            <span className="airport">{city.eng}</span>
                                            <span className="city">{city.kor}</span>
                                        </a>
                                    </p>
                                )}
                            </div>)}
                    </div>
                    <div className="start-p" id="searchCity">
                        <ul id="searchTarget">
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="foreAirDateArea" style={{display: "none"}}>
            <div id="header" className="center">
                <div className="header_top">
                    <a
                        // href="javascript:void(0);"
                       className="btnPrev foreCalendarArea"
                       // onClick="closeCalendarMulti();"
                       onClick={() => closeCalendarMulti()}
                    >이전</a>
                    <h1 className="foreCalendarArea">날짜 선택</h1>
                </div>
            </div>
            <div id="multiTravelDateList" className="quick-option CALENDAR_DBL"
                 style={{display: "none", paddingTop: "57px"}}>
                {/*<div id="date_multi" className="dateSel vMulti bg">*/}
                {/*    <dl id="date_multi_0">*/}
                {/*        <dt>여정1</dt>*/}
                {/*        <dd className="select"><a href="#">날짜선택</a></dd>*/}
                {/*    </dl>*/}
                {/*    <dl id="date_multi_1">*/}
                {/*        <dt>여정2</dt>*/}
                {/*        <dd className="select"><a href="#">날짜선택</a></dd>*/}
                {/*    </dl>*/}
                {/*</div>*/}
            </div>

            {/*<div id="ForeCAL_1" className="datepicker pl30">*/}
            {/*    <div className="month">*/}
            {/*        <span className="C_MONTH">2023.5</span>*/}
            {/*    </div>*/}
            {/*    <table>*/}
            {/*        <caption>datepicker</caption>*/}
            {/*        <colgroup>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="*"/>*/}
            {/*        </colgroup>*/}
            {/*        <thead>*/}
            {/*            <tr>*/}
            {/*                <th className="sun">일</th>*/}
            {/*                <th>월</th>*/}
            {/*                <th>화</th>*/}
            {/*                <th>수</th>*/}
            {/*                <th>목</th>*/}
            {/*                <th>금</th>*/}
            {/*                <th className="sat">토</th>*/}
            {/*            </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*            <tr>*/}
            {/*                <td id="Forecalendar_20230702">*/}
            {/*                    <div className="day sat" onClick="setClickDataVal3(20230702);">2</div>*/}
            {/*                </td>*/}
            {/*                <td id="Forecalendar_20230703">*/}
            {/*                    <div className="day" onClick="setClickDataVal3(20230703);">3</div>*/}
            {/*                </td>*/}
            {/*                <td id="Forecalendar_20230704">*/}
            {/*                    <div className="day" onClick="setClickDataVal3(20230704);">4</div>*/}
            {/*                </td>*/}
            {/*                <td id="Forecalendar_20230705">*/}
            {/*                    <div className="day" onClick="setClickDataVal3(20230705);">5</div>*/}
            {/*                </td>*/}
            {/*                <td id="Forecalendar_20230706">*/}
            {/*                    <div className="day" onClick="setClickDataVal3(20230706);">6</div>*/}
            {/*                </td>*/}
            {/*                <td id="Forecalendar_20230707">*/}
            {/*                    <div className="day" onClick="setClickDataVal3(20230707);">7</div>*/}
            {/*                </td>*/}
            {/*                <td id="Forecalendar_20230708">*/}
            {/*                    <div className="day sat" onClick="setClickDataVal3(20230708);">8</div>*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
            <DatePicker
                id="ForeCAL_1"
                onChange={onChangeMulti}
                // selected={startDate}
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

            {/*<div className="btmBtn-fixed cal ">*/}
            {/*    <a href="javascript:void(0);" className="lbtn filled btn-large mgt_30"*/}
            {/*       style={{background: "#466cc2", border: "1px solid #466cc2"}}*/}
            {/*       onClick={() => closeCalendarMulti()}*/}
            {/*    >선택 완료</a>*/}
            {/*</div>*/}
        </div>

        <div className="foreAirMemberAndSeatArea" style={{display: "none"}}>
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
                            <span>1</span>
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
                            >
                            </button>
                            <span>0</span>
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
                            <span>0</span>
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
                    <li className="on select" data="Y"
                        // onClick="setSeatVal(this)"
                        onClick={(e) => setSeatVal(e.currentTarget, "Y")}
                    ><a href="#">일반석</a></li>
                    <li data="W"
                        // onClick="setSeatVal(this)"
                        onClick={(e) => setSeatVal(e.currentTarget, "W")}
                    ><a href="#">프리미엄 일반석</a></li>
                    <li data="C"
                        // onClick="setSeatVal(this)"
                        onClick={(e) => setSeatVal(e.currentTarget, "C")}
                    ><a href="#">비즈니스석</a></li>
                    <li data="F"
                        // onClick="setSeatVal(this)"
                        onClick={(e) => setSeatVal(e.currentTarget, "F")}
                    ><a href="#">일등석</a></li>
                </ul>

                <div className="btmBtn-fixed">
                    <a href="#none" className="lbtn filled btn-large mgt_30"
                       style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                       // onClick="closeAirMemberAndSeat()"
                       onClick={() => closeAirMemberAndSeat()}
                    >확인</a>
                </div>
            </div>
        </div>

        <div className="calendarArea" style={{display: "none"}}>
            <div id="header" className="center">
                <div className="header_top">
                    <a
                        // href="javascript:void(0);"
                       className="btnPrev calendarArea"
                       // onClick="closeCalendar();"
                       onClick={() => closeCalendar()}
                    >이전</a>
                    <h1 className="calendarArea" >날짜 선택</h1>
                </div>
            </div>
            <div id="travelDateList" className="quick-option CALENDAR_DBL" style={{paddingTop: "57px", display: "block"}}>
                <div className="dateSel v2 bg CALENDAR_TP">
                    <dl>
                        <dt id="CAL_START">가는날</dt>
                        <dd>
                            <a
                            // href="javascript:void(0);"
                               id="CALENDAR_D_DATE">날짜 선택</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt id="CAL_END">오늘날</dt>
                        <dd>
                            <a
                            // href="javascript:void(0);"
                               id="CALENDAR_A_DATE">날짜 선택</a>
                        </dd>
                    </dl>
                </div>
            </div>

            {/*<div id="CAL_1" className="datepicker pl30">*/}
            {/*    <div className="month">*/}
            {/*        <span className="C_MONTH">2023.5</span>*/}
            {/*    </div>*/}

            {/*    <table>*/}
            {/*        <caption>datepicker</caption>*/}
            {/*        <colgroup>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="14.2%"/>*/}
            {/*            <col width="*"/>*/}
            {/*        </colgroup>*/}
            {/*        <thead>*/}
            {/*            <tr>*/}
            {/*                <th className="sun">일</th>*/}
            {/*                <th>월</th>*/}
            {/*                <th>화</th>*/}
            {/*                <th>수</th>*/}
            {/*                <th>목</th>*/}
            {/*                <th>금</th>*/}
            {/*                <th className="sat">토</th>*/}
            {/*            </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*            <tr>*/}
            {/*                <td> &nbsp; </td>*/}
            {/*                <td id="calendar_20230501">*/}
            {/*                    <div className="day sun" style={{color: "#d6d6d6"}}>1</div>*/}
            {/*                </td>*/}
            {/*                <td id="calendar_20230502">*/}
            {/*                    <div className="day" style={{color: "#d6d6d6"}}>2</div>*/}
            {/*                </td>*/}
            {/*                <td id="calendar_20230503">*/}
            {/*                    <div className="day" style={{color: "#d6d6d6"}}>3</div>*/}
            {/*                </td>*/}
            {/*                <td id="calendar_20230504">*/}
            {/*                    <div className="day" style={{color: "#d6d6d6"}}>4</div>*/}
            {/*                </td>*/}
            {/*                <td id="calendar_20230505">*/}
            {/*                    <div className="day sun" style={{color: "#d6d6d6"}}>5</div>*/}
            {/*                </td>*/}
            {/*                <td id="calendar_20230506">*/}
            {/*                    <div className="day sat" style={{color: "#d6d6d6"}}>6</div>*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}

            <DatePicker
                onChange={onChange}
                selected={singleDate.startDate}
                startDate={singleDate.startDate}
                endDate={singleDate.endDate}
                dateFormat="yyyy.MM.dd"
                selectsRange={true}
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

            <div className="btmBtn-fixed cal CALENDAR_DBL" style={{display: "block"}}>
                <a
                    // href="javascript:void(0);"
                   className="lbtn filled btn-large mgt_30"
                   style={{background: "#466cc2", border: "1px solid #466cc2"}}
                   // onClick="setFromToVal();"
                   onClick={() => setFromToVal()}
                >선택 완료</a>
            </div>

        </div>

        <div id="alliancePOP" className="full-layer">
            <div className="popWrap">
                <div className="pop-header">
                    <div className="pop-tit">
                        <h1>제휴서비스 이용 동의</h1>
                        <a href="#" className="btnClose full-pop-close">닫기</a>
                    </div>
                </div>
                <div className="pop-cont">
                    <div className="boxCont a-service">
                        <h2><span>안전한 제휴서비스<br/> 이용을 위한</span> <br/>개인정보 동의 안내</h2>
                        <p className="mgt_25 mgb_15 gray">제휴사명 은 수준 높은 서비스 제공 및 본인확인을 위해 다음과 같이
                            회원님의 동의 하에 개인정보를 제공하고 있습니다.
                            회원님의 개인정보를 중요시 여기며, 정보통신망 이용촉진 및 정보
                            보호에 관한 법률을 준수합니다.
                        </p>
                        <p className="mgb_30">아래 ㈜라쿠카라차 에서 제공되는 정보를 확인하시고, 동의 절차를 진행해 주시기 바랍니다.</p>
                        <table>
                            <caption>제휴사에 제공되는 정보</caption>
                            <tbody>
                            <tr>
                                <th>서비스명</th>
                                <td>
                                    {/*<c:choose>*/}
                                    {/*    <c:when test="${sessionUtil:getCscoSessionMap().skYn eq 'Y'}">*/}
                                            라차
                                        {/*</c:when>*/}
                                        {/*<c:when test="${sessionUtil:getCscoSessionMap().cscoNo eq 2001}">*/}
                                        {/*    라차*/}
                                        {/*</c:when>*/}
                                        {/*<c:otherwise>*/}
                                    {/*        HCC*/}
                                    {/*    </c:otherwise>*/}
                                    {/*</c:choose>*/}
                                    (기차, 기차여행, 항공, 숙박예약)
                                </td>
                            </tr>
                            <tr>
                                <th>제공대상(업체명)</th>
                                <td>한국철도공사, (주)플러스앤, (주)갤럭시아머니트리, (주)케이포스트, (주)플래닛비, (주)선민항공, (주)온다</td>
                            </tr>
                            <tr>
                                <th>제공하는 개인정보 항목</th>
                                <td>이름, 로그인 ID</td>
                            </tr>
                            <tr>
                                <th>개인정보 이용 목적</th>
                                <td>서비스 이용 및 주문 · 배송 등의 구매내역 관리</td>
                            </tr>
                            <tr>
                                <th>개인정보의 보유 및 이용기간</th>
                                <td>동의 시점부터 서비스 제공기간 만료일 및 탈퇴일까지</td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="mgt_30 mgb_20 f14 fw500">위의 개인정보를 제3자에 제공하는 것에 동의하시겠습니까?</p>
                        <div className="flexWrap mgt_20">
                            <a
                                // href="javascript:void(0);"
                               className="lbtn filled-g btn-large"
                               onClick={() => common.closeConfirmLayer()}
                            >동의안함</a>
                            <a
                                // href="javascript:void(0);"
                               className="lbtn filled btn-large"
                               style={{
                                   background: "#466cc2",
                                   border: "1px solid #466cc2",
                               }}
                               // style="background: <c:out value=" ${sessionUtil:getCscoSessionMap().btnClr}"/>;
                               //     border:1px solid <c:out value=" ${sessionUtil:getCscoSessionMap().btnClr}"/>"
                               // onClick="applyCallBack();"
                               onClick={() => applyCallBack()}
                            >동의</a>
                        </div>
                        <div className="mgt_30 mgb_40">
                            <span className="rafer-red">정보 공유에 동의하지 않으시는 경우 해당 서비스를 이용하실 수 없습니다.</span>
                        </div>
                        <p className="gray">
                            본 서비스는 ㈜라쿠카라차가 제휴를 통해 제공하며, 상품의 주문, 결제, 배송, 교환, 환불 등
                            제공된 상품 및 서비스 등과 관련된 일체의 책임은 상품 및 서비스의 제공사에게 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>


        {/*<div id="footer">*/}
        {/*    <div className="footerBtm">*/}
        {/*        <ul className="footer-menu">*/}
        {/*            <li><a href="/etc/s_TermOfService.do">이용약관</a></li>*/}
        {/*            <li><a href="/etc/s_PrivacyPolicy.do">개인정보처리방침</a></li>*/}
        {/*            <li><a href="/cs/s_CscMain.do">고객센터</a></li>*/}
        {/*        </ul>*/}
        {/*        <p>Copyright © LACUCARACHA Co., Ltd. All rights reserved.</p>*/}
        {/*    </div>*/}
        {/*    <div className="top">*/}
        {/*        <h2>*/}
        {/*            <a href="/">*/}
        {/*                <img src="./images/common/footer_logo_lacha.png" alt="HCC"/>*/}
        {/*            </a>*/}
        {/*        </h2>*/}
        {/*        <div className="csmr" onClick="scrollBottom();">주식회사 라쿠카라차 사업자 정보</div>*/}
        {/*    </div>*/}
        {/*    <div className="csmrCont">*/}
        {/*        <dl>*/}
        {/*            <dt>상호명</dt>*/}
        {/*            <dd>주식회사 라쿠카라차</dd>*/}
        {/*        </dl>*/}
        {/*        <dl>*/}
        {/*            <dt>대표이사</dt>*/}
        {/*            <dd>이윤상</dd>*/}
        {/*        </dl>*/}
        {/*        <dl>*/}
        {/*            <dt>주소</dt>*/}
        {/*            <dd>(06197) 서울시 강남구 선릉로 86길 26, 4층</dd>*/}
        {/*        </dl>*/}
        {/*        <dl>*/}
        {/*            <dt>사업자번호</dt>*/}
        {/*            <dd><p>657-88-00880<span className="line"></span><a*/}
        {/*                href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6578800880" target="_blank">사업자등록정보확인</a></p>*/}
        {/*            </dd>*/}
        {/*        </dl>*/}
        {/*        <dl>*/}
        {/*            <dt>통신판매업신고번호</dt>*/}
        {/*            <dd>2021-서울강남-01710</dd>*/}
        {/*        </dl>*/}
        {/*        <dl>*/}
        {/*            <dt>개인정보보호책임자</dt>*/}
        {/*            <dd>유호상</dd>*/}
        {/*        </dl>*/}
        {/*        <dl>*/}
        {/*            <dt>고객센터</dt>*/}
        {/*            <dd><p>전화 : 02-568-1220<span className="line"></span>팩스 : 02-508-0612</p><p*/}
        {/*                style={{textAlign: "left"}}>메일 : help@hcclab.com</p></dd>*/}
        {/*        </dl>*/}

        {/*    </div>*/}
        {/*</div>*/}
        <Footer/>

    </div>
  );
}

export default App;
