import $ from 'jquery';
import {useRef} from "react";
import Footer from "./Footer";
import * as common from "./js/common";
import * as mypage from "./js/mypage";
import UpdateTab from "./UpdateTab";

function App() {
    // 배송지 조회
    function getAddressList() {
        $.ajax({
            url : '/mypage/s_MyPageAddressList.json',
            data : '',
            dataType : 'json',
            type : 'post',
            success : function(data) {
                var result = data.result;
                createAddress(result);
            },
            error : function(data) {
                common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
            }
        });
    }

    // 배송지 추가
    function createAddress(data) {
        $('.nodata').hide();
        $('.addr').hide();
        $('.addrItem', $('#addressBody')).remove();

        var rowCnt = data.length;

        if(rowCnt > 0) {
            $('.addr').show();
            for(var i = 0; i < rowCnt; i++) {

                var item = $('[data-id=item]', $('#template')).clone();
                item.addClass('addrItem');
                if(rowCnt == 1) {
                    item.find('[data-id=dlvpYnIcon]').removeAttr('onclick');
                }
                $('[data-id=dlvpYn]', item).hide();
                $('[data-id=baseDlvpYnBtn]', item).hide();

                if(i != rowCnt - 1) {
                    $('[data-id="addrTitle"]', item).remove();
                    $('.addressArea', item).removeClass('mgt_25');
                    $('.box3', item).attr('class', 'box4');
                }

                var obj = data[i];
                for(var key in obj) {
                    var value = obj[key];

                    if(key == 'cellNo') {
                        value = value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
                    }

                    if(key == 'baseDlvpYn' && value == 'Y') {

                        $('[data-id=dlvpYnIcon]', item).addClass('select');
                    } else if(key == 'baseDlvpYn' && value != 'Y') {

                        $('[data-id=dlvpYnIcon]', item).removeClass('select');
                    }

                    if(key == 'dlvpSn' || key == 'baseDlvpYn') {
                        $('[data-id=' + key + ']', item).val(value);
                    } else {
                        $('[data-id=' + key + ']', item).text(value);
                    }

                }

                $('#addressBody').append(item);
            }
        } else {
            $('.nodata').show();
        }

    }

    // 배송지 업데이트
    function updateAddrMove(e) {
        // var url = "/mypage/s_MyPageAddrUpdate.do";
        var url = "/modifyAddress";
        var dlvpSn = $(e).closest('[data-id="item"]').find('[data-id="dlvpSn"]').val();
        var data = {
            dlvpSn : dlvpSn
        }

        common.createTargetFormSubmit({
            id : "addressDetailForm",
            url : url,
            target : '_self',
            data : data
        });
    }

    // 배송지 삭제
    function deleteAddress(e) {
        var len = $('#addressBody').find('[data-id="item"]').length;
        var msg = '';
        if(len < 2) {
            msg = '주소 정보를 삭제하시겠습니까?';
        } else {
            msg = '주소 정보를 삭제하시겠습니까?<br/>기본주소를 삭제하시면 등록된 다른 주소가 기본주소로 자동 설정됩니다.';
        }

        common.cmnConfirmLayer(msg, function () {
            var dlvpSn = $(e).closest('[data-id="item"]').find('[data-id="dlvpSn"]').val();
            var baseDlvpYn = $(e).closest('[data-id="item"]').find('[name=baseDlvpYn]').val();

            var formData = {
                dlvpSn : dlvpSn
                , baseDlvpYn : baseDlvpYn
            }

            $.ajax({
                url : '/mypage/s_MyPageAddressDelete.json',
                data : formData,
                dataType : 'json',
                type : 'post',
                success:function(data) {
                    var status = data.status;

                    if(status == 'succ') {
                        common.cmnAlertLayer('btn1','삭제 하였습니다.', function() {
                            getAddressList();
                        });

                    } else {
                        common.cmnAlertLayer('btn1','실패 하였습니다.');
                    }
                },
                error:function(data) {
                    common.cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
                }
            });
        });
    }

    return(
        <>
            <div id="header" className="center">
                <div className="header_top center">
                    <a href="/mypage" className="btnPrev">이전</a>
                    <h1>개인정보수정</h1>
                </div>
            </div>

            <div id="content">
                {/*<div className="tab02 slideTab">*/}
                {/*    <ul className="swiper-wrapper tab">*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageBase.do" className="type1">기본정보</a></li>*/}
                {/*        <li className="swiper-slide current"><a href="#none" className="type2">배송지관리</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageExtra.do" className="type3">부가정보</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/foreign/mypage/s_MyPageCompanion.do" className="type3">나의여행자</a></li>*/}
                {/*        <li className="swiper-slide"><a href="/mypage/s_MyPageConsent.do" className="type3">정보수신동의여부</a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                <UpdateTab name="address"/>

                <section className="mgb_0">
                    <div className="nodata"
                         // style={{display: "block"}}
                         style={{display: "none"}}
                    >
                        <strong>등록된 주소가 없습니다.</strong>
                        <p>하단의 신규 주소 등록 버튼을 눌러<br/> 주소를 추가해 주세요.</p>
                    </div>
                    <div className="box8 addr"
                         style={{display: "block"}}
                         // style={{display: "none"}}
                    >
                        <h2 className="tit2">주소관리</h2>
                    </div>
                    <div className="addressWrap addr" id="addressBody"
                         style={{display: "block"}}
                        // style={{display: "none"}}
                    >
                        <div className="addressArea addrItem" data-id="item">
                            <input type="hidden" data-id="dlvpSn" name="dlvpSn" value="21001"/>
                            <input type="hidden" data-id="baseDlvpYn" name="baseDlvpYn" value="Y"/>
                            <div className="top">
                                <div className="add-set"><a href="#none" data-id="dlvpYnIcon" className="select">기본 주소</a></div>
                                <div>
                                    <a href="#none"
                                       // onClick="updateAddrMove(this);"
                                       onClick={(event) => updateAddrMove(event.currentTarget)}
                                    >수정</a>
                                    <a href="#none"
                                       // onClick="deleteAddress(this);"

                                       onClick={(event) => deleteAddress(event.currentTarget)}
                                    >삭제</a>
                                </div>
                            </div>
                            <div className="infotxt">
                                <div className="tit"><span data-id="rmitNm">ㅁㅁㅁ</span>(<span data-id="dlvpNm">회사</span>)</div>
                                <p>
                                    [<span data-id="postNo">06197</span>]
                                    <span data-id="postAddress">서울 강남구 선릉로86길 26 (대치동)  4층</span>
                                </p>
                                <p className="phone" data-id="cellNo">010-1234-5678</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="box2">
                        <div className="btnArea">
                            <a href="/addAddress" className="lbtn filled btn-large mgt_10"
                               style={{background: "#466cc2"}}>신규 주소 등록</a>
                        </div>
                    </div>
                </section>
            </div>

            {/*<div id="template" style={{display: "none"}}>*/}
            {/*    <div className="addressArea" data-id="item">*/}
            {/*        <input type="hidden" data-id="dlvpSn" name="dlvpSn" value=""/>*/}
            {/*        <input type="hidden" data-id="baseDlvpYn" name="baseDlvpYn" value=""/>*/}
            {/*        <div className="top">*/}
            {/*            <div className="add-set"><a href="#none" data-id="dlvpYnIcon" onClick="updateAddrDlvpYn(this);">기본 주소</a></div>*/}
            {/*            <div>*/}
            {/*                <a href="#none" onClick="updateAddrMove(this);">수정</a>*/}
            {/*                <a href="#none" onClick="deleteAddress(this);">삭제</a>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="infotxt">*/}
            {/*            <div className="tit">*/}
            {/*                <span data-id="rmitNm">홍길동</span>*/}
            {/*                (<span data-id="dlvpNm">우리집</span>)*/}
            {/*            </div>*/}
            {/*            <p>[<span data-id="postNo">06197</span>] <span data-id="postAddress">서울시 서초구 선릉로86길 26,  2층</span></p>*/}
            {/*            <p className="phone" data-id="cellNo">010-1234-5678</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Footer/>
        </>
  );
}

export default App;
