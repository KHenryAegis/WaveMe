// --- FireworksCanvas 修正版 ---
const FireworksCanvas = () => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);          // requestAnimationFrame id
    const fireworks = useRef([]);
    const particles = useRef([]);
    const launchTimer = useRef(null);       // setInterval id
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
  
      // 封装成函数，窗口变动时也能复用
      const resize = () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);
  
      /* ---------- 生成新火箭 ---------- */
      const launchFirework = () => {
        // 同屏火箭数控制在 5 以内
        if (fireworks.current.length >= 5) return;
        const { innerWidth: vw, innerHeight: vh } = window;
        const startX  = vw * 0.5;      // 正下方中央
        const startY  = vh;
        const targetX = random(0, vw);
        const targetY = random(0, vh * 0.5);
        fireworks.current.push(new Firework(startX, startY, targetX, targetY));
      };
      // 每 800 ms 发射一枚
      launchTimer.current = setInterval(launchFirework, 800);
  
      /* ---------- 动画主循环 ---------- */
      const loop = () => {
        frameRef.current = requestAnimationFrame(loop);
  
        const { width: w, height: h } = canvas;
        // 先用 source-over 半透明黑清屏，留下拖影
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, w, h);
  
        ctx.globalCompositeOperation = "lighter";   // 开启颜料叠加
  
        /* ---- 更新 ---- */
        for (let i = fireworks.current.length - 1; i >= 0; i--) {
          fireworks.current[i].update(i, fireworks.current, particles.current);
        }
        for (let j = particles.current.length - 1; j >= 0; j--) {
          particles.current[j].update(j, particles.current);
        }
  
        /* ---- 绘制 ---- */
        ctx.lineWidth = 2;
        fireworks.current.forEach(fw => fw.draw(ctx));
        ctx.lineWidth = 1;
        particles.current.forEach(p => p.draw(ctx));
      };
      loop();               // 启动动画
  
      /* ---------- 清理 ---------- */
      return () => {
        cancelAnimationFrame(frameRef.current);
        clearInterval(launchTimer.current);
        window.removeEventListener("resize", resize);
        fireworks.current = [];
        particles.current = [];
      };
    }, []);                  // 空依赖，组件挂载一次即可
  
    // 画布占满视口，鼠标事件穿透
    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />
    );
  };
  