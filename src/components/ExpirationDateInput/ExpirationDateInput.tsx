import Input from '../common/Input/Input';
import Field from '../common/Field/Field';
import Label from '../common/Label/Label';

import {
  isInteger,
  hasTwoDigit,
  isValidMonth,
  isValidDate,
} from '../../domain/validators';

import useAddCardInput, { InputType } from '../../hooks/useAddCardInput';

import { ERRORS, ADD_CARD_FORM_FIELDS } from '../../constants/messages';

const { EXPIRATION_DATE } = ADD_CARD_FORM_FIELDS;

interface ExpirationDateInputProps {
  setCardData: (key: keyof CardInfo, newData: CardInfo[keyof CardInfo]) => void;
}

const ExpirationDateInput = ({ setCardData }: ExpirationDateInputProps) => {
  const validateInputOnChange = ({ value }: { value: string }) => {
    if (!isInteger(value)) {
      return { isValid: false, errorMsg: ERRORS.isNotInteger };
    }
    return { isValid: true, errorMsg: '' };
  };

  const validateInputOnBlur = ({ value }: InputType) => {
    if (!hasTwoDigit(value)) {
      return { isValid: false, errorMsg: ERRORS.isNotTwoDigit };
    }
    if (!isValidMonth(expirationDate.month)) {
      return { isValid: false, errorMsg: ERRORS.inValidMonth };
    }
    if (!isValidDate(expirationDate)) {
      return { isValid: false, errorMsg: ERRORS.deprecatedCard };
    }
    return { isValid: true, errorMsg: '' };
  };

  const updateCardData = () => {
    setCardData('expirationDate', Object.values(expirationDate));
  };

  const {
    values: expirationDate,
    errMsg,
    isError,
    onChange,
    onBlur,
  } = useAddCardInput<ExpirationDate>({
    initialValues: {
      month: '',
      year: '',
    },
    initialErrors: {
      month: false,
      year: false,
    },
    validateInputOnChange,
    validateInputOnBlur,
    updateCardData,
  });

  return (
    <Field
      title={EXPIRATION_DATE.title}
      description={EXPIRATION_DATE.description}
      labelText={EXPIRATION_DATE.labelText}
      errMsg={errMsg}
    >
      {Object.keys(expirationDate).map((n) => {
        const name = n as keyof ExpirationDate;
        return (
          <>
            <Label key={name} htmlFor={name} labelText={name} hideLabel />
            <Input
              key={name}
              id={name}
              name={name}
              placeholder={
                name === 'month'
                  ? EXPIRATION_DATE.placeholder.month
                  : EXPIRATION_DATE.placeholder.year
              }
              value={expirationDate[name]}
              isError={isError[name]}
              handleChange={onChange}
              handleOnBlur={onBlur}
              maxLength={2}
            />
          </>
        );
      })}
    </Field>
  );
};

export default ExpirationDateInput;
