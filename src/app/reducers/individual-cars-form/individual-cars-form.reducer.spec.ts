import {individualCarsFormReducer, initialFormState} from './individual-cars-form.reducer';

describe('Individual Cars FormReducer', () => {

	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = individualCarsFormReducer(undefined, action);
			expect(result).toEqual(initialFormState);
		});
	});

});