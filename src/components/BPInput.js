import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const BPInput = ({ label, value, onChange, unit = 'mmHg', placeholder = '0' }) => {
  const handleDecrease = () => {
    const newValue = Math.max(0, value - 5);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = value + 5;
    onChange(newValue);
  };

  const handleChange = (text) => {
    const num = parseInt(text) || 0;
    onChange(num);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleDecrease}
          activeOpacity={0.7}
        >
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={value.toString()}
          onChangeText={handleChange}
          keyboardType="numeric"
          maxLength={3}
          placeholder={placeholder}
          placeholderTextColor="#CCCCCC"
        />

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleIncrease}
          activeOpacity={0.7}
        >
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    width: 120,
    height: 60,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
  },
  unit: {
    fontSize: 18,
    color: '#666666',
    marginTop: 8,
  },
});

export default BPInput;
