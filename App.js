import React from 'react';
import { View, StyleSheet } from 'react-native';
import TimerList from './TimerList';

const App = () => {
  return (
    <View style={styles.container}>
      <TimerList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default App;