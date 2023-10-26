import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../Button";

const Login = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginButton = () => {
        navigation.navigate("BottomNavigation");
    }

    return (
        <View>
            <Text>Login Page</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <Button
                text="Login"
                onPress={handleLoginButton}
                status="success"
            />
        </View>
    );
};

export default Login;
