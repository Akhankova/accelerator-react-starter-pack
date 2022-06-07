import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';

const mockStore = configureMockStore();

const store = mockStore({});

const history = createMemoryHistory();
store.dispatch = jest.fn();
describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const {container} = render(<Provider store={store}><Router history={history}><Breadcrumbs /></Router></Provider>);
    expect(container).toMatchSnapshot();
  });
});
