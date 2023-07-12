import {useRef} from "react";
import $ from 'jquery';
import * as common from "./js/common";
import * as base from "./js/find";
import Footer from "./Footer";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const getSearchNoticeData = () => {
        getNoticeData("srch");
    }

    const getNoticeData = (str) => {
        var pageNo = $("#pageNo").val();
        var srchType = $("#srchType").val();
        var srchTxt = $("#srchTxt").val();

        if(pageNo == null || pageNo =='' || str == 'srch') {
            pageNo = 1;
        }

        var dataObj = {
            pageNo : pageNo,
            srchType : srchType,
            srchTxt : srchTxt
        };

        $.ajax({
            url : "/newnotice/s_NoticeList.json",
            type : "post",
            dataType : "json",
            data : dataObj,
            success : function(data) {
                var noticeList = data.noticeList;
                var pageInfoVO = data.pageInfoVO;

                viewResult(noticeList, pageInfoVO);
            },
            // error : function(data) {
            //     common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            // }
        });
    }

    const getNoticeDetailData = (seq) => {
        var form = $("#formDetail");
        form.find("#bbSn").val(seq);

        // $.ajax({
        //     url : '/newnotice/NoticeDetailAjax.do',
        //     data : form.serialize(),
        //     dataType : 'html',
        //     type : 'post',
        //     success:function(data) {
                $("#noticeList01POP").css("display", "block");
        //         $("#noticeDetail").html(data);
        //     },
        //     error:function(data) {
        //         common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
        //         return;
        //     }
        // });
    }

    const nextPage = (number) => {
        $("#pageNo").val(number);
        getNoticeData("page");
    }

    const viewResult = (objList, pageInfoVO) => {
        var tViewHtml = '';
        $("#noticeList").html(tViewHtml); // 초기화
        if( objList != null && objList.length > 0 ){
            for(var i=0; i < objList.length; i++){

                var topClass = '';

                if(objList[i].uprFixYn == 'Y'){
                    topClass = 'class="top"';
                }

                tViewHtml += '<li>';
                // tViewHtml += '	<a href="#noticeList01POP" onclick="controller.getNoticeDetailData('+objList[i].bbSn+');" class="top-btn full-pop-layer">';
                // tViewHtml += '	<a href="#noticeList01POP" onclick="getNoticeDetailData('+objList[i].bbSn+');" class="top-btn full-pop-layer">';
                tViewHtml += '	<a href="#noticeList01POP" data-detail="' + objList[i].bbSn + '" class="top-btn full-pop-layer">';
                tViewHtml += '		<h2 '+topClass+'>'+objList[i].tit+'</h2>';
                tViewHtml += '		<p>'+objList[i].sysRegDtimeStr+'</p>';
                tViewHtml += '	</a>';
                tViewHtml += '</li>';
            }

        } else {
            tViewHtml += '<div class="nodata empty-notice">';
            tViewHtml += '	<strong>게시글이 없습니다.</strong>';
            tViewHtml += '</div>';
        }

        //페이징
        // pagingHtmlTag($("#pagingList"),pageInfoVO,'controller.nextPage');
        common.pagingHtmlTag($("#pagingList"), pageInfoVO, 'nextPage');

        $(".noticeList .totalNum #totNum").html(pageInfoVO.totalCount);

        $("#noticeList").html(tViewHtml);
        const children = document.getElementById("noticeList").getElementsByTagName("a");
        for (const item of Object.values(children)) {
            item.addEventListener("click", function(event) {
                getNoticeDetailData(event.currentTarget.dataset.detail);
            })
        }
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a // href="javascript:void(0);"
                       onClick={() => base.doHistoryBack()} className="btnPrev">이전</a>
                    <h1>공지사항</h1>
                </div>
            </div>
            <div id="content">
                <section className="mgb_0">
                    <div className="box2">
                        {/*<form name="formSrch" id="formSrch" method="post" onSubmit="return false;"*/}
                        <form name="formSrch" id="formSrch" method="post" onSubmit={() => {
                            return false;
                        }}
                              className="sub-srhArea">
                            <input type="hidden" name="pageSize" id="pageSize" value="5"/>
                            <input type="hidden" name="pageNo" id="pageNo" value="1"/>
                            <input type="hidden" name="srchType" id="srchType" value="all"/>
                            <input type="hidden" name="offset" id="offset" value="0"/>
                            <input type="hidden" name="limit" id="limit" value="6"/>
                            <input type="text" name="srchTxt" id="srchTxt" placeholder="검색어를 입력해 주세요."/>
                            <a // href="javascript:void(0);"
                               // onClick="controller.getSearchNoticeData();"
                               onClick={() => getSearchNoticeData()}
                            >
                                <span className="hdn">검색</span>
                            </a>
                        </form>
                    </div>
                </section>

                <section>
                    <div className="noticeList">
                        <p className="totalNum">총 <span id="totNum">7</span>건</p>
                        <ul id="noticeList">
                            <li>
                                <a
                                   // href="#noticeList01POP"
                                   // onClick="controller.getNoticeDetailData('57');"
                                   onClick={() => getNoticeDetailData('57')}
                                   className="top-btn full-pop-layer">
                                    <h2>기차 예약 서비스 리뉴얼 오픈일정 지연 공지</h2>
                                    <p>2023-03-29 15:04:35</p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div id="pagingList" className="pagination">
                        <div className="paging pdb_50">
                            <a // href="javascript:void(0);"
                               className="first"><span className="hdn">맨앞으로</span></a>
                            <a // href="javascript:void(0);"
                               className="prev"><span className="hdn">이전</span></a>
                            <a // href="javascript:void(0);"
                            ><span className="active">1</span></a>
                            {/*<a href="javascript:void(0);" onClick="javascript:controller.nextPage('2');">2</a>*/}
                            <a // href="javascript:void(0);"
                               onClick={() => nextPage('2')}>2</a>
                            <a // href="javascript:void(0);"
                               className="next"><span className="hdn">다음</span></a>
                            {/*<a href="javascript:void(0);" onClick="javascript:controller.nextPage('2'); return false;" className="last"><span className="hdn">맨뒤로</span></a>*/}
                            <a // href="javascript:void(0);"
                               onClick={() => nextPage('2')} className="last"><span className="hdn">맨뒤로</span></a>
                        </div>
                    </div>
                </section>
            </div>

            <div id="noticeList01POP" className="full-layer">
                <div className="popWrap">
                    <div className="pop-header">
                        <div className="pop-tit">
                            <h1>공지사항 상세</h1>
                            <a // href="javascript:void(0);" 
                               className="btnClose full-pop-close"
                                onClick={() => $("#noticeList01POP").css("display", "")}
                            >닫기</a>
                        </div>
                    </div>
                    <div className="pop-cont" id="noticeDetail">
                    </div>
                </div>
            </div>

            <form name="formDetail" id="formDetail">
                <input type="hidden" name="bbSn" id="bbSn"/>
            </form>

            <Footer/>

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
            {/*        <div className="csmr" onClick={() => base.scrollBottom()}>주식회사 라쿠카라차 사업자 정보</div>*/}
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
            {/*            <dd>*/}
            {/*                <p>*/}
            {/*                    657-88-00880*/}
            {/*                    <span className="line"></span>*/}
            {/*                    <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6578800880" target="_blank">사업자등록정보확인</a>*/}
            {/*                </p>*/}
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
            {/*            <dd>*/}
            {/*                <p>*/}
            {/*                    전화 : 02-568-1220*/}
            {/*                    <span className="line"></span>*/}
            {/*                    팩스 : 02-508-0612*/}
            {/*                </p>*/}
            {/*                <p style={{textAlign: "left"}}>메일 : help@hcclab.com</p>*/}
            {/*            </dd>*/}
            {/*        </dl>*/}

            {/*    </div>*/}
            {/*    <div id="go-top"><span className="hdn">top</span></div>*/}
            {/*</div>*/}

            {/*<ul id="btm-menu">*/}
            {/*    <li><a href="/" class="f-menu01"></a></li>*/}
            {/*    <li><a href="javascript:alert('준비중입니다.');" class="f-menu02"></a></li>*/}
            {/*    <li><a href="/mypage/s_MyPageInfo.do" class="f-menu03"></a></li>*/}
            {/*    <li><a href="javascript:alert('준비중입니다.');" class="f-menu04"></a></li>*/}
            {/*    <li><a href="/mypage/s_MyPageInfo.do" class="f-menu05"></a></li>*/}
            {/*</ul>*/}

            {/*<div id="go-top"><span className="hdn">top</span></div>*/}

            {/*<iframe id="HappytalkIframe"*/}
            {/*        src="https://design.happytalkio.com/button?siteId=4000001875&amp;categoryId=134722&amp;divisionId=134723&amp;siteName=%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC%20%EB%9D%BC%EC%BF%A0%EC%B9%B4%EB%9D%BC%EC%B0%A8&amp;params=&amp;partnerId=&amp;shopId="*/}
            {/*        allowTransparency="true" frameBorder="0" title="채팅상담" tabIndex="0"*/}
            {/*        style={{margin: "0px", zIndex: 999999999, width: "60px", height: "60px", left: "auto", right: "10px", bottom: "10px", position: "fixed",}}></iframe>*/}
        </>
    )
}

export default App;