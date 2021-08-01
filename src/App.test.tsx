import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  describe('Count Up', () => {
    it('calls setCount with count + 1', () => {
      const wrapper = shallow(<App />);
      wrapper.find('#count-up').simulate('click')
      expect(wrapper.find("h3").text()).toEqual("1");
    });
  });
  describe('Count Down', () => {
    it('calls setCount with count - 1', () => {
      const wrapper = shallow(<App />);
      wrapper.find('#count-down').simulate('click')
      expect(wrapper.find("h3").text()).toEqual("-1");
    });
  });

  describe('Zero', () => {
    it('calls setCount with 0', () => {
      const wrapper = shallow(<App />);
      wrapper.find('#zero-count').simulate('click')
      expect(wrapper.find("h3").text()).toEqual("0");
    });
  });
});