import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Notice} from '../../../../Models/notice';

type Props = {
  selectedNotice: Notice;
  edittedNotice: Notice;
  setEdittedNotice: Function;
  changedField: string[]; //tracking changes
  setChangedField: Function;
  controlShowStatusBoard: Function;
};
interface IStatusButton {
  value: 'D' | 'W' | 'R' | 'P' | 'N';
  text: string;
}

const convertStatusValueToText = (value: string) => {
  if (value.toLowerCase() === 'd') {
    return 'DRAFT';
  } else if (value.toLowerCase() === 'w') return 'WORKING';
  else if (value.toLowerCase() === 'r') return 'READY';
  else if (value.toLowerCase() === 'p') return 'PROBLEM';
  else if (value.toLowerCase() === 'n') return 'N/A';
  else return 'N/A';
};
const convertStatusValueToColor = (value: string) => {
  if (value.toLowerCase() === 'd') {
    return '#855CF8';
  } else if (value.toLowerCase() === 'w') return '#FFBA35';
  else if (value.toLowerCase() === 'r') return '#13A422';
  else if (value.toLowerCase() === 'p') return '#FF2222';
  else if (value.toLowerCase() === 'n') return '#77757B';
  else return '#77757B';
};
const StatusBoardChange = ({
  selectedNotice,
  edittedNotice,
  setEdittedNotice,
  changedField,
  setChangedField,
  controlShowStatusBoard,
}: Props) => {
  const status: IStatusButton[] = [
    {value: 'D', text: 'DRAFT'},
    {value: 'W', text: 'WORKING'},
    {value: 'R', text: 'READY'},
    {value: 'P', text: 'PROBLEM'},
    {value: 'N', text: 'N/A'},
  ]; //this to render buttons inside status board change
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/*Selection field */}
      <View
        style={{
          width: '100%',
          height: '60%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {status.map((item, index) => {
          let colorValue: string = '';
          if (item.value) {
            //D,
            if (item.value.toLowerCase() === 'd') {
              colorValue = '#855CF8';
            } else if (item.value.toLowerCase() === 'w') {
              colorValue = '#FFBA35';
            } else if (item.value.toLowerCase() === 'r') {
              colorValue = '#13A422';
            } else if (item.value.toLowerCase() === 'n') {
              colorValue = '#77757B';
            } else if (item.value.toLowerCase() === 'p') {
              colorValue = '#FF2222';
            } else {
              colorValue = '##77757B';
            }
          } else colorValue = '##77757B';
          return (
            <View
              style={{
                width: '20%',
                height: '100%',
                backgroundColor: 'transparent',
              }}
              key={index}>
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => {
                  //update state
                  setEdittedNotice({...edittedNotice, status: item.value});

                  //check status changes
                  if (item.value !== selectedNotice.status) {
                    //changes happen
                    if (!changedField.includes('status'))
                      setChangedField([...changedField, 'status']);
                  } else
                    setChangedField(
                      changedField.filter(value => value !== 'status'),
                    );

                  //close dialog
                  controlShowStatusBoard(false);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/*Circle */}

                <View
                  style={{
                    width: 19,
                    height: 19,
                    borderRadius: 9.5,
                    borderColor: `${colorValue}`,
                    borderWidth: 3.5,
                  }}></View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/*Close Btn field */}
      <View
        style={{
          width: '100%',
          height: '40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: 'rgb(224, 224, 224)',
        }}>
        <TouchableOpacity
          delayPressIn={0}
          onPress={() => {
            controlShowStatusBoard(false);
          }}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StatusBoardChange;

const styles = StyleSheet.create({});
