import React, {useState, useRef, useMemo, useCallback} from 'react';
import {View, FlatList, useWindowDimensions, StyleSheet} from 'react-native';
import Avatar from './../avatar';
import ContactCard from './../contact-card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 140,
  },
});

const AVATAR_SIZE = 100;
const AVATAR_CONTAINER_SIZE = 140;

const ContactList = ({contacts = []}) => {
  const avatarsListRef = useRef();
  const contactsListRef = useRef();
  const contactsListScrollBlockedRef = useRef(false);
  const startContactPosition = useRef(0);
  const lastContactPosition = useRef(0);

  const {height, width} = useWindowDimensions();
  const [selectedContact, selectContact] = useState(0);
  const avatarContainerPadding = useMemo(
    () => width / 2 - AVATAR_SIZE / 2,
    [width],
  );
  const descriptionSize = useMemo(
    () => height - AVATAR_CONTAINER_SIZE,
    [height],
  );

  const scrollToAvatarIndex = useCallback(index => {
    avatarsListRef.current.scrollToIndex({index});
    contactsListRef.current.scrollToIndex({index});
    selectContact(index);
  }, []);

  const renderAvatarItem = ({item, index}) => (
    <Avatar
      source={item.source}
      selected={index === selectedContact}
      onPress={() => {
        contactsListScrollBlockedRef.current = true;
        scrollToAvatarIndex(index);
      }}
    />
  );

  const renderContactDescriptionItem = ({item, index}) => (
    <ContactCard contact={item} height={descriptionSize} />
  );

  const getAvatarItemLayout = (data, index) => ({
    length: AVATAR_SIZE,
    offset: AVATAR_SIZE * index,
    index,
  });

  const getContactsItemLayout = (data, index) => ({
    length: descriptionSize,
    offset: descriptionSize * index,
    index,
  });

  const keyExtractor = (item, index) => `${index}`;

  const onContactsScrollBegin = () => {
    startContactPosition.current = lastContactPosition.current;
    contactsListScrollBlockedRef.current = true;
  };

  const onContactsScrollEnd = () => {
    const index = Math.floor(lastContactPosition.current / descriptionSize);
    const scrollToIndex =
      startContactPosition.current > lastContactPosition.current
        ? index
        : index + 1;
    if (scrollToIndex >= 0 && scrollToIndex < contacts.length) {
      scrollToAvatarIndex(scrollToIndex);
    }
  };

  const onContactsScroll = ({nativeEvent}) => {
    const {contentOffset} = nativeEvent;
    lastContactPosition.current = contentOffset.y;
  };

  const onAvatarsScroll = ({nativeEvent}) => {
    const {contentOffset} = nativeEvent;
    if (contactsListScrollBlockedRef.current) {
      return;
    }
    const currentIndex = Math.floor(contentOffset.x / AVATAR_SIZE);
    if (
      selectContact !== currentIndex &&
      currentIndex >= 0 &&
      currentIndex < contacts.length
    ) {
      selectContact(currentIndex);
      contactsListRef.current.scrollToIndex({index: currentIndex});
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={avatarsListRef}
        style={styles.imageContainer}
        horizontal
        data={contacts}
        renderItem={renderAvatarItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        getItemLayout={getAvatarItemLayout}
        initialNumToRender={5}
        onScroll={onAvatarsScroll}
        onScrollBeginDrag={() => {
          contactsListScrollBlockedRef.current = false;
        }}
        onMomentumScrollEnd={() => {
          scrollToAvatarIndex(selectedContact);
        }}
        contentContainerStyle={{
          paddingLeft: avatarContainerPadding,
          paddingRight: avatarContainerPadding,
        }}
      />
      <FlatList
        ref={contactsListRef}
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContactDescriptionItem}
        getItemLayout={getContactsItemLayout}
        onScrollBeginDrag={onContactsScrollBegin}
        onScrollEndDrag={onContactsScrollEnd}
        showsVerticalScrollIndicator={false}
        onScroll={onContactsScroll}
      />
    </View>
  );
};

export default ContactList;
