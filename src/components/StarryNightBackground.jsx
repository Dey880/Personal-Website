import { useEffect, useRef, useState } from 'react';
import '../css/components/StarryNightBackground.css';

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars() {
  const count = Math.ceil((window.innerWidth * window.innerHeight) / 4000);

  return Array.from({ length: count }, (_, index) => {
    const size = Math.random() < 0.5 ? 1 : 2;
    const shouldTwinkle = Math.random() < 1 / 5;
    const style = {
      left: `${random(0, 99)}%`,
      top: `${random(0, 99)}%`,
      opacity: random(0.5, 1),
      width: `${size}px`,
      height: `${size}px`,
    };

    if (shouldTwinkle) {
      style.animation = `twinkle${Math.floor(random(1, 5))} 5s infinite`;
      style.animationDelay = `${random(-5, 0)}s`;
    }

    return { id: index, style };
  });
}

function createShootingStar(id, initial = false) {
  const startsAtTop = Math.random() < 0.75;

  return {
    id,
    position: startsAtTop
      ? { top: '-4px', right: `${random(0, 90)}%` }
      : { top: `${random(0, 50)}%`, right: '-4px' },
    duration: `${Math.floor(random(6, 10))}s`,
    delay: initial ? `${Math.floor(random(0, 7))}s` : '0s',
  };
}

export default function StarryNightBackground() {
  const backgroundRef = useRef(null);
  const nextShootingStarTimeout = useRef(null);
  const [stars, setStars] = useState(createStars);
  const [shootingStar, setShootingStar] = useState(() =>
    createShootingStar(0, true),
  );

  function handleShootingStarEnd() {
    const pause = Math.floor(random(5000, 10001));

    nextShootingStarTimeout.current = window.setTimeout(() => {
      setShootingStar((current) => createShootingStar(current.id + 1));
    }, pause);
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reducedMotion) {
      console.warn(
        '[StarryNight] Shooting stars are hidden because reduced motion is enabled',
      );
    }

    let resizeTimeout;
    const updateStars = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => setStars(createStars()), 150);
    };

    window.addEventListener('resize', updateStars);

    return () => {
      window.clearTimeout(resizeTimeout);
      window.removeEventListener('resize', updateStars);
      window.clearTimeout(nextShootingStarTimeout.current);
    };
  }, []);

  return (
    <div
      className="starrynight-bg-container"
      aria-hidden="true"
      ref={backgroundRef}
    >
      {stars.map(({ id, style }) => (
        <div className="star" key={id} style={style} />
      ))}
      <span
        className="shootingstar"
        key={shootingStar.id}
        onAnimationEnd={handleShootingStarEnd}
        style={{
          ...shootingStar.position,
          animationDuration: shootingStar.duration,
          animationDelay: shootingStar.delay,
          boxShadow:
            '0 0 0 4px rgba(255,255,255,0.1), 0 0 0 8px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1)',
        }}
      />
    </div>
  );
}
