import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f9f7f9',
    marginTop: -3,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 15,
  },
});

const PageHeader = ({title}) => (
  <View style={styles.container}>
    <Text style={styles.titleText}>{title}</Text>
  </View>
);

export default PageHeader;
