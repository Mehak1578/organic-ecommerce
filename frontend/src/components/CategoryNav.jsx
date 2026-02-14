import { useEffect, useMemo, useRef } from 'react';
import './CategoryNav.css';

function clampNumber(value) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function getCategoryCount(categoryId, countsByCategory, totalCount) {
  if (categoryId === 'all') return clampNumber(totalCount);
  return clampNumber(countsByCategory?.[categoryId]);
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onSelectCategory,
  countsByCategory,
  totalCount,
  isLoading = false
}) {
  const listRef = useRef(null);

  const activeIndex = useMemo(() => {
    const index = (categories || []).findIndex((c) => c.id === selectedCategory);
    return index >= 0 ? index : 0;
  }, [categories, selectedCategory]);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const activeButton = listEl.querySelector('[data-active="true"]');
    if (!activeButton) return;

    activeButton.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }, [selectedCategory]);

  const onKeyDown = (e) => {
    const listEl = listRef.current;
    if (!listEl) return;

    const buttons = Array.from(listEl.querySelectorAll('button[data-category-id]'));
    if (buttons.length === 0) return;

    const focusedIndex = Math.max(0, buttons.indexOf(document.activeElement));
    const currentIndex = focusedIndex >= 0 ? focusedIndex : activeIndex;

    const moveFocus = (nextIndex) => {
      const target = buttons[nextIndex];
      if (target) target.focus();
    };

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault();
        moveFocus((currentIndex + 1) % buttons.length);
        break;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault();
        moveFocus((currentIndex - 1 + buttons.length) % buttons.length);
        break;
      }
      case 'Home': {
        e.preventDefault();
        moveFocus(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        moveFocus(buttons.length - 1);
        break;
      }
      case 'Enter':
      case ' ': {
        if (document.activeElement?.dataset?.categoryId) {
          e.preventDefault();
          document.activeElement.click();
        }
        break;
      }
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <nav className="categoryNav" aria-label="Product categories">
        <div className="categoryNav-header">
          <h3 className="categoryNav-title">Categories</h3>
        </div>
        <div className="categoryNav-skeleton" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="categoryNav-skeletonItem" />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="categoryNav" aria-label="Product categories">
      <div className="categoryNav-header">
        <h3 className="categoryNav-title">Categories</h3>
      </div>

      <div
        ref={listRef}
        className="categoryNav-list"
        role="tablist"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {(categories || []).map((category, index) => {
          const isActive = selectedCategory === category.id;
          const isPrimary = category.id === 'all';
          const count = getCategoryCount(category.id, countsByCategory, totalCount);

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-active={isActive}
              data-category-id={category.id}
              data-index={index}
              tabIndex={isActive ? 0 : -1}
              className={[
                'categoryNav-item',
                isActive ? 'is-active' : '',
                isPrimary ? 'is-primary' : ''
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelectCategory(category.id)}
            >
              <span className="categoryNav-icon" aria-hidden="true">
                {category.icon}
              </span>
              <span className="categoryNav-name" title={category.name}>
                {category.name}
              </span>
              <span className="categoryNav-badge" aria-label={`${count} products`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
