import $ from "jquery";

export const doHistoryBack = () => {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href="/";
    }
}

export const createTargetFormSubmit = (result) => {
    $("#" + result.id + "Form").remove();
    var html = [];
    if (result.target != null && result.target != undefined) {
        html.push("<form name=\"" + result.id + "Form\" id=\"" + result.id + "Form\" action=\"" + result.url + "\" target=\"" + result.target + "\" method=\"post\">");
    } else {
        html.push("<form name=\"" + result.id + "Form\" id=\"" + result.id + "Form\" action=\"" + result.url + "\" method=\"post\">");
    }

    if (result.data != null) {
        if (result.data.constructor == Object) {
            for ( var name in result.data) {
                html.push("<input type=\"hidden\" name=\"" + name + "\" value=\"" + result.data[name] + "\">");
            }
        } else if (result.data.constructor == Array) {
            for ( var i in result.data) {
                for ( var name in result.data[i]) {
                    html.push("<input type=\"hidden\" name=\"" + name + "\" value=\"" + result.data[i][name] + "\">");
                }
            }
        }
    }
    html.push("</form>");
    $("body").append(html.join(''));
    $("#" + result.id + "Form").submit();
}

export const cmnAlertLayer = (targetId, msg, callback) => {
    // var $open_btn = $("#" + targetId);
    var $open_btn = targetId != "" ? $("#" + targetId) : "";

    $("input").each(function() {
        var $element = $(this);
        if ($element.attr("readonly") != 'readonly') {
            $element.attr("readonly", true);
            $element.addClass("LAYER");
        }
    });

    var html = [];

    html.push("<div id='" + targetId + "_layer' class='alert-box'>");
    html.push("<div class='popWrap'>");
    html.push("<div class='alert-cont'>");
    html.push(msg);
    html.push("</div>");
    html.push("<div class='btnArea mgt_20'>");
    html.push("<a href='#none' class='lbtn btn-m filled alert-close' style='background: #466cc2; border:1px solid #466cc2'>확인</a>");
    html.push("</div>");
    html.push("</div>");
    html.push("</div>");
    $("body").append(html.join(""));

    var $el = $("#" + targetId + "_layer");
    // $("body").append($("<div id='dimmd-layer'></div>"));
    $("body").append($("<div class='dimmd-layer'></div>"));
    $el.attr("tabindex", "0").fadeIn().focus();

    var $elWidth = $el.outerWidth(),
        $elHeight = $el.outerHeight(),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('.alert-close').click(function(){
        // $("#dimmd-layer").remove();
        // $("body").children("#dimmd-layer").remove();
        $("body").children(".dimmd-layer").eq(0).remove();
        $(".alert-box").remove();
        $(".LAYER").attr("readonly", false);
        $(".LAYER").removeClass("LAYER");
        $el.fadeOut().removeAttr("tabindex");
        // $open_btn.focus();
        if ($open_btn != "") {
            $open_btn.focus();
        }
        if(typeof callback != 'undefined' && callback != null) {
            callback();
        }

        return false;
    });
};

export const cmnConfirmLayer = (msg, func) => {
    $("input").each(function() {
        var $element = $(this);
        if ($element.attr("readonly") != 'readonly') {
            $element.attr("readonly", true);
            $element.addClass("LAYER");
        }
    });

    var html = [];

    html.push("<div id='confirm_layer' class='alert-box'>");
    html.push("<div class='popWrap'>");
    html.push("<div class='alert-cont'>");
    html.push(msg);
    html.push("</div>");
    html.push("<div class='btnArea mgt_20'>");
    html.push("<a href='#none' class='lbtn btn-m filled-g alert-close' >취소</a>");
    html.push("<a href='#none' class='lbtn btn-m filled btn_ok' style='background: #466cc2; border:1px solid #466cc2'>확인</a>");
    html.push("</div>");
    html.push("</div>");
    html.push("</div>");
    $("body").append(html.join(""));

    var $el = $("#confirm_layer");
    $("body").append($("<div id='dimmd-layer'></div>"));
    $el.attr("tabindex", "0").fadeIn().focus();

    var $elWidth = $el.outerWidth(),
        $elHeight = $el.outerHeight(),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('.alert-close').click(function(){
        $("#dimmd-layer").remove();
        $(".alert-box").remove();
        $(".LAYER").attr("readonly", false);
        $(".LAYER").removeClass("LAYER");
        $el.fadeOut().removeAttr("tabindex");
        return false;
    });

    $el.find('.btn_ok').click(function(){
        $("#dimmd-layer").remove();
        $(".alert-box").remove();
        $(".LAYER").attr("readonly", false);
        $(".LAYER").removeClass("LAYER");
        $el.fadeOut().removeAttr("tabindex");
        if (func != "" && func != undefined && func != null && func != 'null') {

            eval(func)();
        }
        return false;
    });
};

