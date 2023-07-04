import {useEffect, useRef} from "react";
import $ from 'jquery';
import * as common from "./js/common";
import * as base from "./js/find";
import "./css/Faq.css";
import Footer from "./Footer";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    useEffect(() => {
    // window.addEventListener("load", function() {
        $('.faqSearchList').on('click', 'dt', function(){
            $(this).next('.faqSearchList dd').slideToggle();
            $(this).parent().toggleClass('on');
            $(this).parent().siblings().children('.faqSearchList dd').slideUp();
            $(this).parent().siblings().removeClass('on');
        });

        $('#faqForm').find('#tit').on('keyup', function(e){
            if (e.keyCode == 13) {
                searchFaq();
            }
        });
    // })
    }, [])

    const searchFaq = () => {
        $('#faqSearch').find('#uprSctNm').hide();
        $('#faqSearch').find('#sctNm').hide();

        var uprSctCdNm = $('#faqForm').find('#uprSctCdTxt').text();
        var uprSctNm = $('#faqForm').find('#uprSctNm').text();
        var sctCdNm = $('#faqForm').find('#sctCdTxt').text();

        if(uprSctCdNm != '' && uprSctCdNm != null && typeof uprSctCdNm != 'undefined') {
            if(uprSctNm != '' && typeof uprSctNm != 'undefined' && uprSctNm != null) {
                $('#faqSearch').find('#uprSctNm').show();
            }

            if(sctCdNm != '' && typeof sctCdNm != 'undefined' && sctCdNm != null) {
                $('#faqSearch').find('#sctNm').show();
            }
        }

        faqList(1);
    }

    const selUprSctCd = (uprSctCd, text) => {
        /** uprSctCd 가 var faq = $(this).attr('data-faq'); */
        $("#sctCd").val(uprSctCd);
        // var param = $("#faqForm").serializeJson();
        var param = $("#faqForm").serialize();

        $.ajax({
            url : '/newnotice/s_FaqCat.do',
            data : param,
            dataType : 'json',
            type : 'post',
            success: function(data) {
                //alert(JSON.stringify(data.faqCat[0].sctCd ));

                $("#uprSctCd").val(uprSctCd);

                if (uprSctCd != '') {
                    //var arr = sctData[uprSctCd]['value'];
                    // var opt = '<li class="current" data-tab="tab_0 " onclick="selSctCd(this, \'\');"><a href="javascript:void(0);">전체</a></li>';
                    var opt = '<li class="current" data-tab="tab_0 " data-value="" ><a href="javascript:void(0);">전체</a></li>';
                    for(var i = 0; i < data.faqCat.length; i++) {
                        //var obj = arr[i];
                        //var val = obj['value'];
                        //var name = obj['name'];
                        var val = data.faqCat[i].sctCd
                        var name = data.faqCat[i].sctCdNm
                        // opt += '<li data-tab="tab_' + val + '" onclick="selSctCd(this, \'' + val + '\', \'' + name + '\');"><a href="javascript:void(0);">' + name + '</a></li>';
                        opt += '<li data-tab="tab_' + val + '" data-value="' + val + '" data-name="' + name + '"><a href="javascript:void(0);">' + name + '</a></li>';
                    }
                    $('#faqSection').find('#selDept').html(opt);
                    const children = document.getElementById("selDept").getElementsByTagName("li");
                    for (const item of Object.values(children)) {
                        item.addEventListener("click", function(event) {
                            const item = event.currentTarget;
                            selSctCd(item, item.dataset.value, item.dataset.name);
                        })
                    }
                    $("#faqForm").find("#sctCd").val("");
                }

                $('#faqSection').find('h3').text(text);

                faqList(1);
            }
        });
    }

    const faqList = (page) => {
        $("#faqForm").find('#pageNo').val(page);
        getFaqList();
    }

    const getFaqList = () => {
        // var param = $("#faqForm").serializeJson();
        var param = $("#faqForm").serialize();

        $.ajax({
            url : '/newnotice/s_FaqList.do',
            data : param,
            dataType : 'json',
            type : 'post',
            success : function(data) {
                //console.log(JSON.stringify(data));

                var tViewHtml = '';
                var pageInfoVO = data.pageInfoVO;
                var totalCount = pageInfoVO.totalCount;
                var faqList = data.faqList;
                var rowCnt = 0;

                if(faqList != null) {
                    rowCnt = faqList.length;
                }

                if(rowCnt > 0) {
                    for(var i = 0; i < rowCnt; i++) {
                        var obj = faqList[i];
                        var bbSn = obj.bbSn;
                        var prioRank = obj.prioRank;
                        var tit = obj.tit;
                        var cont = obj.cont;

                        tViewHtml += '<dl data-tot-num="' + totalCount + '">';
                        tViewHtml += '<dt>';
                        tViewHtml += '<input type="hidden" name="bbSn" value="' + bbSn + '">';
                        tViewHtml += '<span>Q</span>';
                        if(prioRank == 1) {
                            tViewHtml += '<strong>BEST</strong>';
                        }
                        tViewHtml += tit;
                        tViewHtml += '</dt>';
                        tViewHtml += '<dd><span>A</span>' + cont + '</dd>';
                        tViewHtml += '</dl>';
                    }
                } else {
                    tViewHtml += '<section>';
                    tViewHtml += '<div class="nodata empty-faq">';
                    tViewHtml += '<strong>게시글이 없습니다.</strong>';
                    tViewHtml += '</div>';
                    tViewHtml += '</section>';
                }

                $('#faqSection').hide();
                $('#faqSearch').hide();

                var tit = $('#faqForm').find('#tit').val();
                if(tit != '' && typeof tit != 'undefined' && tit != null) {
                    //페이징
                    common.pagingHtmlTag($('#faqSearch').find("#pagingSchList"),pageInfoVO,'faqList');
                    $('#faqSearch').find('#faqSearchList').html(tViewHtml);
                    $('#faqSearch').find('#resultTxt').text(tit);
                    $('#faqSearch').find('#searchCnt').text('총 ' + pageInfoVO.totalCount + '건');
                    $('#faqSearch').show();
                } else {
                    //페이징
                    common.pagingHtmlTag($('#faqSection').find("#pagingList"),pageInfoVO,'faqList');
                    $('#faqSection').find(".noticeList .totalNum #totNum").html(pageInfoVO.totalCount);
                    $('#faqSection').find('#faqList').html(tViewHtml);
                    $('#faqSection').show();
                }
            },
            error:function(data) {
                common.cmnAlertLayer('','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    const selSctCd = (e, sctCd, name) => {
        $(e).closest('ul').find('li').each(function () {
            $(this).removeClass('current');
        });

        $(e).addClass('current');
        $('#sctCd', $('#faqForm')).val(sctCd);
        $('#sctCdNm', $('#faqForm')).val(name);
        $('#sctCdTxt').text(name);
        faqList(1);
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="javascript:void(0);" onClick={() => base.doHistoryBack()} className="btnPrev">이전</a>
                    <h1>자주묻는 질문</h1>
                </div>
            </div>

            <div id="content">
                <section className="mgb_0">
                    <div className="box2">
                        <form method="post" id="faqForm" name="faqForm"
                              // onSubmit="return false"
                              onSubmit={() => {return false}}
                        >
                            <input type="hidden" id="uprSctCd" name="uprSctCd" title="카테고리1"/>
                            <input type="hidden" id="uprSctCdNm" name="uprSctCdNm" title="카테고리1 이름"/>
                            <input type="hidden" id="sctCd" name="sctCd" title="카테고리2"/>
                            <input type="hidden" id="sctCdNm" name="sctCdNm" title="카테고리2 이름"/>
                            <input type="hidden" name="pageNo" id="pageNo" value=""/>
                            <input type="hidden" name="offset" id="offset" value="0"/>
                            <input type="hidden" name="limit" id="limit" value="10"/>
                            <div className="sub-srhArea">
                                <input type="text" id="tit" name="tit" placeholder="검색어를 입력해 주세요."/>
                                <a href="javascript:void(0);"
                                   // onClick="searchFaq();"
                                   onClick={() => searchFaq()}
                                ><span className="hdn">검색</span></a>
                            </div>
                        </form>
                    </div>
                </section>

                <section id="faqSection">
                {/*<section id="faqSection" style={{display: "none"}}>*/}
                    <div className="box7">
                        <div className="faqCate">
                            <div className="mgt_5">
                                <a onClick={() => selUprSctCd('002002', '회원가입/탈퇴')} data-faq="">회원가입/탈퇴</a>
                                <a onClick={() => selUprSctCd('002003', '회원정보')} data-faq="">회원정보</a>
                                <a onClick={() => selUprSctCd('002005', '국내여행')} data-faq="">국내여행</a>
                            </div>
                            <div className="mgt_5">
                                <a onClick={() => selUprSctCd('002006', '주문/결제/배송')} data-faq="">주문/결제/배송</a>
                                <a onClick={() => selUprSctCd('002007', '취소/교환/반품')} data-faq="">취소/교환/반품</a>
                                <a onClick={() => selUprSctCd('002008', '이벤트/쿠폰')} data-faq="">이벤트/쿠폰</a>
                            </div>
                            <div className="mgt_5">
                                <a onClick={() => selUprSctCd('002009', '시스템')} data-faq="">시스템</a>
                                <a onClick={() => selUprSctCd('002010', '적립금')} data-faq="">적립금</a>
                            </div>
                        </div>

                        <div className="faqListWrap mgt_30">
                            <h3>주문/결제/배송 </h3>
                            <div className="tab02 faq-tab slideTab">
                                <ul className="swiper-wrapper tab" id="selDept">
                                    <li className="swiper-slide current" data-tab="tab1">
                                    </li>
                                </ul>
                                <ul className="swiper-wrapper tab" id="selDept">
                                    <li className="current" data-tab="tab_0 "
                                        // onClick="selSctCd(this, '');"
                                        onClick={(event) => selSctCd(event.currentTarget, '')}
                                    >
                                        <a href="javascript:void(0);">전체</a>
                                    </li>
                                    <li data-tab="tab_002006001"
                                        // onClick="selSctCd(this, '002006001', '주문/결제');"
                                        onClick={(event) => selSctCd(event.currentTarget, '002006001', '주문/결제')}
                                    >
                                        <a href="javascript:void(0);">주문/결제</a>
                                    </li>
                                </ul>
                                <div className="ofh">
                                    <div id="tab1" className="tabcontent current">
                                        <div className="faqSearchList faqTab" id="faqList">
                                            <dl data-tot-num="71">
                                                <dt>
                                                    <input type="hidden" name="bbSn" value="147"/>
                                                    <span>Q</span><strong>BEST</strong>기차여행 상품을 주문했는데 옵션으로 선택한 상품권은 언제 받나요?
                                                </dt>
                                                <dd>
                                                    <span>A</span>
                                                    <p style={{color: "rgb(0, 0, 255)"}}>① 옵션으로 선택한 비즈플레이 상품권은 출발일로부터 1일 전 영업일에 알림톡으로 PIN번호를 발송해 드립니다.</p>
                                                    <p>ex) 월요일 출발 시 금요일에 발송, 금요일이 휴일일 경우 목요일 발송됩니다.</p>
                                                    <p>&nbsp;</p>
                                                    <p style={{color: "rgb(0, 0, 255)"}}>② 익일 출발 예약을 영업시간 이후(평일 오후 5시~저녁 12시) 예약할 경우, 입장상품권은 다음 영업일에 발송됩니다.
                                                        이 경우에는 탑승일이 지난 후 상품권이 발송되는 점 유의 바랍니다.</p>
                                                    <p>ex.1) 화요일 출발 편을 월요일 오후 5시 이후에 예약할 경우, 입장상품권은 화요일에 발송됩니다.&nbsp;</p>
                                                    <p>ex.2) 토요일 출발 편을 금요일 영업시간 이후 예약하거나 일요일 출발 편을 토요일에 예약한 경우, 입장상품권은 다음 영업일에 발송됩니다.</p>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="pagingList" className="pagination" style={{padding: "10px"}}>
                            <div className="paging pdb_50">
                                <a href="javascript:void(0);" className="first"><span className="hdn">맨앞으로</span></a>
                                <a href="javascript:void(0);" className="prev"><span className="hdn">이전</span></a>
                                <a href="javascript:void(0);"><span className="active">1</span></a>
                                <a href="javascript:void(0);"
                                   // onClick="javascript:faqList('2');"
                                   onClick={() => faqList('2')}
                                >2</a>
                                <a href="javascript:void(0);"
                                   // onClick="javascript:faqList('3');"
                                   onClick={() => faqList('3')}
                                >3</a>
                                <a href="javascript:void(0);"
                                   // onClick="javascript:faqList('4');"
                                   onClick={() => faqList('4')}
                                >4</a>
                                <a href="javascript:void(0);"
                                   // onClick="javascript:faqList('5');"
                                   onClick={() => faqList('5')}
                                >5</a>
                                <a href="javascript:void(0);"
                                   // onClick="javascript:faqList('6')"
                                   onClick={() => faqList('6')}
                                   className="next"><span className="hdn">다음</span></a>
                                <a href="javascript:void(0);"
                                   // onClick="javascript:faqList('8'); return false;"
                                   onClick={() => {faqList('8'); return false;}}
                                   className="last"><span className="hdn">맨뒤로</span></a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faqSearch" style={{display: "none"}}>
                {/*<section id="faqSearch" style={{display: "block"}}>*/}
                    <div className="faqListWrap mgt_10">
                        <h3><strong id="resultTxt">구매</strong><span>관련 검색결과</span></h3>
                        <div className="faq-cate">
                            <div className="cate">
                                <span id="uprSctCdTxt">대분류</span>
                                <span id="sctCdTxt">중분류</span>
                                {/*<span>소분류</span>*/}
                            </div>
                            <div className="totalNum" id="searchCnt">총 3건</div>
                        </div>
                        <div className="faqList faqSearchList" id="faqSearchList">

                        </div>
                    </div>

                    <div id="pagingSchList" className="pagination">
                        <div className="paging pdb_50">
                            <a href="javascript:void(0);" className="first"><span className="hdn">맨앞으로</span></a>
                            <a href="javascript:void(0);" className="prev"><span className="hdn">이전</span></a>
                            <a href="javascript:void(0);"><span className="active">1</span></a>
                            <a href="javascript:void(0);"
                               // onClick="javascript:faqList('2');"
                               onClick={() => faqList('2')}
                            >2</a>
                            <a href="javascript:void(0);"
                               // onClick="javascript:faqList('3');"
                               onClick={() => faqList('3')}
                            >3</a>
                            <a href="javascript:void(0);"
                               // onClick="javascript:faqList('4');"
                               onClick={() => faqList('4')}
                            >4</a>
                            <a href="javascript:void(0);"
                               // onClick="javascript:faqList('5');"
                               onClick={() => faqList('5')}
                            >5</a>
                            <a href="javascript:void(0);"
                               // onClick="javascript:faqList('6')"
                               onClick={() => faqList('6')}
                               className="next"><span className="hdn">다음</span></a>
                            <a href="javascript:void(0);"
                               // onClick="javascript:faqList('8'); return false;"
                               onClick={() => {faqList('8'); return false;}}
                               className="last"><span className="hdn">맨뒤로</span></a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    )
}

export default App;