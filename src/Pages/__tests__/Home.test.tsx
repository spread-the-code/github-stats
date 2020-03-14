import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Home from '../Home';


describe('Home Page', () => {
	test('Component render', () => {
		const wrapper = shallow(<Home />);
		expect(wrapper.exists()).toBe(true);
	});

	test('Component title', () => {
	  const wrapper = shallow(<Home />);
	  expect(wrapper.find('h1').text()).toBe('GitHub Stat');
	});

})
