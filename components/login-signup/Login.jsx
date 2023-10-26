import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../Button";
import TextInput from "../TextInputLogin";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import formatTitle from "../../helpers/formatTitle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });

    const handleLoginButton = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }

        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in:", user.id);
            })
            .catch((error) => {
                console.error("Authentication failed:", error);
            });

        navigation.reset({
            index: 0,
            routes: [{ name: "BottomNavigation" }],
        });
    }

    return (
        <View>
            <Text style={styles.header}>{formatTitle("Login")}</Text>
            <View
                style={{
                    margin: 20,
                    paddingTop: 100,
                }}
            >
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: "" })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: "" })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <Button
                    text="Login"
                    onPress={handleLoginButton}
                    status="success"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 100,
        fontSize: 40,
        marginLeft: 20,
    },
    container: {
        marginTop: 80,
    },
    input: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        borderColor: "gray"
    }
})

export default Login;
