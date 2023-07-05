import {useEffect, useRef} from "react";
import $ from 'jquery';
import * as common from "./js/find";
import style from "./css/TermTable.module.css";
import Footer from "./Footer";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    window.addEventListener("scroll", function() {
        const goTop = $('#go-top');

        if ($(window).scrollTop() > 800) {
            goTop.addClass('show');
        } else {
            goTop.removeClass('show');
        }
    })

    useEffect(() => {
        $("*").each(function() {
            if ($(this).innerWidth() > 375) {
                console.log($(this));
            }
        })
    }, [])

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="javascript:void(0);" onClick={() => common.doHistoryBack()} className="btnPrev">닫기</a>
                    <h1>개인정보처리방침</h1>
                </div>
            </div>

            <div id="content">
                <section>
                    <div className="box2">
                        <div className="termTxt">
                            <p><span>&nbsp;</span></p>
                            <p><span style={{color: "red"}}><span>(</span>주<span>)</span>라쿠카라차<span>'</span>는<span> (</span>이하<span> '</span>회사<span>')</span></span><span>&nbsp;</span><span>이용자의 개인정보를 중요시하며<span>, "</span>정보통신망 이용촉진 및 정보보호<span>"</span>에 관한 법률을 준수하고 있습니다<span>. </span>회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며<span>, </span>개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다<span>. </span>만일 개인정보처리방침을 개정하는 경우에는 웹사이트 공지사항<span>(</span>또는 개별공지<span>)</span>을 통하여 안내해 드립니다<span>.</span></span></p>
                            {/*<p><span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>*/}
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            {/*<p>*/}
                            {/*    <b><span>㈜라쿠카라차</span></b>*/}
                            {/*    <b><span style="font-size: 13.5pt;">의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.</span></b>*/}
                            {/*    <span><br/></span>*/}
                            {/*    <span>1. </span>*/}
                            {/*    <span style="font-size: 13.5pt;">*/}
                            {/*        <span style="font-size: 10pt;">개인정보의 수집동의</span>*/}
                            {/*    </span>*/}
                            {/*</p>*/}

                            <p style={{fontSize: "13.5pt",}}><b><span>㈜라쿠카라차</span><span>의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p>
                                <span>
                                    <span>1. </span><span><span>개인정보의 수집동의</span></span>
                                    <span><br/>2. </span><span>수집하는 개인정의 항목 및 수집방법</span>
                                    <span><br/>3. </span><span>개인정보의 보유 및 이용기간</span>
                                    <span><br/>4. </span><span>개인정보 파기절차 및 방법</span>
                                    <span><br/>5. </span><span>개인 정보의 공유 및 제공</span>
                                    <span><br/>6. </span><span>개인정보의 처리 위탁</span>
                                    <span><br/>7. </span><span>개인정보의 제</span><span>3</span><span>자 제공에 관한 사항</span>
                                    <span><br/>8. </span><span>개인정보의 열람</span><span>, </span><span>정정</span>
                                    <span><br/>9. </span><span>개인정보 수집</span><span>, </span><span>이용</span><span>, </span><span>제공에 대한 동의 철회</span><span> (</span><span>회원탈퇴</span><span>)</span>
                                    <span><br/>10. </span><span>만</span><span> 14</span><span>세 미만 아동의 개인정보</span>
                                    <span><br/>11. </span><span>개인정보 자동 수집 장치의 설치</span><span>/</span><span>운영 및 거부에 관한 사항</span>
                                    <span><br/>12. </span><span>개인정보의 기술적</span><span>/</span><span>관리적 보호 대책</span>
                                    <span><br/>13. </span><span>개인정보보책임자 및 담당자의 연락처</span>
                                    <span><br/>14. </span><span>기타</span>
                                    <span><br/>15. </span><span>고지의 의무</span>
                                </span>
                            </p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p style={{fontSize: "12pt",}}><b><span>제<span> 1 </span>조 개인정보의 수집 동의</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>개인정보는 임직원 회원의 경우 계약에 의해 소속된 기업</span><span>/</span><span>기관으로부터 제공받으며</span><span>, </span><span>일반가입회원의 경우 회원 가입 시 제공받습니다</span><span>. </span><span>이러한 개인정보 수집에 대한 동의는 최초 회원 가입 및 본인인증 시 해당절차를 통해 동의를 받습니다</span><span>.</span></p>
                            {/*<p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>*/}
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 2</span>조 수집하는 개인정보의 항목 및 수집방법<span>&nbsp;</span></span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 고객사로부터 위탁 받은 서비스 제공을 위해 사전에 고객사에서 제공받는 개인정보와 이 외에 원활한 고객상담</span><span>, </span><span>서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다</span><span>. </span><span>단</span><span>, </span><span>이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보</span><span>(</span><span>인종 및 민족</span><span>, </span><span>사상 및 신조</span><span>, </span><span>출신지 및 본적지</span><span>, </span><span>정치적 성향 및 범죄기록</span><span>, </span><span>건강상태 및 성생활 등</span><span>)</span><span>는 수집하지 않습니다</span><span>.</span><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <div style={{overflowX: "scroll",}}>
                                <table
                                    className={`${style.table}`}
                                    width="100%"
                                       border="1"
                                       // cellspacing="0" cellpadding="0"
                                    // border="1pt solid #333333"
                                    // style={{width: "100%", borderCollapse: "collapse", border: "none",}}
                                >
                                    <colgroup>
                                        <col width="18%"/>
                                        <col width="9%"/>
                                        <col width="25%"/>
                                        <col width="16%"/>
                                        <col width="16%"/>
                                        <col width="16%"/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td colSpan="2"><p><b>구분</b></p></td>
                                            <td><p><b>항목</b></p></td>
                                            <td><p><b>수집방법</b></p></td>
                                            <td><p><b>이용목적</b></p></td>
                                            <td><p><b>보유기간</b></p></td>
                                        </tr>
                                        <tr>
                                            <td rowSpan="6"><p><span>회원으로부터 수집</span></p></td>
                                            <td rowSpan="2"><p><span>기본 정보</span></p></td>
                                            <td>
                                                <p><span>[</span><span>공통항목<span>]<br/></span>이름<span>,</span>아이디<span>, </span>비밀번호<span>, </span>가입인증번호<span>,</span>이메일주소<span>,&nbsp;</span>휴대폰번호<span>, </span>전화번호<span>, </span>주소<span>,</span></span></p>
                                                <p><span>뉴스레터<span>/SMS </span>수신여부<span>, </span>사번</span></p>
                                            </td>
                                            <td rowSpan="4"><p><span>회원가입<span>, <br/></span>서비스이용 신청서 등<br/>서면양식에 서명<span>, </span>전화<span>, <br/></span>상담 게시판<span>, <br/></span>이벤트 응모<span>,<br/></span>제휴사로 부터의 제공<span>,<br/></span>배송요청<br/><br/></span></p></td>
                                            <td rowSpan="2"><p><span>회원 관리<br/><span>(</span>본인확인<span>, </span>개인식별<span>, </span>부정이용 방지와 <br/>비인가사용 방지<span>, </span>가입의사 확인<span>, <br/></span>연령확인<span>, </span>불만 처리 등 민원처리<span>,<br/>&nbsp;&nbsp;</span>고지사항 전달<span>) <br/></span>서비스 제공에 관한 계약 이행 및<br/>&nbsp;서비스 제공에 따른 요금정산<span>, <br/></span>컨텐츠 제공<span>, </span>서비스 및 가입상담<br/><br/></span></p></td>
                                            <td rowSpan="4"><p><span>회원탈퇴 시 또는 법정의무 보유기간</span></p></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p><span>[</span><span>선택항목<span>]<br/></span>관리구분<span>,</span>생년월일<span>(YYYYMMDD),</span>성별<span>,</span></span></p>
                                                <p><span>내외국인정보<span>, </span>입사일<span>,</span>직급<span>,</span>부서</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td rowSpan="2">
                                                <p><span>부가 정보</span></p>
                                            </td>
                                            {/*<td>*/}
                                            <td rowSpan="2">
                                                <p><span>결혼여부</span><span>, </span><span>결혼기념일</span><span><span>,</span><span>&nbsp;</span></span><span>자녀유무,<br/></span><span>정보 수신 동의 및 마케팅 관련정보,</span></p>
                                                <p><span>IP Address, 방문일시, 쿠키 등&nbsp;</span><br/><span>자동수집정보</span></p>
                                            </td>
                                            <td rowSpan="2">
                                                <p><span>마케팅<span>/</span>광고 활용<span> <br/>(</span>이벤트 등 광고성 정보전달<span> , <br/></span>인구통계학적 특성에 따른 <br/>서비스제공 및 광고 게재<span>)<br/></span></span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                        {/*    <td><p>&nbsp;</p></td>*/}
                                        </tr>
                                        <tr>
                                            <td rowSpan="2">
                                                <p><span>상품 구매</span></p>
                                            </td>
                                            <td>
                                                <p><span>[</span><span>주문고객정보<span>]<br/></span>필수<span> : </span>이름<span>, </span>휴대전화번호</span></p>
                                            </td>
                                            <td rowSpan="2">
                                                <p><span>상품 구매 시 수집</span></p>
                                            </td>
                                            <td rowSpan="2">
                                                <p><span>주문 상품에 대한 결제 및 상품배송<span>, </span>계약이행을 위한 연락 및 고지</span></p>
                                            </td>
                                            <td rowSpan="2">
                                                <p><span>법정의무 보유기간</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p><span>[</span><span>배송정보<span>]<br/></span>필수<span> : </span>이름<span>, </span>휴대전화번호<span>, </span>배송주소<span><br/></span>선택<span> : </span>추가연락처</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p><span>스마트앱을 통한 수집</span></p>
                                            </td>
                                            <td>
                                                <p><span>선택</span></p>
                                            </td>
                                            <td>
                                                <p><span>고유기기 식별번호<span>, <br/></span>단말기 기기명<span>, OS</span>버전<br/><br/></span></p>
                                            </td>
                                            <td>
                                                <p><span>복리후생관 앱 설치 시 자동 수집</span></p>
                                            </td>
                                            <td>
                                                <p><span>마케팅<span>/</span>광고 활용<span> <br/>(</span>이벤트 등 광고성 정보전달<span> , <br/></span>인구통계학적 특성에 따른&nbsp;</span></p>
                                                <p><span>서비스 제공 및 푸시서비스<span>)</span></span></p>
                                            </td>
                                            <td>
                                                <p><span>회원탈퇴 시 까지</span></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>*&nbsp;회사와 고객사간 서비스이용계약에 따라 특정 항목<span>(</span>회사명<span>,</span>사원번호<span>,</span>이름<span>,</span>복지포인트<span>, </span>기타 식별번호<span>(</span>가맹번코드<span>) </span>등<span>) </span>정보는 임직원 인증을 위하여 암호화된 파일형태로 일괄 취득</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 3 </span>조 개인정보의 보유 및 이용기간</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>이용자가 회사에서 제공하는 서비스를 이용하는 동안 회사는 이용자의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>가<span>. </span>회사 내부 방침에 의한 정보보유 사유</b></span><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사와 고객사간 계약이 종료 한 경우 정산 등의 이유로 고객사 소속의 이용자<span>(</span>회원<span>)</span>의 개인정보 계약 종료 후 익년 년말까지 보유합니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>퇴직 등의 사유로 회원자격을 상실하거나 회원을 탈퇴 한 경우 정산 등의 이유로 이용자의 개인정보를 자격 상실 후 익년 년말까지 보유합니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>나<span>. </span>관련법령에 의한 정보보유 사유</b></span><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>상법<span>, </span>전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다<span>. <br/></span>이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다</span><span>&nbsp;</span></p>
                            <table
                                className={`${style.table}`}
                            >
                                <tbody>
                                    <tr>
                                        <td><p><b>정보</b></p></td>
                                        <td><p><b>보존근거</b></p></td>
                                        <td><p><b>보존기간</b></p></td>
                                    </tr>
                                    <tr>
                                        <td><p><span>계약 또는 청약철회 등에 관한 기록</span></p></td>
                                        <td><p><span>전자상거래 등에서의 소비자보호에 관한 법률</span></p></td>
                                        <td><p><span>5</span><span>년</span></p></td>
                                    </tr>
                                    <tr>
                                        <td><p><span>대금결제 및 재화 등의 공급에 관한 기록</span></p></td>
                                        <td><p><span>전자상거래 등에서의 소비자보호에 관한 법률</span></p></td>
                                        <td><p><span>5</span><span>년</span></p></td>
                                    </tr>
                                    <tr>
                                        <td><p><span>소비자의 불만 또는 분쟁처리에 관한 기록</span></p></td>
                                        <td><p><span>전자상거래 등에서의 소비자보호에 관한 법률</span></p></td>
                                        <td><p><span>5</span><span>년</span></p></td>
                                    </tr>
                                    <tr>
                                        <td><p><span>본인확인에 관한 기록</span></p></td>
                                        <td><p><span>정보통신망 이용촉진 및 정보보호 등에 관한 법률</span></p></td>
                                        <td><p><span>6</span><span>개월</span></p></td>
                                    </tr>
                                    <tr>
                                        <td><p><span>웹사이트 방문기록</span></p></td>
                                        <td><p><span>통신비밀보호법</span></p>
                                        </td>
                                        <td><p><span>3</span><span>개월</span></p></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 4 </span>조 개인정보 파기절차 및 방법</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사의 개인정보 파기절차 및 방법은 다음과 같습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>가<span>. </span>파기절차</b></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의<span> DB</span>로 옮겨져<span>(</span>종이의 경우 별도의 서류함<span>) </span>내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라<span>(</span>보유 및 이용기간 참조<span>)</span>일정 기간 저장된 후 파기됩니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>나<span>. </span>파기방법</b></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 5 </span>조 개인정보의 공유 및 제공</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 이용자들의 개인정보를<span> "2. </span>개인정보의 수집목적 및 이용목적<span>"</span>에서 고지한 범위 내에서 사용하며<span>, </span>이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다<span>.&nbsp;</span></span><span>다만<span>, </span>아래의 경우에는 예외로 합니다</span><span>&nbsp;</span></p>
                            <p><span><br/>- 이용자들이 사전에 공개에 동의한 경우</span></p>
                            <p><span>- 법령의 규정에 의거하거나<span>, </span>수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br/></span><span>- 서비스 제공을 위하여 개인정보를 제휴사에게 제공하거나 공유할 필요가 있는 경우 <br/></span><span>&nbsp; (*제공 또는 공유 할 정보의 항목 및 제휴사명</span><span>, </span><span>목적</span><span>, </span><span>기간 등을 명시하여 회원님께 동의를 구하는 절차를 거치게 되며</span><span>, </span><span>동의하지 않는 경우에는 제</span><span>3</span><span>자에게 제공 또는 공유하지 않습니다</span><span>.)<br/></span><span>- 배송업무상 배송업체에게 배송에 필요한 최소한의 이용자 정보</span><span>( </span><span>이름</span><span>, </span><span>주소</span><span>, </span><span>전화번호</span><span>, </span><span>휴대폰번호</span><span>)</span><span>를 알려주는 경우<br/></span><span>- 통계작성</span><span>, </span><span>학술연구 또는 시장조사 등을 위하여 필요한 경우로서 특정개인을 식별할 수 없는 형태로 제공하는 경우</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 6 </span>조 개인정보의 처리위탁</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 서비스 향상을 위해서 이용자의 개인정보를 위탁 처리할 경우 반드시 사전에 위탁처리 업체명과 위탁 처리되는 개인정보의 범위<span>, </span>위탁업무 내용 등에 대해 상세하게 고지합니다</span><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <div>
                                <table
                                    className={`${style.table}`}
                                >
                                    <tbody>
                                        <tr>
                                            <td><p><b>개인정보 위탁을 받는 자</b></p></td>
                                            <td><p><b>개인정보 취급 위탁하는 업무의 내용</b></p></td>
                                            <td><p><b>보유기간</b></p></td>
                                        </tr>
                                        <tr>
                                            <td><p><span style={{color: "red"}}>한국모바일인증</span></p></td>
                                            <td><p><span>회원가입시 본인인증</span></p></td>
                                            <td><p><span>목적 달성후 <br/>파기</span></p></td>
                                        </tr>
                                        <tr>
                                            <td><p><span style={{color: "red"}}>(주)다날, <br/>(주)빌게이트</span></p></td>
                                            <td><p><span>신용카드 결제승인 및 매입업무 대행</span></p></td>
                                            <td><p><span>목적 달성후 <br/>파기</span></p></td>
                                        </tr>
                                        <tr>
                                            <td><p><span style={{color: "red"}}>구글</span></p></td>
                                            <td><p><span>메일 발송</span></p></td>
                                            <td><p><span>목적 달성후<br/>파기</span></p></td>
                                        </tr>
                                        <tr>
                                            <td><p><span style={{color: "red"}}>써머스플랫폼</span></p></td>
                                            <td><p><span>알림톡<span>/SMS/LMS<br/></span>발송</span></p></td>
                                            <td><p><span>목적 달성후 <br/>파기</span></p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p><span><br/>회사는 위탁계약 체결시 개인정보 보호법 제</span><span>25</span><span>조에 따라 위탁업무 수행목적 외 개인정보 처리금지</span><span>, </span><span>기술적</span><span>/</span><span>관리적 보호조치</span><span>, </span><span>재위탁 제한</span><span>, </span><span>수탁자에 대한 관리</span><span>,</span><span>감독</span><span>, </span><span>손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고</span><span>, </span><span>수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 7 </span>조 개인정보의 제3자 제공에 관한 사항 <br/>(별도의 동의를 받습니다)</span></b></p>
                            <p><span>&nbsp;&nbsp;</span></p>
                            <p><span>개인정보의 제<span>3</span>자 제공이 필요한 경우에는<span>, </span>사전에 회원께 정보를 제공받는자<span>, </span>제공하는 개인정보항목<span>, </span>제공목적<span>, </span>정보의 보유 및 이용기간을 고지하여 사전에 동의를 얻어 제<span>3</span>자에게 개인정보를 제공 할 수 있습니다</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>제공하는 개인정보는 당해 목적을 달성하기 위하여 필요한 최소한의 정보에 국한됩니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>직송 등 일부 배송형태에 따라<span>, </span>전자상거래소비자보호법 제<span> 21</span>조에 의거 협력사에 배송정보가 제공 됩니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>일부 서비스는 외부 콘텐츠 제공사<span>(CP)</span>에서 결제 및 환불 등에 대한 고객상담을 할 수 있습니다</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 8 </span>조 개인정보의 열람<span>, </span>정정</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회원님은 언제든지 등록되어 있는 귀하의 개인정보를 열람하거나 정정하실 수 있습니다<span>. </span>개인정보 열람 및 정정을 하고자 할 경우에는 『내정보관리』 또는 『개인정보변경』을 클릭하여 직접 열람 또는 정정하거나<span>, </span>개인정보보호책임자 및 담당자에게 서면<span>, </span>전화 또는<span> E-mail</span>로 연락하시면 지체 없이 조치하겠습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회원님의 개인정보의 오류에 대한 정정을 요청한 경우<span>, </span>정정을 완료하기 전까지 당해 개인 정보를 이용 또는 제공하지 않습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>잘못된 개인정보를 제<span>3</span>자에게 이미 제공한 경우에는 정정 처리결과를 제<span>3</span>자에게 지체 없이 통지하여 정정하도록 조치하겠습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는<span> "5. </span>개인정보의 보유 및 이용기간<span>"</span>에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 9 </span>조 개인정보 수집<span>, </span>이용<span>, </span>제공에 대한 동의철회<span>(</span>회원탈퇴<span>)</span></span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>이용자의 개인정보는 이용자가 근무하고 있는 회사<span>(</span>고객사<span>)</span>와 회사간 서비스 이용계약이 해지 된 경우와 계약 만료 등의 사유로 고객사의 자격이 상실된 경우<span>, </span>그리고 귀하가 퇴직 등의 사유로 회원자격을 상실한 경우 삭제처리를 요청하실 수 있습니다<span>. </span>또한 일반 가입회원인 경우 회원 탈퇴 기능을 이용하여 회원본인 스스로 탈퇴하실 수 있습니다<span>. </span>일반 가입회원이 회원탈퇴 할 경우<span>, </span>관련법 및 개인정보처리방침에 따라<span>&nbsp; </span>회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원탈퇴 처리를 하며<span>, </span>관련 개인정보를 파기시점에 준하여 파기합니다<span>. </span>단<span>, </span>임직원 회원인 경우 귀하가 퇴직 한 후 회원탈퇴를 요청하셨더라도 고객사와 회사간의 대금결제 등의 이유로 보유기간동안은 삭제처리가 되지 않습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>동의 철회는 개인정보보호책임자에게 서면<span>, </span>전화<span>, E-mail</span>등으로 연락하시면 필요한 조치를 하겠습니다<span>. </span>동의 철회를 하고 개인정보를 파기하는 등의 조치를 취한 경우에는 그 사실을 귀하께 지체 없이 통지하도록 하겠습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 10 </span>조 만<span> 14</span>세 미만 아동의 개인정보</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 만<span> 14</span>세 아동에게 서비스를 제공하지 않으며<span>, </span>아동의 개인정보를 수집하지 않습니다<span>.</span></span></p>
                            <p><span><span><br/></span></span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 11</span>조 개인정보 자동 수집 장치의 설치<span>/</span>운영 및 거부에 관한 사항</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 이용자의 정보를 수시로 저장하고 찾아내는<span> '</span>쿠키<span>(cookie)' </span>등을 운용합니다<span>. </span>쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다<span>. </span>회사는 다음과 같은 목적을 위해 쿠키를 사용합니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>가<span>. </span>쿠키 등 사용 목적</b></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회원의 접속 빈도나 방문 시간 등을 분석</span><span>, </span><span>이용자의 취향과 관심분야를 파악 및 자취 추적</span><span>, </span><span>각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>나<span>. </span>쿠키 설치 허용여부 선택</b></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다</span><span>. </span><span>따라서 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나</span><span>, </span><span>쿠키가 저장될 때마다 확인을 거치거나</span><span>, </span><span>아니면 모든 쿠키의 저장을 거부할 수도 있습니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>다만<span>, </span>쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스는 이용에 어려움이 있을 수 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>쿠키 설치 허용 여부를 지정하는 방법<span>(Internet Explorer</span>의 경우<span>)</span></span><span>&nbsp;</span></p>
                            <p><span>①<span> [</span>도구<span>] </span>메뉴에서<span> [</span>인터넷 옵션<span>]</span>을 선택합니다<span>.</span></span></p>
                            <p><span>②<span> [</span>개인정보 탭<span>]</span>을 클릭합니다</span></p>
                            <p><span>③<span> [</span>개인정보처리 수준<span>]</span>을 설정하시면 됩니다</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 12 </span>조 개인정보의 기술적<span>/</span>관리적 보호 대책</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>가<span>. </span>기술적 대책</b></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 귀하의 개인정보를 처리함에 있어 개인정보가 분실<span>, </span>도난<span>, </span>누출<span>, </span>변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다<span>.</span></span><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회원님의 개인정보는 파일 및 전송 데이터를 암호화하여 혹시 발생할 수 있는 사고 시라도 회원님의 개인정보가 유출되지 않도록 관리되고있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다<span>. </span>백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치<span> (SSL </span>또는<span> XecureWeb(</span>소프트포럼<span>)) </span>를 채택하고 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>해킹 등 외부침입에 대비하여 각 서버마다 침입차단 및 침입탐지 시스템을 도입하고 주기적으로 취약점 분석시스템 등을 이용하여 보안에 만전을 기하고 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><b>나<span>. </span>관리적대책</b></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사의 개인정보관련 처리 직원은 담당자에 한정시키고 있고 이를 위한 별도의 관리자 권한을 부여하여 관리하고 있으며<span>, </span>담당자에 대한 수시 교육을 통하여 개인정보처리방침의 준수를 항상 강조하고 있습니다<span>.</span></span><span>&nbsp;</span>&nbsp;</p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 귀하의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다<span>. </span>그 최소한의 인원에 해당하는 자는 다음과 같습니다</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>-&nbsp;</span><span>이용자를 직접 상대로 하여 상담업무를 수행하는 자</span></p>
                            <p><span>-&nbsp;</span><span>고객사의 복지제도 운영 및 정산 업무를 수행하는 고객사 운영담당자</span></p>
                            <p><span>-&nbsp;</span><span>개인정보보호책임자 및 담당자 등 개인정보관리업무를 수행하는 자</span></p>
                            <p><span>-&nbsp;</span><span>기타업무상 개인정보의 처리가 불가피한 자</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>개인정보를 처리하는 직원을 대상으로 새로운 보안 기술 습득 및 개인정보 보호 의무 등에 관해 정기적인 사내 교육 및 외부 위탁교육을 실시하고 있습니다</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>입사 시 전 직원의 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보처리방침에 대한 이행사항 및 직원의 준수여부를 감사하기 위한 내부절차를 마련하고 있습니다</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>개인정보 관련 처리자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후 개인정보 사고에 대한 책임을 명확화하고 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>개인정보와 일반 데이터를 혼합하여 보관하지 않고 별도의 서버를 통해 분리하여 보관하고 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>전산실 및 자료 보관실 등을 특별 보호구역으로 설정하여 출입을 통제하고 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다<span>. </span>회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의<span> ID </span>와 비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실<span>,</span>유출<span>, </span>변조<span>, </span>훼손이 유발될 경우 회사는 즉각 귀하께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>단<span>, </span>이용자 본인의 부주의나 인터넷상의 문제로<span> ID, </span>비밀번호 등 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 13 </span>조 개인정보보호책임자 및 담당자의 연락처</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다</span>&nbsp;</p><p><span>&nbsp;</span></p>
                            <p style={{fontSize: "11pt",}}><b><span>※ 개인정보보호 책임자</span><br/></b></p>
                            <p style={{fontSize: "11pt",}}><span><b>이름 : 유호상</b></span></p>
                            <p style={{fontSize: "11pt",}}><span><b>소속/직책 : 기술개발팀/이사</b></span></p>
                            <p style={{fontSize: "11pt",}}><b><span>메일 : hsyou@lacucaracha.co.kr</span></b></p>
                            <p style={{fontSize: "11pt",}}><b><span>전화 : 070-4262-7797</span></b></p>
                            <p style={{fontSize: "11pt",}}><b><span>팩스 : 02-508-0612</span></b></p>
                            <p>&nbsp;</p>
                            <p><span>이용자는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보보호책임자 혹은 담당부서로 신고하실 수 있습니다<span>. </span>회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다<span>.</span></span><span>&nbsp;</span><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다<span>.</span></span><span>&nbsp;</span><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>1.&nbsp;</span><span>개인정보 분쟁조정위원회<span> : (</span>국번없이<span>) 1833-6927 (privacy.kisa.or.kr)</span></span></p>
                            <p><span>2.&nbsp;</span><span>개인정보 침해신고센터<span> : (</span>국번없이<span>) 118 (privacy.kisa.or.kr)</span></span></p>
                            <p><span>3.&nbsp;</span><span>대검찰청 사이버범죄수사단<span> : (</span>국번없이<span>) 1301 (cybercid@spo.go.kr)</span></span></p>
                            <p><span>4.&nbsp;</span><span>경찰청 사이버안전국<span> : (</span>국번없이<span>) 182 (cyberbureau.police.go.kr)</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 14 </span>조 기타</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 귀하께 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>이 경우 회사는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수 없습니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사가 포함하고 있는 링크를 클릭<span>(click)</span>하여 타 사이트<span>(site)</span>의 페이지로 옮겨갈 경우 해당 사이트의 개인정보처리방침은 회사와 무관하므로 새로 방문한 사이트의 정책을 검토해 보시기 바랍니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p style={{fontSize: "12pt",}}><b><span>제<span> 15 </span>조 고지의 의무</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>현 개인정보처리방침 내용 추가<span>, </span>삭제 및 수정이 있을 시에는 개정 최소<span> 7</span>일전부터 홈페이지의<span> '</span>공지사항<span>'</span>을 통해 고지할 것입니다<span>.</span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>(</span><span>시행일<span>) </span>본 개인정보처리방침<span> 2021</span>년 <span>4</span>월<span> 30</span>일부터 시행합니다<span>.</span></span></p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    )
}

export default App;