import * as data from './contacts.json';
import images from './Images';

const getContacts = () => {
  return data.default.map(contact => {
    return {
      ...contact,
      source: images[contact.picture],
    };
  });
};

export default {
  getContacts,
};
