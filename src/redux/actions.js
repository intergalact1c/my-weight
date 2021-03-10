import axios from 'axios';

export const addProfileData = (profileData) => (dispatch) => {
  axios
    .post(`https://603d208148171b0017b2ced6.mockapi.io/profile`, profileData)
    .then(({ data }) => {
      dispatch(setIsLoading(true));
    });
};

export const editProfileData = (profileData) => (dispatch) => {
  axios
    .put(`https://603d208148171b0017b2ced6.mockapi.io/profile/1`, profileData)
    .then(({ data }) => {
      dispatch(setIsLoading(true));
    });
};

export const addWeightingData = (weightingData) => (dispatch) => {
  axios
    .post(`https://603d208148171b0017b2ced6.mockapi.io/weighting`, weightingData)
    .then(({ data }) => {
      dispatch(setIsLoading(true));
    });
};

export const editWeightingData = (id, date, weight) => (dispatch) => {
  axios
    .put(`https://603d208148171b0017b2ced6.mockapi.io/weighting/${id}`, {
      date,
      weight,
    })
    .then(({ data }) => {
      dispatch(setIsLoading(true));
    });
};

export const deleteWeightingData = (id) => (dispatch) => {
  axios.delete(`https://603d208148171b0017b2ced6.mockapi.io/weighting/${id}`).then(({ data }) => {
    dispatch(setIsLoading(true));
  });
};

export const setProfile = (payload) => ({
  type: 'SET_PROFILE',
  payload,
});

export const setWeighting = (payload) => ({
  type: 'SET_WEIGHTING',
  payload,
});

export const setSelectedWeighting = (payload) => ({
  type: 'SET_SELECTED_WEIGHTING',
  payload,
});

export const setIsLoading = (payload) => ({
  type: 'SET_IS_LOADING',
  payload,
});

export const modalOpen = (payload) => ({
  type: 'MODAL_OPEN',
  payload,
});

export const modalClose = () => ({
  type: 'MODAL_CLOSE',
});
