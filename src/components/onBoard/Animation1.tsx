import {useEffect, useRef, useState} from 'react';
import {View, Image, FlatList} from 'react-native';
import {constants, SIZES} from '../../constants';
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

  useEffect(() => {
    let positionTimer: number;
    const timer = () => {
      positionTimer = setTimeout(() => {
        //Im¡ncrement scroll position with each new interval

        //Slider 1
        setCurrentPosition(prevPosition => {
          const position = Number(prevPosition) + 1;
          row1FlatListRef.current.scrollToOffset({
            offset: position,
            animated: false,
          });
          // to scroll endlessly
          const maxOffset =
            constants.walkthrough_01_01_images.length * ITEM_WIDTH;
          if (position > maxOffset) {
            const offset = prevPosition - maxOffset;
            row1FlatListRef.current.scrollToOffset({
              offset,
              animated: false,
            });
            return offset;
          } else {
            return position;
          }
        });

        // Slider 2
        setRow2CurrentPosition(prevPosition => {
          const position = Number(prevPosition) + 1;
          row2FlatListRef.current.scrollToOffset({
            offset: position,
            animated: false,
          });
          // to scroll endlessly
          const maxOffset =
            constants.walkthrough_01_02_images.length * ITEM_WIDTH;
          if (position > maxOffset) {
            const offset = prevPosition - maxOffset;
            row2FlatListRef.current.scrollToOffset({
              offset,
              animated: false,
            });
            return offset;
          } else {
            return position;
          }
        });
        timer();
      }, 32);
    };
    timer();
    return () => {
      clearTimeout(positionTimer);
    };
  }, []);
  return (
    <View style={{flexDirection: 'row'}}>
      {/* Slider 1 */}

      <FlatList
        ref={row1FlatListRef}
        decelerationRate="fast"
        horizontal={false}
        //showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
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
      <FlatList
        ref={row2FlatListRef}
        decelerationRate="fast"
        style={{marginLeft: SIZES.padding, transform: [{rotate: '180deg'}]}}
        horizontal={false}
        //showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `Slider2_${index}`}
        scrollEnabled={false}
        data={row2Images}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{rotate: '180deg'}],
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
    </View>
  );
};
