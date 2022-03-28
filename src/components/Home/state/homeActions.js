import { GNOMES_SET } from "../../../constants/actionTypes";

function setGnomes(gnomes) {
  return {
    data: { gnomes },
    type: GNOMES_SET,
  };
}

export function addGnomes(gnomes) {
  return async (dispatch) => {
    try {
      dispatch(setGnomes(gnomes));
    } catch (e) {
      console.log(e);
      /*
        dispatch(setLoading(false, way));
        dispatch(
          setAlert('Error', i18n.t('errors:Error', { context: 'fetchingPlaces' }))
        );
        throw e;
        */
    }
  };
}
