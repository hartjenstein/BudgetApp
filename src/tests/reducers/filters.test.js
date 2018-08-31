import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe( 'amount' );
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    },
    action = { type: 'SORT_BY_DATE'};

    const state = filtersReducer( currentState, action );
    expect(state.sortBy).toBe( 'date' );
});

test('should set text filter', () => {
    const text = 'test';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(undefined, action);
    
    expect(action.text).toBe( 'test' );
});

test('should set startDate filter', () => {
    const startDate = moment().startOf('month');
    const action = {
       type: 'SET_START_DATE',
       startDate 
    }
    const state = filtersReducer(undefined, action);

    expect(state.startDate).toEqual(moment().startOf('month'));
});

test('should set endDate filter', () => {
    const endDate = moment().startOf('month');
    const action = {
       type: 'SET_END_DATE',
       endDate 
    }
    const state = filtersReducer(undefined, action);

    expect(state.endDate).toEqual( moment().startOf('month'));
});
