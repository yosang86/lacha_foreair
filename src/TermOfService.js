import {useRef} from "react";
import $ from 'jquery';
import * as common from "./js/find";
// import "./css/TermTable.module.css";
import Footer from "./Footer";

function App() {
    // var goTop = $('#go-top');
    // $(window).scroll(function() {
    //     if ($(window).scrollTop() > 800) {
    //         goTop.addClass('show');
    //     } else {
    //         goTop.removeClass('show');
    //     }
    // });

    window.addEventListener("scroll", function() {
        const goTop = $('#go-top');

        if ($(window).scrollTop() > 800) {
            goTop.addClass('show');
        } else {
            goTop.removeClass('show');
        }
    })

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="javascript:void(0);" onClick={() => common.doHistoryBack()} className="btnPrev">닫기</a>
                    <h1>이용약관</h1>
                </div>
            </div>

            <div id="content">
                <section>
                    <div className="box2">
                        <div className="termTxt">
                            <p><b><span><br/></span></b></p>
                            <p><b><span>제<span> 1 </span>장 총 칙</span></b></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 1 </span>조<span > (</span>목적<span>)</span></span></b></p>
                            <p><span><br/>이 약관은<span>&nbsp;</span></span><span>라쿠카라차</span><span>(</span><span>이하 ‘</span><span>회사<span>'</span></span><span>라 합니다<span>)</span>에서 운영하는 인터넷 관련 서비스<span >&nbsp;</span></span><span>HCC, LACHA&nbsp;</span><span>(</span><span>이하<span>"</span>종합쇼핑몰<span >" </span>이라 한다<span >)</span>를 이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다<span >.</span></span>&nbsp;</p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 2 </span>조<span > (</span>용어의 정의<span>)</span></span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>본 약관에서 사용하는 용어의 정의는 다음과 같습니다</span><span>.</span><span>&nbsp;</span></p>
                            <p><span>&nbsp;- 종합쇼핑몰 :<span >&nbsp;</span></span><span>라쿠카라차</span><span>가 재화 또는 용역을 회원에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며<span >, </span>아울러 종합쇼핑몰을 운영하는 사업자의 의미로도 사용합니다<span >.</span></span><span>&nbsp;</span></p>
                            <p><span>&nbsp;- 서비스</span><span> : </span><span>회사가 제공하는 인터넷상의 모든 서비스를 말합니다</span><span>.</span></p>
                            <p><span>&nbsp;- 고객사</span><span> : </span><span>서비스 이용계약을 맺은 법인이나 단체를 말합니다</span><span>.</span></p>
                            <p><span>&nbsp;- 임직원회원</span><span> : </span><span>고객사로부터 서비스 이용 허가를 요청 받은 근로자</span><span>(</span><span>임직원</span><span>)</span><span>를 말합니다</span><span >.</span></p>
                            <p><span>&nbsp;- 일반가입회원</span><span> : </span><span>본인 스스로 회원가입 기능을 통하여 가입한 회원을 말합니다</span><span>.&nbsp;&nbsp;</span>&nbsp;</p>
                            <p><span>&nbsp;- 비회원<span> : </span>회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 분을 말합니다<span >.</span></span>&nbsp;</p>
                            <p><span>&nbsp;- 회원 <span>: </span>상기 임직원회원<span >, </span>일반가입회원<span>,</span>비회원을 통칭하는 것을 말합니다<span >.</span></span></p>
                            <p><span>&nbsp;- 고객사 코드</span><span> : </span><span>고객사의 식별과 고객사의 서비스 이용을 위하여 회사는 승인하여 등록된 문자나 숫자 혹은 그 조합을 말합니다</span><span >.</span></p>
                            <p><span>&nbsp;- 아이디</span><span> : </span><span>회원의 식별과 회원의 서비스이용을 위하여 회사는 승인하여 등록된 문자나 숫자 혹은 그 조합을 말합니다</span><span >(</span><span>이하</span><span> "ID"</span><span>라 합니다</span><span >).</span></p>
                            <p><span>&nbsp;- 비밀번호</span><span> : </span><span>회원이 부여 받은</span><span> ID</span><span>와 일치된 회원임을 확인하고</span><span >, </span><span>회원의 권익 및 비밀보호를 위하여 회원 스스로가 선정하여 종합쇼핑몰에 등록한 문자와 숫자의 조합을 말합니다</span><span >.</span></p>
                            <p><span>&nbsp;- 운영자</span><span> : </span><span>서비스의 전반적인 관리와 원활한 운영을 위하여 종합쇼핑몰에서 선정한 자를 말합니다</span><span >.</span></p>
                            <p><span>&nbsp;- 제휴 사이트</span><span> : </span><span>회사는 업무제휴를 통해 공동마케팅</span><span>, </span><span>공동사업 등을 추진하기 위하여 하이퍼링크 방식</span><span>(</span><span>하이퍼링크의 대상에는 문자</span><span >, </span><span>정지 및 동화상 등이 포함됨</span><span>) </span><span>등으로 연결한 업무제휴 사업체의 웹 사이트를 말합니다</span><span >.</span></p>
                            <p><span>&nbsp;- 서비스제공 제한·중지</span><span> : </span><span>공공의 이익 또는 회사의 규정에 위배되는 경우에 회원에게 제공하는 서비스의 전부 또는 일부를 제한하거나 중지하는 것을 말합니다</span><span >.</span>&nbsp;</p>
                            <p><span>&nbsp;- 해지<span> : </span>회사 또는 고객사 및 회원이 서비스 이용계약을 종료 시키는 것을 말합니다<span>.</span></span></p>
                            <p>&nbsp;</p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 3 </span>조<span > (</span>이용약관의 효력 및 변경<span>)</span></span></b><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 이 약관은 종합쇼핑몰 웹사이트에서 온라인으로 공시함으로써 효력이 발생합니다<span>.</span></span></p>
                            <p><span>② 회사는 약관의 규제에 관한 법률</span><span>, </span><span>전자거래기본법</span><span>, </span><span>전자서명법</span><span >, </span><span>정보통신망이용촉진 등에 관한 법률</span><span>, </span><span>방문판매 등에 관한 법률</span><span>, </span><span>소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다</span><span >.</span>&nbsp;&nbsp;</p>
                            <p><span>③ 회사는 약관을 개정할 경우 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자<span > 7</span>일 이전부터 적용일자 전일까지 공지합니다<span >. </span>단<span>, </span>약관의 변경이 소비자에게 불리한 경우에는 개정 약관 적용일 전 최소<span > 30</span>일부터 공지합니다<span >.</span></span>&nbsp;</p>
                            <p><span>④ 회사는 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다<span >. </span>다만 이미 계약을 체결한 회원이 개정약관 조항의 적용을 받기를 원하는 뜻을 제<span >3</span>항에 의한 개정약관의 공지 기간 내에 회사의 동의를 받은 경우에는 개정약관 조항이 적용됩니다<span >.</span></span></p>
                            <p><span>⑤ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 정부가 제정한 전자거래소비자보호지침 및 관계법령 또는 상관례에 따릅니다</span><span >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 4 </span>조<span > (</span>약관 외 준칙<span>)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span>&nbsp;</p>
                            <p><span>① 이 약관은 회사가 제공하는 제휴서비스 및 개별서비스에 대해서는 별도의 이용약관 및 정책을 둘 수 있으며<span>, </span>해당 내용이 이 약관과 상충한 경우 “제휴서비스 등”이 우선하여 적용됩니다<span>.</span></span></p>
                            <p><span>② 이 약관에 명시되지 아니한 사항이나 해석에 대해서는 “제휴서비스 약관 등” 및 관계법령 및 또는 상관례에 따릅니다</span><span>.</span></p>
                            <p>&nbsp;<span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span > 2 </span>장 이용계약 체결</span></b><span></span></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 5 </span>조<span > (</span>이용 계약의 성립<span>)</span></span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>①<span>&nbsp;</span></span><span>이용계약은 회사와 고객사간에 계약 체결에 따라 고객사의 근로자에게 회원가입자격이 주어지며 회원가입자격이 있는 이용고객의 본 이용약관 내용에 대한 동의와 이용신청에 대하여 회사의 이용승낙으로 성립합니다<span >.</span></span></p>
                            <p><span>②<span>&nbsp;</span></span><span >회사는<span >"</span>가입신청자<span >"</span>의 신청에 대하여<span >"</span>서비스<span >" </span>이용을 승낙함을 원칙으로 합니다<span >. </span>다만<span >, </span>회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다<span >.</span></span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우<span >, </span>단 회사의 회원 재가입 승낙을 얻은 경우에는 예외로 함<span >.</span></span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span   >실명이 아니거나 타인의 명의를 이용한 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>허위의 정보를 기재하거나<span>, </span>회사가 제시하는 내용을 기재하지 않은 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>14</span><span>세 미만 아동이 법정대리인<span>(</span>부모 등<span >)</span>의 동의를 얻지 아니한 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</span></p>
                            <p><span >③ 제</span><span>1</span><span>항에 따른 신청에 있어 회사는 회원의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다</span><span  >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 6 </span>조<span > (</span>회원<span >ID </span>부여 및 변경 등<span>)</span></span></b><span></span></p>
                            <p><b><span><span><br/></span></span></b></p>
                            <p><span>①<span>&nbsp;</span></span><span>회사는 회원을 구별하기 위해 회원<span> ID</span>로 사용하며 임직원 회원의 경우 고객사와의 협의에 의해 사번<span >, </span>회사 그룹웨어 아이디 등 다른 식별자를 사용할 수 있습니다<span >. </span>일반 가입회원의 경우 회원이 스스로 지정할수 있습니다<span >.</span></span>&nbsp;</p>
                            <p><span><span>②</span></span><span><span>&nbsp;</span></span><span>회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다<span>. </span>다만<span >, </span>서비스 관리를 위해 필요한 실명<span>, </span>주민등록번호<span >, </span>아이디 등은 수정이 불가능합니다<span>. </span>부득이한 사유로 인하여 변경 하고자 하는 경우에는 해당<span > ID</span>를 해지하고 재가입해야 합니다<span >.</span></span></p>
                            <p><span>③&nbsp;</span><span>회원 정보 중 다음 각 호에 해당하는 경우에는 회원 또는 회사의 요청으로 변경할 수 있습니다<span >.<br/></span></span></p>
                            <p><span>&nbsp; &nbsp; -<span>&nbsp;</span></span><span>고객사측에서 회원의 회원정보를 잘못 전달 했을 때</span></p>
                            <p><span>&nbsp; &nbsp; -<span>&nbsp;</span></span><span>주민등록번호 정정으로 주민등록이 변경된 경우</span></p>
                            <p><span>&nbsp; &nbsp; -<span>&nbsp;</span></span><span>기타 합리적인 사유가 있는 경우</span></p>
                            <p><span>④ 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 회사에 대하여 그 변경사항을 알려야 합니다</span><span >.</span>&nbsp;</p>
                            <p><span>⑤ 제<span>4</span>항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다<span >.</span></span><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span>&nbsp;</p>

                            <p><b><span>제 <span>7 </span>조<span > (</span>회원탈퇴<span>)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><span>①<span>&nbsp;</span></span></span><span>회원탈퇴는 임직원 회원의 경우 회원님이 소속하신 기업<span >/</span>기관과 종합쇼핑몰 이용에 대한 계약 종료 시 또는 소속하신 기업<span >/</span>기관에서 퇴직 시 탈퇴처리 되며<span >, </span>일반가입회원의 경우 홈페이지 회원탈퇴 메뉴에서 언제든지 개인정보의 수집<span >·</span>이용<span>·</span>제공에 대한 동의를 바로 철회할 수 있습니다<span >. </span>또한<span>, </span>개인정보 관리 책임자 또는 담당자에게 연락하시면 즉시 회원탈퇴를 위해 필요한 조치를 취합니다<span >.</span></span>&nbsp;</p>
                            <p className="MsoListParagraph"><span><span>②<span>&nbsp;</span></span></span><span>일반가입회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다<span >. </span>다만<span >, </span>해지의사를 통지하기 전에 모든 상품의 판매 및 구매 절차를 완료<span >, </span>철회 또는 취소해야만 합니다<span >. </span>이 경우 판매 및 구매의 철회 또는 취소로 인한 불이익은 회원 본인이 부담하여야 합니다<span >.</span></span>&nbsp;</p>
                            <p className="MsoListParagraph"><span><span>③<span>&nbsp;</span></span></span><span>회원이 계약을 해지할 경우<span>, </span>관련법 및 개인정보처리방침에 따라 종합쇼핑몰이 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원탈퇴 처리를 하며<span >, </span>관련 개인정보를 파기시점에 준하여 파기합니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p><p ><span>&nbsp;</span></p>

                            <p><b><span>제 <span>8 </span>조<span > (</span>개인정보보호 의무<span>)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는</span><span > "</span><span>정보통신망법</span><span>" </span><span>등 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다</span><span >. </span><span>개인정보의 보호 및 사용에 대해서는 관련법 및 회사의 개인정보취급방침이 적용됩니다</span><span >. </span><span>다만</span><span>, </span><span>회사의 공식 사이트 이외의 링크된 사이트에서는 회사의 개인정보취급방침이 적용되지 않습니다</span><span >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제 <span>9 </span>조<span > (</span>회원의<span > "</span>아이디<span>" </span>및<span >"</span>비밀번호<span >"</span>의 관리에 대한 의무<span >)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회원의</span><span > "</span><span>아이디</span><span>"</span><span>와</span><span> "</span><span>비밀번호</span><span>"</span><span>에 관한 관리책임은 회원에게 있으며</span><span>, </span><span>이를 제</span><span>3</span><span>자가 이용하도록 하여서는 안됩니다</span><span>.</span></p>
                            <p><span>② 회사는 회원의</span><span> "</span><span>아이디</span><span>"</span><span>가 개인정보 유출 우려가 있거나</span><span >, </span><span>반사회적 또는 미풍양속에 어긋나거나 회사 및 회사의 운영자로 오인한 우려가 있는 경우</span><span >, </span><span>해당</span><span> "</span><span>아이디</span><span>"</span><span>의 이용을 제한할 수 있습니다</span><span>.</span></p>
                            <p><span>③ 회원은</span><span > "</span><span>아이디</span><span>" </span><span>및</span><span> "</span><span>비밀번호</span><span>"</span><span>가 도용되거나 제</span><span>3</span><span>자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다</span><span>.</span></p>
                            <p><span>④ 제</span><span>3</span><span>항의 경우에 해당 회원이 회사에 그 사실을 통지하지 않거나</span><span>, </span><span>통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 3 </span>장 서비스 이용</span></b></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제 <span>10 </span>조<span > (“</span>서비스<span >”</span>의 제공 등<span>)</span></span></b><span></span></p>
                            <p><b><span><span><br/></span></span></b></p>
                            <p><span>①<span >&nbsp;</span></span><span>회사는 회원에게 아래와 같은 서비스를 제공합니다</span><span>&nbsp;</span>&nbsp;</p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>포인트 배정 및 사용 관리</span><span></span></p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>상품 및 서비스 판매</span><span></span></p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>각종 정보의 제공</span><span></span></p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스</span><span  >&nbsp; &nbsp;</span></p>
                            <p><span>② 회사는</span><span> "</span><span>서비스</span><span>"</span><span>를 일정범위로 분할하여 각 범위 별로 이용가능시간을 별도로 지정할 수 있습니다</span><span >. </span><span>다만</span><span>, </span><span>이러한 경우에는 그 내용을 사전에 공지합니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 11 </span>조<span > ("</span>서비스<span >"</span>의 변경<span>)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회사는 상당한 이유가 있는 경우에 운영상</span><span>, </span><span>기술상의 필요에 따라 제공하고 있는 전부 또는 일부</span><span > "</span><span>서비스</span><span>"</span><span>를 변경할 수 있습니다</span><span >.</span></p>
                            <p><span>②&nbsp;</span><span>"</span><span>서비스</span><span>"</span><span>의 내용</span><span>, </span><span>이용방법</span><span>, </span><span>이용시간에 대하여 변경이 있는 경우에는 변경사유</span><span>, </span><span>변경될 서비스의 내용 및 제공일자 등은 그 변경 전에 해당 서비스 초기화면에 게시하여야 합니다</span><span>.</span></p>
                            <p><span>③ 회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정</span><span>,</span><span>중단</span><span >, </span><span>변경할 수 있으며</span><span>, </span><span>이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다</span><span >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 12 </span>조<span > (</span>서비스 이용 시간<span>)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>①&nbsp;</span><span>"</span><span>서비스</span><span>"</span><span>는 연중무휴</span><span>, 1</span><span>일</span><span> 24</span><span>시간 제공함을 원칙으로 합니다</span>&nbsp;&nbsp;</p>
                            <p><span>② 회사는 컴퓨터 등 정보통신설비의 보수점검<span>, </span>교체 및 고장<span >, </span>통신두절 또는 운영상 상당한 이유가 있는 경우<span> "</span>서비스<span >"</span>의 제공을 일시적으로 중단할 수 있습니다<span>. </span>이 경우 회사는 전자우편이나<span >, </span>종합쇼핑몰에 게재 등으로 회원에게 통지합니다<span >. </span>다만<span >, </span>회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다<span>.</span></span></p>
                            <p><span>③ 회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며</span><span>, </span><span>정기점검시간은 서비스제공화면에 공지한 바에 따릅니다</span><span >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 13 </span>조 【서비스 이용의 한계와 책임】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회원은 회사가 서면으로 허용한 경우를 제외하고는 서비스를 이용하여 상품을 판매하는 영업활동을 할 수 없습니다<span>. </span>특히<span>, </span>회원은 해킹·돈벌이 광고·음란 사이트 등을 통한 상업행위<span>, </span>상용<span >S/W </span>불법배포 등을 할 수 없습니다<span>. </span>이를 위반하여 발생된 영업활동의 결과 및 손실<span >, </span>관계기관에 의한 구속 등 법적 조치 등에 관해서는 회사는 책임을 지지 않습니다<span >.</span></span><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 14 </span>조 【서비스 제공의 제한 등】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>①&nbsp;</span><span>회사는 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다<span >.</span></span><span>&nbsp;</span></p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>서비스용 설비의 보수 등 공사로 인한 부득이한 경우</span><span></span></p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>전기통신사업법에 규정된 기간통신사업자가 전기통신서비스를 중지했을 경우</span><span></span></p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>국가비상사태<span>,</span>정전<span >, </span>서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우</span><span></span></p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>기타 불가항력적 사유가 있는 경우</span><span>&nbsp;</span><span>&nbsp;</span></p>
                            <p><span>② 회사는 서비스의 이용을 제한하거나 중지한 때에는 그 사유 및 제한기간 등을 종합쇼핑몰 웹사이트를 통해 지체 없이 회원에게 알리도록 합니다<span >.</span></span><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 15 </span>조 【정보의 제공 등】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><span>①<span>&nbsp;</span></span></span><span>회사는 회원이 서비스를 이용할 때 필요하다고 인정되는 다양한 정보의 추가 또는 변경내용을 공지사항이나<span > e-mail, SMS,</span>알림톡<span >,APP PUSH </span>등의 방법으로 회원에게 제공할 수 있습니다<span >.</span></span><span></span></p>
                            <p><span>② 회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 추가적인 개인정보를 요구할 수 있습니다<span>.</span></span><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 16 </span>조<span > (</span>게시물의 관리<span>)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할 수 있습니다<span>.</span></span><span></span></p>
                            <p><span>-<span>&nbsp;&nbsp;</span></span><span>다른 회원 또는 제<span > 3</span>자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우</span></p>
                            <p><span><span>-<span>&nbsp;&nbsp;</span></span></span><span>공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우</span><span></span></p>
                            <p><span><span>-<span>&nbsp;&nbsp;</span></span></span><span>불법복제 또는 해킹을 조장하는 내용인 경우</span><span></span></p>
                            <p><span><span>-<span>&nbsp;&nbsp;</span></span></span><span>영리를 목적으로 하는 광고일 경우</span><span></span></p>
                            <p><span><span>-<span>&nbsp;&nbsp;</span></span></span><span>범죄와 결부된다고 객관적으로 인정되는 내용일 경우</span><span></span></p>
                            <p><span><span>-<span>&nbsp;&nbsp;</span></span></span><span>다른 회원 또는 제<span> 3</span>자의 저작권 등 기타 권리를 침해하는 내용인 경우</span><span></span></p>
                            <p><span><span>-<span>&nbsp;&nbsp;</span></span></span><span>회사에서 규정한 게시물 원칙에 어긋나거나<span>, </span>게시판 성격에 부합하지 않는 경우</span><span></span></p>
                            <p><span><span>-<span>&nbsp;&nbsp;</span></span></span><span>기타 관계법령에 위배된다고 판단되는 경우</span><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 17 </span>조<span > (</span>게시물에 대한 저작권<span>)</span></span></b><span></span></p>
                            <p>&nbsp;&nbsp;</p><p ><span>① 회원이 서비스 화면 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다</span><span>. </span><span>또한 회사는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다</span><span >. </span><span >다만 비영리 목적인 경우는 그러하지 아니하며</span><span >, </span><span>또한 서비스내의 게재권을 갖습니다</span><span>.</span>&nbsp;</p>
                            <p ><span>② 회원은 서비스를 이용하여 취득한 정보를 임의 가공<span>, </span>판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다<span >.</span></span></p>
                            <p><span>③ 회사는 회원이 게시하거나 등록하는 서비스 내의 내용물</span><span>, </span><span>게시 내용에 대해 제</span><span > 15</span><span>조 각 호에 해당된다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다</span><span>.</span></p>
                            <p>&nbsp;</p>
                            <p><span>&nbsp;</span></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 4 </span>장 계약 당사자의 의무</span></b></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 18 </span>조<span > (</span>회사의 의무<span>)</span></span></b><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회사는 이용고객이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다</span></p>
                            <p><span>② 회사는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실 된 때에는 부득이한 사유가 없는 한 지체 없이 이를 수리 또는 복구합니다</span><span >.</span></p>
                            <p><span>③ 회사는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 취급방침을 공시하고 준수합니다</span><span>.</span></p>
                            <p><span>④ 회사는 이용고객으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야 합니다</span><span >. </span><span>다만</span><span>, </span><span>즉시 처리가 곤란한 경우는 회원에게 그 사유와 처리일정을 통보하여야 합니다</span></p><p >&nbsp;</p><p ><b><span><br/></span></b></p>

                            <p><b><span>제<span> 19 </span>조<span > (</span>회원의 의무<span>)</span></span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회원은 회원가입 신청 또는 회원정보 변경 시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며</span><span>, </span><span>허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수 없습니다</span><span>.</span>&nbsp;</p>
                            <p><span>② 회원은 본 약관에서 규정하는 사항과 기타 회사는 정한 제반 규정<span>, </span>공지사항 등 회사는 공지하는 사항 및 관계법령을 준수하여야 하며<span >, </span>기타 회사의 업무에 방해가 되는 행위<span >, </span>회사의 명예를 손상시키는 행위를 해서는 안됩니다<span>.</span></span>&nbsp;</p>
                            <p><span>③ 회원은 주소<span>, </span>연락처<span >, </span>전자우편 주소 등 이용계약사항이 변경된 경우에 해당 절차를 거쳐 이를 종합쇼핑몰에 즉시 알려야 합니다<span >.</span></span>&nbsp;</p>
                            <p><span>④ 회사는 관계법령 및</span><span> '</span><span>개인정보 취급방침</span><span>'</span><span>에 의거하여 그 책임을 지는 경우를 제외하고 회원에게 부여된</span><span > ID</span><span>의 비밀번호 관리소홀</span><span>, </span><span>부정사용에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다</span><span>.</span></p>
                            <p><span>⑤ 회원은 회사의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며<span>, </span>그 영업활동의 결과에 대해 회사는 책임을 지지 않습니다<span >. </span>또한 회원은 이와 같은 영업활동으로 회사는 손해를 입은 경우<span >, </span>회원은 회사에 대해 손해배상의무를 지며<span >, </span>회사는 해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다<span >.</span></span></p>
                            <p><span>⑥ 회원은 회사의 명시적 동의가 없는 한 서비스의 이용권한<span>, </span>기타 이용계약상의 지위를 타인에게 양도<span >, </span>증여할 수 없으며 이를 담보로 제공할 수 없습니다<span >.</span></span></p>
                            <p><span>⑦ 회원은 회사 및 제</span><span> 3</span><span>자의 지적 재산권을 침해해서는 안됩니다</span><span>.</span></p>
                            <p><span>⑧ 회원은 다음 각 호에 해당하는 행위를 하여서는 안되며<span>, </span>해당 행위를 하는 경우에 회사는 회원의 서비스 이용제한 및 적법 조치를 포함한 제재를 가할 수 있습니다<span >. </span>단<span >, </span>서비스 이용제한 및 제재조치를 할 경우<span>, </span>소명기간<span >(30</span>일<span >)</span>을 정하여 회원으로부터 소명의 기회를 부여합니다<span>.</span></span><span>&nbsp;</span>&nbsp;</p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>회원가입 신청 또는 회원정보 변경 시 허위내용을 등록하는 행위</span>&nbsp;</p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>다른 회원의<span>ID, </span>비밀번호<span >, </span>주민등록번호를 도용하는 행위</span>&nbsp;</p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>회원<span> ID</span>를 타인과 거래하는 행위</span>&nbsp;</p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>종합쇼핑몰의 운영진<span>, </span>직원 또는 관계자를 사칭하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>종합쇼핑몰로부터 특별한 권리를 부여 받지 않고 종합쇼핑몰의 클라이언트 프로그램을 변경하거나<span >, </span>종합쇼핑몰의 서버를 해킹하거나<span >, </span>웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>서비스에 위해를 가하거나 고의로 방해하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>본 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 서비스 이용 외의 목적으로 복제하거나<span >, </span>이를 출판 및 방송 등에 사용하거나<span >, </span>제<span> 3</span>자에게 제공하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>공공질서 및 미풍양속에 위반되는 저속<span>, </span>음란한 내용의 정보<span >, </span>문장<span>, </span>도형<span >, </span>음향<span >, </span>동영상을 전송<span>, </span>게시<span >, </span>전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>모욕적이거나 개인신상에 대한 내용이어서 타인의 명예나 프라이버시를 침해할 수 있는 내용을 전송<span >, </span>게시<span >, </span>전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>다른 회원을 희롱 또는 위협하거나<span>, </span>특정 회원에게 지속적으로 고통 또는 불편을 주는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>회사의 승인을 받지 않고 다른 사용자의 개인정보를 수집 또는 저장하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>범죄와 결부된다고 객관적으로 판단되는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>본 약관을 포함하여 기타 회사는 정한 제반 규정 또는 이용 조건을 위반하는 행위</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>기타 관계법령에 위배되는 행위</span></p>
                            <p><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></p>
                            <p><b><span><br/></span></b></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 5 </span>장 구매계약 및 대금결제</span></b><span></span></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제 <span>20 </span>조 【구매신청】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회원은 다음 각 호의 절차에 따라 종합쇼핑몰 홈페이지를 통하여 상품 또는 서비스를 구매할 수 있습니다</span><span>.</span><span>&nbsp;</span>&nbsp;</p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>성명<span>, </span>주소<span >, </span>전화번호 입력</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>재화 또는 용역의 선택</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>결제방법의 선택</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>기타 회사가 별도로 정하는 절차</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 21</span>조 【계약의 성립】</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>①<span>&nbsp;</span></span><span>회사는 제<span>19</span>조와 같은 구매신청에 대하여 다음 각 호에 해당하지 않는 한 승낙합니다<span >.</span></span>&nbsp;</p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>신청 내용에 허위<span>, </span>기재누락<span >, </span>오기가 있는 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>미성년자가 담배<span>, </span>주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>기타 구매신청에 승낙하는 것이 종합쇼핑몰의 기술상 현저히 지장이 있다고 판단하는 경우</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>② 회사는 회원으로부터 상품 또는 서비스에 대한 구매신청을 받은 경우 당해 회원에게 구매가 성공적으로 완료되었다는 메시지</span><span> ( </span><span>이하</span><span> " </span><span>구매완료 메시지</span><span> ") </span><span>를 보여주며 이러한 구매완료 메시지를 회원에게 보여줌으로써 당해 상품 또는 서비스에 대한 구매계약이 성립합니다</span><span >.</span>&nbsp;</p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 22 </span>조 【지급방법】</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회원은 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 하나 또는 그 이상을 결합하여 할 수 있습니다<span>.</span></span>&nbsp;</p>
                            <p><span><span>&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>신용카드결제</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>계좌이체</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>포인트</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>회사지원금</span>&nbsp;</p>
                            <p><span><span >&nbsp; &nbsp;-<span>&nbsp;</span></span></span><span>적립금</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>회사와 계약을 맺었거나 회사가 인정한 상품권에 의한 결제</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>기타 적립금 등 회사가 지원하는 결제방법</span></p>
                            <p >&nbsp;<span>② 단</span><span>, </span><span>회사는 공급되는 재화의 성격에 따라 대금지급방법을 한정 할 수 있으며</span><span>, </span><span>이러한 경우에는 회원이 구매신청 이전에 확인할 수 있도록 사전고지 합니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 23 </span>조 【수신확인통지·구매신청 변경 및 취소】</span></b><span></span></p>
                            <p><b><span><br/></span></b></p>
                            <p><span>① 회사는 회원의 구매신청이 있는 경우 회원에게 수신확인통지를 합니다</span><span>.</span></p>
                            <p><span>② 수신확인통지를 받은 회원은 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있습니다</span><span >.</span></p>
                            <p><span>③ 회사는 배송 전 회원의 구매신청 변경 및 취소 요청이 있는 때에는 지체 없이 그 요청에 따라 처리합니다</span><span>.</span></p>
                            <p><span >&nbsp;</span></p>
                            <p><span >&nbsp;</span></p>
                            <p><span >&nbsp;</span></p>

                            <p><b><span>제<span>6</span>장 배송 및 환불</span></b><span></span></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 24 </span>조 【배송】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>회사는 회원이 구매한 재화에 대해 배송수단</span><span>, </span><span>수단별 배송비용 부담자</span><span>, </span><span>수단별 배송기간 등을 명시합니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 25 </span>조 【청약의 철회】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 종합쇼핑몰로부터 상품을 인도 받거나 용역을 제공 받은 회원은 다음 각 호의 경우에는 상품을 인도 받거나 용역을 제공 받은 날부터<span > 20 </span>일 이내<span >(</span>종합쇼핑몰의 주소가 변경되는 등의 사유로 이 기간 내에 청약의 철회를 할 수 없는 경우에는 그 주소를 안 날 또는 알 수 있었던 날부터<span > 20 </span>일 이내<span >)</span>에 당해 계약에 관한 청약을 철회할 수 있습니다<span >.</span></span>&nbsp;</p>
                            <p><span>&nbsp;&nbsp;</span><span>-<span>&nbsp;</span></span><span>서비스 회원에게 인도될 당시 당해 상품이 훼손된 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>통신판매에 관한 광고의 내용과 다른 상품이 인도되거나 용역이 제공된 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>상품의 인도 또는 용역의 제공이 통신판매에 관한 광고에 표시된 상품의 인도시기 또는 용역의 제공시기보다 늦어진 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>방문판매 등에 관한 법률 제<span >18</span>조에 의하여 광고에 표시하여야 할 사항을 표시하지 아니한 상태에서 회원의 청약이 이루어진 경우</span></p>
                            <p><span>&nbsp; &nbsp;-<span>&nbsp;</span></span><span>기타 소비자보호를 위하여 대통령령이 정하는 경우</span>&nbsp;&nbsp;</p>
                            <p><span>② 제<span>1</span>항 제<span >1</span>호의 규정에 불구하고 회원의 책임 있는 사유로 상품이 훼손된 경우에는 회원은 청약의 철회를 할 수 없습니다<span >.</span></span></p>
                            <p><span>③ 제</span><span> 1</span><span>항의 규정에 의한 청약의 철회는 이</span><span>-</span><span>메일을 통한 서면통보를 한 날에 그 효력이 발생합니다</span><span >.</span></p>
                            <p><span>④ 제</span><span> 1</span><span>항의 적용과 관련하여 상품의 훼손에 대하여 회원의 책임이 있는지의 여부</span><span>, </span><span>인도된 상품 또는 제공된 용역이 광고의 내용과 동일한 상품 또는 용역인지의 여부</span><span>, </span><span>상품의 인도사실 및 그 시기 또는 용역의 제공사실 및 그 시기</span><span>, </span><span>광고에 표시하여야 할 사항을 표시하였는지의 여부에 관하여 다툼이 있는 경우에는 회사는 이를 입증합니다</span><span >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 26 </span>조 【청약 철회 등의 효과】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회원은 제<span>24</span>조제<span >1</span>항의 규정에 의하여 청약을 철회한 경우에는 이미 인도 받은 상품 또는 제공 받은 용역을 반환하여야 하며<span >, </span>회사는 이미 지급 받은 상품의 대금 또는 용역의 대가를 상품 또는 용역을 반환 받은 날의<span > 3</span>영업일 이내에 환불<span >(</span>환불하기 위한 송금을 포함한다<span>)</span>합니다<span >.</span></span>&nbsp;</p>
                            <p><span>② 제<span>1</span>항의 경우 소비자가 여신전문금융업법 제<span >2</span>조제<span>3</span>호의 규정에 의한 신용카드로 상품의 대금 또는 용역의 대가를 지급한 때에는 회사는 즉시 당해 신용카드업자에게 상품대금 또는 용역대가의 청구를 정지 또는 취소할 것을 요청합니다<span >.</span></span>&nbsp;</p>
                            <p><span>③ 제<span>2</span>항의 경우 회사는 신용카드업자로부터 당해 상품대금 또는 용역대가를 이미 지급 받은 때에는 즉시 이를 신용카드업자에게 반환하여야 합니다<span >.</span></span>&nbsp;</p>
                            <p><span>④ 제<span>1</span>항의 경우 회사는 이미 용역<span >(</span>일정한 시설을 이용하거나 용역의 제공을 받을 수 있는 권리를 제외한다<span >)</span>이 제공된 경우에는 이미 제공된 용역과 동일한 내용의 용역의 반환이나 그 용역의 대가 또는 그 용역에 의하여 얻어진 이익에 상당하는 금액의 지급을 청구할 수 있습니다<span >.</span></span></p>
                            <p><span>⑤ 제<span>1</span>항의 경우 인도 받은 상품 또는 제공 받은 용역의 반환에 필요한 비용은 회사가 이를 부담하며 회사는 회원에게 위약금 또는 손해배상을 청구하지 않습니다<span >.</span></span>&nbsp;</p>
                            <p><span>⑥ 제</span><span>1</span><span>항의 경우 회원은 용역의 제공과 관련하여 자기의 토지 또는 건물 기타 공작물의 형태가 변경된 때에는 당해 회사에게 무상으로 원상회복을 하여줄 것을 청구할 수 있습니다</span><span >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 27 </span>조 【적립금 정책】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><span>①<span>&nbsp;</span></span></span><span>회사는<span><span >&nbsp; </span></span>회원 보상목적으로 적립금을 운영합니다<span>.</span></span></p>
                            <p><span>②<span>&nbsp;</span></span><span>적립금은 상품<span>/</span>서비스 구매<span>, </span>이벤트 참여 등 회사가 규정하는 기준에 따라 지급되며<span >, </span>회사는 회원의 동의 절차 없이 적립금의 지급 기준을 변경할 수 있습니다<span>.</span></span></p>
                            <p><span>③<span>&nbsp;</span></span><span>적립금은 회원<span> ID</span>별로 적립됩니다<span >.</span></span>&nbsp;</p>
                            <p><span><span >④<span>&nbsp;</span></span></span><span>적립금은 종합쇼핑몰에서 상품 및 서비스 구매 시 현금처럼 사용 가능하지만<span >, </span>상품 및 서비스별로 적립금 사용에 제한이 있을 수 있으며 회원에게 현금으로 지급되지는 않습니다<span >.</span></span>&nbsp;</p>
                            <p><span><span >⑤<span>&nbsp;</span></span></span><span>해지 및 회원 탈퇴 시 잔액 여부와 상관없이 회원의 적립금은 소멸되며 타인에게 양도할 수 없습니다<span >.</span></span>&nbsp;</p>
                            <p><span><span >⑥<span>&nbsp;</span></span></span><span>적립금의 소멸 시효는 다음의 경우를 따릅니다<span>.</span></span>&nbsp;</p>
                            <p><span>&nbsp; &nbsp; -<span >&nbsp; </span></span><span>지급시점 기준으로<span> 12</span>개월이 되는 시점에 소멸</span>&nbsp;</p>
                            <p><span>&nbsp; &nbsp; -<span >&nbsp; </span></span><span>회사가 사전 고지 후 지급한 적립금의 경우는 해당 고지일에 준하여 소멸</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span><br/></span></p>
                            <p><span><br/></span></p>

                            <p><b><span>제<span>7</span>장 손해배상 및 기타사항</span></b><span></span></p>
                            <p><b><span><br/></span></b></p>

                            <p><b><span>제<span> 28 </span>조<span > (</span>연결 웹사이트와 피연결 웹사이트 간의 관계<span >)</span></span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 상위 웹사이트와 하위 웹사이트가 하이퍼 링크</span><span>(</span><span>예</span><span>: </span><span>하이퍼 링크의 대상에는 문자</span><span>, </span><span>그림 및 동화상 등이 포함됨</span><span>)</span><span>방식 등으로 연결된 경우</span><span>, </span><span>전자를 연결 웹 사이트라고 하고 후자를 피연결 웹사이트라고 합니다</span><span >.</span></p>
                            <p>&nbsp;&nbsp;<span>② 연결 웹사이트는 피연결 웹사이트가 독자적으로 제공하는 재화·용역에 의하여 회원과 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 피연결 웹사이트에서 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다</span><span >.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제<span> 29 </span>조 【손해배상의 범위 및 청구】</span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회사는 천재지변 등 불가항력적이거나 종합쇼핑몰의 귀책사유 없이 발생한 회원의 손해에 대해서는 손해배상책임을 부담하지 않습니다</span><span >.</span>&nbsp;</p>
                            <p><span><span>②&nbsp;</span></span><span>손해배상의 청구는 종합쇼핑몰에 청구사유<span >, </span>청구금액 및 산출근거를 기재하여 서면으로 하여야 합니다<span >.</span></span><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p>&nbsp;</p>

                            <p><b><span>제 <span>30 </span>조<span > (</span>면책조항<span >)</span></span></b></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회사는 천재지변<span>, </span>전쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다<span >.</span></span>&nbsp;</p>
                            <p><span>② 회사는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다<span>.</span></span>&nbsp;</p>
                            <p><span>③ 회사는 서비스용 설비의 보수<span >, </span>교체<span>, </span>정기점검<span >, </span>공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다<span>.</span></span>&nbsp;</p>
                            <p><span>④ 회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다<span>.</span></span>&nbsp;</p>
                            <p><span>⑤ 회사는 회원의 컴퓨터 오류에 의해 손해가 발생한 경우</span><span>, </span><span>또는 회원이 신상정보 및 전자우편 주소를 부실하게 기재하여 손해가 발생한 경우 책임을 지지 않습니다</span><span >.</span></p>
                            <p><span>⑥ 회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다</span><span>.</span></p>
                            <p><span>⑦ 회사는 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다</span><span>. </span><span>또한 회사는 회원이 서비스를 이용하며 타 회원으로 인해 입게 되는 정신적 피해에 대하여 보상할 책임을 지지 않습니다</span></p>
                            <p><span>⑧ 회사는 회원이 서비스에 게재한 각종 정보</span><span>, </span><span>자료</span><span>, </span><span>사실의 신뢰도</span><span>, </span><span>정확성 등 내용에 대하여 책임을 지지 않습니다</span><span>.</span></p>
                            <p><span>⑨ 회사는 회원 상호간 및 회원과 제</span><span> 3</span><span>자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며</span><span >, </span><span>이로 인한 손해를 배상할 책임도 없습니다</span><span>.</span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>&nbsp;</span></p>

                            <p><b><span>제 <span>31</span>조 【분쟁의 해결】</span></b><span></span></p>
                            <p><span>&nbsp;</span></p>
                            <p><span>① 회사와 회원은 서비스와 관련하여 분쟁이 발생한 경우에 이를 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다</span><span>.</span>&nbsp;</p>
                            <p><span>② 제<span>1</span>항의 규정에도 불구하고<span >, </span>동 분쟁으로 인하여 소송이 제기될 경우 동 소송은 제소 당시의 이용자의 주소에 의하고<span >, </span>주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다<span >. </span>다만<span >, </span>제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다<span >.</span></span></p>
                            <p><span>③ 회사와 이용자간에 제기된 전자상거래 소송에는 한국법을 적용합니다</span><span>.</span></p>
                        </div>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    )
}

export default App;