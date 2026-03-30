import signsImg from '../../../../shared/assets/images/photos/signs.jpg';
import markingsImg from '../../../../shared/assets/images/photos/markings.jpg';
import nerovnostImg from '../../../../shared/assets/images/photos/nerovnost.jpg';

export type ProductCategoryId =
  | 'all'
  | 'road-signs'
  | 'metal'
  | 'barriers'
  | 'street'
  | 'marking'
  | 'ppe'
  | 'fasteners';

export interface ProductCategory {
  id: ProductCategoryId;
  label: string;
}

export interface ProductFilterGroup {
  id: 'type' | 'application';
  title: string;
  options: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  category: Exclude<ProductCategoryId, 'all'>;
  categoryLabel: string;
  type: string;
  application: string;
  image: string;
}

export const productCategories: ProductCategory[] = [
  { id: 'all', label: 'Все' },
  { id: 'road-signs', label: 'Дорожные знаки и ОДД' },
  { id: 'metal', label: 'Металлоконструкции' },
  { id: 'barriers', label: 'Ограждения' },
  { id: 'street', label: 'МАФ и остановки' },
  { id: 'marking', label: 'Материалы для разметки' },
  { id: 'ppe', label: 'СИЗ и спецодежда' },
  { id: 'fasteners', label: 'Крепеж и метизы' },
];

export const productFilterGroups: ProductFilterGroup[] = [
  {
    id: 'type',
    title: 'Тип продукции',
    options: ['Стандартный (ГОСТ)', 'Индивидуальный проект', 'Временное использование'],
  },
  {
    id: 'application',
    title: 'Назначение',
    options: ['Городская среда', 'Автомагистрали', 'Паркинги и ТЦ', 'Строительные объекты'],
  },
];

export const productItems: ProductItem[] = [
  {
    id: 'child-warning',
    name: 'Знак 1.23 Осторожно, дети',
    description: 'Типоразмер II, пленка тип А, оцинкованная сталь 0.8 мм',
    category: 'road-signs',
    categoryLabel: 'Дорожные знаки и ОДД',
    type: 'Стандартный (ГОСТ)',
    application: 'Городская среда',
    image: signsImg,
  },
  {
    id: 'pedestrian-crossing',
    name: 'Знак 5.19.1 Пешеходный переход',
    description: 'Светодиодный импульсный, автономный на солнечной батарее',
    category: 'road-signs',
    categoryLabel: 'Дорожные знаки и ОДД',
    type: 'Индивидуальный проект',
    application: 'Паркинги и ТЦ',
    image: signsImg,
  },
  {
    id: 'support-frame',
    name: 'Рамная опора РМП-8',
    description: 'Горячее цинкование, комплект закладных и паспорт изделия',
    category: 'metal',
    categoryLabel: 'Металлоконструкции',
    type: 'Стандартный (ГОСТ)',
    application: 'Автомагистрали',
    image: nerovnostImg,
  },
  {
    id: 'cantilever',
    name: 'Выносная консоль под указатель',
    description: 'Изготовление под проект с проверкой нагрузки и узлов крепления',
    category: 'metal',
    categoryLabel: 'Металлоконструкции',
    type: 'Индивидуальный проект',
    application: 'Строительные объекты',
    image: nerovnostImg,
  },
  {
    id: 'pedestrian-fence',
    name: 'Пешеходное ограждение ПО-1',
    description: 'Секционное исполнение, порошковая окраска и крепеж в комплекте',
    category: 'barriers',
    categoryLabel: 'Ограждения',
    type: 'Стандартный (ГОСТ)',
    application: 'Городская среда',
    image: markingsImg,
  },
  {
    id: 'temporary-fence',
    name: 'Временное ограждение для работ',
    description: 'Быстрый монтаж на объекте, устойчиво к повторной установке',
    category: 'barriers',
    categoryLabel: 'Ограждения',
    type: 'Временное использование',
    application: 'Строительные объекты',
    image: markingsImg,
  },
  {
    id: 'bus-stop',
    name: 'Остановочный павильон П-3',
    description: 'Каркас, остекление и навигация под бренд территории',
    category: 'street',
    categoryLabel: 'МАФ и остановки',
    type: 'Индивидуальный проект',
    application: 'Городская среда',
    image: nerovnostImg,
  },
  {
    id: 'bench-bin-set',
    name: 'Комплект лавка + урна',
    description: 'Базовое решение для благоустройства дворов и общественных зон',
    category: 'street',
    categoryLabel: 'МАФ и остановки',
    type: 'Стандартный (ГОСТ)',
    application: 'Паркинги и ТЦ',
    image: signsImg,
  },
  {
    id: 'thermoplastic',
    name: 'Термопластик для разметки',
    description: 'Высокая износостойкость для городских дорог и магистралей',
    category: 'marking',
    categoryLabel: 'Материалы для разметки',
    type: 'Стандартный (ГОСТ)',
    application: 'Автомагистрали',
    image: markingsImg,
  },
  {
    id: 'cold-plastic',
    name: 'Холодный пластик',
    description: 'Подходит для локального ремонта и сложных узлов движения',
    category: 'marking',
    categoryLabel: 'Материалы для разметки',
    type: 'Индивидуальный проект',
    application: 'Паркинги и ТЦ',
    image: markingsImg,
  },
  {
    id: 'signal-vest',
    name: 'Сигнальный жилет 2 класса',
    description: 'Для дорожных бригад, служб содержания и монтажных команд',
    category: 'ppe',
    categoryLabel: 'СИЗ и спецодежда',
    type: 'Стандартный (ГОСТ)',
    application: 'Строительные объекты',
    image: signsImg,
  },
  {
    id: 'anchor-group',
    name: 'Анкерная группа М24',
    description: 'Комплект крепежа для опор, рам и монтажных узлов',
    category: 'fasteners',
    categoryLabel: 'Крепеж и метизы',
    type: 'Стандартный (ГОСТ)',
    application: 'Автомагистрали',
    image: nerovnostImg,
  },
];
