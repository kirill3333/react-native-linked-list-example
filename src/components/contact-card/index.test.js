import React from 'react';
import renderer from 'react-test-renderer';

import ContactCard from './index';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ContactCard
        height={500}
        contact={{
          name: 'John Doe',
          role: 'CEO',
          about: 'Test test test',
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
