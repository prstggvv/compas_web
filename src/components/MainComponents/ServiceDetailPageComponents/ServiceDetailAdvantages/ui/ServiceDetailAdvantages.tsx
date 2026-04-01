import { BadgeCheck, BriefcaseBusiness, Building2, Truck, Users } from 'lucide-react';
import cls from './ServiceDetailAdvantages.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';

interface ServiceDetailAdvantagesProps {
  className?: string;
}

const advantages = [
  {
    title: 'Опыт с федеральными клиентами',
    text: 'АО «ВАД», ООО «БалтМостСтрой», ООО «Велен», ГУП РК «Черноморнефтегаз» и другие инфраструктурные заказчики.',
    Icon: BriefcaseBusiness,
  },
  {
    title: 'Собственная техника и склад',
    text: 'Буровые установки, автопарк, специнструмент и склад для оперативной комплектации и выезда на объект.',
    Icon: Truck,
  },
  {
    title: 'СРО, лицензии, тендерная история',
    text: 'Работаем на государственных, промышленных и коммерческих объектах, включая ответственные сооружения.',
    Icon: BadgeCheck,
  },
  {
    title: 'Полный цикл',
    text: 'Берем проект от проектирования и производства до монтажа и сдачи готового объекта заказчику.',
    Icon: Building2,
  },
  {
    title: 'Команда из 30+ специалистов',
    text: 'Проектировщики, ПТО, сварщики и монтажные бригады с практическим опытом реализации сложных задач.',
    Icon: Users,
  },
] as const;

export const ServiceDetailAdvantages = ({ className }: ServiceDetailAdvantagesProps) => {
  return (
    <section
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="service-advantages-title"
    >
      <div className={classNames(cls.container, {}, [])}>
        <h2 id="service-advantages-title" className={classNames(cls.title, {}, [])}>
          Почему выбирают нас
        </h2>

        <div className={classNames(cls.grid, {}, [])}>
          {advantages.map((item) => {
            const Icon = item.Icon;

            return (
              <article key={item.title} className={classNames(cls.card, {}, [])}>
                <div className={classNames(cls.iconWrap, {}, [])}>
                  <Icon className={classNames(cls.icon, {}, [])} strokeWidth={1.8} aria-hidden />
                </div>
                <h3 className={classNames(cls.cardTitle, {}, [])}>{item.title}</h3>
                <p className={classNames(cls.cardText, {}, [])}>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
