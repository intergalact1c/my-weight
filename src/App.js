import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setWeighting, setIsLoading } from './redux/actions';

import Profile from './components/Profile';
import ProfileLoading from './components/ProfileLoading';
import Weighing from './components/Weighting';
import WeightingLoading from './components/WeightingLoading';
import WeightingForm from './components/WeightingForm';
import WeightingFormLoading from './components/WeightingFormLoading';
import ModalWindow from './components/ModalWindow';

import './App.scss';

function App() {
  const isLoading = useSelector(({ isLoading }) => isLoading);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, weightingData] = await axios.all([
          axios.get('https://603d208148171b0017b2ced6.mockapi.io/profile'),
          axios.get('https://603d208148171b0017b2ced6.mockapi.io/weighting?sortBy=date&order=desc'),
        ]);
        dispatch(setProfile(profileData.data));
        dispatch(setWeighting(weightingData.data));
        dispatch(setIsLoading(false));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isLoading, dispatch]);

  return (
    <div className="app">
      <div className="app__wrapper">
        <div className="app__inner">
          <h1 className="app__h1-title">Мой вес</h1>
          {!isLoading ? (
            <>
              <Profile/>
              <Weighing/>
              <WeightingForm/>
            </>
          ) : (
            <>
              <ProfileLoading/>
              <WeightingLoading/>
              <WeightingFormLoading/>
            </>
          )}
          <ModalWindow/>
        </div>
      </div>
    </div>
  );
}

export default App;
