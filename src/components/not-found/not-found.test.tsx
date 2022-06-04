import {render, screen} from '@testing-library/react';
import NotFound from './not-found';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore();

describe('Component: Not-Found', () => {
  store.dispatch = jest.fn();
  it('should Render Not-Found component when user navigate to unknown URL', () => {
    render(<Provider store={store}><Router history={history}><NotFound/></Router></Provider>);

    expect(screen.getByText(/Page not found/)).toBeInTheDocument();
  });
});


