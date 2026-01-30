import React from 'react';

function Footer(props) {
  return (
    <footer className='footer'>
      <div className='notice'>
        <p>공지사항</p>
      </div>
      <div className='footer-wrapper'>
        <div className='footer_con1'>
          <ul>
            <li>개인정보처리방침</li>
            <li>쇼핑몰약관</li>
          </ul>
          <img src={`${process.env.PUBLIC_URL}/images/footer_sns_2.gif`} alt="닫기" />
        </div>
        <div className='footer_con2'>
          <p>고객센터</p>
          <p>02-2166-7770</p>
          <p>평일 10:00~17:00</p>
          <p>(점심: 12:00~13:00)</p>
        </div>
        <div className='footer_con3'>
          <p>지니펫 사업자 정보 확인</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;