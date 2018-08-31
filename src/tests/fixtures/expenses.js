import moment from 'moment';

// fixtures = test data

export default [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 12,
    createdAt: 0
},
{
    id: '2',
    description: 'rent',
    note: '',
    amount: 14,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},
{
    id: '3',
    description: 'credit card',
    note: '',
    amount: 15,
    createdAt: moment(0).add(4, 'days').valueOf()
}];