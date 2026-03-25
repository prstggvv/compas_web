import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '../../lib/classNames/classNames';
import { Input } from '../Input/Input';
import { Form } from '../Form/Form';
import { submitContactForm } from '../../lib/api/contactFormApi';
import cls from './ContactForm.module.css';

const PHONE_PREFIX = '+7 ';
const PHONE_PLACEHOLDER = '+7 (___) ___-__-__';
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const ALLOWED_FILE_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/heic',
  'image/heif',
  'text/plain',
  'application/rtf',
  'text/rtf',
]);

const ALLOWED_FILE_EXTENSIONS = new Set([
  'pdf',
  'doc',
  'docx',
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
  'bmp',
  'heic',
  'heif',
  'txt',
  'rtf',
]);

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  const rest = digits.startsWith('8') ? digits.slice(1) : digits.startsWith('7') ? digits.slice(1) : digits;
  const ten = rest.slice(0, 10);
  if (ten.length === 0) return PHONE_PREFIX;
  if (ten.length <= 3) return `${PHONE_PREFIX}(${ten}`;
  if (ten.length <= 6) return `${PHONE_PREFIX}(${ten.slice(0, 3)}) ${ten.slice(3)}`;
  return `${PHONE_PREFIX}(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6, 8)}-${ten.slice(8, 10)}`;
}

function getPhoneDigits(displayValue: string): string {
  const digits = displayValue.replace(/\D/g, '');
  if (digits.startsWith('8')) return digits.slice(1).slice(0, 10);
  if (digits.startsWith('7')) return digits.slice(1).slice(0, 10);
  return digits.slice(0, 10);
}

function isPhoneComplete(displayValue: string): boolean {
  return getPhoneDigits(displayValue).length === 10;
}

export interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const ContactForm = ({ className, onSuccess }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const isSubmitDisabled =
    status === 'sending' || !name.trim() || !isPhoneComplete(phone);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const next = formatPhone(e.target.value);
    setPhone(next);
    setPhoneError('');
  }, []);

  const handlePhoneKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && getPhoneDigits(phone).length <= 1) {
      setPhone(PHONE_PREFIX);
      e.preventDefault();
    }
  }, [phone]);

  const validateAndSetFile = useCallback((nextFile: File | null) => {
    setFileError('');
    if (!nextFile) {
      setFile(null);
      return;
    }

    const extension = nextFile.name.includes('.')
      ? nextFile.name.split('.').pop()?.toLowerCase() ?? ''
      : '';
    const mimeAllowed = ALLOWED_FILE_MIME_TYPES.has(nextFile.type);
    const extensionAllowed = ALLOWED_FILE_EXTENSIONS.has(extension);

    if (!mimeAllowed && !extensionAllowed) {
      setFile(null);
      setFileError('Разрешены PDF, DOC, DOCX, изображения, TXT, RTF.');
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE_BYTES) {
      setFile(null);
      setFileError('Размер файла не должен превышать 10MB.');
      return;
    }

    setFile(nextFile);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(e.target.files?.[0] ?? null);
  }, [validateAndSetFile]);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    validateAndSetFile(e.dataTransfer.files?.[0] ?? null);
  }, [validateAndSetFile]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setNameError('');
      setPhoneError('');
      setFileError('');
      setSubmitError('');
      let valid = true;
      const trimmedName = name.trim();
      if (!trimmedName) {
        setNameError('Введите имя');
        valid = false;
      }
      if (!isPhoneComplete(phone)) {
        setPhoneError('Введите номер в формате +7 (xxx) xxx-xx-xx');
        valid = false;
      }
      if (file && file.size > MAX_FILE_SIZE_BYTES) {
        setFileError('Размер файла не должен превышать 10MB.');
        valid = false;
      }
      if (!valid) return;
      setStatus('sending');
      try {
        const digits = getPhoneDigits(phone);
        const phoneForSend = `+7${digits}`;

        await submitContactForm(trimmedName, phoneForSend, comment, file);
        setStatus('success');
        setName('');
        setPhone(PHONE_PREFIX);
        setComment('');
        setFile(null);
        onSuccess?.();
      } catch (err) {
        setStatus('error');
        setSubmitError(err instanceof Error ? err.message : 'Не удалось отправить заявку.');
      }
    },
    [name, phone, comment, file, onSuccess]
  );

  return (
    <div className={classNames(cls.formFrame, {}, [className ?? ''])}>
      <Form title="Оставить заявку" onSubmit={handleSubmit} className={cls.formInner}>
        <div className={cls.formRow}>
          <Input
            label="Имя"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError('');
            }}
            error={nameError}
            placeholder="Ваше имя"
            disabled={status === 'sending'}
            required
          />
          <Input
            label="Номер телефона"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            error={phoneError}
            placeholder={PHONE_PLACEHOLDER}
            disabled={status === 'sending'}
            required
          />
        </div>
        <div className={cls.extraRow}>
          <label className={cls.commentLabel}>
            Комментарий
            <textarea
              className={cls.commentTextarea}
              placeholder="Кратко опишите задачу или комментарий к заявке (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={status === 'sending'}
            />
          </label>
          <div className={cls.fileField}>
            <p className={cls.fileTitle}>Файл (необязательно)</p>
            <div className={cls.fileBlock}>
            <input
              id="contact-form-file"
              type="file"
              className={cls.fileInputHidden}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic,.heif,.txt,.rtf"
              onChange={handleFileChange}
              disabled={status === 'sending'}
            />
            <label
              htmlFor="contact-form-file"
              className={classNames(cls.fileDropzone, { [cls.fileDropzoneActive]: isDragOver }, [])}
              onDragOver={(e) => {
                e.preventDefault();
                if (!isDragOver) setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleFileDrop}
            >
              {file ? 'Файл выбран. Нажмите, чтобы заменить, или перетащите другой.' : 'Нажмите для выбора файла или перетащите его сюда.'}
            </label>
            {file && (
              <input
                type="button"
                className={cls.fileClearBtn}
                value="Очистить файл"
                onClick={() => {
                  setFile(null);
                  setFileError('');
                }}
                disabled={status === 'sending'}
              />
            )}
            {file && <p className={cls.fileName}>{file.name}</p>}
            {fileError && <p className={cls.fileError}>{fileError}</p>}
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {(status === 'success' || status === 'error') && (
            <motion.div
              key={status}
              className={classNames(cls.formNotification, {}, [
                status === 'success' ? cls.formNotificationSuccess : cls.formNotificationError,
              ])}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {status === 'success' ? (
                <>
                  <span className={cls.formNotificationIcon} aria-hidden>✓</span>
                  <span>Заявка отправлена</span>
                </>
              ) : (
                <>
                  <span className={cls.formNotificationIcon} aria-hidden>!</span>
                  <span>{submitError || 'Не удалось отправить заявку'}</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className={cls.formActions}>
          <button
            type="submit"
            className={cls.submitBtn}
            disabled={isSubmitDisabled}
          >
            {status === 'sending' ? 'Отправка…' : 'Отправить заявку'}
          </button>
        </div>
      </Form>
    </div>
  );
};
