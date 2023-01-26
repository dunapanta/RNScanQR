/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
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

import {MainButton} from './src/components';
import {COLORS, SIZES, } from './src/constants';

function App(): JSX.Element {
  return (
    <View style={{flex: 1, padding: SIZES.padding}}>
      <Text style={styles.sectionTitle}>Test</Text>

      <View style={{flex: 1}}>
        <Lottie
          source={require('./src/assets/animations/qr-scan.json')}
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
