import {useEffect, useRef, useState} from "react";
import $ from 'jquery';
// import * as common from "./js/common";
import * as common from "./js/find";
import * as pcert from "./js/phoneCert";
import Footer from "./Footer";

function App() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    useEffect(() => {
        $(document).on("click",".inforCheck.type2 a",function(){
            // console.log(this);

            // $(this).closest("div").toggleClass("active");
            // if ($(this).closest("div").hasClass("active")) {
            //     $(this).closest("div").siblings(".reception").show();
            // }
            // else {
            //     $(this).closest("div").siblings(".reception").hide();
            // }
        })

        $(document).on("click","#agreeConfirm",function(){
            if($(this).data('isClicked')) return true;
            $(this).data('isClicked', true);

            var agrList = [];
            $($("input[name=termCheck]")).each(function(index){
                var data = new Object();

                data.termNo = this.value;
                data.termAplyNo = $(this).closest("div").find("#termAplyNo").val();
                data.agrYn = $(this).closest("div").find("#agrYn").val();

                agrList.push(data);
            });
            $("#agrInfo").val(JSON.stringify(agrList));

            //if (controller.agreeChk()) {
            if ($("#agreeConfirm").attr("class").indexOf("filled-g") > -1) {
                document.agreeForm.target = "_top";
                // if($("#skMmbrshpYn").val() == "Y") {
                //     document.agreeForm.action = "/api/s_SkAgreeInfoSave.do";
                // } else {
                //     document.agreeForm.action = "/join/s_AgreeInfoSave.do";
                // }
                document.agreeForm.action = "/joinForm";
                document.agreeForm.method = "post";
                document.agreeForm.submit();
            } else {
                alert("약관및 개인정보처리방침 상세내용 미확인시 가입처리가 되지 않습니다.\n상세내용을 확인해주세요.");
                $(this).removeData('isClicked');
            }
        });

        $(document).on("click","#agreeAll",function(){
            if ($("#agreeAll").prop("checked")) {
                $("input:checkbox[name='agreeChkBox']").prop("checked", true);
            } else {
                $("input:checkbox[name='agreeChkBox']").prop("checked", false);
            }
        });

        $(document).on("click", "#notAgree", function() {
            window.location.href = "https://sktmembership.tworld.co.kr/mps/pc-bff/sktmembership/main.do";
        });
    }, [])

    const doCheckAll = () => {
        if($("#allCheck").prop("checked")) {
            $("input:checkbox").prop("checked",true);
            $("input[name=agrYn]").val("Y");
        } else {
            $("input:checkbox").prop("checked",false);
            $("input[name=agrYn]").val("N");
        }

        doCheck();
    }
    // 동의 체크
    const doSelectCheckTerm = (obj) => {
        if($(obj).prop("checked")) {
            $(obj).closest("div").find("#agrYn").val("Y");
        } else {
            $(obj).closest("div").find("#agrYn").val("N");
        }

        doCheck();
    }
    // 선택동의 체크
    const doSelectCheck = (obj, id) => {
        if($(obj).prop("checked")) {
            $("#"+id).closest("div").find("input:checkbox").prop("checked",true);
            $(obj).closest("div").find("#agrYn").val("Y");
        } else {
            $("#"+id).closest("div").find("input:checkbox").prop("checked",false);
            $(obj).closest("div").find("#agrYn").val("N");
        }

        let newState = {...active};
        if (id == "mng") newState["0"] = true;
        else if (id == "fvr") newState["1"] = true;
        setActive(newState);

        $(obj).closest("div").addClass("active");
        $(obj).closest("div").parent().closest("div").find(".reception").show();
    }

    const [active, setActive] = useState({
        0: false,
        1: false,
    });
    const doToggleReception = (obj, state) => {
        let newState = {...active};
        newState[state] = !active[state];
        setActive(newState)

        // console.log($(obj).closest("div"));
        // $(obj).closest("div").toggleClass("active");
        // if ($(obj).closest("div").hasClass("active")) {
        //     $(obj).closest("div").removeClass("active");
        //     $(obj).closest("div").siblings(".reception").hide();
        // }
        // else {
        //     $(obj).closest("div").addClass("active");
        //     $(obj).closest("div").siblings(".reception").show();
        // }
    }
    const doCheck = () => {
        var checkflag = false;
        // <c:forEach var="row" items="${termList}" varStatus="i">
        //     <c:if test="${row.agrTpCd eq '01'}">
        //         if(!$("#termsCheck_<c:out value="${row.termAplyNo}" /><c:out value="${row.termNo}" />").is(":checked")) {
        //         checkflag = false;
        //     }
        //     </c:if>
        // </c:forEach>

        if ($("#termsCheck_21").is(":checked") && $("#termsCheck_23").is(":checked")) checkflag = true;

        if(checkflag) {
            $("#agreeConfirm").removeClass("disable");
            $("#agreeConfirm").addClass("filled-g");
        } else {
            $("#agreeConfirm").addClass("disable");
            $("#agreeConfirm").removeClass("filled-g");
        }
    }
    const doTermLayer = (obj, id) => {
        if($("#"+id).length == 0) {
            $("#content").append($(".full-layer").eq(0).clone().attr("id", id));
            $("#"+id).closest("div").find(".pop-name").html($(obj).closest("div").find("#termTit").val());
            $("#"+id).closest("div").find(".termTxt").html($(obj).closest("div").find("#termCont").val());
        }

        pcert.cmnFullLayerPopup(obj, id);
    }
    const doCheckAgrYn = (obj) => {
        var $el = $(obj);
        if($el.closest("div").find('input:checkbox:checked').length == 0) {
            $el.closest("div").parent().siblings("div").find("input:checkbox[name=termCheck]").prop("checked", false);
        } else {
            $el.closest("div").parent().siblings("div").find("input:checkbox[name=termCheck]").prop("checked", true);
        }
    }
    // const cmnFullLayerPopup = (element, targetId) => {
    //     var $open_btn = $(element);
    //     var $el = $("#" + targetId);
    //
    //     $("body").append($("<div id='dimmd-layer'></div>"));
    //     $el.attr("tabindex", "0").fadeIn().focus();
    //     $el.css("z-index", "101");
    //
    //     $el.find('.full-pop-close').click(function(){
    //         $("#dimmd-layer").remove();
    //         $el.fadeOut().removeAttr("tabindex");
    //         $el.css("z-index", "20");
    //         $open_btn.focus();
    //         return false;
    //     });
    // };

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a // href="javascript:void(0);"
                        // onClick="doHistoryBack();"
                        onClick={() => common.doHistoryBack()}
                        className="btnPrev">이전</a>
                    <h1>회원가입</h1>
                </div>
            </div>

            <div id="content">
                <section>
                    <div className="box2">
                        <div className="stepFixed">
                            <div className="stepBox">
                                <ol className="stepList">
                                    <li>
                                        <div className="step01 on"></div>
                                        <em>약관동의</em>
                                    </li>
                                    <li>
                                        <div className="step02"></div>
                                        <em>정보입력</em>
                                    </li>
                                    <li>
                                        <div className="step03"></div>
                                        <em>가입완료</em>
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <form name="agreeForm" id="agreeForm" method="post">
                            <input type="hidden" name="mbrSctCd" id="mbrSctCd" value=""/>
                            <input type="hidden" name="personYn" id="personYn"/>
                            <input type="hidden" name="certType" id="certType"/>
                            <input type="hidden" name="agrInfo" id="agrInfo"/>
                            <input type="hidden" name="kakaoSSO" id="kakaoSSO" value=""/>
                            <input type="hidden" name="naverSSO" id="naverSSO" value=""/>
                            <input type="hidden" name="svcMgmtNum" id="svcMgmtNum" value=""/>

                            <div className="mgt_50"
                                 style={{cursor: "pointer", height: "55px", fontSize: "17px", padding: "0 0 0 45px",
                                     display: "inline-block", lineHeight: "55px",}}>
                            </div>
                            <div className="agreeArea mgt_20">
                                <p className="allcheck">
                                    <span className="check">
                                        <input type="checkbox" id="allCheck"
                                            // onClick="doCheckAll();"
                                            onClick={() => doCheckAll()}
                                        />
                                        <label htmlFor="allCheck">전체동의</label>
                                    </span>
                                </p>
                                <div className="terms mgt_5">
                                    <ul className="termsList">
                                        <li>
                                            <div className="inforCheck">
                                                <div className="inner">
                                                    <span className="schk">
                                                        <input type="checkbox" name="termCheck" id="termsCheck_21" value="1"
                                                            // onChange="doSelectCheckTerm(this);"
                                                            onChange={(e) => doSelectCheckTerm(e.currentTarget)}
                                                        />
                                                        <label htmlFor="termsCheck_21">이용약관(필수)<span className="ess bgRed">필수</span></label>
                                                        <input type="hidden" name="agrYn" id="agrYn" value="N"/>
                                                        <input type="hidden" name="termAplyNo" id="termAplyNo" value="2"/>
                                                        <input type="hidden" name="termTit" id="termTit" value="이용약관"/>
                                                        <input type="hidden" name="termCont" id="termCont" value="<p>&amp;nbsp;</p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot;> 1 </span>장 총 칙</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><br></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 1 </span>조<span lang=&quot;EN-US&quot;> (</span>목적<span lang=&quot;EN-US&quot;>)</span></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;><br>이 약관은<span lang=&quot;EN-US&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:red&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>라쿠카라차</span><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>(</span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>이하 ‘</span><span 맑은=&quot;&quot; 고딕&quot;;color:red&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>회사<span lang=&quot;EN-US&quot;>'</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>라 합니다<span lang=&quot;EN-US&quot;>)</span>에서
