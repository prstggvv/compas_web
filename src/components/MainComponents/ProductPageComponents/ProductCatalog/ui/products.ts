// Знаки
import signsImg from '../../../../../shared/assets/images/photos/signs.jpg';
import signsCatalogImgSecond from '../../../../../shared/assets/images/Tovars/Signs/1.jpg';
import signsCatalogImgThird from '../../../../../shared/assets/images/Tovars/Signs/2.jpg';

// Металоконструкции
import metalCatalogImgFirst from '../../../../../shared/assets/images/Tovars/metall/1.jpg';
import metalCatalogImgSecond from '../../../../../shared/assets/images/Tovars/metall/2.jpg';

// Маф
import mafCatalogImgFirst from '../../../../../shared/assets/images/Tovars/Maf/1.jpg';
import mafCatalogImgSecond from '../../../../../shared/assets/images/Tovars/Maf/2.jpg';
import mafCatalogImgThird from '../../../../../shared/assets/images/Tovars/Maf/3.jpg';

// Ограждения
import ogrCatalogImgFirst from '../../../../../shared/assets/images/Tovars/Ograshdenie/3.jpg';
import ogrCatalogImgSecond from '../../../../../shared/assets/images/Tovars/Ograshdenie/1.jpg';

// Разметка
import markingsImgFirst from '../../../../../shared/assets/images/Tovars/markings/1.jpg';
import markingsImgSecond from '../../../../../shared/assets/images/Tovars/markings/2.jpg';
import markingsImgThird from '../../../../../shared/assets/images/Tovars/markings/3.jpg';

import markingsImg from '../../../../../shared/assets/images/photos/markings.jpg';
import nerovnostImg from '../../../../../shared/assets/images/photos/nerovnost.jpg';

// Сиз и спецодежда
import specClothCatalogImgFirst from '../../../../../shared/assets/images/Tovars/SpecClothes/1.jpeg';
import specClothCatalogImgSecond from '../../../../../shared/assets/images/Tovars/SpecClothes/2.webp';

// Крепеж
import crepCatalogImgFirst from '../../../../../shared/assets/images/Tovars/matiz/1.jpg';

export type ProductCategoryId =
  | 'road-signs'
  | 'metal'
  | 'barriers'
  | 'street'
  | 'marking'
  | 'ppe'
  | 'fasteners';

export interface ProductCategoryGalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductCategorySpec {
  label: string;
  value: string;
}

export interface ProductCategoryStatus {
  id: string;
  label: string;
}

export interface ProductCategoryContent {
  id: ProductCategoryId;
  title: string;
  label: string;
  description: string;
  image: string;
  article: string;
  lead: string;
  assortmentTitle: string;
  assortmentItems: string[];
  paragraphs: string[];
  specs: ProductCategorySpec[];
  gallery: ProductCategoryGalleryImage[];
  statuses: ProductCategoryStatus[];
  featuredOnMain: boolean;
}

