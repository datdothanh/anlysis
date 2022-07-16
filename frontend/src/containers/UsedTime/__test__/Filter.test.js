import React from 'react';
import { render } from '@testing-library/react';
import Filter from '../Filter';
import { BrowserRouter } from 'react-router-dom';
window.React = React;

describe('Loading component', () => {
  it('render component success', () => {
    const { container } = render(
      <BrowserRouter>
        <Filter />
      </BrowserRouter>
    );
    expect(container.getElementsByClassName('filter'));
    expect(container).toMatchSnapshot();
  });
});
