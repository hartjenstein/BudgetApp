import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow'
import { Header } from '../../components/Header';

let startLogout, wrapper;

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout}/>);   
});
// react-test-renderer
//shallow rendering test in contrast to full-DOM_rendering only the component,
//not its child components
// we cant test events like buttons with react renderer thats why we are going to use enzyme instead
test('should render Header correctly', () => {
    expect(wrapper).toMatchSnapshot();

    /* const renderer = new ReactShallowRenderer();
    renderer.render(<Header/ >);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
    console.log(renderer.getRenderOutput()); */
    //expect(wrapper.find('h1').length).toBe(1);
});

test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
