import * as React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { StyleSheet, View } from "react-native";

const AppBar = ({ title }) => {
    const navigation = useNavigation();
    const _goBack = () => {
        navigation.goBack();
    };
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <View
                style={[
                    StyleSheet.absoluteFill,
                    { alignItems: "center", justifyContent: "center" },
                ]}
                pointerEvents="box-none"
            >
                <Appbar.Content
                    title={title}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                />
            </View>
            <View style={{ flex: 1 }} />
        </Appbar.Header>
    );
};

export default AppBar;
