import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import { getAuth } from 'firebase/auth'
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const auth = getAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("Signed out");
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginSignUp" }],
      });
    }).catch(() => {
      console.log("Sign out failed");
    }
    )
  }
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button
        text="Logout"
        onPress={handleLogout}
        status="fail"
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})
