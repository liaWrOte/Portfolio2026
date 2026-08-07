import React, { useContext, useRef, useEffect } from 'react';
import { QuizContext } from '../../../../reducers/artquiz';
import './index.scss';

const W = 500;
const H = 150;

const drawCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dw: number,
  dh: number
) => {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(dw / iw, dh / ih);
  const sx = (iw * scale - dw) / 2 / scale;
  const sy = (ih * scale - dh) / 2 / scale;
  ctx.drawImage(img, sx, sy, dw / scale, dh / scale, 0, 0, dw, dh);
};

const Question = () => {
  const [quizState] = useContext(QuizContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef<{ img: HTMLImageElement; src: string } | null>(null);

  // Derive values before any early return (hooks must run unconditionally)
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex] ?? null;
  const src = currentQuestion?.image_link ?? '';
  const pixelSize = Math.max(1, (quizState.timer - 2) * 4);

  useEffect(() => {
    if (!src) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (img: HTMLImageElement) => {
      ctx.clearRect(0, 0, W, H);
      if (pixelSize <= 1) {
        ctx.imageSmoothingEnabled = true;
        drawCover(ctx, img, W, H);
      } else {
        const sw = Math.max(1, Math.round(W / pixelSize));
        const sh = Math.max(1, Math.round(H / pixelSize));
        const off = document.createElement('canvas');
        off.width = sw;
        off.height = sh;
        const offCtx = off.getContext('2d')!;
        offCtx.imageSmoothingEnabled = true;
        drawCover(offCtx, img, sw, sh);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(off, 0, 0, W, H);
      }
    };

    const cached = cacheRef.current;
    if (cached?.src === src) {
      render(cached.img);
    } else {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        cacheRef.current = { img, src };
        render(img);
      };
    }
  }, [src, pixelSize]);

  if (!currentQuestion) return null;

  return (
    <>
      <canvas ref={canvasRef} className="question-image" width={W} height={H} />
      <p>{currentQuestion.question}</p>
    </>
  );
};

export default Question;
