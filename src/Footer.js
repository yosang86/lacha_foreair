import {useRef} from "react";
import $ from 'jquery';
import * as base from "./js/find";

function App(props) {
    {/*<script>*/}
    {/*    window.__ht_wc = window.__ht_wc || {};*/}
    {/*    window.__ht_wc.host = 'design.happytalkio.com';*/}
    {/*    window.__ht_wc.site_id = '4000001875'; // site_id*/}
    {/*    window.__ht_wc.site_name = '주식회사 라쿠카라차'; // 회사 이름*/}
    {/*    window.__ht_wc.category_id = '134722'; // 대분류 id*/}
    {/*    window.__ht_wc.division_id = '134723'; // 중분류 id*/}
    {/*    // 고정 및 Custom 파라미터 추가영역. 파라미터가 여러개인 경우 ,(콤마)로 구분*/}
    {/*    // window.__ht_wc.params = 'site_uid=abcd1234,parameter1=param1';*/}

    {/*    (function() {*/}
    {/*    var ht = document.createElement('script');*/}
    {/*    ht.type = 'text/javascript';*/}
    {/*    ht.async = true;*/}
    {/*    ht.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + window.__ht_wc.host + '/web_chatting/tracking.js';*/}
    {/*    var s = document.getElementsByTagName('script')[0];*/}
    {/*    s.parentNode.insertBefore(ht, s);*/}
    {/*})();*/}
    {/*</script>*/}

    return(
        <>
            <div id="footer">
                <div className="footerBtm">
                    <ul className="footer-menu">
                        <li><a href="/termOfService">이용약관</a></li>
                        <li><a href="/privacyPolicy">개인정보처리방침</a></li>
                        <li><a href="/csMain">고객센터</a></li>
                    </ul>
                    <p>Copyright © LACUCARACHA Co., Ltd. All rights reserved.</p>
                </div>

                <div className="top">
                    <h2>
                        <a href="/">
                            <img src="./images/common/footer_logo_lacha.png" alt="HCC"/>
                        </a>
                    </h2>
                    <div className="csmr" onClick={() => base.scrollBottom()}>주식회사 라쿠카라차 사업자 정보</div>
                </div>
                <div className="csmrCont">
                    <dl>
                        <dt>상호명</dt>
                        <dd>주식회사 라쿠카라차</dd>
                    </dl>
                    <dl>
                        <dt>대표이사</dt>
                        <dd>이윤상</dd>
                    </dl>
                    <dl>
                        <dt>주소</dt>
                        <dd>(06197) 서울시 강남구 선릉로 86길 26, 4층</dd>
                    </dl>
                    <dl>
                        <dt>사업자번호</dt>
                        <dd>
                            <p>
                                657-88-00880
                                <span className="line"></span>
                                <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6578800880" target="_blank">사업자등록정보확인</a>
                            </p>
                        </dd>
                    </dl>
                    <dl>
                        <dt>통신판매업신고번호</dt>
                        <dd>2021-서울강남-01710</dd>
                    </dl>
                    <dl>
                        <dt>개인정보보호책임자</dt>
                        <dd>유호상</dd>
                    </dl>
                    <dl>
                        <dt>고객센터</dt>
                        <dd>
                            <p>
                                전화 : 02-568-1220
                                <span className="line"></span>
                                팩스 : 02-508-0612
                            </p>
                            <p style={{textAlign: "left"}}>메일 : help@hcclab.com</p>
                        </dd>
                    </dl>

                </div>
                {/*<div id="go-top"><span className="hdn">top</span></div>*/}
            </div>

            {/*<ul id="btm-menu">*/}
            {/*    <li><a href="/" class="f-menu01"></a></li>*/}
            {/*    <li><a href="javascript:alert('준비중입니다.');" class="f-menu02"></a></li>*/}
            {/*    <li><a href="/mypage/s_MyPageInfo.do" class="f-menu03"></a></li>*/}
            {/*    <li><a href="javascript:alert('준비중입니다.');" class="f-menu04"></a></li>*/}
            {/*    <li><a href="/mypage/s_MyPageInfo.do" class="f-menu05"></a></li>*/}
            {/*</ul>*/}

            <div id="go-top"><span className="hdn">top</span></div>

            {props.happytalk != false
                ? <iframe id="HappytalkIframe"
                          // src="https://design.happytalkio.com/button?siteId=4000001875&amp;categoryId=134722&amp;divisionId=134723&amp;siteName=%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC%20%EB%9D%BC%EC%BF%A0%EC%B9%B4%EB%9D%BC%EC%B0%A8&amp;params=&amp;partnerId=&amp;shopId="
                          src="https://design.happytalkio.com/button?siteId=4000001875&amp;categoryId=134722&amp;divisionId=134723&amp;siteName=%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC%20%EB%9D%BC%EC%BF%A0%EC%B9%B4%EB%9D%BC%EC%B0%A8"
                          // allowTransparency="true"
                          frameBorder="0" title="채팅상담" tabIndex="0"
                          style={{
                              margin: "0px",
                              zIndex: 999999999,
                              width: "60px",
                              height: "60px",
                              left: "auto",
                              right: "10px",
                              bottom: "10px",
                              position: "fixed",
                          }}
                ></iframe>
                : <></>
            }
        </>
    )
}

export default App;