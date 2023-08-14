import $ from 'jquery';
import {useEffect, useRef, useState} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import {full_layer_Pop} from "./js/common";

function App() {
    let tabIndicator = true;
    let _tempAir = 1;
    let isFetchingAir = false;

    // const selectedInput = useRef(null);

    useEffect(() => {
        $('ul#airTabUl li').click(function(){
            var tabData = $(this).attr('data-tab');
            document.getElementById("schDeuDateCd").value = $(this).attr("data1");

            $('.tabArea ul#airTabUl li').removeClass('current');
            $(this).addClass('current');
            $('#airSearchArea').addClass('current');
            if (tabData !== "tab4") {
                $("#airCalArea").hide();
            } else {
                $("#airCalArea").show();
            }
        })

        common.full_layer_Pop();
    }, [])

    function setDetailSearch() {
        var $el = $('#B2_f');
        $el.attr("tabindex", "0").fadeIn().focus();

        $('#airSearchArea').addClass('current');
    }

    function searchAirOrderList() {
        document.getElementById("schOrdNo").value
            = document.getElementById("searchAirOrderString").value.toUpperCase();
        getAirOrderList(0);
    }

    function checkAllStatusValue() {
        const allCheck = document.getElementById("cbx_direct_chkAll").checked;
        for (var i = 1; i < 6; i++) {
            document.getElementById("cbx_direct_chk" + i).checked = allCheck;
        }
    }

    function detailSearchAirOrderList() {
        const dataTab = $(".tabArea ul#airTabUl li.current").attr("data-tab");
        if (dataTab === "tab4") {
            const startDate = document.getElementById("airStartDate").value;
            const endDate = document.getElementById("airEndDate").value;
            if (startDate === "") {
                common.cmnAlertLayer("", "시작일자를 선택하여주세요.");
                return;
            }

            if (startDate === "") {
                common.cmnAlertLayer("", "종료일자를 선택하여주세요.");
                return;
            }
            document.getElementById("schStartDate").value = startDate;
            document.getElementById("schEndDate").value = endDate;
            document.getElementById("schDeuDateCd").value = $(".tabArea ul#airTabUl li.current").attr("data1");
        }

        $("#airCloseBtn").click();
        getAirOrderList(0);
    }

    // 해외항공 주문 내역 조회
    function getAirOrderList(page) {
        if (!tabIndicator) return;

        isFetchingAir = true;
        const form = $("#myPageAirOrderForm");
        var offset = parseInt(page) * parseInt(form.find("input[name=limit]").val());
        form.find("input[name=offset]").val(offset);
        setAirFilter();

        $.ajax({
            url : "/mypage/s_MyPageAirOrderListAjax.do",
            type : "post",
            dataType : "html",
            data : form.serialize(),
            success : function(data) {
                var $data = $('<div>').html(data);
                var totNum = "undefined" != typeof $data.find('.orderListWrap').attr('data-tot-num') ? $data.find('.orderListWrap').attr('data-tot-num') : 0;
                var schStartDate = "undefined" != typeof $data.find('.orderListWrap').attr('data-sch-start-date') ? $data.find('.orderListWrap').attr('data-sch-start-date') : $("input[name=schStartDate]").val();
                var schEndDate = "undefined" != typeof $data.find('.orderListWrap').attr('data-sch-end-date') ? $data.find('.orderListWrap').attr('data-sch-end-date') : $("input[name=schEndDate]").val();

                var htmlOrderDateArr = [];		// 검색 날짜
                var htmlOrderDateTotArr = [];	// 총 건수
                var htmlArr = [];				// 리스트

                if(!data) _tempAir = 0;
                if(!data && page === 0){
                    htmlOrderDateArr.push("<span class='orderDate'>" + schStartDate + " ~ " + schEndDate + "</span>");
                    htmlOrderDateTotArr.push("<span class='orderDateTot'>총 " + totNum + "건</span>");

                    htmlArr.push("<div class='nodata empty-order'>");
                    htmlArr.push("	<strong>주문내역이 없습니다.</strong>");
                    htmlArr.push("</div>");

                    $('#airListTotal .orderDate').remove();
                    $("#airListTotal .orderDateTot").remove();
                    $("#airListTotal").append(htmlOrderDateArr.join(""));
                    $("#airListTotal").append(htmlOrderDateTotArr.join(""));
                    $("#airOrderListSection").html("");
                    $("#airOrderListSection").append(htmlArr.join(""));
                }else{
                    if (page === 0) {
                        htmlOrderDateArr.push("<span class='orderDate'>" + schStartDate + " ~ " + schEndDate + "</span>");
                        htmlOrderDateTotArr.push("<span class='orderDateTot'>총 " + totNum + "건</span>");

                        $('#airListTotal .orderDate').remove();
                        $("#airListTotal .orderDateTot").remove();
                        $("#airOrderListSection").html("");
                    }

                    $("#airListTotal").append(htmlOrderDateArr.join(""));
                    $("#airListTotal").append(htmlOrderDateTotArr.join(""));
                    $("#airOrderListSection").append(data);
                }

                isFetchingAir = false;
            },
            error:function(data) {
                common.cmnAlertLayer('orderList','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                return;
            }
        });
    }

    function setAirFilter() {
        for (var i = 1; i < 6; i++) {
            const isCheck = document.getElementById("cbx_direct_chk" + i).checked;
            const value = document.getElementById("cbx_direct_chk" + i).value;
            if (isCheck) {
                document.getElementById(value).value = "Y";
            } else {
                document.getElementById(value).value = "N";
            }
        }
    }

    // 상세조회 기간설정
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
    const formatDate = (date, num) => {
        var today = date != null ? date : new Date();
        var year = today.getFullYear();
        var month = num != null ? today.getMonth() - num : today.getMonth();
        var day = today.getDate();
        var strtDtm = new Date(year, month, day);
        strtDtm = common.dateFormat(strtDtm);

        return strtDtm;
    }
    const onChange = (date) => {
        $(selectedInput.current).val(formatDate(date));
        $("#calendar-pop .pop-close").click();
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="/mypage" className="btnPrev">이전</a>
                    <h1>주문 내역 조회</h1>
                </div>
            </div>

            <div id="content">
                <div className="tabArea2">
                    <div className="tab02 mgt_10">
                        <ul className="tab v2" id="headerTab">
                            {/*<li className="" data-tab="tab22"><a className="type2">기차/숙소</a></li>*/}
                            {/*<li className="" data-tab="tab33"><a className="type1">국내항공</a></li>*/}
                            <li className="current" data-tab="tab11"><a className="type1">해외항공</a></li>
                        </ul>
                    </div>

                    {/*<div id="tab22" className="tabcontent pd_a0">*/}
                    {/*    <form method="post" name="myPageOrderForm" id="myPageOrderForm">*/}
                    {/*        <input type="hidden" name="ordNo" id="ordNo" value=""/>*/}
                    {/*        <input type="hidden" name="schDeuDateCd" id="schDeuDateCd" value="3MONTH"/>*/}
                    {/*        <input type="hidden" name="schStartDate" id="schStartDate" value=""/>*/}
                    {/*        <input type="hidden" name="schEndDate" id="schEndDate" value=""/>*/}
                    {/*        <input type="hidden" name="offset" id="offset" value="0"/>*/}
                    {/*        <input type="hidden" name="limit" id="limit" value="6"/>*/}
                    {/*        <input type="hidden" name="ordMenuCd" id="ordMenuCd" value="a"/>*/}

                    {/*        <div className="searchArea">*/}
                    {/*            <ul className="term">*/}
                    {/*                <li><a href="javascript:void(0);"*/}
                    {/*                       onClick="searchOrderList('3MONTH');"*/}
                    {/*                       data-term-type="3month"*/}
                    {/*                       className="selected">3개월</a></li>*/}
                    {/*                <li><a href="javascript:void(0);"*/}
                    {/*                       onClick="searchOrderList('6MONTH');"*/}
                    {/*                       data-term-type="6month">6개월</a></li>*/}
                    {/*                <li><a href="javascript:void(0);"*/}
                    {/*                       onClick="setSearchDate('4');"*/}
                    {/*                       data-term-type="custom"*/}
                    {/*                       className="set">기간설정</a></li>*/}
                    {/*            </ul>*/}
                    {/*            <div className="data-set">*/}
                    {/*                <div className="tabArea mgt_35 mgb_30">*/}
                    {/*                    <ul className="tab v1">*/}
                    {/*                        <li data-tab="tab1"><a href="#">1개월</a></li>*/}
                    {/*                        <li data-tab="tab2"><a href="#">3개월</a></li>*/}
                    {/*                        <li data-tab="tab3"><a href="#">6개월</a></li>*/}
                    {/*                        <li className="current" data-tab="tab4"><a*/}
                    {/*                            href="#">기간설정</a></li>*/}
                    {/*                    </ul>*/}
                    {/*                    <div id="tab1" className="tabcontent">*/}
                    {/*                        <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*                                <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*                                <dd>*/}
                    {/*                                    <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*                                            <span className="input_cal v2">*/}
                    {/*                                                <input type="text" name="schStartDate1" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                            <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*                                                <input type="text" name="schEndDate1" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                        </span>*/}
                    {/*                                    </p>*/}
                    {/*                                </dd>*/}
                    {/*                            </dl>*/}
                    {/*                            <a href="javascript:void(0);"*/}
                    {/*                               onClick="searchOrderList('CUSTOM', '1');"*/}
                    {/*                               className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}

                    {/*                    <div id="tab2" className="tabcontent">*/}
                    {/*                        <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*                                <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*                                <dd>*/}
                    {/*                                    <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*                                            <span className="input_cal v2">*/}
                    {/*                                                <input type="text" name="schStartDate2" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                            <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*                                                <input type="text" name="schEndDate2" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                        </span>*/}
                    {/*                                    </p>*/}
                    {/*                                </dd>*/}
                    {/*                            </dl>*/}
                    {/*                            <a href="javascript:void(0);"*/}
                    {/*                               onClick="searchOrderList('CUSTOM', '2');"*/}
                    {/*                               className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}

                    {/*                    <div id="tab3" className="tabcontent">*/}
                    {/*                        <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*                                <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*                                <dd>*/}
                    {/*                                    <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*                                            <span className="input_cal v2">*/}
                    {/*                                                <input type="text" name="schStartDate3" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                            <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*                                                <input type="text" name="schEndDate3" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                        </span>*/}
                    {/*                                    </p>*/}
                    {/*                                </dd>*/}
                    {/*                            </dl>*/}
                    {/*                            <a href="javascript:void(0);"*/}
                    {/*                               onClick="searchOrderList('CUSTOM', '3');"*/}
                    {/*                               className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div id="tab4" className="tabcontent">*/}
                    {/*                        <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*                                <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*                                <dd>*/}
                    {/*                                    <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*                                            <span className="input_cal v2">*/}
                    {/*                                                <input type="text" name="schStartDate4" value="2023-03-02"/>*/}
                    {/*                                                <a href="javascript:void(0);"*/}
                    {/*                                                   className="btnCal calendar-pop-layer"*/}
                    {/*                                                   // onClick={(e) => create_calendar_layer_Pop("#strtDtm")}*/}
                    {/*                                                >달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                            <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*                                                <input type="text" name="schEndDate4" value="2023-06-02"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer"*/}
                    {/*                                                   // onClick={(e) => create_calendar_layer_Pop("#endDtm")}*/}
                    {/*                                                >달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                        </span>*/}
                    {/*                                    </p>*/}
                    {/*                                </dd>*/}
                    {/*                            </dl>*/}
                    {/*                            <a href="javascript:void(0);"*/}
                    {/*                               onClick="searchOrderList('CUSTOM', '4');"*/}
                    {/*                               className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="list-total">*/}
                    {/*            <span className="orderDate">2023-03-02 ~ 2023-06-02</span>*/}
                    {/*        </div>*/}

                    {/*        <div id="orderListSection">*/}
                    {/*            <section>*/}
                    {/*                <div className="orderListWrap" data-tot-num="2"*/}
                    {/*                     data-sch-start-date="2023-03-02"*/}
                    {/*                     data-sch-end-date="2023-06-02">*/}
                    {/*                    <dl className="orderListArea">*/}
                    {/*                        <dt className="top">*/}
                    {/*                            <span style={{color: "#466cc2", marginRight: "5px"}}>[주문취소]</span>*/}
                    {/*                            <span>2023-05-08 15:41:00</span>*/}
                    {/*                            <a href="javascript:goDetail('K230508398012N');"*/}
                    {/*                               className="floatright">상세보기</a>*/}
                    {/*                        </dt>*/}
                    {/*                        <dd className="orderDesc">*/}
                    {/*                            <div className="inner">*/}
                    {/*                                <div className="imgArea">*/}
                    {/*                                    <img src="/smart/images/common/noimg_ticket_train.jpg"*/}
                    {/*                                         // onError="this.src='';"*/}
                    {/*                                         alt="KTX 청량리→강릉편도"/>*/}
                    {/*                                </div>*/}
                    {/*                                <div className="desc_txt">*/}
                    {/*                                    <p className="itemTit">청량리 → 강릉 편도 <br/>2023.05.31 13:52 ~ 2023.05.31 15:23</p>*/}
                    {/*                                    <div className="date_wrap">*/}
                    {/*                                        <p>KTX&nbsp;&nbsp;813편</p>*/}
                    {/*                                        <p></p>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        </dd>*/}
                    {/*                        <dd className="price_wrap">*/}
                    {/*                            <div className="price"><span>주문금액</span>135,700<em>원</em></div>*/}
                    {/*                        </dd>*/}
                    {/*                    </dl>*/}
                    {/*                </div>*/}
                    {/*            </section>*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*</div>*/}

                    {/*<div id="tab33" className="tabcontent pd_a0">*/}
                    {/*    <form method="post" name="myPageOrderForm" id="myPageOrderForm">*/}
                    {/*        <input type="hidden" name="ordNo" id="ordNo" value=""/>*/}
                    {/*//         <input type="hidden" name="schDeuDateCd" id="schDeuDateCd" value="3MONTH"/>*/}
                    {/*//         <input type="hidden" name="schStartDate" id="schStartDate" value=""/>*/}
                    {/*        <input type="hidden" name="schEndDate" id="schEndDate" value=""/>*/}
                    {/*        <input type="hidden" name="offset" id="offset" value="0"/>*/}
                    {/*        <input type="hidden" name="limit" id="limit" value="6"/>*/}
                    {/*//         <input type="hidden" name="ordMenuCd" id="ordMenuCd" value="s"/>*/}
                    {/*//*/}
                    {/*        <div className="searchArea">*/}
                    {/*            <ul className="term">*/}
                    {/*//                 <li><a href="javascript:void(0);"*/}
                    {/*                       onClick="searchOrderList('3MONTH');"*/}
                    {/*                       data-term-type="3month"*/}
                    {/*                       className="selected">3개월</a></li>*/}
                    {/*                <li><a href="javascript:void(0);"*/}
                    {/*                       onClick="searchOrderList('6MONTH');"*/}
                    {/*                       data-term-type="6month">6개월</a></li>*/}
                    {/*                <li><a href="javascript:void(0);"*/}
                    {/*//                        onClick="setSearchDate('4');"*/}
                    {/*                       data-term-type="custom"*/}
                    {/*                       className="set">기간설정</a></li>*/}
                    {/*//             </ul>*/}
                    {/*            <div className="data-set">*/}
                    {/*//                 <div className="tabArea mgt_35 mgb_30">*/}
                    {/*                    <ul className="tab v1">*/}
                    {/*                        <li data-tab="tab1"><a href="#">1개월</a></li>*/}
                    {/*//                         <li data-tab="tab2"><a href="#">3개월</a></li>*/}
                    {/*                        <li data-tab="tab3"><a href="#">6개월</a></li>*/}
                    {/*                        <li className="current" data-tab="tab4"><a*/}
                    {/*                            href="#">기간설정</a></li>*/}
                    {/*                    </ul>*/}
                    {/*                    <div id="tab1" className="tabcontent">*/}
                    {/*                        <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*//                                 <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*//                                 <dd>*/}
                    {/*//                                     <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*//                                             <span className="input_cal v2">*/}
                    {/*//                                                 <input type="text" name="schStartDate1" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*//                                             </span>*/}
                    {/*                                            <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*//                                                 <input type="text" name="schEndDate1" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                        </span>*/}
                    {/*                                    </p>*/}
                    {/*                                </dd>*/}
                    {/*                            </dl>*/}
                    {/*                            <a href="javascript:void(0);"*/}
                    {/*//                                onClick="searchOrderList('CUSTOM', '1');"*/}
                    {/*//                                className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}

                    {/*//                     <div id="tab2" className="tabcontent">*/}
                    {/*                        <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*                                <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*                                <dd>*/}
                    {/*                                    <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*                                            <span className="input_cal v2">*/}
                    {/*//                                                 <input type="text" name="schStartDate2" readOnly="readonly"/>*/}
                    {/*//                                                 <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a></span>*/}
                    {/*//                                             <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*                                                <input type="text" name="schEndDate2" readOnly="readonly"/>*/}
                    {/*//                                                 <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                        </span>*/}
                    {/*//                                     </p>*/}
                    {/*                                </dd>*/}
                    {/*                            </dl>*/}
                    {/*//                             <a href="javascript:void(0);"*/}
                    {/*                               onClick="searchOrderList('CUSTOM', '2');"*/}
                    {/*                               className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}

                    {/*                    <div id="tab3" className="tabcontent">*/}
                    {/*                        <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*                                <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*                                <dd>*/}
                    {/*//                                     <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*                                            <span className="input_cal v2">*/}
                    {/*//                                                 <input type="text" name="schStartDate3" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                            <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*                                                <input type="text" name="schEndDate3" readOnly="readonly"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*                                            </span>*/}
                    {/*                                        </span>*/}
                    {/*//                                     </p>*/}
                    {/*                                </dd>*/}
                    {/*                            </dl>*/}
                    {/*                            <a href="javascript:void(0);"*/}
                    {/*                               onClick="searchOrderList('CUSTOM', '3');"*/}
                    {/*                               className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*//                         </div>*/}
                    {/*//                     </div>*/}
                    {/*                    <div id="tab4" className="tabcontent">*/}
                    {/*//                         <div className="info_form">*/}
                    {/*                            <dl className="inputArea">*/}
                    {/*                                <dt className="hidden mgt_0">기간설정</dt>*/}
                    {/*                                <dd>*/}
                    {/*                                    <p className="input_inline">*/}
                    {/*                                        <span className="w100 mgt_10 vam">*/}
                    {/*                                            <span className="input_cal v2">*/}
                    {/*                                                <input type="text" name="schStartDate4" value="2023-03-02"/>*/}
                    {/*//                                                 <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*//                                             </span>*/}
                    {/*//                                             <span>~</span>*/}
                    {/*                                            <span className="input_cal v3">*/}
                    {/*                                                <input type="text" name="schEndDate4" value="2023-06-02"/>*/}
                    {/*                                                <a href="javascript:void(0);" className="btnCal calendar-pop-layer">달력</a>*/}
                    {/*//                                             </span>*/}
                    {/*//                                         </span>*/}
                    {/*                                    </p>*/}
                    {/*//                                 </dd>*/}
                    {/*                            </dl>*/}
                    {/*                            <a href="javascript:void(0);"*/}
                    {/*                               onClick="searchOrderList('CUSTOM', '4');"*/}
                    {/*                               className="lbtn filled btn-large mgt_20"*/}
                    {/*                               style={{background: "#466cc2", border: "1px solid #466cc2"}}>조회</a>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*//         <div className="list-total">*/}
                    {/*            <span className="orderDate">2023-03-02 ~ 2023-06-02</span>*/}
                    {/*        </div>*/}

                    {/*//         <div id="orderListSection">*/}
                    {/*//             <section style={{display: "none"}}>*/}
                    {/*                <div className="orderListWrap">*/}
                    {/*                    <dl className="orderListArea">*/}
                    {/*                        <dt className="top">*/}
                    {/*                            <span style={{color: "#466cc2", marginRight: "5px"}}>[주문취소]</span>*/}
                    {/*                            <span>2023-05-16 16:29:16</span>*/}
                    {/*                            <a href="javascript:goDetail('J230516162916N');" className="floatright">상세보기</a>*/}
                    {/*                        </dt>*/}
                    {/*                        <dd className="orderDesc">*/}
                    {/*                            <div className="inner">*/}
                    {/*                                <div className="imgArea">*/}
                    {/*//                                     <span*/}
                    {/*//                                         className="noimg75-order52"><span*/}
                    {/*//                                         className="hdn">이미지가 없습니다.</span></span>*/}
                    {/*//                                 </div>*/}
                    {/*                                <div className="desc_txt">*/}
                    {/*//                                     <p className="itemTit">루프트한자 LH713</p>*/}
                    {/*                                    <div className="date_wrap"></div>*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        </dd>*/}
                    {/*                    </dl>*/}
                    {/*                </div>*/}
                    {/*            </section>*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*</div>*/}

                    <div id="tab11" className="tabcontent pd_a0 current">
                        <form method="post" name="myPageAirOrderForm" id="myPageAirOrderForm">
                            <input type="hidden" name="ordNo" id="ordNo" value=""/>
                            <input type="hidden" name="schDeuDateCd" id="schDeuDateCd" value="3MONTH"/>
                            <input type="hidden" name="schStartDate" id="schStartDate" value=""/>
                            <input type="hidden" name="schEndDate" id="schEndDate" value=""/>
                            <input type="hidden" name="schOrdNo" id="schOrdNo" value=""/>
                            <input type="hidden" name="offset" id="offset" value="0"/>
                            <input type="hidden" name="limit" id="limit" value="6"/>
                            <input type="hidden" name="reservedStandBy" id="reservedStandBy" value=""/>
                            <input type="hidden" name="reservedComplate" id="reservedComplate" value=""/>
                            <input type="hidden" name="requestPayment" id="requestPayment" value=""/>
                            <input type="hidden" name="cancelReserved" id="cancelReserved" value=""/>
                            <input type="hidden" name="ticketComplate" id="ticketComplate" value=""/>

                            <div className="schedule-title pdt_20">
                                <div className="sch_btn mgr_15">
                                    <a // href="#B2_f"
                                       className="full-pop-layer linkOpen go blue"
                                       // onClick="setDetailSearch()"
                                       onClick={() => setDetailSearch()}
                                    >상세조회</a>
                                </div>
                            </div>

                            <section className="mgb_0">
                                <div className="box2">
                                    <div className="sub-srhArea">
                                        <input type="text"
                                               placeholder="예약번호를 입력해주세요."
                                               id="searchAirOrderString"/>
                                        <a
                                            // onClick="searchAirOrderList()"
                                            onClick={() => searchAirOrderList()}
                                        ><span className="hdn">검색</span></a>
                                    </div>
                                </div>
                            </section>

                            <div className="list-total" id="airListTotal">
                                <span className="orderDate">2023-03-02 ~ 2023-06-02</span>
                                <span className="orderDateTot">총 <span className="totNum">2</span>건</span>
                            </div>

                            <div id="airOrderListSection">
                                <section>
                                    <div className="orderListWrap">
                                        <dl className="orderListArea">
                                            <dt className="top">
                                                <span className="airTitle">예약취소</span>
                                                <a
                                                    // href="/foreign/reserve/s_ReservedCompleteInfo.do?key=J230516162916N"
                                                    href="orderDetail?ordNo=J230516162916N"
                                                   className="floatright">상세보기</a>
                                            </dt>
                                            <dt className="top">
                                                <span className="f18">인천(ICN)<span className="airArrow"></span>히드로(LHR)</span>
                                            </dt>
                                            <dt className="top">
                                                <img src="/smart/images/sub/logo/LH.png" alt="루프트한자" className="logo"/>
                                                <span className="cGray2">루프트한자<span className="airDot"></span>ICN-LHR</span>
                                            </dt>
                                            <dd className="orderDesc">
                                                <div className="inner">
                                                    <div className="imgArea">
                                                        <img src="/smart/images/sub/goods_air.jpg"/>
                                                    </div>
                                                    <div className="desc_txt">
                                                        <p className="itemTit">
                                                            <span className="f13 cGray2">예약번호</span> 5URJRA (PNR:5131-2806)<br/>2023-07-03(월) ~ 2023-07-08(토)
                                                        </p>
                                                        <div className="date_wrap">
                                                            <p>1명(성인1명 ) / 일반석</p>
                                                            <p>해외 | 왕복</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </dd>
                                            <dd className="price_wrap">
                                                <div className="total"></div>
                                                <div className="price">
                                                    <span>총 요금 </span>2,445,600<em>원</em>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </section>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="B2_f" className="full-layer">
                    <div className="popWrap">
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1>상세조회</h1>
                                <a className="btnClose full-pop-close" id="airCloseBtn">닫기</a>
                            </div>
                        </div>
                        <div className="pop-cont">
                            <div className="searchArea">
                                <div className="tabArea mgt_35">
                                    <h2 className="mgb_10">조회기간 (기준 : 예약일자)</h2>
                                    <ul className="tab v1" id="airTabUl">
                                        <li data-tab="tab1" data1="1MONTH"><a>1개월</a></li>
                                        <li data-tab="tab2" data1="3MONTH"><a>3개월</a></li>
                                        <li data-tab="tab3" data1="6MONTH"><a>6개월</a></li>
                                        <li className="current" data-tab="tab4" data1="SELECT"><a>기간설정</a></li>
                                    </ul>
                                    <div className="tabcontent current" id="airSearchArea">
                                        <div className="info_form">
                                            <dl className="inputArea" id="airCalArea">
                                                <dt className="hidden mgt_0">기간설정</dt>
                                                <dd>
                                                    <p className="input_inline">
                                                        <span className="w100 mgt_10 vam">
                                                            <span className="input_cal v2">
                                                                <input type="text" name="schStartDate3" id="airStartDate" readOnly="readonly"/>
                                                                <a // href="javascript:void(0);"
                                                                   className="btnCal calendar-pop-layer"
                                                                   onClick={(e) => create_calendar_layer_Pop("#airStartDate")}
                                                                >달력</a>
                                                            </span>
                                                            <span>~</span>
                                                            <span className="input_cal v3">
                                                                <input type="text" name="schEndDate3" id="airEndDate" readOnly="readonly"/>
                                                                <a // href="javascript:void(0);"
                                                                   className="btnCal calendar-pop-layer"
                                                                   onClick={(e) => create_calendar_layer_Pop("#airEndDate")}
                                                                >달력</a>
                                                            </span>
                                                        </span>
                                                    </p>
                                                </dd>
                                            </dl>

                                            <div className="mgt_20">
                                                <h2>진행상태</h2>
                                                <div className="tableD noBor">
                                                    <div className="chkBox">
                                                        <input type="checkbox" id="cbx_direct_chkAll" value=""
                                                           // onClick="checkAllStatusValue()"
                                                           onClick={() => checkAllStatusValue()}
                                                        />
                                                        <label htmlFor="cbx_direct_chkAll">전체</label>
                                                    </div>
                                                    <div className="chkBox">
                                                        <input type="checkbox" id="cbx_direct_chk1" name="chk_direct" value="reservedStandBy"/>
                                                        <label htmlFor="cbx_direct_chk1">예약대기</label>
                                                    </div>
                                                    <div className="chkBox">
                                                        <input type="checkbox" id="cbx_direct_chk2" name="chk_direct" value="reservedComplate"/>
                                                        <label htmlFor="cbx_direct_chk2">예약완료</label>
                                                    </div>
                                                </div>
                                                <div className="tableD noBor">
                                                    <div className="chkBox">
                                                        <input type="checkbox" id="cbx_direct_chk3" name="chk_direct" value="requestPayment"/>
                                                        <label htmlFor="cbx_direct_chk3">결제요청</label>
                                                    </div>
                                                    <div className="chkBox">
                                                        <input type="checkbox" id="cbx_direct_chk4" name="chk_direct" value="cancelReserved"/>
                                                        <label htmlFor="cbx_direct_chk4">예약취소</label>
                                                    </div>
                                                    <div className="chkBox">
                                                        <input type="checkbox" id="cbx_direct_chk5" name="chk_direct" value="ticketComplate"/>
                                                        <label htmlFor="cbx_direct_chk5">발권완료</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <a className="lbtn filled btn-large mgt_20"
                                               style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}
                                               // onClick="detailSearchAirOrderList()"
                                               onClick={() => detailSearchAirOrderList()}
                                            >조회</a>
                                        </div>
                                    </div>
                                </div>
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