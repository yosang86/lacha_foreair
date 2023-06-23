import $ from 'jquery';
import * as common from './js/common';
import './css/MyPage.css';
import Footer from "./Footer";

function MyPage() {
    document.getElementsByTagName('body')[0].classList.add('sub');

    function goDetail(orderNo){
        $("#ordNo").val(orderNo);

        // document.myPageForm.action = "/mypage/s_MyPageOrderDetailView.do";
        document.myPageForm.action = "orderDetail"
        document.myPageForm.submit();
    }

    return (
    <>
      {/*<header id="mainHeader">*/}
      {/*  <a href="/" className="home">*/}
      {/*      <img src="./images/main/m_logo_b_lacha.png" alt="HCC"/>*/}
      {/*  </a>*/}
      {/*  <a href="/mypage" className="topMenu">*/}
      {/*      <img src="./images/main/m_menu_b.png" alt="메뉴"/>*/}
      {/*  </a>*/}
      {/*</header>*/}

    {/*    #header .btnPrev {*/}
    {/*    position: absolute;*/}
    {/*    top: 16px;*/}
    {/*    left: 15px;*/}
    {/*    width: 20px;*/}
    {/*    height: 18px;*/}
    {/*    padding: 17px 0 0;*/}
    {/*    text-indent: -99999px;*/}
    {/*    background: url(../images/sub/btn_prev.png) no-repeat 50% 0;*/}
    {/*    background-size: 20px auto;*/}
    {/*    z-index: 2;*/}
    {/*}*/}

        <div id="header" className="center">
            <div className="header_top center">
                <a href="/" className="btnPrev">이전</a>
                <h1>나의 정보</h1>
            </div>
        </div>

        <main className="body">
            <div id="content">
                <form method="post" name="myPageForm" id="myPageForm">
                    <input type="hidden" name="ordNo" id="ordNo" value=""/>
                </form>

                <div id="content">
                    <div className="myinfo">
                        <div className="topArea">
                            <div className="name">
                                <div>
                                    <div><strong id="mbrNm">코레일테스*</strong>님 반갑습니다.</div>
                                </div>
                                <a href="/updateBase">내정보수정</a>
                            </div>
                            <ul className="use">
                                <li className="point">
                                    <p><span className="" style={{fontSize: "12px"}}>사용가능 적립금</span></p>
                                  {/*<p><a href="/mypage/s_MyMileage.do"><span className="num">0</span></a></p>*/}
                                    <p><a href="/mileage"><span className="num">0</span></a></p>
                                </li>
                                <li className="coupon">
                                    <p><span className="">사용가능 쿠폰</span></p>
                                    {/*<p><a href="/mypage/s_MyPageCoupon.do"><span className="num">0</span></a></p>*/}
                                    <p><a href="/coupon"><span className="num">0</span></a></p>
                                </li>
                            </ul>
                      </div>
                  </div>
                  <section>
                      <div className="box5">
                          <div className="titWrap">
                              <h3>최근 주문내역<span>최근 1개월</span></h3>
                              <a href="/orderList">더보기</a>
                          </div>

                          <div className="orderListWrap">
                              <dl className="orderListArea">
                                  <dt className="top">
                                      <span style={{color: "#466cc2", marginRight: "5px"}}>[주문취소]</span>
                                      <span>2023-06-12 15:55:37</span>
                                      {/* <!-- 상품유형코드 GOODS_TP_CD 10 일반상품, 20 핀번호, 30 숙박 상품, 40 제휴사 항공, 50 자체 숙박, 60 승차권 --> */}
                                      {/*<a href="javascript:goDetail('I230612416001N');" className="floatright">상세보기</a>*/}
                                      <a href="javascript:void(0);" onClick={() => goDetail('I230612416001N')} className="floatright">상세보기</a>
                                  </dt>
                                  <dd className="orderDesc">
                                      <div className="inner">
                                          <div className="imgArea">
                                              <img src="./images/sub/goods_air.jpg"
                                                   // onError="this.src='/smart/images/common/noimg_type_50.png';"
                                                   // onError={(event) => event.currentTarget.src='./smart/images/common/noimg_type_50.png'}
                                                   alt="제주항공"/>
                                          </div>
                                          <div className="desc_txt">
                                              <p className="itemTit">
                                                  제주항공&nbsp;7C202<span style={{marginRight: "20px"}}></span>
                                                  김포 → 부산
                                                  <br/>
                                                  <span style={{fontSize: "13px"}}>2023-06-23 06:20 ~ 2023-06-23 07:20</span>
                                              </p>
                                              <div className="date_wrap">
                                              </div>
                                          </div>
                                      </div>
                                  </dd>
                              </dl>
                          </div>
                      </div>
                  </section>
                  <section>
                      <div className="customerCnt">
                          <ul>
                              <li><a href="/question">1:1 문의</a></li>
                              <li><a href="/csMain">고객센터</a></li>
                              <li><a href="/faq">자주묻는질문</a></li>
                          </ul>
                          <div className="notice"><a href="/notice">공지사항</a></div>
                      </div>
                  </section>
                  <section>
                      <div className="box6 right">
                          <a href="#none"
                              // onClick="s_logout()"
                              onClick={() => common.s_logout()}
                             className="btn_logout_bottom">로그아웃</a>
                      </div>
                  </section>
              </div>


              {/*<script>*/}

              {/*    var target=document.getElementsByClassName("orderListArea");*/}
              {/*    var len=target.length*/}

              {/*    for(var i=0;i*/}
              {/*    <len*/}
              {/*    ;i++){*/}
              {/*    var te=target[len-i-1].getElementsByTagName("a")[0].href;*/}
              {/*    if(te.includes("key=J"))    target[len-i-1].remove();*/}

              {/*}*/}

              {/*</script>*/}
          </div>
        </main>

        <Footer/>
        {/*<footer id="footer">*/}
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
        {/*                <img src="./images/common/footer_logo_lacha.png" alt="HCC"/></a>*/}
        {/*        </h2>*/}
        {/*        /!*<div className="csmr" onClick="scrollBottom()">주식회사 라쿠카라차 사업자 정보</div>*!/*/}
        {/*        <div className="csmr">주식회사 라쿠카라차 사업자 정보</div>*/}
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
        {/*            <dd><p>657-88-00880<span className="line"></span><a*/}
        {/*                href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6578800880" target="_blank">사업자등록정보확인</a></p>*/}
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
        {/*            <dd><p>전화 : 02-568-1220<span className="line"></span>팩스 : 02-508-0612</p><p*/}
        {/*                style={{textAlign: "left",}}>메일 : help@hcclab.com</p></dd>*/}
        {/*        </dl>*/}

        {/*    </div>*/}
        {/*</footer>*/}
        {/**/}
        {/*<div id="go-top" className="show"><span className="hdn">top</span></div>*/}

        {/*<iframe id="HappytalkIframe"*/}
        {/*        src="https://design.happytalkio.com/button?siteId=4000001875&amp;categoryId=134722&amp;divisionId=134723&amp;siteName=%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC%20%EB%9D%BC%EC%BF%A0%EC%B9%B4%EB%9D%BC%EC%B0%A8&amp;params=&amp;partnerId=&amp;shopId="*/}
        {/*        allowTransparency="true" frameBorder="0" title="채팅상담" tabIndex="0"*/}
        {/*        style={{margin: "0px", zIndex: 999999999, width: "60px", height: "60px", left: "auto", right: "10px", bottom: "10px", position: "fixed",}}></iframe>*/}

    </>
  );
}

export default MyPage;
