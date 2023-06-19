import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const TimerList = () => {
  const [timers, setTimers] = useState([]);

  const handleAddTimer = () => {
    const newTimer = { seconds: 0, isRunning: 'Start', intervalId: undefined };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  const handleStartPauseTimer = (index) => {
    const updatedTimers = [...timers];
    const timer = updatedTimers[index];

    if (timer.isRunning === 'Start' || timer.isRunning === 'Resume') {
      timer.isRunning = 'Pause';
      timer.intervalId = setInterval(() => {
        setTimers((prevTimers) => {
          const updatedTimers = [...prevTimers];
          const updatedTimer = { ...updatedTimers[index] };

          if (updatedTimer.seconds > 0) {
            updatedTimer.seconds--;
          } else {
            clearInterval(updatedTimer.intervalId);
            updatedTimer.isRunning = 'Start';
            updatedTimer.intervalId = undefined;
          }

          updatedTimers[index] = updatedTimer;
          return updatedTimers;
        });
      }, 1000);
    } else if (timer.isRunning === 'Pause') {
      clearInterval(timer.intervalId);
      timer.isRunning = 'Resume';
      timer.intervalId = undefined;
      setTimers([...updatedTimers]);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSecondsChange = (index, newSeconds = 0) => {
    const updatedTimers = [...timers];
    updatedTimers[index].seconds = newSeconds ? parseInt(newSeconds, 10) : 0;
    setTimers(updatedTimers);
  };

  const renderTimerItem = ({ item, index }) => {
    return (
      <View style={styles.rowContainer}>
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter seconds"
          keyboardType="numeric"
          onChangeText={(text) => handleSecondsChange(index, text)}
        />
        <View style={styles.timeContainer}>
          <Text style={{ marginRight: 10, textAlign: 'center' }}>{formatTime(item.seconds)}</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleStartPauseTimer(index)}
        >
          <Text style={styles.buttonText}>{item.isRunning}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={timers}
        renderItem={renderTimerItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'green', borderRadius: 5, marginTop: 10 }}
        onPress={handleAddTimer}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerList;


const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  timeContainer: {
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    height: 40,
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',

  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});