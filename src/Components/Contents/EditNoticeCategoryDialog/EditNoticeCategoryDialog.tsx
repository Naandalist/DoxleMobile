import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Dialog from 'react-native-dialog';
import {NewNotice, Notice, NoticeCategory} from '../../../Models/notice';
import CategoryListItem from './CategoryListItem';
import {StyledNewCategoryTextInput} from '../NoticeBoard/StyledComponentsNoticeBoard';
import {
  BUTTON_FONT_FAMILY,
  TITLE_FONT_FAMILY,
} from '../../../Utilities/constants';
export type TCategoryAction = 'addNotice' | 'editNotice';
type Props = {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  dialogHeight: number;
  categoryList: NoticeCategory[];
  newNotice?: NewNotice;
  setNewNotice?: (data: NewNotice) => void;
  action: TCategoryAction;
  edittedNotice?: Notice;
  setEdittedNotice?: (notice: Notice) => void;
};

const EditNoticeCategoryDialog = ({
  showDialog,
  setShowDialog,
  categoryList,
  newNotice,
  setNewNotice,
  dialogHeight,
  action,
  edittedNotice,
  setEdittedNotice,
}: Props) => {
  const [newCategoryText, setNewCategoryText] = useState<string>('');
  const handleAddNewCategory = () => {
    //update new notice
    if (action === 'addNotice' && newNotice && setNewNotice)
      setNewNotice({...newNotice, category: newCategoryText});

    if (action === 'editNotice' && edittedNotice && setEdittedNotice)
      setEdittedNotice({...edittedNotice, category: newCategoryText});
    //clear new category text
    setNewCategoryText('');

    //close dialog
    setShowDialog(false);
  };

  const handleCancelChangeCategory = () => {
    setNewCategoryText('');
    setShowDialog(false);
  };
  return (
    <Dialog.Container
      visible={showDialog}
      contentStyle={{
        height: dialogHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
      buttonSeparatorStyle={false}
      verticalButtons={true}
      onBackdropPress={() => setShowDialog(false)}>
      <Dialog.Title style={{fontFamily: TITLE_FONT_FAMILY}}>
        Change Category
      </Dialog.Title>
      <View
        style={{
          flex: 1,
          paddingBottom: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView
          style={{flex: 1, width: '100%', marginBottom: 20}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {categoryList.map((category, index) => {
            return action === 'addNotice' ? (
              <CategoryListItem
                key={`categorySelection#${category.noticeCategoryId}#${index}`}
                selectedCategory={category}
                newNotice={newNotice}
                setNewNotice={setNewNotice}
                setShowChangeCategoryDialog={setShowDialog}
                newCategoryText={newCategoryText}
                setNewCategoryText={setNewCategoryText}
                action={action}
              />
            ) : (
              <CategoryListItem
                key={`categorySelection#${category.noticeCategoryId}#${index}`}
                selectedCategory={category}
                edittedNotice={edittedNotice}
                setEdittedNotice={setEdittedNotice}
                setShowChangeCategoryDialog={setShowDialog}
                newCategoryText={newCategoryText}
                setNewCategoryText={setNewCategoryText}
                action={action}
              />
            );
          })}
        </ScrollView>
        <StyledNewCategoryTextInput
          placeholder="New Category..."
          value={newCategoryText}
          onChangeText={text => setNewCategoryText(text)}
        />
      </View>

      <Dialog.Button
        label="Add New Category"
        onPress={handleAddNewCategory}
        disabled={newCategoryText === '' ? true : false}
        color={newCategoryText === '' ? '#afacac' : undefined}
        style={{fontFamily: BUTTON_FONT_FAMILY}}
      />
      <Dialog.Button
        label="Cancel"
        onPress={handleCancelChangeCategory}
        style={{fontFamily: BUTTON_FONT_FAMILY}}
      />
    </Dialog.Container>
  );
};

export default EditNoticeCategoryDialog;

const styles = StyleSheet.create({});
