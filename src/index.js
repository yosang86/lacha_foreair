import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import Main from './Main';
import Main2 from './Main2';
import Login from './Login';
import FindId from './FindId';
import FindPw from './FindPw';
import JoinAgree from './JoinAgree';
import JoinForm from './JoinForm';
import JoinComplete from './JoinComplete';
import MyPage from './MyPage';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import Mileage from './Mileage';
import Coupon from "./Coupon";
import UpdateBase from './UpdateBase';
import UpdateAddr from './UpdateAddr';
import UpdateExtra from './UpdateExtra';
import UpdatePassenger from './UpdatePassenger';
import UpdateConsent from './UpdateConsent';
import ChangePw from './ChangePw';
import AddAddress from './AddAddress';
import SearchTicketList from './SearchTicketList';
import ReserveTicket from './ReserveTicket';
import ReservedComplete from './ReservedComplete';
import TermOfService from './TermOfService';
import PrivacyPolicy from './PrivacyPolicy';
import CsMain from './CsMain';
import Notice from './Notice';
import Faq from './Faq';
import Question from './Question';
import AddQuestion from './AddQuestion';
import Withdraw from './Withdraw';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <BrowserRouter>
          <Routes>
              {/*<Route path="/" element={<Main />}></Route>*/}
              <Route path="/" element={<Main2 />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/findId" element={<FindId />}></Route>
              <Route path="/findPw" element={<FindPw />}></Route>
              <Route path="/joinAgree" element={<JoinAgree />}></Route>
              <Route path="/joinForm" element={<JoinForm />}></Route>
              <Route path="/joinComplete" element={<JoinComplete />}></Route>
              <Route path="/mypage" element={<MyPage />}></Route>
              <Route path="/orderList" element={<OrderList />}></Route>
              <Route path="/orderDetail" element={<OrderDetail />}></Route>
              <Route path="/mileage" element={<Mileage />}></Route>
              <Route path="/coupon" element={<Coupon />}></Route>
              <Route path="/updateBase" element={<UpdateBase />}></Route>
              <Route path="/updateAddr" element={<UpdateAddr />}></Route>
              <Route path="/updateExtra" element={<UpdateExtra />}></Route>
              <Route path="/updatePassenger" element={<UpdatePassenger />}></Route>
              <Route path="/updateConsent" element={<UpdateConsent />}></Route>
              <Route path="/changePw" element={<ChangePw />}></Route>
              <Route path="/addAddress" element={<AddAddress title="배송지 등록" />}></Route>
              <Route path="/modifyAddress" element={<AddAddress title="배송지 수정" />}></Route>
              <Route path="/searchTicketList" element={<SearchTicketList />}></Route>
              <Route path="/reserveTicket" element={<ReserveTicket />}></Route>
              <Route path="/reservedComplete" element={<ReservedComplete />}></Route>
              <Route path="/termOfService" element={<TermOfService />}></Route>
              <Route path="/privacyPolicy" element={<PrivacyPolicy />}></Route>
              <Route path="/csMain" element={<CsMain />}></Route>
              <Route path="/notice" element={<Notice />}></Route>
              <Route path="/faq" element={<Faq />}></Route>
              <Route path="/question" element={<Question />}></Route>
              <Route path="/addQuestion" element={<AddQuestion />}></Route>
              <Route path="/withdraw" element={<Withdraw />}></Route>
              <Route path="*" element={<App />}></Route>
          </Routes>
      </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
