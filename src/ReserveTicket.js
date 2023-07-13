import {useEffect, useState, useRef} from "react";
import $ from 'jquery';
// import dayjs from "dayjs";
import moment from "dayjs";
import {ko} from "date-fns/esm/locale";
import * as common from './js/common';
import './css/common.css';
import './css/search-content.css';
import './css/ReactRangeSlider.css';
import Footer from "./Footer";

function MyPage() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const controller = new common.controller();

    // <script>
    function returnPage() {
        //localStorage.setItem("data", JSON.stringify(receivedData));
        window.history.back();
    }

    function closePopup(id) {
        $("#header").show();
        $("#content").show();
        $("#footer").show();
        $("#" + id).hide();
    }

    function openFreeBagInfo() {
        $("#header").hide();
        $("#content").hide();
        $("#footer").hide();
        $("#freeBagInfo").show();
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    function time(str) {
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

    function dimmdRemove() {
        $("#dimmd-layer").remove();
    }

    function removeDetailTravelInfo() {
        $("#airTimeLineArea").empty();
        closePopup("travelDetailInformation");
    }

    function msToTime(duration) {
        let minutes = parseInt((duration/(1000*60))%60);
        let hours = parseInt((duration/(1000*60*60))%24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        return hours + minutes;
    }

    const dateReg = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    const korRegex = /^[ㄱ-ㅎ|가-힣]+$/;
    const engRegex = /^[a-z|A-Z]+$/;
    let beforeBirthday = "";
    function checkBirthdayType(str, type) {
        let target = type ? $(".passenger_birth") : $("#birthday");
        if ("" === beforeBirthday) {
            beforeBirthday = str;
        }
        str = String(str);

        const targetElement = type ? document.getElementsByClassName("passenger_birth") : document.getElementById("birthday");
        if (korRegex.test(str) || engRegex.test(str)) {
            target.addClass("err-input");
            target.parent().append('<p class="err"><i class="bgiNone">*</i> 숫자만 입력 가능합니다</p>');
            targetElement.value = '';
        } else {
            target.removeClass("err-input");
            if (target.parent().children().length > 1) {
                target.parent().children()[target.parent().children().length - 1].remove();
            }

            str = str.replace(/-/gi, "");
            if (str.length > 8) {
                str = str.substring(0, 8);
            }

            if (beforeBirthday.length > str.length) {
            } else {
                let convertValue = str;
                if (str.length === 4) {
                    convertValue = str.replace(/(\d{4})/g, '$1');
                } else if (str.length === 6) {
                    convertValue = str.replace(/(\d{4})(\d{2})/g, '$1-$2');
                } else if (str.length === 8) {
                    convertValue = str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                }

                targetElement.value = convertValue;
            }

            beforeBirthday = str;
        }
    }

    function inputDashByCellNumber(cellNumber) {
        const convertNumber = cellNumber.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        const target = document.getElementById("reserv_cell");
        target.value = convertNumber;
    }

    function checkAndConvertEngToUpperCase(element) {
        const eventTarget = element.target;
        const str = eventTarget.value;
        if (engRegex.test(str)) {
            eventTarget.value = str.toUpperCase();
        } else {
            eventTarget.value = "";
        }
    }

    function checkStringValue(element) {
        const id = element.id;
        const type = element.getAttribute("data1") == "true";
        const value = document.getElementById(id).value;
        checkString(value, type, id);
    }

    function checkString(str, type, id) {
        let checkResult;
        if (type) {
            checkResult = korRegex.test(str);
        } else {
            document.getElementById(id).value = str.toUpperCase();
            checkResult = engRegex.test(str);
        }

        let target = $("#" + id);
        let childrenLength = target.parent().children().length;
        if (checkResult || '' === str) {  // 재대로 입력된 경우
            target.removeClass("err-input");
            if (childrenLength > 1) {
                $("#" + id).parent().children()[childrenLength - 1].remove();
            }
        } else {            // 재대로 입력이 안된경우
            target.addClass("err-input");
            if (childrenLength <= 1) {
                if (type) {
                    $("#" + id).parent().append('<p class="err"><i class="bgiNone">*</i> 한글만 입력 가능합니다</p>');
                } else {
                    $("#" + id).parent().append('<p class="err"><i class="bgiNone">*</i> 영문만 입력 가능합니다</p>');
                }
            }
        }
    }

    function allCheckFunction() {
        const isCheck = document.getElementById("check000-all").checked;
        for (var i = 1; i < document.querySelector(".flightNoticeList").childElementCount + 1; i++) {
            const target = document.getElementById("check01" + i + "-a");
            target.checked = isCheck;
        }

        const count = $(".flightNoticeToggle a").length;
        for (var i = 0; i < count; i++) {
            const classNameValue = $(".flightNoticeToggle a")[i].className;
            if ("active" === classNameValue) {
                $(".flightNoticeToggle a")[i].click();
                break;
            }
        }
    }

    function clearTicketRuleAndInfoCheck() {
        for (var i = 1; i < document.querySelector(".flightNoticeList").childElementCount + 1; i++) {
            const target = document.getElementById("check01" + i + "-a");
            target.checked = false;
        }
    }

    function covid19InfoArea() {
        let cityCodeList = "";
        if (localStorage.getItem("airLineCode")) cityCodeList = localStorage.getItem("airLineCode");

        controller.ajaxSend({
            url : "/foreign/reserve/covidInfo.json",
            type : "post",
            dataType : "json",
            data : cityCodeList,
            successCall : function(data) {
                const count = data.covidInfoList.length;
                const brTag = document.createElement("br");
                let checkData;
                let parseData = new Array();
                for (var i = 0; i < count; i++) {
                    checkData = JSON.parse(data.covidInfoList[i].resultData).currentCount;
                    if (checkData > 0) {
                        parseData.push(JSON.parse(data.covidInfoList[i].resultData).data[0]);
                    }
                }
                const btnTarget = document.getElementById("tabBtnArea");
                for (var i = 0; i < parseData.length; i++) {
                    const liEl = document.createElement("li");
                    if (i === 0) liEl.className = "current";

                    const tabId = "tab_covid_" + (i + 1);
                    liEl.dataset.tab = tabId;
                    liEl.setAttribute("onclick", "changeCovidTab(this)")
                    const aEl = document.createElement("a");
                    aEl.innerText = parseData[i].country_nm;
                    liEl.appendChild(aEl);
                    btnTarget.appendChild(liEl);

                    const targetDiv = document.getElementById(tabId);
                    const writeDateDiv = document.createElement("div");
                    writeDateDiv.className = "txtDate mgt_10";
                    {/* writeDateDiv.innerHTML = "작성일 : " + moment(parseData[i].wrt_dt.replaceAll("-", "")).format("YYYY. MM. DD(ddd)"); */}
                    writeDateDiv.innerHTML = "작성일 : " + parseData[i].wrt_dt.replaceAll("-", "");
                    targetDiv.appendChild(writeDateDiv);
                    const requestDiv = document.createElement("div");
                    requestDiv.innerHTML = parseData[i].html_origin_cn;
                    targetDiv.appendChild(requestDiv);

                    // const parseText = parseData.txt_origin_cn.split("○");
                    // const ulEl = document.createElement("el");
                    // ulEl.className = "txtList";
                    // for (var j = 0; j < parseText.length; j++) {
                    //     const liEl = document.createElement("li");
                    //     liEl.innerHTML = parseText[j];
                    //     ulEl.appendChild(liEl);
                    // }
                    // targetDiv.appendChild(ulEl);

                    targetDiv.appendChild(brTag);
                    const openAPIInfo = document.createElement("p");
                    openAPIInfo.className = "f13 gray mgb_20";
                    openAPIInfo.innerHTML = "※ 이 데이터는 외교부가 제공하는 공공데이터에서 가져온 정보입니다.";
                    targetDiv.appendChild(openAPIInfo);
                }

                if (document.getElementById("tabBtnArea").childElementCount === 1) {
                    document.getElementById("tabBtnArea").children[0].className = "on current";
                    document.getElementById("tab_covid_kr").className = "tabcontent current";
                }

                $("#covidArea").show();
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }
    function changeCovidTab(element) {
        const id = element.dataset.tab;
        const parent = element.parentElement;
        for (var i = 0; i < parent.childElementCount; i++) {
            const child = parent.children[i];
            const className = child.className;
            if (className.indexOf("current") !== -1) {
                const tempId = child.dataset.tab;
                if (id !== tempId) {
                    child.className = "";
                    element.className = "current";
                    $("#" + tempId).removeClass("current");
                    $("#" + id).addClass("current");
                    break;
                }
            }
        }
    }

    function openCovidPage() {
        $("#covidArea").show();
    }
    // function reservedMessage() {
    //     let message = '<div class="pop-tit-head txt-c">예약 안내</div>';
    //     message += '1. 탑승객 정보(영문성함, 생년월일, 성별)가 여권과 일치하지 않을 경우 탑승이 거절될 수 있습니다.<br>';
    //     message += '(예약이 완료된 후에는 영문성함변경이 불가하므로 정확하게 입력하여 주시기 바랍니다.)<br><br>';
    //     message += '2. 항공권은 양도가 불가합니다.<br><br>';
    //     message += '3. 중복예약을 하시는 경우 사전 안내 없이 모든 예약이 자동 취소될 수 있습니다.<br>';
    //     message += '(항공사에 따라서는 출발일을 각각 다르게 예약 하였 더라도 중복 예약으로 간주되어 취소 될 수 있습니다.)';
    //     cmnCustromAlertLayer("", message, "확인", openReservedPage);
    // }
        // </script>
        // <script>
    let receivedData;
    let mappingData;
    let fareData;
    let rqInfo;
    let statusInfo;
    let cabinTypeName = "";
    let reservedDiscountType = false;
    const availList = new Array();
    const userBirthDay = "${userInfo.bday}";
    const userGender = "${userInfo.genSctCd}";
    const reservedCellNumber = "${userInfo.cellNo}";
    useEffect(() => {
    // $(document).ready(function () {
        const parser = new DOMParser();
        // moment.lang('ko', {
        //     weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        //     weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"]
        // });

        if (localStorage.getItem('reservedData')) receivedData = JSON.parse(localStorage.getItem('reservedData'));
        if (localStorage.getItem('reservedType')) reservedDiscountType = "true" === localStorage.getItem("reservedType");
        if (localStorage.getItem('statusInfo')) statusInfo = parser.parseFromString(localStorage.getItem('statusInfo'), "text/xml");
        if (localStorage.getItem('mappingData')) mappingData = parser.parseFromString(localStorage.getItem('mappingData'), "text/xml");
        if (localStorage.getItem('fareData')) fareData = parser.parseFromString(localStorage.getItem('fareData'), "text/xml");
        if (localStorage.getItem("rqInfo")) rqInfo = parser.parseFromString(localStorage.getItem('rqInfo'), "text/xml");
        if (localStorage.getItem('availList')) {
            const jsonArray = JSON.parse(localStorage.getItem('availList'));
            for (var i = 0; i < jsonArray.length; i++) {
                availList.push(parser.parseFromString(jsonArray[i], "text/xml"))
            }
        }

        covid19InfoArea();
        inputDashByCellNumber(reservedCellNumber);
        setTravelInfo();
        setTicketInfo();
        setScheduleInfo();
        detailCostInfo();
        setTravelPassengerInfo();
        getCostRule(false);

        $(".passenger_birth").on("propertychange change paste input", function(element) {
            console.log(element);
            checkBirthdayType(element.target.value, true);
        });

        $("#kor_name_last").on("propertychange change paste input", function() {
            checkStringValue(document.getElementById("kor_name_last"));
        });
        $("#kor_name_first").on("propertychange change paste input", function() {
            checkStringValue(document.getElementById("kor_name_first"));
        });
        $("#eng_name_last").on("propertychange change paste input", function() {
            checkStringValue(document.getElementById("eng_name_last"));
        });
        $("#eng_name_first").on("propertychange change paste input", function() {
            checkStringValue(document.getElementById("eng_name_first"));
        });
        $("#birthday").on("propertychange change paste input", function() {
            checkBirthdayType(document.getElementById("birthday").value, false);
        });

        $("#reserv_cell").on("propertychange change paste input", function() {
            inputDashByCellNumber(document.getElementById("reserv_cell").value);
        });

        $(".engInputArea").on("propertychange change paste input", function(element) {
            checkAndConvertEngToUpperCase(element)
        });

        //by hosang
        var len=$('.arr_dtime').length
        var tt1=$('.arr_dtime').eq(0).text().replace(/ [0-9]+:.+/gi,"");
        var tt2=$('.arr_dtime').eq(len-1).text().replace(/.+~/gi,"").replace(/ [0-9]+:.+/gi,"")
        $('#totalTravelDate').text(tt1+"~"+tt2);
    // });
    }, [])

    function setTicketInfo() {
        const travelDateInfo = document.getElementById("totalTravelDate");
        console.log(receivedData);
        let travelDate = moment(receivedData.startDate.replaceAll(".", "")).format("YY.MM.DD(ddd)");
        if ("OW" !== receivedData.travelType) travelDate = travelDate + "~" + moment(receivedData.endDate.replaceAll(".", "")).format("YY.MM.DD(ddd)");
        travelDateInfo.innerHTML = travelDate;
        const travelCountInfo = document.getElementById("totalTravelCount");
        let boarderTotalCount = 0;
        let boarderCountDetail = "(";
        for (var i = 0; i < receivedData.count.length; i++) {
            const countInfo = receivedData.count[i];
            boarderTotalCount += countInfo.count * 1;
            switch (countInfo.ageClass) {
                case 'A' : boarderCountDetail += "성인" + countInfo.count; break;
                case 'C' : boarderCountDetail += "소아" + countInfo.count; break;
                case 'B' : boarderCountDetail += "유아" + countInfo.count; break;
            }

            if (i !== receivedData.count.length - 1) {
                boarderCountDetail += " / ";
            }
        }
        travelCountInfo.appendChild(document.createTextNode(boarderTotalCount + "명"));
        const travelCountDetail = document.createElement("span");
        travelCountDetail.className = "titc";
        travelCountDetail.appendChild(document.createTextNode(boarderCountDetail + ")"));
        travelCountInfo.appendChild(travelCountDetail);
        let cabinType;
        for (var i = 0; i < rqInfo.getElementsByTagName("rqInfo")[0].childElementCount; i++) {
            const element = rqInfo.getElementsByTagName("rqInfo")[0].children[i];
            if (element.getAttribute("key") === 'cabinclass') {
                cabinType = element.innerHTML;
                break;
            }
        }
        switch (cabinType) {
            case 'Y' : cabinTypeName += '일반석'; break;
            case 'W' : cabinTypeName += '프리미엄일반석'; break;
            case 'C' : cabinTypeName += '비즈니스석'; break;
            case 'F' : cabinTypeName += '일등석'; break;
            case 'V' : cabinTypeName += '할인석'; break;
        }
        travelCountInfo.appendChild(document.createTextNode(" / " + cabinTypeName));

    }

    function setTravelInfo() {
        const targetArea = document.getElementById("ticketInfoArea");
        for (var i = 0; i < availList.length; i++) {
            const availInfo = availList[i];
            const arrCnt = availInfo.getElementsByTagName("SEG").length;
            const airSummaryDiv = document.createElement("div");
            airSummaryDiv.className = "airSummary";
            const itineraryDiv = document.createElement("div");
            itineraryDiv.className = "itinerary";
            const airport1 = document.createElement("div");
            airport1.className = "airport";
            const place1P = document.createElement("p");
            place1P.className = "place";
            const tempDeptName = availInfo.getElementsByTagName("DEP_AP_NM")[0].innerHTML;
            place1P.innerHTML = "" === tempDeptName ? availInfo.getElementsByTagName("DEP_NM")[0].innerHTML : tempDeptName;
            airport1.appendChild(place1P);
            const name1P = document.createElement("div");
            name1P.className = "name";
            name1P.innerHTML = availInfo.getElementsByTagName("DEP_CT")[0].innerHTML;
            airport1.appendChild(name1P);
            itineraryDiv.appendChild(airport1);
            const leadTime = document.createElement("div");
            leadTime.className = "leadTime";
            const timePEl = document.createElement("p");
            timePEl.className = "time";
            let flightTime = availInfo.getElementsByTagName("JRNY_YM")[0].innerHTML;
            if (arrCnt > 1) {
                const jrnyArray = new Array();
                const connArray = new Array();
                for (var j = 0; j < arrCnt; j++) {
                    jrnyArray.push(availInfo.getElementsByTagName("JRNY_YM")[j].innerHTML);
                    const conTime = availInfo.getElementsByTagName("CON_TM")[j];
                    if (conTime !== undefined) connArray.push(conTime.innerHTML);
                }

                let jrnyHour = 0, jrnyMin = 0, conHour = 0, conMin = 0;
                for (var j = 0; j < jrnyArray.length; j++) {
                    jrnyHour += (jrnyArray[j].substring(0, 2) * 1);
                    jrnyMin += (jrnyArray[j].substring(2, jrnyArray[j].length) * 1);
                }

                for (var j = 0; j < connArray.length; j++) {
                    conHour += (connArray[j].substring(0, 2) * 1);
                    conMin += (connArray[j].substring(2, connArray[j].length) * 1);
                }

                let calcMin = (jrnyMin + conMin) % 60;
                if (calcMin < 10) calcMin = "0" + calcMin;
                let calcHour = Math.floor((jrnyMin + conMin) / 60);
                if (calcHour > 0) jrnyHour += calcHour;
                flightTime = (jrnyHour + conHour) + "" + calcMin;
                flightTime = flightTime.padStart(4, '0');
            }
            const hourSpanEl = document.createElement("span");
            hourSpanEl.className = "hour";
            hourSpanEl.innerHTML = flightTime.substring(0, 2);
            timePEl.appendChild(hourSpanEl);
            timePEl.appendChild(document.createTextNode("시간 "));
            const minuteValue = flightTime.substring(2, 4);
            const minuteSpanEl = document.createElement("span");
            minuteSpanEl.className = "minute";
            minuteSpanEl.innerHTML = minuteValue;
            timePEl.appendChild(minuteSpanEl);
            timePEl.appendChild(document.createTextNode("분"));
            leadTime.appendChild(timePEl);
            const arrowPEl = document.createElement("p");
            arrowPEl.className = "arrow";
            if (arrCnt > 1) {
                for (var j = 1; j < arrCnt; j++) {
                    const viaSpanEl = document.createElement("span");
                    viaSpanEl.className = "via";
                    arrowPEl.appendChild(viaSpanEl);
                }
            }
            leadTime.appendChild(arrowPEl);
            itineraryDiv.appendChild(leadTime);
            const airport2 = document.createElement("div");
            airport2.className = "airport";
            const place2P = document.createElement("p");
            place2P.className = "place";
            const arrCount = availInfo.getElementsByTagName("ARR_AP_NM").length;
            const tempArrName = availInfo.getElementsByTagName("ARR_AP_NM")[arrCount - 1].innerHTML;
            place2P.innerHTML = "" === tempArrName ? availInfo.getElementsByTagName("ARR_NM")[arrCount - 1].innerHTML : tempArrName;
            airport2.appendChild(place2P);
            const name2P = document.createElement("p");
            name2P.className = "name";
            name2P.innerHTML = availInfo.getElementsByTagName("ARR_CT")[arrCount - 1].innerHTML;
            airport2.appendChild(name2P);
            itineraryDiv.appendChild(airport2);
            airSummaryDiv.appendChild(itineraryDiv);
            targetArea.appendChild(airSummaryDiv);
        }
    }

    function setScheduleInfo() {
        const targetArea = document.getElementById("scheduleArea");
        const travelType = receivedData.travelType;
        const fareBaggingInfo = fareData.getElementsByTagName("FAB");
        for (var i = 0; i < availList.length; i++) {
            const availInfo = availList[i];
            const mainDiv = document.createElement("div");
            mainDiv.className = "timeLine pdb_20";
            mainDiv.id = "mainDiv_" + i;
            const titleSpan = document.createElement("span");
            titleSpan.className = "airTitle mgb_10";
            if ("OW" === travelType || "RT" === travelType) {
                if (i === 1) titleSpan.innerHTML = "오는편";
                else titleSpan.innerHTML = "가는편";
            } else {
                titleSpan.innerHTML = "가는편";
            }
            mainDiv.appendChild(titleSpan);

            const sectionGroupUl = document.createElement("ul");
            sectionGroupUl.className = "sectionGroup";
            const aLi = document.createElement("li");
            aLi.className = "section-a";
            const aLeft = document.createElement("div");
            aLeft.className = "a_left";
            let aLeftString = availInfo.getElementsByTagName("DEP_AP_NM")[0].innerHTML;
            aLeftString += '' === aLeftString ? availInfo.getElementsByTagName("DEP_NM")[0].innerHTML : '';
            aLeftString += "(" + availInfo.getElementsByTagName("DEP_CT")[0].innerHTML + ") - ";
            const arrCount = availInfo.getElementsByTagName("ARR_AP_NM").length;
            const tempArrName = availInfo.getElementsByTagName("ARR_AP_NM")[arrCount - 1].innerHTML;
            aLeftString += '' === tempArrName ? availInfo.getElementsByTagName("ARR_NM")[arrCount - 1].innerHTML : tempArrName;
            aLeftString += "(" + availInfo.getElementsByTagName("ARR_CT")[arrCount - 1].innerHTML + ")";
            aLeft.innerHTML = aLeftString;
            aLi.appendChild(aLeft);
            const aRight = document.createElement("div");
            aRight.className = "a_right";
            const aStopCount = availInfo.getElementsByTagName("STOP_CNT")[0].innerHTML;
            aRight.innerHTML = "경유" + ("0" === aStopCount ? "없음" : aStopCount + "회");
            aLi.appendChild(aRight);
            sectionGroupUl.appendChild(aLi);
            for (var j = 0; j < availInfo.getElementsByTagName("SEG").length; j++) {
                const bLi = document.createElement("li");
                bLi.className = "section-b";
                const bLeft = document.createElement("div");
                bLeft.className = "b_left";
                bLeft.innerHTML = "항공사/항공편명<br>";
                const bSpan = document.createElement("span");
                const airLineNumber = availInfo.getElementsByTagName("FLIGHT_NO")[j].innerHTML;
                bSpan.innerHTML = availInfo.getElementsByTagName("AIR_NM")[j].innerHTML + " " + availInfo.getElementsByTagName("AIR_CD")[j].innerHTML + airLineNumber.padStart(4, '0');
                bLeft.appendChild(bSpan);
                bLi.appendChild(bLeft);
                sectionGroupUl.appendChild(bLi);
                const cLi = document.createElement("li");
                cLi.className = "section-c";
                const cLeft = document.createElement("div");
                cLeft.className = "c_left";
                cLeft.innerHTML = "여정<br>";
                const cSpan = document.createElement("span");
                const deptCityNameTemp = availInfo.getElementsByTagName("DEP_AP_NM")[j].innerHTML;
                const arrCityNameTemp = availInfo.getElementsByTagName("ARR_AP_NM")[j].innerHTML;
                cSpan.innerHTML = ("" === deptCityNameTemp ? availInfo.getElementsByTagName("DEP_NM")[j].innerHTML : deptCityNameTemp) + " - " + ("" === arrCityNameTemp ? availInfo.getElementsByTagName("ARR_NM")[j].innerHTML : arrCityNameTemp);
                cLeft.appendChild(cSpan);
                cLi.appendChild(cLeft);
                const cRight = document.createElement("div");
                cRight.className = "c_right";
                cRight.innerHTML = "좌석<br>";
                const cSpanRight = document.createElement("span");
                cSpanRight.innerHTML = cabinTypeName;
                cRight.appendChild(cSpanRight)
                cLi.appendChild(cRight);
                sectionGroupUl.appendChild(cLi);

                const dLi = document.createElement("li");
                dLi.className = "section-d";
                const dLeft = document.createElement("div");
                dLeft.className = "d_left";
                dLeft.innerHTML = "출발/도착일시<br>";
                const dLeftSpan = document.createElement("span");
                dLeftSpan.className="arr_dtime";
                const deptTime = availInfo.getElementsByTagName("DEP_DT")[j].innerHTML + availInfo.getElementsByTagName("DEP_TM")[j].innerHTML;
                let allTravelTime = moment(moment(deptTime, 'YYYYMMDDHHmm').toDate()).format("YY.MM.DD(ddd) HH:mm");
                const arrTime = availInfo.getElementsByTagName("ARR_DT")[j].innerHTML + availInfo.getElementsByTagName("ARR_TM")[j].innerHTML;
                allTravelTime += "<br> ~ " + moment(moment(arrTime, 'YYYYMMDDHHmm').toDate()).format("YY.MM.DD(ddd) HH:mm");
                dLeftSpan.innerHTML = allTravelTime;
                dLeft.appendChild(dLeftSpan);
                dLi.appendChild(dLeft);
                const dRight = document.createElement("div");
                dRight.className = "d_left";
                dRight.innerHTML = "무료수하물";
                const dTip = document.createElement("a");
                dTip.setAttribute("onclick", "freeBagInfo()");
                dTip.className = "pop-layer question";
                dTip.innerHTML = "툴팁";
                dRight.appendChild(dTip);
                dRight.appendChild(document.createElement("br"));
                const dRightSpan = document.createElement("span");
                dRightSpan.innerHTML = fareBaggingInfo[i].getElementsByTagName("BAG_INFO")[0].innerHTML;
                dRight.appendChild(dRightSpan);
                dLi.appendChild(dRight);
                sectionGroupUl.appendChild(dLi);
            }

            mainDiv.appendChild(sectionGroupUl);
            if (i === 0) {
                targetArea.after(mainDiv);
            } else {
                document.getElementById("mainDiv_" + (i - 1)).after(mainDiv);
            }
        }
    }

    function showDetailTravelInfo() {
        $("#header").hide();
        $("#content").hide();
        $("#footer").hide();
        const travelType = receivedData.travelType;
        const target = document.getElementById("airTimeLineArea");
        for (var i = 0; i < availList.length; i++) {
            let targetXml = availList[i];
            const timeLineDiv = document.createElement("div");
            timeLineDiv.className = "timeLine";

            // 여정 기본정보 입력 시작
            const airTitleSpan = document.createElement("span");
            airTitleSpan.className = "airTitle mgb_10";
            if ("OW" === travelType || "RT" === travelType) {
                if (i === 0) {
                    airTitleSpan.innerText = "가는편";
                } else {
                    airTitleSpan.innerText = "오는편";
                }
            } else {
                airTitleSpan.innerText = "가는편";
            }
            timeLineDiv.appendChild(airTitleSpan);

            const ontheWayDl = document.createElement("dl");
            ontheWayDl.className = "ontheWay";
            const ontheWayDt = document.createElement("dt");
            const segCount = targetXml.getElementsByTagName("SEGS")[0].childElementCount // 경유 횟수
            const startAirName = targetXml.getElementsByTagName("SEG")[0].getElementsByTagName("DEP_NM")[0].innerHTML;
            ontheWayDt.appendChild(document.createTextNode(startAirName));
            const changeSpan = document.createElement("span");
            changeSpan.className = "change";
            ontheWayDt.appendChild(changeSpan);
            const endAirName = " " + targetXml.getElementsByTagName("SEG")[segCount - 1].getElementsByTagName("ARR_NM")[0].innerHTML;
            ontheWayDt.appendChild(document.createTextNode(endAirName));
            ontheWayDl.appendChild(ontheWayDt);

            const travelStartTimeDd = document.createElement("dd");
            const dateInfo = targetXml.getElementsByTagName("SEG")[0].getElementsByTagName("DEP_DT")[0].innerHTML;
            const timeInfo = targetXml.getElementsByTagName("SEG")[0].getElementsByTagName("DEP_TM")[0].innerHTML;
            travelStartTimeDd.innerText = moment(dateInfo).format("YY.MM.DD(ddd)") + " " + time(timeInfo);
            ontheWayDl.appendChild(travelStartTimeDd);

            const segCountDd = document.createElement("dd");
            let travelName;
            if ("OW" === travelType) travelName = "편도";
            else if ("RT" === travelType) travelName = "왕복";
            else travelName = "다구간";
            segCountDd.innerText = travelName + (segCount - 1 === 0 ? "" : " / 경유 " + (segCount - 1) + "회");
            ontheWayDl.appendChild(segCountDd);
            timeLineDiv.appendChild(ontheWayDl);
            // <!-- 여정 기본정보 입력 종료 -->
            // <!-- 여정 정보 입력 시작 -->
            const timeListDiv = document.createElement("div");
            timeListDiv.className = "timeList mgt_30";
            const timeListWrapUl = document.createElement("ul");
            timeListWrapUl.className = "timeList_wrap";
            for (var j = 0; j < segCount; j++) {
                // <!-- 출발/도착지 정보 입력 시작 -->
                const startLi = document.createElement("li");
                const badgeArea = document.createElement("div");
                badgeArea.className = "badgeArea";
                badgeArea.innerText = "출발";
                startLi.appendChild(badgeArea);
                const startDl = document.createElement("dl");
                startDl.className = "ontheWay";
                const startDt = document.createElement("dt");
                const startAprApName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_AP_NM")[0].innerHTML;
                const startAprName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_NM")[0].innerHTML;
                const startAprCode = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_CT")[0].innerHTML;
                startDt.innerText = ("" !== startAprApName ? startAprApName : startAprName) + " " + startAprCode;
                startDl.appendChild(startDt);
                const startTimeDd = document.createElement("dd");
                const startDateInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_DT")[0].innerHTML;
                const startTimeInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("DEP_TM")[0].innerHTML;
                startTimeDd.innerText = moment(startDateInfo).format("YY.MM.DD(ddd)") + " " + time(startTimeInfo);
                startDl.appendChild(startTimeDd);
                const startAirInfoDd = document.createElement("dd");
                const startAirInfoUl = document.createElement("ul");
                startAirInfoUl.className = "detailBox mgt_15";
                const startLi1 = document.createElement("li");
                const startAirLineCode = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("AIR_CD")[0].innerHTML;
                const startAirLineName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("AIR_NM")[0].innerHTML;
                const startAirFlightNo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("FLIGHT_NO")[0].innerHTML;
                startLi1.innerText = startAirLineName + " " + startAirLineCode + startAirFlightNo.padStart(4, '0');
                startAirInfoUl.appendChild(startLi1);
                const startLi2 = document.createElement("li");
                startLi2.innerText = "" !== startAprApName ? startAprApName : startAprName
                startAirInfoUl.appendChild(startLi2);
                const startLi3 = document.createElement("li");
                const freeBag = fareData.getElementsByTagName("FAB")[j].getElementsByTagName("BAG_INFO")[0].innerHTML;
                startLi3.innerText = "무료수하물 " + freeBag;
                startAirInfoUl.appendChild(startLi3);
                const startLi4 = document.createElement("li");
                const flightTimeSpan = document.createElement("span");
                flightTimeSpan.className = "txtTotal";
                const flightTime = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("JRNY_YM")[0].innerHTML;
                const startHour = flightTime.substring(0, 2);
                const startMin = flightTime.substring(2, 4);
                flightTimeSpan.innerText = "총 비행" + startHour.startsWith("0") ? startHour.substring(1, 1) : startHour + "시간 " + startMin.startsWith("0") ? startMin.substring(1, 1) : startMin + "분";
                startLi4.appendChild(flightTimeSpan);
                startAirInfoUl.appendChild(startLi4);
                startAirInfoDd.appendChild(startAirInfoUl);
                startDl.appendChild(startAirInfoDd);
                startLi.appendChild(startDl);
                timeListWrapUl.appendChild(startLi);
                const endLi = document.createElement("li");
                const badgeArr = document.createElement("div");
                badgeArr.className = j !== (segCount - 1) ? "badgeArea arri" : "badgeArea last";
                badgeArr.innerText = "도착";
                endLi.appendChild(badgeArr);
                const endDl = document.createElement("dl");
                endDl.className = "ontheWay";
                const endDt = document.createElement("dt");
                const endAprApName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_AP_NM")[0].innerHTML;
                const endAprName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_NM")[0].innerHTML;
                const endAprCode = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_CT")[0].innerHTML;
                endDt.innerText = ("" !== endAprApName ? endAprApName : endAprName) + " " + endAprCode;
                endDl.appendChild(endDt);
                const endTimeDd = document.createElement("dd");
                const endDateInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_DT")[0].innerHTML;
                const endTimeInfo = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_TM")[0].innerHTML;
                endTimeDd.innerText = moment(endDateInfo).format("YY.MM.DD(ddd)") + " " + time(endTimeInfo);
                endDl.appendChild(endTimeDd);
                const endAirInfoDd = document.createElement("dd");
                const endAirInfoUl = document.createElement("ul");
                endAirInfoUl.className = "detailBox mgt_15";
                const endLi1 = document.createElement("li");
                endLi1.innerText = startAirLineName + " " + startAirLineCode + startAirFlightNo.padStart(4, '0');
                endAirInfoUl.appendChild(endLi1);
                endAirInfoDd.appendChild(endAirInfoUl);
                endDl.appendChild(endAirInfoDd);
                endLi.appendChild(endDl);
                timeListWrapUl.appendChild(endLi);
                // <!-- 출발/도착지 정보 입력 종료 -->
                // <!-- 경유지 정보 입력 시작 -->
                if (j !== (segCount - 1)) {
                    const segLiEl = document.createElement("li");
                    const badgeAreaDiv = document.createElement("div");
                    badgeAreaDiv.className = "badgeArea badge";
                    badgeAreaDiv.innerText = "경유";
                    segLiEl.appendChild(badgeAreaDiv);
                    const badgeDl = document.createElement("dl");
                    badgeDl.className = "ontheWay badge";
                    const badgeDt = document.createElement("dt");
                    const segAprApName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_AP_NM")[0].innerHTML;
                    const segAprName = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("ARR_NM")[0].innerHTML;
                    badgeDt.innerText = "" !== segAprApName ? segAprApName : segAprName;
                    badgeDl.appendChild(badgeDt);
                    const badgeDd = document.createElement("dd");
                    const connectTime = targetXml.getElementsByTagName("SEG")[j].getElementsByTagName("CON_TM")[0].innerHTML;
                    badgeDd.innerText = "00" === connectTime.substring(0, 2) ? "" : connectTime.substring(0, 2) + "시간 " + connectTime.substring(2, 4) + "분 대기";
                    badgeDl.appendChild(badgeDd);
                    segLiEl.appendChild(badgeDl);
                    timeListWrapUl.appendChild(segLiEl);
                }
                // <!-- 경유지 정보 입력 종료 -->
            }
            timeListDiv.appendChild(timeListWrapUl);
            timeLineDiv.appendChild(timeListDiv);
            // <!-- 여정 정보 입력 종료 -->
            target.appendChild(timeLineDiv);
        }

        $("#travelDetailInformation").show();
    }

    function freeBagInfo() {
        let message = '<div class="pop-tit-head txt-c">무료 수하물 기준은 항공사별 무게 및 사이즈가 상이하므로 항공사로 확인바랍니다.</div>';
        message += '(공동운항편, 타항공사 항공편 탑승, STOPOVER 일정 및 항공사 스케줄이 없어서 24시간 이상 중간 체류 하는 경우,<br />';
        message += '특정도시에 따라 무료수하물 규정은 변경 될 수 있으며, 캐리어 가방 외에 기타 수하물 및 반려동물은 결제 전 항공사로 문의해주세요)';
        common.cmnCustromAlertLayer("", message, "확인", dimmdRemove);
    }

    function detailCostInfo() {
        const landingParam = mappingData.getElementsByTagName("MAPPING")[0].getAttribute("LANDINGPARAM");
        const landingData = JSON.parse('{"' + decodeURI(landingParam).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        const targetArea = document.getElementById("detailCostArea");
        const mainDiv = document.createElement("div");
        mainDiv.className = "timeLine pdb_20";
        let totalCost = 0
        let totalDisCost = 0;
        for (var i = 0; i < receivedData.count.length; i++) {
            const titleDiv = document.createElement("div");
            titleDiv.className = "section-eTit mgb_10";
            const countInfo = receivedData.count[i];
            switch (countInfo.ageClass) {
                case 'A' :
                    titleDiv.innerHTML = "성인 " + countInfo.count + "명";
                    mainDiv.appendChild(titleDiv);
                    break;
                case 'C' :
                    mainDiv.appendChild(document.createElement("br"));
                    titleDiv.innerHTML = "소아 " + countInfo.count + "명";
                    mainDiv.appendChild(titleDiv);
                    break;
                case 'B' :
                    mainDiv.appendChild(document.createElement("br"));
                    titleDiv.innerHTML = "유아 " + countInfo.count + "명";
                    mainDiv.appendChild(titleDiv);
                    break;
            }

            const sectionGroupUl = document.createElement("ul");
            sectionGroupUl.className = "sectionGroup detailCost";
            switch (countInfo.ageClass) {
                case 'A' :
                    const count = landingData.adultCount_S;
                    const eLi1 = document.createElement("li");
                    eLi1.className = "section-e";
                    const eLeft1 = document.createElement("span");
                    eLeft1.className = "e_left";
                    eLeft1.innerHTML = "항공운임";
                    eLi1.appendChild(eLeft1);
                    const eRight1 = document.createElement("span");
                    eRight1.className = "e_right";
                    let taxValue = landingData.adtfuel * 1 + landingData.adtqamt * 1 + landingData.adttax * 1;
                    eRight1.innerHTML = comma((landingData.adtamt * 1) - taxValue) + "원";
                    eLi1.appendChild(eRight1);
                    sectionGroupUl.appendChild(eLi1);
                    const eLi2 = document.createElement("li");
                    eLi2.className = "section-e";
                    const eLeft2 = document.createElement("span");
                    eLeft2.className = "e_left";
                    eLeft2.innerHTML = "유류할증료";
                    eLi2.appendChild(eLeft2);
                    const eRight2 = document.createElement("span");
                    eRight2.className = "e_right";
                    eRight2.innerHTML = comma(landingData.adtfuel * 1 + landingData.adtqamt * 1) + "원";
                    eLi2.appendChild(eRight2);
                    sectionGroupUl.appendChild(eLi2);
                    const eLi3 = document.createElement("li");
                    eLi3.className = "section-e";
                    const eLeft3 = document.createElement("span");
                    eLeft3.className = "e_left";
                    eLeft3.innerHTML = "제세공과금";
                    eLi3.appendChild(eLeft3);
                    const eRight3 = document.createElement("span");
                    eRight3.className = "e_right";
                    eRight3.innerHTML = comma(landingData.adttax) + "원";
                    eLi3.appendChild(eRight3);
                    sectionGroupUl.appendChild(eLi3);
                    const eLi4 = document.createElement("li");
                    eLi4.className = "section-e";
                    const eLeft4 = document.createElement("span");
                    eLeft4.className = "e_left";
                    eLeft4.innerHTML = "발권대행료";
                    eLi4.appendChild(eLeft4);
                    const eRight4 = document.createElement("span");
                    eRight4.className = "e_right";
                    eRight4.innerHTML = comma(landingData.adttasf) + "원";
                    eLi4.appendChild(eRight4);
                    sectionGroupUl.appendChild(eLi4);
                    const eLi5 = document.createElement("li");
                    eLi5.className = "section-e";
                    const eLeft5 = document.createElement("span");
                    eLeft5.className = "e_left";
                    eLeft5.innerHTML = "1인 합계";
                    eLi5.appendChild(eLeft5);
                    const eRight5 = document.createElement("span");
                    eRight5.className = "e_right";
                    const adtSingleTotal = (landingData.adtamt * 1) + (landingData.adttasf * 1);
                    eRight5.innerHTML = comma(adtSingleTotal) + "원";
                    eLi5.appendChild(eRight5);
                    sectionGroupUl.appendChild(eLi5);
                    mainDiv.appendChild(sectionGroupUl);
                    totalCost += (adtSingleTotal) * (count * 1);
                    totalDisCost += (adtSingleTotal - (landingData.adtdscntamt * 1)) * (count * 1);
                    break;
                    case 'C' :
                    const count_chd = landingData.childCount_S;
                    const eLi1_chd = document.createElement("li");
                    eLi1_chd.className = "section-e";
                    const eLeft1_chd = document.createElement("span");
                    eLeft1_chd.className = "e_left";
                    eLeft1_chd.innerHTML = "항공운임";
                    eLi1_chd.appendChild(eLeft1_chd);
                    const eRight1_chd = document.createElement("span");
                    eRight1_chd.className = "e_right";
                    let taxValue_chd = landingData.chdfuel * 1 + landingData.chdqamt * 1 + landingData.chdtax * 1;
                    eRight1_chd.innerHTML = comma((landingData.chdamt * 1) - taxValue_chd) + "원";
                    eLi1_chd.appendChild(eRight1_chd);
                    sectionGroupUl.appendChild(eLi1_chd);
                    const eLi2_chd = document.createElement("li");
                    eLi2_chd.className = "section-e";
                    const eLeft2_chd = document.createElement("span");
                    eLeft2_chd.className = "e_left";
                    eLeft2_chd.innerHTML = "유류할증료";
                    eLi2_chd.appendChild(eLeft2_chd);
                    const eRight2_chd = document.createElement("span");
                    eRight2_chd.className = "e_right";
                    eRight2_chd.innerHTML = comma(landingData.chdfuel * 1 + landingData.chdqamt * 1) + "원";
                    eLi2_chd.appendChild(eRight2_chd);
                    sectionGroupUl.appendChild(eLi2_chd);
                    const eLi3_chd = document.createElement("li");
                    eLi3_chd.className = "section-e";
                    const eLeft3_chd = document.createElement("span");
                    eLeft3_chd.className = "e_left";
                    eLeft3_chd.innerHTML = "제세공과금";
                    eLi3_chd.appendChild(eLeft3_chd);
                    const eRight3_chd = document.createElement("span");
                    eRight3_chd.className = "e_right";
                    eRight3_chd.innerHTML = comma(landingData.chdtax) + "원";
                    eLi3_chd.appendChild(eRight3_chd);
                    sectionGroupUl.appendChild(eLi3_chd);
                    const eLi4_chd = document.createElement("li");
                    eLi4_chd.className = "section-e";
                    const eLeft4_chd = document.createElement("span");
                    eLeft4_chd.className = "e_left";
                    eLeft4_chd.innerHTML = "발권대행료";
                    eLi4_chd.appendChild(eLeft4_chd);
                    const eRight4_chd = document.createElement("span");
                    eRight4_chd.className = "e_right";
                    eRight4_chd.innerHTML = comma(landingData.chdtasf) + "원";
                    eLi4_chd.appendChild(eRight4_chd);
                    sectionGroupUl.appendChild(eLi4_chd);
                    const eLi5_chd = document.createElement("li");
                    eLi5_chd.className = "section-e";
                    const eLeft5_chd = document.createElement("span");
                    eLeft5_chd.className = "e_left";
                    eLeft5_chd.innerHTML = "1인 합계";
                    eLi5_chd.appendChild(eLeft5_chd);
                    const eRight5_chd = document.createElement("span");
                    eRight5_chd.className = "e_right";
                    const chdSingleTotal = (landingData.chdamt * 1) + (landingData.chdtasf * 1);
                    eRight5_chd.innerHTML = comma(chdSingleTotal) + "원";
                    eLi5_chd.appendChild(eRight5_chd);
                    sectionGroupUl.appendChild(eLi5_chd);
                    mainDiv.appendChild(sectionGroupUl);
                    totalCost += (chdSingleTotal) * (count_chd * 1);
                    totalDisCost += (chdSingleTotal - (landingData.chdtasf * 1)) * (count_chd * 1);
                    break;
                case 'B' :
                    const count_inf = landingData.infantCount_S;
                    const eLi1_inf = document.createElement("li");
                    eLi1_inf.className = "section-e";
                    const eLeft1_inf = document.createElement("span");
                    eLeft1_inf.className = "e_left";
                    eLeft1_inf.innerHTML = "항공운임";
                    eLi1_inf.appendChild(eLeft1_inf);
                    const eRight1_inf = document.createElement("span");
                    eRight1_inf.className = "e_right";
                    let taxValue_inf = landingData.inffuel * 1 + landingData.infqamt * 1 + landingData.inftax * 1;
                    eRight1_inf.innerHTML = comma((landingData.infamt * 1) - taxValue_inf) + "원";
                    eLi1_inf.appendChild(eRight1_inf);
                    sectionGroupUl.appendChild(eLi1_inf);
                    const eLi2_inf = document.createElement("li");
                    eLi2_inf.className = "section-e";
                    const eLeft2_inf = document.createElement("span");
                    eLeft2_inf.className = "e_left";
                    eLeft2_inf.innerHTML = "유류할증료";
                    eLi2_inf.appendChild(eLeft2_inf);
                    const eRight2_inf = document.createElement("span");
                    eRight2_inf.className = "e_right";
                    eRight2_inf.innerHTML = comma(landingData.inffuel * 1 + landingData.infqamt * 1) + "원";
                    eLi2_inf.appendChild(eRight2_inf);
                    sectionGroupUl.appendChild(eLi2_inf);
                    const eLi3_inf = document.createElement("li");
                    eLi3_inf.className = "section-e";
                    const eLeft3_inf = document.createElement("span");
                    eLeft3_inf.className = "e_left";
                    eLeft3_inf.innerHTML = "제세공과금";
                    eLi3_inf.appendChild(eLeft3_inf);
                    const eRight3_inf = document.createElement("span");
                    eRight3_inf.className = "e_right";
                    eRight3_inf.innerHTML = comma(landingData.inftax) + "원";
                    eLi3_inf.appendChild(eRight3_inf);
                    sectionGroupUl.appendChild(eLi3_inf);
                    const eLi4_inf = document.createElement("li");
                    eLi4_inf.className = "section-e";
                    const eLeft4_inf = document.createElement("span");
                    eLeft4_inf.className = "e_left";
                    eLeft4_inf.innerHTML = "발권대행료";
                    eLi4_inf.appendChild(eLeft4_inf);
                    const eRight4_inf = document.createElement("span");
                    eRight4_inf.className = "e_right";
                    eRight4_inf.innerHTML = comma(landingData.inftasf) + "원";
                    eLi4_inf.appendChild(eRight4_inf);
                    sectionGroupUl.appendChild(eLi4_inf);
                    const eLi5_inf = document.createElement("li");
                    eLi5_inf.className = "section-e";
                    const eLeft5_inf = document.createElement("span");
                    eLeft5_inf.className = "e_left";
                    eLeft5_inf.innerHTML = "1인 합계";
                    eLi5_inf.appendChild(eLeft5_inf);
                    const eRight5_inf = document.createElement("span");
                    eRight5_inf.className = "e_right";
                    const infSingleTotal = (landingData.infamt * 1) + (landingData.inftasf * 1);
                    eRight5_inf.innerHTML = comma(infSingleTotal) + "원";
                    eLi5_inf.appendChild(eRight5_inf);
                    sectionGroupUl.appendChild(eLi5_inf);
                    mainDiv.appendChild(sectionGroupUl);
                    totalCost += (infSingleTotal) * (count_inf * 1);
                    totalDisCost += (infSingleTotal - (landingData.inftasf * 1)) * (count_inf * 1);
                    break;
            }
        }

        const sumText = document.createElement("div");
        sumText.className = "sumTxt";
        sumText.innerHTML = "총 예상 결제 금액<br>";
        const sumSpan = document.createElement("span");
        sumSpan.innerHTML = "(항공운임 + 유류할증료 + 제세공과금 + 발권대행료)";
        sumText.appendChild(sumSpan);
        mainDiv.appendChild(sumText);
        if (reservedDiscountType) { // 특가요금 적용 시 표출데이터
            const sumDisDiv = document.createElement("div");
            sumDisDiv.innerHTML = "SK 포인트 특가";
            sumDisDiv.style.textAlign = "right";
            sumDisDiv.style.borderBottom = "1px solid #d8dbe1";
            sumDisDiv.style.marginTop = "15px";
            sumDisDiv.style.paddingBottom = "10px";
            sumDisDiv.style.fontSize = "13px";
            sumDisDiv.style.color = "#4a6cb3";
            sumDisDiv.appendChild(document.createElement("br"));
            const disCostValue = document.createElement("span");
            disCostValue.style.fontSize = "16px";
            disCostValue.style.color = "#4a6cb3";
            disCostValue.innerHTML = comma(String(totalDisCost)) + "원";
            sumDisDiv.appendChild(disCostValue);
            mainDiv.appendChild(sumDisDiv);
        }

        const sumDiv = document.createElement("div");
        sumDiv.className = "sumNum";
        sumDiv.innerHTML = comma(String(totalCost)) + "원";
        mainDiv.appendChild(sumDiv);
        const textSectionUl = document.createElement("ul");
        textSectionUl.className = "sectionTxt mgt_10 mgb_20";
        const li1 = document.createElement("li");
        li1.innerHTML = "※유류할증료 및 제세공과금은 항공사 사정 및 환율에 따라 변동 가능성이 있으므로, 결제전 정확한 요금을 확인하시기 바랍니다.";
        textSectionUl.appendChild(li1);
        // const li2 = document.createElement("li");
        // li2.innerHTML = "※항공권 청구 할인 적용시 유류할증료, 제세공과금,발권대행료는 제외합니다.";
        // textSectionUl.appendChild(li2);
        // const li3 = document.createElement("li");
        // li3.innerHTML = "※카드별 할인 한도가 상이하므로 자세한 내용 및 이용 조건은 현대카드 홈페이지 참고하시기 바랍니다.";
        // textSectionUl.appendChild(li3);
        // const li4 = document.createElement("li");
        // li4.innerHTML = "※보유카드 전월 실적에 따라 적용 혜택이 달라질 수 있습니다.";
        // textSectionUl.appendChild(li4);
        mainDiv.appendChild(textSectionUl);
        targetArea.after(mainDiv);
    }

    function getCostRule(type) {
        const data = mappingData.getElementsByTagName("MAPPING")[0].getAttribute("RULEPARAM");
        controller.ajaxSend({
            url : "/foreign/reserve/searchCostRule.json",
            type : "post",
            dataType : "json",
            data : data,
            successCall : function(data) {
                let parser = new DOMParser();
                let xmlData = parser.parseFromString(data.costInfo.resultData, "text/xml");
                let isSuccess = xmlData.getElementsByTagName("status")[0].innerHTML;
                if (isSuccess === "FAILURE") {
                    common.cmnAlertLayer("", "조회 중 오류가 발생하였습니다.");
                    $("#searchingDefaultImage").hide();
                    return;
                }

                const dataTabTarget = document.getElementById("ruleList");
                let costInfoList = xmlData.getElementsByTagName("fareRuleTextInfoGrp");
                for (var i = 0; i < costInfoList.length; i++) {
                    const liEl = document.createElement("li");
                    if (i === 0) liEl.className = "current";

                    const tabId = "tab" + (i + 1) + "" + (i + 1);
                    const tabBottomId = "tab_bottom_" + (i + 1);
                    liEl.dataset.tab = tabId;
                    liEl.setAttribute("onclick", "changeCostTab(this)")
                    const aEl = document.createElement("a");
                    aEl.innerText = "요금규정" + (i + 1);
                    liEl.appendChild(aEl);
                    dataTabTarget.appendChild(liEl);

                    const targetDiv = document.getElementById(tabId);
                    const targetBottomDiv = document.getElementById(tabBottomId);
                    const costInfo = costInfoList[i].children;
                    for (var j = 0; j < costInfo.length; j++) {
                        if (j === 0 && !type) {
                            const ruleTitleDiv = document.createElement("div");
                            ruleTitleDiv.className = "feeRule";
                            const dlTitleEl = document.createElement("dl");
                            const dtTitleEl = document.createElement("dt");
                            dtTitleEl.innerHTML = "요금규정" + (i + 1);
                            dlTitleEl.appendChild(dtTitleEl);
                            const ddEl = document.createElement("dd");
                            ddEl.innerHTML = "내용";
                            dlTitleEl.appendChild(ddEl);
                            ruleTitleDiv.appendChild(dlTitleEl);
                            targetBottomDiv.appendChild(ruleTitleDiv);
                        }
                        const singleCostInfo = costInfo[j];
                        if (singleCostInfo.nodeName === "fcartruleyn") continue;
                        const ruleDiv = document.createElement("div");
                        ruleDiv.className = "feeRule";
                        const dlEl = document.createElement("dl");
                        const dtEl = document.createElement("dt");
                        dtEl.innerHTML = singleCostInfo.getElementsByTagName("title")[0].innerHTML;
                        dlEl.appendChild(dtEl);
                        const ddEl = document.createElement("dd");
                        let tempPre = document.getElementById("htmlTempProcess");
                        tempPre.innerHTML = singleCostInfo.getElementsByTagName("content")[0].innerHTML;
                        ddEl.innerHTML = tempPre.innerText;
                        dlEl.appendChild(ddEl);
                        ruleDiv.appendChild(dlEl);
                        if (!type) {
                            targetBottomDiv.appendChild(ruleDiv);
                            $(targetBottomDiv).addClass("current");
                        } else {
                            targetDiv.appendChild(ruleDiv);
                        }
                    }
                }

                if (type) {
                    $("#costDefineInformation").show();
                    $("#searchingDefaultImage").hide();
                }
            },
            error:function(data) {
                $("#searchingDefaultImage").hide();
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function openCostRule() {
        // 요금규정 호출
        $("#header").hide();
        $("#content").hide();
        $("#footer").hide();
        $("#searchingDefaultImage").show();
        getCostRule(true);
    }
    function changeCostTab(element) {
        const id = element.dataset.tab;
        const parent = element.parentElement;
        for (var i = 0; i < parent.childElementCount; i++) {
            const child = parent.children[i];
            const className = child.className;
            if (className === "current") {
                const tempId = child.dataset.tab;
                if (id !== tempId) {
                    child.className = "";
                    element.className = "current";
                    $("#" + tempId).removeClass("current");
                    $("#" + id).addClass("current");
                    break;
                }
            }
        }
    }
    function removeCostRule() {
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

    let isReserved = false;
    function setPassengerInfo() {
        let reservedName;
        let reservedSec;
        let reservedFir;
        let birthDay;
        if (!isReserved) {
            reservedName = document.getElementById("reserv_name").value;
            reservedSec = document.getElementById("reserv_Eng_Sec").value;
            reservedFir = document.getElementById("reserv_Eng_fir").value;
            birthDay = moment(userBirthDay).format("YYYY-MM-DD");
            const index = "M" === userGender ? 0 : 1;
            const genderTypeCount = document.getElementById("passenger_gender_1").childElementCount;
            for (var i = 0; i < genderTypeCount; i++) {
                if (i === index) {
                    document.getElementById("passenger_gender_1").children[i].className = "inpax on";
                } else {
                    document.getElementById("passenger_gender_1").children[i].className = "inpax";
                }
            }
        } else {
            reservedName = "";
            reservedSec = "";
            reservedFir = "";
            birthDay = "";
        }

        document.getElementById("passenger_name_1").value = reservedName;
        document.getElementById("passenger_Eng_Sec_1").value = reservedSec;
        document.getElementById("passenger_Eng_fir_1").value = reservedFir;
        document.getElementById("passenger_birth_1").value = birthDay;
        isReserved = !isReserved;
    }

    function changeGenderType(element) {
        const targetParentId = element.parentElement.id;
        const dataType = element.getAttribute("data1");
        const genderTypeCount = document.getElementById(targetParentId).childElementCount;
        for (var i = 0; i < genderTypeCount; i++) {
            const getData = document.getElementById(targetParentId).children[i].getAttribute("data1");
            if (dataType === getData) {
                document.getElementById(targetParentId).children[i].className = "inpax on";
            } else {
                document.getElementById(targetParentId).children[i].className = "inpax";
            }
        }
    }

    function passengerPopup() {
        let message = '<div class="pop-tit-head txt-c">항공권 결제 시, 본인확인을 위해 필요한 정보입니다.</div>';
        common.cmnCustromAlertLayer("", message, "확인", dimmdRemove);
    }

    function setTravelPassengerInfo() {
        const passengerCount = receivedData.count;
        let cnt = 0;
        for (var i = 0; i < passengerCount.length; i++) {
            const innerCount = passengerCount[i].count;
            const ageClass = passengerCount[i].ageClass;
            for (var j = 0; j < innerCount; j++) {
                const scheduleTitle = document.createElement("div");
                scheduleTitle.className = "schedule-title pdt_20";
                scheduleTitle.id = "schedule_title_" + cnt;
                const schTit = document.createElement("div");
                schTit.className = "sch_tit f13";
                schTit.innerHTML = "탑승자" + (cnt + 1) + " - " + (ageClass === "A" ? "성인" : (ageClass === "C" ? "소아" : "유아"));
                scheduleTitle.appendChild(schTit);
                const schBtn = document.createElement("div");
                schBtn.className = "sch_btn";
                const schA = document.createElement("a");
                const schBtnSpan = document.createElement("span");
                schBtnSpan.className = "airTitle mgb_10";
                schBtnSpan.setAttribute("onclick", "showCompanionList('infoArea_" +cnt + "')");
                schBtnSpan.innerHTML = "선택";
                schA.appendChild(schBtnSpan);
                schBtn.appendChild(schA);
                scheduleTitle.appendChild(schBtn);
                if (cnt === 0) document.getElementById("passengerInfoArea").after(scheduleTitle);
                else document.getElementById("infoArea_" + (cnt - 1)).after(scheduleTitle);

                const infoAreaDiv = document.createElement("div");
                infoAreaDiv.className = "timeLine pdb_20 passenger";
                infoAreaDiv.id = "infoArea_" + cnt;
                const infoFormDiv = document.createElement("div");
                infoFormDiv.className = "info_form";
                const inputArea = document.createElement("dl");
                inputArea.className = "inputArea";
                const dt1 = document.createElement("dt");
                dt1.innerHTML = "한글명";
                const aTip = document.createElement("a");
                aTip.className = "pop-layer question";
                aTip.setAttribute("onclick", "passengerPopup()");
                aTip.innerHTML = "툴팁";
                dt1.appendChild(aTip);
                inputArea.appendChild(dt1);
                const dd1 = document.createElement("dd");
                dd1.setAttribute("data1", ageClass === "A" ? "ADT" : (ageClass === "C" ? "CHD" : "INF"));
                const dd1Input = document.createElement("input");
                dd1Input.type = "text";
                dd1Input.className = "mgt_10";
                dd1Input.id = "passenger_name_" + (cnt + 1);
                dd1Input.placeholder = "홍길동";
                dd1.appendChild(dd1Input);
                inputArea.appendChild(dd1);
                const dt2 = document.createElement("dt");
                dt2.innerHTML = "영문 성";
                inputArea.appendChild(dt2);
                const dd2 = document.createElement("dd");
                const dd2Input = document.createElement("input");
                dd2Input.type = "text";
                dd2Input.className = "mgt_10 engInputArea";
                dd2Input.id = "passenger_Eng_Sec_" + (cnt + 1);
                dd2Input.placeholder = "HONG";
                dd2.appendChild(dd2Input);
                inputArea.appendChild(dd2);
                const dt3 = document.createElement("dt");
                dt3.innerHTML = "영문 이름";
                inputArea.appendChild(dt3);
                const dd3 = document.createElement("dd");
                const dd3Input = document.createElement("input");
                dd3Input.type = "text";
                dd3Input.className = "mgt_10 engInputArea";
                dd3Input.id = "passenger_Eng_fir_" + (cnt + 1);
                dd3Input.placeholder = "GILDONG";
                dd3.appendChild(dd3Input);
                inputArea.appendChild(dd3);
                const dt4 = document.createElement("dt");
                dt4.innerHTML = "생년월일";
                inputArea.appendChild(dt4);
                const dd4 = document.createElement("dd");
                const dd4Input = document.createElement("input");
                dd4Input.type = "text";
                dd4Input.className = "mgt_10 passenger_birth";
                dd4Input.id = "passenger_birth_" + (cnt + 1);
                dd4Input.placeholder = "19960321";
                dd4.appendChild(dd4Input);
                inputArea.appendChild(dd4);
                const dt5 = document.createElement("dt");
                dt5.innerHTML = "성별";
                inputArea.appendChild(dt5);
                const dd5 = document.createElement("dd");
                dd5.id = "passenger_gender_" + (cnt + 1);
                const aMale = document.createElement("a");
                aMale.className = "inpax on";
                aMale.setAttribute("data1", "M");
                aMale.setAttribute("onclick", "changeGenderType(this)");
                aMale.innerHTML = "남성";
                dd5.appendChild(aMale);
                const aFemale = document.createElement("a");
                aFemale.className = "inpax";
                aFemale.setAttribute("data1", "W");
                aFemale.setAttribute("onclick", "changeGenderType(this)");
                aFemale.innerHTML = "여성";
                dd5.appendChild(aFemale);
                inputArea.appendChild(dd5);
                infoFormDiv.appendChild(inputArea);

                if (i === passengerCount.length - 1 && j === innerCount - 1) {
                    const sectionTextUl = document.createElement("ul");
                    sectionTextUl.className = "sectionTxt mgt_10 mgb_20";
                    const li01 = document.createElement("li");
                    li01.className = "cRed";
                    li01.innerHTML = "1. 탑승자의 영문명, 생년월일, 성별은 여권과 반드시 동일해야하며, 오류시 탑승이 거절될 수 있습니다. (여권 정보는 정부 24시에서도 확인 가능)";
                    sectionTextUl.appendChild(li01);
                    const li02 = document.createElement("li");
                    li02.className = "cRed";
                    li02.innerHTML = "2. 결제 후에는 영문명, 생년월일, 성별 수정이 불가하여 재발행 혹은 환불해야하므로 정확히 등록해주시기 바랍니다.";
                    sectionTextUl.appendChild(li02);
                    const li03 = document.createElement("li");
                    li03.className = "cRed";
                    li03.innerHTML = "3. 한글명의 경우, 한국 이름이 없는 경우 영문 전체를 (띄어쓰기 없이) 입력해 주시기 바랍니다.";
                    sectionTextUl.appendChild(li03);
                    const li04 = document.createElement("li");
                    li04.innerHTML = "4. 오입력으로 인한 탑승 거절시, 항공권 재발행 혹은 환불을 진행해야 하며 이에 따른 항공사 및 여행사 수수료가 부과됩니다.";
                    sectionTextUl.appendChild(li04);
                    const li05 = document.createElement("li");
                    li05.innerHTML = "5. 영문이름을 임의등록(FAKE NAME)하는 경우는 수수료가 부과되니 반드시 정확하게 입력해 주시기 바랍니다.";
                    sectionTextUl.appendChild(li05);
                    const li06 = document.createElement("li");
                    li06.innerHTML = "6. 여권 유효기간은 출국일 기준 6개월 이상 남아있어야 출국이 가능합니다.";
                    sectionTextUl.appendChild(li06);
                    const li07 = document.createElement("li");
                    li07.innerHTML = "7. 여권 상 띄어쓰기 및 하이픈(-)표시는 예약 상 기입되지 않으며, 영문철자만 정확히 입력해 주시면 됩니다.";
                    sectionTextUl.appendChild(li07);
                    const li08 = document.createElement("li");
                    li08.innerHTML = "8. 탑승객 구분은 탑승일 나이 기준으로 적용되며, 소아는 만 2세이상 ~ 만 12세 미만, 유아는 출/도착 탑승일 기준 만 24개월 미만입니다.";
                    sectionTextUl.appendChild(li08);
                    const li09 = document.createElement("li");
                    li09.innerHTML = "9. 귀국일 기준으로 유아/소아 기준나이가 넘을시, 추가 차액이 발생하므로 예약 후 1:1문의 게시판을 통해 정확한 문의 부탁드립니다.";
                    sectionTextUl.appendChild(li09);
                    const li10 = document.createElement("li");
                    li10.innerHTML = "10. 소아 및 유아는 보호자가 만 18세 이상이어야 하며, 동반자와 탑승 클래스가 동일해야 합니다.";
                    sectionTextUl.appendChild(li10);
                    const li11 = document.createElement("li");
                    li11.innerHTML = "11. 보호자 없이 혼자 여행하는 만 12세 ~ 17세 미만 청소년의 경우 탑승 항공사에 따라 탑승이 제한되거나, 추가요금이 발생할 수 있으니 1:1문의 게시판을 통해 문의 바랍니다.";
                    sectionTextUl.appendChild(li11);
                    const li12 = document.createElement("li");
                    li12.innerHTML = "* 여권 정보가 다르거나 누락된 경우 또는 분실 신고된 여권, 이미 사용된 단수 여권 정보 등 본인 여권 관련 문제의 경우 항공편 탑승 및 현지 입국이 거절될 수 있으며 이에 대해서 당사는 책임지지 않습니다.";
                    sectionTextUl.appendChild(li12);
                    infoFormDiv.appendChild(sectionTextUl);
                }

                infoAreaDiv.appendChild(infoFormDiv);
                document.getElementById("schedule_title_" + cnt).after(infoAreaDiv);
                cnt++;
            }
        }
    }

    let companionTargetId;
    function showCompanionList(id) {
        companionTargetId = id;
        getCompanionList(true);
    }

    function getCompanionList(type) {
        controller.ajaxSend({
            url : "/foreign/mypage/selectCompanionList.json",
            type : "post",
            dataType : "json",
            successCall : function(data) {
                const count = data.companionCount;
                if (count === 0) {
                    $("#companionListArea_list").hide();
                    $("#companionListArea_none").show();
                } else {
                    $("#companionInfoListArea").empty();
                    const target = document.getElementById("companionInfoListArea");
                    const selectList = data.companionList;
                    const addLi = document.createElement("li");
                    addLi.className = "bb1 pdb_20";
                    const addP = document.createElement("p");
                    addP.className = "cost sch_btn";
                    const aEl = document.createElement("a");
                    aEl.className = "go";
                    aEl.setAttribute("onclick", "newCompanionArea()");
                    aEl.innerHTML = "여행자 등록";
                    addP.appendChild(aEl);
                    addLi.appendChild(addP);
                    target.appendChild(addLi);

                    for (var i = 0; i < count; i++) {
                        const info = selectList[i];
                        const liEl = document.createElement("li");
                        liEl.className = "bb1 pdb_20";
                        const convertObject = Object.entries(info);
                        for (var j = 0; j < convertObject.length; j++) {
                            liEl.setAttribute("data_info_" + (j + 1), convertObject[j][1]);
                        }
                        const krP = document.createElement("p");
                        krP.className = "tit f17 cBlack fb600 mgb_5 clear";
                        krP.innerHTML = info.nameLKor + "/" + info.nameFKor;
                        liEl.appendChild(krP);
                        const enP = document.createElement("p");
                        enP.className = "tit f17 cBlack mgb_5 clear";
                        enP.innerHTML = info.nameLEng + "/" + info.nameFEng;
                        liEl.appendChild(enP);
                        const infoP = document.createElement("p");
                        infoP.className = "tit cBlack clear";
                        const spanInfo = document.createElement("span");
                        spanInfo.className = "dpblk cGray4 mgt_5 verLine";
                        const span1 = document.createElement("span");
                        span1.innerHTML = info.gender;
                        spanInfo.appendChild(span1);
                        const span2 = document.createElement("span");
                        span2.innerHTML = moment(info.birthday).format("YYYY-MM-DD");
                        spanInfo.appendChild(span2);
                        const span3 = document.createElement("span");
                        span3.innerHTML = info.na;
                        spanInfo.appendChild(span3);
                        infoP.appendChild(spanInfo);
                        const ctlSpan = document.createElement("span");
                        ctlSpan.className = "dpblk mgt_10";
                        const a1 = document.createElement("a");
                        a1.className = "graychoice";
                        a1.innerHTML = "수정";
                        a1.setAttribute("onclick", "updateMyCompanion('" + info.sn + "')")
                        ctlSpan.appendChild(a1);
                        const a2 = document.createElement("a");
                        a2.className = "graychoice";
                        a2.innerHTML = "삭제";
                        a2.setAttribute("onclick", "deleteMyCompanion('" + info.sn + "')")
                        ctlSpan.appendChild(a2);
                        infoP.appendChild(ctlSpan);
                        liEl.appendChild(infoP);
                        const selectP = document.createElement("p");
                        selectP.className = "cost";
                        const spanCheck = document.createElement("span");
                        spanCheck.className = "check txtNone";
                        const inputEl = document.createElement("input");
                        inputEl.type = "radio";
                        inputEl.name = "companionGroup";
                        inputEl.id = "check-sd" + i;
                        spanCheck.appendChild(inputEl);
                        const inputLb = document.createElement("label");
                        inputLb.setAttribute("for", "check-sd" + i);
                        inputLb.innerHTML = "선택";
                        spanCheck.appendChild(inputLb);
                        selectP.appendChild(spanCheck);
                        liEl.appendChild(selectP);
                        target.appendChild(liEl);
                    }
                    $("#companionListArea_none").hide();
                    $("#companionListArea_list").show();
                }

                if (type) $("#travelCompanionInformation").show();
            },
            error:function(data) {
                common.cmnAlertLayer('','조회 중 오류가 발생하였습니다.<br>잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function newCompanionArea() {
        $("#footer").hide();
        $("#C4_b").show();
    }

    function putNewCompanion(type) {
        if (type) {
            let checkValue = false;
            let errorMessage = "";
            let korNameLast = document.getElementById("kor_name_last").value;
            if ("" === korNameLast) {
                common.cmnAlertLayer("", "한글 성을 입력하세요.");
                return;
            }
            let korNameFirst = document.getElementById("kor_name_first").value;
            if ("" === korNameFirst) {
                common.cmnAlertLayer("", "한글 이름을 입력하세요.");
                return;
            }
            let engNameLast = document.getElementById("eng_name_last").value;
            if ("" === engNameLast) {
                common.cmnAlertLayer("", "영문 성을 입력하세요.");
                return;
            }
            let engNameFirst = document.getElementById("eng_name_first").value;
            if ("" === engNameFirst) {
                common.cmnAlertLayer("", "영문 이름을 입력하세요.");
                return;
            }
            let birthday = document.getElementById("birthday").value;
            if ("" === birthday) {
                common.cmnAlertLayer("", "생년월일을 입력하세요.");
                return;
            }

            if (!dateReg.test(birthday)) {
                common.cmnAlertLayer("", "입력된 생일정보를 정확하게 입력하여주십시오.<br>생일은 숫자와 하이픈(-)만 가능합니다.<br>예)1996-06-21");
                return;
            }

            let genderType = "";
            var genderList = document.querySelectorAll("#companionInsertArea .inpax");
            for (var i = 0; i < genderList.length; i++) {
                let selectGenderListClass = genderList[i].getAttribute("class");
                if (selectGenderListClass.indexOf("on") != -1) {
                    genderType = genderList[i].getAttribute("data1");
                }
            }

            let nationalName = "";
            let nationalType = document.getElementById("nationalType");
            nationalName = nationalType.options[nationalType.selectedIndex].text;
            let sn = document.getElementById("companionInfo").getAttribute("data1");
            const companionData = {
                "nameFKor":korNameFirst,
                "nameLKor":korNameLast,
                "nameFEng":engNameFirst,
                "nameLEng":engNameLast,
                "birthday":birthday.replace(/-/gi, ""),
                "gender":genderType,
                "na":nationalName,
                "sn":sn
            }

            controller.ajaxSend({
                url : "/foreign/mypage/postNewCompanion.json"
                ,type : "post"
                ,dataType : "json"
                ,data : companionData
                ,successCall : function(data) {
                    let isSuccess = data.isSuccess;
                    if (isSuccess != true) {
                        common.cmnAlertLayer('','저장 중 오류가 발생하였습니다.<br>잠시후에 다시 시도해 주십시요.');
                        return;
                    }

                    getCompanionList(true);
                    $("#footer").show();
                    $("#C4_b").hide();
                    clearCompanionInfoArea();
                }
                , error:function(data) {
                    common.cmnAlertLayer('','저장 중 오류가 발생하였습니다.<br>잠시후에 다시 시도해 주십시요.');
                    return;
                }
            });
        } else {
            $("#footer").show();
            $("#C4_b").hide();
        }
    }

    let genderType = "";
    function updateMyCompanion(snValue) {
        let data = {"sn":snValue};
        controller.ajaxSend({
            url : "/foreign/mypage/getCompanion.json"
            ,type : "post"
            ,dataType : "json"
            ,data : data
            ,successCall : function(data) {
                let isSuccess = data.isSuccess;
                if (isSuccess != true) {
                    common.cmnAlertLayer('','조회 중 오류가 발생하였습니다.<br>잠시후에 다시 시도해 주십시요.');
                    return;
                }

                let companion = data.companion;
                document.getElementById("companionInfo").setAttribute("data1", companion.sn);
                document.getElementById("kor_name_last").value = companion.nameLKor;
                document.getElementById("kor_name_first").value = companion.nameFKor;
                document.getElementById("eng_name_last").value = companion.nameLEng;
                document.getElementById("eng_name_first").value = companion.nameFEng;
                document.getElementById("birthday").value = companion.birthday.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');

                var genderList = document.querySelectorAll(".inpax");
                for (let i = 0; i < genderList.length; i++) {
                    let selectGenderListClass = genderList[i].getAttribute("class");
                    if (genderList[i].getAttribute("data1") === companion.gender) {
                        $("#" + genderList[i].id).addClass("on");
                    } else {
                        $("#" + genderList[i].id).removeClass("on");
                    }
                    if (selectGenderListClass.indexOf("on") != -1) {
                        genderType = genderList[i].getAttribute("data1");
                    }
                }

                let selectBox = document.getElementById("nationalType");
                for (let i = 0; i < selectBox.options.length; i++) {
                    if(selectBox.options[i].value == companion.na){
                        selectBox.options[i].selected = true;
                        break;
                    }
                }

                $("#footer").hide();
                $("#C4_b").show();
            }
            , error:function(data) {
                common.cmnAlertLayer('','조회 중 오류가 발생하였습니다.<br>잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function deleteMyCompanion(snValue) {
        let data = {"sn":snValue};
        controller.ajaxSend({
            url : "/foreign/mypage/deleteCompanion.json"
            ,type : "post"
            ,dataType : "json"
            ,data : data
            ,successCall : function(data) {
                let isSuccess = data.isSuccess;
                if (isSuccess != true) {
                    common.cmnAlertLayer('','삭제 중 오류가 발생하였습니다.<br>잠시후에 다시 시도해 주십시요.');
                    return;
                }

                getCompanionList(true);
            }
            , error:function(data) {
                common.cmnAlertLayer('','삭제 중 오류가 발생하였습니다.<br>잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function clearCompanionInfoArea() {
        document.getElementById("kor_name_last").value = '';
        document.getElementById("kor_name_first").value = '';
        document.getElementById("eng_name_last").value = '';
        document.getElementById("eng_name_first").value = '';
        document.getElementById("birthday").value = '';
        var genderList = document.querySelectorAll("#companionInsertArea .inpax");
        for (let i = 0; i < genderList.length; i++) {
            if (i === 0) {
                genderList[i].className = "inpax on";
            } else {
                genderList[i].className = "inpax";
            }
        }
    }

    function closeCompanionList() {
        getCompanionList(false);
        closePopup("travelCompanionInformation");
    }

    function selectPassenger() {
        const checkTarget = $("input[type=radio][name=companionGroup]:checked");
        if (checkTarget.length === 0) {
            common.cmnAlertLayer("", "여행자를 선택해 주세요.");
            return;
        }

        const selectPassenger = checkTarget.parent().parent().parent();
        const targetIndex = (companionTargetId.split("_")[1] * 1) + 1;
        document.getElementById("passenger_name_" + targetIndex).value = selectPassenger.attr("data_info_4") + selectPassenger.attr("data_info_3");
        document.getElementById("passenger_Eng_Sec_" + targetIndex).value = selectPassenger.attr("data_info_6");
        document.getElementById("passenger_Eng_fir_" + targetIndex).value = selectPassenger.attr("data_info_5");
        document.getElementById("passenger_birth_" + targetIndex).value = moment(selectPassenger.attr("data_info_7")).format("YYYY-MM-DD");
        if ("남" === selectPassenger.attr("data_info_9")) {
            document.getElementById("passenger_gender_" + targetIndex).children[0].className = "inpax on";
            document.getElementById("passenger_gender_" + targetIndex).children[1].className = "inpax";
        } else {
            document.getElementById("passenger_gender_" + targetIndex).children[1].className = "inpax on";
            document.getElementById("passenger_gender_" + targetIndex).children[0].className = "inpax";
        }

        $("#travelCompanionInformation").hide();
        clearCompanionInfoArea();
    }
    //     </script>
    // <script>
    function reservedStart() {
        $("#searchingImage").show();
        var fmOption = {
            "method" : "post",
            "target" : "_self",
            "action" : "/foreign/reserve/s_ReservedComplete.do"
        };

        const costDetailArray = document.querySelectorAll(".detailCost");
        let airAdtCostDtl = '', airChdCostDtl = '', airBabyCostDtl = '';
        for (var i = 0; i < costDetailArray.length; i++) {
            const targetList = costDetailArray[i].getElementsByClassName("section-e");
            let tempString = '';
            for (var j = 0; j < targetList.length; j++) {
                const target = targetList[j].getElementsByClassName("e_right")[0].innerHTML;
                tempString = tempString + target.replaceAll(",", "").replace("원", "");
                if (j !== targetList.length - 1) {
                    tempString = tempString + ";";
                }
            }

            switch (i) {
                case 0 : airAdtCostDtl = tempString; break;
                case 1 : airChdCostDtl = tempString; break;
                case 2 : airBabyCostDtl = tempString; break;
            }
        }

        const passengerInfoList = document.querySelectorAll(".passenger .info_form");
        const passengerInfoArray = [];
        for (var i = 0; i < passengerInfoList.length; i++) {
            const ddList = passengerInfoList[i].getElementsByTagName("dd");
            const object = {
                "name":ddList[0].childNodes[0].value,
                "engLast":ddList[1].childNodes[0].value,
                "engFirst":ddList[2].childNodes[0].value,
                "birth":ddList[3].childNodes[0].value,
                "gender":ddList[4].querySelector(".on").getAttribute("data1") === 'M' ? 'true' : 'false',
                "type":ddList[0].getAttribute("data1"),
                "fare":"ADT" === ddList[0].getAttribute("data1") ? airAdtCostDtl.split(";")[0] : "CHD" === ddList[0].getAttribute("data1") ? airChdCostDtl.split(";")[0] : airBabyCostDtl.split(";")[0],
                "fuel":"ADT" === ddList[0].getAttribute("data1") ? airAdtCostDtl.split(";")[1] : "CHD" === ddList[0].getAttribute("data1") ? airChdCostDtl.split(";")[1] : airBabyCostDtl.split(";")[1],
                "tax":"ADT" === ddList[0].getAttribute("data1") ? airAdtCostDtl.split(";")[2] : "CHD" === ddList[0].getAttribute("data1") ? airChdCostDtl.split(";")[2] : airBabyCostDtl.split(";")[2],
                "tasf":"ADT" === ddList[0].getAttribute("data1") ? airAdtCostDtl.split(";")[3] : "CHD" === ddList[0].getAttribute("data1") ? airChdCostDtl.split(";")[3] : airBabyCostDtl.split(";")[3],
                "amount":"ADT" === ddList[0].getAttribute("data1") ? airAdtCostDtl.split(";")[4] : "CHD" === ddList[0].getAttribute("data1") ? airChdCostDtl.split(";")[4] : airBabyCostDtl.split(";")[4]
            }

            passengerInfoArray[i] = object;
        }

        const availInfoString = [];
        let count = 0;
        for (var i = 0; i < availList.length; i++) {
            const availObj = availList[i];
            const arrCnt = availObj.getElementsByTagName("SEG").length;
            for (var j = 0; j < arrCnt; j++) {
                const flightNumber = availObj.getElementsByTagName("FLIGHT_NO")[j].innerHTML;
                const airCd = availObj.getElementsByTagName("AIR_CD")[j].innerHTML;
                const deptTime = availObj.getElementsByTagName("DEP_DT")[j].innerHTML + availObj.getElementsByTagName("DEP_TM")[j].innerHTML;
                const arrvTime = availObj.getElementsByTagName("ARR_DT")[j].innerHTML + availObj.getElementsByTagName("ARR_TM")[j].innerHTML;
                const timeTarget = document.querySelectorAll(".time")[i];
                const flightTime = timeTarget.getElementsByClassName("hour")[0].innerHTML + ":" + timeTarget.getElementsByClassName("minute")[0].innerHTML;
                const deptName = availObj.getElementsByTagName("DEP_AP_NM")[j].innerHTML;
                const arrvName = availObj.getElementsByTagName("ARR_AP_NM")[j].innerHTML;
                const freebag = fareData.getElementsByTagName("BAG_INFO")[count].innerHTML;
                const delayTimeObj = availObj.getElementsByTagName("CON_TM")[j - 1];
                const delayTime = delayTimeObj === undefined ? "" : delayTimeObj.innerHTML.substring(0, 2) + ":" + delayTimeObj.innerHTML.substring(2, 4);
                const availObject = {
                    "dprtInfo":deptName === '' ? availObj.getElementsByTagName("DEP_NM")[j].innerHTML : deptName,
                    "dprtTime":moment(moment(deptTime, 'YYYYMMDDHHmm').toDate()).format("YYYY-MM-DD HH:mm:ss"),
                    "dprtCode":availObj.getElementsByTagName("DEP_CT")[j].innerHTML,
                    "arrvTime":moment(moment(arrvTime, 'YYYYMMDDHHmm').toDate()).format("YYYY-MM-DD HH:mm:ss"),
                    "arrvInfo":arrvName === '' ? availObj.getElementsByTagName("ARR_NM")[j].innerHTML : arrvName,
                    "arrvCode":availObj.getElementsByTagName("ARR_CT")[j].innerHTML,
                    "aircoNm":availObj.getElementsByTagName("AIR_NM")[j].innerHTML,
                    "aircoCd":airCd,
                    "waypointCount":(arrCnt - 1) + "",
                    "flightTime":flightTime,
                    "airplaneTnm":airCd + flightNumber.padStart("0", 4),
                    "airFreeBag":freebag,
                    "in":availObj.getElementsByTagName("IN")[0].innerHTML,
                    "airDelayTime":delayTime
                }

                const codeShare = availObj.getElementsByTagName("CD_SHARE_YN")[0].innerHTML;
                const codeShareAirLine = availObj.getElementsByTagName("CODE_SHARE_NM")[j].innerHTML;
                const codeShareAirLineCode = availObj.getElementsByTagName("CODE_SHARE")[j].innerHTML;
                const codeShareAirLineNumber = availObj.getElementsByTagName("FLIGHT_NO")[j].innerHTML;
                if ("Y" === codeShare && '' !== codeShareAirLine && '' !== codeShareAirLineCode) {
                availObject.codeshare = codeShare;
                availObject.codeshareAirline = codeShareAirLine;
                availObject.codeshareAirlineCode = codeShareAirLineCode;
                availObject.codeshareAirlineNumber = codeShareAirLineNumber;
            }

                availInfoString[count] = availObject;
                count++;
            }
        }

        let adtCnt = 0, chdCnt = 0, babyCnt = 0;
        for (var i = 0; i < receivedData.count.length; i++) {
            const countInfo = receivedData.count[i];
            switch (countInfo.ageClass) {
                case 'A' : adtCnt = countInfo.count; break;
                case 'C' : chdCnt = countInfo.count; break;
                case 'B' : babyCnt = countInfo.count; break;
            }
        }

        let cabinType = "", cabinTypeName = "";
        for (var i = 0; i < rqInfo.getElementsByTagName("rqInfo")[0].childElementCount; i++) {
            const element = rqInfo.getElementsByTagName("rqInfo")[0].children[i];
            if (element.getAttribute("key") === 'cabinclass') {
                cabinType = element.innerHTML;
                break;
            }
        }

        switch (cabinType) {
            case 'Y' : cabinTypeName = '일반석'; break;
            case 'W' : cabinTypeName = '프리미엄일반석'; break;
            case 'C' : cabinTypeName = '비즈니스석'; break;
            case 'F' : cabinTypeName = '일등석'; break;
            case 'V' : cabinTypeName = '할인석'; break;
        }

        var reservedData = {
            "queryString" : mappingData.getElementsByTagName("MAPPING")[0].getAttribute("LANDINGPARAM"),
            "korName":document.getElementById("reserv_name").value,
            "engFirst":document.getElementById("reserv_Eng_fir").value,
            "engLast":document.getElementById("reserv_Eng_Sec").value,
            "cellPhone":document.getElementById("reserv_cell").value,
            "email":document.getElementById("reserv_email").value,
            "gender":userGender,
            "adtCnt":adtCnt,
            "chdCnt":chdCnt,
            "babyCnt":babyCnt,
            "seatType":cabinTypeName,
            "cabinName":cabinTypeName,
            "availInfoString":JSON.stringify(availInfoString),
            "passengerInfoString":JSON.stringify(passengerInfoArray),
            "ruleParam":localStorage.getItem("ruleParam"),
            "cookieValue":localStorage.getItem("cookieValue"),
            "travelType":receivedData.travelType
        }

        $("#reservedProcessImage").show();
        controller.ajaxSend({
            url : "/foreign/reserve/requestReserved.json"
            ,type : "post"
            ,dataType : "json"
            ,data : reservedData
            ,successCall : function(data) {
                $("#reservedProcessImage").hide();
                if (data.isSuccess) {
                    const keyData = {
                        "ordNo": data.key
                    }

                    localStorage.removeItem("cookieValue");
                    controller.createForm(fmOption);
                    controller.setSerializedFormData(keyData);
                    controller.formSubmit();
                } else {
                    common.cmnAlertLayer('','예약에 실패하였습니다. 잠시후에 다시 시도해 주십시오.');
                    return;
                }
            }
            , error:function(data) {
                $("#reservedProcessImage").hide();
                common.cmnAlertLayer('','예약에 실패하였습니다. 잠시후에 다시 시도해 주십시오.');
                return;
            }
        });
    }

    function checkVisaInfo() {
        let visitCountry = "";
        for (var i = 0; i < availList.length; i++) {
            const availData = availList[i];
            const segCount = availData.getElementsByTagName("SEG").length;
            for (var j = 0; j < segCount; j++) {
                const segData = availData.getElementsByTagName("SEG")[j];
                const code = segData.getElementsByTagName("ARR_CT")[0].innerHTML;
                visitCountry += code;
                visitCountry += ";"
            }
        }

        controller.ajaxSend({
            url : "/foreign/reserve/visaInfo.json"
            ,type : "post"
            ,dataType : "json"
            ,data : visitCountry
            ,successCall : function(data) {
                const count = data.visaInfo.length;
                const visaInfoList = data.visaInfo;
                const brTag = document.createElement("br");
                const appendTarget = document.getElementById("visaInfo");
                if (count > 0) {
                    let checkVisa = false;
                    for (var i = 0; i < count; i++) {
                        const info = visaInfoList[i].visaInfo;
                        const p = document.createElement("p");
                        p.innerHTML = info;
                        appendTarget.appendChild(p);
                    }

                    $("#codeShareInfo").hide();
                    $("#checkVisaInfo").show();
                } else {
                    beforeReservationInfo();
                }

            }
            , error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                $("#beforeReservationInfo").hide();
                return;
            }
        });
    }

    function beforeReservationInfo() {
        $("#checkVisaInfo").hide();
        $("#beforeReservationInfo").show();
    }

    let checkMessage = "";
    function checkInsertValue() {
        if ("" === document.getElementById("reserv_Eng_Sec").value) {
            document.getElementById("reserv_Eng_Sec").focus();
            checkMessage = "예약자 영문 성을 입력해주세요.";
            return true;
        }

        if ("" === document.getElementById("reserv_Eng_fir").value) {
            document.getElementById("reserv_Eng_fir").focus();
            checkMessage = "예약자 영문 이름을 입력해주세요.";
            return true;
        }

        if ("" === document.getElementById("reserv_cell").value) {
            document.getElementById("reserv_cell").focus();
            checkMessage = "휴대폰 번호를 입력해주세요.";
            return true;
        }

        if ("" === document.getElementById("reserv_email").value) {
            document.getElementById("reserv_email").focus();
            checkMessage = "이메일을 입력해주세요.";
            return true;
        }

        const checkList = document.querySelectorAll(".passenger");
        for (var i = 0; i < checkList.length; i++) {
            if ("" === document.getElementById("passenger_name_" + (i + 1)).value) {
                document.getElementById("passenger_name_" + (i + 1)).focus();
                checkMessage = "한글명을 입력해주세요";
                return true;
            }

            if ("" === document.getElementById("passenger_Eng_Sec_" + (i + 1)).value) {
                document.getElementById("passenger_Eng_Sec_" + (i + 1)).focus();
                checkMessage = "영문 성을 입력해주세요";
                return true;
            }

            if ("" === document.getElementById("passenger_Eng_fir_" + (i + 1)).value) {
                document.getElementById("passenger_Eng_fir_" + (i + 1)).focus();
                checkMessage = "영문 이름을 입력해주세요";
                return true;
            }

            if ("" === document.getElementById("passenger_birth_" + (i + 1)).value) {
                document.getElementById("passenger_birth_" + (i + 1)).focus();
                checkMessage = "생년월일을 바르게 입력하세요.";
                return true;
            }
        }

        return false;
    }

    function showCodeShareInfo() {
        if (checkInsertValue()) {
            common.cmnAlertLayer('btn1', checkMessage);
            return;
        }
        for (var i = 1; i < document.querySelector(".flightNoticeList").childElementCount + 1; i++) {
            const target = document.getElementById("check01" + i + "-a");
            if (!target.checked) {
                common.cmnAlertLayer('btn1','항공권 규정 및 유의사항을 읽고 체크하여주시기 바랍니다.');
                return;
            }
        }

        let isCodeShare = false;
        for (var i = 0; i < availList.length; i++) {
            const codeShareValue = availList[i].getElementsByTagName("CD_SHARE_YN")[0].innerHTML;
            isCodeShare = "Y" === codeShareValue;
            if (isCodeShare) break;
        }
        if (isCodeShare) $("#codeShareInfo").show();
        else checkVisaInfo();
    }

    $(function(){
        const $noticeToggle = $('.flightNoticeToggle a');
        $noticeToggle.on('click', function(e){
            let $noticeCont = $(this).closest('li').find('.flightNoticeCont');
            $(this).toggleClass('active');
            $noticeCont.toggleClass('active');
            e.preventDefault();
        });

        var offsetFoot = $('#footer').outerHeight() + 100;
        var winHeight = $('#content').height() - 680;
        var calc_positon = winHeight - offsetFoot;
        $(window).scroll(function() {
            if ( $(window).scrollTop() < calc_positon) {
                $('.moveBtn .btn-reserve').removeClass('move');
            } else {
                $('.moveBtn .btn-reserve').addClass('move');
            }
        });

        $(".flightNoticeToggle a")[0].click();
        $("#check011-a").change(function(){
        if ($("#check011-a").is(":checked")){
            $(".flightNoticeToggle a")[0].click();
            if (!$("#check012-a").is(":checked")) $(".flightNoticeToggle a")[1].click();
        } else {
            const count = $(".flightNoticeToggle a").length;
            for (var i = 0; i < count; i++) {
                const classNameValue = $(".flightNoticeToggle a")[i].className;
                if ("active" === classNameValue) {
                    $(".flightNoticeToggle a")[i].click();
                    break;
                }
            }

            $("#check011-a").closest('li').find('a').addClass('active');
            $("#check011-a").closest('li').find('.flightNoticeCont').toggleClass('active');
        }
    });
    $("#check012-a").change(function(){
        if ($("#check012-a").is(":checked")){
            $(".flightNoticeToggle a")[1].click();
            if (!$("#check013-a").is(":checked")) $(".flightNoticeToggle a")[2].click();
        } else {
            const count = $(".flightNoticeToggle a").length;
            for (var i = 0; i < count; i++) {
                const classNameValue = $(".flightNoticeToggle a")[i].className;
                if ("active" === classNameValue) {
                    $(".flightNoticeToggle a")[i].click();
                    break;
                }
            }

            $("#check012-a").closest('li').find('a').addClass('active');
            $("#check012-a").closest('li').find('.flightNoticeCont').toggleClass('active');
        }
    });
    $("#check013-a").change(function(){
        if ($("#check013-a").is(":checked")){
            $(".flightNoticeToggle a")[2].click();
            if (!$("#check014-a").is(":checked")) $(".flightNoticeToggle a")[3].click();
        } else {
            const count = $(".flightNoticeToggle a").length;
            for (var i = 0; i < count; i++) {
                const classNameValue = $(".flightNoticeToggle a")[i].className;
                if ("active" === classNameValue) {
                    $(".flightNoticeToggle a")[i].click();
                    break;
                }
            }

            $("#check013-a").closest('li').find('a').addClass('active');
            $("#check013-a").closest('li').find('.flightNoticeCont').toggleClass('active');
        }
    });
});
    // </script>

    return (
        <>
            {/*<div id="header" className="center"></div>*/}
            
            {/*<div className="loadWrap-new" id="searchingDefaultImage" style={{display: none;">*/}
            {/*    <div className="loader2">*/}
            {/*    </div>*/}
            {/*</div>*/}
            
            <div id="header" className="center">
                <div className="header_top">
                    <a className="btnPrev"
                       // onClick="returnPage()"
                       onClick={() => returnPage()}
                    >이전</a>
                    <h1>예약</h1>
                </div>
            </div>
            
            <div id="content">
                <div className="boxCont msgBox">
                    <div className="schedule-title pdt_0">
                        <div className="sch_tit">선택된 항공권 정보</div>
                    </div>
                    <div className="timeLine pdb_20 mgt_20">
                        <div className="ticketWrap pd_a0 airInfo">
                            <div className="ticket_new">
                                <div className="ticketInner">
                                    <div className="ticketInfo" id="ticketInfoArea">
                                        {/*<div className="airSummary">*/}
                                        {/*    <div className="itinerary">*/}
                                        {/*        <div className="airport">*/}
                                        {/*            <p className="place">인천</p>*/}
                                        {/*            <div className="name">ICN</div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="leadTime">*/}
                                        {/*            <p className="time"><span className="hour">09</span>시간 <span className="minute">00</span>분</p>*/}
                                        {/*            <p className="arrow"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="airport">*/}
                                        {/*            <p className="place">하와이/호놀룰루</p>*/}
                                        {/*            <p className="name">HNL</p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="airSummary">*/}
                                        {/*    <div className="itinerary">*/}
                                        {/*        <div className="airport">*/}
                                        {/*            <p className="place">하와이/호놀룰루</p>*/}
                                        {/*            <div className="name">HNL</div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="leadTime">*/}
                                        {/*            <p className="time"><span className="hour">09</span>시간 <span className="minute">50</span>분</p>*/}
                                        {/*            <p className="arrow"></p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="airport">*/}
                                        {/*            <p className="place">인천</p>*/}
                                        {/*            <p className="name">ICN</p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="define">
                                        <div className="price titWrap airWrap">
                                            <div className="airDetail">
                                                <p className="tit">총 일정</p>
                                                {/*<p className="detail" id="totalTravelDate">23.07.02(일)~ 23.07.08(토)</p>*/}
                                                <p className="detail" id="totalTravelDate"></p>
                                            </div>
                                            <div className="airDetail">
                                                <p className="tit">탑승객/좌석</p>
                                                {/*<p className="detail" id="totalTravelCount">1명<span className="titc">(성인1)</span> / 일반석</p>*/}
                                                <p className="detail" id="totalTravelCount"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="schedule-title" id="scheduleArea">
                        <div className="sch_tit">스케줄 정보</div>
                        <div className="sch_btn">
                            <a className="go"
                               // onClick="openFreeBagInfo()"
                               onClick={() => openFreeBagInfo()}
                            >항공사 수하물</a>
                            <a className="go mgl_5"
                               // onClick="showDetailTravelInfo()"
                               onClick={() => showDetailTravelInfo()}
                               >상세스케줄</a>
                        </div>
                    </div>

                    {/*<div className="timeLine pdb_20" id="mainDiv_0">*/}
                    {/*    <span className="airTitle mgb_10">가는편</span>*/}
                    {/*    <ul className="sectionGroup">*/}
                    {/*        <li className="section-a">*/}
                    {/*            <div className="a_left">인천(ICN) - 하와이/호놀룰루(HNL)</div>*/}
                    {/*            <div className="a_right">경유없음</div>*/}
                    {/*        </li>*/}
                    {/*        <li className="section-b">*/}
                    {/*            <div className="b_left">항공사/항공편명<br/><span>하와이안항공 HA0460</span></div>*/}
                    {/*        </li>*/}
                    {/*        <li className="section-c">*/}
                    {/*            <div className="c_left">여정<br/><span>인천 - 하와이/호놀룰루</span></div>*/}
                    {/*            <div className="c_right">좌석<br/><span>일반석</span></div>*/}
                    {/*        </li>*/}
                    {/*        <li className="section-d">*/}
                    {/*            <div className="d_left">출발/도착일시<br/><span className="arr_dtime">23.07.02(일) 21:15<br/> ~ 23.07.02(일) 11:15</span></div>*/}
                    {/*            <div className="d_left">무료수하물<a onClick="freeBagInfo()" className="pop-layer question">툴팁</a><br/><span>2개</span></div>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className="timeLine pdb_20" id="mainDiv_1">*/}
                    {/*    <span className="airTitle mgb_10">오는편</span>*/}
                    {/*    <ul className="sectionGroup">*/}
                    {/*        <li className="section-a">*/}
                    {/*            <div className="a_left">하와이/호놀룰루(HNL) - 인천(ICN)</div>*/}
                    {/*            <div className="a_right">경유없음</div>*/}
                    {/*        </li>*/}
                    {/*        <li className="section-b">*/}
                    {/*            <div className="b_left">항공사/항공편명<br/><span>하와이안항공 HA0459</span></div>*/}
                    {/*        </li>*/}
                    {/*        <li className="section-c">*/}
                    {/*            <div className="c_left">여정<br/><span>하와이/호놀룰루 - 인천</span></div>*/}
                    {/*            <div className="c_right">좌석<br/><span>일반석</span></div>*/}
                    {/*        </li>*/}
                    {/*        <li className="section-d">*/}
                    {/*            <div className="d_left">출발/도착일시<br/><span className="arr_dtime">23.07.07(금) 14:10<br/> ~ 23.07.08(토) 19:00</span></div>*/}
                    {/*            <div className="d_left">무료수하물<a onClick="freeBagInfo()" className="pop-layer question">툴팁</a><br/><span>2개</span></div>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}

                    <div className="schedule-title" id="detailCostArea">
                        <div className="sch_tit">상세요금 정보</div>
                        <div className="sch_btn">
                            <a className="go"
                               // onClick="openCostRule()"
                               onClick={() => openCostRule()}
                            >요금규정</a>
                        </div>
                    </div>

                    {/*<div className="timeLine pdb_20">*/}
                    {/*    <div className="section-eTit mgb_10">성인 1명</div>*/}
                    {/*    <ul className="sectionGroup detailCost">*/}
                    {/*        <li className="section-e"><span className="e_left">항공운임</span><span className="e_right">1,975,000원</span></li>*/}
                    {/*        <li className="section-e"><span className="e_left">유류할증료</span><span className="e_right">142,800원</span></li>*/}
                    {/*        <li className="section-e"><span className="e_left">제세공과금</span><span className="e_right">118,900원</span></li>*/}
                    {/*        <li className="section-e"><span className="e_left">발권대행료</span><span className="e_right">59,200원</span></li>*/}
                    {/*        <li className="section-e"><span className="e_left">1인 합계</span><span className="e_right">2,295,900원</span></li>*/}
                    {/*    </ul>*/}
                    {/*    <div className="sumTxt">총 예상 결제 금액<br/><span>(항공운임 + 유류할증료 + 제세공과금 + 발권대행료)</span></div>*/}
                    {/*    <div className="sumNum">2,295,900원</div>*/}
                    {/*    <ul className="sectionTxt mgt_10 mgb_20">*/}
                    {/*        <li>※유류할증료 및 제세공과금은 항공사 사정 및 환율에 따라 변동 가능성이 있으므로, 결제전 정확한 요금을 확인하시기 바랍니다.</li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}

                    <div className="schedule-title">
                        <div className="sch_tit">예약자 정보</div>
                    </div>
                    <div className="timeLine pdb_20">
                        <div className="info_form">
                            <dl className="inputArea">
                                <dt>예약자 한글명</dt>
                                <dd>
                                    <input type="text" className="mgt_10" id="reserv_name" value="코레일테스트" disabled/>
                                </dd>
                                <dt>예약자 영문 성</dt>
                                <dd>
                                    <input type="text" className="mgt_10 engInputArea" id="reserv_Eng_Sec" value=""/>
                                </dd>
                                <dt>예약자 영문 이름</dt>
                                <dd>
                                    <input type="text" className="mgt_10 engInputArea" id="reserv_Eng_fir" value=""/>
                                </dd>
                                <dt>휴대폰</dt>
                                <dd>
                                    <input type="text" className="mgt_10" id="reserv_cell" value=""/>
                                </dd>
                                <dt>이메일</dt>
                                <dd>
                                    <input type="text" className="mgt_10" id="reserv_email" value="korail@hcclab.com"/>
                                </dd>
                            </dl>
                            <ul className="sectionTxt mgt_10 mgb_10">
                                <li>※ 입력하신 이메일과 휴대폰 번호로 실시간 예약 정보가 전송되므로 정확한 정보를 입력해 주시기 바랍니다.</li>
                                <li>※ 예약자 정보는 긴급상황 발생 시 즉시 연락이 가능한 정보여야 하며, 부정확한 정보로 인해 발생되는 불이익에 대해서는 당사에서 책임지지 않습니다.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="schedule-title" id="passengerInfoArea">
                        <div className="sch_tit">탑승자 정보</div>
                        <div className="sch_btn">
                        <span className="check">
                            <input id="check01-a" type="checkbox"/>
                            <label htmlFor="check01-a"
                               // onClick="setPassengerInfo()"
                               onClick={() => setPassengerInfo()}
                            >예약자와 동일</label>
                        </span>
                        </div>
                    </div>

                    <div className="schedule-title">
                        <div className="sch_tit">항공권 규정 및 유의사항</div>
                    </div>
                    <div className="timeLine pdb_20">
                        <div className="flightNotice mgt_20 schedule_toggle">
                        <span className="check checkAll">
                            <input id="check000-all" type="checkbox"
                               // onClick="allCheckFunction()"
                               onClick={() => allCheckFunction()}
                            />
                            <label htmlFor="check000-all">전체동의</label>
                        </span>
                        <ul className="flightNoticeList">
                            <li>
                                <div className="flightNoticeToggle">
                                    <span className="check">
                                        <input id="check011-a" type="checkbox"/>
                                        <label htmlFor="check011-a">동의</label>
                                    </span>
                                    <a className="active">[개인정보 수집 및 이용/개인정보 제3자 제공/고유식별정보 수집 동의]</a>
                                </div>
                                <div className="flightNoticeCont maxHnone active">
                                    <div className="scroll-wrapper flightNoticeContInner scrollbar-inner" style={{position: "relative"}}>
                                        <div className="flightNoticeContInner scrollbar-inner scroll-content scroll-scrolly_visible"
                                            style={{height: "auto", marginBottom: "0px", marginRight: "0px",}}>
                                            <div className="flightNoticeContInside">
                                                <div className="box-scroll wd600px">
                                                    <div className="subTit">
                                                        <b style={{textIndent: "-20pt"}}><span style={{fontFamily: "돋움", fontSize: "10pt"}}>■&nbsp;</span></b>
                                                        <b style={{textIndent: "-20pt"}}><span style={{fontFamily: "돋움"}}>개인정보 수집항목 및 이용목적</span></b>
                                                        <p className="MsoNormal" align="left" style={{marginBottom: "0cm", lineHeight: "normal", wordBreak: "keep-all"}}>
                                                            <b><span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움"}}>&nbsp;</span></b>
                                                        </p>
                                                        <p className="MsoNormal" align="left" style={{marginBottom: "12pt", textIndent: "9pt", lineHeight: "normal", wordBreak: "keep-all"}}>
                                                            <span style={{fontSize: "9pt", fontFamily: "돋움"}}>
                                                                회사는 여행상품의 예약 및 여행관련 서비스 제공 등의 업무처리를 위하여 고객으로부터 최소한의 필수정보를 수집하고 있으며
                                                                <span lang="EN-US">,&nbsp;</span>
                                                                수집한 모든 개인정보는 별도의 동의가 없는 한 개인정보 수집 및 이용목적에서 고지한 이외의 다른 목적으로 사용되지 않습니다
                                                                <span lang="EN-US">.<br/><br/><br/><b>1)&nbsp;</b></span>
                                                                <b>회원가입 및 예약 등 필요시점에 수집하는 개인정보의 범위</b>
                                                                <span lang="EN-US"></span>
                                                            </span>
                                                        </p>
                                                            <table className="MsoTableGrid __se_tbl_ext" border="1" cellSpacing="0" cellPadding="0" style={{borderCollapse: "collapse", border: "none"}}>
                                                                <tbody>
                                                                <tr style={{height: "23.6pt"}}>
                                                                    <td width="47"
                                                                        style={{width: "35.2pt", border: "1pt solid windowtext", padding: "0cm 5.4pt", height: "23.6pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움"}}>구분<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="66"
                                                                        style={{width: "49.6pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt", height: "23.6pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움"}}>수집방법<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246"
                                                                        style={{width: "184.3pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt", height: "23.6pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움"}}>수집항목<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142"
                                                                        style={{width: "106.3pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt", height: "23.6pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움"}}>이용목적<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="95"
                                                                        style={{width: "70.9pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt", height: "23.6pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움"}}>보유기간<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47" valign="top"
                                                                        style={{width: "35.2pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left"
                                                                           style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움"}}>필수<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="66" valign="top"
                                                                        style={{width: "49.6pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left"
                                                                           style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움"}}>가입<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246" valign="top"
                                                                        style={{width: "184.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt",}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움"}}>
                                                                                성명<span lang="EN-US">,</span>
                                                                                성별<span lang="EN-US">,</span>
                                                                                생년월일<span lang="EN-US">,</span>
                                                                                휴대폰번호<span lang="EN-US">,</span>
                                                                                이메일<span lang="EN-US">,</span>
                                                                                본인인증정보<span lang="EN-US">(CI)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움"}}>
                                                                                이용자 식별 및 본인여부 확인을 통한 회원제 서비스 제공 및 상담<span lang="EN-US">,&nbsp;</span>
                                                                                예약내역 전달<span lang="EN-US"></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="95" rowSpan="6" valign="top"
                                                                        style={{width: "70.9pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>회원탈퇴시 또는 법정 의무 보유기간<span lang="EN-US"><br/><br/></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47" valign="top"
                                                                        style={{width: "35.2pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>필수<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="66" rowSpan="5" valign="top"
                                                                        style={{width: "49.6pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>항공예약 및 발권<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246" valign="top"
                                                                        style={{width: "184.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                예약자 및 동반자정보<span lang="EN-US"><br/>[</span>
                                                                                성명<span lang="EN-US">(</span>
                                                                                영문<span lang="EN-US">/</span>
                                                                                국문<span lang="EN-US">),</span>
                                                                                생년월일<span lang="EN-US">,</span>
                                                                                휴대폰번호<span lang="EN-US">,</span>
                                                                                이메일<span lang="EN-US">,&nbsp;</span>
                                                                                여권정보<span lang="EN-US">(</span>
                                                                                국적<span lang="EN-US">,</span>
                                                                                발행국<span lang="EN-US">,</span>
                                                                                여권번호<span lang="EN-US">,&nbsp;</span>
                                                                                여권만료일<span lang="EN-US">)]</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>항공예약 및 발권<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47" valign="top"
                                                                        style={{width: "35.2pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left"
                                                                           style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>선택<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246" valign="top"
                                                                        style={{width: "184.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                현지연락처정보<span lang="EN-US">(</span>
                                                                                도시<span lang="EN-US">,</span>
                                                                                현지연락처<span lang="EN-US">,</span>
                                                                                연락처<span lang="EN-US">),&nbsp;</span>
                                                                                체류지정보<span lang="EN-US">(</span>
                                                                                도시<span lang="EN-US">,</span>
                                                                                우편번호<span lang="EN-US">,</span>
                                                                                주소<span lang="EN-US">)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left"
                                                                           style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                항공사 스케줄 변경 및 운항취소 정보전달 및 미주의 경우
                                                                                <span lang="EN-US">,&nbsp;</span>
                                                                                체류지 정보 필요<span lang="EN-US"></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47" valign="top"
                                                                        style={{width: "35.2pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>선택<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246" valign="top"
                                                                        style={{width: "184.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                증빙서류<span lang="EN-US">(</span>
                                                                                재직증명서<span lang="EN-US">,&nbsp;</span>
                                                                                가족관계증명서<span lang="EN-US">)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>여행상품의 결제<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47" valign="top"
                                                                        style={{width: "35.2pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>선택<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246" valign="top"
                                                                        style={{width: "184.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                항공사<span lang="EN-US">,&nbsp;</span>
                                                                                마일리지번호<span lang="EN-US"></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>항공사 마일리지 적립 제공<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47" valign="top"
                                                                        style={{width: "35.2pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>필수<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246" valign="top"
                                                                        style={{width: "184.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                결제정보<span lang="EN-US">(</span>
                                                                                카드사명<span lang="EN-US">,</span>
                                                                                카드번호<span lang="EN-US">,</span>
                                                                                계좌번호<span lang="EN-US">,&nbsp;</span>
                                                                                유효기간<span lang="EN-US">,&nbsp;</span>
                                                                                비밀번호<span lang="EN-US">,&nbsp;</span>
                                                                                카드소유주명<span lang="EN-US">)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>여행상품의 결제<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <p className="MsoNormal" align="left" style={{marginBottom: "12pt", lineHeight: "normal", wordBreak: "keep-all",}}>
                                                                <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}><br/><b>2)&nbsp;</b></span>
                                                                <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>기타 법정 의무 수집정보 등<span lang="EN-US"></span></span></b>
                                                            </p>
                                                            <table className="MsoTableGrid __se_tbl_ext" border="1"
                                                                   cellSpacing="0" cellPadding="0" width="595"
                                                                   style={{width: "446.3pt", borderCollapse: "collapse", border: "none",}}>
                                                                <tbody>
                                                                <tr>
                                                                    <td width="113" valign="top"
                                                                        style={{width: "84.8pt", border: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>관련법률</span></b>
                                                                            <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208" valign="top"
                                                                        style={{width: "155.95pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>수집 항목<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189" valign="top"
                                                                        style={{width: "5cm", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>이용 목적<span lang="EN-US"></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85" valign="top"
                                                                        style={{width: "63.8pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="center" style={{margin: "12pt 0cm", fontSize: "10pt"}}>
                                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>보유 기간</span></b>
                                                                            <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="113" valign="top"
                                                                        style={{width: "84.8pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>전자상거래법<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208" valign="top"
                                                                        style={{width: "155.95pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                고객식별정보<span lang="EN-US">,&nbsp;</span>
                                                                                분쟁처리기록<span lang="EN-US">,&nbsp;</span>
                                                                                계약<span lang="EN-US">·</span>
                                                                                철회 기록<span lang="EN-US"></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189" valign="top"
                                                                        style={{width: "5cm", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                소비자 불만 또는 분쟁처리<span lang="EN-US">,&nbsp;</span>
                                                                                계약내용 확인<span lang="EN-US"></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85" valign="top"
                                                                        style={{width: "63.8pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}>3</span>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>년
                                                                                <span lang="EN-US">&nbsp;/ 5</span>년
                                                                                <span lang="EN-US"></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="113" valign="top"
                                                                        style={{width: "84.8pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>국세기본법<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208" valign="top"
                                                                        style={{width: "155.95pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>국세증빙자료<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189" valign="top"
                                                                        style={{width: "5cm", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>국세 소멸시효 계산<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85"
                                                                        style={{width: "63.8pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}>10</span>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>년<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="113" valign="top"
                                                                        style={{width: "84.8pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>통신비밀보호법<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208" valign="top"
                                                                        style={{width: "155.95pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left"
                                                                           style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>로그기록<span lang="EN-US">, IP</span>등<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189" valign="top"
                                                                        style={{width: "5cm", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                                수사기관 제공<span lang="EN-US">&nbsp;(</span>법원 영장 등 정당한 절차의 경우에 제공<span lang="EN-US">)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85" valign="top"
                                                                        style={{width: "63.8pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "12pt 0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}>3</span>
                                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>개월<span lang="EN-US"></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <p className="MsoNormal" align="left" style={{marginBottom: "0cm", lineHeight: "normal", wordBreak: "keep-all",}}>
                                                            <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}>&nbsp;</span>
                                                        </p>
                                                        <p className="MsoNormal" align="left" style={{marginBottom: "0cm", lineHeight: "normal", wordBreak: "keep-all",}}>
                                                            <b><span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}>3)&nbsp;</span></b>
                                                            <b><span style={{fontSize: "9pt", fontFamily: "돋움",}}>동의를 거부할 권리 및 동의를 거부할 경우의 불이익</span></b>
                                                            <span lang="EN-US" style={{fontSize: "9pt", fontFamily: "돋움",}}><br/><br/>&nbsp; &nbsp;</span>
                                                            <span style={{fontSize: "9pt", fontFamily: "돋움",}}>
                                                                개인정보 주체자는 개인정보 수집<span lang="EN-US">,&nbsp;</span>
                                                                이용에 대한 동의를 거부할 권리가 있습니다<span lang="EN-US">.<br/></span>
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span lang="EN-US" style={{fontFamily: "돋움", fontSize: "9pt",}}>&nbsp;&nbsp;</span>
                                                            <span style={{fontFamily: "돋움", fontSize: "9pt",}}>동의를 거부할 경우 회원가입 및 서비스 제공이 불가함을 알려드립니다</span>&nbsp;
                                                        </p>
                                                        <p>&nbsp;</p>
                                                        <p>
                                                            <b style={{textIndent: "-20pt;"}}><span style={{fontFamily: "돋움", fontSize: "10pt"}}>■&nbsp;</span></b>
                                                            <b style={{textIndent: "-20pt;"}}>개인정보의 제<span lang="EN-US">3</span>자 제공 안내</b>
                                                        </p>
                                                        <p className="MsoNormal" style={{textIndent: "9pt",}}>
                                                            <span style={{fontSize: "9pt", lineHeight: "12.84px"}}>
                                                                본사는 원칙적으로 이용자의 개인정보를 수집하는 개인정보의 항목 및 수집방법<span lang="EN-US">'</span>에서 명시한 범위 내에서만 처리하며
                                                                <span lang="EN-US">,&nbsp;</span>동 범위를 초과하여 이용하거나 제<span lang="EN-US">3</span>자에게 제공하지 않습니다
                                                                <span lang="EN-US">.&nbsp;</span>
                                                                다만<span lang="EN-US">,&nbsp;</span>이용자의 사전 동의<span lang="EN-US">,&nbsp;</span>
                                                                법률의 특별한 규정 등 개인정보 보호법 제<span lang="EN-US">17</span>조 및 제<span lang="EN-US">18</span>조에 해당하는 경우에는 개인정보를 제<span lang="EN-US">3</span>자에게 제공할 수 있습니다<span lang="EN-US">.<br/>&nbsp;</span>
                                                                이용자는 개인정보의 제<span lang="EN-US">3</span>자 제공에 대하여 동의를 하지 않을 수 있으며<span lang="EN-US">,&nbsp;</span>
                                                                언제든지 제<span lang="EN-US">3</span>자 제공 동의를 철회할 수 있습니다<span lang="EN-US">.&nbsp;</span>
                                                                동의를 거부하는 경우에도 서비스를 이용할 수 있으나<span lang="EN-US">,&nbsp;</span>제<span lang="EN-US">3</span>자 제공에 기반한 관련 서비스의 이용 및 제공이 제한될 수 있습니다<span lang="EN-US">.<br/>&nbsp;
                                                                </span>
                                                            </span>
                                                        </p>
                                                        <p className="MsoNormal">다음과 같이 개인정보를 제<span lang="EN-US">3</span>자에게 제공하고 있습니다<span lang="EN-US">.</span></p>
                                                        <table className="MsoTableGrid __se_tbl_ext" border="1"
                                                               cellSpacing="0" cellPadding="0"
                                                               style={{borderCollapse: "collapse", border: "none",}}>
                                                            <tbody>
                                                            <tr>
                                                                <td width="141" valign="top"
                                                                    style={{width: "106.1pt", border: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                    <p className="MsoNormal" align="center" style={{margin: "0cm", fontSize: "10pt"}}>
                                                                        <b>제공받는자</b><span lang="EN-US"></span>
                                                                    </p>
                                                                </td>
                                                                <td width="180" valign="top"
                                                                    style={{width: "134.65pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt"}}>
                                                                    <p className="MsoNormal" align="center" style={{margin: "0cm", fontSize: "10pt"}}>
                                                                        <b>제공항목</b><span lang="EN-US"></span>
                                                                    </p>
                                                                </td>
                                                                <td width="142" valign="top"
                                                                    style={{width: "106.3pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt"}}>
                                                                    <p className="MsoNormal" align="center" style={{margin: "0cm", fontSize: "10pt"}}>
                                                                        <b>제공목적</b><span lang="EN-US"></span>
                                                                    </p>
                                                                </td>
                                                                <td width="138" valign="top"
                                                                    style={{width: "103.75pt", borderTop: "1pt solid windowtext", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderImage: "initial", borderLeft: "none", padding: "0cm 5.4pt"}}>
                                                                    <p className="MsoNormal" align="center" style={{margin: "0cm", fontSize: "10pt"}}>
                                                                        <b>보유기간</b><span lang="EN-US"></span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                                <tr>
                                                                    <td width="141" valign="top"
                                                                        style={{width: "106.1pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            서비스 제공 항공사<span lang="EN-US"></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="180" valign="top"
                                                                        style={{width: "134.65pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            성명<span lang="EN-US">(</span>
                                                                            국영문<span lang="EN-US">),&nbsp;</span>
                                                                            성별<span lang="EN-US">,&nbsp;</span>
                                                                            여권정보<span lang="EN-US">(</span>
                                                                            국적<span lang="EN-US">,&nbsp;</span>
                                                                            여권번호<span lang="EN-US">,&nbsp;</span>
                                                                            여권종류<span lang="EN-US">,&nbsp;</span>
                                                                            여권유효기간<span lang="EN-US">),&nbsp;</span>
                                                                            마일리지번호<span lang="EN-US">,&nbsp;</span>
                                                                            체류지 정보<span lang="EN-US">(</span>
                                                                            미주 여행 시<span lang="EN-US">),&nbsp;</span>
                                                                            휴대폰번호<span lang="EN-US"></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            항공권 예약<span lang="EN-US">/</span>
                                                                            발권<span lang="EN-US">,&nbsp;</span>
                                                                            개인식별<span lang="EN-US">,&nbsp;</span>
                                                                            고지사항전달<span lang="EN-US">,&nbsp;</span>
                                                                            마일리지 적립<span lang="EN-US">,</span>
                                                                            전환<span lang="EN-US">,&nbsp;</span>
                                                                            및 출국가능여부 등 파악<span lang="EN-US"></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="138" rowSpan="3"
                                                                        style={{width: "103.75pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            개인정보 이용목적 달성 시<span lang="EN-US">(</span>제휴업체는 제휴계약 종료 시<span lang="EN-US">)&nbsp;</span>및 관계법령에 따른 보관기간까지<span lang="EN-US"></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="141" valign="top"
                                                                        style={{width: "106.1pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            ㈜토파스여행정보<span lang="EN-US"></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="180" valign="top"
                                                                        style={{width: "134.65pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            성명<span lang="EN-US">(</span>
                                                                            국영문<span lang="EN-US">),&nbsp;</span>
                                                                            생년월일<span lang="EN-US">,&nbsp;</span>
                                                                            여권정보<span lang="EN-US">(</span>
                                                                            여권번호<span lang="EN-US">,&nbsp;</span>
                                                                            여권만료일<span lang="EN-US">),&nbsp;</span>
                                                                            휴대전화번호<span lang="EN-US">,&nbsp;</span>
                                                                            마일리지 정보<span lang="EN-US">,</span>
                                                                            <span lang="EN-US"></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" rowSpan="2" valign="top"
                                                                        style={{width: "106.3pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span lang="EN-US">&nbsp;</span>
                                                                        </p>
                                                                        <p className="MsoNormal" align="left" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            <span lang="EN-US">&nbsp;</span>
                                                                        </p>
                                                                        <p className="MsoNormal" align="left" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            항공권 예약<span lang="EN-US">/</span>
                                                                            발권<span lang="EN-US">/</span>
                                                                        </p>
                                                                        <p className="MsoNormal" align="left" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>결제 및 서비스 제공<span lang="EN-US"></span></p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="141" valign="top"
                                                                        style={{width: "106.1pt", borderRight: "1pt solid windowtext", borderBottom: "1pt solid windowtext", borderLeft: "1pt solid windowtext", borderImage: "initial", borderTop: "none", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>㈜아시아나애바카스<span lang="EN-US"></span></p>
                                                                    </td>
                                                                    <td width="180" valign="top"
                                                                        style={{width: "134.65pt", borderTop: "none", borderLeft: "none", borderBottom: "1pt solid windowtext", borderRight: "1pt solid windowtext", padding: "0cm 5.4pt"}}>
                                                                        <p className="MsoNormal" align="left" style={{margin: "0cm", textAlign: "justify", fontSize: "10pt"}}>
                                                                            카드정보<span lang="EN-US">(</span>
                                                                            카드사명<span lang="EN-US">,&nbsp;</span>
                                                                            카드번호<span lang="EN-US">,&nbsp;</span>
                                                                            카드만료일<span lang="EN-US">,&nbsp;</span>
                                                                            비밀번호<span lang="EN-US">),&nbsp;</span>
                                                                            환불 시<span lang="EN-US">(</span>
                                                                            은행명<span lang="EN-US">,&nbsp;</span>
                                                                            계좌번호<span lang="EN-US">,&nbsp;</span>
                                                                            예금주<span lang="EN-US">)</span>
                                                                            <span lang="EN-US"></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            &nbsp;
                                                    </div>
                                                    <div className="txt"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="scroll-element scroll-x scroll-scrolly_visible">
                                            <div className="scroll-element_outer">
                                                <div className="scroll-element_size"></div>
                                                <div className="scroll-element_track"></div>
                                                <div className="scroll-bar" style={{width: "88px",}}></div>
                                            </div>
                                        </div>
                                        <div className="scroll-element scroll-y scroll-scrolly_visible">
                                            <div className="scroll-element_outer">
                                                <div className="scroll-element_size"></div>
                                                <div className="scroll-element_track"></div>
                                                <div className="scroll-bar" style={{height: "279px", top: "0px",}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flightNoticeToggle">
                                    <span className="check">
                                        <input id="check012-a" type="checkbox"/>
                                        <label htmlFor="check012-a">동의</label>
                                    </span>
                                    <a>[요금규정]</a>
                                </div>
                                <div className="flightNoticeCont maxHnone">
                                    <div className="scroll-wrapper flightNoticeContInner scrollbar-inner" style={{position: "relative"}}>
                                        <div className="flightNoticeContInner scrollbar-inner scroll-content scroll-scrolly_visible"
                                            style={{height: "auto", marginBottom: "0px", marginRight: "0px",}}>
                                            <div className="flightNoticeContInside">
                                                <div className="box-scroll">
                                                    <div id="tab_bottom_1" className="tabcontent current">
                                                        <div className="feeRule">
                                                            <dl>
                                                                <dt>요금규정1</dt>
                                                                <dd>내용</dd>
                                                            </dl>
                                                        </div>
                                                        <div className="feeRule">
                                                            <dl>
                                                                <dt>적용구간</dt>
                                                                <dd>서울-호놀룰루</dd>
                                                            </dl>
                                                        </div>
                                                        <div className="feeRule">
                                                            <dl>
                                                                <dt>적용대상</dt>
                                                                <dd></dd>
                                                            </dl>
                                                        </div>
                                                        <div className="feeRule">
                                                            <dl>
                                                                <dt>출발요일</dt>
                                                                <dd>태평양 횡단 기준 토요일~일요일 허용<br/></dd>
                                                            </dl>
                                                        </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>출발기간</dt>
                                                                    <dd>
                                                                        [서울-미국 구간 여행시]<br/>&nbsp;-
                                                                        2023.01.23~2023.03.31<br/>&nbsp;-
                                                                        2023.04.01~2023.04.27<br/>&nbsp;-
                                                                        2023.05.01~2023.07.14<br/>&nbsp;-
                                                                        2023.08.26~2023.09.22<br/>&nbsp;-
                                                                        2023.10.02~2023.12.10<br/>&nbsp;-
                                                                        2024.02.26~2024.03.31<br/>&nbsp;-
                                                                        2024.04.01~2024.06.05<br/>&nbsp;-
                                                                        2024.09.08~2024.09.12<br/>&nbsp;-
                                                                        2024.09.17~2024.12.25<br/>&nbsp;-
                                                                        2025.01.28~2025.03.31<br/>&nbsp;&nbsp;
                                                                        (첫번째 국제선 구간 기준)
                                                                        <br/><br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>적용불가일</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>여행가능일</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>최소체류일</dt>
                                                                    <dd>원문규정 확인 필요</dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>최대체류일</dt>
                                                                    <dd>출발 후 12개월<br/></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>유/소아요금</dt>
                                                                    <dd>
                                                                        - 성인 동반 만 2세 - 만 11세 소아 : 성인 요금의 75%<br/>
                                                                        &nbsp;&nbsp;(전구간 만 18세 이상 성인 동반조건)<br/>
                                                                        - 만 2세 미만 유아(좌석 점유 시) : 성인 요금의 75%<br/>
                                                                        &nbsp;&nbsp;(전구간 만 18세 이상 성인 동반조건)<br/>
                                                                        - 만 2세 미만 유아(좌석 미점유 시) : 성인 요금의 10%<br/>
                                                                        &nbsp;&nbsp;(전구간 만 18세 이상 성인 동반조건)<br/> <br/><br/>
                                                                        ※ 항공사 및 운항 항공편에 따라 소아, 유아 나이의 적용 기준이 달라질 수 있습니다.<br/>
                                                                        ※ 출발 당시 소아 운임 적용 가능하더라도 여행 도중 만 12세 이상이 되는 경우,
                                                                        유아 운임 적용 가능하더라도 여행 도중 24개월 이상이 되는 경우,
                                                                        소아, 유아 운임 적용 불가할 수 있으며
                                                                        소아,유아 항공권을 소지하더라도 운항 항공편에 따라
                                                                        탑승이 거절되거나 추가 비용 발생 등 항공권 사용에 문제가 될 수 있으니
                                                                        구매 전 반드시 확인하시기 바랍니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>사전발권</dt>
                                                                    <dd>
                                                                        &nbsp;
                                                                        - 전구간 확약 조건<br/>&nbsp;
                                                                        - 대기 예약 불가<br/>&nbsp;
                                                                        - 예약후 7일 안에 발권 또는 출발 7일 전에 발권해야하며
                                                                        둘 중 빠른 조건으로 발권 완료해야함<br/>또는<br/>&nbsp;
                                                                        - 출발 24시간 전에 전구간 확약 조건<br/>&nbsp;
                                                                        - 대기 예약 불가<br/>&nbsp;
                                                                        - 예약 완료 후 24시간 이내에 발권 완료<br/>또는<br/>전구간 확약                                                                         조건<br/>&nbsp;
                                                                        - 예약과 동시에 발권 완료해야 함<br/>&nbsp;
                                                                        - 대기 예약 불가<br/><br/><br/>
                                                                        ※ 사전발권 조건과 자동생성되는 시스템 발권 시한 중 가장 제한적인 조건으로 적용됩니다.<br/>
                                                                        ※ 예약일 기준으로 항공사에서 자동으로 발권시한이 생성되므로
                                                                        좌석이 확약이더라도 상황에 따라 예약과 동시에 구매하지 않으면
                                                                        예약이 취소될 수 있습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>판매제한</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>변경/환불</dt>
                                                                    <dd>
                                                                        <br/>[한국 출발 기준]<br/>
                                                                        <br/>[예약 변경]<br/>&nbsp;
                                                                        - 예약 변경 가능<br/>
                                                                        <br/>[환불]<br/>&nbsp;
                                                                        - 출발 전 취소 수수료 : <font color="BLUE">230,000 원</font><br/>&nbsp;
                                                                        * 출발전 취소 시점별 환불 수수료 *<br/>&nbsp;&nbsp;&nbsp;
                                                                        - 출발전 3일 이내: <font color="BLUE">230,000 원</font><br/>&nbsp;&nbsp;&nbsp;
                                                                        - 출발 14일-04일 전: <font color="BLUE">180,000 원</font><br/>&nbsp;&nbsp;&nbsp;
                                                                        - 출발 60일-15일 전: <font color="BLUE">150,000 원</font><br/>&nbsp;&nbsp;&nbsp;
                                                                        - 출발 90일-61일 전: <font color="BLUE">50,000 원</font><br/>&nbsp;&nbsp;&nbsp;
                                                                        - 출발 91 일 전 : <font color="BLUE">30,000 원</font><br/>&nbsp;
                                                                        - 출발 후 환불 <font color="RED">불가</font><br/>
                                                                        <br/>[미국 출발 기준]<br/>
                                                                        <br/>[예약 변경]<br/>&nbsp;
                                                                        - 예약 변경 가능<br/>
                                                                        <br/>[환불]<br/>&nbsp;
                                                                        - 출발 전 취소 수수료 : <font color="BLUE">USD 300.00</font><br/>&nbsp;
                                                                        - 출발 후 환불 <font color="RED">불가</font><br/><br/>
                                                                        <br/>[예약변경]<br/>
                                                                        - 운임규정 상 변경이 허용되는 경우에 한해 동일 또는 상위 단계 운임으로만 변경가능하며,
                                                                        변경일 기준 운임 재계산으로 변경수수료 이외에 운임차액 및 TAX가 추가될 수 있습니다.<br/>
                                                                        - 전체 미사용 항공권의 출발편 변경 유효기간은 항공사 규정 및 운임에 따라 상이하므로 문의바랍니다. <br/>
                                                                        <br/>[환불]<br/>
                                                                        - 사용구간 편도운임 및 환불수수료 공제 후 환불금이 발생되지 않을 수 있습니다.<br/>
                                                                        - 상기 환불규정은 항공운임에 적용되는 내용이며,
                                                                        유류할증료 및 TAX(제세공과금)의 환불규정은 각 정부지침 및 항공사규정에 따라 상이하므로 문의바랍니다.<br/>
                                                                        <br/>[NO-SHOW]<br/>
                                                                        - 예약취소/변경 없이 탑승하지 않는 경우<br/>
                                                                        - 변경 또는 환불수수료와 별도 적용<br/>
                                                                        - 항공사에서 NO-SHOW 발생 이후 잔여여정을 취소할 수 있습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>동반여행</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>추가요금</dt>
                                                                    <dd>
                                                                        <b>
                                                                            ※ 현재 조회 중인 운임 기준으로 추가요금이 이미 포함되어 있으며,
                                                                            해당항목에
                                                                            제공되는 규정은 변경조건에 따라 추가될 수 있는 요금입니다.
                                                                            (변경/환불수수료 별도)
                                                                        </b>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>경유지체류</dt>
                                                                    <dd>
                                                                        총 4회 허용<br/>&nbsp;
                                                                        - 2회(무료) / 추가 2회(회당 200,000 원)<br/>&nbsp;
                                                                        - 호놀룰루 내에서 방향당 1회(무료)<br/>&nbsp;
                                                                        - 2회 허용 (회당 200,000 원)<br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>환승</dt>
                                                                    <dd>※ 경유지 당일 연결이 불가한 경우 해당 공항 심야 이용이 불가 할 수 있으므로 반드시 공항 운영 시간 확인 부탁 드립니다.</dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>비행편제한</dt>
                                                                    <dd>
                                                                        [서울-호놀룰루 구간 아래의 항공편 이용]<br/>&nbsp;
                                                                        - 하와이안항공에서 운항하는 하와이안항공 항공편<br/>[아래의 항공편 이용]<br/>&nbsp;
                                                                        - 하와이안항공에서 운항하는 하와이안항공 항공편<br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>신용카드</dt>
                                                                    <dd>
                                                                        사용가능<br/>
                                                                        - CHINA UNION PAY 및 미가맹점의 카드 사용불가<br/>
                                                                        - 탑승자 본인카드로만 결제 가능하며 공항수속시 결제카드를 확인할수 있습니다.
                                                                        (제시 못할경우 탑승이 거부 될수 있음)<br/>
                                                                        - 법인카드 : 재직증명서 원본 첨부 조건<br/>
                                                                        - 가족카드 : 주민등록 등본, 의료보험 카드, 가족관계 증명서 등 첨부 조건
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>수하물</dt>
                                                                    <dd>
                                                                        ※ 무료수하물 및 초과수하물 규정은 좌석등급 및 노선에 따라 상이하므로 자세한 내용은 항공사 홈페이지
                                                                        <a href="https://hawaiianair-kr.custhelp.com/app/answers/detail/a_id/2555" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        또는 여행사 담당자에게 문의 부탁드립니다.<br/>
                                                                        ※ 항공사 요금규정에 무료수하물 내용이 누락된 경우 표기되지 않을 수 있으며,
                                                                        표기되지 않은 경우, 해당항공사에 문의 부탁드립니다.<br/>
                                                                        ※ 공동운항편, 타항공사 연결편, 24시간 이상 체류 일정, 해외출발 일정,
                                                                        특수 수하물의 경우 운항항공사에 따라 수하물 규정이 상이할 수 있습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>항공사마일리지</dt>
                                                                    <dd>
                                                                        ※ 항공사 마일리지 적립 여부 및 적립률은 운임별/제휴 회원사별로 상이하오니, 자세한
                                                                        내용은 항공사 홈페이지
                                                                        <a href="http://hawaiianair-kr.custhelp.com/app/answers/detail/a_id/2506/session/L3RpbWUvMTU2MDEyNzUyMC9zaWQvcFJkOUZUZ28%3D" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        또는 여행사 담당자에게 구매 전 문의 부탁드립니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>여행사 업무대행료</dt>
                                                                    <dd>
                                                                        ※ 항공권 발권 후 고객의 요청에 따른 취소,변경,환불 등의 작업 필요 시,
                                                                        여행사에서 취급하는 비용이므로 해당 비용에 대한 문의는 여행사로 하시기 바랍니다.<br/>
                                                                        ※ 발권 후 이루어지는 취소,변경,환불 등 모든 후속 업무는 여행사가 항공사를 통해 진행하는 추가 업무입니다.
                                                                        따라서 이에 대한 여행업무 취급 수수료는 항공사 수수료와 별도로 추가 징수되는 사항이니,
                                                                        신중한 결제 진행 부탁 드립니다.<br/>
                                                                        ※ 여행업무 취급수수료는 항공권을 취소/변경/환불하더라도 환불되지 않습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>비동반 소아 규정</dt>
                                                                    <dd>
                                                                        ※ 동반자가 18세미만이거나 탑승클래스가 상이한 소아는 비동반 소아 서비스를 신청 하셔야 합니다.<br/>
                                                                        ※ 비동반 소아 서비스는 해당 항공사의 사전 승인 하에 이용 가능하며
                                                                        입국 국가 및 항공사별 서비스 대상 연령 및 규정이 상이하므로
                                                                        반드시 결제 1주일 전 담당자 확인 후 진행 부탁드립니다.<br/>
                                                                        ※ 비동반 소아 서비스는 별도의 서비스 수수료가 발생할 수 있습니다.<br/>
                                                                        ※ 공동운항편의 경우 실제 탑승항공사의 규정에 따라 서비스가 불가할 수 있습니다.<br/>
                                                                        ※ 자세한 내용은 항공사 홈페이지
                                                                        <a href="https://hawaiianair-kr.custhelp.com/app/answers/detail/a_id/2565" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        를 통해 확인 부탁드립니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>항공사 일반규정</dt>
                                                                    <dd>
                                                                        ※ 상기 모든 수수료는 1인/1회 기준 금액 입니다. <br/><b>
                                                                        ※ 예약일과 발권일이 상이한 경우 발권일의 환율에 따라 TAX(유류할증료 포함)가 변동될 수 있습니다.</b><br/>
                                                                        ※ 항공사의 사정으로 별도의 공지없이 운임 및 규정이 변경되어 운임 차액이 발생하는 경우 운임차액 추가 징수됩니다.<br/>
                                                                        ※ 항공권은 반드시 첫번째 여정부터 순서대로 사용하셔야하며,
                                                                        순서대로 이용하지 않은 항공권은 취소처리될 수 있으며, 환불불가합니다. <br/>
                                                                        ※ 동일 혹은 다수의 여행사를 통해 동일항공편을 이중예약하는 경우,
                                                                        항공사에 의해 예약취소될 수 있으니 유의해 주시기 바랍니다. <br/>
                                                                        ※ 자세한 운송약관은 항공사 홈페이지
                                                                        <a href="https://www.hawaiianairlines.co.kr/legal/international-contract-of-carriage" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        를 통해 확인 부탁드립니다.<br/>
                                                                        ※ 상기 운임규정 내에 [바로가기]를 통해 제공되는 항공사 홈페이지 내 정보 에 대해 한국어 지원이 불가한 경우,
                                                                        이용하시는 브라우저의 번역기능을 통해 확인하시거나 여행사 담당자에게 문의 부탁드립니다.<br/><b>
                                                                        ※ 하와이안항공 서울사무소는 미국 하와이안항공의 총판매대리점으로서 현금영수증 발행이 불가능함을 안내드리오니 이점 양해해주시기 바랍니다.</b><br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                        </div>

                                                        <div id="tab_bottom_2" className="tabcontent current">
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>요금규정2</dt>
                                                                    <dd>내용</dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>적용구간</dt>
                                                                    <dd>호놀룰루-서울</dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>적용대상</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>출발요일</dt>
                                                                    <dd>태평양 횡단 기준 월요일~금요일 허용<br/></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>출발기간</dt>
                                                                    <dd>
                                                                        [서울-미국 구간 여행시]<br/>&nbsp;-
                                                                        2023.01.23~2023.03.31<br/>&nbsp;-
                                                                        2023.04.01~2023.04.27<br/>&nbsp;-
                                                                        2023.05.01~2023.07.14<br/>&nbsp;-
                                                                        2023.08.26~2023.09.22<br/>&nbsp;-
                                                                        2023.10.02~2023.12.10<br/>&nbsp;-
                                                                        2024.02.26~2024.03.31<br/>&nbsp;-
                                                                        2024.04.01~2024.06.05<br/>&nbsp;-
                                                                        2024.09.08~2024.09.12<br/>&nbsp;-
                                                                        2024.09.17~2024.12.25<br/>&nbsp;-
                                                                        2025.01.28~2025.03.31<br/>&nbsp;&nbsp;
                                                                        (첫번째 국제선 구간 기준)<br/><br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>적용불가일</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>여행가능일</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>최소체류일</dt>
                                                                    <dd>원문규정 확인 필요</dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>최대체류일</dt>
                                                                    <dd>출발 후 12개월<br/></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>유/소아요금</dt>
                                                                    <dd>
                                                                        - 성인 동반 만 2세 - 만 11세 소아 : 성인 요금의 75%<br/>
                                                                        &nbsp;&nbsp;(전구간 만 18세 이상 성인 동반조건)<br/>
                                                                        - 만 2세 미만 유아(좌석 점유 시) : 성인 요금의 75%<br/>
                                                                        &nbsp;&nbsp;(전구간 만 18세 이상 성인 동반조건)<br/>
                                                                        - 만 2세 미만 유아(좌석 미점유 시) : 성인 요금의 10%<br/>
                                                                        &nbsp;&nbsp;(전구간 만 18세 이상 성인 동반조건)<br/> <br/><br/>
                                                                        ※ 항공사 및 운항 항공편에 따라 소아, 유아 나이의 적용 기준이 달라질 수 있습니다.<br/>
                                                                        ※ 출발 당시 소아 운임 적용 가능하더라도 여행 도중 만 12세 이상이 되는 경우,
                                                                        유아 운임 적용 가능하더라도 여행 도중 24개월 이상이 되는 경우,
                                                                        소아, 유아 운임 적용 불가할 수 있으며
                                                                        소아,유아 항공권을 소지하더라도 운항 항공편에 따라 탑승이 거절되거나 추가 비용 발생 등
                                                                        항공권 사용에 문제가 될 수 있으니 구매 전 반드시 확인하시기 바랍니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>사전발권</dt>
                                                                    <dd>
                                                                        &nbsp;- 전구간 확약 조건<br/>
                                                                        &nbsp;- 대기 예약 불가<br/>
                                                                        &nbsp;- 예약후 7일 안에 발권 또는 출발 7일 전에 발권해야하며
                                                                        둘 중 빠른 조건으로 발권 완료해야함<br/>또는<br/>
                                                                        &nbsp;- 출발 24시간 전에 전구간 확약 조건<br/>
                                                                        &nbsp;- 대기 예약 불가<br/>
                                                                        &nbsp;- 예약 완료 후 24시간 이내에 발권 완료<br/>또는<br/>전구간 확약 조건<br/>
                                                                        &nbsp;- 예약과 동시에 발권 완료해야 함<br/>
                                                                        &nbsp;- 대기 예약 불가<br/><br/><br/>
                                                                        ※ 사전발권 조건과 자동생성되는 시스템 발권 시한 중 가장 제한적인 조건으로 적용됩니다.<br/>
                                                                        ※ 예약일 기준으로 항공사에서 자동으로 발권시한이 생성되므로 좌석이 확약이더라도
                                                                        상황에 따라 예약과 동시에 구매하지 않으면 예약이 취소될 수 있습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>판매제한</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>변경/환불</dt>
                                                                    <dd>
                                                                        <br/>[한국 출발 기준]<br/>
                                                                        <br/>[예약 변경]<br/>
                                                                        &nbsp;- 예약 변경 가능<br/>
                                                                        <br/>[환불]<br/>
                                                                        &nbsp;- 출발 전 취소 수수료 : <font color="BLUE">300,000 원</font><br/>
                                                                        &nbsp;* 출발전 취소 시점별 환불 수수료 *<br/>&nbsp;&nbsp;
                                                                        &nbsp;- 출발전 3일 이내: <font color="BLUE">300,000 원</font><br/>&nbsp;&nbsp;
                                                                        &nbsp;- 출발 14일-04일 전: <font color="BLUE">240,000 원</font><br/>&nbsp;&nbsp;
                                                                        &nbsp;- 출발 60일-15일 전: <font color="BLUE">200,000 원</font><br/>&nbsp;&nbsp;
                                                                        &nbsp;- 출발 90일-61일 전: <font color="BLUE">50,000 원</font><br/>&nbsp;&nbsp;
                                                                        &nbsp;- 출발 91 일 전 : <font color="BLUE">30,000 원</font><br/>
                                                                        &nbsp;- 출발 후 환불 <font color="RED">불가</font><br/>
                                                                        <br/>[미국 출발 기준]<br/>
                                                                        <br/>[예약 변경]<br/>
                                                                        &nbsp;- 예약 변경 가능<br/>
                                                                        <br/>[환불]<br/>
                                                                        &nbsp;- 출발 전 취소 수수료 : <font color="BLUE">USD 300.00</font><br/>
                                                                        &nbsp;- 출발 후 환불 <font color="RED">불가</font><br/><br/>
                                                                        <br/>[예약변경]<br/>
                                                                        - 운임규정 상 변경이 허용되는 경우에 한해
                                                                        동일 또는 상위 단계 운임으로만 변경가능하며,
                                                                        변경일 기준 운임 재계산으로 변경수수료 이외에 운임차액 및 TAX 가 추가될 수 있습니다.<br/>
                                                                        - 전체 미사용 항공권의 출발편 변경 유효기간은 항공사 규정 및 운임에 따라 상이하므로 문의바랍니다. <br/>
                                                                        <br/>[환불]<br/>
                                                                        - 사용구간 편도운임 및 환불수수료 공제 후 환불금이 발생되지 않을 수 있습니다.<br/>
                                                                        - 상기 환불규정은 항공운임에 적용되는 내용이며, 유류할증료 및 TAX(제세공과금)의 환불규정은
                                                                        각 정부지침 및 항공사규정에 따라 상이하므로 문의바랍니다.<br/>
                                                                        <br/>[NO-SHOW]<br/>
                                                                        - 예약취소/변경 없이 탑승하지 않는 경우<br/>
                                                                        - 변경 또는 환불수수료와 별도 적용<br/>
                                                                        - 항공사에서 NO-SHOW 발생 이후 잔여여정을 취소할 수 있습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>동반여행</dt>
                                                                    <dd></dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>추가요금</dt>
                                                                    <dd>
                                                                        <b>
                                                                            ※ 현재 조회 중인 운임 기준으로 추가요금이 이미 포함되어 있으며,
                                                                            해당항목에 제공되는 규정은 변경조건에 따라 추가될 수 있는 요금입니다.
                                                                            (변경/환불수수료 별도)
                                                                        </b>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>경유지체류</dt>
                                                                    <dd>
                                                                        총 4회 허용<br/>&nbsp;
                                                                        - 2회(무료) / 추가 2회(회당 200,000 원)<br/>&nbsp;
                                                                        - 호놀룰루 내에서 방향당 1회(무료)<br/>&nbsp;
                                                                        - 2회 허용 (회당 200,000 원)<br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>환승</dt>
                                                                    <dd>
                                                                        ※ 경유지 당일 연결이 불가한 경우 해당 공항 심야 이용이 불가 할 수 있으므로
                                                                        반드시 공항 운영 시간 확인 부탁 드립니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>비행편제한</dt>
                                                                    <dd>
                                                                        [서울-호놀룰루 구간 아래의 항공편 이용]<br/>&nbsp;
                                                                        - 하와이안항공에서 운항하는 하와이안항공 항공편<br/>
                                                                        [아래의 항공편 이용]<br/>&nbsp;
                                                                        - 하와이안항공에서 운항하는 하와이안항공 항공편<br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>신용카드</dt>
                                                                    <dd>
                                                                        사용가능<br/>
                                                                        - CHINA UNION PAY 및 미가맹점의 카드 사용불가<br/>
                                                                        - 탑승자 본인카드로만 결제 가능하며 공항수속시 결제카드를 확인할수 있습니다.
                                                                        (제시 못할경우 탑승이 거부 될수 있음)<br/>
                                                                        - 법인카드 : 재직증명서 원본 첨부 조건<br/>
                                                                        - 가족카드 : 주민등록 등본, 의료보험 카드, 가족관계 증명서 등 첨부 조건
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>수하물</dt>
                                                                    <dd>
                                                                        ※ 무료수하물 및 초과수하물 규정은 좌석등급 및 노선에 따라 상이하므로
                                                                        자세한 내용은 항공사 홈페이지
                                                                        <a href="https://hawaiianair-kr.custhelp.com/app/answers/detail/a_id/2555" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        또는 여행사 담당자에게 문의 부탁드립니다.<br/>
                                                                        ※ 항공사 요금규정에 무료수하물 내용이 누락된 경우 표기되지 않을 수 있으며,
                                                                        표기되지 않은 경우, 해당항공사에 문의 부탁드립니다.<br/>
                                                                        ※ 공동운항편, 타항공사 연결편, 24시간 이상 체류 일정, 해외출발 일정,
                                                                        특수 수하물의 경우 운항항공사에 따라 수하물 규정이 상이할 수 있습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>항공사마일리지</dt>
                                                                    <dd>
                                                                        ※ 항공사 마일리지 적립 여부 및 적립률은 운임별/제휴 회원사별로 상이하오니,
                                                                        자세한 내용은 항공사 홈페이지
                                                                        <a href="http://hawaiianair-kr.custhelp.com/app/answers/detail/a_id/2506/session/L3RpbWUvMTU2MDEyNzUyMC9zaWQvcFJkOUZUZ28%3D" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        또는 여행사 담당자에게 구매 전 문의 부탁드립니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>여행사 업무대행료</dt>
                                                                    <dd>
                                                                        ※ 항공권 발권 후 고객의 요청에 따른 취소,변경,환불 등의 작업 필요 시,
                                                                        여행사에서 취급하는 비용이므로 해당 비용에 대한 문의는 여행사로 하시기 바랍니다.<br/>
                                                                        ※ 발권 후 이루어지는 취소,변경,환불 등 모든 후속 업무는 여행사가 항공사를 통해 진행하는 추가 업무입니다.
                                                                        따라서 이에 대한 여행업무 취급 수수료는 항공사 수수료와 별도로 추가 징수되는 사항이니,
                                                                        신중한 결제 진행 부탁 드립니다.<br/>
                                                                        ※ 여행업무 취급수수료는 항공권을 취소/변경/환불하더라도 환불되지 않습니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>비동반 소아 규정</dt>
                                                                    <dd>
                                                                        ※ 동반자가 18세미만이거나 탑승클래스가 상이한 소아는 비동반 소아 서비스를 신청 하셔야 합니다.<br/>
                                                                        ※ 비동반 소아 서비스는 해당 항공사의 사전 승인 하에 이용 가능하며
                                                                        입국 국가 및 항공사별 서비스 대상 연령 및 규정이 상이하므로
                                                                        반드시 결제 1주일 전 담당자 확인 후 진행 부탁드립니다.<br/>
                                                                        ※ 비동반 소아 서비스는 별도의 서비스 수수료가 발생할 수 있습니다.<br/>
                                                                        ※ 공동운항편의 경우 실제 탑승항공사의 규정에 따라 서비스가 불가할 수 있습니다.<br/>
                                                                        ※ 자세한 내용은 항공사 홈페이지
                                                                        <a href="https://hawaiianair-kr.custhelp.com/app/answers/detail/a_id/2565" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        를 통해 확인 부탁드립니다.
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                            <div className="feeRule">
                                                                <dl>
                                                                    <dt>항공사 일반규정</dt>
                                                                    <dd>
                                                                        ※ 상기 모든 수수료는 1인/1회 기준 금액 입니다. <br/>
                                                                        <b>※ 예약일과 발권일이 상이한 경우 발권일의 환율에 따라 TAX(유류할증료 포함)가 변동될 수 있습니다.</b><br/>
                                                                        ※ 항공사의 사정으로 별도의 공지없이 운임 및 규정이 변경되어 운임 차액이 발생하는 경우 운임차액 추가 징수됩니다.<br/>
                                                                        ※ 항공권은 반드시 첫번째 여정부터 순서대로 사용하셔야하며,
                                                                        순서대로 이용하지 않은 항공권은 취소처리될 수 있으며, 환불불가합니다. <br/>
                                                                        ※ 동일 혹은 다수의 여행사를 통해 동일항공편을 이중예약하는 경우, 항공사에 의해 예약취소될 수 있으니 유의해 주시기 바랍니다. <br/>
                                                                        ※ 자세한 운송약관은 항공사 홈페이지
                                                                        <a href="https://www.hawaiianairlines.co.kr/legal/international-contract-of-carriage" style={{color: "red"}} target="_blank">[바로가기]</a>
                                                                        를 통해 확인 부탁드립니다.<br/>
                                                                        ※ 상기 운임규정 내에 [바로가기]를 통해 제공되는 항공사 홈페이지 내 정보 에 대해 한국어 지원이 불가한 경우,
                                                                        이용하시는 브라우저의 번역기능을 통해 확인하시거나 여행사 담당자에게 문의 부탁드립니다.<br/>
                                                                        <b>※ 하와이안항공 서울사무소는 미국 하와이안항공의 총판매대리점으로서 현금영수증 발행이 불가능함을 안내드리오니 이점 양해해주시기 바랍니다.</b><br/>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                        </div>

                                                        <div id="tab_bottom_3" className="tabcontent">
                                                        </div>

                                                        <div id="tab_bottom_4" className="tabcontent">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="scroll-element scroll-x scroll-scrolly_visible">
                                                <div className="scroll-element_outer">
                                                    <div className="scroll-element_size"></div>
                                                    <div className="scroll-element_track"></div>
                                                    <div className="scroll-bar" style={{width: "88px",}}></div>
                                                </div>
                                            </div>
                                            <div className="scroll-element scroll-y scroll-scrolly_visible">
                                                <div className="scroll-element_outer">
                                                    <div className="scroll-element_size"></div>
                                                    <div className="scroll-element_track"></div>
                                                    <div className="scroll-bar" style={{height: "93px", top: "0px",}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flightNoticeToggle">
                                        <span className="check">
                                            <input id="check013-a" type="checkbox"/>
                                            <label htmlFor="check013-a">동의</label>
                                        </span>
                                        <a>[일반/결제/환불/수하물 규정 관련 동의]</a>
                                    </div>
                                    <div className="flightNoticeCont maxHnone">
                                        <div className="scroll-wrapper flightNoticeContInner scrollbar-inner" style={{position: "relative"}}>
                                            <div
                                                className="flightNoticeContInner scrollbar-inner scroll-content scroll-scrolly_visible"
                                                style={{height: "auto", marginBottom: "0px", marginRight: "0px",}}>
                                                <div className="flightNoticeContInside">
                                                    <div className="box-scroll wd600px">
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt", textIndent:-"18.0pt",}}>
                                                            <b style={{textIndent: "-20pt;"}}><span style={{fontFamily: "돋움", fontSize: "10pt"}}>■&nbsp;</span></b>
                                                            <b><span style={{fontSize:"11.0pt", lineHeight:"107%",}}>일반 규정<span lang="EN-US"></span></span></b>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">1)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>마일리지<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            마일리지는 실제 탑승하는 탑승객 본인의 마일리지번호로만 적립이 가능하며<span lang="EN-US">, </span>
                                                            유아 탑승객인 경우는 적립이 불가합니다<span lang="EN-US">. </span>
                                                            탑승하는 캐빈클라스 및 부킹클라스 별로 마일리지 적립가능 여부와 적립률이 상이하므로<span lang="EN-US">, </span>
                                                            예약된 항공사 사이트 및 고객센터를 통해 사전 확인 부탁 드립니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">2)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>탑승객이름<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            탑승객의 영문이름은 유효한 여권의 영문성<span lang="EN-US">, </span>
                                                            영문이름과 반드시 동일해야 하며<span lang="EN-US">, </span>
                                                            상이할 경우 탑승에 제한이 되니 반드시 유의해주시기 바랍니다<span lang="EN-US">.</span>
                                                            항공권 발권 이후 탑승객의 영문명 변경이 제한되며<span lang="EN-US">, </span>
                                                            케이스에 따라 변경수수료 및 환불 수수료를 지불하고 탑승객 이름을 변경해야하는 경우가 있으니 주의하시기 바랍니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">3)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>날짜변경 및 예약<span lang="EN-US">/</span>변경 이후 <span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            개인 사유에 의해 항공권 날짜 변경을 진행해야 하는 경우
                                                            여행사 <span style={{color:"red"}}>변경취급수수료<span lang="EN-US">30,000</span>원
                                                            <span lang="EN-US">(</span>성인<span lang="EN-US">,</span>
                                                            소아<span lang="EN-US">/1</span>인 기준<span lang="EN-US">) </span></span>추가 발생됩니다<span lang="EN-US">. </span>
                                                            항공권을 구매하신 이후 날짜 변경이 필요하신 경우는 항공사에서 지정한
                                                            항공권 변경 규정을 따르며<span lang="EN-US">, </span>
                                                            반드시 현대드림투어<span lang="EN-US">(</span>고객센터 및 온라인문의<span lang="EN-US">)</span>를 통해
                                                            날짜 변경 요청해주시기 바랍니다<span lang="EN-US">.</span><span lang="EN-US"> </span>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            예약완료 및 예약변경된 내용은 담당자가 메일로 안내 드리니<span lang="EN-US">, </span>
                                                            예약시 정확한 이메일 주소를 입력해주시기 바랍니다<span lang="EN-US">. </span>
                                                            고지한 변경관련 내용을 확인하지 않아 발생되는 불이익에 대해서 온라인몰에서는 책임지지 않습니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            출발 <span lang="EN-US">72</span>시간<span lang="EN-US">~ 24</span>시간전
                                                            예약한 항공권에 변동 사항이 없는 반드시 재확인 해주시기 바랍니다<span lang="EN-US">. (</span>
                                                            중국과 미주지역을 여행하는 고객의 경우 현지연락처 입력해주시기 바랍니다<span lang="EN-US">) &nbsp;</span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">4)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>경유지 체류<span lang="EN-US"> (STOP-OVER) </span>및 날짜 조회<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            여행 중 경유지 체류를 원하시는 경우 추가 비용이 발생할 수 있으며<span lang="EN-US">, </span>
                                                            체류시 해당 국가의 비자를 꼭 확인하여 주시기 바랍니다<span lang="EN-US">. </span>
                                                            일부 경유지의 경우 체류가 불가한 지역이 있을 수 있습니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoNormal">날짜 조회의 경우 <span lang="EN-US">1</span>년 미만의 출발일의 예약 조회만 가능하며<span lang="EN-US">, </span>
                                                            귀국일 변경 또는 재발행시<span lang="EN-US">, </span>
                                                            항공사에서 지정한 변경 가능일자 내에서만 날짜 변경이 가능하며 해당 항공권의 운임규정을 반드시 확인 해주시기 바랍니다<span lang="EN-US">.</span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">5)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>이중예약 및 양도<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            동일날짜<span lang="EN-US">/</span>여정을 중복 예약하거나<span lang="EN-US">, </span>
                                                            동일한 영문명을 여러 번 재예약하는 경우 항공사에 의해 사전 고지없이 예약이 취소 될 수 있습니다<span lang="EN-US">. </span>
                                                            이 경우 여행사는 취소에 대한 책임을 지지 않습니다<span lang="EN-US">.</span>
                                                        </p>
                                                        <p className="MsoNormal">타인에게 항공권 양도는 원칙적으로 불가 합니다<span lang="EN-US">.</span></p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">6)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>티켓사용<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            항공권은 반드시 첫번째 여정부터 순차적으로 사용하여야 하며<span lang="EN-US">, </span>
                                                            역순 사용 또는 이중 구매한 항공권에 대한 교차사용 역시 불가하며 이에 대한 불이익은 당사에서 책임지지 않습니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">7)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>임신중 여행<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            임산부 또는 유아를 동반한 임신부 승객은 결제전 탑승 항공사로부터 탑승 가능 여부 및
                                                            탑승 가능한 서류를 반드시 구비하고 확인하신 이후 예약<span lang="EN-US">/</span>결제 해주시기 바랍니다<span lang="EN-US">.</span>
                                                        </p>
                                                        <p className="MsoNormal"><span lang="EN-US">&nbsp;</span></p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b style={{textIndent: "-20pt;"}}><span style={{fontFamily: "돋움", fontSize: "10pt"}}>■&nbsp;</span></b>
                                                            <b><span style={{fontSize:"11.0pt",lineHeight:"107%",}}>결제 규정<span lang="EN-US"></span></span></b>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">1)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>카드결제<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            항공료 결제는 탑승객 본인 명의의 신용카드로 결제하여야 합니다<span lang="EN-US">. </span>
                                                            본인 명의의 신용카드가 아닌 <span lang="EN-US">3</span>자 카드
                                                            <span lang="EN-US">(</span>타인<span lang="EN-US">,</span>법인카드<span lang="EN-US">) </span>
                                                            이용시 카드 소유주 동의 없이 결제가 불가능 하며<span lang="EN-US">, </span>
                                                            본인과의 관계서류를 추가해야 합니다<span lang="EN-US">. </span>
                                                            본인 명의의 신용카드가 아닌<span lang="EN-US"> 3</span>자 카드 이용시
                                                            출국당일 공항 체크인카운터에서 항공사가 승객에게 결제 카드 원본에 대한 확인을 요구 할 수 있으며<span lang="EN-US">, </span>
                                                            이때 결제 카드를 제시하지 못하는 경우 탑승이 거부될 수 있으며<span lang="EN-US">, </span>
                                                            불이익에 대해 당사는 책임지지 않으므로 유의하시기 바랍니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            <span lang="EN-US">- </span>가족카드<span lang="EN-US"> : </span>주민등록등본 또는 가족관계증명서
                                                            <span lang="EN-US">(</span>관계 증빙이 불가능한 경우 사용 불가<span lang="EN-US">)</span>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            <span lang="EN-US">- </span>법인카드<span lang="EN-US"> : </span>사업자등록증<span lang="EN-US">, </span>재직증명서<span lang="EN-US"></span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">2)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>대한항공<span lang="EN-US"> ARS </span>인증<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            대한항공 결제 시 신용카드 인증 시스템을 통한 인증절차를 진행하게 됩니다<span lang="EN-US">. </span>
                                                            이 경우<span lang="EN-US">, </span>항공 담당직원이 카드소유주에게 유선상으로 연락하여
                                                            인증절차를 진행 한 후 결제 및 발권을 진행합니다<span lang="EN-US">. </span>
                                                            이때 통화 연결이 되지 않아<span lang="EN-US"> ARS </span>인증이 불가능할 경우
                                                            결제<span lang="EN-US">/</span>발권은 정상 진행 되지 않으며<span lang="EN-US">, </span>
                                                            발권시한이 지난 경우 예약은 자동 취소 되니 유의 부탁 드립니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">3)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>자동발권 및 결제 시한<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            항공사별 자동발권 시간은 운영시간 내에 이루어지며<span lang="EN-US">, </span>
                                                            이외 시간에 요청된 자동발권은 익일 업무시간에 발권 진행 되니 참고 부탁 드립니다<span lang="EN-US">. </span>
                                                            항공권 발권이 완료된 이후에는 결제 수단 변경이 불가능 합니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            예약이 완료되면 결제시한이 안내 되며<span lang="EN-US">, </span>
                                                            항공사의 사정 등으로 사전 통보 없이 결제시한이 변경 될 수 있습니다<span lang="EN-US">. </span>
                                                            결제시한이 주말 및 공휴일인 경우에는 예약된 요금 및 항공사에 따라
                                                            결제 및 발권 진행이 제한될 수 있습니다<span lang="EN-US">.&nbsp;</span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">4)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>유류할증료 및 제세공과금<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            유류할증료와 제세공과금을 결제일 기준 환율로 적용됩니다<span lang="EN-US">. </span>
                                                            따라서 결제일의 환율에 따라 사전 공지 없이 요금이 변경 될 수 있습니다<span lang="EN-US">. (</span>
                                                            최초 예약 시 안내 받은 항공요금과 실제 결제일의 항공요금이 상이 할 수 있습니다<span lang="EN-US">)</span>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b><span lang="EN-US">5)<span style={{fontVariantNumeric: "normal", fontVariantEastAsian: "normal", fontWeight: "normal", fontStretch: "normal", fontSize: "7pt", lineHeight: "normal",}}>&nbsp;&nbsp;&nbsp;</span></span></b>
                                                            <b>미확정 운임<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            미확정 운임의 경우 항공 담당자의 운임확인이 필요한 예약이며<span lang="EN-US">, </span>
                                                            담당자의 확인 후 운임이 확정 상태로 변경 됩니다<span lang="EN-US">. </span>
                                                            운임 확정시 기존의 운임보다 인상 될 수 있으며 재예약시 좌석 확보가 되지 않을 수 있습니다<span lang="EN-US">. </span>
                                                            결제시한 내에 운임이 확정 되지 않은 경우<span lang="EN-US">, </span>
                                                            예약이 자동 취소 될 수 있습니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoNormal"><span lang="EN-US">&nbsp;</span></p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b style={{textIndent: "-20pt;"}}><span style={{fontFamily: "돋움", fontSize: "10pt"}}>■&nbsp;</span></b>
                                                            <b><span style={{fontSize:"11.0pt",lineHeight:"107%",}}>환불규정 <span lang="EN-US"></span></span></b>
                                                        </p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",}}>
                                                            <b>환불 요청<span lang="EN-US">/</span>기간 및 환불 수수료<span lang="EN-US"></span></b>
                                                        </p>
                                                        <p className="MsoNormal" style={{textIndent: "10.0pt",}}>
                                                            해당 온라인몰에서 구매하신 항공권은 현대드림투어에서만 환불이 가능하며<span lang="EN-US">, </span>
                                                            해당 항공사로 직접 환불 요청이 진행된 경우는 당사에서 처리가 불가합니다<span lang="EN-US">. </span>
                                                            불가항력적인 사유<span lang="EN-US">(</span>국가적 질병<span lang="EN-US">, </span>
                                                            재난 등<span lang="EN-US">)</span>의 사유로 인한 변경<span lang="EN-US">, </span>
                                                            취소 시 항공사에 따라 수수료 감면 요청이 가능합니다<span lang="EN-US">. </span>
                                                            자세한 절차는 케이스별로 상이하니<span lang="EN-US">, </span>
                                                            반드시 현대드림투어와 사전 확인 받으시기 바랍니다<span lang="EN-US">. (</span>
                                                            필요 서류 제출시<span lang="EN-US">) </span>항공권 환불은 평일 영업시간
                                                            <span lang="EN-US" style={{color:"red"}}>9</span><span style={{color:"red"}}>시 <span lang="EN-US">- 16</span>시내 </span>신청한 건에 한해 진행이 가능합니다<span lang="EN-US"> (</span>
                                                            주말<span lang="EN-US">, </span>공휴일 환불 신청 시 가장 가까운 영업일<span lang="EN-US">, </span>영업시간에 처리됨<span lang="EN-US">)</span>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            환불금액 카드 반영까지는 항공사의 사정에 따라 다르게 소요됩니다<span lang="EN-US">. </span>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            환불 수수료는 항공사에서 지정해놓은 환불규정에 따르며<span lang="EN-US">, </span>
                                                            환불 요청 전 환불규정을 반드시 확인해주시기 바랍니다<span lang="EN-US">. </span>
                                                            환불 진행 시 여행사 환불취급수수료 <span lang="EN-US" style={{color:"red"}}>30,000</span><span style={{color:"red"}}>원를 </span>
                                                            지불하셔야 환불 진행이 가능합니다<span lang="EN-US">. </span>
                                                            <span lang="EN-US" style={{color:"red"}}>(</span><span style={{color:"red"}}>성인<span lang="EN-US">/</span>아동<span lang="EN-US">, 1</span>인 기준<span lang="EN-US">) &nbsp;</span></span><span lang="EN-US"></span>
                                                        </p>
                                                        <p className="MsoListParagraph"><span lang="EN-US">&nbsp;</span></p>
                                                        <p className="MsoListParagraph" style={{marginLeft:"18.0pt",textIndent:-"18.0pt",}}>
                                                            <b style={{textIndent: "-20pt;"}}><span style={{fontFamily: "돋움", fontSize: "10pt"}}>■&nbsp;</span></b>
                                                            <b><span style={{fontSize:"11.0pt",lineHeight:"107%",}}>수하물 규정<span lang="EN-US"></span></span></b>
                                                        </p>
                                                        <p className="MsoNormal">
                                                            &nbsp;<span style={{textIndent: "10pt"}}>항공사 및 노선</span><span lang="EN-US" style={{textIndent: "10pt"}}>, </span>
                                                            <span style={{textIndent: "10pt"}}>좌석등급에 따라 제공되는 무료수하물이 상이하오니 
                                                                발권된 티켓상 혹은 항공사를 통해 정확한 수하물 규정을 꼭확인하시기 바랍니다</span><span lang="EN-US" style={{textIndent: "10pt"}}>. </span>
                                                            <span style={{textIndent: "10pt"}}>티켓상 수하물이 누락된 경우에는 반드시 항공사를 통해 확인 해주세요</span>
                                                            <span lang="EN-US" style={{textIndent: "10pt"}}>. (</span><span style={{textIndent: "10pt"}}>요금규정 및 수하물 규정에 따라 수하물이 제공되지 않는 경우도 있으니 예약시 주의 부탁 드립니다</span><span lang="EN-US" style={{textIndent: "10pt"}}>). </span>
                                                            <span style={{textIndent: "10pt"}}>추가 수하물 구매시 항공사 홈페이지 또는 콜센터를 통해 진행 가능합니다</span>
                                                            <span lang="EN-US" style={{textIndent: "10pt"}}>.</span>
                                                        </p>
                                                        <p className="MsoNormal">&nbsp;</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="scroll-element scroll-x scroll-scrolly_visible">
                                                <div className="scroll-element_outer">
                                                    <div className="scroll-element_size"></div>
                                                    <div className="scroll-element_track"></div>
                                                    <div className="scroll-bar" style={{width: "88px",}}></div>
                                                </div>
                                            </div>
                                            <div className="scroll-element scroll-y scroll-scrolly_visible">
                                                <div className="scroll-element_outer">
                                                    <div className="scroll-element_size"></div>
                                                    <div className="scroll-element_track"></div>
                                                    <div className="scroll-bar" style={{height: "93px", top: "0px",}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="btnArea mgt_30">
                            <a className="lbtn btn-large filled" style={{background: "#4a6cb3", border:"1px solid #4a6cb3",}}
                               // onClick="showCodeShareInfo()"
                               onClick={() => showCodeShareInfo()}
                            >확인</a>
                        </div>
                        <div className="txt-c mgt_20">
                            <a className="btn_allReset"
                               // onClick="clearTicketRuleAndInfoCheck()"
                               onClick={() => clearTicketRuleAndInfoCheck()}
                           >전체 초기화</a>
                        </div>
                    </div>
                </div>
            </div>

            <pre id="htmlTempProcess" style={{display: "none",}}>
                ※ 상기 모든 수수료는 1인/1회 기준 금액 입니다. <br/>
                <b>※ 예약일과 발권일이 상이한 경우 발권일의 환율에 따라 TAX(유류할증료 포함)가 변동될 수 있습니다.</b><br/>
                ※ 항공사의 사정으로 별도의 공지없이 운임 및 규정이 변경되어 운임 차액이 발생하는 경우 운임차액 추가 징수됩니다.<br/>
                ※ 항공권은 반드시 첫번째 여정부터 순서대로 사용하셔야하며, 순서대로 이용하지 않은 항공권은 취소처리될 수 있으며, 환불불가합니다. <br/>
                ※ 동일 혹은 다수의 여행사를 통해 동일항공편을 이중예약하는 경우, 항공사에 의해 예약취소될 수 있으니 유의해 주시기 바랍니다. <br/>
                ※ 자세한 운송약관은 항공사 홈페이지 <a href="https://www.hawaiianairlines.co.kr/legal/international-contract-of-carriage" style={{color: "red"}} target="_blank">[바로가기]</a> 를 통해 확인 부탁드립니다.<br/>
                ※ 상기 운임규정 내에 [바로가기]를 통해 제공되는 항공사 홈페이지 내 정보 에 대해 한국어 지원이 불가한 경우, 
                이용하시는 브라우저의 번역기능을 통해 확인하시거나 여행사 담당자에게 문의 부탁드립니다.<br/>
                <b>※ 하와이안항공 서울사무소는 미국 하와이안항공의 총판매대리점으로서 현금영수증 발행이 불가능함을 안내드리오니 이점 양해해주시기 바랍니다.</b><br/>
            </pre>
            <div id="costDefineInformation" className="full-layer" style={{display: "none",}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>요금규정</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="removeCostRule()"
                               onClick={() => removeCostRule()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <p className="f13 gray mgb_20">
                                전체 여정에 <span className="cRed">상이한 운임과 규정</span>이 적용되었으며,
                                각 운임 규정 중 가장 제한적인 규정이 적용됩니다.
                                이와 관련한 상세 운임규정은 담당자를 통해서 재확인 하시기 바랍니다.
                            </p>

                            <div className="tabArea2 full seatBtn">
                                <div className="tab02">
                                    <ul className="tab seat-btn" id="ruleList">
                                        <li className="current" data-tab="tab11"
                                            // onClick="changeCostTab(this)"
                                            onClick={() => changeCostTab(this)}
                                        ><a>요금규정1</a></li>
                                        <li data-tab="tab22"
                                            // onClick="changeCostTab(this)"
                                            onClick={() => changeCostTab(this)}
                                        ><a>요금규정2</a></li>
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

            <div id="travelDetailInformation" className="full-layer" style={{display: "none",}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>상세 스케줄</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="removeDetailTravelInfo()"
                               onClick={() => removeDetailTravelInfo()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox" id="airTimeLineArea"></div>
                    </div>
                </div>
            </div>

            <div id="travelCompanionInformation" className="full-layer" style={{display: "none",}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>여행자 선택</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="closeCompanionList()"
                               onClick={() => closeCompanionList()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <section className="mgb_0" id="companionListArea_none">
                            <div className="box2">
                                {/*{ <!-- 등록된 여행자 없음 -->}*/}
                                <div className="ticketWrap">
                                    <div className="errorNo_wrap">
                                        <div className="errorNo">
                                            <strong>등록된 여행자 정보가 없습니다.</strong>
                                            <div className="sch_btn">
                                                <a className="go colBlue mgt_15"
                                                   // onClick="newCompanionArea()"
                                                   onClick={() => newCompanionArea()}
                                                >여행자 등록</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="companionListArea_list">
                            <div className="boxCont">
                                <div className="pdb_20">
                                    <ul className="detailRule pdt_0 noneborder" id="companionInfoListArea">
                                    </ul>
                                </div>
                                <div className="btnArea">
                                    <a className="lbtn btn-large filled mgt_30 mgb_20 "
                                       style={{background: "#4a6cb3", border:"1px solid #4a6cb3",}}
                                       // onClick="selectPassenger()"
                                       onClick={() => selectPassenger()}
                                    >확인</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div id="C4_b" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>여행자 등록 및 수정</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="putNewCompanion(false)"
                               onClick={() => putNewCompanion(false)}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <section>
                            <div className="box">
                                <div className="info_form" id="companionInfo" data1="">
                                    <div className="flexWrap">
                                        <div className="flexCont">
                                            <dl className="inputArea">
                                                <dt><i className="err bgiNone">*</i> 한글 성</dt>
                                                <dd>
                                                    <input type="text" id="kor_name_last" data1="true"
                                                           className="mgt_10" placeholder="예)홍"
                                                           onChange="checkStringValue(this)"/>
                                                </dd>
                                            </dl>
                                        </div>
                                        <div className="flexCont mgl_5">
                                            <dl className="inputArea">
                                                <dt><i className="err bgiNone">*</i> 한글 이름</dt>
                                                <dd>
                                                    <input type="text" id="kor_name_first" data1="true"
                                                           className="mgt_10" placeholder="예)길동"
                                                           onChange="checkStringValue(this)"/>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="flexWrap">
                                        <div className="flexCont">
                                            <dl className="inputArea">
                                                <dt><i className="err bgiNone">*</i> 영문 성</dt>
                                                <dd>
                                                    <input type="text" id="eng_name_last" data1="false"
                                                           className="mgt_10" placeholder="예)HONG"
                                                           onChange="checkStringValue(this)"/>
                                                </dd>
                                            </dl>
                                        </div>
                                        <div className="flexCont mgl_5">
                                            <dl className="inputArea">
                                                <dt><i className="err bgiNone">*</i> 영문 이름</dt>
                                                <dd>
                                                    <input type="text" id="eng_name_first" data1="false"
                                                           className="mgt_10" placeholder="예)GILDONG"
                                                           onChange="checkStringValue(this)"/>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <dl className="inputArea">
                                        <dt><i className="err bgiNone">*</i> 생년월일</dt>
                                        <dd>
                                            <input type="text" className="mgt_10" id="birthday"
                                                   placeholder="예)1996-06-21"/>
                                        </dd>
                                        <dt><i className="err bgiNone">*</i> 성별</dt>
                                        <dd id="companionInsertArea">
                                            <a data1="1" id="male" className="inpax on"
                                               // onClick="changeGenderType(this)"
                                               onClick={(event) => changeGenderType(event.currentTarget)}
                                            >남성</a>
                                            <a data1="2" id="female" className="inpax"
                                               // onClick="changeGenderType(this)"
                                               onClick={(event) => changeGenderType(event.currentTarget)}
                                            >여성</a>
                                        </dd>
                                        <dt>국적</dt>
                                        <dd>
                                            <div className="mgt_10">
                                                <select id="nationalType">
                                                    <option value="미국">미국</option>
                                                    <option value="호주">호주</option>
                                                    <option value="대한민국" selected="">대한민국</option>
                                                    <option value="일본">일본</option>
                                                    <option value="중국">중국</option>
                                                </select>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                                <div className="btnArea">
                                    <a className="lbtn btn-large filled mgt_30 mgb_20 "
                                       style={{background: "#4a6cb3", border:"1px solid #4a6cb3",}}
                                       // onClick="putNewCompanion(true)"
                                       onClick={() => putNewCompanion(true)}
                                    >확인</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div id="freeBagInfo" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>항공사 수하물</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="closePopup('freeBagInfo')"
                               onClick={() => closePopup('freeBagInfo')}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <ul className="airlineBaggage">
                                <li><a href="http://www.laoairlines.co.kr/theme/home/html/board/carrier.php"
                                    target="_blank">라오항공(QV)</a></li>
                                <li><a
                                    href="https://www.garuda-indonesia.com/id/en/garuda-indonesia-experience/on-ground/baggage/index"
                                    target="_blank">가루다인도네시아(GA)</a></li>
                                <li><a
                                    href="https://www.flysaa.com/manage-fly/baggage/checked-baggage/additional-baggage"
                                    target="_blank">남아프리카항공(SA)</a></li>
                                <li><a
                                    href="https://www.klm.com/travel/kr_ko/prepare_for_travel/baggage/excess/index.htm"
                                    target="_blank">네델란드항공(KL)</a></li>
                                <li><a href="https://www.airnewzealand.co.kr/excess-baggage"
                                       target="_blank">뉴질랜드항공(NZ)</a></li>
                                <li><a href="https://www.koreanair.com/ot/ko/airport/baggage/checked/excess"
                                       target="_blank">대한항공(KE)</a></li>
                                <li><a
                                    href="https://ko.delta.com/kr/ko/baggage/checked-baggage/excess-overweight-baggage"
                                    target="_blank">델타항공(DL)</a></li>
                                <li><a href="https://www.latam.com/en_un/travel-information/baggage/excess-baggage/"
                                       target="_blank">란칠레항공(LA )</a></li>
                                <li><a href="https://www.aeroflot.ru/ru-ko/information/preparation/luggage"
                                       target="_blank">러시아항공(SU)</a></li>
                                <li><a href="https://www.lufthansa.com/kr/ko/excess-baggage"
                                       target="_blank">루프트한자항공(LH)</a></li>
                                <li><a
                                    href="https://www.mandarin-airlines.com/Content/Airport_Passenger_Service-2017020003-95#p2_5"
                                    target="_blank">만다린항공(AE)</a></li>
                                <li><a
                                    href="https://www.malaysiaairlines.com/kr/en/plan-your-trip/baggage/extra-baggage.html"
                                    target="_blank">말레이시아항공(MH)</a></li>
                                <li><a href="https://www.airmauritius.com/baggage/additional#excess_bag"
                                       target="_blank">모리셔스항공(MK)</a></li>
                                <li><a href="https://www.miat.com/pagecontent.php?pageId=159&amp;lang=en#"
                                       target="_blank">몽골항공(OM)</a></li>
                                <li><a
                                    href="https://www.vietnamairlines.com/kr/ko/travel-information/baggage/excess-baggage"
                                    target="_blank">베트남항공(VN)</a></li>
                                <li><a
                                    href="https://www.vietjetair.com/ko/pages/%ED%8E%B8%EC%95%88%ED%95%9C-%EB%B9%84%ED%96%89%EC%9D%84-%EC%9C%84%ED%95%B4-1599448831356/%EC%88%98%ED%95%98%EB%AC%BC-%EA%B7%9C%EC%A0%95-1607068114735"
                                    target="_blank">비엣젯항공(VJ)</a></li>
                                <li><a href="http://www.srilankan.com/en_uk/plan-and-book/luggage-revamp"
                                       target="_blank">스리랑카항공(UL)</a></li>
                                <li><a href="https://www.swiss.com/ch/en/book-and-manage/swiss-choice/additional-bag"
                                       target="_blank">스위스항공(LX)</a></li>
                                <li><a href="https://www.flysas.com/en/travel-info/baggage/buy-extra/"
                                       target="_blank">스칸디나비아항공(SK)</a></li>
                                <li><a href="https://www.flyscoot.com/ko/fly-scoot/before-you-fly/baggage"
                                       target="_blank">스쿠트항공(TZ)</a></li>
                                <li><a
                                    href="https://global.shenzhenair.com/zhair/ibe/static/pages/wcm/ko/07-3-3-2-RegisteredLuggage_ko.html"
                                    target="_blank">심천항공(ZH)</a></li>
                                <li><a
                                    href="https://www.singaporeair.com/ko_KR/kr/travel-info/baggage/baggage-allowance/"
                                    target="_blank">싱가폴항공(SQ)</a></li>
                                <li><a
                                    href="https://www.american-airlines.co.kr/i18n/travel-info/baggage/oversize-and-overweight-baggage.jsp"
                                    target="_blank">아메리칸항공(AA)</a></li>
                                <li><a href="https://flyasiana.com/C/KR/KO/contents/excess-baggage"
                                       target="_blank">아시아나항공(OZ)</a></li>
                                <li><a href="https://www.alitalia.com/en_en/fly-alitalia/baggage/checked-baggage.html"
                                       target="_blank">알리탈리아항공(AZ)</a></li>
                                <li><a
                                    href="https://www.emirates.com/kr/korean/before-you-fly/baggage/purchase-additional-baggage-allowance/"
                                    target="_blank">에미레이트항공(EK)</a></li>
                                <li><a
                                    href="https://www.evaair.com/ko-kr/fly-prepare/baggage/excess-baggage-and-other-optional-fees/"
                                    target="_blank">에바항공(BR)</a></li>
                                <li><a href="https://www.aeromexico.com/en-us/travel-information/baggage/excess-baggage"
                                       target="_blank">에어로멕시코(AM)</a></li>
                                <li><a href="https://www.airmacau.com.mo/#/overWeightKR?__parameter=eyJmcm9tIjoiIn0"
                                       target="_blank">에어마카오(NX)</a></li>
                                <li><a href="https://airastana.com/kaz/en-us/Information/Baggage"
                                       target="_blank">에어아스타나(KC)</a></li>
                                <li><a href="http://www.airindia.co.kr/sub4_2.php" target="_blank">에어인디아(AI)</a></li>
                                <li><a href="https://di.aircalin.com/en/a-la-carte-services/extra-baggage"
                                       target="_blank">에어칼린(SB)</a></li>
                                <li><a href="https://www.aircanada.com/kr/ko/aco/home/legal/products-and-services.html"
                                       target="_blank">에어캐나다(AC)</a></li>
                                <li><a
                                    href="https://www.airfrance.co.kr/KR/ko/common/guidevoyageur/pratique/bagages-soute-airfrance.htm"
                                    target="_blank">에어프랑스(AF)</a></li>
                                <li><a
                                    href="https://www.ethiopianairlines.com/aa/information/baggage-information/excess-and-special-baggage"
                                    target="_blank">에티오피아항공(ET)</a></li>
                                <li><a href="https://www.etihad.com/ko-kr/fly-etihad/baggage/excess"
                                       target="_blank">에티하드항공(EY)</a></li>
                                <li><a href="https://www.elal.com/en/PassengersInfo/Baggage/Pages/Excess-Baggage.aspx"
                                       target="_blank">엘알이스라엘항공(LY)</a></li>
                                <li><a
                                    href="https://www.britishairways.com/ko-kr/information/baggage-essentials/checked-baggage-allowances"
                                    target="_blank">영국항공(BA)</a></li>
                                <li><a href="https://www.austrian.com/us/en/excess-baggage"
                                       target="_blank">오스트리아항공(OS)</a></li>
                                <li><a href="https://www.uzairways.com/en/extra-baggage"
                                       target="_blank">우즈베키스탄항공(HY)</a></li>
                                <li><a href="https://www.united.com/ko/kr/baggage-calculator/any-flights"
                                       target="_blank">유나이티드항공(UA)</a></li>
                                <li><a href="https://www.uniair.com.tw/rwd/CMS/service/luggage_information#a3"
                                       target="_blank">유니항공(B7)</a></li>
                                <li><a href="https://www.jal.co.jp/kr/ko/travelinfo/" target="_blank">일본항공(JL)</a></li>
                                <li><a
                                    href="https://www.ana.co.jp/ko/kr/travel-information/baggage-information/checked-baggage/"
                                    target="_blank">전일본공수(NH)</a></li>
                                <li><a href="https://www.jejuair.net/jejuair/serviceinfo/airport/baggage_service.jsp"
                                       target="_blank">제주항공(7C)</a></li>
                                <li><a href="https://www.airchina.kr/KR/KO/info/checked-baggage/overweight-charge.html"
                                       target="_blank">중국국제항공(CA)</a></li>
                                <li><a href="http://www.csair.com/kr/ko/tourguide/luggage_service/excess-luggage/"
                                       target="_blank">중국남방항공(CZ)</a></li>
                                <li><a
                                    href="https://kr.ceair.com/newCMS/kr/ko/content/ko_Header/headerBottom/service_1/baggageService/baggage/201903/t20190329_4695.html"
                                    target="_blank">중국동방항공(MU)</a></li>
                                <li><a
                                    href="https://www.xiamenair.com/ko-kr/article-detail?articleLink=%2Fcms-i18n-ow%2Fcms-ko-kr%2Fcontents%2F43888.json"
                                    target="_blank">중국하문항공(MF)</a></li>
                                <li><a
                                    href="https://www.hainanairlines.com/HUPortal/dyn/portal/DisplayPage?COUNTRY_SITE=US&amp;SITE=CBHZCBHZ&amp;LANGUAGE=US&amp;PAGE=CXXL"
                                    target="_blank">중국해남항공(HU)</a></li>
                                <li><a
                                    href="https://www.china-airlines.com/kr/ko/fly/prepare-for-the-fly/baggage/excess-baggage"
                                    target="_blank">중화항공(CI)</a></li>
                                <li><a href="https://www.jinair.com/ready/baggage" target="_blank">진에어(LJ)</a></li>
                                <li><a href="https://www.csa.cz/kr-ko/travel-information/before-the-flight/baggage/"
                                       target="_blank">체코항공(OK)</a></li>
                                <li><a href="https://www.qatarairways.com/ko-kr/baggage/excess.html"
                                       target="_blank">카타르항공(QR)</a></li>
                                <li><a href="https://www.cambodiaangkorair.com/post-category/22/baggage-information"
                                       target="_blank">캄보디아앙코르항공(K6)</a></li>
                                <li><a
                                    href="https://www.cathaypacific.com/cx/ko_KR/manage-booking/travel-extras/prepaid-extra-baggage.html"
                                    target="_blank">캐세이패시픽(CX)</a></li>
                                <li><a
                                    href="https://www.kenya-airways.com/prepare-for-travel/baggage-information/excess-baggage-charges/en/"
                                    target="_blank">케냐항공(KQ)</a></li>
                                <li><a href="https://www.qantas.com/kr/en/travel-info/baggage/additional-baggage.html"
                                       target="_blank">콴타스항공(QF)</a></li>
                                <li><a
                                    href="http://www.thaiairways.com/ko_KR/plan_my_trip/travel_information/Baggage.page"
                                    target="_blank">타이항공(TG)</a></li>
                                <li><a href="https://www.latam.com/en_un/travel-information/baggage/excess-baggage/"
                                       target="_blank">탐항공(JJ)</a></li>
                                <li><a href="https://www.turkishairlines.com/en-kr/any-questions/excess-baggage/"
                                       target="_blank">터키항공(TK)</a></li>
                                <li><a
                                    href="https://www.twayair.com/app/serviceInfo/luggageAmtCal?returnUrl=/app/serviceInfo/contents/1148"
                                    target="_blank">티웨이항공(TW)</a></li>
                                <li><a
                                    href="https://www.finnair.com/kr-ko/finnair-%ED%95%AD%EA%B3%B5%ED%8E%B8-%EC%88%98%ED%95%98%EB%AC%BC/%EC%B6%94%EA%B0%80-%EC%88%98%ED%95%98%EB%AC%BC-%EC%9A%94%EA%B8%88"
                                    target="_blank">핀에어(AY)</a></li>
                                <li><a href="http://www.philippineair.co.kr/ko/service/baggage_rules.asp"
                                       target="_blank">필리핀항공(PR)</a></li>
                                <li><a href="https://hawaiianair-kr.custhelp.com/app/answers/detail/a_id/2555#Korea"
                                       target="_blank">하와이안항공(HA)</a></li>
                                <li><a
                                    href="https://www.hkexpress.com/ko/plan/travel-information/baggage-information/baggage-fee/"
                                    target="_blank">홍콩익스프레스(UO)</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="covidArea" className="full-layer" style={{display: "none",}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>코로나 안전정보</h1>
                            <a className="btnClose full-pop-close"
                                // onClick="closePopup('covidArea')"
                                onClick={() => closePopup('covidArea')}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <p className="f13 gray mgb_20">
                                코로나19의 전 세계적 확산으로 각국의 입국조치가 자주 변동되고 있으니,
                                출국 전 입국 예정 국가 주한공관 홈페이지 등을 통해 입국조건을 반드시 확인하시기 바랍니다.
                            </p>

                            <div className="tabArea2 full seatBtn">
                                <div className="tab02">
                                    <ul className="tab seat-btn" id="tabBtnArea">
                                        <li data-tab="tab_covid_kr" className="on current"><a>대한민국</a></li>
                                    </ul>
                                </div>

                                <div id="tab_covid_1" className="tabcontent current">
                                </div>

                                <div id="tab_covid_2" className="tabcontent">
                                </div>

                                <div id="tab_covid_3" className="tabcontent">
                                </div>

                                <div id="tab_covid_4" className="tabcontent">
                                </div>

                                <div id="tab_covid_kr" className="tabcontent current">
                                    <br/>
                                    <p className="f13 gray mgb_20">한국입국 시 자가격리 관련 상세 내용은 아래의 보건복지부 및 질병관리청 정보 확인 부탁드립니다.</p>
                                    <a href="http://ncov.mohw.go.kr/shBoardView.do?brdId=2&amp;brdGubun=23&amp;ncvContSeq=5280"
                                       className="txtLink">보건복지부 백신 접종자 자가격리 안내</a>
                                    <br/>
                                    <a href="https://nqs.kdca.go.kr/nqs/quaStation/incheonAirport.do?gubun=step"
                                       className="txtLink">질병관리청 국내입국시 검역 절차 안내</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="codeShareInfo" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>공동운항편 안내</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="closePopup('codeShareInfo')"
                               onClick={() => closePopup('codeShareInfo')}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <p className="f13 gray mgb_20">
                                해당 항공편은 공동운항편입니다.<br/>
                                실제 탑승은 운항사 비행편을 이용하시는 공동운항편입니다.<br/>
                                공동운항편 탑승수속은 실제 운항항공사의 수속 카운터를 이용해 주시기 바라며,
                                운항 항공사 규정에 따라 탑승수속 마감시간이 상이할 수 있으니 반드시 사전에 확인해 주시기 바랍니다.<br/>
                                공동운항편 제반 서비스는 양사간(운항사/판매사) 협의 하에 제공되나, 기본적으로 운항 항공사 기준을 따릅니다<br/>
                            </p>
                            <div className="btnArea mgt_30">
                                <a className="lbtn btn-large filled"
                                   style={{background: "#4a6cb3", border:"1px solid #4a6cb3",}}
                                   // onClick="checkVisaInfo()"
                                   onClick={() => checkVisaInfo()}
                                >확인</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="beforeReservationInfo" className="full-layer">
                <div className="popWrap">
                    <div className="loadWrap-new" id="reservedProcessImage" style={{display: "none",}}>
                        <div className="loader2">
                            <span>선택하신 여정을 예약하는 중입니다.</span>
                        </div>
                    </div>
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>예약 전 확인사항</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="closePopup('beforeReservationInfo')"
                               onClick={() => closePopup('beforeReservationInfo')}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <p className="f13 gray mgb_20">
                                1. 탑승객 정보(국제선-여권상 영문성함 ,국내선-신분증상 성명 , 생년월일, 성별)가 예약내역과 일치하지 않을 경우 탑승이 거절 될 수 있습니다.<br/>
                                (발권이 완료된 후에는 영문/국문 성함변경이 불가하므로 정확하게 입력하여 주시기 바랍니다.)<br/>
                                2. 항공권은 양도가 불가합니다.<br/>
                                3. 중복 예약을 하시는 경우 사전 안내 없이 모든 예약이 자동 취소될 수 있습니다.<br/>
                                (항공사에 따라서는 출발일을 각각 다르게 예약 하였더라도 중복 예약으로 간주되어 취소 될 수 있습니다.)<br/>
                                4. 항공사 마일리지 항공권 예약 및 구입은 해당 항공사를 통해서만 가능합니다.<br/>
                                5. 대기마감 예약은 추가 대기요청불가 상태로 해당항공사 대기 리스트에 포함되지 않는 예약입니다.<br/>
                                6. 국제선의 경우 편도여정으로 항공권을 예약하실 경우에는 상대편 입국국가의 비자 필요여부를 반드시 확인 부탁 드립니다. (유럽은 필수)<br/>
                                7. 항공권을 예약하시기 전에, 반드시 요금규정과 카드결제시 주의사항을 확인하셔서 이용시 불이익이 없도록 하시기 바랍니다.<br/>
                                8. 예약일로부터 3일이내 출발하시는 항공권은 업무시간 내에 담당자와의 상담 이후에만 가능합니다.<br/>
                                9. 예약완료 후 예약건 별 결제시한을 반드시 확인하시어 이용시 불이익 없도록 하시기 바랍니다.<br/>
                                10. 항공권 카드결제시 본인/가족/동반여행자외 “제3자 카드결제 이용불가” 합니다.<br/>
                                11. 미확정요금은 항공사에서 승인되지 않은 운임으로 확정된 후 결제하실 수 있는 항공권입니다.<br/>
                                12. 결제시한은 항공사별 회신시점이 달라서 변경될 수 있으므로 24시간 이내에 재확인 부탁드립니다.<br/>
                                13. 국제선 전자 항공권(e-Ticket): 마이페이지의 해당예약 상세내역에서 e-Ticket 확인서를 출력하여 사용하시면 됩니다.<br/>
                            </p>
                            <div className="btnArea mgt_30">
                                <a className="lbtn btn-large filled"
                                   style={{background: "#4a6cb3", border:"1px solid #4a6cb3",}}
                                   // onClick="reservedStart()"
                                   onClick={() => reservedStart()}
                                >확인</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="checkVisaInfo" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>비자 안내</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="closePopup('checkVisaInfo')"
                               onClick={() => closePopup('checkVisaInfo')}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <p className="f13 gray mgb_20" id="visaInfo">
                                선택하신 도시는 VISA가 반드시 필요한 도시입니다.<br/>
                                아래사항을 점검해 주십시오.<br/>
                                1.VISA 필요 여부를 반드시 점검해 주시기 바랍니다.<br/>
                                2.VISA의 유효기간을 반드시 확인해 주시기 바랍니다.<br/>
                            </p>
                            <div className="btnArea mgt_30">
                                <a className="lbtn btn-large filled"
                                   style={{background: "#4a6cb3", border:"1px solid #4a6cb3",}}
                                   // onClick="beforeReservationInfo()"
                                   onClick={() => beforeReservationInfo()}
                                >확인</a>
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