export const productCategoryContent: ProductCategoryContent[] = [
  {
    id: 'road-signs',
    title: 'Дорожные знаки и элементы ОДД',
    label: 'Дорожные знаки и элементы ОДД',
    description: 'Знаки ГОСТ, индивидуальные решения, стойки, опоры и комплекты для организации движения.',
    image: signsCatalogImgSecond,
    article: 'ODD-CATEGORY',
    lead: 'Производим и поставляем знаки, указатели и элементы организации дорожного движения для городских улиц, трасс и объектов благоустройства.',
    assortmentTitle: 'В ассортименте',
    assortmentItems: [
      'Дорожные знаки ГОСТ всех типоразмеров',
      'Знаки индивидуального проектирования',
      'Временные дорожные знаки на желтом фоне',
      'Металлические стойки, опоры и кронштейны',
      'Комплекты ТСОДД для перекрестков и улиц',
      'Светодиодные дорожные знаки и табло',
    ],
    paragraphs: [
      'Мы производим и поставляем знаки и указатели индивидуального проектирования для населенных пунктов, рекреационных объектов и улично-дорожной сети. Изготовление выполняется только в соответствии с требованиями ГОСТ и проектной документации.',
      'Выпускаем дорожные знаки стандартных и больших размеров, решения маршрутной навигации, туристические указатели и комплекты для организации движения. Конструкции выдерживают ветровые и динамические нагрузки в соответствии с ГОСТ 52290-2004.',
    ],
    specs: [
      { label: 'Сертификация', value: 'ГОСТ Р 52290-2004, ГОСТ 32945-2014' },
      { label: 'Материалы', value: 'Оцинкованная сталь 0.8-1.2 мм, алюминий' },
      { label: 'Применение', value: 'Городские улицы, трассы, рекреационные объекты' },
    ],
    gallery: [
      { id: 'main', src: signsImg, alt: 'Дорожные знаки и элементы ОДД' },
      { id: 'detail', src: signsCatalogImgSecond, alt: 'Опоры и элементы дорожной инфраструктуры' },
      { id: 'context', src: signsCatalogImgThird, alt: 'Контекст применения на объекте' },
    ],
    statuses: [
      { id: 'gost', label: 'ГОСТ' },
      { id: 'custom', label: 'Индивидуальные проекты' },
      { id: 'delivery', label: 'Доставка по РФ' },
    ],
    featuredOnMain: true,
  },
  {
    id: 'metal',
    title: 'Металлоконструкции',
    label: 'Металлоконструкции',
    description: 'Рамные и трубные опоры, консоли, закладные детали и анкерные группы для дорожных объектов.',
    image: metalCatalogImgFirst,
    article: 'METAL-CATEGORY',
    lead: 'Изготавливаем металлоконструкции для дорог и территорий: от типовых опор до индивидуальных несущих решений под проект.',
    assortmentTitle: 'В ассортименте',
    assortmentItems: [
      'Рамные опоры РМГ, РМП и РМТ',
      'Трубные Г-образные опоры',
      'Выносные консоли под указатели',
      'Закладные детали под монтаж',
      'Анкерные группы и комплектующие',
      'Металлоконструкции по проекту КМ/КМД',
    ],
    paragraphs: [
      'Поставляем металлоконструкции для размещения указателей, навигации, освещения и других элементов дорожной инфраструктуры. Конструкции рассчитываются под проектные нагрузки, условия региона и особенности монтажа.',
      'В состав поставки могут входить несущие элементы, закладные детали, анкерные группы, крепеж, паспорт изделия и сопровождение по рабочей документации. Изготовление ведется с учетом требований к долговечности и коррозионной стойкости.',
    ],
    specs: [
      { label: 'Проектирование', value: 'По КМ, КМД и ТЗ заказчика' },
      { label: 'Материалы', value: 'Сталь С245, С345, закладные и анкерные узлы' },
      { label: 'Покрытие', value: 'Горячее цинкование, ЛКМ по ТЗ' },
    ],
    gallery: [
      { id: 'main', src: metalCatalogImgFirst, alt: 'Металлоконструкции для дорог и территорий' },
      { id: 'detail', src: metalCatalogImgSecond, alt: 'Монтажные узлы и металлоизделия' },
    ],
    statuses: [
      { id: 'calc', label: 'Расчет нагрузок' },
      { id: 'passport', label: 'Паспорт изделия' },
      { id: 'delivery', label: 'Поставка комплектом' },
    ],
    featuredOnMain: true,
  },
  {
    id: 'street',
    title: 'МАФ и остановки',
    label: 'МАФ и остановки',
    description: 'Павильоны, навесы, перголы и элементы благоустройства для городской среды и общественных зон.',
    image: mafCatalogImgFirst,
    article: 'STREET-CATEGORY',
    lead: 'Разрабатываем и поставляем остановочные павильоны и малые архитектурные формы для городской среды и общественных пространств.',
    assortmentTitle: 'В ассортименте',
    assortmentItems: [
      'Остановочные павильоны',
      'Индивидуальные решения МАФ',
      'Навесы и перголы',
      'Урны, лавки и ограждения',
      'Комплекты благоустройства территорий',
      'Навигационные элементы и интеграция бренда',
    ],
    paragraphs: [
      'Производим остановочные павильоны, навесы, перголы и малые архитектурные формы для благоустройства улиц, парков, дворов и общественных зон. Решения адаптируются под архитектуру территории и требования заказчика.',
      'Поставка может включать каркасы, остекление, навигацию, скамьи, урны и сопутствующие элементы. Доступны как типовые изделия, так и индивидуальные исполнения под бренд территории или концепцию проекта.',
    ],
    specs: [
      { label: 'Формат', value: 'Типовые и индивидуальные решения' },
      { label: 'Материалы', value: 'Сталь, стекло, поликарбонат, древесно-полимерные элементы' },
      { label: 'Комплектация', value: 'Каркас, заполнение, навигация, мебель, крепеж' },
    ],
    gallery: [
      { id: 'main', src: mafCatalogImgFirst, alt: 'МАФ и остановочные павильоны' },
      { id: 'detail', src: mafCatalogImgSecond, alt: 'Навигационные и конструктивные элементы' },
      { id: 'context', src: mafCatalogImgThird, alt: 'Объект городской среды' },
    ],
    statuses: [
      { id: 'custom', label: 'Под архитектуру объекта' },
      { id: 'branding', label: 'Бренд территории' },
      { id: 'delivery', label: 'Логистика по РФ' },
    ],
    featuredOnMain: true,
  },
  {
    id: 'barriers',
    title: 'Ограждения',
    label: 'Ограждения',
    description: 'Барьерные, пешеходные и временные решения для дорог, территорий и зон производства работ.',
    image: ogrCatalogImgFirst,
    article: 'BARRIER-CATEGORY',
    lead: 'Поставляем ограждения для дорог, общественных территорий и временных схем организации движения.',
    assortmentTitle: 'В ассортименте',
    assortmentItems: [
      'Барьерные дорожные ограждения',
      'Пешеходные секционные ограждения',
      'Временные ограждения для работ',
      'Комплектующие и стойки крепления',
      'Решения для мостов и подходов',
      'Изделия под проект объекта',
    ],
    paragraphs: [
      'Изготавливаем и комплектуем ограждения для повышения безопасности дорожного движения, разделения потоков и защиты зон производства работ. Доступны как типовые изделия, так и решения под конкретный объект.',
      'Поставки могут включать секции, стойки, крепеж, закладные и схемы монтажа. Для городских и магистральных участков подбираем исполнение по требованиям эксплуатации, нагрузкам и архитектурной среде.',
    ],
    specs: [
      { label: 'Типы', value: 'Барьерные, пешеходные, временные' },
      { label: 'Материалы', value: 'Оцинкованная сталь, профильные секции, крепеж' },
      { label: 'Поставка', value: 'Комплектующие, монтажные узлы, документация' },
    ],
    gallery: [
      { id: 'main', src: ogrCatalogImgFirst, alt: 'Ограждения для дорог и территорий' },
      { id: 'detail', src: ogrCatalogImgSecond, alt: 'Секции и крепежные элементы' },
    ],
    statuses: [
      { id: 'ready', label: 'Типовые решения' },
      { id: 'project', label: 'Под объект' },
      { id: 'delivery', label: 'Доставка по РФ' },
    ],
    featuredOnMain: false,
  },
  {
    id: 'marking',
    title: 'Материалы для разметки',
    label: 'Материалы для разметки',
    description: 'Краска, термопластик, холодный пластик и стеклошарики для долговечной дорожной разметки.',
    image: markingsImgThird,
    article: 'MARKING-CATEGORY',
    lead: 'Подбираем и поставляем материалы для долговечной дорожной разметки под условия эксплуатации и технологию нанесения.',
    assortmentTitle: 'В ассортименте',
    assortmentItems: [
      'Краска для дорожной разметки',
      'Термопластик для магистралей и улиц',
      'Холодный пластик для локальных работ',
      'Стеклошарики для световозвращения',
      'Грунты и сопутствующие материалы',
      'Комплектация под технологию нанесения',
    ],
    paragraphs: [
      'Поставляем материалы для продольной, поперечной и специальной разметки на городских улицах, магистралях, парковках и объектах благоустройства. Подбираем составы под интенсивность движения, климат и требования к сроку службы.',
      'В ассортимент входят термопластик, холодный пластик, краска и стеклошарики, а также сопутствующие материалы и рекомендации по технологии нанесения. Возможна комплектация объекта под конкретную разметочную задачу.',
    ],
    specs: [
      { label: 'Материалы', value: 'Краска, термопластик, холодный пластик, стеклошарики' },
      { label: 'Применение', value: 'Улицы, магистрали, парковки, общественные зоны' },
      { label: 'Подбор', value: 'По климату, нагрузке и технологии нанесения' },
    ],
    gallery: [
      { id: 'main', src: markingsImgThird, alt: 'Материалы для дорожной разметки' },
      { id: 'detail', src: markingsImgSecond, alt: 'Упаковка и состав материалов' },
    ],
    statuses: [
      { id: 'stock', label: 'Складская поставка' },
      { id: 'support', label: 'Технологическая поддержка' },
      { id: 'delivery', label: 'Доставка по РФ' },
    ],
    featuredOnMain: false,
  },
  {
    id: 'ppe',
    title: 'СИЗ и спецодежда',
    label: 'СИЗ и спецодежда',
    description: 'Сигнальные жилеты, защитная экипировка и комплектование дорожных, монтажных и сервисных бригад.',
    image: specClothCatalogImgFirst,
    article: 'PPE-CATEGORY',
    lead: 'Комплектуем дорожные, сервисные и монтажные бригады средствами индивидуальной защиты и спецодеждой.',
    assortmentTitle: 'В ассортименте',
    assortmentItems: [
      'Сигнальные жилеты повышенной видимости',
      'Спецодежда для дорожных и монтажных работ',
      'Влагозащитная экипировка',
      'Каски, перчатки и базовые СИЗ',
      'Комплектование бригад под объект',
      'Брендирование и поставка партиями',
    ],
    paragraphs: [
      'Поставляем спецодежду и средства индивидуальной защиты для дорожных бригад, служб содержания, монтажников и подрядных организаций. Подбираем комплектацию под тип работ, сезонность и требования к видимости персонала.',
      'Доступны как единичные позиции, так и поставки партиями для целых команд. При необходимости подбираем размерные ряды, дополнительные элементы экипировки и варианты брендирования.',
    ],
    specs: [
      { label: 'Назначение', value: 'Дорожные, монтажные и эксплуатационные работы' },
      { label: 'Позиции', value: 'Жилеты, одежда, каски, перчатки, защита' },
      { label: 'Формат поставки', value: 'Партии под объект и постоянное снабжение' },
    ],
    gallery: [
      { id: 'main', src: specClothCatalogImgFirst, alt: 'СИЗ и спецодежда для дорожных бригад' },
      { id: 'detail', src: specClothCatalogImgSecond, alt: 'Световозвращающие элементы и экипировка' },
    ],
    statuses: [
      { id: 'sizes', label: 'Размерный ряд' },
      { id: 'branding', label: 'Брендирование' },
      { id: 'delivery', label: 'Поставка партиями' },
    ],
    featuredOnMain: false,
  },
  {
    id: 'fasteners',
    title: 'Крепеж и метизы',
    label: 'Крепеж и метизы',
    description: 'Анкерные группы, крепежные узлы и монтажные комплекты для опор и металлоконструкций.',
    image: crepCatalogImgFirst,
    article: 'FASTENER-CATEGORY',
    lead: 'Комплектуем объекты крепежом, анкерными группами и монтажными узлами для дорожных и металлических конструкций.',
    assortmentTitle: 'В ассортименте',
    assortmentItems: [
      'Анкерные группы для опор и рам',
      'Закладные детали и шаблоны',
      'Крепеж для металлоконструкций',
      'Монтажные метизы и расходники',
      'Комплекты шайб, гаек и шпилек',
      'Поставка узлов под проект',
    ],
    paragraphs: [
      'Поставляем крепежные решения для опор, рамных конструкций, МАФ и других металлоизделий, где важна надежная фиксация и соответствие проектным нагрузкам. Формируем комплект под конкретный узел монтажа.',
      'В состав поставки могут входить анкерные группы, шаблоны, закладные детали, шпильки, гайки, шайбы и сопроводительная документация. Это позволяет собирать комплект без разрозненных закупок и ускорять выход на монтаж.',
    ],
    specs: [
      { label: 'Позиции', value: 'Анкерные группы, закладные, метизы, монтажные узлы' },
      { label: 'Материалы', value: 'Сталь 09Г2С, С245 и другие по проекту' },
      { label: 'Комплектация', value: 'Под узел, проект или спецификацию заказчика' },
    ],
    gallery: [
      { id: 'main', src: crepCatalogImgFirst, alt: 'Крепеж и метизы для дорожных объектов' },
    ],
    statuses: [
      { id: 'kit', label: 'Комплект под монтаж' },
      { id: 'docs', label: 'Документация' },
      { id: 'delivery', label: 'Доставка по РФ' },
    ],
    featuredOnMain: false,
  },
];

export type ProductCategoryCard = Pick<
  ProductCategoryContent,
  'id' | 'title' | 'label' | 'description' | 'image' | 'featuredOnMain'
>;

export const productCategoryCards: ProductCategoryCard[] = productCategoryContent.map((category) => ({
  id: category.id,
  title: category.title,
  label: category.label,
  description: category.description,
  image: category.image,
  featuredOnMain: category.featuredOnMain,
}));

export const featuredProductCategoryCards = productCategoryCards.filter((category) => category.featuredOnMain);

export const productCategoryContentById = Object.fromEntries(
  productCategoryContent.map((category) => [category.id, category]),
) as Record<ProductCategoryId, ProductCategoryContent>;
