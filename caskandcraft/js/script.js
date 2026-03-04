/**
 * Cask & Craft — Main Script
 * Features: Live Menu Search, Scroll FX, Navbar, Mobile Menu, Tabs
 */

'use strict';

/* ── Debounce Utility ── */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initLiveSearch();
  initMenuTabs();
  initScrollReveal();
  initStickyNavScroll();
  initSmoothScroll();
});

/* ── Navbar Scroll Effect ── */
function initStickyNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── Hamburger / Mobile Menu ── */
function initNavbar() {}

function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ══════════════════════════════════════
   LIVE MENU SEARCH — Core Feature
   ══════════════════════════════════════ */
function initLiveSearch() {
  const searchInput = document.getElementById('menuSearch');
  const clearBtn = document.getElementById('searchClear');
  const noResults = document.getElementById('noResults');
  const categoriesEl = document.querySelectorAll('.menu-category');
  const allItems = document.querySelectorAll('.menu-item');
  const tabBtns = document.querySelectorAll('.tab-btn');

  if (!searchInput) return;

  // Build searchable data cache once (performance)
  const itemData = Array.from(allItems).map(el => ({
    el,
    name: (el.dataset.name || '').toLowerCase(),
    category: (el.dataset.category || '').toLowerCase(),
    price: (el.dataset.price || '').toLowerCase(),
    desc: (el.dataset.desc || '').toLowerCase(),
  }));

  const performSearch = debounce((query) => {
    const q = query.trim().toLowerCase();

    // Toggle clear button
    if (clearBtn) clearBtn.classList.toggle('visible', q.length > 0);

    if (!q) {
      // Reset everything
      resetSearch(allItems, categoriesEl, noResults, tabBtns);
      return;
    }

    // Disable tab filtering during search
    tabBtns.forEach(b => b.classList.remove('active'));

    let totalVisible = 0;

    // Filter each category
    const categoryVisibility = {};

    itemData.forEach(({ el, name, category, price, desc }) => {
      const match = name.includes(q) || category.includes(q) || price.includes(q) || desc.includes(q);

      if (match) {
        el.classList.remove('hidden-item');
        el.classList.add('highlight');
        totalVisible++;
        // Mark category as having visible items
        categoryVisibility[el.closest('.menu-category')?.dataset.cat] = true;
      } else {
        el.classList.add('hidden-item');
        el.classList.remove('highlight');
      }
    });

    // Show/hide categories based on whether they have results
    categoriesEl.forEach(cat => {
      const hasMatcher = categoryVisibility[cat.dataset.cat];
      cat.classList.toggle('hidden', !hasMatcher);
    });

    // No results message
    if (noResults) noResults.classList.toggle('show', totalVisible === 0);

  }, 180);

  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      resetSearch(allItems, categoriesEl, noResults, tabBtns);
      clearBtn.classList.remove('visible');
    });
  }
}

function resetSearch(allItems, categoriesEl, noResults, tabBtns) {
  allItems.forEach(el => {
    el.classList.remove('hidden-item', 'highlight');
  });
  categoriesEl.forEach(cat => cat.classList.remove('hidden'));
  if (noResults) noResults.classList.remove('show');

  // Re-apply active tab
  const activeTab = document.querySelector('.tab-btn.active');
  if (activeTab) {
    filterByTab(activeTab.dataset.tab, categoriesEl);
  }
}

/* ── Menu Tabs ── */
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const categoriesEl = document.querySelectorAll('.menu-category');
  const searchInput = document.getElementById('menuSearch');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Clear search when switching tabs
      if (searchInput && searchInput.value) {
        searchInput.value = '';
        const clearBtn = document.getElementById('searchClear');
        if (clearBtn) clearBtn.classList.remove('visible');
        const noResults = document.getElementById('noResults');
        if (noResults) noResults.classList.remove('show');
      }

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.dataset.tab;
      filterByTab(tab, categoriesEl);

      // Restore all items visibility
      document.querySelectorAll('.menu-item').forEach(el => {
        el.classList.remove('hidden-item', 'highlight');
      });
    });
  });
}

function filterByTab(tab, categoriesEl) {
  categoriesEl.forEach(cat => {
    if (tab === 'all') {
      cat.classList.remove('hidden');
    } else {
      const match = cat.dataset.group === tab;
      cat.classList.toggle('hidden', !match);
    }
  });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ── Smooth Scroll for Anchors ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
