import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWeightingData,
  deleteWeightingData,
  editWeightingData,
  modalClose,
} from '../redux/actions';

import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';

import newDate from '../assets/newDate';
import { normalizeWeight } from '../assets/normalizeWeight';

const initialState = {
  date: newDate(),
  weight: '',
};

const schema = yup.object().shape({
  date: yup
    .string()
    .required('Обязательное поле')
    .test('len', 'Введите действительную дату', (val) => {
      const val_length_without_dashes = val.replace(/-|_/g, '').length;
      return val_length_without_dashes === 8;
    }),
  weight: yup
    .number()
    .positive('Вес должен быть положительным числом')
    .typeError('Введите действительный вес'),
});

function WeightingForm({ action = 'add' }) {
  const { profile, selectedWeighting } = useSelector(({ profile, selectedWeighting }) => ({
    profile,
    selectedWeighting,
  }));
  const dispatch = useDispatch();
  const [weightingData, setWeightingData] = React.useState(
    action === 'add'
      ? initialState
      : { date: selectedWeighting.date, weight: selectedWeighting.weight },
  );
  const [botInput, setBotInput] = React.useState('');
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setWeightingData({
      ...weightingData,
      [name]: value,
    });
  };
  const { date, weight } = weightingData;
  const onSubmit = async () => {
    const isValid = await schema.isValid(weightingData);
    if (isValid) {
      if (botInput !== '') {
        alert('Вы заполнили поле для бота =(');
        setBotInput('');
        setWeightingData(initialState);
      } else {
        if (action === 'add') {
          dispatch(
            addWeightingData({
              date,
              weight: normalizeWeight(weight),
            }),
          );
        } else if (action === 'edit') {
          dispatch(editWeightingData(selectedWeighting.id, date, normalizeWeight(weight)));
          dispatch(modalClose());
        } else if (action === 'delete') {
          dispatch(deleteWeightingData(selectedWeighting.id));
          dispatch(modalClose());
        }
      }
    }
  };
  const form = (
    <form className="form" onSubmit={(e) => handleSubmit(onSubmit)(e.preventDefault())}>
      <div className="form__item form__item_top">
        <input
          type="hidden"
          name="youAreReal"
          value={botInput || ''}
          onChange={(e) => setBotInput(e.target.value)}
        />
      </div>
      <div className="form__item">
        <InputMask
          InputProps={
            action === 'delete'
              ? { readOnly: true, className: 'Mui-disabled' }
              : {
                readOnly: false,
                className: undefined,
              }
          }
          mask="9999-99-99"
          value={date || ''}
          onChange={handleChangeInput}
          inputRef={register}
          error={!!errors.date}
          helperText={errors?.date?.message}>
          <TextField name="date" label="Дата" variant="outlined" fullWidth={true}/>
        </InputMask>
      </div>
      <div className="form__item">
        <TextField
          InputProps={
            action === 'delete'
              ? { readOnly: true, className: 'Mui-disabled' }
              : {
                readOnly: false,
                className: undefined,
              }
          }
          name="weight"
          label="Вес, кг"
          variant="outlined"
          fullWidth={true}
          value={weight || ''}
          onChange={handleChangeInput}
          inputRef={register}
          error={!!errors.weight}
          helperText={errors?.weight?.message}
        />
      </div>
      <div className="form__item form__item_bottom">
        <Button as="input" type="submit" variant="contained" color="primary">
          {action === 'add' && 'Добавить'}
          {action === 'edit' && 'Редактировать'}
          {action === 'delete' && 'Удалить'}
        </Button>
      </div>
    </form>
  );
  if (!profile.length) {
    return null;
  } else if (action === 'add') {
    return <div className="app__block">{form}</div>;
  }
  return form;
}

export default React.memo(WeightingForm);
