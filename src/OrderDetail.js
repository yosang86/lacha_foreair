import $ from 'jquery';
import {useEffect, useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";
import CommonScroll from "./commonScroll";
import "./css/OrderDetail.css";

function App() {
    useEffect(() => {
    // window.addEventListener("load", function () {
        const $noticeToggle = $('.flightNoticeToggle a');
        // let $noticeToggle = $('.flightNoticeToggle a');
        $noticeToggle.on('click', function (e) {
            let $noticeCont = $(e.target).closest('li').find('.flightNoticeCont');
            $(e.target).toggleClass('active');
            $noticeCont.toggleClass('active');
            // if ($noticeCont.hasClass('active')) $noticeCont.show();
            // else $noticeCont.hide();
            e.preventDefault();
        })
    // })
    }, [])

    function openCostRule() {
        // 요금규정 호출
        $("#header").hide();
        $("#content").hide();
        $("#footer").hide();
        $("#searchingDefaultImage").show();

        // const data = `<c:out value="${airOrderInfo.ordNo}"/>`;
        const data = "airOrderInfo.ordNo";
        $.ajax({
            url : "/foreign/reserve/searchCostRule.json",
            type : "post",
            dataType : "json",
            data : data,
            success : function(data) {
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
                for (let i = 0; i < costInfoList.length; i++) {
                    const liEl = document.createElement("li");
                    if (i === 0) liEl.className = "current";

                    const tabId = "tab" + (i + 1) + "" + (i + 1);
                    liEl.dataset.tab = tabId;
                    liEl.setAttribute("onclick", "changeCostTab(this)")
                    const aEl = document.createElement("a");
                    aEl.innerText = "요금규정" + (i + 1);
                    liEl.appendChild(aEl);
                    dataTabTarget.appendChild(liEl);

                    const targetDiv = document.getElementById(tabId);
                    const costInfo = costInfoList[i].children;
                    for (let j = 0; j < costInfo.length; j++) {
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
                        targetDiv.appendChild(ruleDiv);
                    }
                }

                $("#costDefineInformation").show();
                $("#searchingDefaultImage").hide();
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');

                $("#header").show();
                $("#content").show();
                $("#footer").show();
                $("#searchingDefaultImage").hide();
                return;
            }
        });
    }

    // 요금 정보 상세
    function openCostDetail() {
        $("#costDetailInformation").show();
    }

    // 여행 일정 상세
    function openDetailTravelInfo() {
        $("#travelDetailInformation").show();
    }
    function hideDetailTravelInfo() {
        $("#travelDetailInformation").hide();
    }

    // 여행 취소 팝업 열기
    let reloadFlag = false;
    function hideCancelPopup() {
        $("#C5_b").hide();
        if (reloadFlag) {
            reloadFlag = false;
            window.location.reload();
        }
    }

    function allCheck(name, id) {
        const isCheck = document.getElementById(id).checked;
        const checkList = document.getElementsByName(name);
        checkList.forEach((checkbox) => {
            checkbox.checked = !isCheck;
        });
    }

    // 취소 및 환불 설정하기
    function checkSelectBox(type) {
        let limit = 500;
        let textAreaId = "cancelReason";
        let selectBoxId = "canselSelectBox";
        if (!type) {
            textAreaId = "refundReason";
            selectBoxId = "refundSelectBox";
            limit = 300;
        }

        const textArea = document.getElementById(textAreaId);
        const selectBox = document.getElementById(selectBoxId);
        const selectValue = selectBox.options[selectBox.selectedIndex].value;
        const selectText = selectBox.options[selectBox.selectedIndex].text;
        textArea.removeAttribute("disabled");
        if (selectValue === "D07") {
            textArea.value = '';
        } else {
            textArea.value = selectText;
            // textArea.setAttribute("disabled", true);
        }

        cancelReasonCheck(type, limit);
    }

    // 취소 이유 설정
    function cancelReasonCheck(type, limit) {
        let idValue = "cancelReason";
        if (!type) idValue = "refundReason";
        const value = document.getElementById(idValue).value;
        let charLength = value.length;
        if (charLength > limit) {
            const subStringValue = value.substring(0, limit);
            document.getElementById("cancelReason").value = subStringValue;
            charLength = limit;
        }

        if (type) {
            document.getElementById("counter_1").innerHTML = charLength + " / " + limit + " 자";
        } else {
            document.getElementById("counter_2").innerHTML = charLength + " / " + limit + " 자";
        }
    }

    // 문의하기
    function openQuestion() {
        $("#C5_c").show();
    }
    function hideQuestion() {
        $("#C5_c").hide();
        if (reloadFlag) {
            reloadFlag = false;
            window.location.reload();
        }
    }

    let citySearchIndex = 1;
    let openType = 'A';
    function showCitySearchArea(index, type) {
        citySearchIndex = index;
        openType = type;
        $("#citySearch").show();
    }

    function hideCitySearchArea() {
        $("#citySearch").hide();
        setDefaultSearchTextArea();
    }

    function setAllPassengerStayInfo() {
        const setCount = document.querySelectorAll(".stayInfoArea").length;
        let city = document.getElementById("stayCity_1").value;
        let post = document.getElementById("stayPost_1").value;
        let address = document.getElementById("stayAddress_1").value;
        const isCheck = document.getElementById("stayCheck").checked;
        if (city === '' || post === '' || address === '') {
            common.cmnAlertLayer("", "정보를 입력하여주십시요.", uncheckedStayCheckbox);
            return;
        }

        if (isCheck) {
            city = '';
            post = '';
            address = '';
        }

        const valueCity = document.getElementById("stayCity_1");
        for (var i = 2; i <= setCount; i++) {
            const targetCity = document.getElementById("stayCity_" + i);
            targetCity.setAttribute("data1", valueCity.getAttribute("data1"));
            targetCity.setAttribute("data2", valueCity.getAttribute("data2"));
            targetCity.setAttribute("data3", valueCity.getAttribute("data3"));
            targetCity.setAttribute("data4", valueCity.getAttribute("data4"));
            document.getElementById("stayCity_" + i).value = city;
            document.getElementById("stayPost_" + i).value = post;
            document.getElementById("stayAddress_" + i).value = address;
        }
    }

    function uncheckedStayCheckbox() {
        document.getElementById("stayCheck").checked = false;
    }

    function setQuestionSelectInfo() {
        const textArea = document.getElementById("questionArea");
        const selectBox = document.getElementById("questionSelectArea");
        const selectValue = selectBox.options[selectBox.selectedIndex].value;
        const selectText = selectBox.options[selectBox.selectedIndex].text;
        textArea.removeAttribute("disabled");
        if (selectValue === "CETC") {
            textArea.value = '';
        } else {
            textArea.value = selectText;
            // textArea.setAttribute("disabled", true);
        }

        checkQuestionArea(500);
    }

    function checkQuestionArea(limit) {
        const value = document.getElementById("questionArea").value;
        let charLength = value.length;
        if (charLength > limit) {
            const subStringValue = value.substring(0, limit);
            document.getElementById("questionArea").value = subStringValue;
            charLength = limit;
        }

        document.getElementById("counter_3").innerHTML = charLength + " / " + limit + " 자";
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

    function openCovidArea() {
        $("#covidArea").show();
    }

    function closeCovidArea() {
        $("#covidArea").hide();
    }

    function hideCostRule() {
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

    function hideCostDetail() {
        $("#costDetailInformation").hide();
    }

    const paramArray = [];
    function cancelCheck(ordNo, pnrNo) {
        paramArray[0] = ordNo;
        paramArray[1] = pnrNo;
        common.cmnConfirmLayer('예약을 취소하시겠습니까?', cancelReserved);
    }

    const keyInfo = "cookieValue";
    function cancelReserved() {
        const textArea = document.getElementById("cancelReason");
        const selectBox = document.getElementById("canselSelectBox");
        const selectValue = selectBox.options[selectBox.selectedIndex].value;
        if (selectValue === '취소 사유를 선택해주세요') {
            common.cmnAlertLayer('', '취소사유를 선택해주십시요.');
            return;
        }

        if (textArea.value === '') {
            common.cmnAlertLayer('', '취소사유를 입력해주십시요.');
            return;
        }

        const selectList = new Array();
        let checkBox = document.getElementsByName("cancel");
        checkBox.forEach((checkbox) => {
            if (checkbox.checked) {
                const snObject = new Object();
                snObject.sn = checkbox.parentElement.getAttribute("data2");
                selectList.push(snObject);
            }
        });

        if (selectList.length === 0) {
            common.cmnAlertLayer('', '취소할 탑승객을 선택하여주십시요.');
            return;
        }

        const data = {
            "keyInfo":keyInfo,
            "ordNo":paramArray[0],
            "pnrNo":paramArray[1],
            "allCheck":document.getElementById("cancelAll").checked,
            "cnsltFlag":selectValue,
            "rqSubj":document.getElementById("cancelReason").value,
            "snList":JSON.stringify(selectList)
        }

        $.ajax({
            url : "/foreign/myPage/deletePassenger.json",
            type : "post",
            dataType : "json",
            data : data,
            success : function(data) {
                if (data.isSuccess) {
                    reloadFlag = true;
                    common.cmnAlertLayer('','예약 취소 요청이<br>정상적으로 처리되었습니다.', hideCancelPopup);
                } else {
                    common.cmnAlertLayer('','예약 취소 중 오류가 발생하였습니다.<br>나중에 다시 시도해 주십시요.');
                }
            },
            error:function(data) {
                common.cmnAlertLayer('','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function hideReservedInfoUpdate() {
        $("#C5_i").hide();
        if (reloadFlag) {
            reloadFlag = false;
            window.location.reload();
        }
    }

    function updateReservedInfo(ordNo) {
        const data = {
            "keyInfo":keyInfo,
            "ordNo":ordNo,
            "ordmanCellNo":document.getElementById("reservedCellNoUpdate").value,
            "ordmanEmail":document.getElementById("reservedEmailUpdate").value
        }

        $.ajax({
            url : "/foreign/myPage/updateOrdmanInfo.json",
            type : "post",
            dataType : "json",
            data : data,
            success : function(data) {
                if (data.isSuccess) {
                    reloadFlag = true;
                    common.cmnAlertLayer('','수정되었습니다.', hideReservedInfoUpdate);
                    document.getElementById("reservedCellNo").value = document.getElementById("reservedCellNoUpdate").value;
                    document.getElementById("reservedEmailValue").value = document.getElementById("reservedEmailUpdate").value;
                } else {
                    common.cmnAlertLayer('','수정 중 오류가 발생하였습니다.<br>나중에 다시 시도해 주십시요.');
                }
            },
            error:function(data) {
                common.cmnAlertLayer('','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function showStayInfo() {
        $("#C5_l").show();
    }

    function hideStayInfo() {
        $("#C5_l").hide();
        if (reloadFlag) {
            reloadFlag = false;
            window.location.reload();
        }
    }

    const isPassport = "isRegPassport";
    function savePassengerStayInfo(ordNo) {
        if (!isPassport) {
            common.cmnAlertLayer("", "여권정보를 먼저 등록해주세요.");
            return;
        }

        const checkList = document.getElementsByName("stayCheckBox");
        let allChack = true;
        checkList.forEach((checkbox) => {
            if (!checkbox.checked) {
                allChack = false;
            }
        });

        if (!allChack) {
            common.cmnAlertLayer("", "개인정보 수집 및 이용에 동의해주셔야 합니다.");
            return;
        }

        const dataList = new Array();
        const setCount = document.querySelectorAll(".stayInfoArea").length;
        for (var i = 1; i <= setCount ; i++) {
            const city = document.getElementById("stayCity_" + i).getAttribute("data1");
            const cityCode = document.getElementById("stayCity_" + i).getAttribute("data3");
            const post = document.getElementById("stayPost_" + i).value;
            const address = document.getElementById("stayAddress_" + i).value;
            const sn = document.getElementById("stayCity_" + i).getAttribute("data5");
            const naInfo = document.getElementById("stayCity_" + i).getAttribute("data2");
            const naCode = document.getElementById("stayCity_" + i).getAttribute("data4");
            if (city === '') {
                common.cmnAlertLayer("", "체류도시를 선택해주세요.");
                return;
            }

            if (post === '') {
                common.cmnAlertLayer("", "우편번호를 선택해주세요.");
                return;
            }

            if (address === '') {
                common.cmnAlertLayer("", "주소를 선택해주세요.");
                return;
            }

            const stayObject = new Object();
            stayObject.city = city;
            stayObject.cityCode = cityCode;
            stayObject.naInfo = naInfo;
            stayObject.naCode = naCode;
            stayObject.post = post;
            stayObject.address = address;
            stayObject.ordNo = ordNo;
            stayObject.sn = sn;
            dataList.push(stayObject);
        }

        const dataObject = {
            "data":JSON.stringify(dataList),
            "keyInfo":keyInfo
        }

        $.ajax({
            url : "/foreign/myPage/updateStayInfo.json",
            type : "post",
            dataType : "json",
            data : dataObject,
            success : function(data) {
                if (data.isSuccess) {
                    reloadFlag = true;
                    common.cmnAlertLayer("", "저장되었습니다.", hideStayInfo);
                } else {
                    common.cmnAlertLayer("", data.errorMessage);
                }

            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function hidePassportInfoArea() {
        $("#C5_k").hide();
        if (reloadFlag) {
            reloadFlag = false;
            window.location.reload();
        }
    }

    // const useStayInfo = <c:out value="${useStayInfo}" />;
    const useStayInfo = "useStayInfo";
    function savePassportAndLocalInfo(ordNo) {
        const passengerList = new Array();
        const setCount = document.querySelectorAll(".passportInfoList").length;
        let allInput = true;
        for (var i = 1; i <= setCount; i++) {
            const passengerInfo = new Object();
            const birthDayTarget = document.getElementById("passportBirth_" + i);
            const sn = birthDayTarget.getAttribute("data1");
            const birthDay = birthDayTarget.value;
            const passportNo = document.getElementById("passportNo_" + i).value;
            const passportDate = document.getElementById("passportDate_" + i).value;
            const authority = document.getElementById("passportAuthority_" + i);
            const passportAuthority = authority.options[authority.selectedIndex].text;
            const national = document.getElementById("passportAuthority_" + i);
            const passportNational = national.options[national.selectedIndex].text;
            const passportNaCode = national.options[national.selectedIndex].value;
            const passportAuthCOde = national.options[national.selectedIndex].value;

            const localCityInfo = document.getElementById("localCityInfo_" + i).getAttribute("data1");
            const localCityCode = document.getElementById("localCityInfo_" + i).getAttribute("data3");
            const localNaInfo = document.getElementById("localCityInfo_" + i).getAttribute("data2");
            const localNaCode = document.getElementById("localCityInfo_" + i).getAttribute("data4");
            const localCellNo = document.getElementById("localCellNo_" + i).value;
            const passengerCellNo = document.getElementById("passengerCellNo_" + i).value;

            if (useStayInfo && (document.getElementById("localCityInfo_" + i).value === "" || localCellNo === "" || passengerCellNo === "")) {
                allInput = true;
            }

            allInput = birthDay !== '';
            allInput = passportNo !== '';
            allInput = passportDate !== '';
            if (!allInput) break;
            passengerInfo.birthDay = birthDay;
            passengerInfo.passportNo = passportNo;
            passengerInfo.passportDate = passportDate;
            passengerInfo.passportAuthority = passportAuthority;
            passengerInfo.passportNational = passportNational;
            passengerInfo.passportNaCode = passportNaCode;
            passengerInfo.passportAuthCode = passportAuthCOde;
            passengerInfo.localCityInfo = localCityInfo;
            passengerInfo.localCityCode = localCityCode;
            passengerInfo.localNaInfo = localNaInfo;
            passengerInfo.localNaCode = localNaCode;
            passengerInfo.localCellNo = localCellNo;
            passengerInfo.passengerCellNo = passengerCellNo;
            passengerInfo.sn = sn;
            passengerInfo.ordNo = ordNo;
            passengerList.push(passengerInfo);
        }

        if (!allInput) {
            common.cmnAlertLayer("", "필수 정보를 전부 입력해주세요.");
            return;
        }

        const dataObject = {
            "data":JSON.stringify(passengerList),
            "keyInfo":keyInfo
        }

        $.ajax({
            url : "/foreign/myPage/updatePassportAndLocalInfo.json",
            type : "post",
            dataType : "json",
            data : dataObject,
            success : function(data) {
                if (data.isSuccess) {
                    reloadFlag = true;
                    common.cmnAlertLayer("", "저장되었습니다.", hidePassportInfoArea);
                } else {
                    common.cmnAlertLayer("", data.errorMessage);
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function requestQuestion(pnrNo) {
        const questionValue = document.getElementById("questionArea").value;
        const selectBox = document.getElementById("questionSelectArea");
        const selectValue = selectBox.options[selectBox.selectedIndex].value;
        const selectText = selectBox.options[selectBox.selectedIndex].text;

        if (selectValue === "CETC") {
            if (questionValue === "") {
                common.cmnAlertLayer("", "상담내용을 입력하여 주시기 바랍니다.");
                return;
            }
        }

        const dataObject = {
            "keyInfo":keyInfo,
            "title":selectText,
            "content":questionValue,
            "questionType":selectValue,
            "pnrNo":pnrNo
        }

        $.ajax({
            url : "/foreign/myPage/questionInfo.json",
            type : "post",
            dataType : "json",
            data : dataObject,
            success : function(data) {
                if (data.isSuccess) {
                    reloadFlag = true;
                    common.cmnAlertLayer("", "정상적으로 등록되었습니다.", hideQuestion);
                } else {
                    common.cmnAlertLayer("", "요청 중 오류가 발생하였습니다. 잠시후에 다시 시도해 주십시요.");
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function showQuestionDetailInfo(element) {
        const rqprocstatuscd = element.getAttribute("data1");
        const rqnm = element.getAttribute("data2");
        const rqcontent = element.getAttribute("data3");
        const anscontent = element.getAttribute("data4");
        const rqdtm = element.getAttribute("data5");
        const ansdtm = element.getAttribute("data6");

        document.getElementById("question_rqprocstatuscd").innerHTML = rqprocstatuscd;
        document.getElementById("question_rqnm").innerHTML = rqnm;
        document.getElementById("question_rqcontent").innerHTML = rqcontent;
        document.getElementById("question_anscontent").innerHTML = anscontent;
        document.getElementById("question_rqdtm").innerHTML = rqdtm;
        if (ansdtm !== "") {
            document.getElementById("question_ansdtm").innerHTML = ansdtm;
        }

        $("#C5_d").show();
    }

    function hideQuestionDetailInfo() {
        $("#C5_d").hide();
    }

    function hideCitySearchArea() {
        $("#citySearch").hide();
        setDefaultSearchTextArea();
    }
    function setDefaultSearchTextArea() {
        document.getElementById("searchCityTextArea").value = '';
        $("#nonSearchList").show();
        $("#searchList").hide();
        $("#searchList").empty();
    }

    function hideMileagePopup() {
        $("#C5_j2").hide();
    }

    function setSelectAirLine() {
        const selectBox = document.getElementById("airLineList");
        const selectValue = selectBox.options[selectBox.selectedIndex].text;
        document.getElementById("selectMileageAirLineArea").innerHTML = selectValue;
        document.getElementById("selectMileageAirLineArea").innerHTML = selectValue;
    }

    function requestSaveMileage() {
        const mileageNumber = document.getElementById("mileageNumberArea").value;
        if ("" === mileageNumber) {
            common.cmnAlertLayer("", "마일리지 번호를 입력해 주세요.");
            return;
        }

        const selectBox = document.getElementById("airLineList");
        const selectValue = selectBox.options[selectBox.selectedIndex].text;

        const dataObject = {
            "keyInfo":keyInfo,
            "mileageNumber":mileageNumber,
            "airLineCode":selectBox.options[selectBox.selectedIndex].value,
            "engName":document.getElementById("engName").innerHTML,
            "goodsNo":document.getElementById("engName").getAttribute("data1")
        }

        $.ajax({
            url : "/foreign/myPage/mileageSave.json",
            type : "post",
            dataType : "json",
            data : dataObject,
            success : function(data) {
                if (data.isSuccess) {
                    reloadFlag = true;
                    common.cmnAlertLayer("", "정상적으로 등록되었습니다.", hideMileagePopup);
                } else {
                    common.cmnAlertLayer("", "마일리지번호가 유효하지 않습니다.<br>마일리지 번호를 다시 확인해주세요.");
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function hideRefundPopup() {
        $("#C7_c").hide();
        if (reloadFlag) {
            reloadFlag = false;
            window.location.reload();
        }
    }
    function movePage(id) {
        if (id === "refund_paymentArea") {
            let isCheck = true;
            const checkList = document.getElementsByName("refundPassenger");
            checkList.forEach((checkbox) => {
                if (!checkbox.checked) {
                    isCheck = false;
                }
            });

            if (isCheck) calcRefundValue();
            else common.cmnAlertLayer("", "환불할 대상을 선택해 주세요.");
        }

        $("#" + id).click();
    }

    const refundRate = "refundRate";
    function calcRefundValue() {
        $(".refundListData").empty();
        let commitionValue = 0;
        let minusTasfValue = 0;
        let sumRefundCost = 0;
        const checkList = document.getElementsByName("refundPassenger");
        const targetArea = document.getElementById("commitionInfoArea");
        let mainOrdNo = "";
        // let commitionInfoString = '';
        checkList.forEach((checkbox) => {
            if (checkbox.checked) {
                const ticketNumber = checkbox.getAttribute("data2");
                const fare = checkbox.getAttribute("data3") * 1;
                const fuel = checkbox.getAttribute("data4") * 1;
                const tax = checkbox.getAttribute("data5") * 1;
                const tasf = checkbox.getAttribute("data6") * 1;
                const amount = checkbox.getAttribute("data7") * 1;
                const ordNo = checkbox.getAttribute("data8");
                const engLast = checkbox.getAttribute("data9");
                const engFirst = checkbox.getAttribute("data10");
                mainOrdNo = ordNo;

                minusTasfValue += (amount - tasf);
                commitionValue += refundRate;
                const refundCost = amount - tasf - refundRate <= 0 ? 0 : amount - tasf - refundRate;
                sumRefundCost += refundCost;

                const ul = document.createElement("ul");
                ul.className = "detailRule";
                const li1 = document.createElement("li");
                const titP1 = document.createElement("p");
                titP1.className = "tit";
                titP1.innerHTML = "탑승자";
                const costP1 = document.createElement("p");
                costP1.className = "cost";
                costP1.innerHTML = engLast + '/' + engFirst;
                li1.appendChild(titP1);
                li1.appendChild(costP1);
                ul.appendChild(li1);
                const li2 = document.createElement("li");
                const titP2 = document.createElement("p");
                titP2.className = "tit";
                titP2.innerHTML = "티켓번호";
                const costP2 = document.createElement("p");
                costP2.className = "cost";
                costP2.innerHTML = ticketNumber;
                li2.appendChild(titP2);
                li2.appendChild(costP2);
                ul.appendChild(li2);
                const li3 = document.createElement("li");
                const titP3 = document.createElement("p");
                titP3.className = "tit";
                titP3.innerHTML = "여행자 수수료";
                const costP3 = document.createElement("p");
                costP3.className = "cost";
                costP3.innerHTML = "0원";
                li3.appendChild(titP3);
                li3.appendChild(costP3);
                ul.appendChild(li3);
                const li4 = document.createElement("li");
                const titP4 = document.createElement("p");
                titP4.className = "tit f18 cBlack fb600";
                titP4.innerHTML = "환불 수수료";
                const costP4 = document.createElement("p");
                costP4.className = "cost f18";
                costP4.innerHTML = comma(refundRate) + "원";
                li4.appendChild(titP4);
                li4.appendChild(costP4);
                ul.appendChild(li4);
                targetArea.after(ul);
            }
        });

        document.getElementById("paymentCommition").innerHTML = comma(commitionValue) + '원 수수료 결제';

        document.getElementById("beforeCost").innerHTML = comma(minusTasfValue) + '원';
        document.getElementById("refundCost").innerHTML = comma(minusTasfValue) + '원';
        document.getElementById("refundCommitionCost").innerHTML = comma(commitionValue) + '원';
        document.getElementById("calcRefundCost").innerHTML = comma(sumRefundCost) + '원';
        document.getElementById("saleAmt").value = commitionValue;
    }

    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }



    function requestCommitionPayment() {
        const commitionCostValue = document.getElementById("paymentCommition").getAttribute("data1");
        let formJson = getRefundRequestValue();
        payCommitionValue(formJson);
    }

    function payCommitionValue(dataObject) {
        var url = "/foreAir/danalCredit/s_danalRequest.do";
        var popWidth = "780";
        var popHeigth = "500";

        if($('#payMeanCd').val() == '15'){
            url = "/foreAir/danalKeyin/s_danalRequest.do";
            popWidth = "700";
            popHeigth = "500";
        }

        if($('#payMeanCd').val() == '06'){
            url = "/foreAir/billGate/s_payRequest.do";
            popWidth = "300";
            popHeigth = "400";
        }

        if($('#payMeanCd').val() == '07'){
            url = "/foreAir/billGate/s_payRequest.do";
            popWidth = "400";
            popHeigth = "250";
        }

        if($('#payMeanCd').val() == '08'){
            url = "/foreAir/coocon/s_paymentReserve.do";
            popWidth = "600";
            popHeigth = "700";
        }

        if($('#payMeanCd').val() == '04' || $('#payMeanCd').val() == '08' || $('#payMeanCd').val() == '15' || $('#payMeanCd').val() == '06' || $('#payMeanCd').val() == '07'){
            window.open("","danalPayPopup","top=10, left=10, width="+popWidth+", height="+popHeigth+", status=no, menubar=no, toolbar=no, resizable=no");
            document.orderPaymentViewForm.target = "danalPayPopup";
            document.orderPaymentViewForm.action = url;
            document.orderPaymentViewForm.submit();
        } else{
            alert('결제수단 값이 잘못되었습니다.\n고객센터로 문의 부탁드립니다.');
            return;
        }
    }

    function refundCheck() {
        common.cmnConfirmLayer("환불 요청 하시겠습니까?", requestRefund);
    }

    function getRefundRequestValue() {
        const refundRuleCheck = document.getElementById("check-refund-agree").checked;
        if (!refundRuleCheck) {
            common.cmnAlertLayer("", "환불규정을 읽고 동의하여주시기 바랍니다.");
            return;
        }

        const refundReason = document.getElementById("refundReason").value;
        if ("" === refundReason) {
            common.cmnAlertLayer("", "환불사유를 입력해주세요.");
            return;
        }

        const refundPassengerList = new Array();
        const checkList = document.getElementsByName("refundPassenger");
        checkList.forEach((checkbox) => {
            if (checkbox.checked) {
                const passengerInfo = new Object();
                passengerInfo.sn = checkbox.getAttribute("data1");
                passengerInfo.ticketNumber = checkbox.getAttribute("data2");
                refundPassengerList.push(passengerInfo);
            }
        });

        if (refundPassengerList.length === 0) {
            common.cmnAlertLayer("", "탑승객을 선택하여주시기 바랍니다.");
            return;
        }

        const ordNo = document.getElementById("refundReason").getAttribute("data2");
        const selectBox = document.getElementById("refundSelectBox");
        const selectValue = selectBox.options[selectBox.selectedIndex].value;
        const refundReasonValue = document.getElementById("refundReason").value;
        const goodsNo = document.getElementById("refundReason").getAttribute("data1");

        document.getElementById("allCheck").value = document.getElementById("check-s1").checked;
        document.getElementById("refundPassengerList").value = JSON.stringify(refundPassengerList);
        document.getElementById("refundReasonValue").value = refundReasonValue;
        document.getElementById("refundReasonCode").value = selectValue;
        const dataObject = {
            "keyInfo": keyInfo,
            "goodsNo":goodsNo,
            "ordNo":ordNo,
            "allCheck":document.getElementById("check-s1").checked,
            "refundPassengerList":JSON.stringify(refundPassengerList),
            "refundReasonValue":refundReasonValue,
            "refundReasonCode":selectValue
        }

        return $("#orderPaymentViewForm").serializeObject();
    }

    function requestRefund() {
        const dataObject = getRefundRequestValue();

        $.ajax({
            url : "/foreign/myPage/requestRefund.json",
            type : "post",
            dataType : "json",
            data : dataObject,
            success: function(data) {
                if (data.isSuccess) {
                    reloadFlag = true;
                    common.cmnAlertLayer("", "환불요청이 완료되었습니다.", hideRefundPopup);
                } else {
                    common.cmnAlertLayer("", "요청 중 오류가 발생하였습니다. 잠시후에 다시 시도해 주십시요.");
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function hidePaymentInfo() {
        $("#C8_c").hide();
    }

    function hideTasfInfo() {
        $("#C8_e").hide();
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="/mypage" className="btnPrev">이전</a>
                    <h1>예약</h1>
                </div>
            </div>

            <form method="post" name="orderPaymentViewForm" id="orderPaymentViewForm">
                <input type="hidden" name="goodsNo" id="goodsNo" value="110042"/>
                <input type="hidden" name="goodsNm" id="goodsNm" value="LH713 인천-프랑크푸르트 2023-07-03 12:20 - 18:30"/>
                <input type="hidden" name="ordNo" id="ordNo" value="J230516162916N"/>
                <input type="hidden" name="goodsTpCd" id="goodsTpCd" value="52"/>
                <input type="hidden" name="allCheck" id="allCheck" value=""/>
                <input type="hidden" name="optNo" id="optNo" value=""/>
                <input type="hidden" name="optQty" id="optQty" value=""/>

                <input type="hidden" name="applyYn" id="applyYn" value="N"/>

                <input type="hidden" name="payMeanCd" id="payMeanCd" value="06"/>
                <input type="hidden" id="cscoNo" value="2001"/>
                <input type="hidden" name="pntRate" id="pntRate" value=""/>

                <input type="hidden" name="refund" id="refund" value="true"/>
                <input type="hidden" name="refundReasonValue"
                       id="refundReasonValue" value=""/>
                <input type="hidden" name="refundReasonCode"
                       id="refundReasonCode" value=""/>
                <input type="hidden" name="refundPassengerList"
                       id="refundPassengerList" value=""/>
                <input type="hidden" name="saleAmt"
                       id="saleAmt" value=""/>
                <input type="hidden" name="keyInfo"
                       id="keyInfo"
                       value="TOUR_JSESSIONID=mlJ7U7ylatNj2AYgw4aAqHK1l-PkQeOQP_tcFRYAh7_nAiuyqwFI!679078335; domain=.thehyundaitravel.com;samesite=none; path=/; secure; HttpOnly"/>
            </form>

            <div id="content">
                <div className="boxCont msgBox">
                    <ul className="step-steps mgb_30">
                        <li className="active">
                            <span className="step_num">
                                <span className="step_txt">예약</span>
                            </span>
                        </li>
                        {/*<li className="">*/}
                        <li className="active">
                            <span className="step_num">
                                <span className="step_txt">여권정보</span>
                            </span>
                        </li>

                        <li className="">
                        {/*<li className="active">*/}
                            <span className="step_num">
                                <span className="step_txt">결제</span>
                            </span>
                        </li>
                        <li className="">
                        {/*<li className="active">*/}
                            <span className="step_num">
                                <span className="step_txt">발권</span>
                            </span>
                        </li>
                    </ul>

                    {/*취소된 예약일 경우에만 표시*/}
                    <div className="ticketWrap timeLine pdb_30">
                        <div className="errorNo_wrap toggles">
                            <div className="errorNo">
                                <p>취소된 예약입니다.</p>
                            </div>
                        </div>
                    </div>

                    <ul className="seat-btn pdl_0 mgt_30 mgb_20 flexBtn">
                        <li className="on"
                            // onClick="openCostRule()"
                            onClick={() => openCostRule()}
                        ><a>요금규정</a></li>
                        <li className="on"
                            // onClick="openCostDetail()"
                            onClick={() => openCostDetail()}
                        ><a>요금상세</a></li>
                    </ul>

                    <div className="timeLine pdb_20 mgt_0">
                        <div className="ticketWrap pd_a0 airInfo">
                            <div className="ticket_new">
                                <div className="ticketInner">
                                    <div className="ticketInfo">
                                        {/* <c:set var="goodsStatsTxt">예약대기</c:set>*/}
                                        {/*<c:if test="${airOrderInfo.ordDtlStatCd eq codeConstants.ORD_DTL_STAT_101}">*/}
                                        {/*    <c:set var="goodsStatsTxt">결제대기</c:set>*/}
                                        {/*</c:if>*/}
                                        {/*<c:if test="${airOrderInfo.ordDtlStatCd eq codeConstants.ORD_DTL_STAT_103}">*/}
                                        {/*    <c:set var="goodsStatsTxt">예약취소</c:set>*/}
                                        {/*</c:if>*/}
                                        {/*<c:if test="${airOrderInfo.ordStatCd eq codeConstants.ORD_STAT_02}">*/}
                                        {/*    <c:set var="goodsStatsTxt">결제요청</c:set>*/}
                                        {/*</c:if>*/}
                                        {/*<c:if test="${airOrderInfo.ordDtlStatCd eq codeConstants.ORD_DTL_STAT_102}">*/}
                                        {/*    <c:set var="goodsStatsTxt">발권완료</c:set>*/}
                                        {/*</c:if>*/}
                                        <span className="airTitle rdWait mgl_20 mgb_20">예약취소</span>

                                        <div className="airSummary">
                                            <div className="itinerary">
                                                <div className="airport">
                                                    <p className="place">인천</p>
                                                    <p className="name">ICN</p>
                                                </div>
                                                <div className="leadTime">
                                                    <p className="time">
                                                        <span className="hour">16</span>시간
                                                        <span className="minute">20</span>분
                                                    </p>
                                                    <p className="arrow">
                                                        <span className="via"></span>
                                                    </p>
                                                </div>
                                                <div className="airport">
                                                    <p className="place">히드로</p>
                                                    <p className="name">LHR</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<div className="airSummary">*/}
                                        {/*    <div className="itinerary">*/}
                                        {/*        <div className="airport">*/}
                                        {/*            <p className="place">히드로</p>*/}
                                        {/*            <p className="name">LHR</p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="leadTime">*/}
                                        {/*            <p className="time">*/}
                                        {/*                <span className="hour">14</span>시간*/}
                                        {/*                <span className="minute">15</span>분*/}
                                        {/*            </p>*/}
                                        {/*            <p className="arrow">*/}
                                        {/*                <span className="via"></span>*/}
                                        {/*            </p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="airport">*/}
                                        {/*            <p className="place">인천</p>*/}
                                        {/*            <p className="name">ICN</p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        <div className="wayArea">
                                            <a
                                                // onClick="openDetailTravelInfo()"
                                                onClick={() => openDetailTravelInfo()}
                                            >항공 상세 스케줄</a>
                                        </div>
                                    </div>
                                    <div className="define">
                                        <div className="price titWrap airWrap">
                                            <div className="airDetail">
                                                <p className="tit">예약번호(PNR번호)</p>
                                                <p className="detail">5URJRA (PNR:5131-2806)</p>
                                            </div>
                                            <div className="airDetail">
                                                <p className="tit">총 일정</p>
                                                <p className="detail">2023-07-03(월) ~ 2023-07-08(토)</p>
                                            </div>
                                            <div className="airDetail">
                                                <p className="tit">탑승객/좌석</p>
                                                <p className="detail">1명<span className="titc">(성인1명)</span>/ 일반석</p>
                                            </div>
                                            <div className="airDetail">
                                                <p className="tit"><span className="totalTxt">총금액</span></p>
                                                <p className="detail"><span className="totalTxt">2,445,600원</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="timeLine">
                        <div className="flightNotice mgt_20 schedule_toggle">
                            <ul className="flightNoticeList">
                                <li>
                                    <div className="flightNoticeToggle">
                                        <a
                                            // href="#"
                                            // href="javascript:void(0);"
                                            className="mgl_5"
                                        >탑승자 및 여권/증빙</a>
                                    </div>
                                    <div className="flightNoticeCont">
                                        <div className="scroll-wrapper flightNoticeContInner scrollbar-inner"
                                             style={{position: "relative"}}
                                        >
                                            <div
                                                className="flightNoticeContInner scrollbar-inner scroll-content scroll-scrolly_visible"
                                                style={{height: "auto", marginBottom: "0px", marginRight: "0px", maxHeight: "300px"}}
                                            >
                                                <div className="flightNoticeContInside"
                                                     style={{paddingTop: "0px", paddingBottom: "0px"}}
                                                >
                                                    <div>
                                                        <div className="ticketWrap">
                                                            <div className="errorNo_wrap toggles">
                                                                <div className="errorNo">
                                                                    <p>예약된 탑승자 내역이 없습니다.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<CommonScroll/>*/}
                                            <div className="scroll-element scroll-x scroll-scrolly_visible">
                                                <div className="scroll-element_outer">
                                                    <div className="scroll-element_size"></div>
                                                    <div className="scroll-element_track"></div>
                                                    <div className="scroll-bar" style={{width: "88px"}}></div>
                                                </div>
                                            </div>
                                            <div className="scroll-element scroll-y scroll-scrolly_visible">
                                                <div className="scroll-element_outer">
                                                    <div className="scroll-element_size"></div>
                                                    <div className="scroll-element_track"></div>
                                                    <div className="scroll-bar" style={{height: "93px", top: "0px"}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flightNoticeToggle">
                                        <a className="mgl_5">취소/환불 정보</a>
                                    </div>
                                    <div className="flightNoticeCont">
                                        <div className="scroll-wrapper flightNoticeContInner scrollbar-inner"
                                             style={{position: "relative"}}
                                        >
                                            <div
                                                className="flightNoticeContInner scrollbar-inner scroll-content scroll-scrolly_visible"
                                                style={{height: "auto", marginBottom: "0px", marginRight: "0px", maxHeight: "300px"}}
                                            >
                                                <div className="flightNoticeContInside"
                                                     style={{paddingTop: "0px", paddingBottom: "0px"}}
                                                >
                                                </div>
                                            </div>
                                            <CommonScroll/>
                                            {/*<div className="scroll-element scroll-x scroll-scrolly_visible">*/}
                                            {/*    <div className="scroll-element_outer">*/}
                                            {/*        <div className="scroll-element_size"></div>*/}
                                            {/*        <div className="scroll-element_track"></div>*/}
                                            {/*        <div className="scroll-bar"*/}
                                            {/*             // style="width: 88px;"*/}
                                            {/*        ></div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*<div className="scroll-element scroll-y scroll-scrolly_visible">*/}
                                            {/*    <div className="scroll-element_outer">*/}
                                            {/*        <div className="scroll-element_size"></div>*/}
                                            {/*        <div className="scroll-element_track"></div>*/}
                                            {/*        <div className="scroll-bar"*/}
                                            {/*             // style="height: 93px; top: 0px;"*/}
                                            {/*        ></div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flightNoticeToggle">
                                        <a className="mgl_5">문의 및 요청 이력</a>
                                    </div>
                                    <div className="flightNoticeCont">
                                        <div className="scroll-wrapper flightNoticeContInner scrollbar-inner"
                                             style={{position: "relative"}}
                                        >
                                            <div
                                                className="flightNoticeContInner scrollbar-inner scroll-content scroll-scrolly_visible"
                                                style={{height: "auto", marginBottom: "0px", marginRight: "0px", maxHeight: "300px"}}
                                            >
                                                <div className="flightNoticeContInside"
                                                     style={{paddingTop: "0px", paddingBottom: "0px"}}>
                                                </div>
                                            </div>
                                            <CommonScroll/>
                                            {/*<div className="scroll-element scroll-x scroll-scrolly_visible">*/}
                                            {/*    <div className="scroll-element_outer">*/}
                                            {/*        <div className="scroll-element_size"></div>*/}
                                            {/*        <div className="scroll-element_track"></div>*/}
                                            {/*        <div className="scroll-bar" style="width: 88px;"></div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*<div className="scroll-element scroll-y scroll-scrolly_visible">*/}
                                            {/*    <div className="scroll-element_outer">*/}
                                            {/*        <div className="scroll-element_size"></div>*/}
                                            {/*        <div className="scroll-element_track"></div>*/}
                                            {/*        <div className="scroll-bar" style="height: 93px; top: 0px;"></div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="btnArea mgt_10">
                            <a className="lbtn btn-large filled"
                               style={{background: "#ffffff", border: "1px solid #4a6cb3", color: "#4a6cb3"}}
                               // onClick="openQuestion()"
                               onClick={() => openQuestion()}
                            >상담요청</a>
                        </div>

                    </div>
                </div>
            </div>

            <div id="costDetailInformation" className="full-layer" style={{display: "none"}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>요금상세정보</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideCostDetail()"
                               onClick={() => hideCostDetail()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox" id="costDetailList">
                            <h2>성인 1명</h2>
                            <ul className="detailRule">
                            </ul>
                            <ul className="detailRule">
                                <li><p className="tit">1인 합계</p><p className="cost">원</p></li>
                            </ul>
                            <ul className="detailRule total">
                                <li><p className="tit">최종 결제 금액</p><p className="cost">2,445,600원</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="loadWrap-new" id="searchingDefaultImage" style={{display: "none"}}>
                <div className="loader2">
                </div>
            </div>
            <pre id="htmlTempProcess" style={{display: "none"}}></pre>
            <div id="costDefineInformation" className="full-layer" style={{display: "none"}}>
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>요금규정</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideCostRule()"
                               onClick={() => hideCostRule()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <p className="f13 gray mgb_20">
                                전체 여정에 <span className="cRed">상이한 운임과 규정</span>이 적용되었으며, 각 운임
                                규정 중 가장 제한적인 규정이 적용됩니다. 이와 관련한 상세 운임규정은 담당자를 통해서 재확인 하시기 바랍니다.
                            </p>

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

            <div id="covidArea" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>코로나 안전정보</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="closeCovidArea()"
                               onClick={() => closeCovidArea()}
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
                                        <li data-tab="tab_covid_kr"><a>대한민국</a></li>
                                        <li className="current" data-tab="tab_covid_1"
                                            // onClick="changeCovidTab(this)"
                                            onClick={(event) => changeCovidTab(event.currentTarget)}
                                        >
                                            <a>영국</a></li>
                                    </ul>
                                </div>

                                <div id="tab_covid_1" className="tabcontent current">
                                    <div className="txtDate mgt_10">작성일 : 2021. 01. 16(토)</div>
                                    <div>
                                        <p><span>○ 영국 정부는 2021.01.15.(금) 총리 브리핑을 통해 코로나19 변이바이러스의 세계적 확산에 따라 2021.1.18.(월) 04:00부터 기존 코로나19 저위험국가 입국자 대상 자가격리 면제제도(Travel Corridors)를 중단하고 대한민국을 포함한 모든 해외입국자를 대상으로 10일간 자가격리 의무를 부여할 예정입니다.</span></p>
                                        <p><span><br/></span></p>
                                        <p><span><br/></span></p>
                                        <p><span>○ 같은 일시부터 영국 입국 시 코로나19 음성확인서 제출 의무화(Passenger Locator Form도 별도로 제출 필요)도 함께 시행되오니 영국에 입국할 계획이 있으신 우리 국민께서는 각별히 유념하여 주시기 바랍니다.</span></p>
                                        <p><span><br/></span></p>
                                        <p><span><br/></span></p>
                                        <p><span>○ 영국 내 자가격리와 관련된 보다 자세한 내용은 아래의 영국정부 홈페이지를 참고해 주시기 바랍니다.</span></p>
                                        <p><span>※ Coronavirus (COVID-19): how to self-isolate when you travel to England</span></p>
                                        <p><span><br/></span></p>
                                        <p><span><br/></span></p>
                                        <p><span>○ 기타 도움이 필요하시거나 긴급 상황 발생 시 아래 연락처로 연락해 주시기 바랍니다.</span></p>
                                        <p><span>☞ 주영국대한민국대사관<br/>&nbsp; &nbsp;- 대표번호(근무시간 중) : +44-20-7227-5500<br/>&nbsp; &nbsp;- 긴급연락처(사건사고 등 긴급상황 발생 시, 24시간) : +44-78-7650-6895<br/>☞ 영사콜센터(서울, 24시간) : +82-2-3210-0404 / 카카오톡 '외교부 영사콜센터' 친구추가</span></p>
                                        <p><span><br/></span></p>
                                        <p><span><br/></span></p>
                                        <p><span><br/></span></p>
                                    </div>
                                    <br/>
                                    <p className="f13 gray mgb_20">※ 이 데이터는 외교부가 제공하는 공공데이터에서 가져온 정보입니다.</p>
                                </div>

                                <div id="tab_covid_2" className="tabcontent">
                                </div>

                                <div id="tab_covid_3" className="tabcontent">
                                </div>

                                <div id="tab_covid_4" className="tabcontent">
                                </div>

                                <div id="tab_covid_kr" className="tabcontent">
                                    <br/>
                                    <p className="f13 gray mgb_20">
                                        한국입국 시 자가격리 관련 상세 내용은
                                        아래의 보건복지부 및 질병관리청 정보 확인 부탁드립니다.
                                    </p>

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

            <div id="travelDetailInformation" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>상세 스케줄</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideDetailTravelInfo()"
                               onClick={() => hideDetailTravelInfo()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine">
                                <span className="airTitle mgb_10">가는편</span>
                                <dl className="ontheWay">
                                    <dt>인천<span className="change"></span> 히드로</dt>
                                    <dd>2023-07-03(월)</dd>
                                    <dd>
                                        왕복&nbsp;/ 경유 1회
                                    </dd>
                                </dl>
                                <div className="timeList mgt_30">
                                    <ul className="timeList_wrap">
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>인천&nbsp;ICN</dt>
                                                <dd>2023-07-03(월) 12:20</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH713</li>
                                                        <li>인천</li>
                                                        <li>무료수하물 1개</li>
                                                        <li>
                                                            <span className="txtTotal"></span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea arri">도착</div>
                                            <dl className="ontheWay">
                                                <dt>프랑크푸르트&nbsp;FRA</dt>
                                                <dd>2023-07-03(월) 18:30</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH713</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea badge">경유</div>
                                            <dl className="ontheWay badge">
                                                <dt>프랑크푸르트에서</dt>
                                                <dd>01시간 30분 대기</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>프랑크푸르트&nbsp;FRA</dt>
                                                <dd>2023-07-03(월) 20:00</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH920</li>
                                                        <li>프랑크푸르트</li>
                                                        <li>무료수하물 1개</li>
                                                        <li>
                                                            <span className="txtTotal"></span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea arri">도착</div>
                                            <dl className="ontheWay">
                                                <dt>히드로&nbsp;LHR</dt>
                                                <dd>2023-07-03(월) 20:40</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH920</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="timeLine">
                                <span className="airTitle mgb_10">오는편</span>
                                <dl className="ontheWay">
                                    <dt>히드로<span className="change"></span> 인천</dt>
                                    <dd>2023-07-03(월)</dd>
                                    <dd>
                                        왕복&nbsp;/ 경유 1회
                                    </dd>
                                </dl>
                                <div className="timeList mgt_30">
                                    <ul className="timeList_wrap">
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>히드로&nbsp;LHR</dt>
                                                <dd>2023-07-07(금) 11:30</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH905</li>
                                                        <li>히드로</li>
                                                        <li>무료수하물 2개</li>
                                                        <li>
                                                            <span className="txtTotal"></span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea arri">도착</div>
                                            <dl className="ontheWay">
                                                <dt>프랑크푸르트&nbsp;FRA</dt>
                                                <dd>2023-07-07(금) 14:05</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH905</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea badge">경유</div>
                                            <dl className="ontheWay badge">
                                                <dt>프랑크푸르트에서</dt>
                                                <dd>01시간 20분 대기</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea">출발</div>
                                            <dl className="ontheWay">
                                                <dt>프랑크푸르트&nbsp;FRA</dt>
                                                <dd>2023-07-07(금) 15:25</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH712</li>
                                                        <li>프랑크푸르트</li>
                                                        <li>무료수하물 2개</li>
                                                        <li>
                                                            <span className="txtTotal"></span>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <div className="badgeArea arri">도착</div>
                                            <dl className="ontheWay">
                                                <dt>인천&nbsp;ICN</dt>
                                                <dd>2023-07-08(토) 09:45</dd>
                                                <dd>
                                                    <ul className="detailBox mgt_15">
                                                        <li>루프트한자&nbsp;LH712</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C5_b" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>예약 취소</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideCancelPopup()"
                               onClick={() => hideCancelPopup()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine pdb_20">
                                <div className="ticketWrap pd_a0 airInfo">
                                    <div className="ticket_new">
                                        <div className="ticketInner">
                                            <div className="ticketInfo">
                                                <div className="airSummary">
                                                    <div className="itinerary">
                                                        <div className="airport">
                                                            <p className="place">인천</p>
                                                            <p className="name">ICN</p>
                                                        </div>
                                                        <div className="leadTime">
                                                            <p className="time">
                                                                <span className="hour">16</span>시간
                                                                <span className="minute">20</span>분
                                                            </p>
                                                            <p className="arrow">
                                                                <span className="via"></span>
                                                                <span className="via"></span>
                                                            </p>
                                                        </div>
                                                        <div className="airport">
                                                            <p className="place">히드로</p>
                                                            <p className="name">LHR</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="airSummary">
                                                    <div className="itinerary">
                                                        <div className="airport">
                                                            <p className="place">히드로</p>
                                                            <p className="name">LHR</p>
                                                        </div>
                                                        <div className="leadTime">
                                                            <p className="time">
                                                                <span className="hour">14</span>시간
                                                                <span className="minute">15</span>분
                                                            </p>
                                                            <p className="arrow">
                                                                <span className="via"></span>
                                                                <span className="via"></span>
                                                            </p>
                                                        </div>
                                                        <div className="airport">
                                                            <p className="place">인천</p>
                                                            <p className="name">ICN</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="define">
                                                <div className="price titWrap airWrap">
                                                    <div className="airDetail">
                                                        <p className="tit">예약번호(PNR번호)</p>
                                                        <p className="detail">5URJRA (PNR:5131-2806)</p>
                                                    </div>
                                                    <div className="airDetail">
                                                        <p className="tit">총 일정</p>
                                                        <p className="detail">2023-07-03(월) ~ 2023-07-08(토)</p>
                                                    </div>
                                                    <div className="airDetail">
                                                        <p className="tit">탑승객/좌석</p>
                                                        <p className="detail">1명<span className="titc">(성인1명)</span>/ 일반석</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="schedule-title pdt_20">
                                <div className="sch_tit">취소 사유</div>
                            </div>
                            <div className="timeLine pdb_30 mgt_20 textWrap">
                                <select id="canselSelectBox"
                                        defaultValue={""}
                                    // onChange="checkSelectBox(true)"
                                    onChange={() => checkSelectBox(true)}
                                >
                                    {/*<option selected="" disabled="">취소 사유를 선택해주세요</option>*/}
                                    <option value="" disabled={true}>취소 사유를 선택해주세요</option>
                                    <option value="D06">여행 일정 변경</option>
                                    <option value="D03">할인혜택 적용을 위해</option>
                                    <option value="D04">다른 상품으로 재 예약하기 위해서</option>
                                    <option value="D05">다른 항공사/여행사보다 요금이 비싸서</option>
                                    <option value="D07">직접입력</option>
                                </select>
                                <textarea className="mgt_10 h100 lh24" id="cancelReason" disabled=""></textarea>
                                <span id="counter_1" className="counterClass">0 / 500 자</span>
                            </div>

                            <ul className="sectionGroup">
                                <li className="section-a pdb_10">
                                    <div className="schedule-title pdt_20">
                                        <div className="sch_tit">탑승자 선택</div>
                                        <div className="sch_btn">
                                        <span className="check">
                                            <input id="cancelAll" type="checkbox"/>
                                            <label htmlFor="cancelAll"
                                                   // onClick="allCheck('cancel', 'cancelAll')"
                                                   onClick={() => allCheck('cancel', 'cancelAll')}
                                            >전체선택</label>
                                        </span>
                                        </div>
                                    </div>
                                    <ul className="sectionTxt mgt_5">
                                        <li className="pdb_0">※ 예약 자체를 완전히 취소하시고자 할 경우 탑승자 전체를 선택해 주시기 바랍니다.</li>
                                    </ul>
                                </li>

                                <li className="section-a pdb_10 pdt_0">
                                    {/*<c:set var="gender">남성</c:set>*/}
                                    {/*<c:if test='${"true" != item.gender}'>*/}
                                    {/*    <c:set var="gender">여성</c:set>*/}
                                    {/*</c:if>*/}
                                    <div className="schedule-title pdt_20">
                                        <div className="sch_tit">
                                            PAUL / KIM
                                        </div>
                                        <div className="sch_btn">
                                            <span className="check" data1="${airOrderInfo.aircoPnrAlpha}" data2="${item.passengerId}">
                                            <input id="check02-b_${index.count}"
                                                   className="cancelCheckBox" type="checkbox" name="cancel"/>
                                            <label htmlFor="check02-b_${index.count}"></label>
                                            </span>
                                        </div>
                                    </div>
                                    <ul className="sectionTxt mgt_5">
                                        <li className="pdb_0">
                                            남성
                                        </li>
                                    </ul>
                                </li>
                                <li className="section-a pdb_10 pdt_0">
                                    <ul className="sectionTxt noneLine mgt_10">
                                        <li>※ 이미 취소된 예약은 탑승객을 취소하실 수 없습니다.</li>
                                        <li>※ 소아/유아를 제외한 최소 출발 인원은 1명 입니다.</li>
                                        <li>※ 소아/유아를 제외한 인원수가 최소 출발 인원 수보다 적으면 예약 취소 후 다시 예약하셔야 합니다.</li>
                                        <li>※ 항공권 환불이나 항공권 재 발행시 여행사 수수료가 부과됩니다.</li>
                                        <li>※ 항공사 수수료의 경우는 요금 규정을 참고해 주시기 바랍니다.</li>
                                    </ul>
                                </li>
                            </ul>

                            <div className="btnArea">
                                <a className="lbtn btn-large filled mgt_30 mgb_20 "
                                   style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                                   // onClick="cancelCheck('J230516162916N', '110042')"
                                   onClick={() => cancelCheck('J230516162916N', '110042')}
                                >예약취소</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C5_i" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>예약자 연락처 변경</h1>
                            <a
                                // onClick="hideReservedInfoUpdate()"
                                onClick={() => hideReservedInfoUpdate()}
                               className="btnClose full-pop-close">닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine pdb_20">
                                <div className="sumTxt mgb_20">코레일테스트</div>

                                <dl className="inputArea">
                                    <dt>휴대폰</dt>
                                    <dd>
                                        <input type="text" className="mgt_10 mgb_10" id="reservedCellNoUpdate"/>
                                    </dd>
                                    <dt>이메일</dt>
                                    <dd>
                                        <input type="text" className="mgt_10 mgb_10" id="reservedEmailUpdate"
                                           // value="korail@hcclab.com"
                                           defaultValue={"korail@hcclab.com"}
                                        />
                                    </dd>
                                </dl>
                                <ul className="sectionTxt noneLine">
                                    <li>※ 입력하신 이메일과 휴대폰 번호로 예약 정보가 전송되므로 정확한 정보를 입력해 주시기 바랍니다.</li>
                                </ul>

                                <div className="btnArea">
                                    <a className="lbtn btn-large filled mgt_30 mgb_20 "
                                       style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                                        // onClick="updateReservedInfo('J230516162916N')"
                                       onClick={() => updateReservedInfo('J230516162916N')}
                                    >확인</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C5_k" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1><span className="cRed">(필수)</span> 여권정보</h1>
                            <a
                                // onClick="hidePassportInfoArea()"
                                onClick={() => hidePassportInfoArea()}
                               className="btnClose full-pop-close">닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine pdb_20 passportInfoList">
                                <div className="sumTxt mgb_20">engLast/engFirst</div>
                                <dl className="inputArea">
                                    <dt>생년월일</dt>
                                    <dd className="mgt_10 mgb_20">
                                        {/*<fmt:parseDate var="birthday" value="${item.birthDay}" pattern="yyyyMMdd" />*/}
                                        <input type="text" className="" placeholder=""
                                               // value="yyyy-MM-dd"
                                               defaultValue={"yyyy-MM-dd"}
                                               id="passportBirth_count" data1="passengerId"/>
                                    </dd>
                                    <dt>여권번호</dt>
                                    <dd className="mgt_10 mgb_20">
                                        <input type="text"
                                               // className="passportNoArea <c:if test="${item.passportNo == null}">err-input</c:if>"
                                               className="passportNoArea"
                                               placeholder=""
                                               // value="passportNo"
                                               defaultValue={"passportNo"}
                                               id="passportNo_count"/>
                                        {/*<p className="err" style="display: <c:if test="${item.passportNo != null}">none</c:if>;" id="p_passportNo_<c:out value="${index.count}"/>"><i className="bgiNone">*</i> 여권번호를 입력해주세요</p><!-- 에러 메세지 -->*/}
                                        <p className="err" style={{display: "none"}} id="p_passportNo_count">
                                            <i className="bgiNone">*</i> 여권번호를 입력해주세요
                                        </p>
                                    </dd>
                                    <dt>여권만료일</dt>
                                    <dd className="mgt_10 mgb_20">
                                        yyyyMMdd
                                        <input type="text" className="passportDateArea err-input" placeholder=""
                                               // value="${passpordDateInfo}"
                                               defaultValue={"passpordDateInfo"}
                                               pattern="yyyy-MM-dd" id="passportDate_${index.count}"/>
                                        <p className="err" id="p_passportDate_${index.count}">
                                            <i className="bgiNone">*</i> 여권만료일을 입력해주세요
                                        </p>
                                    </dd>
                                    <dt>국적</dt>
                                    <dd className="mgt_10 mgb_20">
                                        <select id="passportAuthority_count" defaultValue={"KR"}>
                                            <option value="KR">대한민국</option>
                                            <option value="US">미국</option>
                                            <option value="CA">케나다</option>
                                            <option value="JP">일본</option>
                                        </select>
                                    </dd>
                                    <dt>발행국</dt>
                                    <dd className="mgt_10 mgb_20">
                                        <select id="passportNational_count" defaultValue={"KR"}>
                                            <option value="KR">대한민국</option>
                                            <option value="US">미국</option>
                                            <option value="CA">케나다</option>
                                            <option value="JP">일본</option>
                                        </select>
                                    </dd>
                                    </dl>
                                        {/*<c:if test="${index.last}">*/}
                                            <ul className="sectionTxt noneLine">
                                                <li>※ 탑승자명은 여권상의 영문명과 동일해야 하며, 영문명 변경 요청은 항공사 사정에 따라 거부될 수 있으니 정확한 정보를 입력해주시기 바랍니다.</li>
                                                <li>※ 여권 정보 오입력으로 인해 항공편 탑승 및 현지 입국이 거절될 수 있으며 이에 대해서는 당사는 책임지지 않습니다.</li>
                                                <li>※ 여권 유효기간은 출국일 기준 6개월 이상 남아야 출국 가능합니다.</li>
                                            </ul>
                                        {/*</c:if>*/}
                                    </div>

                            <div className="timeLine pdb_20">
                                <h1 className="f17"><span className="cGray1">(선택)</span> 현지 연락처</h1>
                                <ul className="sectionTxt noneLine">
                                    <li>※ 현지 연락처를 남기지 않아 발생한 문제는 당사에서 책임지지 않습니다.</li>
                                    <li>※ 항공사 스케줄 변경 및 운항 취소 시 연락 받을 수 있는 현지 연락처 정보를 정확하게 입력해 주시기 바랍니다.</li>
                                </ul>

                                <div className="btnArea">
                                    <a className="lbtn btn-large filled mgt_30"
                                       style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                                        // onClick="savePassportAndLocalInfo('J230516162916N')"
                                       onClick={() => savePassportAndLocalInfo('J230516162916N')}
                                    >저장</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C5_c" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>문의하기</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideQuestion()"
                               onClick={() => hideQuestion()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine pdb_20">
                                <ul className="sectionGroup">
                                    <li className="section-b">
                                        <div className="b_left">
                                            여정<br/>
                                        <span>
                                            인천(ICN)-히드로(LHR)
                                                -인천(ICN)
                                                </span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            예약번호(PNR번호)<br/>
                                            <span>5URJRA (5131-2806)</span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            예약자명<br/>
                                            <span>코레일테스트</span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="timeLine pdb_30 mgt_20 textWrap">
                                            <select id="questionSelectArea"
                                                // onChange="setQuestionSelectInfo()"
                                                onChange={() => setQuestionSelectInfo()}
                                                    defaultValue={""}
                                            >
                                                <option value="" disabled={true}>상담 사유를 선택해주세요</option>
                                                <option value="CRSV">예약</option>
                                                <option value="CFAR">운임</option>
                                                <option value="CREF">환불</option>
                                                <option value="CPAY">결제</option>
                                                <option value="CSAE">좌석</option>
                                                <option value="RCP1">현금영수증</option>
                                                <option value="CETC">기타</option>
                                            </select>
                                            <textarea className="mgt_10 h100 lh24" id="questionArea"
                                                      disabled=""></textarea>
                                            <span id="counter_3" className="counterClass">0 / 500 자</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="btnArea">
                                    <a className="lbtn btn-large filled mgt_30 mgb_20 "
                                       style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                                        // onClick="requestQuestion('110042')"
                                       onClick={() => requestQuestion('110042')}
                                    >요청하기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C5_d" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>문의하기 상세내역</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideQuestionDetailInfo()"
                               onClick={() => hideQuestionDetailInfo()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine pdb_20">
                                <div className="sumTxt mgb_20">문의 내용</div>
                                <ul className="sectionGroup">
                                    <li className="section-b">
                                        <div className="b_left">
                                            여정<br/>
                                            <span>인천(ICN)-히드로(LHR)-히드로(LHR)-인천(ICN)</span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            예약번호(PNR번호)<br/>
                                            <span>5URJRA (PNR:5131-2806)</span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            <span>코레일테스트</span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            상담분류<br/>
                                            <span id="question_rqnm"></span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            요청일<br/>
                                            <span id="question_rqdtm"></span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            처리일<br/>
                                            <span id="question_ansdtm">-</span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            상태<br/>
                                            <span className="cRed" id="question_rqprocstatuscd"></span>
                                        </div>
                                    </li>
                                    <li className="section-b">
                                        <div className="b_left">
                                            요청 내용<br/>
                                            <span id="question_rqcontent"></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="timeLine pdb_20">
                                <div className="sumTxt mgb_20">처리내역</div>
                                <ul className="sectionGroup">
                                    <li className="section-b">
                                        <div className="b_left">
                                            처리 결과<br/>
                                            <span id="question_anscontent"></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C5_l" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1><span className="cRed">(필수)</span> 체류지</h1>
                            <a
                                // onClick="hideStayInfo()"
                                onClick={() => hideStayInfo()}
                               className="btnClose full-pop-close">닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine pdb_20 stayInfoArea" id="stayInfo_1">
                                <div className="sumTxt mgb_20">KIM/DUCKJU</div>
                                <dl className="inputArea">
                                    <dt>체류도시</dt>
                                    <dd>
                                        <p className="input_inline mgt_10 mgb_10">
                                            <input type="text" className="mgr_5" placeholder="" value="" id="stayCity_1"
                                                   data1="" data2="" data3="" data4="" data5="1" disabled/>
                                            <a className="mbtn lbtn filled btn-large "
                                               style={{background: "#b3bac2", border: "1px solid #b3bac2"}}
                                               // onClick="showCitySearchArea(1, 'B')"
                                               onClick={() => showCitySearchArea(1, 'B')}
                                            >찾기</a>
                                        </p>
                                    </dd>
                                    <dt>우편번호</dt>
                                    <dd className="mgt_10 mgb_20">
                                        <input type="text" className="" placeholder=""
                                               // value=""
                                               defaultValue={""}
                                               id="stayPost_1"/>
                                    </dd>
                                    <dt>주소</dt>
                                    <dd className="mgt_10 mgb_10">
                                        <input type="text" className="stayAddressArea" placeholder=""
                                               // value=""
                                               defaultValue={""}
                                               id="stayAddress_1"/>
                                    </dd>
                                </dl>

                                <div className="mgb_10">
                                    <span className="check">
                                        <input id="stayCheck" type="checkbox"/>
                                        <label htmlFor="stayCheck"
                                           // onClick="setAllPassengerStayInfo()"
                                           onClick={() => setAllPassengerStayInfo()}
                                        >탑승객의 체류지 정보로 일괄 등록</label>
                                    </span>
                                </div>
                                <ul className="sectionTxt noneLine mgb_20">
                                    <li>※ 입력 시 한글, 특수문자(',', '.', '-' 등)을 제외하고 입력해 주시기 바랍니다.</li>
                                    <li>※ 미주 지역으로 예약하신 경우 체류지 정보를 반드시 입력해 주시기 바랍니다.</li>
                                    <li>※ 우편번호를 모르시는 경우 ‘999999’로 입력하셔도 무관합니다.</li>
                                </ul>
                            </div>
                            <div className="schedule-title">
                                <div className="sch_tit">체류지 정보 변경에 대한 동의</div>
                            </div>
                            <div className="timeLine pdb_20">
                                <div className="flightNotice mgt_20 schedule_toggle">
                                    <ul className="flightNoticeList">
                                        <li>
                                            <div className="flightNoticeToggle">
											<span className="check">
												<input id="check05-a" name="stayCheckBox" type="checkbox"/>
                                                <label htmlFor="check05-a">동의</label>
											</span>
                                                <a>[개인정보 수집 및 이용동의]</a>
                                            </div>
                                            <div className="flightNoticeCont">
                                                <div className="flightNoticeContInner scrollbar-inner">
                                                    <div className="flightNoticeContInside">
                                                        <div className="subTit">
                                                            <b><span>■&nbsp;</span></b>
                                                            <b><span>개인정보 수집항목 및 이용목적</span></b>
                                                            <p className="MsoNormal">
                                                                <b><span>&nbsp;</span></b>
                                                            </p>
                                                            <p className="MsoNormal">
                                                                <span>회사는 여행상품의 예약 및 여행관련 서비스 제공 등의 업무처리를 위하여 고객으로부터 최소한의 필수정보를 수집하고 있으며
                                                                    <span>,&nbsp;</span>
                                                                    수집한 모든 개인정보는 별도의 동의가 없는 한 개인정보 수집 및 이용목적에서 고지한 이외의 다른 목적으로 사용되지 않습니다
                                                                    <span>.<br/><br/><br/><b>1)&nbsp;</b></span>
                                                                    <b>회원가입 및 예약 등 필요시점에 수집하는 개인정보의 범위</b>
                                                                    {/*<span></span>*/}
                                                                </span>
                                                            </p>
                                                            <table className="MsoTableGrid __se_tbl_ext" border="1"
                                                                   cellSpacing="0" cellPadding="0"
                                                                   style={{borderCollapse: "collapse", border: "none"}}
                                                            >
                                                                <tbody>
                                                                <tr
                                                                    // style="height: 23.6pt;"
                                                                >
                                                                    <td width="47"
                                                                        // style="width: 35.2pt; border: 1pt solid windowtext; padding: 0cm 5.4pt; height: 23.6pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>구분<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="66"
                                                                        // style="width: 49.6pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 23.6pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>수집방법<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246"
                                                                        // style="width: 184.3pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 23.6pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>수집항목<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142"
                                                                        // style="width: 106.3pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 23.6pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>이용목적<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="95"
                                                                        // style="width: 70.9pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt; height: 23.6pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>보유기간<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47">
                                                                        <p className="MsoNormal">
                                                                            <b><span>필수<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="66">
                                                                        <p className="MsoNormal">
                                                                            <span>가입<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246">
                                                                        <p className="MsoNormal">
                                                                            <span>
                                                                                성명<span>,</span>
                                                                                성별<span>,</span>
                                                                                생년월일<span>,</span>
                                                                                휴대폰번호<span>,</span>
                                                                                이메일<span>,</span>
                                                                                본인인증정보<span>(CI)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            <span>
                                                                                이용자 식별 및 본인여부 확인을 통한 회원제 서비스 제공 및 상담<span>,&nbsp;</span>예약내역 전달
                                                                                <span></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="95" rowSpan="6">
                                                                        <p className="MsoNormal">
                                                                            <span>회원탈퇴시 또는 법정 의무 보유기간
                                                                                <span><br/><br/></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47">
                                                                        <p className="MsoNormal">
                                                                            <b><span>필수<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="66" rowSpan="5">
                                                                        <p className="MsoNormal">
                                                                            <span>항공예약 및 발권<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246">
                                                                        <p className="MsoNormal">
                                                                            <span>
                                                                                예약자 및 동반자정보
                                                                                <span><br/>[</span>
                                                                                성명<span>(</span>영문<span>/</span>국문<span>),</span>
                                                                                생년월일<span>,</span>휴대폰번호<span>,</span>
                                                                                이메일<span>,&nbsp;</span>여권정보<span>(</span>
                                                                                국적<span>,</span>발행국<span>,</span>여권번호<span>,&nbsp;</span>
                                                                                여권만료일<span>)]</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            <span>항공예약 및 발권<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47">
                                                                        <p className="MsoNormal">
                                                                            <b><span>선택<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246">
                                                                        <p className="MsoNormal">
                                                                            <span>
                                                                                현지연락처정보<span>(</span>
                                                                                도시<span>,</span>
                                                                                현지연락처<span>,</span>
                                                                                연락처<span>),&nbsp;</span>
                                                                                체류지정보<span>(</span>
                                                                                도시<span>,</span>
                                                                                우편번호<span>,</span>
                                                                                주소<span>)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            <span>항공사 스케줄 변경 및 운항취소 정보전달 및 미주의 경우
                                                                                <span>,&nbsp;</span>체류지 정보 필요<span></span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47">
                                                                        <p className="MsoNormal">
                                                                            <b><span>선택<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246">
                                                                        <p className="MsoNormal">
                                                                            <span>
                                                                                증빙서류<span>(</span>
                                                                                재직증명서<span>,&nbsp;</span>
                                                                                가족관계증명서<span>)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            <span>여행상품의 결제<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47">
                                                                        <p className="MsoNormal">
                                                                            <b><span>선택<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246">
                                                                        <p className="MsoNormal">
                                                                            <span>항공사<span>,&nbsp;</span>마일리지번호<span
                                                                               ></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            <span>항공사 마일리지 적립 제공<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="47">
                                                                        <p className="MsoNormal">
                                                                            <b><span>필수<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="246">
                                                                        <p className="MsoNormal">
                                                                            <span>결제정보<span>(</span>카드사명<span>,</span>카드번호<span>,</span>계좌번호<span>,&nbsp;</span>유효기간<span>,&nbsp;</span>비밀번호<span>,&nbsp;</span>카드소유주명<span>)</span>
                                                                            </span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            <span>여행상품의 결제<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <p className="MsoNormal"
                                                               // style="margin-bottom: 12pt; line-height: normal; word-break: keep-all;"
                                                            >
                                                                <span><br/><b>2)&nbsp;</b></span>
                                                                <b><span>기타 법정 의무 수집정보 등<span></span></span></b>
                                                            </p>
                                                            <table className="MsoTableGrid __se_tbl_ext" border="1"
                                                                   cellSpacing="0" cellPadding="0" width="595"
                                                                   // style="width: 446.3pt; border-collapse: collapse; border: none;"
                                                            >
                                                                <tbody>
                                                                <tr>
                                                                    <td width="113"
                                                                        // style="width: 84.8pt; border: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>관련법률</span></b><span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208"
                                                                        // style="width: 155.95pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>수집 항목<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189"
                                                                        // style="width: 5cm; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>이용 목적<span></span></span></b>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85"
                                                                        // style="width: 63.8pt; border-top: 1pt solid windowtext; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-image: initial; border-left: none; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <b><span>보유 기간</span></b><span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="113"
                                                                        // style="width: 84.8pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>전자상거래법<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208"
                                                                        // style="width: 155.95pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>고객식별정보<span>,&nbsp;</span>분쟁처리기록<span>,&nbsp;</span>계약<span>·</span>철회 기록<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189"
                                                                        // style="width: 5cm; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>소비자 불만 또는 분쟁처리<span>,&nbsp;</span>계약내용 확인<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85"
                                                                        // style="width: 63.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>3</span><span>년<span>&nbsp;/ 5</span>년<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="113"
                                                                        // style="width: 84.8pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal"
                                                                           >
                                                                            <span
                                                                                >국세기본법<span
                                                                               ></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208"
                                                                        // style="width: 155.95pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>국세증빙자료<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189"
                                                                        // style="width: 5cm; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>국세 소멸시효 계산<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85"
                                                                        // style="width: 63.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>10</span><span>년<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="113"
                                                                        // style="width: 84.8pt; border-right: 1pt solid windowtext; border-bottom: 1pt solid windowtext; border-left: 1pt solid windowtext; border-image: initial; border-top: none; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>통신비밀보호법<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="208"
                                                                        // style="width: 155.95pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>로그기록<span>, IP</span>등<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="189"
                                                                        // style="width: 5cm; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>수사기관 제공<span>&nbsp;(</span>법원 영장 등 정당한 절차의 경우에 제공<span>)</span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="85"
                                                                        // style="width: 63.8pt; border-top: none; border-left: none; border-bottom: 1pt solid windowtext; border-right: 1pt solid windowtext; padding: 0cm 5.4pt;"
                                                                    >
                                                                        <p className="MsoNormal">
                                                                            <span>3</span><span>개월<span></span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <p className="MsoNormal">
                                                                <span>&nbsp;</span>
                                                            </p>
                                                            <p className="MsoNormal">
                                                                <b><span>3)&nbsp;</span></b>
                                                                <b><span>동의를 거부할 권리 및 동의를 거부할 경우의 불이익</span></b>
                                                                <span><br/><br/>&nbsp; &nbsp;</span>
                                                                <span>개인정보 주체자는 개인정보 수집<span>,&nbsp;</span>이용에 대한 동의를 거부할 권리가 있습니다<span>.<br/></span></span>
                                                            </p>
                                                            <p>
                                                                <span>&nbsp;&nbsp;</span>
                                                                <span>동의를 거부할 경우 회원가입 및 서비스 제공이 불가함을 알려드립니다</span>&nbsp;
                                                            </p>
                                                            &nbsp;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flightNoticeToggle">
											<span className="check">
												<input id="check05-b" name="stayCheckBox" type="checkbox"/>
                                                <label htmlFor="check05-b">동의</label>
											</span>
                                                <a>[개인정보 제3자 제공 동의]</a>
                                            </div>
                                            <div className="flightNoticeCont">
                                                <div className="flightNoticeContInner scrollbar-inner">
                                                    <div className="flightNoticeContInside">
                                                        <div className="subTit">
                                                            <b>
                                                                <span
                                                                    // style="font-size: 11pt;"
                                                                ></span>
                                                            </b>
                                                            <b><span>■&nbsp;</span></b>
                                                            <b>개인정보의 제<span>3</span>자 제공 안내</b>
                                                            <p className="MsoNormal"><span
                                                                    // style="font-size: 9pt; line-height: 12.84px;"
                                                            >
                                                                본사는 원칙적으로 이용자의 개인정보를 수집하는 개인정보의 항목 및 수집방법<span>'</span>에서 명시한 범위 내에서만 처리하며<span>,&nbsp;</span>
                                                                동 범위를 초과하여 이용하거나 제<span>3</span>자에게 제공하지 않습니다<span>.&nbsp;</span>
                                                                다만<span>,&nbsp;</span>이용자의 사전 동의<span>,&nbsp;</span>법률의 특별한 규정 등 개인정보 보호법 제<span>17</span>조 및 제<span>18</span>조에 해당하는 경우에는
                                                                개인정보를 제<span>3</span>자에게 제공할 수 있습니다<span>.<br/>&nbsp;</span>
                                                                이용자는 개인정보의 제<span>3</span>자 제공에 대하여 동의를 하지 않을 수 있으며
                                                                <span>,&nbsp;</span>언제든지 제<span>3</span>자 제공 동의를 철회할 수 있습니다<span>.&nbsp;</span>
                                                               동의를 거부하는 경우에도 서비스를 이용할 수 있으나<span>,&nbsp;</span>제<span>3</span>자 제공에 기반한 관련 서비스의 이용 및 제공이 제한될 수 있습니다<span>.<br/>&nbsp;</span>
                                                            </span></p>
                                                            <p className="MsoNormal">
                                                                다음과 같이 개인정보를 제<span>3</span>자에게 제공하고 있습니다<span>.</span>
                                                            </p>
                                                            <table className="MsoTableGrid __se_tbl_ext" border="1"
                                                                   cellSpacing="0" cellPadding="0"
                                                                   // style="border-collapse: collapse; border: none;"
                                                            >
                                                                <tbody>
                                                                <tr>
                                                                    <td width="141">
                                                                        <p className="MsoNormal">
                                                                            <b>제공받는자</b><span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="180">
                                                                        <p className="MsoNormal">
                                                                            <b>제공항목</b><span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            <b>제공목적</b><span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="138">
                                                                        <p className="MsoNormal">
                                                                            <b>보유기간</b><span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="141">
                                                                        <p className="MsoNormal">
                                                                            서비스 제공 항공사<span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="180">
                                                                        <p className="MsoNormal">
                                                                            성명<span>(</span>국영문<span>),&nbsp;</span>
                                                                            성별<span>,&nbsp;</span>여권정보
                                                                            <span>(</span>국적<span>,&nbsp;</span>여권번호<span>,&nbsp;</span>
                                                                            여권종류<span>,&nbsp;</span>여권유효기간<span>),&nbsp;</span>
                                                                            마일리지번호<span>,&nbsp;</span>
                                                                            체류지 정보<span>(</span>미주 여행 시<span>),&nbsp;</span>
                                                                            휴대폰번호<span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142">
                                                                        <p className="MsoNormal">
                                                                            항공권 예약<span>/</span>발권<span>,&nbsp;</span>
                                                                            개인식별<span>,&nbsp;</span>고지사항전달<span>,&nbsp;</span>
                                                                            마일리지 적립<span>,</span>전환<span>,&nbsp;</span>
                                                                            및 출국가능여부 등 파악<span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="138" rowSpan="3">
                                                                        <p className="MsoNormal">
                                                                            개인정보 이용목적 달성 시
                                                                            <span>(</span>제휴업체는 제휴계약 종료 시<span>)&nbsp;</span>
                                                                            및 관계법령에 따른 보관기간까지<span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="141">
                                                                        <p className="MsoNormal">㈜토파스여행정보<span></span></p>
                                                                    </td>
                                                                    <td width="180">
                                                                        <p className="MsoNormal">
                                                                            성명<span>(</span>국영문<span>),&nbsp;</span>생년월일<span>,&nbsp;</span>
                                                                            여권정보<span>(</span>여권번호<span>,&nbsp;</span>여권만료일<span>),&nbsp;</span>
                                                                            휴대전화번호<span>,&nbsp;</span>마일리지 정보<span>,</span><span></span>
                                                                        </p>
                                                                    </td>
                                                                    <td width="142" rowSpan="2">
                                                                        <p className="MsoNormal">
                                                                            <span>&nbsp;</span>
                                                                        </p>
                                                                        <p className="MsoNormal">
                                                                            <span>&nbsp;</span>
                                                                        </p>
                                                                        <p className="MsoNormal">
                                                                            항공권 예약<span>/</span>발권<span>/</span>
                                                                        </p>
                                                                        <p className="MsoNormal">
                                                                            결제 및 서비스 제공<span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width="141">
                                                                        <p className="MsoNormal">㈜아시아나애바카스<span></span></p>
                                                                    </td>
                                                                    <td width="180">
                                                                        <p className="MsoNormal">
                                                                            카드정보<span>(</span>카드사명<span>,&nbsp;</span>
                                                                            카드번호<span>,&nbsp;</span>카드만료일<span>,&nbsp;</span>비밀번호<span>),&nbsp;</span>
                                                                            환불 시<span>(</span>은행명<span>,&nbsp;</span>계좌번호<span>,&nbsp;</span>예금주<span>)</span><span></span>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <br/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="btnArea mgt_30">
                                    <a className="lbtn btn-large filled"
                                       // style="background: #4a6cb3; border:1px solid #4a6cb3"
                                       // onClick="savePassengerStayInfo('J230516162916N')"
                                       onClick={() => savePassengerStayInfo('J230516162916N')}
                                    >저장</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="citySearch" className="full-layer">
                <div id="header" className="center">
                    <div className="header_top">
                        <a className="btnPrev"
                           // onClick="hideCitySearchArea()"
                           onClick={() => hideCitySearchArea()}
                        >이전</a>
                        <h1>도시 검색</h1>
                    </div>
                </div>
                <div id="content">
                    <div className="searchWrap v1 city-search">
                        <div className="searchForm">
                            <input type="text" placeholder="도시명을 검색해주세요" id="searchCityTextArea"/>
                            <a className="btn-closed"
                               // onClick="setDefaultSearchTextArea()"
                               onClick={() => setDefaultSearchTextArea()}
                            >
                                <span className="hdn">검색</span>
                            </a>
                        </div>
                        <div className="searchWrap-comment">※ 도시명(국문/영문) 또는 도시 코드를 입력해 주시기 바랍니다.</div>
                    </div>
                    <div className="start-p">
                        <div className="errorNo_wrap" id="nonSearchList">
                            <div className="errorNo">
                                <strong>검색된 결과가 없습니다.</strong>
                            </div>
                        </div>
                        <ul id="searchList" style={{display: "none"}}>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="C5_j2" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1><span className="cGray1">(선택)</span> 마일리지</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideMileagePopup()"
                               onClick={() => hideMileagePopup()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="timeLine pdb_20">
                                <div className="sumTxt mgb_20" id="engName" data1="110042">/</div>

                                <dl className="inputArea">
                                    <dt id="selectMileageAirLineArea">
                                        루프트한자
                                    </dt>
                                    <dd className="mgt_10 mgb_10">
                                        <select id="airLineList"
                                            // onChange="setSelectAirLine()"
                                            onChange={() => setSelectAirLine()}
                                                defaultValue={"LH"}
                                        >
                                            <option value="LH">루프트한자</option>
                                            <option value="AC">에어캐나다</option>
                                            <option value="UA">유나이티드</option>
                                            <option value="SK">스칸디나비아</option>
                                            <option value="TG">타이항공</option>
                                            <option value="NZ">에어뉴질랜드</option>
                                            <option value="NH">전일본공수</option>
                                            <option value="OS">오스트리아항공</option>
                                            <option value="SQ">싱가포르항공</option>
                                            <option value="OZ">아시아나항공</option>
                                            <option value="LO">LOT 폴란드 항공</option>
                                            <option value="OU">크로아티아항공</option>
                                            <option value="TP">TAP 포르투갈 항공</option>
                                            <option value="LX">스위스 국제항공</option>
                                            <option value="SA">남아프리카항공</option>
                                            <option value="CA">중국국제항공</option>
                                            <option value="TK">터키항공</option>
                                            <option value="MS">이집트항공</option>
                                            <option value="SN">브뤼셀항공</option>
                                            <option value="A3">에게안항공</option>
                                            <option value="ET">에티오피아항공</option>
                                            <option value="CM">코파항공</option>
                                            <option value="AV">아비앙카항공</option>
                                            <option value="ZH">선전항공</option>
                                            <option value="BR">에바항공</option>
                                            <option value="AI">에어인디아</option>
                                            <option value="KE">대한항공</option>
                                            <option value="AM">아에로멕시코</option>
                                            <option value="DL">델타항공</option>
                                            <option value="AF">에어프랑스</option>
                                            <option value="OK">체코항공</option>
                                            <option value="KL">KLM네덜란드항공</option>
                                            <option value="UX">에어에우로파</option>
                                            <option value="KQ">케냐항공</option>
                                            <option value="RO">타롬항공</option>
                                            <option value="VN">베트남항공</option>
                                            <option value="MU">중국동방항공</option>
                                            <option value="FM">상하이항공</option>
                                            <option value="CI">중화항공</option>
                                            <option value="SV">사우디아항공</option>
                                            <option value="ME">중동항공</option>
                                            <option value="AR">아르헨티나항공</option>
                                            <option value="MF">샤먼항공</option>
                                            <option value="GA">가루다 인도네시아 항공</option>
                                            <option value="AZ">ITA 항공</option>
                                            <option value="AA">아메리칸항공</option>
                                            <option value="BA">영국항공</option>
                                            <option value="CX">캐세이 퍼시픽 항공</option>
                                            <option value="QF">콴타스</option>
                                            <option value="AY">핀에어</option>
                                            <option value="IB">이베리아항공</option>
                                            <option value="JL">일본항공</option>
                                            <option value="RJ">로얄 요르단 항공</option>
                                            <option value="MH">말레이시아항공</option>
                                            <option value="QR">카타르항공</option>
                                            <option value="UL">스리랑카항공</option>
                                            <option value="AT">로얄 에어 모로코</option>
                                            <option value="AS">알래스카항공</option>
                                            <option value="WY">오만항</option>
                                            <option value="UU">에어오스트랄</option>
                                            <option value="MD">에어마다가스카르</option>
                                            <option value="UQ">에어모리셔스</option>
                                            <option value="HM">에어세이셸</option>
                                            <option value="I7">INT`Air Iles</option>
                                            <option value="7C">제주항공</option>
                                            <option value="5J">세부퍼시픽</option>
                                            <option value="DG">세브고</option>
                                            <option value="DD">녹에어</option>
                                            <option value="TR">스쿠트항공</option>
                                            <option value="UO">홍콩익스프레스</option>
                                            <option value="8L">럭키에어</option>
                                            <option value="UQ">우루무치항공</option>
                                            <option value="PN">중국서부항공</option>
                                            <option value="ZE">이스타항공</option>
                                        </select>
                                    </dd>
                                    <dd className="mgb_10">
                                        <input type="text" className="" id="mileageNumberArea"
                                               placeholder="항공사 마일리지 번호를 입력해주세요"
                                               // value=""
                                               defaultValue={""}
                                        />
                                    </dd>
                                </dl>

                                <ul className="sectionTxt noneLine mgb_20">
                                    <li>
                                        ※ 항공마일리지 번호를 남겨주시면 예약 기록으로 등록해 드립니다.<br/>
                                        (단, 항공사 전송문제로 누락될 수 있으므로 공항에서 재확인 바랍니다.)
                                    </li>
                                    <li>※ 마일리지 적립은 탑승자 본인만 가능하며, 실제 탑승 후 적립됩니다.</li>
                                    <li>
                                        ※ 입력하신 마일리지 정보는 사전에 항공사로 입력/전송하고 있으나,
                                        실제 마일리지 적립 여부는 온라인 상담 또는 유선으로 확인해주시기 바랍니다.
                                    </li>
                                    <li>※ 항공권에 따라 적립이 불가할 수 있으니 규정을 꼭 확인해 주시기 바랍니다.</li>
                                </ul>

                                <div className="btnArea mgt_30">
                                    <a className="lbtn btn-large filled"
                                       // style="background: #4a6cb3; border:1px solid #4a6cb3"
                                       // onClick="requestSaveMileage()"
                                       onClick={() => requestSaveMileage()}
                                    >저장</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C7_c" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>환불신청</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideRefundPopup()"
                               onClick={() => hideRefundPopup()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <div className="boxCont msgBox">
                            <div className="tabArea2 full seatBtn refund">
                                <div className="tab02">
                                    <ul className="tab seat-btn">
                                        <li className="current" data-tab="refund-write" id="refund_reasonArea"><a>01<br/>환불
                                            사유 입력</a></li>
                                        <li data-tab="refund-choice" id="refund_passangerArea"><a>02<br/>환불 탑승자 선택<br/>(환불요청)</a>
                                        </li>
                                        <li data-tab="refund-completion" id="refund_paymentArea"><a>03<br/>환불 완료</a></li>
                                    </ul>
                                </div>

                                <div id="refund-write" className="tabcontent current">
                                    <div className="timeLine pdb_20 pdt_10">
                                        <div className="sumTxt mgb_20">예약 정보</div>
                                        <div className="ticketWrap pd_a0 airInfo">
                                            <div className="ticket_new">
                                                <div className="ticketInner">
                                                    <div className="ticketInfo">
                                                        <span className="airTitle rdWait mgl_20 mgb_20">예약취소</span>

                                                        <div className="airSummary">
                                                            <div className="itinerary">
                                                                <div className="airport">
                                                                    <p className="place">인천</p>
                                                                    <p className="name">ICN</p>
                                                                </div>
                                                                <div className="leadTime">
                                                                    <p className="time">
                                                                        <span className="hour">16</span>시간
                                                                        <span className="minute">20</span>분
                                                                    </p>
                                                                    <p className="arrow">
                                                                        <span className="via"></span>
                                                                    </p>
                                                                </div>
                                                                <div className="airport">
                                                                    <p className="place">히드로</p>
                                                                    <p className="name">LHR</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="airSummary">
                                                            <div className="itinerary">
                                                                <div className="airport">
                                                                    <p className="place">히드로</p>
                                                                    <p className="name">LHR</p>
                                                                </div>
                                                                <div className="leadTime">
                                                                    <p className="time">
                                                                        <span className="hour">14</span>시간
                                                                        <span className="minute">15</span>분
                                                                    </p>
                                                                    <p className="arrow">
                                                                        <span className="via"></span>
                                                                    </p>
                                                                </div>
                                                                <div className="airport">
                                                                    <p className="place">인천</p>
                                                                    <p className="name">ICN</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="wayArea">
                                                            <a
                                                                // onClick="openDetailTravelInfo()"
                                                                onClick={() => openDetailTravelInfo()}
                                                            >항공 상세 스케줄</a>
                                                        </div>
                                                    </div>
                                                    <div className="define">
                                                        <div className="price titWrap airWrap">
                                                            <div className="airDetail">
                                                                <p className="tit">예약번호(PNR번호)</p>
                                                                <p className="detail">5URJRA (PNR:5131-2806)</p>
                                                            </div>
                                                            <div className="airDetail">
                                                                <p className="tit">총 일정</p>
                                                                <p className="detail">2023-07-03(월) ~ 2023-07-08(토)</p>
                                                            </div>
                                                            <div className="airDetail">
                                                                <p className="tit">탑승객/좌석</p>
                                                                <p className="detail">1명
                                                                    <span className="titc">(성인1명)</span>/ 일반석
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="schedule-title pdt_20">
                                        <div className="sch_tit">환불 사유</div>
                                    </div>
                                    <div className="timeLine pdb_30 mgt_20 textWrap">
                                        <select id="refundSelectBox"
                                            // onChange="checkSelectBox(false)"
                                            onChange={() => checkSelectBox(false)}
                                            defaultValue={""}
                                        >
                                            <option value="" disabled={true}>환불 사유를 선택해주세요</option>
                                            <option value="D06">여행 일정 변경</option>
                                            <option value="D03">할인혜택 적용을 위해</option>
                                            <option value="D04">다른 상품으로 재 예약하기 위해서</option>
                                            <option value="D05">다른 항공사/여행사보다 요금이 비싸서</option>
                                            <option value="D07">직접입력</option>
                                        </select>
                                        <textarea className="mgt_10 h100 lh24" id="refundReason" data1="110042"
                                                  data2="J230516162916N" disabled=""></textarea>
                                        <span id="counter_2" className="counterClass">0 / 300 자</span>
                                    </div>

                                    <div className="btnArea">
                                        <a className="lbtn btn-large filled mgt_30 mgb_20 "
                                           style={{background: "#4a6cb3", border: "1px solid #4a6cb3",}}
                                           // onClick="movePage('refund_passangerArea')"
                                           onClick={() => movePage('refund_passangerArea')}
                                        >환불 탑승자 선택 &gt;</a>
                                    </div>
                                </div>

                                <div id="refund-choice" className="tabcontent">
                                    <div className="timeLine pdb_20">
                                        <ul className="detailRule total">
                                            <li>
                                                <p className="tit">
                                                    탑승자 선택<br/>
                                                    <span className="mgt_5 t_addition">예약 자체를 완전히 취소하시고자 할 경우 탑승자<br/>전체를 선택해 주시기 바랍니다.</span>
                                                </p>
                                                <p className="cost mgt_50">
												<span className="check txtBlock checkRight">
													<input id="check-s0" type="checkbox"/>
                                                    <label htmlFor="check-s0"
                                                       // onClick="allCheck('refundPassenger', 'check-s0')"
                                                       onClick={() => allCheck('refundPassenger', 'check-s0')}
                                                    >전체선택</label>
												</span>
                                                </p>
                                            </li>
                                        </ul>
                                        <ul className="detailRule bt1">
                                        </ul>
                                    </div>

                                    <div className="timeLine pdb_20">
                                        <div className="sumTxt mgb_20">환불 규정</div>
                                        <ul className="sectionTxt mgb_20">
                                            <li>※ 탑승객은 항공권 예약 시 당사가 제공한 환불에 대한 정보를 숙지하고 환불 가능 여부를 확인해야 합니다.</li>
                                            <li>※ 결제 후 취소 및 환불 시 항공사 수수료외에 여행사 수수료가 부과됩니다.</li>
                                            <li>※ 환불시 발권할 때 징수된 발권 수수료는 환불되지 않습니다.</li>
                                            <li>※ 환불 업무는 영업일(영업시간)에만 가능하므로 유의 하시기 바랍니다.</li>
                                            <li className="cBlack fb600">환불접수 가능시간:평일 월~금 09:00~17:00<br/>(토/일/공휴일 제외)
                                            </li>
                                            <li className="mgt_20 mgb_20">
                                                <div className="refund-agree">
												<span className="check txtBlock">
													<input id="check-refund-agree" type="checkbox"/>
                                                    <label htmlFor="check-refund-agree">환불 규정 및 안내사항을 모두 확인하고 동의합니다.</label>
												</span>
                                                </div>
                                            </li>
                                            <li>※ 환불은 실시간 처리가 아니며, 담당자 확인 후 개별 연락 드립니다.</li>
                                            <li>※ 주말이나,업무시간이 아닌 때에 탑승하시는 경우 노쇼 패널티 추가징수 방지를 위해 항공사나 공항으로 미리 연락하여 예약 취소를
                                                요청하시기 바랍니다.
                                            </li>
                                            <li>※ 환불에 따른 환불 위약금이 발생됩니다.</li>
                                            <li>※ 출발일 임박 또는 항공사에 따라서 취소가 불가능한 경우도 있습니다.</li>
                                        </ul>

                                        <div className="btnArea">
                                            <a className="lbtn btn-large filled mgt_30 mgb_20"
                                               // style="background: #4a6cb3; border:1px solid #4a6cb3"
                                               // onClick="refundCheck()"
                                               onClick={() => refundCheck()}
                                            >환불요청</a>
                                        </div>
                                        <div className="txt-c mgt_20">
                                            <a className="btn_allDefault txtde-lt"
                                               // onClick="movePage('refund_reasonArea')"
                                               onClick={() => movePage('refund_reasonArea')}
                                            >환불 사유 입력</a>
                                        </div>
                                    </div>
                                </div>

                                <div id="refund-completion" className="tabcontent">
                                    <div className="timeLine pdb_20">
                                        <div className="sumTxt mgb_20">환불 예정 금액</div>
                                        <ul className="detailRule total">
                                            <li>
                                                <p className="tit">총 항공권 금액<span className="f13 cGray1">(환불 전)</span></p>
                                                <p className="cost" id="beforeCost">0원</p>
                                            </li>
                                        </ul>
                                        <ul className="detailRule">
                                            <li>
                                                <p className="tit f17 cBlack fb600">환불 예정 금액</p>
                                            </li>
                                            <li>
                                                <p className="tit">환불 예정 항공권 금액</p>
                                                <p className="cost" id="refundCost">0원</p>
                                            </li>
                                            <li>
                                                <p className="tit">항공사 수수료</p>
                                                <p className="cost" id="refundCommitionCost">0원</p>
                                            </li>
                                        </ul>
                                        <ul className="detailRule total borTop-1px">
                                            <li>
                                                <p className="tit">최종 환불 금액</p>
                                                <p className="cost cRed" id="calcRefundCost"></p>
                                            </li>
                                        </ul>
                                        <ul className="sectionTxt bt1 pdt_10 mgb_20">
                                            <li>※ 환불 금액은 환불 예정 금액(발권대행료 미포함)에서 항공사 수수료를 제외한 나머지 금액을 환불 처리합니다.</li>
                                            <li>※ 항공사 규정에 따라 항공사 수수료가 발생할 수 있습니다.</li>
                                        </ul>
                                    </div>

                                    <div className="timeLine pdb_20">
                                        <div className="sumTxt mgb_20" id="commitionInfoArea">수수료 안내</div>
                                        <div className="btnArea">
                                            <a className="lbtn btn-large filled mgt_30 mgb_20"
                                               // style="background: #4a6cb3; border:1px solid #4a6cb3"
                                               // onClick="requestCommitionPayment()"
                                               onClick={() => requestCommitionPayment()}
                                               id="paymentCommition">0원 수수료 결제</a>
                                        </div>
                                        <div className="txt-c mgt_20">
                                            <a className="btn_allDefault txtde-lt"
                                               // onClick="movePage('refund_passangerArea')"
                                               onClick={() => movePage('refund_passangerArea')}
                                            >탑승자 선택</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="C8_c" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>신용카드 매출전표</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hidePaymentInfo()"
                               onClick={() => hidePaymentInfo()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <section>
                            <div className="boxCont">
                                <div className="timeLine pdb_20">
                                    <div className="info_form">
                                        <dl className="inputArea">
                                            <dt><i className="err bgiNone">*</i> 수신자 E-mail</dt>
                                            <dd>
                                                <select className="mgt_10">
                                                    <option>korail@hcclab.com</option>
                                                </select>
                                            </dd>
                                        </dl>
                                    </div>

                                    <ul className="sectionGroup mgt_20">
                                        <li className="section-b">
                                            <div className="b_left">
                                                제목<br/>
                                                <span>결제영수증</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="btnArea">
                                        <a className="lbtn btn-large filled mgb_20 "
                                           // style="background: #4a6cb3; border:1px solid #4a6cb3"
                                        >메일발송</a>
                                    </div>
                                </div>

                                <div className="timeLine pdb_20">
                                    <div className="sumTxt mgb_20">공급자 정보</div>
                                    <ul className="sectionGroup">
                                        <li className="section-b">
                                            <div className="b_left">
                                                업체명<br/>
                                                <span>LACHA</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                대표자명<br/>
                                                <span>홍길동</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                사업자 등록번호<br/>
                                                <span>105-86-90908</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                전화번호<br/>
                                                <span>02-723-2233</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                주소<br/>
                                                <span>서울시 강남구 선릉로86길, 4층 라쿠카라차</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="detailRule total borTop-1px">
                                        <li>
                                            <p className="tit">결제 금액</p>
                                            <p className="cost">2,445,600원</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div id="C8_e" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>발권대행료 매출전표</h1>
                            <a className="btnClose full-pop-close"
                               // onClick="hideTasfInfo()"
                               onClick={() => hideTasfInfo()}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont">
                        <section>
                            <div className="boxCont">
                                <div className="timeLine pdb_20">
                                    <div className="info_form">
                                        <dl className="inputArea">
                                            <dt><i className="err bgiNone">*</i> 수신자 E-mail</dt>
                                            <dd>
                                                <select className="mgt_10">
                                                    <option>korail@hcclab.com</option>
                                                </select>
                                            </dd>
                                        </dl>
                                    </div>

                                    <ul className="sectionGroup mgt_20">
                                        <li className="section-b">
                                            <div className="b_left">
                                                제목<br/>
                                                <span>발권대행료 - 결제영수증</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="btnArea">
                                        <a className="lbtn btn-large filled mgb_20 "
                                           // style="background: #4a6cb3; border:1px solid #4a6cb3"
                                        >메일발송</a>
                                    </div>
                                </div>

                                <div className="timeLine pdb_20">
                                    <div className="sumTxt mgb_20">공급자 정보</div>
                                    <ul className="sectionGroup">
                                        <li className="section-b">
                                            <div className="b_left">
                                                업체명<br/>
                                                <span>LACHA</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                대표자명<br/>
                                                <span>홍길동</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                사업자 등록번호<br/>
                                                <span>105-86-90908</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                전화번호<br/>
                                                <span>02-723-2233</span>
                                            </div>
                                        </li>
                                        <li className="section-b">
                                            <div className="b_left">
                                                주소<br/>
                                                <span>서울시 강남구 선릉로86길, 4층 라쿠카라차</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="detailRule total borTop-1px">
                                        <li>
                                            <p className="tit">결제 금액</p>
                                            <p className="cost">원</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default App;