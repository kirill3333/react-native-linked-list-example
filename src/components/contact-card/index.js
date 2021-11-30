import React, {useMemo} from 'react';

import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
  descriptionContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  firstNameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  lastNameText: {
    fontSize: 22,
    fontWeight: 'normal',
  },
  roleText: {
    fontSize: 16,
    color: '#828282',
  },
  aboutHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 16,
    color: '#828282',
    paddingTop: 10,
    lineHeight: 18,
  },
});

const ContactCard = ({height, contact}) => {
  const firstName = useMemo(() => contact.name.split(' ')[0], [contact]);
  const lastName = useMemo(
    () => contact.name.substr(contact.name.indexOf(' ') + 1),
    [contact],
  );
  return (
    <View style={[styles.container, {height: height}]}>
      <View style={styles.headerContainer}>
        <Text style={styles.firstNameText}>{firstName}</Text>
        <Text> </Text>
        <Text style={styles.lastNameText}>{lastName}</Text>
      </View>
      <View style={styles.roleContainer}>
        <Text style={styles.roleText}>{contact.role}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.aboutHeaderText}>About me</Text>
        <Text style={styles.aboutText}>{contact.about}</Text>
      </View>
    </View>
  );
};

export default ContactCard;
