import { useEffect, useRef } from 'react';
import theme from '../data/theme.json';

const DURATION = theme.glitch.durationMs;
const CHARS = theme.glitch.charset.split('');

function getTextNodes(root) {
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

function scrambleText(original, revealedSet) {
  let out = '';
  for (let i = 0; i < original.length; i++) {
    if (revealedSet.has(i) || original[i] === ' ' || original[i] === '\n') {
      out += original[i];
    } else {
      out += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
  }
  return out;
}

export default function GlitchEffect() {
  const isRunning = useRef(false);

  useEffect(() => {
    const triggerGlitch = () => {
      if (isRunning.current) return;
      isRunning.current = true;

      const wrapper = document.querySelector('.content-wrapper');
      if (!wrapper) { isRunning.current = false; return; }

      const textNodes = getTextNodes(wrapper);
      if (!textNodes.length) { isRunning.current = false; return; }

      const entries = textNodes.map((node) => ({
        node,
        original: node.textContent,
        revealed: new Set(),
        indices: [],
      }));

      entries.forEach((entry) => {
        for (let i = 0; i < entry.original.length; i++) {
          if (entry.original[i] !== ' ' && entry.original[i] !== '\n') {
            entry.indices.push(i);
          }
        }
        for (let i = entry.indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [entry.indices[i], entry.indices[j]] = [entry.indices[j], entry.indices[i]];
        }
      });

      const startTime = performance.now();
      const scramblePhase = DURATION * 0.15;
      const holdPhase = DURATION * 0.10;
      const revealPhase = DURATION * 0.75;

      let rafId;

      const tick = (now) => {
        const elapsed = now - startTime;

        if (elapsed < scramblePhase) {
          entries.forEach((e) => {
            e.node.textContent = scrambleText(e.original, e.revealed);
          });
        } else if (elapsed < scramblePhase + holdPhase) {
          entries.forEach((e) => {
            e.node.textContent = scrambleText(e.original, e.revealed);
          });
        } else if (elapsed < DURATION) {
          const revealElapsed = elapsed - scramblePhase - holdPhase;
          const revealProgress = Math.min(revealElapsed / revealPhase, 1);
          const eased = 1 - Math.pow(1 - revealProgress, 3);

          entries.forEach((e) => {
            const target = Math.floor(eased * e.indices.length);
            while (e.revealed.size < target && e.revealed.size < e.indices.length) {
              e.revealed.add(e.indices[e.revealed.size]);
            }
            e.node.textContent = scrambleText(e.original, e.revealed);
          });
        } else {
          entries.forEach((e) => {
            e.node.textContent = e.original;
          });
          isRunning.current = false;
          return;
        }

        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    let currentSection = null;
    const sectionIds = ['hero', 'about', 'experience', 'achievements', 'education', 'skills', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && currentSection !== id) {
            currentSection = id;
            triggerGlitch();
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    document.addEventListener('click', triggerGlitch);

    return () => {
      document.removeEventListener('click', triggerGlitch);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return null;
}
