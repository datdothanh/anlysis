import React from 'react';
import { render } from '@testing-library/react';
import Paginatinon from '../Paginatinon';
import { BrowserRouter } from 'react-router-dom';
window.React = React;

describe('Loading component', () => {
  it('render component success', () => {
    const { container } = render(
      <BrowserRouter>
        <Paginatinon page={4} totalPages={20} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
