import {useEffect, useRef} from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import $ from 'jquery';
import * as common from "./js/common";
import * as mypage from "./js/mypage";
import * as find from "./js/find";
import './css/Postcode.css';
import Footer from "./Footer";

function App(props) {
    document.getElementsByTagName('body')[0].classList.add('sub');

    const currentScroll = useRef();

    const openPostcode = (e) => {
        var $open_btn = $(e.currentTarget);
        var $el = $("#addr-layer");
        $el.css("z-index", "102");

        $("body").append($("<div id='dimmd-layer'></div>"));
        $el.attr("tabindex", "0").fadeIn().focus();

        $el.find('.full-pop-close').click(function(){
            $("#dimmd-layer").remove();
            $el.fadeOut().removeAttr("tabindex");
            $el.css("z-index", "20");
            $open_btn.focus();
            return false;
        });

        e.preventDefault();

        // 현재 scroll 위치를 저장해놓는다.
        // var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        currentScroll.current = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        console.log(currentScroll.current);

        // element_wrap.style.display = 'block';
        document.getElementById("addr-layer").style.display = 'block';
    }

    const handleComplete = (data) => {
        var $open_btn = $(".search-zipcode");
        var $el = $("#addr-layer");
        $("#dimmd-layer").remove();
        $el.fadeOut().removeAttr("tabindex");
        $open_btn.focus();
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ''; // 도로명 조합형 주소 변수

        // 법정동명이 있을 경우 추가한다.
        if(data.bname !== ''){
            extraRoadAddr += data.bname;
        }
        // 건물명이 있을 경우 추가한다.
        if(data.buildingName !== ''){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if(extraRoadAddr !== ''){
            extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
        if(fullRoadAddr !== ''){
            fullRoadAddr += extraRoadAddr;
        }else{
            //도로명 주소가 없는 경우 지번 주소로 대체한다.
            fullRoadAddr =  data.jibunAddress;
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        //document.getElementById("sample4_postcode1").value = data.postcode1;
        //document.getElementById("sample4_postcode2").value = data.postcode2;
        //document.getElementById("sample4_roadAddress").value = fullRoadAddr;
        //document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

        //6자리 우편번호
        //$("#"+post1_id).val(data.postcode1);
        //$("#"+post2_id).val(data.postcode2);

        //$("#"+post_id).val(data.zonecode); //5자리 새우편번호 사용

        //6자리 우편번호 없으면 5자리 우편번호로
        if(data.postcode1 =='' & data.postcode2=='') {
            $("#postNo").val(data.zonecode);
        } else {
            $("#postNo").val(data.postcode1 + data.postcode2);
        }

        $("#postAddr").val(fullRoadAddr);
        $("#postAddrDtl").focus();

        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        /* if(data.autoRoadAddress) {
            //예상되는 도로명 주소에 조합형 주소를 추가한다.
            var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            document.getElementById("guide").innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

        } else if(data.autoJibunAddress) {
            var expJibunAddr = data.autoJibunAddress;
            document.getElementById("guide").innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

        } else {
            document.getElementById("guide").innerHTML = '';
        } */


        // iframe을 넣은 element를 안보이게 한다.
        // element_wrap.style.display = 'none';
        document.getElementById("addr-layer").style.display = 'none';

        // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
        document.body.scrollTop = currentScroll.current;
    };

    function insertAddress() {
        if(validation($("#mypageAddrInsertForm"))) {
            return;
        }

        // var formData = $("#mypageAddrInsertForm").serializeJson();
        var formData = $("#mypageAddrInsertForm").serialize();

        // if($('#baseDlvpYn', $("#mypageAddrInsertForm")).is(":checked")) {
        if($('#baseDlvpYn').is(":checked")) {
            // formData.baseDlvpYn = 'Y';
            formData += '&baseDlvpYn=Y';
        } else {
            // formData.baseDlvpYn = 'N';
            formData += '&baseDlvpYn=N';
        }

        // if(orderCnt == 0) {
        //     formData.baseDlvpYn = 'Y';
        // }

        // formData.postNo = $('#postNo').val();
        // formData.postAddr = $('#postAddr').val();
        formData += '&postNo=' + $('#postNo').val();
        formData += '&postAddr=' + $('#postAddr').val();

        $.ajax( {
            url : '/mypage/s_MyPageAddressInsert.json',
            data : formData,
            // data : encodeURI(formData),
            dataType : 'json',
            type : 'post',
            success:function(data) {
                var status = data.status;

                if(status == 'succ') {
                    common.cmnAlertLayer('btn1','등록하였습니다.', function() {
                        window.location.href = "/updateAddr";
                    });

                } else {
                    common.cmnAlertLayer('btn1','실패하였습니다.');
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    function validation(form) {
        var flag = false;

        // var dbtype = $('[data-dbtype]', form);
        var dbtype = $('[data-dbtype]');

        var typeCnt = dbtype.length;
        for(var i = 0; i < typeCnt; i++) {
            var $type = $(dbtype[i]).attr('data-dbtype');
            var $msg = $(dbtype[i]).attr('data-dbmsg');
            var $val = $(dbtype[i]).val();

            if($type == 'input' && $val == '') {
                alert($msg);
                flag = true;
                break;
            }
        }

        return flag;
    }

    function detailAddr() {
        var dlvpSn = $('#dlvpSn').val();

        var formData = {
            dlvpSn : dlvpSn
        }

        $.ajax({
            url : '/mypage/s_MyPageAddressDetail.json',
            data : formData,
            dataType : 'json',
            type : 'post',
            success:function(data) {
                var detail = data.detail;
                var dbtype = $('[data-dbtype]', $('#mypageAddrUpdateForm'));
                var typeCnt = dbtype.length;
                for(var i = 0; i < typeCnt; i++) {

                    var name = $(dbtype[i]).attr('name');

                    for(let key in detail) {

                        if(name == key) {

                            var $val = detail[key];
                            var type = $(dbtype[i]).attr('data-dbtype');
                            console.log(type);
                            if(type == 'input' || type == 'select') {

                                $(dbtype[i]).val($val);
                            } else if(type == 'check') {

                                if($val == 'Y') {
                                    $('#baseDlvp').val($val);
                                    $(dbtype[i]).prop('checked', true);
                                } else {

                                    $(dbtype[i]).prop('checked', false);
                                }
                            }
                        }
                    }
                }
            },
            error:function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    useEffect(() => {
        if (props.title == "배송지 수정") {
            detailAddr();
            // $(document).on("click","#postBtn",function(){
            //     var pop = window.open("/common/jusoSearchPopup.do","pop","width=570,height=420, scrollbars=yes, resizable=yes");
            // });
        }

        $(document).on("keypress, keyup", ".onlyNum", function(e) {
            $(this).val($(this).val().replace(/[^0-9]/gi, ""));
        });
    }, [])

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="javascript:void(0);" onClick={() => find.doHistoryBack()} className="btnClose">닫기</a>
                    <h1>{props.title}</h1>
                </div>
            </div>

            <div id="content">
                <section>
                    <div className="box2">
                        <form name="mypageAddrInsertForm" id="mypageAddrInsertForm" method="post">
                            <div className="info_form">
                                <dl className="inputArea">
                                    <dt className="mgt_0">배송지명</dt>
                                    <dd>
                                        <input type="text" className="mgt_10" id="dlvpNm" name="dlvpNm"
                                               placeholder="배송지명을 입력해주세요" data-dbtype="input"
                                               data-dbmsg="배송지명을 입력해주세요."
                                               autoComplete="off"
                                        />
                                    </dd>
                                    <dt>수령자명</dt>
                                    <dd>
                                        <input type="text" className="mgt_10" id="rmitNm" name="rmitNm"
                                               placeholder="수령자명을 입력해주세요" data-dbtype="input"
                                               data-dbmsg="수령자명을 입력해주세요."
                                               autoComplete="off"
                                        />
                                    </dd>
                                    <dt>휴대폰번호</dt>
                                    <dd>
                                        <input type="text" className="mgt_10 onlyNum" id="cellNo" name="cellNo"
                                               placeholder="숫자만 입력해주세요" data-dbtype="input"
                                               data-dbmsg="휴대폰번호를 입력해주세요." maxLength="11"
                                               autoComplete="off"
                                        />
                                    </dd>
                                    <dt>
                                        배송주소
                                        <span className="check schk">
                                            <input type="checkbox" id="baseDlvpYn" name="baseDlvpYn"
                                                   readOnly="readonly"
                                                   autoComplete="off"
                                            />
                                            <label htmlFor="baseDlvpYn">기본주소로 설정</label>
                                        </span>
                                    </dt>

                                    <div id="addr-layer" className="full-layer">
                                        <div className="popWrap">
                                            <div className="pop-header">
                                                <div className="pop-tit center">
                                                    <h1 className="pop-name">주소검색</h1>
                                                    <a href="#" className="btnClose full-pop-close"
                                                       onClick={() => {document.getElementById("addr-layer").style.display = "";}}
                                                    >닫기</a>
                                                </div>
                                            </div>
                                            <div className="pop-cont" style={{paddingTop: "12px"}}>
                                                <div id="zipcode-wrap"
                                                     style={{borderBottom: "solid 1px #ccc", width: "100%",
                                                         height: "100%", position: "relative", left: 0, top: 0, zIndex: 9999}}>
                                                    <DaumPostcodeEmbed
                                                        autoClose={false}
                                                        onComplete={handleComplete}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <dd>
                                        <p className="input_inline">
                                            <a href="javascript:void(0);"
                                               className="mbtn mgt_10 lbtn filled btn-large mgr_5 search-zipcode"
                                               style={{background: "#466cc2", border: "1px solid #466cc2"}}
                                               data-post_id="postNo" data-addr1_id="postAddr"
                                               data-addr2_id="postAddrDtl"
                                               onClick={(e) => openPostcode(e)}
                                            >주소검색</a>
                                            <input type="text" className="mgt_10" id="postNo" name="postNo"
                                                   placeholder="도로명, 지번, 건물명 검색" data-dbtype="input"
                                                   data-dbmsg="배송주소를 검색해주세요."
                                                   disabled autoComplete="off"
                                            />
                                        </p>
                                        <input type="text" className="mgt_10" id="postAddr" name="postAddr"
                                               placeholder="주소 입력" data-dbtype="input" data-dbmsg="배송주소를 검색해주세요."
                                               disabled autoComplete="off"
                                        />
                                        <input type="text" className="mgt_10" id="postAddrDtl"
                                               name="postAddrDtl" placeholder="상세 주소 입력" data-dbtype="input"
                                               data-dbmsg="배송주소를 검색해주세요."
                                               autoComplete="off"
                                        />
                                    </dd>
                                </dl>
                                <div className="btnArea mgt_30">
                                    <a href="#none" className="lbtn btn-large filled"
                                       style={{background: "#466cc2", border: "1px solid #466cc2"}}
                                       // onClick="insertAddress();"
                                       onClick={() => insertAddress()}
                                    >{props.title == "배송지 수정" ? "수정" : "등록"}</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
  );
}

export default App;
