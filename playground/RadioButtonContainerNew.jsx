import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
// import {Colors, Font_Family, Typography, responsiveWidth} from 'styles';
import {responsiveWidth} from 'react-native-responsive-dimensions';
const RadioButtonContainerNew = ({data, selectedOption, onSelect}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      {data?.map((item, index) => {
        return (
          <TouchableOpacity key={index} style={styles.radioContainer}>
            <View
              status={selectedOption === item.id ? 'checked' : 'unchecked'}
              onPress={() => onSelect(item.id)}
              //   color={Colors.GRANITE}
              //   uncheckedColor={Colors.GRANITE}
              style={{
                borderRadius: 50,
                width: responsiveWidth(5),
                height: responsiveWidth(5),
                borderWidth: 0.5,
                borderColor: selectedOption === item.id ? 'red' : 'blue',
                justifyContent: 'center',
              }}>
              {selectedOption === item.id && (
                <View
                  style={{
                    width: responsiveWidth(3),
                    height: responsiveWidth(3),
                    borderRadius: 50,
                    backgroundColor: 'grey',
                    alignSelf: 'center',
                  }}
                />
              )}
            </View>

            <Text style={styles.radioText}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    alignItems: 'center',
    marginBottom: responsiveWidth(3),
    borderWidth: 0.5,
    borderColor: 'pink',
    borderRadius: responsiveWidth(2),
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    width: '48%',
    backgroundColor: 'blue',
    // flex: 1,
  },
  radioText: {
    fontSize: 16,
    // fontFamily: Font_Family.DM_SANS_REGULAR,
    color: 'grey',
    marginLeft: 10,
  },
});

export default RadioButtonContainerNew;
