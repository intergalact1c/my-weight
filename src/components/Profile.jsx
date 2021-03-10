import React from 'react';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { modalOpen } from '../redux/actions';

import { StylesProvider } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';

import ProfileForm from './ProfileForm';
import { weightLossDynamics } from '../assets/weightLossDynamics';

function Profile() {
  const { weighting, profile } = useSelector(({ weighting, profile }) => ({ weighting, profile }));
  const dispatch = useDispatch();
  const handleOpen = (type) => {
    dispatch(modalOpen(type));
  };
  if (!profile.length) {
    return (
      <StylesProvider injectFirst>
        <Alert severity="warning">
          Перед началом использования приложения, заполните информацию
        </Alert>
        <div className="profile app__block">
          <ProfileForm profile={profile[0]} action="add"/>
        </div>
      </StylesProvider>
    );
  }
  const { name, avatar, age, startingWeight, targetWeight } = profile[0];
  return (
    <div className="profile app__block">
      <div className="profile__data">
        <div className="profile__item profile__item-avatar">
          {avatar ? (
            <img src={avatar} alt={name}/>
          ) : (
            <img
              src={require('../assets/images/no_image.jpg').default}
              alt="Изображение отсутствует"
            />
          )}
        </div>
        <div className="profile__item">
          Имя:<span className="profile__item-val">{name}</span>
        </div>
        <div className="profile__item">
          Возраст:<span className="profile__item-val">{age}</span>
        </div>
        <div className="profile__item">
          Нач. вес:<span className="profile__item-val">{startingWeight}</span>
        </div>
        {weighting.length ? (
          <div className="profile__item">
            Тек. вес:<span className="profile__item-val">{weighting[0].weight}</span>
            {parse(weightLossDynamics(weighting[0].weight - startingWeight))}
          </div>
        ) : (
          <div className="profile__item">
            Тек. вес:<span className="profile__item-val">{startingWeight}</span>
          </div>
        )}
        <div className="profile__item">
          Цель:<span className="profile__item-val">{targetWeight}</span>
          {weighting.length ? parse(weightLossDynamics(targetWeight - weighting[0].weight)) : null}
        </div>
      </div>
      <Button
        onClick={() => handleOpen('PE')}
        variant="outlined"
        color="default"
        className="profile__edit-btn">
        Редактировать
      </Button>
    </div>
  );
}

export default Profile;
