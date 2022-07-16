import React from 'react';
import UsedTime from '../UsedTime';
import { useSelector, useDispatch } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('UsedTime', () => {
  let mockAppState = {};
  const mockDispatch = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => mockDispatch);
    useSelector.mockImplementation((callback) => {
      return callback(mockAppState);
    });
  });
  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });
  it('check loading', () => {
    mockAppState = {
      usedTime: {
        usedTimeData: [],
        isLoading: true,
        isError: false
      }
    };
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    expect(screen.getByTestId('loading')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it('error task', () => {
    mockAppState = {
      usedTime: {
        usedTimeData: [],
        isLoading: false,
        isError: true
      }
    };
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    expect(screen.getByText('no data')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it('handle Click UsedTime', () => {
    mockAppState = {
      usedTime: {
        usedTimeData: [
          {
            userName: 'pqjx1',
            oSName: 'iOS',
            date: '2016-04-03T13:46:50.804Z',
            useTimeNumber: 11,
            facebookTimeUse: 7,
            youtubeTimeUse: 9,
            other: 18
          },
          {
            userName: 'g5zxl',
            oSName: 'Android',
            date: '2017-04-13T02:05:28.816Z',
            useTimeNumber: 7,
            facebookTimeUse: 6,
            youtubeTimeUse: 8,
            other: 7
          }
        ],
        isLoading: false,
        isError: false
      }
    };
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const link2 = screen.getByTestId(2);
    fireEvent.click(link2);
    const svg = screen.getByTestId('arrow-circle-up');
    fireEvent.click(svg);
    fireEvent.click(svg);
    const svg1 = screen.getByTestId('arrow-circle-down');
    fireEvent.click(svg1);
    expect(container).toMatchSnapshot();
  });
  it('Filter search', () => {
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const inputFilter = screen.getByTestId('input-name-used');
    fireEvent.change(inputFilter, { target: { value: '7' } });
    expect(inputFilter.value).toEqual('7');
    fireEvent.change(inputFilter, { target: { value: '' } });
    expect(inputFilter.value).toEqual('');
    expect(container).toMatchSnapshot();
  });
  it('Filter select type', () => {
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const element = screen.getByTestId('select-box-used');
    fireEvent.click(element);
    fireEvent.change(element, { target: { value: '7' } });
    fireEvent.change(element, { target: { value: 'Please select' } });
    expect(container).toMatchSnapshot();
  });
  it('Filter date', () => {
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const inputFilter = screen.getByTestId('input-date-used');
    fireEvent.change(inputFilter, { target: { value: '2022-04-13' } });
    expect(inputFilter.value).toEqual('2022-04-13');
    fireEvent.change(inputFilter, { target: { value: '' } });
    expect(inputFilter.value).toEqual('');
    expect(container).toMatchSnapshot();
  });
  it('add element', () => {
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const inputFilter = screen.getByTestId('add-button');
    fireEvent.click(inputFilter);

    const inputFilter1 = screen.getByTestId('UserNameI');
    fireEvent.change(inputFilter1, { target: { value: '123456789' } });
    expect(inputFilter1.value).toEqual('123456789');

    const inputFilter2 = screen.getByTestId('OSNameI');
    fireEvent.change(inputFilter2, { target: { value: 'iOS' } });
    expect(inputFilter2.value).toEqual('iOS');

    const inputFilter3 = screen.getByTestId('DateI');
    fireEvent.change(inputFilter3, { target: { value: '2022-04-13' } });
    expect(inputFilter3.value).toEqual('2022-04-13');

    const inputFilter4 = screen.getByTestId('YouTubeI');
    fireEvent.change(inputFilter4, { target: { value: '12' } });
    expect(inputFilter4.value).toEqual('12');

    const inputFilter5 = screen.getByTestId('FacebookI');
    fireEvent.change(inputFilter5, { target: { value: '12' } });
    expect(inputFilter5.value).toEqual('12');

    const inputFilter6 = screen.getByTestId('OtherI');
    fireEvent.change(inputFilter6, { target: { value: '12' } });
    expect(inputFilter6.value).toEqual('12');

    const inputFilter7 = screen.getByTestId('btnOK');
    fireEvent.click(inputFilter7);

    expect(container).toMatchSnapshot();
  });

  it('edit element', () => {
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const inputFilter = screen.getByTestId('edit-button0');
    fireEvent.click(inputFilter);

    const inputFilter1 = screen.getByTestId('UserNameI');
    fireEvent.change(inputFilter1, { target: { value: '123456789' } });
    expect(inputFilter1.value).toEqual('123456789');

    const inputFilter3 = screen.getByTestId('DateI');
    fireEvent.change(inputFilter3, { target: { value: '2022-04-13' } });
    expect(inputFilter3.value).toEqual('2022-04-13');

    const inputFilter4 = screen.getByTestId('YouTubeI');
    fireEvent.change(inputFilter4, { target: { value: '12' } });
    expect(inputFilter4.value).toEqual('12');

    const inputFilter5 = screen.getByTestId('FacebookI');
    fireEvent.change(inputFilter5, { target: { value: '12' } });
    expect(inputFilter5.value).toEqual('12');

    const inputFilter6 = screen.getByTestId('OtherI');
    fireEvent.change(inputFilter6, { target: { value: '12' } });
    expect(inputFilter6.value).toEqual('12');

    const inputFilter7 = screen.getByTestId('btnOK');
    fireEvent.click(inputFilter7);

    const inputFilter8 = screen.getByTestId('btnCancel');
    fireEvent.click(inputFilter8);
    expect(container).toMatchSnapshot();
  });

  it('error input element', () => {
    const { container } = render(
      <BrowserRouter>
        <UsedTime />
      </BrowserRouter>
    );
    const inputFilter = screen.getByTestId('add-button');
    fireEvent.click(inputFilter);

    const inputFilter1 = screen.getByTestId('UserNameI');
    fireEvent.change(inputFilter1, { target: { value: '' } });
    expect(inputFilter1.value).toEqual('');

    const inputFilter2 = screen.getByTestId('OSNameI');
    fireEvent.change(inputFilter2, { target: { value: '' } });
    expect(inputFilter2.value).toEqual('Please select');

    const inputFilter3 = screen.getByTestId('DateI');
    fireEvent.change(inputFilter3, { target: { value: '' } });
    expect(inputFilter3.value).toEqual('');

    const inputFilter4 = screen.getByTestId('YouTubeI');
    fireEvent.change(inputFilter4, { target: { value: '' } });
    expect(inputFilter4.value).toEqual('');

    const inputFilter5 = screen.getByTestId('FacebookI');
    fireEvent.change(inputFilter5, { target: { value: '' } });
    expect(inputFilter5.value).toEqual('');

    const inputFilter6 = screen.getByTestId('OtherI');
    fireEvent.change(inputFilter6, { target: { value: '' } });
    expect(inputFilter6.value).toEqual('');

    const inputFilter7 = screen.getByTestId('btnOK');
    fireEvent.click(inputFilter7);

    expect(container).toMatchSnapshot();
  });
});
