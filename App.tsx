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

function App(): JSX.Element {

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sectionTitle}>Test</Text>
      <Text style={styles.sectionTitle2}>Test</Text>
      <Text style={styles.sectionTitle3}>Test</Text>
      <Lottie source={require('./src/assets/animations/qr-scan.json')} autoPlay loop />
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
