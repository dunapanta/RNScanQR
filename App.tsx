/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';

import { MainButton } from './src/components';
import { COLORS, SIZES } from './src/constants';

function App(): JSX.Element {

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sectionTitle}>Test</Text>
      <Text style={styles.sectionTitle2}>Test</Text>
      <Text style={styles.sectionTitle3}>Test</Text>
      <Lottie source={require('./src/assets/animations/qr-scan.json')} autoPlay loop />
      <MainButton
        contentContainerStyle={{
          height: 50,
          marginTop: SIZES.base,
          backgroundColor: null
        }}
        label="Already have an account"
        labelStyle={{
          color: COLORS.primary
        }}
        onPress={() => console.log('test')}
      />
      <MainButton
        contentContainerStyle={{
          height: 50,
          borderRadius: SIZES.radius
        }}
        label="Get Started"
        onPress={() => console.log('test2')}
      />
    </View>
  );
}

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

export default App;
