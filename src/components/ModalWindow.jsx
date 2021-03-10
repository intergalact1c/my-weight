import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalClose } from '../redux/actions';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ProfileForm from './ProfileForm';
import WeightingForm from './WeightingForm';

function ModalWindow() {
  const { profile, isModalVisible, modalType } = useSelector(
    ({ profile, isModalVisible, modalType }) => ({
      profile,
      isModalVisible,
      modalType,
    }),
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalClose());
  };
  return (
    <Modal
      className="modal"
      open={isModalVisible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={isModalVisible}>
        <div className="app__block modal__inner">
          {modalType === 'PE' && ( //PE - Profile Edit
            <>
              <h2 className="app__h2-title">Редактировать профиль</h2>
              <ProfileForm profile={profile[0]} action="edit"/>
            </>
          )}
          {modalType === 'WE' && ( //WE - Weighting Edit
            <>
              <h2 className="app__h2-title">Редактировать данные</h2>
              <WeightingForm action="edit"/>
            </>
          )}
          {modalType === 'WD' && ( //WD - Weighting Delete
            <>
              <h2 className="app__h2-title">Удалить данные</h2>
              <WeightingForm action="delete"/>
            </>
          )}
          <div className="modal__close" onClick={handleClose}/>
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalWindow;
