import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4";
const POSTER_SRC = "/hero-poster.jpg";

const MAX_FRAMES = 90;
const MIN_FRAMES = 24;
const FRAMES_PER_SECOND = 12;
const MAX_FRAME_WIDTH = 960;
const LERP_FACTOR = 0.12;
const SEEK_EPSILON = 0.04;

function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  canvasWidth: number,
  canvasHeight: number,
) {
  if (!sourceWidth || !sourceHeight) return;
  const scale = Math.max(canvasWidth / sourceWidth, canvasHeight / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const offsetX = (canvasWidth - drawWidth) / 2;
  const offsetY = (canvasHeight - drawHeight) / 2;
  ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
}

function waitEvent(target: HTMLVideoElement, event: string) {
  return new Promise<void>((resolve) => {
    const handler = () => {
      target.removeEventListener(event, handler);
      resolve();
    };
    target.addEventListener(event, handler);
  });
}

function tryQuietPlay(video: HTMLVideoElement) {
  const playPromise = video.play();
  if (playPromise) {
    playPromise
      .then(() => video.pause())
      .catch(() => {
        /* autoplay blocked; fine, seeking still works */
      });
  }
}

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenVideoRef = useRef<HTMLVideoElement | null>(null);

  const [posterVisible, setPosterVisible] = useState(true);
  const [videoHasFrame, setVideoHasFrame] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  const framesRef = useRef<ImageBitmap[]>([]);
  const smoothedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      targetProgressRef.current = Math.min(1, Math.max(0, progress));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedData = () => setVideoHasFrame(true);
    video.addEventListener("loadeddata", onLoadedData);
    tryQuietPlay(video);

    return () => video.removeEventListener("loadeddata", onLoadedData);
  }, []);

  useEffect(() => {
    if (videoHasFrame || canvasReady) {
      const timeout = setTimeout(() => setPosterVisible(false), 0);
      return () => clearTimeout(timeout);
    }
  }, [videoHasFrame, canvasReady]);

  useEffect(() => {
    const visibleVideo = videoRef.current;
    if (!visibleVideo || !videoHasFrame) return;

    let cancelled = false;

    const extractFrames = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (cancelled) return;

      const offscreen = document.createElement("video");
      offscreen.src = VIDEO_SRC;
      offscreen.muted = true;
      offscreen.playsInline = true;
      offscreen.preload = "auto";
      offscreen.crossOrigin = "anonymous";
      offscreenVideoRef.current = offscreen;

      await waitEvent(offscreen, "loadedmetadata");
      if (cancelled) return;
      tryQuietPlay(offscreen);

      const duration = offscreen.duration;
      if (!duration || !isFinite(duration)) return;

      const frameCount = Math.min(
        MAX_FRAMES,
        Math.max(MIN_FRAMES, Math.round(duration * FRAMES_PER_SECOND)),
      );

      const naturalWidth = offscreen.videoWidth;
      const naturalHeight = offscreen.videoHeight;
      const scale = Math.min(1, MAX_FRAME_WIDTH / naturalWidth);
      const frameWidth = Math.round(naturalWidth * scale);
      const frameHeight = Math.round(naturalHeight * scale);

      const extractCanvas = document.createElement("canvas");
      extractCanvas.width = frameWidth;
      extractCanvas.height = frameHeight;
      const extractCtx = extractCanvas.getContext("2d");
      if (!extractCtx) return;

      const bitmaps: ImageBitmap[] = [];

      for (let i = 0; i < frameCount; i++) {
        if (cancelled) return;
        const time = (i / (frameCount - 1)) * (duration - 0.05);
        offscreen.currentTime = time;
        await waitEvent(offscreen, "seeked");
        if (cancelled) return;
        extractCtx.drawImage(offscreen, 0, 0, frameWidth, frameHeight);
        const bitmap = await createImageBitmap(extractCanvas);
        bitmaps.push(bitmap);
      }

      if (cancelled) return;
      framesRef.current = bitmaps;
      setCanvasReady(true);
    };

    extractFrames().catch(() => {
      /* frame cache unavailable; fallback path keeps working */
    });

    return () => {
      cancelled = true;
      offscreenVideoRef.current?.removeAttribute("src");
      offscreenVideoRef.current = null;
    };
  }, [videoHasFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      reducedMotionRef.current = media.matches;
    };
    applyPreference();
    media.addEventListener("change", applyPreference);
    return () => media.removeEventListener("change", applyPreference);
  }, []);

  useEffect(() => {
    let lastDrawnIndex = -1;

    const tick = () => {
      const target = targetProgressRef.current;
      const factor = reducedMotionRef.current ? 1 : LERP_FACTOR;
      smoothedProgressRef.current += (target - smoothedProgressRef.current) * factor;
      if (Math.abs(target - smoothedProgressRef.current) < 0.0005) {
        smoothedProgressRef.current = target;
      }

      const progress = smoothedProgressRef.current;
      const frames = framesRef.current;
      const canvas = canvasRef.current;

      if (frames.length > 0 && canvas) {
        const index = Math.min(frames.length - 1, Math.floor(progress * (frames.length - 1)));
        if (index !== lastDrawnIndex) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const frame = frames[index];
            drawCover(ctx, frame, frame.width, frame.height, canvas.width, canvas.height);
          }
          lastDrawnIndex = index;
        }
      } else {
        const video = videoRef.current;
        if (video && video.duration && isFinite(video.duration)) {
          const targetTime = progress * (video.duration - 0.05);
          if (Math.abs(video.currentTime - targetTime) > SEEK_EPSILON) {
            video.currentTime = targetTime;
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a] pointer-events-none">
      <img
        src={POSTER_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: posterVisible ? 1 : 0 }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: videoHasFrame && !canvasReady ? 1 : 0 }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-500"
        style={{ opacity: canvasReady ? 1 : 0 }}
      />
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
    </div>
  );
}
