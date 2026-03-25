export type ContactFormState = {
  name: string;
  phone: string;
  hasPromoCode: boolean;
  promoCode: string;
  selectedServices: string[];
};

export interface IServiceProps {
  id: number;
  title: string;
  text?: string | '';
  list?: string[];
  master?: string | '';
  image: string;
  price: string;
  gender: 'men' | 'women' | 'unisex';
  genderText: 'Для мужчин' | 'Для женщин' | 'Для всех';
  duration: string;
}

export interface ICardProps {
  className?: string;
  title: string;
  image: string;
  price: string;
  onMore?: () => void;
  gender?: string;
  onBuy?: (title: string) => void;
}

export interface IReviewsProps {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}
