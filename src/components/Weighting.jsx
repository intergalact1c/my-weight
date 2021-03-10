import React from 'react';
import parse from 'html-react-parser';
import CustomScroll from 'react-custom-scroll';
import { useSelector, useDispatch } from 'react-redux';

import { weightLossDynamics } from '../assets/weightLossDynamics';
import { modalOpen, setSelectedWeighting } from '../redux/actions';

function Weighting() {
  const { weighting, profile } = useSelector(({ weighting, profile, selectedWeighting }) => ({
    weighting,
    profile,
    selectedWeighting,
  }));
  const dispatch = useDispatch();
  const handleOpen = (type, id, date, weight) => {
    dispatch(modalOpen(type));
    dispatch(setSelectedWeighting({ id, date, weight }));
  };
  if (!weighting.length) {
    return null;
  }
  return (
    <div className="weighting app__block">
      <table className="weighting__table">
        <thead>
        <tr>
          <th>Дата</th>
          <th>Значение</th>
        </tr>
        </thead>
      </table>
      <CustomScroll>
        <div className="weighting__table-wrapper">
          <table className="weighting__table">
            <tbody>
            {weighting.map((obj, index, prev) => (
              <tr key={obj.date + obj.weight}>
                <td>{obj.date}</td>
                <td>
                  {obj.weight}
                  {prev[index + 1]
                    ? parse(weightLossDynamics(obj.weight - prev[index + 1].weight))
                    : parse(weightLossDynamics(obj.weight - profile[0].startingWeight))}
                </td>
                <td className="weighting__actions">
                  <button
                    onClick={() => handleOpen('WE', obj.id, obj.date, obj.weight)}
                    className="weighting__btn weighting__btn_edit"
                    title="Редактировать">
                    <span/>
                  </button>
                  <button
                    onClick={() => handleOpen('WD', obj.id, obj.date, obj.weight)}
                    className="weighting__btn weighting__btn_delete"
                    title="Удалить">
                    <span/>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </CustomScroll>
    </div>
  );
}

export default Weighting;
