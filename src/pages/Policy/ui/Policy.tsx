import { classNames } from '../../../shared/lib/classNames/classNames';
import cls from './Policy.module.css';
import { PageHero } from '../../../shared/ui/PageHero';

interface PolicyProps {
  className?: string;
}

const tocSections = [
  { id: 'general', label: 'Общие положения' },
  { id: 'operator', label: 'Оператор данных' },
  { id: 'data', label: 'Обрабатываемые данные' },
  { id: 'purposes', label: 'Цели обработки' },
  { id: 'legal', label: 'Правовые основания' },
  { id: 'storage', label: 'Порядок хранения' },
  { id: 'security', label: 'Защита данных' },
  { id: 'rights', label: 'Права субъекта' },
  { id: 'final', label: 'Заключительные положения' },
];

const Policy = ({ className }: PolicyProps) => {
  return (
    <main className={classNames(cls.page, {}, [className ?? ''])}>
      <div className={classNames(cls.container, {}, [])}>

        <div className={classNames(cls.header, {}, [])}>
          <PageHero
            breadcrumbs={[
              { label: 'Главная', to: '/' },
              { label: 'Политика обработки персональных данных' },
            ]}
            title="Политика обработки персональных данных"
            description="Политика обработки персональных данных"
          />
          <div className={classNames(cls.headerMeta, {}, [])}>
            <div className={classNames(cls.metaItem, {}, [])}>
              <span className={classNames(cls.metaLabel, {}, [])}>Организация</span>
              <span className={classNames(cls.metaValue, {}, [])}>ООО «Компас»</span>
            </div>
            <div className={classNames(cls.metaItem, {}, [])}>
              <span className={classNames(cls.metaLabel, {}, [])}>Дата обновления</span>
              <span className={classNames(cls.metaValue, {}, [])}>07 мая 2026 г.</span>
            </div>
            <div className={classNames(cls.metaItem, {}, [])}>
              <span className={classNames(cls.metaLabel, {}, [])}>Закон</span>
              <span className={classNames(cls.metaValue, {}, [])}>152-ФЗ «О персональных данных»</span>
            </div>
          </div>
        </div>

        <div className={classNames(cls.body, {}, [])}>

          <aside className={classNames(cls.toc, {}, [])}>
            <p className={classNames(cls.tocLabel, {}, [])}>Содержание</p>
            <nav className={classNames(cls.tocList, {}, [])}>
              {tocSections.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className={classNames(cls.tocItem, {}, [])}>
                  <span className={classNames(cls.tocNum, {}, [])}>{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className={classNames(cls.content, {}, [])}>

            <section id="general" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(01)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Общие положения</h2>
              </div>
              <p className={classNames(cls.sectionText, {}, [])}>
                Настоящая политика обработки персональных данных составлена в соответствии с требованиями
                Федерального закона от 27.07.2006 г. N&nbsp;152-ФЗ «О персональных данных» и определяет
                порядок обработки персональных данных и меры по обеспечению их безопасности, принимаемые
                Оператором и ООО "Компас".
              </p>
            </section>

            <section id="operator" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(02)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Оператор персональных данных</h2>
              </div>
              <p className={classNames(cls.sectionText, {}, [])}>Оператором персональных данных является:</p>
              <div className={classNames(cls.infoCard, {}, [])}>
                <div className={classNames(cls.infoRow, {}, [])}>
                  <span className={classNames(cls.infoKey, {}, [])}>Название</span>
                  <span className={classNames(cls.infoVal, {}, [])}>Общество с ограниченной ответственностью «Компас»</span>
                </div>
                <div className={classNames(cls.infoRow, {}, [])}>
                  <span className={classNames(cls.infoKey, {}, [])}>ИНН</span>
                  <span className={classNames(cls.infoVal, {}, [])}>9102284020</span>
                </div>
                <div className={classNames(cls.infoRow, {}, [])}>
                  <span className={classNames(cls.infoKey, {}, [])}>ОГРН</span>
                  <span className={classNames(cls.infoVal, {}, [])}>1229100010963</span>
                </div>
                <div className={classNames(cls.infoRow, {}, [])}>
                  <span className={classNames(cls.infoKey, {}, [])}>Адрес</span>
                  <span className={classNames(cls.infoVal, {}, [])}>
                    295033, Республика Крым, г. Симферополь, пр-кт Победы, д. 109а, помещ. 35
                  </span>
                </div>
                <div className={classNames(cls.infoRow, {}, [])}>
                  <span className={classNames(cls.infoKey, {}, [])}>Email</span>
                  <span className={classNames(cls.infoVal, {}, [])}>
                    <a href="mailto:kompaskrim@mail.ru" className={classNames(cls.link, {}, [])}>
                      kompaskrim@mail.ru
                    </a>
                  </span>
                </div>
              </div>
            </section>

            <section id="data" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(03)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Персональные данные, которые обрабатываются</h2>
              </div>
              <ul className={classNames(cls.sectionList, {}, [])}>
                <li className={classNames(cls.sectionItem, {}, [])}>Имя пользователя;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Номер телефона;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Технические данные (cookies)</li>
              </ul>
            </section>

            <section id="purposes" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(04)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Цели обработки персональных данных</h2>
              </div>
              <ul className={classNames(cls.sectionList, {}, [])}>
                <li className={classNames(cls.sectionItem, {}, [])}>Обработка заявок от пользователей;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Связь с пользователем по вопросам его обращения;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Оценка объектов для выполнения работ;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Подготовка коммерческого предложения.</li>
              </ul>
            </section>

            <section id="legal" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(05)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Правовые основания обработки</h2>
              </div>
              <p className={classNames(cls.sectionText, {}, [])}>
                Обработка персональных данных осуществляется на основании согласия субъекта персональных данных,
                а также в рамках исполнения договорных обязательств (при их наличии) в соответствии с
                Федеральным законом N&nbsp;152-ФЗ.
              </p>
            </section>

            <section id='storage' className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(06)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Порядок обработки и хранения данных</h2>
              </div>
              <ul className={classNames(cls.sectionList, {}, [])}>
                <li className={classNames(cls.sectionItem, {}, [])}>Обработка персональных данных осуществляется с использованием средств автоматизации и без них;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Персональные данные могут передаваться по электронной почте;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Данные не передаются третьим лицам, кроме случаев, предусмотренных законодательством РФ;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Срок хранения ограничен достижением целей обработки или отзывом согласия пользователем.</li>
              </ul>
            </section>

            <section id="security" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(07)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Меры по защите персональных данных</h2>
              </div>
              <p className={classNames(cls.sectionText, {}, [])}>
                Оператор принимает необходимые организационные и технические меры для защиты персональных данных
                от неправомерного доступа, изменения, раскрытия или уничтожения, включая ограничение доступа к
                данным и применение средств технической защиты информации.
              </p>
            </section>

            <section id="rights" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(08)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Права субъекта персональных данных</h2>
              </div>
              <p className={classNames(cls.sectionText, {}, [])}>Субъект персональных данных имеет право:</p>
              <ul className={classNames(cls.sectionList, {}, [])}>
                <li className={classNames(cls.sectionItem, {}, [])}>Получать информацию о своих персональных данных, обрабатываемых Оператором и ООО "Компас";</li>
                <li className={classNames(cls.sectionItem, {}, [])}>Требовать уточнения, блокирования или уничтожения данных в случае их неполноты или устаревания;</li>
                <li className={classNames(cls.sectionItem, {}, [])}>
                  Отозвать согласие на обработку данных, направив уведомление на{' '}
                  <a href="mailto:kompaskrim@mail.ru" className={classNames(cls.link, {}, [])}>kompaskrim@mail.ru</a>.
                </li>
              </ul>
            </section>

            <section id="final" className={classNames(cls.section, {}, [])}>
              <div className={classNames(cls.sectionHeader, {}, [])}>
                <span className={classNames(cls.sectionNum, {}, [])}>(09)</span>
                <h2 className={classNames(cls.sectionTitle, {}, [])}>Заключительные положения</h2>
              </div>
              <p className={classNames(cls.sectionText, {}, [])}>
                Оператор вправе вносить изменения в настоящую политику. Новая редакция вступает в силу с
                момента её размещения на сайте, если иное не предусмотрено новой редакцией.
              </p>
              <p className={classNames(cls.highlight, {}, [])}>
                Отправляя форму на сайте, пользователь подтверждает, что ознакомлен с настоящей политикой
                и даёт согласие на обработку своих персональных данных в указанных выше целях.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Policy;
