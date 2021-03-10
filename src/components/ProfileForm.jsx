import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addProfileData, editProfileData, modalClose } from '../redux/actions';

import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';

import { normalizeWeight } from '../assets/normalizeWeight';

const initialState = {
  name: '',
  age: '',
  avatar: '',
  startingWeight: '',
  targetWeight: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Введите действительное имя')
    .required('Обязательное поле')
    .max(40)
    .trim(),
  age: yup
    .number()
    .positive('Возраст должен быть положительным числом')
    .integer('Возраст должен быть целым числом')
    .typeError('Введите действительный возраст')
    .required('Обязательное поле'),
  avatar: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      { message: 'Пожалуйста, введите действительную ссылку', excludeEmptyString: true },
    )
    .trim(),
  startingWeight: yup
    .number()
    .positive('Вес должен быть положительным числом')
    .typeError('Введите действительный вес'),
  targetWeight: yup
    .number()
    .positive('Вес должен быть положительным числом')
    .typeError('Введите действительный вес'),
});

function ProfileForm(props) {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = React.useState(
    props.profile || initialState,
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
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  const { name, age, avatar, startingWeight, targetWeight } = profileData;
  const onSubmit = async () => {
    const isValid = await schema.isValid(profileData);
    if (isValid) {
      if (botInput !== '') {
        alert('Вы заполнили поле для бота =(');
        setBotInput('');
        setProfileData(initialState);
      } else {
        const dispatchData = {
          name: name.trim(),
          age: age.trim(),
          avatar: avatar ? avatar.trim() : '',
          startingWeight: normalizeWeight(startingWeight),
          targetWeight: normalizeWeight(targetWeight),
        };
        if (props.action === 'add') {
          dispatch(
            addProfileData(dispatchData),
          );
          setProfileData(initialState);
        } else if (props.action === 'edit') {
          dispatch(
            editProfileData(dispatchData),
          );
          dispatch(modalClose());
        }
      }
    }
  };
  return (
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
        <TextField
          name="name"
          label="Имя"
          variant="outlined"
          fullWidth={true}
          value={name || ''}
          onChange={handleChangeInput}
          inputRef={register}
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
      </div>
      <div className="form__item">
        <TextField
          name="age"
          label="Возраст"
          variant="outlined"
          fullWidth={true}
          value={age || ''}
          onChange={handleChangeInput}
          inputRef={register}
          error={!!errors.age}
          helperText={errors?.age?.message}
        />
      </div>
      <div className="form__item">
        <TextField
          name="avatar"
          label="Ссылка на аватар"
          variant="outlined"
          fullWidth={true}
          value={avatar || ''}
          onChange={handleChangeInput}
          inputRef={register}
          error={!!errors.avatar}
          helperText={errors?.avatar?.message}
        />
      </div>
      <div className="form__item">
        <TextField
          name="startingWeight"
          label="Начальный вес, кг"
          variant="outlined"
          fullWidth={true}
          value={startingWeight || ''}
          onChange={handleChangeInput}
          inputRef={register}
          error={!!errors.startingWeight}
          helperText={errors?.startingWeight?.message}
        />
      </div>
      <div className="form__item">
        <TextField
          name="targetWeight"
          label="Цель, кг"
          variant="outlined"
          fullWidth={true}
          value={targetWeight || ''}
          onChange={handleChangeInput}
          inputRef={register}
          error={!!errors.targetWeight}
          helperText={errors?.targetWeight?.message}
        />
      </div>
      <div className="form__item form__item_bottom">
        <Button as="input" type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
