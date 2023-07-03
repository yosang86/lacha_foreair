import $ from 'jquery';

function App(props) {
    return(
        <>
            <div id="header" className="center">
                <div className="header_top">
                    <a href="/main/s_MainView.do" className="btnPrev">이전</a>
                    <h1>예약</h1>
                </div>
            </div>
            <div id="content">
                <div className="boxCont msgBox">
                    <div className="schedule-title-check">
                        <div className="sch_tit">항공권 예약이 완료되었습니다.</div>
                    </div>

                    <div className="timeLine pdb_20 mgt_20">
                        <div className="ticketWrap pd_a0 airInfo">
                            <div className="ticket_new">
                                <div className="ticketInner">
                                    <div className="ticketInfo">
                                        {/*<c:forEach items="${airTravelInfoList}" var="row" varStatus="i">*/}
                                            <div className="airSummary">
                                                <div className="itinerary">
                                                    <div className="airport">
                                                        <p className="place">
                                                            {/*<c:out value="${row.dprtInfo}"/>*/}
                                                        </p>
                                                        <p className="name">
                                                            {/*<c:out value="${row.dprtCode}"/>*/}
                                                        </p>
                                                    </div>
                                                    <div className="leadTime">
                                                        {/*<c:set var="timeData" value="${fn:split(row.flightTime,':')}"/>*/}
                                                        <p className="time">
                                                            {/*<c:forEach var="timeSplit" items="${timeData}"*/}
                                                            {/*           varStatus="g">*/}
                                                            {/*    <c:if test="${g.count == 1}">*/}
                                                            {/*        <span className="hour"><c:out value="${timeSplit}"/></span>시간*/}
                                                            {/*    </c:if>*/}
                                                            {/*    <c:if test="${g.count == 2}">*/}
                                                            {/*        <span className="minute"><c:out*/}
                                                            {/*            value="${timeSplit}"/></span>분*/}
                                                            {/*    </c:if>*/}
                                                            {/*</c:forEach>*/}
                                                        </p>
                                                        <p className="arrow">
                                                            {/*<fmt:parseNumber var="cnt" type="number"*/}
                                                            {/*                 value="${row.waypointCount}"/>*/}
                                                            {/*<c:if test="${cnt > 0}">*/}
                                                            {/*    <c:forEach var="i" begin="1" end="${cnt}">*/}
                                                            {/*        <span className="via"></span>*/}
                                                            {/*    </c:forEach>*/}
                                                            {/*</c:if>*/}
                                                        </p>
                                                    </div>
                                                    <div className="airport">
                                                        <p className="place">
                                                            {/*<c:out value="${row.arrvInfo}"/>*/}
                                                        </p>
                                                        <p className="name">
                                                            {/*<c:out value="${row.arrvCode}"/>*/}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        {/*</c:forEach>*/}
                                    </div>
                                    <div className="define">
                                        <div className="price titWrap airWrap">
                                            <div className="airDetail">
                                                <p className="tit">예약번호(PNR번호)</p>
                                                <p className="detail">
                                                    {/*<c:out value="${airReservedInfo.aircoPnrAlpha}"/>*/}
                                                    (
                                                    {/*<c:out value="${airReservedInfo.airReservedNo}"/>*/}
                                                    )
                                                </p>
                                            </div>
                                            <div className="airDetail">
                                                <p className="tit">총 일정</p>
                                                <p className="detail">
                                                    {/*<fmt:parseDate var="dprtTime" value="${deptTime}"*/}
                                                    {/*               pattern="yyyy-MM-dd HH:mm:ss"/>*/}
                                                    {/*<fmt:parseDate var="arrTime" value="${arrvTime}"*/}
                                                    {/*               pattern="yyyy-MM-dd HH:mm:ss"/>*/}
                                                    {/*<fmt:formatDate value="${dprtTime}" pattern="yyyy-MM-dd(E)"/>*/}
                                                    {/*~ <fmt:formatDate value="${arrTime}" pattern="yyyy-MM-dd(E)"/>*/}
                                                </p>
                                            </div>
                                            <div className="airDetail">
                                                <p className="tit">탑승객/좌석</p>
                                                <p className="detail">
                                                    {/*<c:out value="${airReservedInfo.totalQty}"/>*/}
                                                    명
                                                    <span className="titc">
                                                    (성인
                                                        {/*<c:out value="${airReservedInfo.adultQty}"/>*/}
                                                        명
                                                    {/*<c:if test="${airReservedInfo.childQty > 0}">*/}
                                                    {/*    , 소아<c:out value="${airReservedInfo.childQty}"/>명*/}
                                                    {/*</c:if>*/}
                                                    {/*<c:if test="${airReservedInfo.babyQty > 0}">*/}
                                                    {/*    , 유아<c:out value="${airReservedInfo.babyQty}"/>명*/}
                                                    {/*</c:if>*/}
                                                    )
                                                </span>
                                                    {/*/ <c:out value="${airReservedInfo.seatType}"/>*/}
                                                    /
                                                </p>
                                            </div>
                                            <div className="airDetail">
                                                <p className="tit">결제시한</p>
                                                {/*<fmt:parseDate var="payTime" value="${airReservedInfo.payLimitTime}"*/}
                                                {/*               pattern="yyyyMMddHHmmss"/>*/}
                                                <p className="detail cRed">
                                                    {/*<fmt:formatDate value="${payTime}" pattern="yyyy-MM-dd(E) HH:mm"/>*/}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className="sectionTxt mgt_10 mgb_10">
                            <li>※ 예약 내역 확인 및 결제/취소는 <span className="cBlue2">마이페이지 &gt; 항공 예약 내역</span>에서 확인해 주시기 바랍니다.
                            </li>
                            <li>※ 예약 대기의 경우 결제는 좌석과 요금이 모두 확정된 이후 진행 가능합니다.</li>
                        </ul>

                        <div className="btnArea mgt_30">
                            {/*<a href="/foreign/reserve/s_ReservedCompleteInfo.do?key=airReservedInfo.ordNo" className="lbtn btn-large filled"*/}
                            <a href="/reservedCompleteInfo?ordNo=J230516162916N" className="lbtn btn-large filled"
                               style={{background: "#4a6cb3", border: "1px solid #4a6cb3"}}>예약 상세 / 결제하기</a>
                        </div>
                        <div className="btnArea mgt_10">
                            {/*<a href="/mypage/s_New_MyPageOrderListView.do" className="lbtn btn-large cBlue2"*/}
                            <a href="/orderList" className="lbtn btn-large cBlue2"
                               style={{border: "1px solid #4a6cb3"}}>항공 예약내역</a>
                        </div>
                    </div>
                </div>
             </div>
        </>
    )
}

export default App;