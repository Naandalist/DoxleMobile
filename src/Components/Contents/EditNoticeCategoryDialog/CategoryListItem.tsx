import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NewNotice, Notice, NoticeCategory} from '../../../Models/notice';
import {BUTTON_FONT_FAMILY} from '../../../Utilities/constants';
import {RootCategorySelection} from '../NoticeBoard/StyledComponentsNoticeBoard';
import {TCategoryAction} from './EditNoticeCategoryDialog';

type Props = {
  selectedCategory: NoticeCategory;
  newNotice?: NewNotice;
  setNewNotice?: (data: NewNotice) => void;
  setShowChangeCategoryDialog: (show: boolean) => void;
  newCategoryText: string;
  setNewCategoryText: (text: string) => void;
  action: TCategoryAction;
  edittedNotice?: Notice;
  setEdittedNotice?: (notice: Notice) => void;
};

const CategoryListItem = ({
  newNotice,
  setNewNotice,
  selectedCategory,
  setShowChangeCategoryDialog,
  newCategoryText,
  setNewCategoryText,
  action,
  edittedNotice,
  setEdittedNotice,
}: Props) => {
  //function to check category is selected to handle css
  const checkCategorySelected = () => {
    let isSelected = false;
    if (
      action === 'addNotice' &&
      newNotice &&
      newNotice.category === selectedCategory.categoryTitle &&
      newNotice.categoryId === selectedCategory.noticeCategoryId &&
      newCategoryText === ''
    ) {
      isSelected = true;
    }

    if (
      action === 'editNotice' &&
      edittedNotice &&
      edittedNotice.category === selectedCategory.categoryTitle &&
      edittedNotice.categoryId === selectedCategory.noticeCategoryId &&
      newCategoryText === ''
    ) {
      isSelected = true;
    }

    return isSelected;
  };

  //function to handle press on category
  const handlePressCategory = () => {
    if (action === 'addNotice' && newNotice && setNewNotice) {
      setNewNotice({
        ...newNotice,
        category: selectedCategory.categoryTitle,
        categoryId: selectedCategory.noticeCategoryId,
      });
    }

    if (action === 'editNotice' && edittedNotice && setEdittedNotice) {
      setEdittedNotice({
        ...edittedNotice,
        category: selectedCategory.categoryTitle,
        categoryId: selectedCategory.noticeCategoryId,
      });
    }

    setNewCategoryText('');
    setShowChangeCategoryDialog(false);
  };
  let scaleAnimation = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleAnimation, {
      toValue: 1.3,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    handlePressCategory();
  };

  return (
    <RootCategorySelection
      style={[
        {
          opacity: checkCategorySelected() ? 1 : 0.6,
        },
      ]}>
      <TouchableOpacity
        delayPressIn={0}
        activeOpacity={1}
        onPressIn={() => handlePressIn()}
        onPressOut={() => handlePressOut()}
        style={{
          height: '100%',
          width: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={{
            color: 'white',
            fontSize: 10,
            fontFamily: `${BUTTON_FONT_FAMILY}`,
            fontStyle: 'normal',
            lineHeight: 11,
            transform: [{scale: scaleAnimation}],
          }}>
          {selectedCategory.categoryTitle}
        </Animated.Text>
      </TouchableOpacity>
    </RootCategorySelection>
  );
};

export default CategoryListItem;

const styles = StyleSheet.create({});
