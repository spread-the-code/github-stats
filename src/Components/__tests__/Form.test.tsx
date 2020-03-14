import React from 'react';
import { render } from '@testing-library/react';
import { createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import { InputBase, IconButton, Divider } from '@material-ui/core';
import Form from '../Form';

describe('<Form />', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
		wrapper = shallow(<Form />);
  });

	it('render with its inner element', () => {
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find(InputBase).length).toBe(1);
		expect(wrapper.find(IconButton).length).toBe(2);
	});

	it('check element props', () => {
		expect(wrapper.find(InputBase).at(0).props().placeholder.toLowerCase()).toContain('search');
		expect(wrapper.find(IconButton).at(0).props()['aria-label'].toLowerCase()).toContain('github');
		expect(wrapper.find(IconButton).at(1).props()['aria-label'].toLowerCase()).toContain('search');
	});

	it('search and click search icon', () => {
    wrapper.setProps({
    	onSubmit: (query) => {
    		expect(query).toBe('Hello');
				expect(wrapper.find(Divider).length).toBe(1);
				expect(wrapper.find(IconButton).length).toBe(3);
    	}
    });

		wrapper.find(InputBase).simulate('change', { target: { value: 'Hello' } });
		wrapper.find(IconButton).at(1).simulate('click');
	});

	it('search with ENTER click', () => {
    wrapper.setProps({
    	onSubmit: (query) => {
    		expect(query).toBe('Hello');
    	}
    });

		wrapper.find(InputBase).simulate('change', { target: { value: 'Hello' } });
		wrapper.find(InputBase).simulate('keypress', { key: 'Enter' })
	});

	it('clear button appear', () => {
		let searchedQuery = '';
    wrapper.setProps({
    	onSubmit: (query) => {

				expect(wrapper.find(Divider).length).toBe(1);
				expect(wrapper.find(IconButton).length).toBe(3);
    	}
    });

		wrapper.find(InputBase).simulate('change', { target: { value: 'Hello' } });
		wrapper.find(InputBase).simulate('keypress', { key: 'Enter' })
	});
});