export const pagingHtmlTag = ($pageObj, pageInfoVO, fNm) => {
    //페이징 처리
    var firstPageNo = pageInfoVO.firstPageNo;
    var firstPageNoOnPageList = pageInfoVO.firstPageNoOnPageList;
    var totalCount = pageInfoVO.totalCount;
    var totalPageCount = pageInfoVO.totalPageCount;
    var pageSize = pageInfoVO.pageSize;
    var lastPageNoOnPageList = pageInfoVO.lastPageNoOnPageList;
    var currentPageNo = pageInfoVO.pageNo;
    var lastPageNo = pageInfoVO.lastPageNo;
    var arrHtml         = [];
    var isFunction = true;

    if(typeof fNm == 'undefined') {
        isFunction = false;
    }

    if(totalCount > 0){

        arrHtml.push("<ul>");

        if(currentPageNo > 1) {
            if(isFunction) {
                arrHtml.push("<li><a href='javascript:void(0);' onclick='javascript:"+fNm+"("+firstPageNo+");' class='first'><span class='hdn'>맨앞으로</span></a></li>");
            } else {
                arrHtml.push("<li><a href='javascript:void(0);' pageNo='"+firstPageNo+"' class='first'><span class='hdn'>맨앞으로</span></a></li>");
            }

        } else {
            arrHtml.push("<li><a href='javascript:void(0);' class='first'><span class='hdn'>맨앞으로</span></a></li>");
        }

        if(currentPageNo > 1 && totalPageCount > pageSize){
            if (firstPageNoOnPageList > pageSize) {
                if(isFunction) {
                    arrHtml.push("<li><a href='javascript:void(0);' onclick='javascript:"+fNm+"("+(firstPageNoOnPageList - 1)+");' class='prev'><span class='hdn'>이전</span></a></li>");
                } else {
                    arrHtml.push("<li><a href='javascript:void(0);' pageNo='"+(firstPageNoOnPageList - 1)+"' class='prev'><span class='hdn'>이전</span></a></li>");
                }
            } else {
                if(isFunction) {
                    arrHtml.push("<li><a href='javascript:void(0);' onclick='javascript:"+fNm+"("+firstPageNo+");' class='prev'><span class='hdn'>이전</span></a></li>");
                } else {
                    arrHtml.push("<li><a href='javascript:void(0);' pageNo='"+firstPageNo+"' class='prev'><span class='hdn'>이전</span></a></li>");
                }
            }
        }else{
            arrHtml.push("<li><a href='javascript:void(0);' class='prev'><span class='hdn'>이전</span></a></li>");
        }

        if(totalPageCount > 0){
            for (var i = firstPageNoOnPageList; i <= lastPageNoOnPageList; ++i) {
                if (i == currentPageNo) {
                    arrHtml.push("<li class='on'><a href='javascript:void(0);'><span>"+i+"</span></a></li>");
                } else {
                    if(isFunction) {
                        arrHtml.push("<li><a href='javascript:void(0);' onclick='javascript:"+fNm+"("+i+");'>"+i+"</a></li>");
                    } else {
                        arrHtml.push("<li><a href='javascript:void(0);' pageNo='"+i+"'>"+i+"</a></li>");
                    }
                }
            }
        }else{
            arrHtml.push("<li><a href='javascript:void(0);'><span class='active'>1</span></a></li>");
        }

        if(lastPageNo > currentPageNo && totalPageCount > pageSize){
            if (lastPageNoOnPageList < totalPageCount) {
                if(isFunction) {
                    arrHtml.push("<li><a href='javascript:void(0);' onclick='javascript:"+fNm+"("+(firstPageNoOnPageList + pageSize)+");' class='next'><span class='hdn'>다음</span></a></li>");
                } else {
                    arrHtml.push("<li><a href='javascript:void(0);' pageNo='"+(firstPageNoOnPageList + pageSize)+"' class='next'><span class='hdn'>다음</span></a></li>");
                }
            } else {
                if(isFunction) {
                    arrHtml.push("<li><a href='javascript:void(0);' onclick='javascript:"+fNm+"("+lastPageNo+");' class='next'><span class='hdn'>다음</span></a></li>");
                } else {
                    arrHtml.push("<li><a href='javascript:void(0);' pageNo='"+lastPageNo+" class='next'><span class='hdn'>다음</span></a></li>");
                }
            }
        }else{
            arrHtml.push("<li><a href='javascript:void(0);' class='next'><span class='hdn'>다음</span></a></li>");
        }

        if(lastPageNo > currentPageNo) {
            if(isFunction) {
                arrHtml.push("<li><a href='javascript:void(0);' onclick='javascript:"+fNm+"("+lastPageNo+");' class='last'><span class='hdn'>맨뒤로</span></a></li>");
            } else {
                arrHtml.push("<li><a href='javascript:void(0);' pageNo='"+lastPageNo+"' class='last'><span class='hdn'>맨뒤로</span></a></li>");
            }
        }else{
            arrHtml.push("<li><a href='javascript:void(0);' class='last'><span class='hdn'>맨뒤로</span></a></li>");
        }

        arrHtml.push("</ul>");

    }else{
        arrHtml.push("");
    }

    $pageObj.html(arrHtml.join(''));

};

