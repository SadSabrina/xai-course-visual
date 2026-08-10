/* ============================================================
   xai-course-visual — общие хелперы для интерактивных картинок.
   hiDPI-canvas, ресайз, перерисовка при смене темы, гаусс, точки,
   мягкая «объёмная» область (радиальный градиент вместо жёстких обводок).
   Подключать ПЕРЕД инлайновым скриптом демки:
     <script src="../assets/viz.js"></script>
   ============================================================ */
window.VIZ = (function(){

  // цвет-токен: читаем с <body> — там же живёт data-palette (палитра метода)
  function css(name){
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  // стандартное нормальное (Box–Muller) — для гауссовых облаков
  function gaussian(){
    let u=0,v=0;
    while(u===0) u=Math.random();
    while(v===0) v=Math.random();
    return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
  }

  /* mount(canvas, draw): draw(ctx,W,H) на старте, ресайзе и смене темы.
     W/H — CSS-пиксели (retina учтён). Возвращает { redraw() }. */
  function mount(canvas, draw){
    const ctx = canvas.getContext('2d');
    let W=0, H=0;
    function paint(){ if(W&&H) draw(ctx, W, H); }
    function resize(){
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      W = r.width; H = r.height;
      canvas.width = Math.round(W*dpr);
      canvas.height = Math.round(H*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      paint();
    }
    new ResizeObserver(resize).observe(canvas);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    (mq.addEventListener ? mq.addEventListener('change', paint) : mq.addListener(paint));
    resize();
    return { redraw: paint, get W(){return W}, get H(){return H} };
  }

  // #rrggbb + доля прозрачности (0..1) -> #rrggbbaa
  function alpha(hex, a){
    const v = Math.max(0, Math.min(255, Math.round(a*255)));
    return hex + v.toString(16).padStart(2,'0');
  }

  // область: мягкая заливка + жёсткая пунктирная граница (контрастный контур-кружок)
  function region(ctx, x, y, r, hue){
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fillStyle = alpha(hue, 0.12); ctx.fill();
    ctx.strokeStyle = hue; ctx.lineWidth = 2; ctx.setLineDash([6,7]);
    ctx.globalAlpha = 0.9; ctx.stroke();
    ctx.setLineDash([]); ctx.globalAlpha = 1;
  }

  // гауссов сгусток вокруг (cx,cy) из заранее сгенерированных смещений
  function cloud(ctx, cx, cy, offs, spread, color, dot){
    ctx.fillStyle=color;
    for(const [ox,oy] of offs){
      ctx.beginPath(); ctx.arc(cx+ox*spread, cy+oy*spread, dot, 0, 2*Math.PI); ctx.fill();
    }
  }

  // точки по полю: pts — массив [nx,ny] в нормализованных координатах [0..1]
  function scatter(ctx, pts, W, H, color, dot){
    ctx.fillStyle=color;
    for(const [nx,ny] of pts){
      ctx.beginPath(); ctx.arc(nx*W, ny*H, dot, 0, 2*Math.PI); ctx.fill();
    }
  }

  return { css, gaussian, mount, region, cloud, scatter, alpha };
})();
