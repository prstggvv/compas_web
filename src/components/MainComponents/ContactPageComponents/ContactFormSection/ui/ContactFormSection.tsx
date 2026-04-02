import { type FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import cls from './ContactFormSection.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { useForm } from '../../../../../shared/lib/hooks/useForm';
import { createStaggerContainer, fadeUp, fadeUpSoft, itemReveal, VIEWPORT_ONCE } from '../../../../../shared/lib/motion';
import type { ContactFormState } from '../../../../../types';

interface ContactFormSectionProps {
  className?: string;
}

const initialFormValues: ContactFormState = {
  name: '',
  phone: '+7',
  email: '',
  company: '',
  message: '',
  agreement: true,
};

export const ContactFormSection = ({ className }: ContactFormSectionProps) => {
  const [values, setValues] = useState<ContactFormState>(initialFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { handleChange, handlePhoneChange } = useForm(values, setValues);

  const canSubmit = useMemo(
    () => values.name.trim().length > 1 && values.phone.replace(/\D/g, '').length >= 11,
    [values.name, values.phone]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsSubmitted(true);
    setValues(initialFormValues);
  };

  return (
    <motion.section
      className={classNames(cls.section, {}, [className ?? ''])}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={fadeUp}
    >
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.layout, {}, [])}>
          <motion.div className={classNames(cls.copy, {}, [])} variants={fadeUpSoft}>
            <h2 className={classNames(cls.title, {}, [])}>
              Оставить
              <br />
              заявку
            </h2>
            <p className={classNames(cls.text, {}, [])}>
              Заполните форму, и наш специалист свяжется с вами в течение 30 минут, чтобы уточнить задачу,
              сроки и состав поставки.
            </p>
          </motion.div>

          <motion.div
            className={classNames(cls.formWrap, {}, [])}
            variants={createStaggerContainer(0.12, 0.12)}
          >
            <form className={classNames(cls.form, {}, [])} onSubmit={handleSubmit}>
              <motion.div className={classNames(cls.fields, {}, [])} variants={itemReveal}>
                <label className={classNames(cls.field, {}, [])}>
                  <span className={classNames(cls.fieldLabel, {}, [])}>Ваше имя</span>
                  <input
                    className={classNames(cls.input, {}, [])}
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>

                <label className={classNames(cls.field, {}, [])}>
                  <span className={classNames(cls.fieldLabel, {}, [])}>Контактный телефон</span>
                  <input
                    className={classNames(cls.input, {}, [])}
                    type="tel"
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    value={values.phone}
                    onChange={handlePhoneChange}
                    autoComplete="tel"
                    required
                  />
                </label>
              </motion.div>

              <motion.div className={classNames(cls.bottomRow, {}, [])} variants={itemReveal}>
                <p className={classNames(cls.policy, {}, [])}>
                  Отправляя заявку, вы соглашаетесь с{' '}
                  <a href="#" className={classNames(cls.policyLink, {}, [])}>
                    политикой конфиденциальности
                  </a>{' '}
                  и обработкой персональных данных.
                </p>

                <button
                  type="submit"
                  className={classNames(cls.button, { [cls.buttonDisabled]: !canSubmit }, [])}
                  disabled={!canSubmit}
                >
                  Отправить заявку
                </button>
              </motion.div>
            </form>

            {isSubmitted ? (
              <motion.div
                className={classNames(cls.success, {}, [])}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <p className={classNames(cls.successLabel, {}, [])}>Успешно</p>
                <p className={classNames(cls.successText, {}, [])}>
                  Заявка принята. Мы свяжемся с вами в ближайшее время.
                </p>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
