import React from 'react';

function Main(props) {
  return (
    <main>
      <section className='con1'>

          <img src={`${process.env.PUBLIC_URL}/images/main1.jpg`} alt="닫기" />

      </section>
      <section className='con2'><img src={`${process.env.PUBLIC_URL}/images/shop.jpg`} alt="닫기" /></section>
      <section className='con3'>
        <img src={`${process.env.PUBLIC_URL}/images/story.jpg`} alt="닫기" />
      </section>
      <section className='con4'>
        <img src={`${process.env.PUBLIC_URL}/images/in_star.jpg`} alt="닫기" />
      </section>
    </main>
  );
}

export default Main;