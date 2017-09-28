import { reducer } from '../reducers/IndividualCarsForm.reducer';
import * as fromIndividualCarsForm from '../reducers/IndividualCarsForm.reducer';

describe('Individual Cars FormReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromIndividualCarsForm.initialState);
    });
  });

});