export const dateFormat = (date, type) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var day = date.getDate();
    day = day < 10 ? '0' + day : day;
    var time = '';
    if(typeof type != 'undefined') {
        var hours = date.getHours();	// 시간
        hours = hours < 10 ? '0' + hours : hours;
        var minutes = date.getMinutes();	// 분
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var seconds = date.getSeconds();	// 초
        seconds = seconds < 10 ? '0' + seconds : seconds;
        time = ' ' + hours + ':' + minutes + ':' + seconds
    }
    return year + '-' + month + '-' + day + time;
}

export const questionSearch = (page) => {
    $("#formSrch").find('#pageNo').val(page);
    getQuestionList();
}

export const getQuestionList = () => {
    // var param = $("#formSrch").serializeJson();
    var param = $("#formSrch").serialize();

    $.ajax( {
        url : '/newnotice/s_QuestionList.do',
        data : param,
        dataType : 'json',
        type : 'post',
        success : function(data) {
            var tViewHtml = '';
            var pageInfoVO = data.pageInfoVO;
            var totalCount = pageInfoVO.totalCount;
            $('#cnt').text('총 ' + totalCount + '건');
            var questionList = data.questionList;
            var rowCnt = 0;
            if(questionList != null) {
                rowCnt = questionList.length;
            }

            if(rowCnt > 0 ) {
                for(var i = 0; i < rowCnt; i++) {
                    var obj = questionList[i];

                    var rplyYn = obj.rplyYn;
                    var onoStatCd = obj.onoStatCd;
                    var sctNm = obj.sctCdNm;
                    var tit = obj.tit;
                    var cont = obj.cont;
                    var rplyTit = obj.rplyTit;
                    var rplyCont = obj.rplyCont;
                    var sysRegDtime = obj.sysRegDtime;
                    var date = new Date(sysRegDtime);
                    sysRegDtime = dateFormat(date, 'time');

                    var sysModDtime = obj.sysModDtime;
                    date = new Date(sysModDtime);
                    sysModDtime = dateFormat(date, 'time');

                    tViewHtml += '<div class="qnaCont">';
                    tViewHtml += '	<input type="hidden" id="bbSn" name="bbSn" value="'+obj.bbSn+'">';
                    tViewHtml += '	<div class="top">';
                    if(rplyYn == 'Y') {

                        tViewHtml += '		<div class="state complete">답변완료</div>';
                    } else {

                        tViewHtml += '		<div class="state ready">답변대기</div>';
                    }
                    tViewHtml += sctNm;

                    tViewHtml += '			<div class="floatright">';
                    if(onoStatCd == '02') {

                        tViewHtml += '<a href="javascript:void(0);" onclick="questionDelete(this);">삭제</a>';
                    } else {

                        tViewHtml += '<a href="javascript:void(0);" onclick="questionUpdate(this);">수정</a>';
                        tViewHtml += '<a href="javascript:void(0);" onclick="questionDelete(this);">삭제</a>';
                    }
                    tViewHtml += '			</div>';
                    tViewHtml += '		</div>';
                    tViewHtml += '		<div class="q-title"><span>Q</span>' + tit + '<p>' + sysRegDtime + '</p></div>';
                    tViewHtml += '		<div class="a-cont" style="display: none;">';
                    tViewHtml += '			<div class="answer01">' + cont + '</div>';
                    if(onoStatCd == '02') {

                        tViewHtml += '<div class="a-title mgt_30"><span>A</span>' + rplyTit + '<p>' + sysRegDtime + '</p></div>';
                        tViewHtml += '<div class="answer02">' + rplyCont + '</div>';
                    }
                    tViewHtml += '	</div>';
                    tViewHtml += '</div>';

                }

            } else {
                tViewHtml += '<div class="nodata empty-notice">';
                tViewHtml += '	<strong>게시글이 없습니다.</strong>';
                tViewHtml += '</div>';
            }

            //페이징
            pagingHtmlTag($("#pagingList"),pageInfoVO,'questionSearch');

            $(".qnaList .totalNum #totNum").html(pageInfoVO.totalCount);

            $('#questionList').html(tViewHtml);
        }
        , error : function(data) {
            cmnAlertLayer('btn1','시스템 장애입니다. 잠시후에 다시 시도해 주십시요.');
        }
    });
}


