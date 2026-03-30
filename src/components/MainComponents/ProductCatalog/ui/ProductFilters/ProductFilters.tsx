import { motion } from 'framer-motion';
import { ChevronDown, RotateCcw } from 'lucide-react';
import cls from './ProductFilters.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import type { ProductFilterGroup } from '../../model/products';

interface ProductFiltersProps {
  groups: ProductFilterGroup[];
  expanded: Record<'type' | 'application', boolean>;
  selectedFilters: {
    type: string[];
    application: string[];
  };
  onToggleGroup: (groupId: 'type' | 'application') => void;
  onToggleOption: (groupId: 'type' | 'application', option: string) => void;
  onReset: () => void;
}

export const ProductFilters = ({
  groups,
  expanded,
  selectedFilters,
  onToggleGroup,
  onToggleOption,
  onReset,
}: ProductFiltersProps) => {
  return (
    <aside className={classNames(cls.sidebar, {}, [])} aria-label="Фильтрация параметров">
      <p className={classNames(cls.caption, {}, [])}>Фильтрация параметров</p>

      <div className={classNames(cls.groups, {}, [])}>
        {groups.map((group) => (
          <section key={group.id} className={classNames(cls.group, {}, [])}>
            <button
              type="button"
              className={classNames(cls.groupButton, {}, [])}
              onClick={() => onToggleGroup(group.id)}
              aria-expanded={expanded[group.id]}
            >
              <span className={classNames(cls.groupTitle, {}, [])}>{group.title}</span>
              <motion.span
                className={classNames(cls.groupIconWrap, {}, [])}
                animate={{ rotate: expanded[group.id] ? 180 : 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <ChevronDown className={classNames(cls.groupIcon, {}, [])} strokeWidth={1.8} />
              </motion.span>
            </button>

            {expanded[group.id] ? (
              <div className={classNames(cls.options, {}, [])}>
                {group.options.map((option) => {
                  const isSelected = selectedFilters[group.id].includes(option);

                  return (
                    <button
                      key={option}
                      type="button"
                      className={classNames(cls.optionButton, { [cls.optionButtonActive]: isSelected }, [])}
                      onClick={() => onToggleOption(group.id, option)}
                    >
                      <span className={classNames(cls.optionMark, { [cls.optionMarkActive]: isSelected }, [])} aria-hidden />
                      <span className={classNames(cls.optionLabel, {}, [])}>{option}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <button type="button" className={classNames(cls.resetButton, {}, [])} onClick={onReset}>
        <RotateCcw className={classNames(cls.resetIcon, {}, [])} strokeWidth={1.8} />
        Сбросить фильтры
      </button>
    </aside>
  );
};
