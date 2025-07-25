"use client";
import React, { useState } from 'react';

interface User {
  string_id: string;
  phone: string;
  color: string;
}

const SocialBubble: React.FC<{ children: React.ReactNode; style: React.CSSProperties }> = ({ children, style }) => (
  <div style={{
    position: 'absolute', background: '#fff', color: '#000', padding: '8px 16px',
    borderRadius: '20px', border: '2px solid #000', fontWeight: 'bold',
    boxShadow: '2px 2px 0px #000', zIndex: 10, ...style
  }}>
    {children}
    <div style={{
      content: '""', position: 'absolute', width: 0, height: 0, border: '8px solid transparent',
      borderTopColor: '#000',
      ...(style.top !== undefined && { bottom: '-15px', left: 'calc(50% - 8px)' }),
      ...(style.bottom !== undefined && { top: '-15px', left: 'calc(50% - 8px)', transform: 'rotate(180deg)' }),
    }} />
  </div>
);

const SkillTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{
    border: '2px solid #000', borderRadius: '8px', padding: '4px 12px',
    margin: '0 6px', fontSize: '14px', background: '#fff', color: '#000',
  }}>
    {children}
  </span>
);

const slideContainerStyle: React.CSSProperties = {
  padding: '20px 0',
  minHeight: '520px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
};

const HomePageSlide: React.FC = () => (
  <div style={slideContainerStyle}>
    <div style={{ position: 'relative', width: 140, height: 140, margin: '40px auto 20px' }}>
      <div style={{
        width: 140, height: 140, borderRadius: '50%', background: '#fff', border: '3px solid #000',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ position: 'absolute', top: -12, width: 100, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '35px solid #000' }} />
          <div style={{ width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '35px solid #000' }} />
        </div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <div style={{ width: '10px', height: '25px', background: '#000', borderRadius: '2px' }}></div>
          <div style={{ width: '10px', height: '25px', background: '#000', borderRadius: '2px' }}></div>
        </div>
      </div>
      <SocialBubble style={{ top: '-30px', left: '-50px' }}>Github</SocialBubble>
      <SocialBubble style={{ top: '-15px', right: '-60px' }}>Wechat</SocialBubble>
      <SocialBubble style={{ bottom: '10px', right: '-45px' }}>领英</SocialBubble>
    </div>
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>&#10022;Hi, I'm Lambert :)</h2>
      <p style={{ fontSize: '16px', color: '#333', margin: '8px 0' }}>fullstack dev</p>
      <p style={{ fontSize: '16px', color: '#333', margin: '8px 0' }}>fandom of Muelle</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
      <SkillTag>技术</SkillTag>
      <SkillTag>产品</SkillTag>
      <SkillTag>后端</SkillTag>
      <SkillTag>增长</SkillTag>
    </div>
  </div>
);

const PlaceholderSlide: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div style={slideContainerStyle}>
    <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>{title}</h2>
    <p style={{ fontSize: '20px', color: '#555', padding: '0 20px' }}>{content}</p>
  </div>
);

const ProfileCard: React.FC<{ user: User }> = ({ user }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    <HomePageSlide key="home" />,
    <PlaceholderSlide key="about" title="关于我" content="这里是关于我的详细介绍..." />,
    <PlaceholderSlide key="projects" title="我的项目" content="这里可以展示我的项目列表..." />,
    <PlaceholderSlide key="contact" title="联系方式" content={`可以通过 ${user.phone} 联系到我。`} />,
  ];
  const totalSlides = slides.length;
  const handlePrev = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const handleNext = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  return (
    <div style={{
      width: '100%',
      maxWidth: '550px',
      background: '#fff',
      border: '3px solid #000',
      borderRadius: '24px',
      boxShadow: '8px 8px 0px #000',
      padding: '24px',
      textAlign: 'center',
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: `'Comic Sans MS', 'Chalkduster', 'cursive'`,
    }}>
      <div style={{ width: '100%' }}>
        {slides[activeSlide]}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        marginTop: '20px',
        width: '100%',
      }}>
        <button onClick={handlePrev} style={{
          background: '#fff', border: '3px solid black', borderRadius: '50%',
          width: 50, height: 50, boxShadow: '4px 4px 0 #000',
          cursor: 'pointer', fontSize: '24px', fontWeight: 'bold',
          transition: 'all 0.1s ease',
        }} onMouseDown={e => (e.currentTarget.style.transform = 'translate(4px, 4px)')} onMouseUp={e => (e.currentTarget.style.transform = '')}>
          {'<'}
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div key={index} style={{
              width: 12, height: 12, borderRadius: '50%',
              background: index === activeSlide ? '#000' : '#ccc',
              transition: 'background 0.3s ease',
            }}></div>
          ))}
        </div>
        <button onClick={handleNext} style={{
          background: '#fff', border: '3px solid black', borderRadius: '50%',
          width: 50, height: 50, boxShadow: '4px 4px 0 #000',
          cursor: 'pointer', fontSize: '24px', fontWeight: 'bold',
          transition: 'all 0.1s ease',
        }} onMouseDown={e => (e.currentTarget.style.transform = 'translate(4px, 4px)')} onMouseUp={e => (e.currentTarget.style.transform = '')}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard; 