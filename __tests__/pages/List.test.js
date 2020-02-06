import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import List from '../../src/pages/List';
import * as vehicleType from '../../src/utils/vehicleType';

configure({ adapter: new Adapter() })

it('renders correctly and without crashing', () => {
  const spy = spyOn(global.console, 'error');
  const wrapper = shallow(<AlertProvider template={ <AlertTemplate />}><List /></AlertProvider>);

  expect(spy).not.toHaveBeenCalled();
  expect(wrapper).not.toBeNull();
  expect(wrapper).toMatchSnapshot();

});
