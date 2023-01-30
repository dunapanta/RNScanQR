import {StyleSheet, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';

import {MainButton} from '../components';
import {COLORS, SIZES} from '../constants';

export const WelcomeScreen = ({navigation}: any): JSX.Element => {
  return (
    <View style={{flex: 1, padding: SIZES.padding}}>
      <Text style={styles.sectionTitle}>Test</Text>

      <View style={{flex: 1}}>
        <Lottie
          source={require('../assets/animations/qr-scan.json')}
          autoPlay
          loop
        />
      </View>
      <MainButton
        contentContainerStyle={{
          height: 50,
          borderRadius: SIZES.radius,
        }}
        label="Get Started"
        onPress={() => navigation.navigate('TestScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    color: 'red',
    fontFamily: 'Poppins-Bold',
  },
  sectionTitle2: {
    fontSize: 30,
    fontFamily: 'Poppins-Italic',
    color: 'blue',
  },
  sectionTitle3: {
    fontSize: 80,
    fontFamily: 'Poppins-Thin',
    color: 'red',
  },
});
