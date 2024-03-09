import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';

import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert(error.message);
    setLoading(false);
  };


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Profile' }} />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter phone number"
        style={styles.input}
      />

      <Text style={styles.label}>National ID</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter National ID"
        style={styles.input}
 
      />

      <Button onPress={signInWithEmail} disabled={loading} text={loading ? "Updating....": "  Update Profile"} />
      {/* <Link href="/signUp" style={styles.textButton}>
       Update Profile
      </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;