$(document).ready(function() {
    resize();
    $(window).resize(resize);
});

function resize(){
    var topHei = $('.allmenu .top').height();
    //  $('.allmenu .depth, .allmenu .depth2').css('padding-top',topHei+'px');
    var winHei = $(window).height();
    $('.allmenu .depth, .allmenu .depth2').css('height',winHei-topHei+'px');
}

$(function(){
    //tab
    // $('.tabArea ul.tab li').click(function() {
    //var activeTab = $(this).attr('data-tab');
    //$('.tabArea ul.tab li').removeClass('current');
    //$('.tabArea .tabcontent').removeClass('current');
    //$(this).addClass('current');
    //$('#' + activeTab).addClass('current');
    //});
    //$('.s-tabArea ul.tab li').click(function() {
    //var activeTab = $(this).attr('data-tab');
    //$('.s-tabArea ul.tab li').removeClass('current');
    //$('.s-tabArea .tabcontent').removeClass('current');
    //$(this).addClass('current');
    //$('#' + activeTab).addClass('current');
    //});
    $('.tab02 ul.tab li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.tab02 ul.tab li').removeClass('current');
        $('.tabArea2 .tabcontent').removeClass('current');
        $(this).addClass('current');
        $('#' + activeTab).addClass('current');
    });
    $('.faq-tab ul.tab li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.faq-tab ul.tab li').removeClass('current');
        $('.faq-tab .tabcontent').removeClass('current');
        $(this).addClass('current');
        $('#' + activeTab).addClass('current');
    });
    $('.review-tab ul.tab li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.review-tab ul.tab li').removeClass('current');
        //$('.review-tab .tabcontent').removeClass('current');
        $(this).addClass('current');
        //$('#' + activeTab).addClass('current');
    });
    //李쒗븯湲�
    $('.cmlike_btn .cmlike_ico .sr_off').click(function() {
        $(this).siblings('span.sr_on').show();
        $(this).hide();
    });
    $('.cmlike_btn .cmlike_ico .sr_on').click(function() {
        $(this).siblings('span.sr_off').show();
        $(this).hide();
    });

    //slide Tab


    //�섏쓽 �곷┰湲� �щ씪�대뱶
