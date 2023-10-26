import React from "react";
import {
  View,
  Text,
} from "react-native";
import OnGoingRequestView from "../../components/OnGoingRequestView";

const Scan = ({}) => {
    return (
      <View>
        <Text>On-going Request</Text>
        <OnGoingRequestView/>
      </View>
    );
}

export default Scan;
