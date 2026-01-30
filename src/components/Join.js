import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Join(props) {

  const [form, setForm] = useState({
    username:'',
    password:'',
    password2:'',
    email:'',
    tel:''
  });

  // 회원가입이 실패하는 경우가 있다면 에러출력하기
  const [message , setMessage] = useState('');
  const[error,setError] = useState('false');
  // const[success,setSuccess] = useState(''); 조건부 렌더링을 삼항조건 연산자로 

  // 2. input입력한 값 저장하기
  const handleChange =(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

    // 데이터값 없는 경우 
    setError('');//에러 초기화
  }

  // 3. url 주소관리 == 페이지 이동
  const navigate = useNavigate();

  // 4. 아이디 중복체크 기능 
  const checkUsername=()=>{
    axios.post('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/check-username',{
      username:form.username
    })
    .then(res=>{
      if(res.data.exists){
        setMessage('이미 사용중인 아이디입니다')
        setError(true);
      }else{
        setError(false);
        setMessage('사용 가능한 아이디입니다')
      }
    });
  }

  // 5. 회원가입 버튼 클릭시 해당 값들을 서버측으로 전송함
  const handleSubmit = (e) =>{
    // 사용자가 입력한 data를 backend 서버에 post 방식으로 전송
    e.preventDefault(); // 새로고침 방지 

    //비밀번호, 비밀번호2 일치가 되는지 확인 
    if(form.password !== form.password2){
      setMessage('비밀번호가 일치하지 않습니다.');
      setError(true)
      return;
    }

    // 비밀번호가 일치하면 서버측으로 내용을 전송 
    axios.post('https://port-0-backend-express-server-mkvwe63p223f9070.sel3.cloudtype.app/register', form)
    .then(()=>{//전송 성공시
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다');
      navigate('/login'); //로그인 경로 주소
    })
    .catch(err=>{// 실패시
      console.log(err); //콘솔모드에 에러출력
      setMessage('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다');
      setError(true);
    });
  };


  return (
    <main>
      <section className='join'>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className='join_form'>
          <p>
            <label htmlFor="username">아이디</label>
            <input type="text" id='username' name='username' placeholder='아이디'  value={form.username} onChange={handleChange} required/>

          {error?<p style={{color:'#f00'}}>{message}</p>:<p style={{color:'#00f'}}>{message}</p>}
            <button type="button" onClick={checkUsername} className='id_check'>중복확인</button>
          </p>
          <p>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id='password' name='password' placeholder='비밀번호'  value={form.password} onChange={handleChange} required/>
          </p>
          <p>
            <label htmlFor="password2">비밀번호 확인</label>
            <input type="password" id='password2' name='password2' placeholder='비밀번호 확인'  value={form.password2} onChange={handleChange} required/>
          </p>
          <p>
            <label htmlFor="email">이메일</label>
            <input type="email" id='email' name='email' placeholder='이메일'  value={form.email} onChange={handleChange} required/>
          </p>
          <p>
            <label htmlFor="tel">전화번호</label>
            <input type="tel" id='tel' name='tel' placeholder='- 을 제외한 숫자만 입력'  value={form.tel} onChange={handleChange} required/>
          </p>
          <p>
            <input type="checkbox" id='agree'  required/>
            <label htmlFor="agree">이용약관, 개인정보 수집 및 이용, 마케팅 활용 선택에 모두 동의합니다</label>
          </p>
          <p><button type="submit" className='join_btn'>회원가입</button></p>

          {/* 회원가입이 실패할 경우 나오는 문구 */}

          {/* {error && (<p style={{color: error=='사용 가능한 아이디입니다'? '#0f0': '#f00'}}>{error}</p>)} */}

        </form>
      </section>
    </main>
  );
}


export default Join;