//     var swiper = new Swiper('.my_point', {
//         slidesPerView: 'auto',
//         spaceBetween: 10,
//         // loop: true,
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },
//     });
//     //硫붿씤�щ씪�대뱶
//     var swiper = new Swiper('.mSlider01', {
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },
//         autoplay : {  // �먮룞 �щ씪�대뱶 �ㅼ젙 , 鍮� �쒖꽦�� �� false
//             delay : 3000,   // �쒓컙 �ㅼ젙
//             disableOnInteraction : false,  // false濡� �ㅼ젙�섎㈃ �ㅼ��댄봽 �� �먮룞 �ъ깮�� 鍮꾪솢�깊솕 �섏� �딆쓬
//         }
//     });
//     var swiper = new Swiper('.mSlider02', {
//         slidesPerView: 2.7,
//         spaceBetween: 10,
//     });
//     var swiper = new Swiper('.mSlider03', {
//         slidesPerView: 'auto',
//         pagination: {
//             el: ".swiper-pagination",
//             type: 'custom',
//             renderCustom: function (swiper, current, total) {
//                 return '<span>' + current + '</span>' + '/' + '<span>' + (total) + '</span>';
//             }
//         },
//     });
//     //�곹뭹紐⑸줉 �щ씪�대뱶
//     var swiper = new Swiper(".roomList-Slider", {
//         pagination: {
//             el: ".swiper-pagination",
//             type: 'custom',
//             renderCustom: function (swiper, current, total) {
//                 return '<span>' + current + '</span>' + '' + '<span>' + (total) + '</span>';
//             }
//         },
//     });
//     //�곹뭹�곸꽭 �щ씪�대뱶
//     var swiper = new Swiper(".roomDetail-Slider", {
//         pagination: {
//             el: ".swiper-pagination",
//             type: 'custom',
//             renderCustom: function (swiper, current, total) {
//                 return '<span>' + current + '</span>' + '' + '<span>' + (total) + '</span>';
//             }
//         },
//     });
//     //媛앹떎 �щ씪�대뱶
//     var swiper = new Swiper(".room-Slider", {
//         pagination: {
//             el: ".swiper-pagination",
//         },
//     });
//     //媛앹떎 �곸꽭�щ씪�대뱶
// //		var swiper = new Swiper(".room-layer-Slider", {
// //        pagination: {
// //          el: ".swiper-pagination",
// //        },
// //
// //      });

    //�앹뾽
    $('.btn_layer').on('click', function(e) {
        e.preventDefault();
        var el = $($(this).attr('href'));
        if (!el.hasClass('open')) {
            el.addClass('open');
        } else {
            el.removeClass('open');
        }
    });

    $('.btn_close_layer').on('click', function(e) {
        $(this).closest('.layer-popup').removeClass('open');
    });

    //select Box
    var select = $("select#slt");

    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });
    //go top
    //$("#go-top").click(function(){
    // $("html,body").animate({
    // scrollTop : 0
    // },500);
    // return false;
    //});
    //湲곌컙�ㅼ젙
    $(".term li a.set").click(function(){
        $(".data-set").slideToggle("fast");
        $(this).toggleClass("active");

        $(".term").closest("ul").find(".selected").removeClass();
    });
    //�섏떊�숈쓽
    $(".termsList li .re1 a").click(function(){
        $(".termsList li .first").slideToggle("fast");
        $(this).closest("div").toggleClass("active");
    });
    $(".termsList li .re2 a").click(function(){
        $(".termsList li .two").slideToggle("fast");
        $(this).closest("div").toggleClass("active");
    });
    $(".termsList li .re3 a").click(function(){
        $(".termsList li .third").slideToggle("fast");
        $(this).closest("div").toggleClass("active");
    });
    //�곷┰湲덉븞��
    $(".pointIntro .p1 .tit").click(function(){
        $(".pointIntro .p1 .introCont").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".pointIntro .p2 .tit").click(function(){
        $(".pointIntro .p2 .introCont").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".pointIntro .p3 .tit").click(function(){
        $(".pointIntro .p3 .introCont").slideToggle("fast");
        $(this).toggleClass("on");
    });
    //怨좉컼�쇳꽣
    $("#footer .csmr").click(function(){
        $(".csmrCont").slideToggle("fast");
        $(this).toggleClass("active");
    });
    //二쇰Ц�쒖옉��
    $(".orderInput .ordertit1").click(function(){
        $(".orderInput .orderCont1").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".orderInput .ordertit2").click(function(){
        $(".orderInput .orderCont2").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".orderInput .ordertit3").click(function(){
        $(".orderInput .orderCont3").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".orderInput .ordertit4").click(function(){
        $(".orderInput .orderCont4").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".orderInput .ordertit5").click(function(){
        $(".orderInput .orderCont5").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".orderInput .ordertit6").click(function(){
        $(".orderInput .orderCont6").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".orderInput .ordertit7").click(function(){
        $(".orderInput .orderCont7").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".hotel-info").click(function(){
        $(".roomInfo").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".roomsWrap .room-tit").click(function(){
        $(".roomsWrap .room-reserv").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".pop-cont .cancle-view-tit").click(function(){
        $(".pop-cont .p-cancle-txt").slideToggle("fast");
        $(this).toggleClass("on");
    });
    //�댁슜�쎄�
    $('.orderUseTerm .tit').click(function(){
        $(this).next('.orderUseTerm .UseTermCont').slideToggle();
        $(this).parent().toggleClass('on');
        $(this).parent().siblings().children('.orderUseTerm .UseTermCont').slideUp();
        $(this).parent().siblings().removeClass('on');
    });
    //荑좏룿�곸슜
    $(".select-form .apply").click(function(){
        $(".select-form ul").slideToggle("fast");
        $(this).toggleClass("on");
    });
    //1:1臾몄쓽 �덈궡
    $(".questionWrap .topIntro h2").click(function(){
        $(".questionWrap .topIntro .introTxt").slideToggle("fast");
        $(this).toggleClass("on");
    });
    //faq
    $('.faqList dt').click(function(){
        $(this).next('.faqList dd').slideToggle();
        $(this).parent().toggleClass('on');
        $(this).parent().siblings().children('.faqList dd').slideUp();
        $(this).parent().siblings().removeClass('on');
    });
    //faq
//   $('.qnaListWrap .q-title').click(function(){
    $(document).on("click", ".qnaListWrap .q-title", function(){
        $(this).next('.qnaCont .a-cont').slideToggle();
        $(this).parent().toggleClass('on');
        $(this).parent().siblings().children('.qnaCont .a-cont').slideUp();
        $(this).parent().siblings().removeClass('on');
    });

    //show more
    $('[data-show="more"]').on('click', function(event) {
        event.preventDefault();
        if ( $(this).attr('more-collapse') === 'false' ) {
            $(this).attr('more-collapse', 'true');
            $(this).prev('.more-text').removeClass('hide');
            $(this).text('�リ린');
            $(this).addClass('on');
        }  else {
            $(this).text('�붾낫湲�');
            $(this).attr('more-collapse', 'false');
            $(this).prev('.more-text').addClass('hide');
            $(this).removeClass('on');
        }
    });
    //filter
    $(".filter-opt01 dt a").click(function(){
        $(".filter-opt01 dd").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".filter-opt02 dt a").click(function(){
        $(".filter-opt02 dd").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".filter-opt03 dt a").click(function(){
        $(".filter-opt03 dd").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".filter-opt04 dt a").click(function(){
        $(".filter-opt04 dd").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".filter-opt05 dt a").click(function(){
        $(".filter-opt05 dd").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".filter-opt06 dt a").click(function(){
        $(".filter-opt06 dd").slideToggle("fast");
        $(this).toggleClass("on");
    });
    $(".filter-opt07 dt a").click(function(){
        $(".filter-opt07 dd").slideToggle("fast");
        $(this).toggleClass("on");
    });
});

$(function () {
    var goTop = $('#go-top');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 800) {
            goTop.addClass('show');
        } else {
            goTop.removeClass('show');
        }
    });

    goTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });
});

// $(function () {
//     layer_Pop();
//     layer_Pop2();
//     full_layer_Pop();
//     alert_Pop();
// });

//search Popup
// var layer_Pop = function() {
//     $(document).on('click','.pop-layer', function() {
//         var $href = $(this).attr('href');
//         var $open_btn = $(this);
//         layer_Pop($href);
//
//         function layer_Pop(el){
//             var $el = $(el);
//
//             $("body").append($("<div id='dimmd-layer'></div>"));
//             $el.attr("tabindex", "0").fadeIn().focus();
//
//             var $elWidth = $el.outerWidth(),
//                 $elHeight = $el.outerHeight(),
//                 docWidth = $(document).width(),
//                 docHeight = $(document).height();
//
//             if ($elHeight < docHeight || $elWidth < docWidth) {
//                 $el.css({
//                     marginTop: -$elHeight /2,
//                     marginLeft: -$elWidth/2
//                 })
//             } else {
//                 $el.css({top: 0, left: 0});
//             }
//
//             $el.find('.pop-close').click(function(){
//                 $("#dimmd-layer").remove();
//                 $el.fadeOut().removeAttr("tabindex");
//                 $open_btn.focus();
//                 return false;
//             });
//         }
//     })
// };

// var layer_Pop2 = function() {
//     $(document).on('click','.pop-layer2', function() {
//         var $href = $(this).attr('href');
//         var $open_btn = $(this);
//         layer_Pop2($href);
//
//         function layer_Pop2(el){
//             var $el = $(el);
//
//             $("body").append($("<div id='dimmd-layer'></div>"));
//             $el.attr("tabindex", "0").fadeIn().focus();
//
//             $el.find('.pop-close').click(function(){
//                 $("#dimmd-layer").remove();
//                 $el.fadeOut().removeAttr("tabindex");
//                 $open_btn.focus();
//                 return false;
//             });
//         }
//     })
// };
export var alert_Pop = function() {
    $(document).on('click','.alert-layer', function() {
        var $href = $(this).attr('onClick');
        var $open_btn = $(this);
        alert_Pop($href);

        function alert_Pop(el){
            var $el = $(el);

            $("body").append($("<div id='dimmd-layer'></div>"));
            $el.attr("tabindex", "0").fadeIn().focus();

            var $elWidth = $el.outerWidth(),
                $elHeight = $el.outerHeight(),
                docWidth = $(document).width(),
                docHeight = $(document).height();

            if ($elHeight < docHeight || $elWidth < docWidth) {
                $el.css({
                    marginTop: -$elHeight /2,
                    marginLeft: -$elWidth/2
                })
            } else {
                $el.css({top: 0, left: 0});
            }

            $el.find('.alert-close').click(function(){
                $("#dimmd-layer").remove();
                $el.fadeOut().removeAttr("tabindex");
                $open_btn.focus();
                return false;
            });
        }
    })
};


export var layer_Pop = function() {
    $(document).on('click','.pop-layer', function() {
        var $href = $(this).attr('href');
        var $open_btn = $(this);
        layer_Pop($href);

        function layer_Pop(el){
            var $el = $(el);

            // $("body").append($("<div id='dimmd-layer'></div>"));
            $("body").append($("<div class='dimmd-layer'></div>"));
            $el.attr("tabindex", "0").fadeIn().focus();

            var $elWidth = $el.outerWidth(),
                $elHeight = $el.outerHeight(),
                docWidth = $(document).width(),
                docHeight = $(document).height();

            if ($elHeight < docHeight || $elWidth < docWidth) {
                $el.css({
                    marginTop: -$elHeight / 2,
                    marginLeft: -$elWidth / 2
                })
            } else {
                $el.css({top: 0, left: 0});
            }

            while ($(".dimmd-layer").length > 1) {
                $(".dimmd-layer").eq(0).remove();
            }

            $el.find('.pop-close').click(function(){
                // $("#dimmd-layer").remove();
                $(".dimmd-layer").remove();
                $el.fadeOut().removeAttr("tabindex");
                $open_btn.focus();
                return false;
            });
        }
    })
};

export var full_layer_Pop = function() {
    $(document).on('click','.full-pop-layer', function() {
        var $href = $(this).attr('href');
        var $open_btn = $(this);
        full_layer_Pop($href);

        function full_layer_Pop(el){
            var $el = $(el);

            $el.attr("tabindex", "0").fadeIn().focus();

            $el.find('.full-pop-close').click(function(){
                $("#dimmd-layer").remove();
                $el.fadeOut().removeAttr("tabindex");
                $open_btn.focus();
                return false;
            });
            $el.attr("tabindex", "0").fadeIn().focus();

            // var swiper = new Swiper(".room-layer-Slider", {
            // 	pagination: {
            // 	  el: ".swiper-pagination",
            // 	},
            //
            // });
            // swiper.update();
        }
    })
};

var SCROLL_VAL = 0;
var limitBln_VAL = false;
var showBln_VAL = true;
$(window).scroll(function(){
    var currentScroll = $(this).scrollTop();

    if(currentScroll > 5){
        $('#mainHeader').addClass('sticky');
        if (SCROLL_VAL - currentScroll > 0) {
            if (showBln_VAL) {
//            $('.searchInputWrap').addClass('sticky sa2');
                $('.searchInputWrap').addClass('sticky');
                showBln_VAL = false;
                setTimeout(function() {showBln_VAL = true}, 600);
            }
        } else {
            if (showBln_VAL) {
//            $('#mainHeader').removeClass('sticky');
                $('.searchInputWrap').removeClass('sticky');
                showBln_VAL = false;
                setTimeout(function() {showBln_VAL = true}, 600);
            }
//         $('.searchInputWrap').addClass('sa sa-up');
        }
        limitBln_VAL = true;
    } else {
        $('#mainHeader').removeClass('sticky');
        $('.searchInputWrap').removeClass('sticky');
        if (limitBln_VAL) {
            if ($('.searchInputWrap').hasClass('sticky')) {
//            $('.searchInputWrap').addClass('sa sa-up');
                setTimeout(function() {
//               $('.searchInputWrap').removeClass('sticky');
//               $('.searchInputWrap').addClass('sa2 sa-up')
                }, 200)
                setTimeout(function() {
//               $('.searchInputWrap').removeClass('sa2 sa sa-up');
                }, 500)
//            limitBln_VAL = false;
            }
        }
    }

    SCROLL_VAL = $(this).scrollTop();

//   if($(this).scrollTop() > 250){
//      $('.searchInputWrap').addClass('sticky')
//   } else{
//      $('.searchInputWrap').removeClass('sticky')
//   }
//   if($(this).scrollTop() > 250){
//      $('#mainHeader').addClass('sticky')
//   } else{
//      $('#mainHeader').removeClass('sticky')
//   }
});

//寃��됱뼱
//$(function () {
//const inputBox = document.querySelector("input");
//const recommendBox = document.querySelector("#recommend");
//const texts = document.querySelectorAll(".text");
//
//inputBox.addEventListener("keyup", (e) => {
//   if (e.target.value.length > 0) {
//      inputBox.classList.add('on');
//      recommendBox.classList.remove('invisible');
//      texts.forEach((textEl) => {
//         textEl.textContent = e.target.value;
//      })
//   } else {
//      recommendBox.classList.add('invisible');
//      inputBox.classList.remove('on');
//   }
//})
//});

var waiting = {
    start : function() {
        $.blockUI({
            message : '<div class="loader"><span></span>'
        });
    },
    stop : function() {
        $.unblockUI();
    },
    startId : function(id) {
        $.blockUI({
            message : $("#" + id)
        });
    },
    stopId : function() {
        $.unblockUI();
    }

};

/*2022-10-31*/

$(document).ready(function () {
    $(".tab-content").hide();
    $(".tabs li:first").addClass("active").show();
    $(".tab-content:first").show();

    $(".tabs li").click(function() {
        $(".tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    });

    $(".table_cover").on("touchmove click",function  () {
        $(this).fadeOut(200);
    });

    $(".reset-reservation").click(function(){
        $('input[id^="seat-"]').prop("checked",false);
    });

});

export function s_logout() {
    window.location.href="/logout";
}

export const createForm = (cfg) => {
    if (!this.$form) {
        this.$form = $('<form></form>');
    }
    this.$form.empty();

    if (cfg.id != undefined) {
        this.$form.attr('id', cfg.id);
    }
    if (cfg.name != undefined) {
        this.$form.attr('name', cfg.name);
    }
    this.$form.attr('method', cfg.method || 'post');
    this.$form.attr('action', cfg.action || '');
    this.$form.attr('target', cfg.target || '_self');
    this.$body.append(this.$form);

    return this.$form;
};

export const formSubmit = () => {
    if (this.$form) {
        this.$form.submit();
    }
};

export const setSerializedFormData = (param) => {
    var resultStr = '';
    if (Object.prototype.toString.call(param) === '[object Object]') {
        var encodedParam = '';
        for ( var p in param) {
            if (param.hasOwnProperty(p)) {
                encodedParam = param[p];
                if (typeof encodedParam == 'string') {
//							encodedParam = encodedParam.replace(/\%/gm,'%25').replace(/\&/gm, '%26').replace(/\+/gm, '%2B');
//							encodedParam = encodedParam.replace(/\&/gm, '%26').replace(/\+/gm, '%2B');
                    //encodedParam = encodeURI(encodedParam);
                }
                var $hdnEl = $('<input type="hidden"></input>');
                $hdnEl.attr('name', p);
                $hdnEl.attr('value', encodedParam);
                this.$form.append($hdnEl);
            }
        }
    }
    return resultStr;
};

