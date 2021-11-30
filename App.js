/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import SafeAreaViewDecider from 'react-native-smart-statusbar';

import ContactList from './src/components/contact-list';
import PageHeader from './src/components/header';
import Contacts from './src/data/Contacts';

const contacts = Contacts.getContacts();

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const App: () => Node = () => {
  return (
    <View style={styles.backgroundContainer}>
      <SafeAreaViewDecider backgroundColor="#f9f7f9" />
      <SafeAreaView style={styles.container}>
        <PageHeader title="Contacts" />
        <ContactList contacts={contacts} />
      </SafeAreaView>
    </View>
  );
};

export default App;
