import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface DemoGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: string[];
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 1.4;

const DemoGallery = ({
  open,
  onOpenChange,
  title,
  images,
}: DemoGalleryProps) => {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(MIN_SCALE);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    if (open) {
      setIndex(0);
      setScale(MIN_SCALE);
      setTranslate({ x: 0, y: 0 });
    }
  }, [open]);

  useEffect(() => {
    setScale(MIN_SCALE);
    setTranslate({ x: 0, y: 0 });
  }, [index]);

  const current = images[index] ?? images[0];

  const go = (dir: number) => {
    if (images.length === 0) return;
    setIndex(prev => (prev + dir + images.length) % images.length);
  };

  const select = (i: number) => setIndex(i);

  const zoomIn = () =>
    setScale(s => Math.min(MAX_SCALE, +(s * ZOOM_STEP).toFixed(3)));

  const zoomOut = () =>
    setScale(s => {
      const next = Math.max(MIN_SCALE, +(s / ZOOM_STEP).toFixed(3));
      if (next === MIN_SCALE) setTranslate({ x: 0, y: 0 });
      return next;
    });

  const resetZoom = () => {
    setScale(MIN_SCALE);
    setTranslate({ x: 0, y: 0 });
  };

  const toggleZoom = () => {
    if (scale > MIN_SCALE) resetZoom();
    else setScale(2);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scale <= MIN_SCALE) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      tx: translate.x,
      ty: translate.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const { x, y, tx, ty } = dragStart.current;
    setTranslate({ x: tx + (e.clientX - x), y: ty + (e.clientY - y) });
  };

  const onPointerUp = () => setIsDragging(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-4xl p-4 sm:p-6'>
        <DialogHeader>
          <DialogTitle>{title} - Screenshots</DialogTitle>
          <DialogDescription>
            {index + 1} of {images.length} · Scroll to zoom, drag to pan, or
            view fullscreen
          </DialogDescription>
        </DialogHeader>

        <div
          ref={containerRef}
          className='relative rounded-lg overflow-hidden bg-background border border-border select-none'
          style={{ touchAction: 'none' }}
          onWheel={onWheel}
          onDoubleClick={toggleZoom}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {current ? (
            <div className='w-full h-64 sm:h-[28rem] flex items-center justify-center overflow-hidden cursor-zoom-in'>
              <img
                src={current}
                alt={`${title} screenshot ${index + 1}`}
                draggable={false}
                className={cn(
                  'max-w-full max-h-full object-contain',
                  isDragging ? '' : 'transition-transform duration-200 ease-out'
                )}
                style={{
                  transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                }}
              />
            </div>
          ) : (
            <div className='w-full h-64 sm:h-[28rem] flex items-center justify-center text-muted-foreground'>
              No screenshots available.
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label='Previous screenshot'
                className='absolute left-2 top-1/2 -translate-y-1/2 p-2 glass rounded-full hover:shadow-glow transition-all'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>
              <button
                onClick={() => go(1)}
                aria-label='Next screenshot'
                className='absolute right-2 top-1/2 -translate-y-1/2 p-2 glass rounded-full hover:shadow-glow transition-all'
              >
                <ChevronRight className='h-4 w-4' />
              </button>
            </>
          )}

          <div className='absolute bottom-3 right-3 flex items-center gap-1'>
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
              className='p-2 glass rounded-full hover:shadow-glow transition-all'
            >
              {isFullscreen ? (
                <Minimize className='h-4 w-4' />
              ) : (
                <Maximize className='h-4 w-4' />
              )}
            </button>
            <button
              onClick={zoomOut}
              aria-label='Zoom out'
              className='p-2 glass rounded-full hover:shadow-glow transition-all'
            >
              <ZoomOut className='h-4 w-4' />
            </button>
            <button
              onClick={zoomIn}
              aria-label='Zoom in'
              className='p-2 glass rounded-full hover:shadow-glow transition-all'
            >
              <ZoomIn className='h-4 w-4' />
            </button>
            <button
              onClick={resetZoom}
              aria-label='Reset zoom'
              className='p-2 glass rounded-full hover:shadow-glow transition-all'
            >
              <RotateCcw className='h-4 w-4' />
            </button>
          </div>
        </div>

        {images.length > 1 && (
          <div className='flex gap-2 overflow-x-auto pb-1'>
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => select(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={cn(
                  'relative flex-none w-20 h-12 rounded-md overflow-hidden border-2 transition-colors',
                  i === index
                    ? 'border-primary'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <img src={src} alt='' className='w-full h-full object-cover' />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoGallery;
