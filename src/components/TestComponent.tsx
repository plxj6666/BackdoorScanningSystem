const TestComponent = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '3rem',
        background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center'
      }}>
        🛡️ AI模型后门扫描系统
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, textAlign: 'center' }}>
        Advanced Backdoor Detection System
      </p>
      <div style={{
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center'
      }}>
        <p>系统界面已准备就绪！</p>
        <p>正在为您展示完整功能...</p>
      </div>
    </div>
  );
};

export default TestComponent;
