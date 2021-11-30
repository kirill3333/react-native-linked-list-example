import React from 'react';
import renderer from 'react-test-renderer';

import Avatar from './index';

it('renders correctly', () => {
  const tree = renderer
    .create(<Avatar source={{testUri: 'image_path'}} onPress={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