운영하는 인터넷 관련 서비스<span lang=&quot;EN-US&quot;>&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;color:red&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>HCC, LACHA&amp;nbsp;</span><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>(</span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>이하<span lang=&quot;EN-US&quot;>
&quot;</span>종합쇼핑몰<span lang=&quot;EN-US&quot;>&quot; </span>이라 한다<span lang=&quot;EN-US&quot;>)</span>를
이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 2 </span>조<span lang=&quot;EN-US&quot;> (</span>용어의 정의<span lang=&quot;EN-US&quot;>)</span></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>본 약관에서 사용하는 용어의 정의는 다음과 같습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;- 종합쇼핑몰 :<span lang=&quot;EN-US&quot;>&amp;nbsp;</span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:red&quot;=&quot;&quot;>라쿠카라차</span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>가 재화 또는 용역을 회원에게 제공하기 위하여
컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며<span lang=&quot;EN-US&quot;>, </span>아울러
종합쇼핑몰을 운영하는 사업자의 의미로도 사용합니다<span lang=&quot;EN-US&quot;>.</span></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 서비스</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>회사가 제공하는 인터넷상의 모든 서비스를 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 고객사</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>서비스 이용계약을 맺은 법인이나 단체를 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 임직원회원</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>고객사로부터 서비스 이용 허가를 요청 받은 근로자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>(</span><span style=&quot;font-size: 9pt;&quot;>임직원</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>)</span><span style=&quot;font-size: 9pt;&quot;>를 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 일반가입회원</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>본인 스스로 회원가입 기능을 통하여 가입한 회원을 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.&amp;nbsp;&amp;nbsp;</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>&amp;nbsp;- 비회원<span lang=&quot;EN-US&quot;> : </span>회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 분을 말합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>&amp;nbsp;- 회원 <span lang=&quot;EN-US&quot;>: </span>상기 임직원회원<span lang=&quot;EN-US&quot;>, </span>일반가입회원<span lang=&quot;EN-US&quot;>,</span>비회원을 통칭하는 것을 말합니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 고객사 코드</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>고객사의 식별과 고객사의 서비스 이용을 위하여 회사는 승인하여
등록된 문자나 숫자 혹은 그 조합을 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 아이디</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>회원의 식별과 회원의 서비스이용을 위하여 회사는 승인하여 등록된 문자나
숫자 혹은 그 조합을 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>(</span><span style=&quot;font-size: 9pt;&quot;>이하</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;ID&quot;</span><span style=&quot;font-size: 9pt;&quot;>라
합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>).</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 비밀번호</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>회원이 부여 받은</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> ID</span><span style=&quot;font-size: 9pt;&quot;>와
일치된 회원임을 확인하고</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>회원의 권익 및 비밀보호를 위하여 회원 스스로가 선정하여 종합쇼핑몰에 등록한
문자와 숫자의 조합을 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 운영자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>서비스의 전반적인 관리와 원활한 운영을 위하여 종합쇼핑몰에서 선정한
자를 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 제휴 사이트</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>회사는 업무제휴를 통해 공동마케팅</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>공동사업 등을 추진하기 위하여 하이퍼링크 방식</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>(</span><span style=&quot;font-size: 9pt;&quot;>하이퍼링크의 대상에는
문자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>정지 및 동화상 등이 포함됨</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>) </span><span style=&quot;font-size: 9pt;&quot;>등으로 연결한 업무제휴
사업체의 웹 사이트를 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;- 서비스제공 제한·중지</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> : </span><span style=&quot;font-size: 9pt;&quot;>공공의 이익 또는 회사의 규정에 위배되는 경우에 회원에게
제공하는 서비스의 전부 또는 일부를 제한하거나 중지하는 것을 말합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>&amp;nbsp;- 해지<span lang=&quot;EN-US&quot;> : </span>회사 또는 고객사 및 회원이 서비스 이용계약을 종료 시키는 것을 말합니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;line-height: 1.8;&quot;>&amp;nbsp;</p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 3 </span>조<span lang=&quot;EN-US&quot;> (</span>이용약관의 효력 및 변경<span lang=&quot;EN-US&quot;>)</span></span></b><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>① 이 약관은 종합쇼핑몰 웹사이트에서 온라인으로 공시함으로써 효력이 발생합니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>② 회사는 약관의 규제에 관한 법률</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>전자거래기본법</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>전자서명법</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>정보통신망이용촉진 등에 관한 법률</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>방문판매 등에 관한 법률</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>소비자보호법 등 관련법을 위배하지 않는
범위에서 이 약관을 개정할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>③ 회사는 약관을 개정할 경우 적용일자 및 개정사유를 명시하여 현행약관과
함께 몰의 초기화면에 그 적용일자<span lang=&quot;EN-US&quot;> 7</span>일 이전부터 적용일자 전일까지 공지합니다<span lang=&quot;EN-US&quot;>. </span>단<span lang=&quot;EN-US&quot;>, </span>약관의 변경이 소비자에게 불리한 경우에는 개정 약관 적용일
전 최소<span lang=&quot;EN-US&quot;> 30</span>일부터 공지합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>④ 회사는 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에
대해서는 개정 전의 약관조항이 그대로 적용됩니다<span lang=&quot;EN-US&quot;>. </span>다만 이미 계약을 체결한 회원이 개정약관 조항의 적용을
받기를 원하는 뜻을 제<span lang=&quot;EN-US&quot;>3</span>항에 의한 개정약관의 공지 기간 내에 회사의 동의를 받은 경우에는 개정약관 조항이
적용됩니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑤ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 정부가 제정한 전자거래소비자보호지침 및 관계법령 또는 상관례에
따릅니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 4 </span>조<span lang=&quot;EN-US&quot;> (</span>약관 외 준칙<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>① 이 약관은 회사가 제공하는 제휴서비스 및 개별서비스에 대해서는 별도의 이용약관 및 정책을 둘 수 있으며<span lang=&quot;EN-US&quot;>, </span>해당 내용이 이 약관과 상충한 경우 “제휴서비스 등”이 우선하여 적용됩니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>② 이 약관에 명시되지 아니한 사항이나 해석에 대해서는 “제휴서비스 약관 등” 및 관계법령 및 또는 상관례에 따릅니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;line-height: 1.8;&quot;>&amp;nbsp;<span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p style=&quot;line-height: 1.8;&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot;> 2 </span>장 이용계약 체결</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:
13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 5 </span>조<span lang=&quot;EN-US&quot;> (</span>이용 계약의 성립<span lang=&quot;EN-US&quot;>)</span></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>①<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>이용계약은 회사와 고객사간에 계약 체결에 따라 고객사의 근로자에게 회원가입자격이 주어지며
회원가입자격이 있는 이용고객의 본 이용약관 내용에 대한 동의와 이용신청에 대하여 회사의 이용승낙으로 성립합니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>②<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>회사는<span lang=&quot;EN-US&quot;>
&quot;</span>가입신청자<span lang=&quot;EN-US&quot;>&quot;</span>의 신청에 대하여<span lang=&quot;EN-US&quot;>
&quot;</span>서비스<span lang=&quot;EN-US&quot;>&quot; </span>이용을 승낙함을 원칙으로 합니다<span lang=&quot;EN-US&quot;>. </span>다만<span lang=&quot;EN-US&quot;>, </span>회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지
않거나 사후에 이용계약을 해지할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>가입신청자가 이 약관에 의하여 이전에 회원자격을
상실한 적이 있는 경우<span lang=&quot;EN-US&quot;>, </span>단 회사의 회원 재가입 승낙을 얻은 경우에는 예외로 함<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>실명이 아니거나 타인의 명의를 이용한 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>허위의 정보를 기재하거나<span lang=&quot;EN-US&quot;>, </span>회사가 제시하는 내용을 기재하지 않은 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>14</span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>세 미만 아동이 법정대리인<span lang=&quot;EN-US&quot;>(</span>부모 등<span lang=&quot;EN-US&quot;>)</span>의 동의를 얻지 아니한 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>이용자의 귀책사유로 인하여 승인이 불가능하거나
기타 규정한 제반 사항을 위반하며 신청하는 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>③ 제</span><span lang=&quot;EN-US&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>1</span><span style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>항에 따른 신청에 있어 회사는 회원의 종류에 따라 전문기관을 통한 실명확인
및 본인인증을 요청할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 6 </span>조<span lang=&quot;EN-US&quot;> (</span>회원<span lang=&quot;EN-US&quot;>ID </span>부여 및 변경 등<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;><br></span></span></b></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>①<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>회사는 회원을 구별하기 위해 회원<span lang=&quot;EN-US&quot;> ID</span>로 사용하며 임직원 회원의 경우 고객사와의 협의에 의해 사번<span lang=&quot;EN-US&quot;>, </span>회사
그룹웨어 아이디 등 다른 식별자를 사용할 수 있습니다<span lang=&quot;EN-US&quot;>. </span>일반 가입회원의 경우 회원이 스스로 지정할수
있습니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>②</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-spacerun:yes&quot;>&amp;nbsp;</span></span><span style=&quot;font-size:9.0pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다<span lang=&quot;EN-US&quot;>. </span>다만<span lang=&quot;EN-US&quot;>, </span>서비스 관리를 위해 필요한 실명<span lang=&quot;EN-US&quot;>, </span>주민등록번호<span lang=&quot;EN-US&quot;>, </span>아이디 등은 수정이 불가능합니다<span lang=&quot;EN-US&quot;>. </span>부득이한 사유로 인하여 변경 하고자 하는 경우에는 해당<span lang=&quot;EN-US&quot;> ID</span>를 해지하고
재가입해야 합니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>③&amp;nbsp;</span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>회원 정보 중 다음 각 호에 해당하는 경우에는 회원 또는 회사의 요청으로 변경할 수
있습니다<span lang=&quot;EN-US&quot;>.<br></span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp; -<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>고객사측에서 회원의 회원정보를 잘못 전달 했을
때</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp; -<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>주민등록번호 정정으로 주민등록이 변경된 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp; -<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>기타 합리적인 사유가 있는 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>④ 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 회사에 대하여
그 변경사항을 알려야 합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>⑤ 제<span lang=&quot;EN-US&quot;>4</span>항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여 회사는 책임지지
않습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span>&amp;nbsp;</p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제 <span lang=&quot;EN-US&quot;>7 </span>조<span lang=&quot;EN-US&quot;> (</span>회원탈퇴<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>①<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회원탈퇴는 임직원 회원의 경우 회원님이 소속하신
기업<span lang=&quot;EN-US&quot;>/</span>기관과 종합쇼핑몰 이용에 대한 계약 종료 시 또는 소속하신 기업<span lang=&quot;EN-US&quot;>/</span>기관에서
퇴직 시 탈퇴처리 되며<span lang=&quot;EN-US&quot;>, </span>일반가입회원의 경우 홈페이지 회원탈퇴 메뉴에서 언제든지 개인정보의 수집<span lang=&quot;EN-US&quot;>·</span>이용<span lang=&quot;EN-US&quot;>·</span>제공에 대한 동의를 바로 철회할 수 있습니다<span lang=&quot;EN-US&quot;>. </span>또한<span lang=&quot;EN-US&quot;>, </span>개인정보 관리 책임자 또는 담당자에게 연락하시면 즉시 회원탈퇴를
위해 필요한 조치를 취합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p class=&quot;MsoListParagraph&quot; align=&quot;left&quot; style=&quot;margin-left: 22.95pt; text-align: left; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;line-height:107%;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;color:black;mso-font-kerning:0pt&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>②<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;line-height:107%;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:=&quot;&quot; 굴림;color:black;mso-font-kerning:0pt&quot;=&quot;&quot;>일반가입회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를
처리합니다<span lang=&quot;EN-US&quot;>. </span>다만<span lang=&quot;EN-US&quot;>, </span>해지의사를 통지하기 전에 모든 상품의
판매 및 구매 절차를 완료<span lang=&quot;EN-US&quot;>, </span>철회 또는 취소해야만 합니다<span lang=&quot;EN-US&quot;>. </span>이
경우 판매 및 구매의 철회 또는 취소로 인한 불이익은 회원 본인이 부담하여야 합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p class=&quot;MsoListParagraph&quot; align=&quot;left&quot; style=&quot;margin-left: 22.95pt; text-align: left; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;line-height:107%;
mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black;mso-font-kerning:0pt&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>③<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;line-height:107%;
mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:black;mso-font-kerning:0pt&quot;=&quot;&quot;>회원이 계약을 해지할 경우<span lang=&quot;EN-US&quot;>, </span>관련법 및 개인정보처리방침에 따라 종합쇼핑몰이 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원탈퇴 처리를
하며<span lang=&quot;EN-US&quot;>, </span>관련 개인정보를 파기시점에 준하여 파기합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;line-height:107%;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:=&quot;&quot; 굴림;color:black;mso-font-kerning:0pt&quot;=&quot;&quot;>.<o:p></o:p></span></p>

<p style=&quot;margin:0cm;margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:
13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin:0cm;margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제 <span lang=&quot;EN-US&quot;>8 </span>조<span lang=&quot;EN-US&quot;> (</span>개인정보보호 의무<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>회사는</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>정보통신망법</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot; </span><span style=&quot;font-size: 9pt;&quot;>등
관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>개인정보의 보호 및 사용에
대해서는 관련법 및 회사의 개인정보취급방침이 적용됩니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>다만</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>회사의
공식 사이트 이외의 링크된 사이트에서는 회사의 개인정보취급방침이 적용되지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제 <span lang=&quot;EN-US&quot;>9 </span>조<span lang=&quot;EN-US&quot;> (</span>회원의<span lang=&quot;EN-US&quot;> &quot;</span>아이디<span lang=&quot;EN-US&quot;>&quot; </span>및<span lang=&quot;EN-US&quot;>
&quot;</span>비밀번호<span lang=&quot;EN-US&quot;>&quot;</span>의 관리에 대한 의무<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>① 회원의</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>아이디</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>와</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>비밀번호</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>에 관한 관리책임은 회원에게 있으며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이를 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>3</span><span style=&quot;font-size: 9pt;&quot;>자가 이용하도록 하여서는 안됩니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>② 회사는 회원의</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>아이디</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>가
개인정보 유출 우려가 있거나</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>반사회적 또는 미풍양속에 어긋나거나 회사 및 회사의 운영자로 오인한 우려가
있는 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>해당</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>아이디</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>의 이용을 제한할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 회원은</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>아이디</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot; </span><span style=&quot;font-size: 9pt;&quot;>및</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>비밀번호</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>가 도용되거나 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>3</span><span style=&quot;font-size: 9pt;&quot;>자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>④ 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>3</span><span style=&quot;font-size: 9pt;&quot;>항의 경우에 해당 회원이 회사에 그 사실을 통지하지 않거나</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot;> 3 </span>장 서비스 이용</span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제 <span lang=&quot;EN-US&quot;>10 </span>조<span lang=&quot;EN-US&quot;> (“</span>서비스<span lang=&quot;EN-US&quot;>”</span>의 제공 등<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;><br></span></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>①<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>회사는 회원에게 아래와 같은 서비스를 제공합니다</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span>&amp;nbsp;</p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>포인트 배정 및 사용 관리</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>상품 및 서비스 판매</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>각종 정보의 제공</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>기타 회사가 추가 개발하거나 다른 회사와의
제휴계약 등을 통해 회원에게 제공하는 일체의 서비스</span><span style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>&amp;nbsp; &amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><span style=&quot;font-size: 9pt;&quot;>② 회사는</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>서비스</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>를
일정범위로 분할하여 각 범위 별로 이용가능시간을 별도로 지정할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>다만</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이러한 경우에는 그 내용을 사전에 공지합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 11 </span>조<span lang=&quot;EN-US&quot;> (&quot;</span>서비스<span lang=&quot;EN-US&quot;>&quot;</span>의 변경<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>① 회사는 상당한 이유가 있는 경우에 운영상</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>기술상의 필요에 따라 제공하고 있는
전부 또는 일부</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;</span><span style=&quot;font-size: 9pt;&quot;>서비스</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>를 변경할 수
있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>②&amp;nbsp;</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>서비스</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>의 내용</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이용방법</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이용시간에 대하여 변경이 있는 경우에는 변경사유</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>변경될 서비스의 내용 및 제공일자 등은 그 변경 전에 해당 서비스 초기화면에 게시하여야 합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>,
</span><span style=&quot;font-size: 9pt;&quot;>중단</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>변경할 수 있으며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이에 대하여 관련법에
특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 12 </span>조<span lang=&quot;EN-US&quot;> (</span>서비스 이용 시간<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>①&amp;nbsp;</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>서비스</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&quot;</span><span style=&quot;font-size: 9pt;&quot;>는 연중무휴</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, 1</span><span style=&quot;font-size: 9pt;&quot;>일</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> 24</span><span style=&quot;font-size: 9pt;&quot;>시간 제공함을 원칙으로 합니다</span>&amp;nbsp;&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 회사는 컴퓨터 등 정보통신설비의 보수점검<span lang=&quot;EN-US&quot;>, </span>교체 및 고장<span lang=&quot;EN-US&quot;>, </span>통신두절 또는 운영상 상당한 이유가 있는 경우<span lang=&quot;EN-US&quot;> &quot;</span>서비스<span lang=&quot;EN-US&quot;>&quot;</span>의 제공을 일시적으로 중단할 수 있습니다<span lang=&quot;EN-US&quot;>. </span>이 경우 회사는
전자우편이나<span lang=&quot;EN-US&quot;>, </span>종합쇼핑몰에 게재 등으로 회원에게 통지합니다<span lang=&quot;EN-US&quot;>. </span>다만<span lang=&quot;EN-US&quot;>, </span>회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>정기점검시간은
서비스제공화면에 공지한 바에 따릅니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 13 </span>조 【서비스 이용의 한계와 책임】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>회원은 회사가 서면으로 허용한 경우를 제외하고는 서비스를 이용하여 상품을 판매하는 영업활동을 할 수 없습니다<span lang=&quot;EN-US&quot;>. </span>특히<span lang=&quot;EN-US&quot;>, </span>회원은 해킹·돈벌이 광고·음란 사이트 등을 통한 상업행위<span lang=&quot;EN-US&quot;>, </span>상용<span lang=&quot;EN-US&quot;>S/W </span>불법배포 등을 할 수 없습니다<span lang=&quot;EN-US&quot;>. </span>이를 위반하여 발생된 영업활동의 결과 및 손실<span lang=&quot;EN-US&quot;>, </span>관계기관에 의한
구속 등 법적 조치 등에 관해서는 회사는 책임을 지지 않습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 14 </span>조 【서비스 제공의 제한 등】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>①&amp;nbsp;</span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>회사는 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수
있습니다<span lang=&quot;EN-US&quot;>.</span></span><span style=&quot;text-indent: -18pt; font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>서비스용 설비의 보수 등 공사로 인한 부득이한
경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>전기통신사업법에 규정된 기간통신사업자가 전기통신서비스를
중지했을 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>국가비상사태<span lang=&quot;EN-US&quot;>,
</span>정전<span lang=&quot;EN-US&quot;>, </span>서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이
있는 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>기타 불가항력적 사유가 있는 경우</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 회사는 서비스의 이용을 제한하거나 중지한 때에는 그 사유 및 제한기간 등을 종합쇼핑몰 웹사이트를 통해 지체 없이 회원에게
알리도록 합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 15 </span>조 【정보의 제공 등】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l5 level1 lfo1&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>①<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회사는 회원이 서비스를 이용할 때 필요하다고 인정되는 다양한 정보의 추가 또는 변경내용을
공지사항이나<span lang=&quot;EN-US&quot;> e-mail, SMS,</span>알림톡<span lang=&quot;EN-US&quot;>,APP PUSH </span>등의
방법으로 회원에게 제공할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 추가적인 개인정보를 요구할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 16 </span>조<span lang=&quot;EN-US&quot;> (</span>게시물의 관리<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>회사는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>다른 회원 또는 제<span lang=&quot;EN-US&quot;> 3</span>자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>공공질서 및 미풍양속에 위반되는 내용을 유포하거나
링크시키는 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>불법복제 또는 해킹을 조장하는 내용인 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>영리를 목적으로 하는 광고일 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>범죄와 결부된다고 객관적으로 인정되는 내용일
경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>다른 회원 또는 제<span lang=&quot;EN-US&quot;> 3</span>자의 저작권 등 기타 권리를 침해하는 내용인 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회사에서 규정한 게시물 원칙에 어긋나거나<span lang=&quot;EN-US&quot;>, </span>게시판 성격에 부합하지 않는 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:
13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>기타 관계법령에 위배된다고 판단되는 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 17 </span>조<span lang=&quot;EN-US&quot;> (</span>게시물에 대한 저작권<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;>&amp;nbsp;&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4px; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>① 회원이 서비스 화면 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>또한
회사는 게시자의 동의 없이 게시물을 상업적으로 이용할 수 없습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>다만 비영리 목적인 경우는 그러하지
아니하며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>또한 서비스내의 게재권을 갖습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4px; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 회원은 서비스를 이용하여 취득한 정보를 임의 가공<span lang=&quot;EN-US&quot;>, </span>판매하는 행위 등 서비스에
게재된 자료를 상업적으로 사용할 수 없습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4px; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 회사는 회원이 게시하거나 등록하는 서비스 내의 내용물</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>게시 내용에 대해
제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> 15</span><span style=&quot;font-size: 9pt;&quot;>조 각 호에 해당된다고 판단되는 경우 사전통지 없이 삭제하거나 이동 또는 등록 거부할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin-left: 0px;&quot;>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 0px;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 0px;&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot;> 4 </span>장 계약 당사자의 의무</span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 18 </span>조<span lang=&quot;EN-US&quot;> (</span>회사의 의무<span lang=&quot;EN-US&quot;>)</span></span></b><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>① 회사는 이용고객이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야 합니다</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>② 회사는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 멸실 된 때에는 부득이한 사유가 없는 한 지체
없이 이를 수리 또는 복구합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 회사는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 취급방침을 공시하고 준수합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>④ 회사는 이용고객으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야
합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>다만</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>즉시 처리가 곤란한 경우는 회원에게 그 사유와
처리일정을 통보하여야 합니다</span></p><p style=&quot;line-height: 1.5;&quot;>&amp;nbsp;</p><p style=&quot;line-height: 1.5;&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><br></span></b></p><p style=&quot;line-height: 1.5;&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 19 </span>조<span lang=&quot;EN-US&quot;> (</span>회원의 의무<span lang=&quot;EN-US&quot;>)</span></span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>① 회원은 회원가입 신청 또는 회원정보 변경 시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수 없습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 회원은 본 약관에서 규정하는 사항과 기타 회사는 정한 제반 규정<span lang=&quot;EN-US&quot;>, </span>공지사항
등 회사는 공지하는 사항 및 관계법령을 준수하여야 하며<span lang=&quot;EN-US&quot;>, </span>기타 회사의 업무에 방해가 되는 행위<span lang=&quot;EN-US&quot;>, </span>회사의 명예를 손상시키는 행위를 해서는 안됩니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>③ 회원은 주소<span lang=&quot;EN-US&quot;>, </span>연락처<span lang=&quot;EN-US&quot;>, </span>전자우편
주소 등 이용계약사항이 변경된 경우에 해당 절차를 거쳐 이를 종합쇼핑몰에 즉시 알려야 합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>④ 회사는 관계법령 및</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> '</span><span style=&quot;font-size: 9pt;&quot;>개인정보 취급방침</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>'</span><span style=&quot;font-size: 9pt;&quot;>에
의거하여 그 책임을 지는 경우를 제외하고 회원에게 부여된</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> ID</span><span style=&quot;font-size: 9pt;&quot;>의 비밀번호 관리소홀</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>부정사용에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>⑤ 회원은 회사의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며<span lang=&quot;EN-US&quot;>, </span>그
영업활동의 결과에 대해 회사는 책임을 지지 않습니다<span lang=&quot;EN-US&quot;>. </span>또한 회원은 이와 같은 영업활동으로 회사는 손해를
입은 경우<span lang=&quot;EN-US&quot;>, </span>회원은 회사에 대해 손해배상의무를 지며<span lang=&quot;EN-US&quot;>, </span>회사는
해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상 등을 청구할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>⑥ 회원은 회사의 명시적 동의가 없는 한 서비스의 이용권한<span lang=&quot;EN-US&quot;>, </span>기타 이용계약상의
지위를 타인에게 양도<span lang=&quot;EN-US&quot;>, </span>증여할 수 없으며 이를 담보로 제공할 수 없습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑦ 회원은 회사 및 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> 3</span><span style=&quot;font-size: 9pt;&quot;>자의 지적 재산권을 침해해서는 안됩니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt;&quot;>⑧ 회원은 다음 각 호에 해당하는 행위를 하여서는 안되며<span lang=&quot;EN-US&quot;>, </span>해당 행위를 하는
경우에 회사는 회원의 서비스 이용제한 및 적법 조치를 포함한 제재를 가할 수 있습니다<span lang=&quot;EN-US&quot;>. </span>단<span lang=&quot;EN-US&quot;>, </span>서비스 이용제한 및 제재조치를 할 경우<span lang=&quot;EN-US&quot;>, </span>소명기간<span lang=&quot;EN-US&quot;>(30</span>일<span lang=&quot;EN-US&quot;>)</span>을 정하여 회원으로부터 소명의 기회를 부여합니다<span lang=&quot;EN-US&quot;>.</span></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span>&amp;nbsp;</p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회원가입 신청 또는 회원정보 변경 시 허위내용을
등록하는 행위</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>다른 회원의<span lang=&quot;EN-US&quot;>
ID, </span>비밀번호<span lang=&quot;EN-US&quot;>, </span>주민등록번호를 도용하는 행위</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회원<span lang=&quot;EN-US&quot;> ID</span>를
타인과 거래하는 행위</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>종합쇼핑몰의 운영진<span lang=&quot;EN-US&quot;>, </span>직원 또는 관계자를 사칭하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>종합쇼핑몰로부터 특별한 권리를 부여 받지 않고
종합쇼핑몰의 클라이언트 프로그램을 변경하거나<span lang=&quot;EN-US&quot;>, </span>종합쇼핑몰의 서버를 해킹하거나<span lang=&quot;EN-US&quot;>, </span>웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>서비스에 위해를 가하거나 고의로 방해하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>본 서비스를 통해 얻은 정보를 회사의 사전
승낙 없이 서비스 이용 외의 목적으로 복제하거나<span lang=&quot;EN-US&quot;>, </span>이를 출판 및 방송 등에 사용하거나<span lang=&quot;EN-US&quot;>, </span>제<span lang=&quot;EN-US&quot;> 3</span>자에게 제공하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>공공질서 및 미풍양속에 위반되는 저속<span lang=&quot;EN-US&quot;>, </span>음란한 내용의 정보<span lang=&quot;EN-US&quot;>, </span>문장<span lang=&quot;EN-US&quot;>, </span>도형<span lang=&quot;EN-US&quot;>, </span>음향<span lang=&quot;EN-US&quot;>, </span>동영상을 전송<span lang=&quot;EN-US&quot;>, </span>게시<span lang=&quot;EN-US&quot;>, </span>전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>모욕적이거나 개인신상에 대한 내용이어서 타인의
명예나 프라이버시를 침해할 수 있는 내용을 전송<span lang=&quot;EN-US&quot;>, </span>게시<span lang=&quot;EN-US&quot;>, </span>전자우편
또는 기타의 방법으로 타인에게 유포하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>다른 회원을 희롱 또는 위협하거나<span lang=&quot;EN-US&quot;>, </span>특정 회원에게 지속적으로 고통 또는 불편을 주는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>회사의 승인을 받지 않고 다른 사용자의 개인정보를
수집 또는 저장하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>범죄와 결부된다고 객관적으로 판단되는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>본 약관을 포함하여 기타 회사는 정한 제반
규정 또는 이용 조건을 위반하는 행위</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>기타 관계법령에 위배되는 행위</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot;> 5 </span>장 구매계약 및 대금결제</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:
13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제 <span lang=&quot;EN-US&quot;>20 </span>조 【구매신청】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.5;&quot;><span style=&quot;font-size: 9pt;&quot;>회원은 다음 각 호의 절차에 따라 종합쇼핑몰 홈페이지를 통하여 상품 또는 서비스를 구매할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>성명<span lang=&quot;EN-US&quot;>, </span>주소<span lang=&quot;EN-US&quot;>, </span>전화번호 입력</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>재화 또는 용역의 선택</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>결제방법의 선택</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>기타 회사가 별도로 정하는 절차</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 21</span>조 【계약의 성립】</span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>①<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>회사는 제<span lang=&quot;EN-US&quot;>19</span>조와 같은 구매신청에 대하여
다음 각 호에 해당하지 않는 한 승낙합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>신청 내용에 허위<span lang=&quot;EN-US&quot;>, </span>기재누락<span lang=&quot;EN-US&quot;>, </span>오기가 있는 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>미성년자가 담배<span lang=&quot;EN-US&quot;>, </span>주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>기타 구매신청에 승낙하는 것이 종합쇼핑몰의
기술상 현저히 지장이 있다고 판단하는 경우</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:22.95pt;
margin-bottom:.0001pt;text-indent:-18.0pt;mso-list:l0 level1 lfo6&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span style=&quot;font-size: 9pt;&quot;>② 회사는 회원으로부터 상품 또는 서비스에 대한 구매신청을 받은 경우 당해 회원에게 구매가 성공적으로 완료되었다는 메시지</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> ( </span><span style=&quot;font-size: 9pt;&quot;>이하</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot; </span><span style=&quot;font-size: 9pt;&quot;>구매완료 메시지</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> &quot;) </span><span style=&quot;font-size: 9pt;&quot;>를 보여주며 이러한 구매완료 메시지를 회원에게 보여줌으로써 당해 상품 또는 서비스에 대한 구매계약이
성립합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;</p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 22 </span>조 【지급방법】</span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.5;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>① 회원은 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 하나 또는 그 이상을 결합하여 할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><!--[endif]--><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>신용카드결제</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>계좌이체</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>포인트</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>회사지원금</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>&amp;nbsp; &amp;nbsp;-<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;&quot;=&quot;&quot;>적립금</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>회사와
계약을 맺었거나 회사가 인정한 상품권에 의한 결제</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>기타 적립금 등 회사가 지원하는 결제방법</span></p><p style=&quot;line-height: 1.5;&quot;>&amp;nbsp;<span style=&quot;font-size: 9pt;&quot;>② 단</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>회사는 공급되는 재화의 성격에 따라 대금지급방법을 한정 할 수 있으며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이러한 경우에는 회원이 구매신청 이전에 확인할 수 있도록 사전고지 합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 23 </span>조 【수신확인통지·구매신청 변경 및 취소】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;><br></span></b></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>① 회사는 회원의 구매신청이 있는 경우 회원에게 수신확인통지를 합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>② 수신확인통지를 받은 회원은 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를
요청할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 회사는 배송 전 회원의 구매신청 변경 및 취소 요청이 있는 때에는 지체 없이 그 요청에 따라 처리합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot;>6</span>장 배송 및 환불</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 24 </span>조 【배송】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 회원이 구매한 재화에 대해 배송수단</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>수단별 배송비용 부담자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>수단별 배송기간 등을 명시합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 25 </span>조 【청약의 철회】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>① 종합쇼핑몰로부터 상품을 인도 받거나 용역을 제공 받은 회원은 다음 각 호의 경우에는 상품을 인도 받거나 용역을 제공
받은 날부터<span lang=&quot;EN-US&quot;> 20 </span>일 이내<span lang=&quot;EN-US&quot;>(</span>종합쇼핑몰의 주소가 변경되는 등의
사유로 이 기간 내에 청약의 철회를 할 수 없는 경우에는 그 주소를 안 날 또는 알 수 있었던 날부터<span lang=&quot;EN-US&quot;> 20 </span>일
이내<span lang=&quot;EN-US&quot;>)</span>에 당해 계약에 관한 청약을 철회할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;&amp;nbsp;</span><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;font-size: 9pt; text-indent: -18pt;&quot;>서비스 회원에게 인도될 당시 당해 상품이 훼손된
경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>통신판매에 관한 광고의 내용과 다른 상품이
인도되거나 용역이 제공된 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>상품의 인도 또는 용역의 제공이 통신판매에
관한 광고에 표시된 상품의 인도시기 또는 용역의 제공시기보다 늦어진 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>방문판매 등에 관한 법률 제<span lang=&quot;EN-US&quot;>18</span>조에 의하여 광고에 표시하여야 할 사항을 표시하지 아니한 상태에서 회원의 청약이 이루어진 경우</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>&amp;nbsp; &amp;nbsp;-<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>기타 소비자보호를 위하여 대통령령이 정하는
경우</span>&amp;nbsp;&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 제<span lang=&quot;EN-US&quot;>1</span>항 제<span lang=&quot;EN-US&quot;>1</span>호의 규정에 불구하고
회원의 책임 있는 사유로 상품이 훼손된 경우에는 회원은 청약의 철회를 할 수 없습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> 1</span><span style=&quot;font-size: 9pt;&quot;>항의 규정에 의한 청약의 철회는 이</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>-</span><span style=&quot;font-size: 9pt;&quot;>메일을
통한 서면통보를 한 날에 그 효력이 발생합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>④ 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> 1</span><span style=&quot;font-size: 9pt;&quot;>항의 적용과 관련하여 상품의 훼손에 대하여 회원의 책임이 있는지의 여부</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>인도된 상품 또는 제공된 용역이 광고의 내용과 동일한 상품 또는 용역인지의 여부</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>상품의 인도사실 및 그 시기 또는 용역의 제공사실 및 그 시기</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>광고에
표시하여야 할 사항을 표시하였는지의 여부에 관하여 다툼이 있는 경우에는 회사는 이를 입증합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 26 </span>조 【청약 철회 등의 효과】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>① 회원은 제<span lang=&quot;EN-US&quot;>24</span>조제<span lang=&quot;EN-US&quot;>1</span>항의 규정에 의하여
청약을 철회한 경우에는 이미 인도 받은 상품 또는 제공 받은 용역을 반환하여야 하며<span lang=&quot;EN-US&quot;>, </span>회사는 이미 지급
받은 상품의 대금 또는 용역의 대가를 상품 또는 용역을 반환 받은 날의<span lang=&quot;EN-US&quot;> 3</span>영업일 이내에 환불<span lang=&quot;EN-US&quot;>(</span>환불하기 위한 송금을 포함한다<span lang=&quot;EN-US&quot;>)</span>합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 제<span lang=&quot;EN-US&quot;>1</span>항의 경우 소비자가 여신전문금융업법 제<span lang=&quot;EN-US&quot;>2</span>조제<span lang=&quot;EN-US&quot;>3</span>호의 규정에 의한 신용카드로 상품의 대금 또는 용역의 대가를 지급한 때에는 회사는 즉시 당해 신용카드업자에게
상품대금 또는 용역대가의 청구를 정지 또는 취소할 것을 요청합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>③ 제<span lang=&quot;EN-US&quot;>2</span>항의 경우 회사는 신용카드업자로부터 당해 상품대금 또는 용역대가를 이미
지급 받은 때에는 즉시 이를 신용카드업자에게 반환하여야 합니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>④ 제<span lang=&quot;EN-US&quot;>1</span>항의 경우 회사는 이미 용역<span lang=&quot;EN-US&quot;>(</span>일정한
시설을 이용하거나 용역의 제공을 받을 수 있는 권리를 제외한다<span lang=&quot;EN-US&quot;>)</span>이 제공된 경우에는 이미 제공된 용역과
동일한 내용의 용역의 반환이나 그 용역의 대가 또는 그 용역에 의하여 얻어진 이익에 상당하는 금액의 지급을 청구할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>⑤ 제<span lang=&quot;EN-US&quot;>1</span>항의 경우 인도 받은 상품 또는 제공 받은 용역의 반환에 필요한 비용은
회사가 이를 부담하며 회사는 회원에게 위약금 또는 손해배상을 청구하지 않습니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑥ 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>1</span><span style=&quot;font-size: 9pt;&quot;>항의 경우 회원은 용역의 제공과 관련하여 자기의 토지 또는 건물 기타 공작물의
형태가 변경된 때에는 당해 회사에게 무상으로 원상회복을 하여줄 것을 청구할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 27 </span>조 【적립금 정책】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>①<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회사는<span lang=&quot;EN-US&quot;><span style=&quot;mso-spacerun:yes&quot;>&amp;nbsp; </span></span>회원 보상목적으로 적립금을 운영합니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>②<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>적립금은 상품<span lang=&quot;EN-US&quot;>/</span>서비스 구매<span lang=&quot;EN-US&quot;>, </span>이벤트 참여 등 회사가 규정하는 기준에 따라 지급되며<span lang=&quot;EN-US&quot;>, </span>회사는 회원의 동의 절차 없이 적립금의 지급 기준을 변경할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>③<span times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span><span 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot; style=&quot;text-indent: -18pt; font-size: 9pt;&quot;>적립금은 회원<span lang=&quot;EN-US&quot;> ID</span>별로 적립됩니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>④<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>적립금은 종합쇼핑몰에서 상품 및 서비스 구매
시 현금처럼 사용 가능하지만<span lang=&quot;EN-US&quot;>, </span>상품 및 서비스별로 적립금 사용에 제한이 있을 수 있으며 회원에게 현금으로
지급되지는 않습니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>⑤<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>해지 및 회원 탈퇴 시 잔액 여부와 상관없이
회원의 적립금은 소멸되며 타인에게 양도할 수 없습니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.8;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>⑥<span style=&quot;font:7.0pt &quot; times=&quot;&quot; new=&quot;&quot; roman&quot;&quot;=&quot;&quot;>&amp;nbsp;</span></span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>적립금의 소멸 시효는 다음의 경우를 따릅니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin-left: 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp; &amp;nbsp; -<span style=&quot;mso-spacerun:yes&quot;>&amp;nbsp; </span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>지급시점 기준으로<span lang=&quot;EN-US&quot;> 12</span>개월이 되는 시점에 소멸</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp; &amp;nbsp; -<span style=&quot;mso-spacerun:yes&quot;>&amp;nbsp; </span></span><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>회사가 사전 고지 후 지급한 적립금의 경우는
해당 고지일에 준하여 소멸</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p>&amp;nbsp;</o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p><br></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p><br></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot; style=&quot;font-size: 12pt;&quot;>7</span>장 손해배상 및 기타사항</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:
13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size: 12pt;&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><br></span></b></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 28 </span>조<span lang=&quot;EN-US&quot;> (</span>연결 웹사이트와 피연결
웹사이트 간의 관계<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>① 상위 웹사이트와 하위 웹사이트가 하이퍼 링크</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>(</span><span style=&quot;font-size: 9pt;&quot;>예</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>: </span><span style=&quot;font-size: 9pt;&quot;>하이퍼 링크의 대상에는 문자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>그림 및 동화상 등이 포함됨</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>)</span><span style=&quot;font-size: 9pt;&quot;>방식 등으로 연결된 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>전자를 연결 웹 사이트라고 하고 후자를
피연결 웹사이트라고 합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;line-height: 1.8;&quot;>&amp;nbsp;&amp;nbsp;<span style=&quot;font-size: 9pt;&quot;>② 연결 웹사이트는 피연결 웹사이트가 독자적으로 제공하는 재화·용역에 의하여 회원과 행하는 거래에 대해서 보증 책임을 지지
않는다는 뜻을 피연결 웹사이트에서 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제<span lang=&quot;EN-US&quot;> 29 </span>조 【손해배상의 범위 및 청구】</span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.5;&quot;><span style=&quot;font-size: 9pt;&quot;>① 회사는 천재지변 등 불가항력적이거나 종합쇼핑몰의 귀책사유 없이 발생한 회원의 손해에 대해서는 손해배상책임을 부담하지
않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 22.95pt; text-indent: -18pt; line-height: 1.5;&quot;><!--[if !supportLists]--><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-bidi-font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><span style=&quot;mso-list:Ignore&quot;>②&amp;nbsp;</span></span><span style=&quot;font-size:9.0pt;
font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>손해배상의 청구는 종합쇼핑몰에 청구사유<span lang=&quot;EN-US&quot;>, </span>청구금액
및 산출근거를 기재하여 서면으로 하여야 합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;>&amp;nbsp;</p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제 <span lang=&quot;EN-US&quot;>30 </span>조<span lang=&quot;EN-US&quot;> (</span>면책조항<span lang=&quot;EN-US&quot;>)</span></span></b></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>① 회사는 천재지변<span lang=&quot;EN-US&quot;>, </span>전쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를
제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 회사는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>③ 회사는 서비스용 설비의 보수<span lang=&quot;EN-US&quot;>, </span>교체<span lang=&quot;EN-US&quot;>, </span>정기점검<span lang=&quot;EN-US&quot;>, </span>공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>④ 회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다<span lang=&quot;EN-US&quot;>.</span></span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑤ 회사는 회원의 컴퓨터 오류에 의해 손해가 발생한 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>또는 회원이 신상정보
및 전자우편 주소를 부실하게 기재하여 손해가 발생한 경우 책임을 지지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑥ 회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑦ 회사는 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>또한 회사는 회원이 서비스를 이용하며 타 회원으로 인해 입게 되는 정신적 피해에 대하여 보상할 책임을 지지
않습니다</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑧ 회사는 회원이 서비스에 게재한 각종 정보</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>자료</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>사실의 신뢰도</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>정확성 등 내용에 대하여 책임을 지지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>⑨ 회사는 회원 상호간 및 회원과 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;> 3</span><span style=&quot;font-size: 9pt;&quot;>자 상호 간에 서비스를 매개로 발생한
분쟁에 대해 개입할 의무가 없으며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이로 인한 손해를 배상할 책임도 없습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;<o:p></o:p></span></p><p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;>&amp;nbsp;</span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><b><span style=&quot;font-size:11.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>제 <span lang=&quot;EN-US&quot;>31</span>조 【분쟁의 해결】</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;color:black&quot;=&quot;&quot;><o:p></o:p></span></p>

<p style=&quot;margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:4.95pt;
margin-bottom:.0001pt&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>① 회사와 회원은 서비스와 관련하여 분쟁이 발생한 경우에 이를 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span>&amp;nbsp;</p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size:9.0pt;font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; color:black&quot;=&quot;&quot;>② 제<span lang=&quot;EN-US&quot;>1</span>항의 규정에도 불구하고<span lang=&quot;EN-US&quot;>, </span>동
분쟁으로 인하여 소송이 제기될 경우 동 소송은 제소 당시의 이용자의 주소에 의하고<span lang=&quot;EN-US&quot;>, </span>주소가 없는 경우에는
거소를 관할하는 지방법원의 전속관할로 합니다<span lang=&quot;EN-US&quot;>. </span>다만<span lang=&quot;EN-US&quot;>, </span>제소
당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다<span lang=&quot;EN-US&quot;>.</span></span></p><p style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: 1.8;&quot;><span style=&quot;font-size: 9pt;&quot;>③ 회사와 이용자간에 제기된 전자상거래 소송에는 한국법을 적용합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p>"
                       disabled="disabled"/>
                                                    </span>
                                                    <a // href="javascript:void(0);"
                                                        // onClick="doTermLayer(this,'termsCheck_21Pop');"
                                                        onClick={(e) => doTermLayer(e.currentTarget,'termsCheck_21Pop')}
                                                    >
                                                        <span className="hidden">이용약관(필수)</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="inforCheck">
                                                <div className="inner">
                                                    <span className="schk">
                                                        <input type="checkbox" name="termCheck" id="termsCheck_23" value="3"
                                                            // onChange="doSelectCheckTerm(this);"
                                                            onChange={(e) => doSelectCheckTerm(e.currentTarget)}
                                                        />
                                                        <label htmlFor="termsCheck_23">개인정보처리방침(필수)<span className="ess bgRed">필수</span></label>
                                                        <input type="hidden" name="agrYn" id="agrYn" value="N"/>
                                                        <input type="hidden" name="termAplyNo" id="termAplyNo" value="2"/>
                                                        <input type="hidden" name="termTit" id="termTit" value="개인정보처리방침"/>
                                                        <input type="hidden" name="termCont" id="termCont" value="<p><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt; color: red;&quot;>&amp;nbsp;</span></p><p><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt; color: red;&quot;>(</span><span style=&quot;font-size: 9pt; color: red;&quot;>주<span lang=&quot;EN-US&quot;>)</span>라쿠카라차<span lang=&quot;EN-US&quot;>'</span>는<span lang=&quot;EN-US&quot;> (</span>이하<span lang=&quot;EN-US&quot;> '</span>회사<span lang=&quot;EN-US&quot;>')</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>이용자의 개인정보를 중요시하며<span lang=&quot;EN-US&quot;>, &quot;</span>정보통신망 이용촉진 및 정보보호<span lang=&quot;EN-US&quot;>&quot;</span>에 관한 법률을
준수하고 있습니다<span lang=&quot;EN-US&quot;>. </span>회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로
이용되고 있으며<span lang=&quot;EN-US&quot;>, </span>개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다<span lang=&quot;EN-US&quot;>. </span>만일 개인정보처리방침을 개정하는 경우에는 웹사이트 공지사항<span lang=&quot;EN-US&quot;>(</span>또는
개별공지<span lang=&quot;EN-US&quot;>)</span>을 통하여 안내해 드립니다<span lang=&quot;EN-US&quot;>.</span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: width=100%; overflow-x:auto13.5pt;&quot;>&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: width=100%; overflow-x:auto13.5pt;&quot;>&amp;nbsp;&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size:13.5pt;mso-ascii-font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:굴림;color:red;mso-font-kerning:0pt&quot;=&quot;&quot;>㈜라쿠카라차</span></b><b><span style=&quot;font-size: 13.5pt;&quot;>의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다<span lang=&quot;EN-US&quot;>.</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><br></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>1. </span><span style=&quot;font-size: 13.5pt;&quot;><span style=&quot;font-size: 10pt;&quot;>개인정보의 수집동의</span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 13.5pt;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>
2. </span><span style=&quot;font-size: 10pt;&quot;>수집하는 개인정의 항목 및 수집방법</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
3. </span><span style=&quot;font-size: 10pt;&quot;>개인정보의 보유 및 이용기간</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
4. </span><span style=&quot;font-size: 10pt;&quot;>개인정보 파기절차 및 방법</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
5. </span><span style=&quot;font-size: 10pt;&quot;>개인 정보의 공유 및 제공</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
6. </span><span style=&quot;font-size: 10pt;&quot;>개인정보의 처리 위탁</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
7. </span><span style=&quot;font-size: 10pt;&quot;>개인정보의 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>3</span><span style=&quot;font-size: 10pt;&quot;>자 제공에 관한 사항</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
8. </span><span style=&quot;font-size: 10pt;&quot;>개인정보의 열람</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>, </span><span style=&quot;font-size: 10pt;&quot;>정정</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
9. </span><span style=&quot;font-size: 10pt;&quot;>개인정보 수집</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>, </span><span style=&quot;font-size: 10pt;&quot;>이용</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>, </span><span style=&quot;font-size: 10pt;&quot;>제공에 대한 동의
철회</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;> (</span><span style=&quot;font-size: 10pt;&quot;>회원탈퇴</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>)<br>
10. </span><span style=&quot;font-size: 10pt;&quot;>만</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;> 14</span><span style=&quot;font-size: 10pt;&quot;>세 미만 아동의 개인정보</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
11. </span><span style=&quot;font-size: 10pt;&quot;>개인정보 자동 수집 장치의 설치</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>/</span><span style=&quot;font-size: 10pt;&quot;>운영 및 거부에 관한 사항</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
12. </span><span style=&quot;font-size: 10pt;&quot;>개인정보의 기술적</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;>/</span><span style=&quot;font-size: 10pt;&quot;>관리적 보호 대책</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
13. </span><span style=&quot;font-size: 10pt;&quot;>개인정보보책임자 및 담당자의 연락처</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
14. </span><span style=&quot;font-size: 10pt;&quot;>기타</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 10pt;&quot;><br>
15. </span><span style=&quot;font-size: 10pt;&quot;>고지의 의무</span><span lang=&quot;EN-US&quot;><span style=&quot;font-size: 11pt;&quot;><span style=&quot;font-size: 10pt;&quot;>&amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; </span>&amp;nbsp; &amp;nbsp;</span> &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;
&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;<o:p></o:p></span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;
&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 1 </span>조
개인정보의 수집 동의<span lang=&quot;EN-US&quot;>&amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;</span></span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>개인정보는 임직원 회원의 경우 계약에 의해 소속된 기업</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>/</span><span style=&quot;font-size: 9pt;&quot;>기관으로부터 제공받으며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>일반가입회원의 경우 회원 가입 시 제공받습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>이러한 개인정보 수집에 대한 동의는 최초 회원 가입 및 본인인증 시 해당절차를 통해 동의를 받습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;
&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 2</span>조
수집하는 개인정보의 항목 및 수집방법<span lang=&quot;EN-US&quot;>&amp;nbsp;</span></span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 고객사로부터 위탁 받은 서비스 제공을 위해 사전에 고객사에서 제공받는 개인정보와 이 외에 원활한
고객상담</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>단</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>(</span><span style=&quot;font-size: 9pt;&quot;>인종 및 민족</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>사상 및 신조</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>출신지
및 본적지</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>정치적 성향 및 범죄기록</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>건강상태 및 성생활
등</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>)</span><span style=&quot;font-size: 9pt;&quot;>는 수집하지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin: 0cm 0cm 0.0001pt 4.95pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>
<div style=&quot;width=95%; overflow-x:auto&quot;>
<table class=&quot;MsoNormalTable __se_tbl_ext&quot; border=&quot;1&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot; width=&quot;100%&quot; style=&quot;width:100.0%;border-collapse:collapse;border:none;mso-border-alt:solid #333333 1.0pt;
mso-yfti-tbllook:1184&quot;>
<tbody><tr style=&quot;mso-yfti-irow:0;mso-yfti-firstrow:yes;height:17.25pt&quot;>
<td width=&quot;9%&quot; colspan=&quot;2&quot; style=&quot;width:13.0%;border:solid #333333 1.0pt;
background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>구분</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;16%&quot; style=&quot;width:16.0%;border:solid #333333 1.0pt;border-left:
none;background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>항목</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;16%&quot; style=&quot;width:16.0%;border:solid #333333 1.0pt;border-left:
none;background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>수집방법</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;9%&quot; style=&quot;width:9.0%;border:solid #333333 1.0pt;border-left:
none;background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>이용목적</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;9%&quot; style=&quot;width:9.0%;border:solid #333333 1.0pt;border-left:none;
background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>보유기간</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
<tr style=&quot;mso-yfti-irow:1;height:48.0pt&quot;>
<td width=&quot;9%&quot; rowspan=&quot;6&quot; style=&quot;width:9.0%;border-top:none;border-left:solid #333333 1.0pt;
border-bottom:none;border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;
height:48.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>회원으로부터 수집</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;5%&quot; rowspan=&quot;2&quot; style=&quot;width:5.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:48.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>기본 정보</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;23%&quot; style=&quot;width:23.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:48.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>[</span><span style=&quot;font-size: 9pt;&quot;>공통항목<span lang=&quot;EN-US&quot;>]<br>
</span>이름<span lang=&quot;EN-US&quot;>,</span>아이디<span lang=&quot;EN-US&quot;>, </span>비밀번호<span lang=&quot;EN-US&quot;>, </span>가입인증번호<span lang=&quot;EN-US&quot;>,</span>이메일주소<span lang=&quot;EN-US&quot;>,&amp;nbsp;</span>휴대폰번호<span lang=&quot;EN-US&quot;>, </span>전화번호<span lang=&quot;EN-US&quot;>, </span>주소<span lang=&quot;EN-US&quot;>,</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>뉴스레터<span lang=&quot;EN-US&quot;>/SMS </span>수신여부<span lang=&quot;EN-US&quot;>, </span>사번</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;16%&quot; rowspan=&quot;4&quot; style=&quot;width:16.0%;border-top:none;border-left:
none;border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:48.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>회원가입<span lang=&quot;EN-US&quot;>, <br></span>서비스이용 신청서 등<br>서면양식에 서명<span lang=&quot;EN-US&quot;>, </span>전화<span lang=&quot;EN-US&quot;>, <br></span>상담 게시판<span lang=&quot;EN-US&quot;>, <br></span>이벤트 응모<span lang=&quot;EN-US&quot;>,<br></span>제휴사로 부터의 제공<span lang=&quot;EN-US&quot;>,<br></span>배송요청<br><br></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;35%&quot; rowspan=&quot;2&quot; style=&quot;width:35.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:48.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>회원 관리<br><span lang=&quot;EN-US&quot;>(</span>본인확인<span lang=&quot;EN-US&quot;>, </span>개인식별<span lang=&quot;EN-US&quot;>, </span>부정이용 방지와 <br>비인가사용 방지<span lang=&quot;EN-US&quot;>, </span>가입의사 확인<span lang=&quot;EN-US&quot;>, <br></span>연령확인<span lang=&quot;EN-US&quot;>, </span>불만
처리 등 민원처리<span lang=&quot;EN-US&quot;>,<br>&amp;nbsp;&amp;nbsp;</span>고지사항 전달<span lang=&quot;EN-US&quot;>) <br></span>서비스 제공에 관한
계약 이행 및<br>&amp;nbsp;서비스 제공에 따른 요금정산<span lang=&quot;EN-US&quot;>, <br></span>컨텐츠 제공<span lang=&quot;EN-US&quot;>, </span>서비스
및 가입상담<br><br></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;9%&quot; rowspan=&quot;4&quot; style=&quot;width:9.0%;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:48.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>회원탈퇴 시 또는 법정의무 보유기간</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
<tr style=&quot;mso-yfti-irow:2;height:36.75pt&quot;>
<td width=&quot;23%&quot; style=&quot;width:23.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:36.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>[</span><span style=&quot;font-size: 9pt;&quot;>선택항목<span lang=&quot;EN-US&quot;>]<br>
</span>관리구분<span lang=&quot;EN-US&quot;>,</span>생년월일<span lang=&quot;EN-US&quot;>(YYYYMMDD),</span>성별<span lang=&quot;EN-US&quot;>,</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>내외국인정보<span lang=&quot;EN-US&quot;>, </span>입사일<span lang=&quot;EN-US&quot;>,</span>직급<span lang=&quot;EN-US&quot;>,</span>부서</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
<tr style=&quot;mso-yfti-irow:3;height:36.0pt&quot;>
<td width=&quot;5%&quot; rowspan=&quot;2&quot; style=&quot;width:5.0%;border:solid #333333 1.0pt;
border-left:none;padding:.75pt .75pt .75pt .75pt;height:36.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>부가 정보</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;23%&quot; style=&quot;width:23.0%;border-top:solid #333333 1.0pt;border-left:
none;border-bottom:none;border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;
height:36.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;margin: 0cm 0cm 0.0001pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; text-align:=&quot;&quot; center;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;margin: 0cm 0cm 0.0001pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; text-align:=&quot;&quot; center;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>결혼여부</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>결혼기념일</span><span lang=&quot;EN-US&quot; style=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>,</span><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></span><span style=&quot;font-size: 9pt;&quot;>자녀유무,<br></span><span style=&quot;font-size: 9pt;&quot;>정보 수신 동의 및 마케팅 관련정보,</span></p><p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;margin: 0cm 0cm 0.0001pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; text-align:=&quot;&quot; center;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>IP Addres개s, 방문일시, 쿠키 등&amp;nbsp;</span><br><span style=&quot;font-size: 9pt;&quot;>자동수집정보</span></p>
</td>
<td width=&quot;35%&quot; rowspan=&quot;2&quot; style=&quot;width:35.0%;border:solid #333333 1.0pt;
border-left:none;padding:.75pt .75pt .75pt .75pt;height:36.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>마케팅<span lang=&quot;EN-US&quot;>/</span>광고 활용<span lang=&quot;EN-US&quot;> <br>(</span>이벤트 등 광고성 정보전달<span lang=&quot;EN-US&quot;> , <br></span>인구통계학적 특성에 따른 <br>서비스
제공 및 광고 게재<span lang=&quot;EN-US&quot;>)<br></span></span></p></td></tr><tr style=&quot;mso-yfti-irow:4;height:24.75pt&quot;><td width=&quot;23%&quot; style=&quot;width:23.0%;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:24.75pt&quot;><p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;>&amp;nbsp;</p>
</td>
</tr>
<tr style=&quot;mso-yfti-irow:5;height:24.0pt&quot;>
<td width=&quot;5%&quot; rowspan=&quot;2&quot; style=&quot;width:5.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:24.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>상품 구매</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;23%&quot; style=&quot;width:23.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:24.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>[</span><span style=&quot;font-size: 9pt;&quot;>주문고객정보<span lang=&quot;EN-US&quot;>]<br></span>필수<span lang=&quot;EN-US&quot;> : </span>이름<span lang=&quot;EN-US&quot;>, </span>휴대전화번호</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;16%&quot; rowspan=&quot;2&quot; style=&quot;width:16.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:24.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>상품 구매 시 수집</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;35%&quot; rowspan=&quot;2&quot; style=&quot;width:35.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:24.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>주문 상품에 대한 결제 및 상품배송<span lang=&quot;EN-US&quot;>, </span>계약이행을
위한 연락 및 고지</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;9%&quot; rowspan=&quot;2&quot; style=&quot;width:9.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:24.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>법정의무 보유기간</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
<tr style=&quot;mso-yfti-irow:6;height:36.75pt&quot;>
<td width=&quot;23%&quot; style=&quot;width:23.0%;border:none;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:36.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>[</span><span style=&quot;font-size: 9pt;&quot;>배송정보<span lang=&quot;EN-US&quot;>]<br>
</span>필수<span lang=&quot;EN-US&quot;> : </span>이름<span lang=&quot;EN-US&quot;>, </span>휴대전화번호<span lang=&quot;EN-US&quot;>, </span>배송주소<span lang=&quot;EN-US&quot;><br>
</span>선택<span lang=&quot;EN-US&quot;> : </span>추가연락처</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
<tr style=&quot;mso-yfti-irow:7;mso-yfti-lastrow:yes;height:24.75pt&quot;>
<td width=&quot;9%&quot; style=&quot;width:9.0%;border:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;
height:24.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>스마트앱을 통한 수집</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;5%&quot; style=&quot;width:5.0%;border:solid #333333 1.0pt;border-left:none;
padding:.75pt .75pt .75pt .75pt;height:24.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>선택</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;23%&quot; style=&quot;width:23.0%;border:solid #333333 1.0pt;border-left:
none;padding:.75pt .75pt .75pt .75pt;height:24.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>고유기기 식별번호<span lang=&quot;EN-US&quot;>, <br></span>단말기 기기명<span lang=&quot;EN-US&quot;>, OS</span>버전<br><br></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;16%&quot; style=&quot;width:16.0%;border:solid #333333 1.0pt;border-left:
none;padding:.75pt .75pt .75pt .75pt;height:24.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>복리후생관 앱 설치 시 자동 수집</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;35%&quot; style=&quot;width:35.0%;border:solid #333333 1.0pt;border-left:
none;padding:.75pt .75pt .75pt .75pt;height:24.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>마케팅<span lang=&quot;EN-US&quot;>/</span>광고 활용<span lang=&quot;EN-US&quot;> <br>(</span>이벤트 등 광고성 정보전달<span lang=&quot;EN-US&quot;> , <br></span>인구통계학적 특성에 따른&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>서비스
제공 및 푸시서비스<span lang=&quot;EN-US&quot;>)</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td width=&quot;9%&quot; style=&quot;width:9.0%;border:solid #333333 1.0pt;border-left:none;
padding:.75pt .75pt .75pt .75pt;height:24.75pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>회원탈퇴 시 까지</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
</tbody></table>
</div>
<p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<br></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;><br>*&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>회사와 고객사간 서비스이용계약에 따라 특정
항목<span lang=&quot;EN-US&quot;>(</span>회사명<span lang=&quot;EN-US&quot;>,</span>사원번호<span lang=&quot;EN-US&quot;>,</span>이름<span lang=&quot;EN-US&quot;>,</span>복지포인트<span lang=&quot;EN-US&quot;>, </span>기타 식별번호<span lang=&quot;EN-US&quot;>(</span>가맹번코드<span lang=&quot;EN-US&quot;>) </span>등<span lang=&quot;EN-US&quot;>) </span>정보는 임직원 인증을 위하여 암호화된 파일형태로 일괄 취득</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 3 </span>조 개인정보의 보유 및 이용기간</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>이용자가 회사에서 제공하는 서비스를 이용하는 동안 회사는 이용자의 개인정보를 계속적으로 보유하며 서비스
제공 등을 위해 이용합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>가<span lang=&quot;EN-US&quot;>. </span>회사 내부 방침에 의한 정보보유 사유</b></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사와 고객사간 계약이 종료 한 경우 정산 등의 이유로 고객사 소속의 이용자<span lang=&quot;EN-US&quot;>(</span>회원<span lang=&quot;EN-US&quot;>)</span>의 개인정보 계약 종료 후 익년 년말까지 보유합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>퇴직 등의 사유로 회원자격을 상실하거나 회원을 탈퇴 한 경우 정산 등의 이유로 이용자의 개인정보를 자격
상실 후 익년 년말까지 보유합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>나<span lang=&quot;EN-US&quot;>. </span>관련법령에 의한 정보보유 사유</b></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>상법<span lang=&quot;EN-US&quot;>, </span>전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의
규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다<span lang=&quot;EN-US&quot;>. <br></span>이
경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><table class=&quot;MsoNormalTable __se_tbl_ext&quot; border=&quot;1&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot; style=&quot;border-collapse:collapse;border:none;mso-border-alt:solid #333333 1.0pt;
mso-yfti-tbllook:1184&quot;>
<tbody><tr style=&quot;mso-yfti-irow:0;mso-yfti-firstrow:yes;height:21.0pt&quot;>
<td style=&quot;border:solid #333333 1.0pt;background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;
height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>정보</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td style=&quot;border:solid #333333 1.0pt;border-left:none;background:#E8E8E8;
padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>보존근거</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
<td style=&quot;border:solid #333333 1.0pt;border-left:none;background:#E8E8E8;
padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>보존기간</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
<tr style=&quot;mso-yfti-irow:1;height:21.0pt&quot;>
<td style=&quot;border:solid #333333 1.0pt;border-top:none;padding:.75pt .75pt .75pt .75pt;
height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>계약 또는 청약철회 등에 관한 기록</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>전자상거래 등에서의 소비자보호에 관한 법률</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>5</span><span style=&quot;font-size: 9pt;&quot;>년</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:2;height:21.0pt&quot;><td style=&quot;border:solid #333333 1.0pt;border-top:none;padding:.75pt .75pt .75pt .75pt;
height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>대금결제 및 재화 등의 공급에 관한 기록</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>전자상거래 등에서의 소비자보호에 관한 법률</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>5</span><span style=&quot;font-size: 9pt;&quot;>년</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:3;height:21.0pt&quot;><td style=&quot;border:solid #333333 1.0pt;border-top:none;padding:.75pt .75pt .75pt .75pt;
height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>소비자의 불만 또는 분쟁처리에 관한 기록</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>전자상거래 등에서의 소비자보호에 관한 법률</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>5</span><span style=&quot;font-size: 9pt;&quot;>년</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:4;height:21.0pt&quot;><td style=&quot;border:solid #333333 1.0pt;border-top:none;padding:.75pt .75pt .75pt .75pt;
height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>본인확인에 관한 기록</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>정보통신망 이용촉진 및 정보보호 등에 관한 법률</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>6</span><span style=&quot;font-size: 9pt;&quot;>개월</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:5;mso-yfti-lastrow:yes;height:21.0pt&quot;><td style=&quot;border:solid #333333 1.0pt;border-top:none;padding:.75pt .75pt .75pt .75pt;
height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>웹사이트 방문기록</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span style=&quot;font-size: 9pt;&quot;>통신비밀보호법</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td style=&quot;border-top:none;border-left:none;border-bottom:solid #333333 1.0pt;
border-right:solid #333333 1.0pt;padding:.75pt .75pt .75pt .75pt;height:21.0pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>3</span><span style=&quot;font-size: 9pt;&quot;>개월</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
</tbody></table><p>&amp;nbsp;</p><p>&amp;nbsp;</p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 4 </span>조 개인정보 파기절차 및 방법</span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;><br></span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사의 개인정보 파기절차 및 방법은 다음과 같습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>가<span lang=&quot;EN-US&quot;>. </span>파기절차</b></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의<span lang=&quot;EN-US&quot;> DB</span>로
옮겨져<span lang=&quot;EN-US&quot;>(</span>종이의 경우 별도의 서류함<span lang=&quot;EN-US&quot;>) </span>내부 방침 및 기타 관련
법령에 의한 정보보호 사유에 따라<span lang=&quot;EN-US&quot;>(</span>보유 및 이용기간 참조<span lang=&quot;EN-US&quot;>)</span>일정
기간 저장된 후 파기됩니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>나<span lang=&quot;EN-US&quot;>. </span>파기방법</b></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span>&amp;nbsp;</p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 5 </span>조 개인정보의 공유 및 제공</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 이용자들의 개인정보를<span lang=&quot;EN-US&quot;> &quot;2. </span>개인정보의 수집목적
및 이용목적<span lang=&quot;EN-US&quot;>&quot;</span>에서 고지한 범위 내에서 사용하며<span lang=&quot;EN-US&quot;>, </span>이용자의
사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다<span lang=&quot;EN-US&quot;>.&amp;nbsp;</span></span><span style=&quot;font-size: 9pt;&quot;>다만<span lang=&quot;EN-US&quot;>, </span>아래의 경우에는 예외로 합니다</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><br>- 이용자들이 사전에 공개에 동의한 경우</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>- 법령의 규정에 의거하거나<span lang=&quot;EN-US&quot;>, </span>수사 목적으로 법령에 정해진 절차와
방법에 따라 수사기관의 요구가 있는 경우<br></span><span style=&quot;font-size: 9pt;&quot;>- 서비스 제공을 위하여 개인정보를 제휴사에게 제공하거나 공유할 필요가 있는 경우 <br></span><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp; (*제공 또는 공유 할 정보의
항목 및 제휴사명</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>목적</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>기간 등을 명시하여 회원님께 동의를
구하는 절차를 거치게 되며</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>동의하지 않는 경우에는 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>3</span><span style=&quot;font-size: 9pt;&quot;>자에게
제공 또는 공유하지 않습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.)<br></span><span style=&quot;font-size: 9pt;&quot;>- 배송업무상 배송업체에게 배송에 필요한 최소한의 이용자 정보</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>( </span><span style=&quot;font-size: 9pt;&quot;>이름</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>주소</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>전화번호</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>휴대폰번호</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>)</span><span style=&quot;font-size: 9pt;&quot;>를 알려주는 경우<br></span><span style=&quot;font-size: 9pt;&quot;>- 통계작성</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>학술연구 또는 시장조사 등을 위하여 필요한 경우로서
특정개인을 식별할 수 없는 형태로 제공하는 경우</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 6 </span>조 개인정보의 처리위탁</span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 서비스 향상을 위해서 이용자의 개인정보를 위탁 처리할 경우 반드시 사전에 위탁처리 업체명과 위탁
처리되는 개인정보의 범위<span lang=&quot;EN-US&quot;>, </span>위탁업무 내용 등에 대해 상세하게 고지합니다</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p>
<div style=&quot;width=95%; overflow-x:auto&quot;>
<table class=&quot;MsoNormalTable __se_tbl_ext&quot; border=&quot;1&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot; width=&quot;100%&quot; style=&quot;width:100%;border-collapse:collapse;border:none;mso-border-alt:solid #333333 1.0pt;
mso-yfti-tbllook:1184&quot;>
<tbody><tr style=&quot;mso-yfti-irow:0;mso-yfti-firstrow:yes;height:17.25pt&quot;>
<td width=&quot;169&quot; style=&quot;width:127.1pt;border:solid #333333 1.0pt;background:
#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>개인정보 위탁을 받는 자</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td width=&quot;217&quot; style=&quot;width:163.0pt;border:solid #333333 1.0pt;border-left:
none;background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>개인정보 취급 위탁하는 업무의 내용</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td width=&quot;127&quot; style=&quot;width:95.3pt;border:solid #333333 1.0pt;border-left:
none;background:#E8E8E8;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;mso-style-unhide:no;
mso-style-qformat:yes;
mso-style-parent:'';
margin-top:0cm;
margin-right:0cm;
margin-bottom:8.0pt;
margin-left:0cm;
text-align:justify;
text-justify:inter-ideograph;
line-height:107%;
mso-pagination:none;
text-autospace:none;
word-break:break-hangul;
font-size:10.0pt;
mso-bidi-font-size:11.0pt;
font-family:'맑은 고딕';
mso-ascii-font-family:'맑은 고딕';
mso-ascii-theme-font:minor-latin;
mso-fareast-font-family:'맑은 고딕';
mso-fareast-theme-font:minor-fareast;
mso-hansi-font-family:'맑은 고딕';
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:'Times New Roman';
mso-bidi-theme-font:minor-bidi;
mso-font-kerning:1.0pt; mso-margin-top-alt:auto;margin-bottom:
0cm;margin-bottom:.0001pt;text-align:center;line-height:normal;mso-pagination:
widow-orphan;text-autospace:ideograph-numeric ideograph-other;word-break:
keep-all&quot;><b>보유기간</b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:1;height:17.25pt&quot;><td width=&quot;169&quot; style=&quot;width:127.1pt;border:solid #333333 1.0pt;border-top:
none;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size:9.0pt;mso-ascii-font-family:'맑은 고딕';
mso-fareast-font-family:'맑은 고딕';mso-hansi-font-family:'맑은 고딕';mso-bidi-font-family:
굴림;color:red;mso-font-kerning:0pt&quot;>한국모바일인증<span lang=&quot;EN-US&quot;><o:p></o:p></span></span></p>
</td><td width=&quot;217&quot; style=&quot;width:163.0pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>회원가입시 본인인증</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td width=&quot;127&quot; style=&quot;width:95.3pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>목적 달성후 <br>파기</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:2;height:17.25pt&quot;><td width=&quot;169&quot; style=&quot;width:127.1pt;border:solid #333333 1.0pt;border-top:
none;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size:9.0pt;mso-ascii-font-family:'맑은 고딕';
mso-fareast-font-family:'맑은 고딕';mso-hansi-font-family:'맑은 고딕';mso-bidi-font-family:
굴림;color:red;mso-font-kerning:0pt&quot;>(주)다날, <br>(주)빌게이트<span lang=&quot;EN-US&quot;><o:p></o:p></span></span></p>
</td><td width=&quot;217&quot; style=&quot;width:163.0pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>신용카드 결제승인 및 매입업무 대행</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td width=&quot;127&quot; style=&quot;width:95.3pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>목적 달성후 <br>파기</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:3;height:17.25pt&quot;><td width=&quot;169&quot; style=&quot;width:127.1pt;border:solid #333333 1.0pt;border-top:
none;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size:9.0pt;mso-ascii-font-family:'맑은 고딕';
mso-fareast-font-family:'맑은 고딕';mso-hansi-font-family:'맑은 고딕';mso-bidi-font-family:
굴림;color:red;mso-font-kerning:0pt&quot;>구글<span lang=&quot;EN-US&quot;><o:p></o:p></span></span></p>
</td><td width=&quot;217&quot; style=&quot;width:163.0pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>메일 발송</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td width=&quot;127&quot; style=&quot;width:95.3pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>목적 달성후<br>파기</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td></tr><tr style=&quot;mso-yfti-irow:4;mso-yfti-lastrow:yes;height:17.25pt&quot;><td width=&quot;169&quot; style=&quot;width:127.1pt;border:solid #333333 1.0pt;border-top:
none;padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size:9.0pt;mso-ascii-font-family:'맑은 고딕';
mso-fareast-font-family:'맑은 고딕';mso-hansi-font-family:'맑은 고딕';mso-bidi-font-family:
굴림;color:red;mso-font-kerning:0pt&quot;>써머스플랫폼<span lang=&quot;EN-US&quot;><o:p></o:p></span></span></p>
</td><td width=&quot;217&quot; style=&quot;width:163.0pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>알림톡<span lang=&quot;EN-US&quot;>/SMS/LMS<br></span>발송</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td><td width=&quot;127&quot; style=&quot;width:95.3pt;border-top:none;border-left:none;
border-bottom:solid #333333 1.0pt;border-right:solid #333333 1.0pt;
padding:.75pt .75pt .75pt .75pt;height:17.25pt&quot;>
<p class=&quot;MsoNormal&quot; align=&quot;center&quot; style=&quot;text-align: center; margin: 0cm 0cm 0.0001pt; font-size: 10pt; font-family: &quot; 맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; line-height:=&quot;&quot; normal;=&quot;&quot; word-break:=&quot;&quot; keep-all;&quot;=&quot;&quot;><span style=&quot;font-size: 9pt;&quot;>목적 달성후 <br>파기</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p>
</td>
</tr>
</tbody></table>
</div>
<p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><br>회사는 위탁계약 체결시 개인정보 보호법 제</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>25</span><span style=&quot;font-size: 9pt;&quot;>조에 따라 위탁업무
수행목적 외 개인정보 처리금지</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>기술적</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>/</span><span style=&quot;font-size: 9pt;&quot;>관리적 보호조치</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>재위탁 제한</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>수탁자에 대한 관리</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>,
</span><span style=&quot;font-size: 9pt;&quot;>감독</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><b>&amp;nbsp;<o:p></o:p></b></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot;><a><b><span lang=&quot;EN-US&quot; style=&quot;font-size:
11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;mso-font-kerning:=&quot;&quot; 0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>제 7&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:
11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;mso-font-kerning:=&quot;&quot; 0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>조&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:
11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;mso-font-kerning:=&quot;&quot; 0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>개인정보의&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>제3</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>자&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>제공에&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>관한&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>사항 (</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>별도의&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>동의를&amp;nbsp;</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:11.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><span lang=&quot;EN-US&quot;>받습니다)</span></span></b></a></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>개인정보의 제<span lang=&quot;EN-US&quot;>3</span>자 제공이 필요한 경우에는<span lang=&quot;EN-US&quot;>, </span>사전에 회원께 정보를 제공받는자<span lang=&quot;EN-US&quot;>, </span>제공하는 개인정보항목<span lang=&quot;EN-US&quot;>, </span>제공목적<span lang=&quot;EN-US&quot;>, </span>정보의 보유 및 이용기간을 고지하여 사전에 동의를 얻어
제<span lang=&quot;EN-US&quot;>3</span>자에게 개인정보를 제공 할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>제공하는 개인정보는 당해 목적을 달성하기 위하여 필요한 최소한의 정보에 국한됩니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>직송 등 일부 배송형태에 따라<span lang=&quot;EN-US&quot;>, </span>전자상거래소비자보호법 제<span lang=&quot;EN-US&quot;> 21</span>조에 의거 협력사에 배송정보가 제공 됩니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>일부 서비스는 외부 콘텐츠 제공사<span lang=&quot;EN-US&quot;>(CP)</span>에서 결제 및 환불 등에
대한 고객상담을 할 수 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 8 </span>조 개인정보의 열람<span lang=&quot;EN-US&quot;>, </span>정정</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회원님은 언제든지 등록되어 있는 귀하의 개인정보를 열람하거나 정정하실 수 있습니다<span lang=&quot;EN-US&quot;>. </span>개인정보 열람 및 정정을 하고자 할 경우에는 『내정보관리』 또는 『개인정보변경』을 클릭하여 직접 열람 또는
정정하거나<span lang=&quot;EN-US&quot;>, </span>개인정보보호책임자 및 담당자에게 서면<span lang=&quot;EN-US&quot;>, </span>전화
또는<span lang=&quot;EN-US&quot;> E-mail</span>로 연락하시면 지체 없이 조치하겠습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회원님의 개인정보의 오류에 대한 정정을 요청한 경우<span lang=&quot;EN-US&quot;>, </span>정정을
완료하기 전까지 당해 개인 정보를 이용 또는 제공하지 않습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>잘못된 개인정보를 제<span lang=&quot;EN-US&quot;>3</span>자에게 이미 제공한 경우에는 정정 처리결과를
제<span lang=&quot;EN-US&quot;>3</span>자에게 지체 없이 통지하여 정정하도록 조치하겠습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는<span lang=&quot;EN-US&quot;> &quot;5. </span>개인정보의 보유 및 이용기간<span lang=&quot;EN-US&quot;>&quot;</span>에 명시된 바에
따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><span lang=&quot;EN-US&quot;><br></span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 9 </span>조 개인정보 수집<span lang=&quot;EN-US&quot;>, </span>이용<span lang=&quot;EN-US&quot;>, </span>제공에 대한 동의철회<span lang=&quot;EN-US&quot;>(</span>회원탈퇴<span lang=&quot;EN-US&quot;>)</span></span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>이용자의 개인정보는 이용자가 근무하고 있는 회사<span lang=&quot;EN-US&quot;>(</span>고객사<span lang=&quot;EN-US&quot;>)</span>와 회사간 서비스 이용계약이 해지 된 경우와 계약 만료 등의 사유로 고객사의 자격이 상실된 경우<span lang=&quot;EN-US&quot;>, </span>그리고 귀하가 퇴직 등의 사유로 회원자격을 상실한 경우 삭제처리를 요청하실 수 있습니다<span lang=&quot;EN-US&quot;>. </span>또한 일반 가입회원인 경우 회원 탈퇴 기능을 이용하여 회원본인 스스로 탈퇴하실 수 있습니다<span lang=&quot;EN-US&quot;>. </span>일반 가입회원이 회원탈퇴 할 경우<span lang=&quot;EN-US&quot;>, </span>관련법 및 개인정보처리방침에
따라<span lang=&quot;EN-US&quot;>&amp;nbsp; </span>회원정보를 보유하는 경우를
제외하고는 해지 즉시 회원탈퇴 처리를 하며<span lang=&quot;EN-US&quot;>, </span>관련 개인정보를 파기시점에 준하여 파기합니다<span lang=&quot;EN-US&quot;>. </span>단<span lang=&quot;EN-US&quot;>, </span>임직원 회원인 경우 귀하가 퇴직 한 후 회원탈퇴를 요청하셨더라도
고객사와 회사간의 대금결제 등의 이유로 보유기간동안은 삭제처리가 되지 않습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>동의 철회는 개인정보보호책임자에게 서면<span lang=&quot;EN-US&quot;>, </span>전화<span lang=&quot;EN-US&quot;>, E-mail</span>등으로 연락하시면 필요한 조치를 하겠습니다<span lang=&quot;EN-US&quot;>. </span>동의 철회를
하고 개인정보를 파기하는 등의 조치를 취한 경우에는 그 사실을 귀하께 지체 없이 통지하도록 하겠습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><span lang=&quot;EN-US&quot;><br></span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 10 </span>조 만<span lang=&quot;EN-US&quot;> 14</span>세
미만 아동의 개인정보</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 만<span lang=&quot;EN-US&quot;> 14</span>세 아동에게 서비스를 제공하지 않으며<span lang=&quot;EN-US&quot;>, </span>아동의 개인정보를 수집하지 않습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><span lang=&quot;EN-US&quot;><br></span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 11</span>조 개인정보 자동 수집 장치의 설치<span lang=&quot;EN-US&quot;>/</span>운영 및 거부에 관한 사항</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 이용자의 정보를 수시로 저장하고 찾아내는<span lang=&quot;EN-US&quot;> '</span>쿠키<span lang=&quot;EN-US&quot;>(cookie)' </span>등을 운용합니다<span lang=&quot;EN-US&quot;>. </span>쿠키란 회사의 웹사이트를 운영하는데
이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다<span lang=&quot;EN-US&quot;>. </span>회사는
다음과 같은 목적을 위해 쿠키를 사용합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>가<span lang=&quot;EN-US&quot;>. </span>쿠키 등 사용 목적</b></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회원의 접속 빈도나 방문 시간 등을 분석</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>이용자의 취향과 관심분야를
파악 및 자취 추적</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤
서비스 제공</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>나<span lang=&quot;EN-US&quot;>. </span>쿠키 설치 허용여부 선택</b></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>. </span><span style=&quot;font-size: 9pt;&quot;>따라서
이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>쿠키가 저장될 때마다 확인을 거치거나</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>, </span><span style=&quot;font-size: 9pt;&quot;>아니면 모든 쿠키의 저장을 거부할 수도 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>.</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>다만<span lang=&quot;EN-US&quot;>, </span>쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스는
이용에 어려움이 있을 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>쿠키 설치 허용 여부를 지정하는 방법<span lang=&quot;EN-US&quot;>(Internet Explorer</span>의
경우<span lang=&quot;EN-US&quot;>)</span></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>①<span lang=&quot;EN-US&quot;> [</span>도구<span lang=&quot;EN-US&quot;>] </span>메뉴에서<span lang=&quot;EN-US&quot;> [</span>인터넷 옵션<span lang=&quot;EN-US&quot;>]</span>을 선택합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>②<span lang=&quot;EN-US&quot;> [</span>개인정보 탭<span lang=&quot;EN-US&quot;>]</span>을
클릭합니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>③<span lang=&quot;EN-US&quot;> [</span>개인정보처리 수준<span lang=&quot;EN-US&quot;>]</span>을
설정하시면 됩니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 12 </span>조 개인정보의 기술적<span lang=&quot;EN-US&quot;>/</span>관리적
보호 대책</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>가<span lang=&quot;EN-US&quot;>. </span>기술적 대책</b></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 귀하의 개인정보를 처리함에 있어 개인정보가 분실<span lang=&quot;EN-US&quot;>, </span>도난<span lang=&quot;EN-US&quot;>, </span>누출<span lang=&quot;EN-US&quot;>, </span>변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
기술적 대책을 강구하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회원님의 개인정보는 파일 및 전송 데이터를 암호화하여 혹시 발생할 수 있는 사고 시라도 회원님의 개인정보가
유출되지 않도록 관리되고있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다<span lang=&quot;EN-US&quot;>. </span>백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써
개인정보가 침해되는 것을 방지하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치<span lang=&quot;EN-US&quot;> (SSL </span>또는<span lang=&quot;EN-US&quot;> XecureWeb(</span>소프트포럼<span lang=&quot;EN-US&quot;>)) </span>를 채택하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>해킹 등 외부침입에 대비하여 각 서버마다 침입차단 및 침입탐지 시스템을 도입하고 주기적으로 취약점 분석시스템
등을 이용하여 보안에 만전을 기하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><b>나<span lang=&quot;EN-US&quot;>. </span>관리적대책</b></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사의 개인정보관련 처리 직원은 담당자에 한정시키고 있고 이를 위한 별도의 관리자 권한을 부여하여 관리하고
있으며<span lang=&quot;EN-US&quot;>, </span>담당자에 대한 수시 교육을 통하여 개인정보처리방침의 준수를 항상 강조하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span>&amp;nbsp;</p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 귀하의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다<span lang=&quot;EN-US&quot;>. </span>그 최소한의 인원에 해당하는 자는 다음과 같습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>-&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>이용자를 직접 상대로 하여 상담업무를 수행하는
자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>-&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>고객사의 복지제도 운영 및 정산 업무를
수행하는 고객사 운영담당자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>-&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>개인정보보호책임자 및 담당자 등 개인정보관리업무를
수행하는 자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>-&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>기타업무상 개인정보의 처리가 불가피한 자</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>개인정보를 처리하는 직원을 대상으로 새로운 보안 기술 습득 및 개인정보 보호 의무 등에 관해 정기적인 사내
교육 및 외부 위탁교육을 실시하고 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>입사 시 전 직원의 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보처리방침에 대한 이행사항
및 직원의 준수여부를 감사하기 위한 내부절차를 마련하고 있습니다</span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>개인정보 관련 처리자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후
개인정보 사고에 대한 책임을 명확화하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>개인정보와 일반 데이터를 혼합하여 보관하지 않고 별도의 서버를 통해 분리하여 보관하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>전산실 및 자료 보관실 등을 특별 보호구역으로 설정하여 출입을 통제하고 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다<span lang=&quot;EN-US&quot;>. </span>회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의<span lang=&quot;EN-US&quot;> ID </span>와
비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실<span lang=&quot;EN-US&quot;>,
</span>유출<span lang=&quot;EN-US&quot;>, </span>변조<span lang=&quot;EN-US&quot;>, </span>훼손이 유발될 경우 회사는 즉각
귀하께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>단<span lang=&quot;EN-US&quot;>, </span>이용자 본인의 부주의나 인터넷상의 문제로<span lang=&quot;EN-US&quot;> ID, </span>비밀번호 등 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><span lang=&quot;EN-US&quot;><br></span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 13 </span>조 개인정보보호책임자 및 담당자의 연락처</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보보호책임자를
지정하고 있습니다</span>&amp;nbsp;</p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 11pt;&quot;>※ 개인정보보호 책임자</span><br></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 11pt;&quot;><b>이름 : 유호상</b></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 11pt;&quot;><b>소속/직책 : 기술개발팀/이사</b></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 11pt;&quot;>메일 : hsyou@lacucaracha.co.kr</span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 11pt;&quot;>전화 : 070-4262-7797</span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 11pt;&quot;>팩스 : 02-508-0612</span></b></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;>&amp;nbsp;</p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>이용자는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보보호책임자 혹은 담당부서로
신고하실 수 있습니다<span lang=&quot;EN-US&quot;>. </span>회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다<span lang=&quot;EN-US&quot;>.</span></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다<span lang=&quot;EN-US&quot;>.</span></span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span><span style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;</span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>1.&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>개인정보 분쟁조정위원회<span lang=&quot;EN-US&quot;> : (</span>국번없이<span lang=&quot;EN-US&quot;>) 1833-6927 (privacy.kisa.or.kr)</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>2.&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>개인정보 침해신고센터<span lang=&quot;EN-US&quot;> : (</span>국번없이<span lang=&quot;EN-US&quot;>) 118 (privacy.kisa.or.kr)</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>3.&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>대검찰청 사이버범죄수사단<span lang=&quot;EN-US&quot;> : (</span>국번없이<span lang=&quot;EN-US&quot;>) 1301 (cybercid@spo.go.kr)</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 9pt;&quot;>4.&amp;nbsp;</span><span style=&quot;font-size: 9pt;&quot;>경찰청 사이버안전국<span lang=&quot;EN-US&quot;> : (</span>국번없이<span lang=&quot;EN-US&quot;>) 182 (cyberbureau.police.go.kr)</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><span lang=&quot;EN-US&quot;><br></span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 14 </span>조 기타</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사는 귀하께 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>이 경우 회사는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의 유용성에
대해 책임질 수 없으며 보증할 수 없습니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>회사가 포함하고 있는 링크를 클릭<span lang=&quot;EN-US&quot;>(click)</span>하여 타 사이트<span lang=&quot;EN-US&quot;>(site)</span>의 페이지로 옮겨갈 경우 해당 사이트의 개인정보처리방침은 회사와 무관하므로 새로 방문한 사이트의 정책을
검토해 보시기 바랍니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;><span lang=&quot;EN-US&quot;><br></span></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><b><span style=&quot;font-size: 12pt;&quot;>제<span lang=&quot;EN-US&quot;> 15 </span>조 고지의 의무</span></b><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span style=&quot;font-size: 9pt;&quot;>현 개인정보처리방침 내용 추가<span lang=&quot;EN-US&quot;>, </span>삭제 및 수정이 있을 시에는
개정 최소<span lang=&quot;EN-US&quot;> 7</span>일전부터 홈페이지의<span lang=&quot;EN-US&quot;> '</span>공지사항<span lang=&quot;EN-US&quot;>'</span>을 통해 고지할 것입니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;><o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size: 13.5pt;&quot;>&amp;nbsp;<o:p></o:p></span></p><p class=&quot;MsoNormal&quot; align=&quot;left&quot; style=&quot;margin-bottom: 0.0001pt; line-height: normal; word-break: keep-all;&quot;><span lang=&quot;EN-US&quot; style=&quot;font-size:9.0pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;>(</span><span style=&quot;font-size:9.0pt;mso-ascii-font-family:
&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;=&quot;&quot; mso-bidi-font-family:굴림;color:red;mso-font-kerning:0pt&quot;=&quot;&quot;>시행일<span lang=&quot;EN-US&quot;>) </span>본
개인정보처리방침<span lang=&quot;EN-US&quot;> 2021</span>년 <span lang=&quot;EN-US&quot;>4</span>월<span lang=&quot;EN-US&quot;> 30</span>일부터 시행합니다<span lang=&quot;EN-US&quot;>.</span></span><span lang=&quot;EN-US&quot; style=&quot;font-size:13.5pt;mso-ascii-font-family:&quot; 맑은=&quot;&quot; 고딕&quot;;mso-fareast-font-family:=&quot;&quot; &quot;맑은=&quot;&quot; 고딕&quot;;mso-hansi-font-family:&quot;맑은=&quot;&quot; 고딕&quot;;mso-bidi-font-family:굴림;color:red;=&quot;&quot; mso-font-kerning:0pt&quot;=&quot;&quot;><o:p></o:p></span></p><p>
&amp;nbsp; &amp;nbsp;​&amp;nbsp;</p>" disabled="disabled"/>
            </span>
                                                    <a // href="javascript:void(0);"
                                                        // onClick="doTermLayer(this,'termsCheck_23Pop');"
                                                        onClick={(e) => doTermLayer(e.currentTarget,'termsCheck_23Pop')}
                                                    >
                                                        <span className="hidden">개인정보처리방침(필수)</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="inforCheck type2">
                                                <div className={`inner re1 down ${active["0"] ? 'active' : ''}`}>
                                                {/*<div className={`inner re1 down`}>*/}
                                                    <span className="schk">
                                                        <input type="checkbox" name="termCheck" id="termsCheck98"
                                                            // onClick="doSelectCheck(this,'mng')"
                                                            onClick={(e) => doSelectCheck(e.currentTarget, 'mng')}
                                                            value="999998"/>
                                                        <label htmlFor="termsCheck98">
                                                            [라쿠카라차] 운영 정보 수신동의  (선택)
                                                        </label>
                                                        <input type="hidden" name="agrYn" id="agrYn" value="N"/>
                                                    </span>
                                                    <a // href="javascript:void(0);"
                                                       className="rea1" onClick={(e) => doToggleReception(e.currentTarget, 0)}>
                                                        <span className="hidden">[라쿠카라차] 운영 정보 수신동의  (선택)</span>
                                                    </a>
                                                </div>
                                                <div className="reception first">제도, 포인트,
                                                    적립금, 결제 관련 안내 등 [라쿠카라차] 의 종합쇼핑몰 운영과 관련된
                                                    안내를 받으실 수 있습니다. 운영정보(제도) 수신동의와 관련된 사항은
                                                    담당자에게 문의하여 주시기 바랍니다.
                                                    <div id="mng">
                                                        <span className="check">
                                                            <input id="mngMailAgrYn" name="mngMailAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="mngMailAgrYn">이메일</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="mngAltalkAgrYn" name="mngAltalkAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="mngAltalkAgrYn">카카오 알림톡</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="mngPushAgrYn" name="mngPushAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="mngPushAgrYn">PUSH</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="mngSmsAgrYn" name="mngSmsAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="mngSmsAgrYn">문자</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="mngPostAgrYn" name="mngPostAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="mngPostAgrYn">우편물</label>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="inforCheck type2">
                                                <div className={`inner re2 down ${active["1"] ? 'active' : ''}`}>
                                                {/*<div className="inner re2 down">*/}
                                                    <span className="schk">
                                                        <input type="checkbox" name="termCheck" id="termsCheck99"
                                                            // onClick="doSelectCheck(this,'fvr')"
                                                               onClick={(e) => doSelectCheck(e.currentTarget, 'fvr')}
                                                            value="999999"/>
                                                        <label htmlFor="termsCheck99">혜택정보 수신동의 (선택)</label>
                                                        <input type="hidden" name="agrYn" id="agrYn" value="N"/>
                                                    </span>
                                                    <a // href="javascript:void(0);"
                                                       className="rea2" onClick={(e) => doToggleReception(e.currentTarget, 1)}>
                                                            <span className="hidden">혜택정보 수신동의 (선택)</span>
                                                    </a>
                                                </div>
                                                <div className="reception two">수신 동의한 채널의
                                                    고객정보를 활용하며 이벤트,할인혜택,기획전 등 최신정보를 받아 보실 수
                                                    있습니다. 수신 거부해도 주문내역 및 회사의 주요정책 관련 공지내용은
                                                    발송됩니다.
                                                    <div id="fvr">
                                                        <span className="check">
                                                            <input id="fvrEmailAgrYn" name="fvrEmailAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="fvrEmailAgrYn">이메일</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="fvrAltalkAgrYn" name="fvrAltalkAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="fvrAltalkAgrYn">카카오 알림톡</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="fvrPushAgrYn" name="fvrPushAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="fvrPushAgrYn">PUSH</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="fvrSmsAgrYn" name="fvrSmsAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="fvrSmsAgrYn">문자</label>
                                                        </span>
                                                        <span className="check">
                                                            <input id="fvrPostAgrYn" name="fvrPostAgrYn" type="checkbox"
                                                                // onClick="doCheckAgrYn(this);"
                                                                onClick={(e) => doCheckAgrYn(e.currentTarget)}
                                                            />
                                                            <label htmlFor="fvrPostAgrYn">우편물</label>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <div className="btnArea mgt_20">
                            <a // href="javascript:void(0);"
                               className="lbtn btn-large disable" id="agreeConfirm">확인</a>
                        </div>
                    </div>

                </section>

                <div className="full-layer">
                    <div className="popWrap">
                        <div className="pop-header">
                            <div className="pop-tit">
                                <h1 className="pop-name">이용약관</h1>
                                <a href="#" className="btnClose full-pop-close">닫기</a>
                            </div>
                        </div>
                        <div className="pop-cont">
                            <div className="termTxt"></div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>

        </>
  );
}

export default App;
