import { render } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const {container} = render(<Breadcrumbs />);
    expect(container).toMatchSnapshot();
  });
});
