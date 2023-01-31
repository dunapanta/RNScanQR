import {useRef, useState} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import {constants} from '../../constants';
//import {FlatList} from 'react-native-gesture-handler';

const ITEM_WIDTH = 120;

export const Animation1 = () => {
  //ROW 1
  const [row1Images, setRow1Images] = useState([
    ...constants.walkthrough_01_01_images,
    ...constants.walkthrough_01_02_images,
  ]);
  const [currentPosition, setCurrentPosition] = useState(0);
  //ROW 2
  const [row2Images, setRow2Images] = useState([
    ...constants.walkthrough_01_02_images,
    ...constants.walkthrough_01_02_images,
  ]);
  const [row2CurrentPosition, setRow2CurrentPosition] = useState(0);

  //Ref
  const row1FlatListRef = useRef<any>();
  const row2FlatListRef = useRef<any>();
  return (
    <View>
      {/* Slider 1 */}

      <FlatList
        ref={row1FlatListRef}
        decelerationRate="fast"
        horizontal={false}
        //showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `Slider1_${index}`}
        data={row1Images}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={item}
                style={{
                  width: 110,
                  height: 110,
                }}
              />
            </View>
          );
        }}
      />

      {/* Slider 2 */}
    </View>
  );
};
