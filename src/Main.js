// import 'bootstrap/dist/js/bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useState} from "react";
import $ from 'jquery';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import './css/common.css';
// import './css/Main.css';
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

    // let $mainQuick = $('.m-quick'),
    //     $mainTab = $('.m-quick-tab'),
    //     $mainTabItem = $mainTab.find('li'),
    //     $mainTabLink = $mainTab.find('a'),
    //     $mainTabCont = $('.m-quick-tabcont .tabcont'),
    //     tabRandom = Math.floor(Math.random() * (5 - 1 + 1)) + 1,
    //     bgRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    //
    // // Init(배경 랜덤, 탭 랜덤)
    // const initFunc = function () {
    //     $mainQuick.addClass('visual0' + bgRandom);
    // }
    // initFunc();

    const onScroll = (event) => {
        if (event.target.scrollTop > 0) document.getElementById("mainHeader").classList.add("sticky");
        else document.getElementById("mainHeader").classList.remove("sticky");

    }

    const foreignAirWayTypeList = {
        0: {type: "RT", id: "AIR_FORE_TAB_1", kor: "왕복"},
        1: {type: "OW", id: "AIR_FORE_TAB_2", kor: "편도"},
        2: {type: "MT", id: "AIR_FORE_TAB_3", kor: "다구간"},
    };

    const [foreignAirWayType, setForeignAirWayType] = useState(0);
    // const setForeignAirWayType = (e) => {
    //     const item = $(e.target).parent();
    //     item.addClass('current');
    //     item.siblings().removeClass('current');
    //
    //     if (item.data('type') == 'RT') {
    //         $('#noneMulti').css('display', 'block');
    //         $('#useMulti').css('display', 'none');
    //
    //         $('#AIR_FORE_DATASEL').addClass('v2');
    //         $('#AIR_FORE_DATASEL').children('dl:nth-child(2)').css('display', '');
    //         $('#AIR_FORE_DATASEL').removeClass('v1');
    //
    //         $('#foreTravelAdd').css('display', 'none');
    //     }
    //
    //     else if (item.data('type') == 'OW') {
    //         $('#noneMulti').css('display', 'block');
    //         $('#useMulti').css('display', 'none');
    //
    //         $('#AIR_FORE_DATASEL').addClass('v1');
    //         $('#AIR_FORE_DATASEL').children('dl:nth-child(2)').css('display', 'none');
    //         $('#AIR_FORE_DATASEL').removeClass('v2');
    //
    //         $('#foreTravelAdd').css('display', 'none');
    //     }
    //
    //     else if (item.data('type') == 'MT') {
    //         $('#noneMulti').css('display', 'none');
    //         $('#useMulti').css('display', 'block');
    //         $('#foreTravelAdd').css('display', 'block');
    //     }
    // }

    const foreOpenAirStation = (str) => {
        $('#foreAirStationHeader').text(str);
        $('.foreAirStationArea').siblings().css('display', 'none');
        $('.foreAirStationArea').css('display', 'block');
    }

    const closeForeAirStation = () => {
        $('.foreAirStationArea').siblings('*:not(.modal)').css('display', '');
        $('.foreAirStationArea').css('display', 'none');
    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const dateFormat = (date) => {
        if (date.getMonth() + 1 < 10) return date.getFullYear() + ".0" + (date.getMonth() + 1) + "." + date.getDate();
        return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (end != null) {
            $('#CAL_START + dd > a').text(dateFormat(start));
            $('#CAL_END + dd > a').text(dateFormat(end));
        }
        else {
            $('#CAL_START + dd > a').text('날짜 선택');
            $('#CAL_END + dd > a').text('날짜 선택');
        }
    };

    const openCalendar = () => {
        $('.calendarArea').siblings().css('display', 'none');
        $('.calendarArea').css('display', 'block');
    }

    const closeCalendar = () => {
        $('.calendarArea').siblings('*:not(.modal)').css('display', '');
        $('.calendarArea').css('display', 'none');
    }

    const [member, setMember] = useState({adult: 1, child: 0, baby: 0});
    const seatTypeList = ([
        {type: "Y", kor: "일반석"},
        {type: "W", kor: "프리미엄 일반석"},
        {type: "C", kor: "비즈니스석"},
        {type: "F", kor: "일등석"},
    ]);
    const [seat, setSeat] = useState("Y");

    const openAirMemberAndSeat = () => {
        $('.foreAirMemberAndSeatArea').siblings().css('display', 'none');
        $('.foreAirMemberAndSeatArea').css('display', 'block');
    }
    const closeAirMemberAndSeat = () => {
        $('.foreAirMemberAndSeatArea').siblings('*:not(.modal)').css('display', '');
        $('.foreAirMemberAndSeatArea').css('display', 'none');
    }


    const updateCount = (element, type, countId) => {
        const targetId = element.parentNode.id;
        const target = element.parentNode.childNodes[1];
        let nowCount = element.parentNode.childNodes[1].innerHTML;

        let updateCount = 0;
        if (type) {
            if (targetId == "adult" && nowCount != "1" || targetId != "adult" && nowCount != "0") {
                updateCount = (nowCount * 1) - 1;
            }
        } else {
            updateCount = (nowCount * 1) + 1;
        }

        let adultCount = 0;
        const parentTarget = document.getElementById("adult");
        adultCount = parentTarget.childNodes[1].innerHTML * 1;
        if (countId == "AIR_F_C_3" && updateCount > adultCount) {
            cmnAlertLayer("_layer", "성인 1인당, 유아 1인까지 동반 탑승 가능합니다");
        } else {
            target.innerHTML = (targetId == "adult" && updateCount == 0) ? 1 : updateCount;
            document.getElementById(countId).value = updateCount;
        }
    }

    const setSeatVal = (element, type) => {
        let $el = $(element);
        const target = document.getElementById("AIR_F_S");
        target.value = type;
        setSeat(type);
        $el.closest(".seat-btn").find("li").removeClass("on select");
        element.parentNode.className = "on select";
        document.getElementById("AIR_F_Seat").innerText = element.innerText;
    }

    // 비동기인 setState가 처리되고 난 후 실행되는 함수
    // 여기서는 seat 값이 변경되면 해당 함수가 실행된다
    // useEffect(() => {
    //     console.log("seat : " + seat);
    // }, [seat]);

    const addForeTravel = () => {
        const placeSelLength = $('#useMulti').find('.placeSel').length;
        if (placeSelLength == 4) return;

        const text = `
            <div id="multi_cell_` + placeSelLength + `" class="placeSel">
                <div id="multi_travel_` + placeSelLength + `" class="multiSel">
                    <a id="AIR_whereDepartCity_` + placeSelLength + `" class="start">출발</a>
                    <input type="hidden" name="depCity" id="departCity_` + placeSelLength + `">
                    <a class="oneway"></a>
                    <input type="hidden" name="arrCity" id="arrivelCity_` + placeSelLength + `">
                    <a id="AIR_whereArrivelCity_` + placeSelLength + `" class="arrive">도착</a>
                </div>
                <div id="multi_date_` + placeSelLength + `" class="dateSel v5">
                    <dl>
                        <dt>가는날</dt>
                        <dd onclick="openMultiCalendar(this, 1, 1, 1)" id="AIR_whereDepartDate_` + placeSelLength + `" class="CAL_DATE">날짜 선택</dd>
                    </dl>
                    <a class="onway_close" id="closeTargetid" onclick="deleteTravel()"></a>
                </div>
            </div>`;

        $('#useMulti').append(text);
        const departId = `AIR_whereDepartCity_` + placeSelLength;
        document.getElementById(departId).addEventListener('click', function() {foreOpenAirStation('출발지')});
        const arrivalId = `AIR_whereArrivelCity_` + placeSelLength;
        document.getElementById(arrivalId).addEventListener('click', function() {foreOpenAirStation('도착지')});
        $('#useMulti').find('.placeSel:not(:last-child) .onway_close').remove();
    }


    const controller = {

    };

    const cmnAlertLayer = (targetId, msg, callback) => {
        var $open_btn = $("#" + targetId);

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
            $open_btn.focus();
            if(typeof callback != 'undefined' && callback != null) {
                callback();
            }

            return false;
        });
    };

    const getRecentForeAirList = () => {
        controller.ajaxSend({
            url : "/foreign/reserve/RecentList.json"
            ,type : "post"
            ,dataType : "json"
            ,successCall : function(data) {
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
            }
            , error:function(data) {
                cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    const deleteRecentSearch = (element) => {

        // const dataObject = {
        //     "sn":element.getAttribute("data1")
        // }
        // controller.ajaxSend({
        //     url : "/foreign/reserve/deleteRecentSearch.json"
        //     ,type : "post"
        //     ,dataType : "json"
        //     , data :dataObject
        //     ,successCall : function(data) {
        $(element).closest('div').remove();
        //         $("#recentSearchArea").empty();
        //         getRecentForeAirList();
        //     }
        //     , error:function(data) {
        //         cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
        //         return;
        //     }
        // });

        if ($('#recentSwiperArea').children().length == 0) {
            $('#recentSearchArea').css('display', 'none');
            // $('#recentSearchArea').remove();
        }
    }

return (
    <div style={{width: "100%", height: "100vh", overflow: "scroll",}}
        onScroll={(e) => onScroll(e)}>
      <header id="mainHeader">
        <a href="/" className="home">
            <img src="./images/main/m_logo_b_lacha.png" alt="HCC"/>
        </a>
        <a href="/mypage" className="topMenu">
            <img src="./images/main/m_menu_b.png" alt="메뉴"/>
        </a>
      </header>
      <main className="body">
          <div id="htmlDispCont11">
              {/*<script>*/}
              {/*    $(function(){*/}

              {/*    let $mainQuick = $('.m-quick'),*/}
              {/*    $mainTab = $('.m-quick-tab'),*/}
              {/*    $mainTabItem = $mainTab.find('li'),*/}
              {/*    $mainTabLink = $mainTab.find('a'),*/}
              {/*    $mainTabCont = $('.m-quick-tabcont .tabcont'),*/}
              {/*    tabRandom = Math.floor(Math.random() * (5 - 1 + 1)) + 1,*/}
              {/*    bgRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;*/}

              {/*    // Init(배경 랜덤, 탭 랜덤)*/}
              {/*    const initFunc = function () {*/}
              {/*        $mainQuick.addClass('visual0' + bgRandom);*/}
              {/*    }*/}
              {/*    initFunc();*/}

              {/*  });*/}
              {/*</script>*/}
              <section className="m-quick visual01 visual03">
                  <div className="m-quick-box">
                      <ul className="m-quick-tab">
                          <li className="item01 4">
                              {/*<a href="#" onClick="openSession(4);">기차여행</a>*/}
                              <a href="#">기차여행</a>
                          </li>
                          <li className="item05 3">
                              {/*<a href="#" onClick="openSession(3);">숙박</a>*/}
                              <a href="#">숙박</a>
                          </li>
                          <li className="item04 7 active">
                              {/*<a href="#" onClick="openSession(7);">항공</a>*/}
                              <a href="#">항공</a>
                          </li>
                      </ul>
                      <div className="m-quick-tabcont">
                          <div id="S_7" className="tabcont active item04">
                              <div className="s-tabArea">
                                  <ul className="tab" id="travelType">
                                      {Object.values(foreignAirWayTypeList).map((a, index) =>
                                          <li id={a.id} className={index == foreignAirWayType ? "current" : ""} data-type={a.type} key={index} onClick={() => setForeignAirWayType(index)}>
                                              <a href="#">{a.kor}</a>
                                          </li>
                                      )}

                                      {/*<li data="RT" className="current" onClick="setForeignAirWayType(this, 0);"*!/*/}
                                      {/*<li data-type="RT" className="current" id="AIR_FORE_TAB_1" onClick={(event) => setForeignAirWayType(event)}*/}
                                      {/*><a href="#">왕복</a></li>*/}
                                      {/*<li data="OW" onClick="setForeignAirWayType(this, 1);" id="AIR_FORE_TAB_2"><a*!/*/}
                                      {/*<li data-type="OW" id="AIR_FORE_TAB_2" onClick={(event) => setForeignAirWayType(event)}*/}
                                      {/*><a href="#">편도</a></li>*/}
                                      {/*<li data="MT" onClick="setForeignAirWayType(this, 2);" id="AIR_FORE_TAB_3"><a*!/*/}
                                      {/*<li data-type="MT" id="AIR_FORE_TAB_3" onClick={(event) => setForeignAirWayType(event)}*/}
                                      {/*><a href="#">다구간</a></li>*/}

                                      {/*<li className="check_trip" style="position: absolute !important; right: 13px;">*/}
                                      <li className="check_trip">
                                          <input id="tripPlan" type="checkbox"/><label htmlFor="tripPlan">직항</label></li>
                                  </ul>
                                  <div id="tab7-1" className="tabcontent current">
                                      <div className="quick-option">
                                          <div id="noneMulti" style={foreignAirWayType == 0 || foreignAirWayType == 1 ? {display: "block"} : {}}
                                          >
                                              <div id="fore_travel_0" className="placeSel">
                                                  <a href="#" className="start"
                                                     onClick={() => foreOpenAirStation('출발지')}
                                                     id="AIR_whereDepartCity">출발</a>
                                                  <input type="hidden" name="depCity" id="departCity"/>
                                                      <a href="#" className="change"
                                                         // onClick="swapArea();"></a>
                                                         ></a>
                                                      <a href="#" className="arrive"
                                                         onClick={() => foreOpenAirStation('도착지')}
                                                         id="AIR_whereArrivelCity">도착</a>
                                                      <input type="hidden" name="arrCity" id="arrivelCity"/>
                                              </div>
                                              <div id="AIR_FORE_DATASEL"
                                                   // className='dateSel v2'
                                                  className={`dateSel ${foreignAirWayType == 1 ? 'v1' : 'v2'}`}
                                              >
                                                  <dl>
                                                      <dt>가는날</dt>
                                                      {/*<dd onClick="openCalendar(this, 1, 1, 1);"*/}
                                                      <dd onClick={() => openCalendar()}
                                                          id="AIR_whereDepartDate" className="CAL_DATE">날짜 선택
                                                      </dd>
                                                  </dl>
                                                  <dl
                                                      // style={{}}
                                                      style={foreignAirWayType == 1 ? {display: 'none'} : {}}
                                                  >
                                                      <dt>오는날</dt>
                                                      {/*<dd onClick="openCalendar(this, 1, 1, 1);"*/}
                                                      <dd onClick={() => openCalendar()}
                                                          id="AIR_whereArrivelDate" className="CAL_DATE">날짜 선택
                                                      </dd>
                                                  </dl>
                                              </div>
                                          </div>
                                          {/*<div id="useMulti" style={{display: "none",}}*/}
                                          <div id="useMulti"
                                               // style={{display: "none"}}
                                              style={foreignAirWayType == 2 ? {display: "block"} : {display: "none"}}

                                          >
                                              <div id="multi_cell_0" className="placeSel">
                                                  <div id="multi_travel_0" className="multiSel">
                                                      <a href="#" className="start"
                                                         // onClick="foreOpenAirStation(this, '출발지');"
                                                         onClick={() => foreOpenAirStation('출발지')}
                                                         id="AIR_whereDepartCity_0">출발<span
                                                          className="country">지역</span></a>
                                                      <input type="hidden" name="depCity" id="departCity_0"/>
                                                          <a className="oneway"></a>
                                                          <input type="hidden" name="arrCity" id="arrivelCity_0"/>
                                                              <a href="#" className="arrive"
                                                                 // onClick="foreOpenAirStation(this, '도착지');"
                                                                 onClick={() => foreOpenAirStation('도착지')}
                                                                 id="AIR_whereArrivelCity_0">도착<span
                                                                  className="country">지역</span></a>
                                                  </div>
                                                  <div id="multi_date_0" className="dateSel v5">
                                                      <dl>
                                                          <dt>가는날</dt>
                                                          {/*<dd onClick="openMultiCalendar(this, 1, 1, 1);"*/}
                                                          <dd
                                                              id="AIR_whereDepartDate_0" className="CAL_DATE">날짜 선택
                                                          </dd>
                                                      </dl>
                                                  </div>
                                              </div>
                                              <div id="multi_cell_1" className="placeSel">
                                                  <div id="multi_travel_1" className="multiSel">
                                                      <a href="#" className="start"
                                                         // onClick="foreOpenAirStation(this, '출발지');"
                                                         onClick={() => foreOpenAirStation('출발지')}
                                                         id="AIR_whereDepartCity_1">출발<span
                                                          className="country">지역</span></a>
                                                      <input type="hidden" name="depCity" id="departCity_1"/>
                                                          <a className="oneway"></a>
                                                          <input type="hidden" name="arrCity" id="arrivelCity_1"/>
                                                              <a href="#" className="arrive"
                                                                 // onClick="foreOpenAirStation(this, '도착지');"
                                                                 onClick={() => foreOpenAirStation('도착지')}
                                                                 id="AIR_whereArrivelCity_1">도착<span
                                                                  className="country">지역</span></a>
                                                  </div>
                                                  <div id="multi_date_1" className="dateSel v5">
                                                      <dl>
                                                          <dt>가는날</dt>
                                                          {/*<dd onClick="openMultiCalendar(this, 1, 1, 1);"*/}
                                                          <dd
                                                              id="AIR_whereDepartDate_1" className="CAL_DATE">날짜 선택
                                                          </dd>
                                                      </dl>
                                                  </div>
                                              </div>
                                          </div>
                                          {/*<div id="foreTravelAdd" className="wayArea" style="display: none;"*/}
                                          <div id="foreTravelAdd" className="wayArea"
                                               // style={{display: "none"}}
                                              style={foreignAirWayType == 2 ? {display: "block"} : {display: "none"}}
                                               // onClick="addForeTravel()">
                                              onClick={() => addForeTravel()}
                                               >
                                              <a href="#">여정추가</a>
                                          </div>
                                          {/*<div className="dateSel v1" onClick="openAirMemberAndSeat(this);">*/}
                                          <div className="dateSel v1" onClick={() => openAirMemberAndSeat()}>
                                              <dl>
                                                  <dt>인원</dt>
                                                  <dd className="select">
                                                      <a href="#" id="AIR_F_whereACnt">성인 1명</a>
                                                  </dd>
                                                  <input type="hidden" id="AIR_F_C_1" value="1"/>
                                                      <input type="hidden" id="AIR_F_C_2" value="0"/>
                                                          <input type="hidden" id="AIR_F_C_3" value="0"/>
                                              </dl>
                                              <dl>
                                                  <dt>좌석</dt>
                                                  <dd className="select"><a href="#"
                                                                            id="AIR_F_Seat">일반석</a></dd>
                                                  <input type="hidden" id="AIR_F_S" value="Y"/>
                                              </dl>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="btnArea">
                                  {/*<a href="#none" className="lbtn filled" onClick="openSearchSchedule(this)">항공권 검색</a>*/}
                                  <a href="#none" className="lbtn filled" >항공권 검색</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/*<section className="theme-area v1 vSearch" id="recentSearchArea" style="display: none;">*/}
              {/*<section className="theme-area v1 vSearch" id="recentSearchArea" style={{display: "none"}}>*/}
              <section className="theme-area v1 vSearch" id="recentSearchArea">
                  <h2>최근 검색 이력</h2>
                  <div className="swiper-container mSliderSearch">
                      <div className="swiper-wrapper" id="recentSwiperArea">
                          <div data1="RT" data2="N" data3="인천" data4="ICN" data5="오사카" data6="OSA" data7="20230508"
                               data8="20230510" data9="1" data10="" data11="성인 1명" data12="1" data13="0" data14="0"
                               data15="[{&quot;sn&quot;:null,&quot;startDate&quot;:&quot;20230508&quot;,&quot;endDate&quot;:&quot;20230510&quot;,&quot;travelMulti&quot;:null,&quot;directYn&quot;:null,&quot;cityCdStart&quot;:&quot;ICN&quot;,&quot;cityNmStart&quot;:&quot;인천&quot;,&quot;cityCdEnd&quot;:&quot;OSA&quot;,&quot;cityNmEnd&quot;:&quot;오사카&quot;,&quot;travelList&quot;:null,&quot;count&quot;:null,&quot;cabinClass&quot;:null,&quot;countString&quot;:null,&quot;adtCnt&quot;:0,&quot;chdCnt&quot;:0,&quot;infCnt&quot;:0}]"
                               // onClick="setRecentSearchData(this)" className="swiper-slide">
                               className="swiper-slide">
                              <dl>
                                  <dt>인천 ICN - 오사카 OSA</dt>
                                  <dd><span className="bold">왕복</span> / 23.05.08(월) ~ 23.05.10(수) / 1명 /</dd>
                              </dl>
                              <a className="onway_close"
                                  // onClick="deleteRecentSearch(this)"
                                  onClick={(e) => deleteRecentSearch(e.target)}
                                  data1="20230599f6cd07db624fd987da6bc2ec464428">

                              </a>
                          </div>
                      </div>
                      {/*<div className="swiper-pagination mSlider01-paging"></div>*/}
                  </div>
              </section>
          </div>

          <section className="theme-area">
              <h2>추천 여행지 &amp; 인기숙소</h2>
              <ul>
                  <li>
                      <img
                          src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/spdp/1674799515787.jpg"
                          alt="" // onClick="location.href='/main/s_spdpDetailView.do?spdpSn=512';"
                          // onError="this.src='/smart/images/common/noimg_1n1.png';"/>
                          />
                      <dl>
                          <dt>물놀이 호캉스 숙소</dt>
                          <dd><span>#가족 #연인 #애견</span></dd>
                      </dl>
                  </li>
                  <li>
                      <img
                          src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/spdp/1677485943650.jpg"
                          alt="" // onClick="location.href='/main/s_spdpDetailView.do?spdpSn=496';"
                          // onError="this.src='/smart/images/common/noimg_1n1.png';"/>
                          />
                      <dl>
                          <dt>봄엔 제주도여행</dt>
                          <dd><span>#푸른경치 #맛난음식</span></dd>
                      </dl>
                  </li>
              </ul>
          </section>

          <section className="brn-area">
              {/*<div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">*/}
              {/*    <div className="carousel-inner">*/}
              {/*        <div className="carousel-item active">*/}
              {/*            <img className="d-block w-100"*/}
              {/*                 src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/banner/1680667302452.jpg"*/}
              {/*                 alt="..."/>*/}
              {/*        </div>*/}
              {/*        <div className="carousel-item">*/}
              {/*            <img src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/banner/1660197150881.jpg"*/}
              {/*                 className="d-block w-100"*/}
              {/*                 alt="..."/>*/}
              {/*        </div>*/}
              {/*        <div className="carousel-item">*/}
              {/*            <img src="..." className="d-block w-100" alt="..."/>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}

              <div
                  className="swiper-container mSlider01 swiper-container-initialized swiper-container-horizontal swiper-container-android">
                  <div className="swiper-wrapper" id="swiper-wrapper-10eaf1ed3297515fb" aria-live="off"
                      // style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
                       style={{transform: "translate3d(0px, 0px, 0px)", transitionDuration: "0ms",}}>
                      <div className="swiper-slide BNR_12683 swiper-slide-active" role="group" aria-label="1 / 2"
                           style={{width: "375px",}}>
                          <img
                              src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/banner/1680667302452.jpg"
                              // alt="" onClick="moveSite('/goods/air/s_AirList2.do','_blank');"/>
                              alt="" />
                      </div>
                      <div className="swiper-slide BNR_7285 swiper-slide-next" role="group" aria-label="2 / 2"
                           style={{width: "375px",}}>
                          <img
                              src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/banner/1660197150881.jpg"
                              // alt="" onClick="moveSite('/main/s_spdpDetailView.do?spdpSn=284','_blank');"/>
                              alt="" />
                      </div>
                  </div>
                  <div
                      className="swiper-pagination mSlider01-paging swiper-pagination-clickable swiper-pagination-bullets">
                          <span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabIndex="0"
                                role="button" aria-label="Go to slide 1"></span><span
                      className="swiper-pagination-bullet" tabIndex="0" role="button"
                      aria-label="Go to slide 2"></span></div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
          </section>

          <section className="theme-area v1">
              <h2>제철 대게 본고장🦀, 경북 동해안 여행</h2>
              <div
                  className="swiper-container mSlider02 swiper-container-initialized swiper-container-horizontal swiper-container-android">
                  <div className="swiper-wrapper" id="swiper-wrapper-52f88ea3b081106ae" aria-live="polite"
                       style={{transform: "translate3d(0px, 0px, 0px)",}}>
                      <div className="swiper-slide swiper-slide-active" role="group" aria-label="1 / 11"
                           style={{width: "132.593px", marginRight: "10px"}}>
                          <img
                              src="https://images-cdn.hcclab.com/images/prod/point_admin_was/upload/mdisplay/spdp/1674808751129.png"
                              style={{objectFit: "cover", height: "120px"}} alt=""
                              // onClick="location.href='/main/s_spdpDetailView.do?spdpSn=543';"
                              // onError="this.src='/smart/images/common/noimg_1n1.png';"/>
                              />
                          {/*<div className="item" onClick="location.href='/main/s_spdpDetailView.do?spdpSn=543';">[울진]*/}
                          <div className="item">[울진]
                              산포리 펜션<br/>250,000원 부터~</div>
                      </div>
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
          </section>
      </main>
        <footer id="footer">
            <div className="footerBtm">
                <ul className="footer-menu">
                    <li><a href="/etc/s_TermOfService.do">이용약관</a></li>
                    <li><a href="/etc/s_PrivacyPolicy.do">개인정보처리방침</a></li>
                    <li><a href="/cs/s_CscMain.do">고객센터</a></li>
                </ul>
                <p>Copyright © LACUCARACHA Co., Ltd. All rights reserved.</p>
            </div>

            <div className="top">
                <h2>
                    <a href="/">
                        <img src="./images/common/footer_logo_lacha.png" alt="HCC"/></a>
                </h2>
                {/*<div className="csmr" onClick="scrollBottom()">주식회사 라쿠카라차 사업자 정보</div>*/}
                <div className="csmr">주식회사 라쿠카라차 사업자 정보</div>
            </div>
            <div className="csmrCont">
                <dl>
                    <dt>상호명</dt>
                    <dd>주식회사 라쿠카라차</dd>
                </dl>
                <dl>
                    <dt>대표이사</dt>
                    <dd>이윤상</dd>
                </dl>
                <dl>
                    <dt>주소</dt>
                    <dd>(06197) 서울시 강남구 선릉로 86길 26, 4층</dd>
                </dl>
                <dl>
                    <dt>사업자번호</dt>
                    <dd><p>657-88-00880<span className="line"></span><a
                        href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6578800880" target="_blank">사업자등록정보확인</a></p>
                    </dd>
                </dl>
                <dl>
                    <dt>통신판매업신고번호</dt>
                    <dd>2021-서울강남-01710</dd>
                </dl>
                <dl>
                    <dt>개인정보보호책임자</dt>
                    <dd>유호상</dd>
                </dl>
                <dl>
                    <dt>고객센터</dt>
                    <dd><p>전화 : 02-568-1220<span className="line"></span>팩스 : 02-508-0612</p><p
                        style={{textAlign: "left",}}>메일 : help@hcclab.com</p></dd>
                </dl>

            </div>
            <div id="go-top" className="show"><span className="hdn">top</span></div>
        </footer>

        <iframe id="HappytalkIframe"
                src="https://design.happytalkio.com/button?siteId=4000001875&amp;categoryId=134722&amp;divisionId=134723&amp;siteName=%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC%20%EB%9D%BC%EC%BF%A0%EC%B9%B4%EB%9D%BC%EC%B0%A8&amp;params=&amp;partnerId=&amp;shopId="
                // allowTransparency="true" frameBorder="0" title="채팅상담" tabIndex="0"
                allowtransparency="true" frameBorder="0" title="채팅상담" tabIndex="0"
                style={{margin: "0px", zIndex: 999999999, width: "60px", height: "60px", left: "auto", right: "10px", bottom: "10px", position: "fixed",}}></iframe>

        {/*<div className="foreAirStationArea" style="display: block;">*/}
        {/*<div className="foreAirStationArea" style={{display: "block",}}>*/}
        <div className="foreAirStationArea modal" style={{display: "none",}}>
            <input type="hidden" name="foreInputArea" id="foreInputArea" value="arrivelCity"/>
            <div id="header" className="center">
                <div className="header_top">
                    <a href="#" className="btnPrev foreAirStationArea" onClick={() => closeForeAirStation()}
                       // onClick="closeForeAirStation();" style={{display: "block",}}>이전</a>
                    >이전</a>
                    <h1 className="foreAirStationArea"><span
                        id="foreAirStationHeader">출발지</span> 선택</h1>
                </div>
            </div>
            <div style={{paddingTop: "57px",}}>
                <div className="searchWrap v1">
                    <div className="searchForm">
                        <input type="text" id="searchForeWord" placeholder="도시, 공항명 또는 장소를 검색"
                               // onChange="searchForeCityCode()"/>
                               />
                        <a
                            // href="#" className="btn-closed" onClick="viewChange(true)"><span
                            href="#" className="btn-closed"><span
                            className="hdn">검색</span></a>
                    </div>
                </div>
                <div className="start-p" id="allCity">
                    <div className="whole-city">전체도시</div>
                    <div className="whole-tab">
                        <div className="city-btn" id="tablinkArea">
                            {country.map((item, index)=>
                                // <button className="tablinks" onClick={(event) => openCity(event, item.eng)}>item.kor</button>)}
                                <button className={`tablinks ${index == 0 ? "active" : ""}`} key={index} onClick={() => {}}>{item.kor}</button>)}
                            {/*<button className="tablinks active" onClick="openCity(event,'KOR')">국내</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'JPN')">일본</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'CHI')">홍콩/대만/중국</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'ASIA')">아시아</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'AMCA')">미주</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'EUR')">유럽</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'SOPA')">대양주</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'MID')">중동</button>*/}
                            {/*<button className="tablinks" onClick="openCity(event,'CSAM')">중남미</button>*/}
                        </div>

                        {country.map((item, index)=>
                            <div className="cityTabcontent" id={item.eng} key={index} style={index == 0 ? {display: "block",} : {display: "none",}}>
                                {/*<p className="place"><a href="#" onClick="setForeList(this)"><span className="airport">ICN</span><span className="city">인천</span></a></p>*/}
                                {item.list.map((city, cIndex) =>
                                    <p className="place" key={cIndex}><a href="#"><span className="airport">{city.eng}</span><span className="city">{city.kor}</span></a></p>
                                )}
                            </div>)}
                    {/*    <div className="cityTabcontent" id="KOR" style={{display: "block",}}><p className="place"><a*/}
                    {/*        href="#" onClick="setForeList(this)"><span className="airport">ICN</span><span*/}
                    {/*        className="city">인천</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="JPN" style={{display: "none",}}><p className="place"><a*/}
                    {/*        href="#" onClick="setForeList(this)"><span className="airport">TYO</span><span*/}
                    {/*        className="city">도쿄</span></a></p><p className="place"><a href="#"*/}
                    {/*                                                                  onClick="setForeList(this)"><span*/}
                    {/*        className="airport">OSA</span><span className="city">오사카</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">FUK</span><span className="city">후쿠오카</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SPK</span><span className="city">삿포로</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">OKA</span><span className="city">오키나와</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">NGO</span><span className="city">나고야</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">KMI</span><span className="city">미야자키</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">KOJ</span><span className="city">가고시마</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SDJ</span><span className="city">센다이</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="CHI" style={{display: "none"}}><p className="place"><a*/}
                    {/*        href="#" onClick="setForeList(this)"><span className="airport">PVG</span><span*/}
                    {/*        className="city">상해/푸동</span></a></p><p className="place"><a href="#"*/}
                    {/*                                                                     onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SHA</span><span className="city">상해/홍차오</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">BJS</span><span className="city">북경</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">TAO</span><span className="city">청도</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">HRB</span><span className="city">하얼빈</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">WEH</span><span className="city">위해</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">CAN</span><span className="city">광주</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">HKG</span><span className="city">홍콩</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">TPE</span><span className="city">타이페이</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">MFM</span><span className="city">마카오</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="ASIA" style={{display: "none"}}><p className="place"><a*/}
                    {/*        href="#" onClick="setForeList(this)"><span className="airport">BKK</span><span*/}
                    {/*        className="city">방콕</span></a></p><p className="place"><a href="#"*/}
                    {/*                                                                  onClick="setForeList(this)"><span*/}
                    {/*        className="airport">CEB</span><span className="city">세부</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">DPS</span><span className="city">발리</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">DAD</span><span className="city">다낭</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">HAN</span><span className="city">하노이</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SGN</span><span className="city">호치민</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SIN</span><span className="city">싱가포르</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">BKI</span><span className="city">코타키나발루</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">CXR</span><span className="city">나트랑/캄란</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">KUL</span><span className="city">쿠알라룸푸르</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="AMCA" style={{display: "none"}}><p className="place"><a*/}
                    {/*        href="#" onClick="setForeList(this)"><span className="airport">JFK</span><span*/}
                    {/*        className="city">뉴욕/존에프케네디</span></a></p><p className="place"><a href="#"*/}
                    {/*                                                                         onClick="setForeList(this)"><span*/}
                    {/*        className="airport">LAX</span><span className="city">로스앤젤레스</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SFO</span><span className="city">샌프란시스코</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">HNL</span><span className="city">하와이/호놀룰루</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">YTO</span><span className="city">토론토</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">YVR</span><span className="city">밴쿠버</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SEA</span><span className="city">시애틀</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">CHI</span><span className="city">시카고</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">ATL</span><span className="city">애틀랜타</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">LAS</span><span className="city">라스베가스</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">DFW</span><span className="city">댈러스</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="EUR" style={{display: "none"}}><p className="place"><a*/}
                    {/*        href="#" onClick="setForeList(this)"><span className="airport">PAR</span><span*/}
                    {/*        className="city">파리</span></a></p><p className="place"><a href="#"*/}
                    {/*                                                                  onClick="setForeList(this)"><span*/}
                    {/*        className="airport">LON</span><span className="city">런던</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">ROM</span><span className="city">로마</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">MIL</span><span className="city">밀라노</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">PRG</span><span className="city">프라하</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">IST</span><span className="city">이스탄불</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">BCN</span><span className="city">바르셀로나</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">FRA</span><span className="city">프랑크푸르트</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">VVO</span><span className="city">블라디보스토크</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">ZRH</span><span className="city">취리히</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">AMS</span><span className="city">암스테르담</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="SOPA" style={{display: "none"}}><p className="place"><a*/}
                    {/*        href="#" onClick="setForeList(this)"><span className="airport">SYD</span><span*/}
                    {/*        className="city">시드니</span></a></p><p className="place"><a href="#"*/}
                    {/*                                                                   onClick="setForeList(this)"><span*/}
                    {/*        className="airport">AKL</span><span className="city">오클랜드</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">BNE</span><span className="city">브리즈번</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">MEL</span><span className="city">멜버른</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">GUM</span><span className="city">괌</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">SPN</span><span className="city">사이판</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">ROR</span><span className="city">코로르/팔라우</span></a></p><p*/}
                    {/*        className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">PPT</span><span className="city">타히티</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="MID" style={{display: "none"}}>*/}
                    {/*        <p className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*            className="airport">DXB</span><span className="city">두바이</span></a></p></div>*/}
                    {/*    <div className="cityTabcontent" id="CSAM" style={{display: "none"}}>*/}
                    {/*        <p className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">MEX</span><span className="city">멕시코시티</span></a></p>*/}
                    {/*        <p className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">GRU</span><span className="city">상파울로/과를류스</span></a></p>*/}
                    {/*        <p className="place"><a href="#" onClick="setForeList(this)"><span*/}
                    {/*        className="airport">CUN</span><span className="city">칸쿤</span></a></p></div>*/}
                    </div>
                </div>
                <div className="start-p" id="searchCity">
                    <ul id="searchTarget">
                    </ul>
                </div>
            </div>
        </div>

        {/*<div className="foreAirMemberAndSeatArea" style="display: block;">*/}
        <div className="foreAirMemberAndSeatArea modal" style={{display: "none",}}>
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
                                onClick={(e) => updateCount(e.target, true, 'AIR_F_C_1')}
                            ></button>
                            <span>1</span>
                            <button type="button" className="plus"
                                    // onClick="updateCount(this, false, 'AIR_F_C_1')"
                                    onClick={(e) => updateCount(e.target, false, 'AIR_F_C_1')}
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
                                    onClick={(e) => updateCount(e.target, true, 'AIR_F_C_2')}
                            ></button>
                            <span>0</span>
                            <button type="button" className="plus"
                                    // onClick="updateCount(this, false, 'AIR_F_C_2')"
                                    onClick={(e) => updateCount(e.target, false, 'AIR_F_C_2')}
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
                                    onClick={(e) => updateCount(e.target, true, 'AIR_F_C_3')}
                            ></button>
                            <span>0</span>
                            <button type="button" className="plus"
                                    // onClick="updateCount(this, false, 'AIR_F_C_3')"
                                    onClick={(e) => updateCount(e.target, false, 'AIR_F_C_3')}
                            ></button>
                        </div>
                    </li>
                    <div className="passenger-comment">*만 2세미만 유아의 경우 좌석이 없습니다. 별도 좌석에 탑승하려면 소아로 선택해 주세요</div>
                </ul>

                <div className="passenger-title hr">좌석</div>
                <ul className="seat-btn">
                    {seatTypeList.map((item, index) => {
                        return <li className={index == 0 ? "on select": ""}
                            onClick={(e) => setSeatVal(e.target, item.type)}>
                            <a href="#">{item.kor}</a>
                        </li>
                    })}
                    {/*<li className="on select" data="Y"*/}
                    {/*    // onClick="setSeatVal(this)"*/}
                    {/*    onClick={(e) => setSeatVal(e.target, "Y")}*/}
                    {/*><a href="#">일반석</a></li>*/}
                    {/*<li data="W"*/}
                    {/*    // onClick="setSeatVal(this)"*/}
                    {/*    onClick={(e) => setSeatVal(e.target, "W")}*/}
                    {/*><a href="#">프리미엄 일반석</a></li>*/}
                    {/*<li data="C"*/}
                    {/*    // onClick="setSeatVal(this)"*/}
                    {/*    onClick={(e) => setSeatVal(e.target, "C")}*/}
                    {/*><a href="#">비즈니스석</a></li>*/}
                    {/*<li data="F"*/}
                    {/*    // onClick="setSeatVal(this)"*/}
                    {/*    onClick={(e) => setSeatVal(e.target, "F")}*/}
                    {/*><a href="#">일등석</a></li>*/}
                </ul>

                <div className="btmBtn-fixed">
                    <a href="#none" className="lbtn filled btn-large mgt_30"
                       style={{background: "#4a6cb3", border:"1px solid #4a6cb3"}} onClick={() => closeAirMemberAndSeat()}>확인</a>
                </div>
            </div>
        </div>

        {/*<div className="calendarArea modal" style={{display: "block",}}>*/}
        <div className="calendarArea modal" style={{display: "none",}}>
            <div id="header" className="center">
                <div className="header_top">
                    {/*<a href="#" className="btnPrev calendarArea" onClick="closeCalendar();">이전</a>*/}
                    <a href="#" className="btnPrev calendarArea" onClick={() => closeCalendar()}>이전</a>
                    <h1 className="calendarArea">날짜 선택</h1>
                </div>
            </div>
            <div id="travelDateList" className="quick-option CALENDAR_DBL" style={{paddingTop: "57px"}}>
                <div className="dateSel v2 bg CALENDAR_TP">
                    <dl>
                        <dt id="CAL_START">가는날</dt>
                        <dd className="select"><a href="#" id="CALENDAR_D_DATE">날짜 선택</a></dd>
                    </dl>
                    <dl>
                        <dt id="CAL_END">오늘날</dt>
                        <dd className="select"><a href="#" id="CALENDAR_D_DATE">날짜 선택</a></dd>
                    </dl>
                </div>
            </div>

            <DatePicker
                onChange={onChange}
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
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

            <div className="btmBtn-fixed cal CALENDAR_DBL">
                <a href="#" className="lbtn filled btn-large mgt_30"
                   // style={{background: "#466cc2", border:"1px solid #466cc2"}} onClick="setFromToVal();">선택 완료</a>
                   style={{background: "#466cc2", border:"1px solid #466cc2"}}>선택 완료</a>
            </div>

        </div>

        <div id="_layer" className="alert-box" tabIndex="0"
             style={{display: "none", marginTop: "-68.5px", marginLeft: "-125px",}}>
            <div className="popWrap">
                <div className="alert-cont">성인 1인당, 유아 1인까지 동반 탑승 가능합니다.</div>
                <div className="btnArea mgt_20">
                    <a href="#none" className="lbtn btn-m filled alert-close"
                        style={{background: "#466cc2", border: "1px solid #466cc2"}}>확인</a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
