import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../Button";

const SignUp = ({ switchView }) => {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [telephone, setTelephone] = useState("");

    const handleSignUpButton = () => {
        navigation.navigate("BottomNavigation");
    }

    return (
        <View>
            <Text>Signup Page</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <TextInput
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
            />
            <TextInput
                placeholder="Telephone"
                value={telephone}
                onChangeText={(text) => setTelephone(text)}
            />
            <Button text="Sign Up" onPress={handleSignUpButton} />
        </View>
    );
};

export default SignUp;
