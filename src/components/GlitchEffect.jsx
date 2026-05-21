import { useEffect, useRef } from 'react';
import theme from '../data/theme.json';

const DURATION = theme.glitch.durationMs;
const HOVER_DURATION = theme.glitch.hoverDurationMs || 300;
const CHARS = theme.glitch.charset.split('');

function getRandomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

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
      out += getRandomChar();
    }
  }
  return out;
}

export default function GlitchEffect() {
  const isRunning = useRef(false);
  const hoverState = useRef(new Map());

  useEffect(() => {
    const activeWords = new Map();

    // --- Full-page glitch on click and section change ---
    const triggerGlitch = () => {
      if (isRunning.current) return;
      isRunning.current = true;

      const wrapper = document.querySelector('.content-wrapper');
      if (!wrapper) { isRunning.current = false; return; }

      // Cancel any active hover glitches first and restore originals
      activeWords.forEach((state, span) => {
        if (state.rafId) cancelAnimationFrame(state.rafId);
        span.textContent = state.original;
      });
      activeWords.clear();

      // Collect word spans (wrapped) and plain text nodes
      const wordSpans = wrapper.querySelectorAll('[data-glitch-word]');
      const entries = [];

      wordSpans.forEach((span) => {
        const original = span.dataset.glitchWord;
        entries.push({ node: span, original, revealed: new Set(), indices: [] });
      });

      // Also get text nodes that haven't been wrapped
      const textNodes = getTextNodes(wrapper);
      textNodes.forEach((node) => {
        if (node.parentElement && node.parentElement.dataset.glitchWord !== undefined) return;
        entries.push({ node, original: node.textContent, revealed: new Set(), indices: [] });
      });

      if (!entries.length) { isRunning.current = false; return; }

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

        if (elapsed < scramblePhase + holdPhase) {
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
    let ready = false;
    const sectionIds = ['hero', 'about', 'experience', 'achievements', 'education', 'skills', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && currentSection !== id) {
            const isFirst = currentSection === null;
            currentSection = id;
            if (!isFirst && ready) triggerGlitch();
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    document.addEventListener('click', triggerGlitch);

    // --- Per-word hover glitch ---
    const wrapTextInSpans = (el) => {
      if (el.dataset.glitchWrapped) return;
      const textNodes = [];
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach((node) => {
        const text = node.textContent;
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        const parts = text.split(/(\s+)/);
        parts.forEach((part) => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.textContent = part;
            span.dataset.glitchWord = part;
            span.style.display = 'inline';
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      });
      el.dataset.glitchWrapped = 'true';
    };

    const scrambleWordIn = (span) => {
      if (activeWords.has(span)) return;
      const original = span.dataset.glitchWord;
      const startTime = performance.now();
      const indices = [];
      for (let i = 0; i < original.length; i++) {
        if (original[i] !== ' ') indices.push(i);
      }
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      const scrambled = new Set();
      let rafId;
      const finalText = original.split('').map((c) =>
        c === ' ' ? ' ' : getRandomChar()
      ).join('');

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / HOVER_DURATION, 1);
        const target = Math.floor(progress * indices.length);

        while (scrambled.size < target) {
          scrambled.add(indices[scrambled.size]);
        }

        let out = '';
        for (let i = 0; i < original.length; i++) {
          if (original[i] === ' ') out += ' ';
          else if (scrambled.has(i)) out += finalText[i];
          else out += original[i];
        }
        span.textContent = out;

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          span.textContent = finalText;
        }
      };

      rafId = requestAnimationFrame(tick);
      activeWords.set(span, { rafId, original, finalText });
    };

    const unscrambleWord = (span) => {
      const state = activeWords.get(span);
      if (!state) return;
      if (state.rafId) cancelAnimationFrame(state.rafId);

      const original = state.original;
      const currentText = span.textContent;
      const startTime = performance.now();
      const indices = [];
      for (let i = 0; i < original.length; i++) {
        if (original[i] !== ' ' && currentText[i] !== original[i]) indices.push(i);
      }
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      const revealed = new Set();
      let rafId;

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / HOVER_DURATION, 1);
        const target = Math.floor(progress * indices.length);

        while (revealed.size < target) {
          revealed.add(indices[revealed.size]);
        }

        let out = '';
        for (let i = 0; i < original.length; i++) {
          if (revealed.has(i) || currentText[i] === original[i]) out += original[i];
          else out += currentText[i];
        }
        span.textContent = out;

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          span.textContent = original;
          activeWords.delete(span);
        }
      };

      rafId = requestAnimationFrame(tick);
      activeWords.set(span, { ...state, rafId });
    };

    const handleMouseOver = (e) => {
      if (isRunning.current) return;
      const target = e.target;
      if (!target || !target.dataset) return;
      if (target.dataset.glitchWord !== undefined) {
        scrambleWordIn(target);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target || !target.dataset) return;
      if (target.dataset.glitchWord !== undefined && activeWords.has(target)) {
        unscrambleWord(target);
      }
    };

    const wrapAllSections = () => {
      const wrapper = document.querySelector('.content-wrapper');
      if (!wrapper) return;
      const els = wrapper.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, div, li');
      els.forEach((el) => {
        if (el.closest('[data-glitch-wrapped]')) return;
        const hasOnlyText = Array.from(el.childNodes).every(
          (n) => n.nodeType === 3 || (n.nodeType === 1 && n.tagName === 'SPAN')
        );
        if (hasOnlyText && el.textContent.trim()) {
          wrapTextInSpans(el);
        }
      });
    };

    setTimeout(wrapAllSections, 500);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('click', triggerGlitch);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      observers.forEach((o) => o.disconnect());
      activeWords.forEach((state, span) => {
        if (state.rafId) cancelAnimationFrame(state.rafId);
        span.textContent = state.original;
      });
    };
  }, []);

  return null;
}
