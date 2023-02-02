import {View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

import styled from 'styled-components/native';
import {ProjectExpandIcon} from './NoticeBoardIcon';
import {INoticeBoardContext, NoticeBoardContext} from './NoticeBoard';
import {NoticeCategory} from '../../../Models/notice';

type Props = {
  selectedCategory: NoticeCategory | null;
  setSelectedCategory: (category: NoticeCategory | null) => void;
  categoryList: NoticeCategory[];
};

const CategoryDropdownSelection = ({
  selectedCategory,
  setSelectedCategory,
  categoryList,
}: Props) => {
  let categoryListXtra = [...categoryList, 'All Categories'];

  return (
    <RootCategoryDropdownContainer>
      <View
        style={{
          height: '100%',
          maxWidth: '100%',
          display: 'flex',
        }}>
        <SelectDropdown
          defaultValue={
            selectedCategory
              ? selectedCategory.categoryTitle
              : categoryListXtra[categoryListXtra.length - 1]
          }
          data={categoryListXtra}
          onSelect={(selectedItem: NoticeCategory | string) => {
            if (typeof selectedItem !== 'string')
              setSelectedCategory(selectedItem);
            else setSelectedCategory(null);
          }}
          buttonTextAfterSelection={(
            selectedItem: NoticeCategory | string,
            index,
          ) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return typeof selectedItem === 'string'
              ? selectedItem
              : selectedItem.categoryTitle;
          }}
          rowTextForSelection={(item: NoticeCategory | string, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return `${index + 1}) ${
              typeof item === 'string' ? item : item.categoryTitle
            }`;
          }}
          onChangeSearchInputText={() => {}}
          rowStyle={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.12)',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            shadowColor: 'grey',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.6,
            shadowRadius: 2,
            backgroundColor: 'white',
            marginBottom: 2,
          }}
          rowTextStyle={{
            textAlign: 'left',
            fontFamily: 'IBMPlexSans-Regular',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            color: 'black',
            marginRight: 0,
            paddingRight: 0,
          }}
          buttonStyle={{
            maxWidth: 300,
            // flexGrow: 1,
            height: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: 0,
            margin: 0,
          }}
          buttonTextStyle={{
            fontFamily: 'NostromoRegular-Medium',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 13,
            letterSpacing: 0.15,
            color: '#000000',
            textAlign: 'left',
            margin: 0,
            padding: 0,
            width: 80,
            flexGrow: 0.9,
          }}
          selectedRowStyle={{
            width: '100%',
            backgroundColor: '#D5D7E3',
            opacity: 0.8,
          }}
          selectedRowTextStyle={{
            color: 'rgb(117, 78, 224)',
            textAlign: 'left',
            fontFamily: 'IBMPlexSans-Regular',
          }}
          dropdownStyle={{
            height: 250,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
          defaultValueByIndex={
            selectedCategory
              ? categoryList.findIndex(
                  category =>
                    category.noticeCategoryId ===
                    selectedCategory.noticeCategoryId,
                )
              : categoryListXtra.length - 1
          }
          renderDropdownIcon={ProjectExpandIcon}
        />
      </View>
    </RootCategoryDropdownContainer>
  );
};

export default React.memo(CategoryDropdownSelection);

// const styles = StyleSheet.create({
//   rootPickerContainer: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   dropdownContainer: {
//     width: "100%",
//     height: "100%",
//   },
//   dropdownIconContainer: {
//     height: "100%",
//     width: "2%",
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
// });

const RootCategoryDropdownContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
