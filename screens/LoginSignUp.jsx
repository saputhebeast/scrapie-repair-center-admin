import { Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import Login from "../components/login-signup/Login";
import SignUp from "../components/login-signup/SignUp";

const LoginSignUp = () => {
    const [isLoginVisible, setLoginVisible] = useState(true);

    const toggleView = () => {
        setLoginVisible(!isLoginVisible);
    };

    return (
        <View>
            <Text>hello world from the sign-up page</Text>
            {isLoginVisible ? <Login /> : <SignUp />}
            <TouchableWithoutFeedback onPress={toggleView}>
                <Text style={{ color: "blue", textDecorationLine: "underline" }}>
                    {isLoginVisible ? "I don't have an account" : "I've an account"}
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default LoginSignUp;
