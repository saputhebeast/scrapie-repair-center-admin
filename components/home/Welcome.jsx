import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import getUserData from "../../service/getUser";

const Welcome = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    getUserData(setData);
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText(COLORS.black, SIZES.xSmall)}>
          {data.name ? `Good Morning, ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}!` : "Good Morning!"}
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
