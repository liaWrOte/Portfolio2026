import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&';
const FRAMES = 14;
const INTERVAL_MS = 28;

function scrambleStep(target: string, progress: number): string {
  return target
    .split('')
    .map((char, i) => {
      if (/[\s./_\-]/.test(char)) return char;
      return progress * target.length > i
        ? char
        : CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join('');
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, tag: Tag = 'span' }) => {
  const { language } = useTranslation();
  const [displayed, setDisplayed] = useState(text);
  const prevLangRef = useRef(language);
  const prevTextRef = useRef(text);

  useEffect(() => {
    const langChanged = prevLangRef.current !== language;
    const textChanged = prevTextRef.current !== text;
    prevLangRef.current = language;
    prevTextRef.current = text;

    if (!langChanged && !textChanged) return;

    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setDisplayed(scrambleStep(text, frame / FRAMES));
      if (frame >= FRAMES) {
        clearInterval(id);
        setDisplayed(text);
      }
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [text, language]);

  return <Tag className={className}>{displayed}</Tag>;
};

export default ScrambleText;
