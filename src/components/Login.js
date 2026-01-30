import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  // 1. 변수 선언과 값 설정하기 
  
  const [form, setForm] = useState({ //값이 여러개면 중괄호 
    username:'', //아이디 저장
    password:'' //패스워드 저장
  });

  const [error, setError] = useState(''); //값이 1개일 경우 소괄호
  const navigate = useNavigate(); //url주소 이동
  
  // 아이디 기억 체크박스를 위한 변수
  const [remember, setRemember] = useState(false); 

  // 2. 처음 로딩 시 저장된 아이디 불러오기
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setForm(prev => ({
        ...prev,
        username: savedUsername
      }));
      setRemember(true);
    }
  }, []);


  // 3. 입력폼에 입력시 실행되는 함수
  const handleChange=(e)=>{
    setForm({
      ...form, //기존 객체에 추가하여 데이터 입력
      [e.target.name]:e.target.value //사용자가 입력한 것을
    });

    setError(''); //에러 초기화
  }

  // 4. 로그인 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/login', form)
      .then(res => {
        // 토큰 저장
        localStorage.setItem('token', res.data.token);

        // 아이디 저장 분기
        if (remember) {
          localStorage.setItem('username', form.username);
        } else {
          localStorage.removeItem('username');
        }

        alert('로그인 성공 메인 페이지로 이동합니다.');
        navigate('/');
      })
      .catch(() => {
        setError('로그인 실패 : 아이디 또는 비밀번호를 확인하세요');
      });
    }

  return (
    <main>
      <section className='login'>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className='login_form'>
          <p>
            <input type="radio" id='member'name='memberGroup' />
            <label htmlFor="">회원</label>
            <input type="radio" id='nomember'name='memberGroup' />
            <label htmlFor="nomember">비회원</label>
          </p>
          <p className='id'>
            <label htmlFor="username">아이디</label>
            <input type="text" id='username' name='username' placeholder='아이디' value={form.username} onChange={handleChange} required/>
          </p>
          <p className='password'>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id='password' name='password' placeholder='비밀번호' onChange={handleChange} value={form.password} required/>
          </p>
          <p>
            <input 
                type="checkbox"
                id="username_check"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
            <label htmlFor="username_check">아이디 저장</label>
          </p>
          <p>
            {/* <input type="submit" value="로그인"/>
            button =submit 확장 가능한 버튼, 문자, 이미지, 아이콘, html요소 모두 사용이 가능하여 자유롭게 css로 서식이 변경가능함. 스타일 적용이 쉬워 리액트에서 주로 많이 사용함 
            서식꾸미기에 불편하기 때문 */}
            <button type="submit" className='login_btn'>로그인</button>
          </p>
          <p className='login_more'>
            <Link to='/id_search'>아이디찾기 &#10072;</Link>
            <Link to='/pw_search'>비밀번호 찾기 &#10072;</Link>
            <Link to='/'>휴면계정찾기</Link>
          </p>
          {/* 로그인 실패일 경우 조건부 렌더링 공식에 의해 에러 표시되도록 함. */}
          {error&&<p style={{color:'#f00'}}>{error}</p>}
          <p className='join_link'>
            <h3>아직! 회원이 아니세요?</h3>
            <span>지금 지니펫 회원으로 가입하시고 풍성한 혜택 받아가세요</span>
            <Link to='/join'>회원가입</Link>
          </p>
        </form>
      </section>
    </main>
  );

}

export default Login;
