import React from 'react';
import renderer from 'react-test-renderer';

import PageHeader from './index';

it('renders correctly', () => {
  const tree = renderer.create(<PageHeader title="Contacts" />).toJSON();
  expect(tree).toMatchSnapshot();
});
