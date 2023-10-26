import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PendingRequestCard from "../../components/PendingRequestCard";
import PendingRequestView from "../../components/PendingRequestView";

const Search = () => {
  return (
    <SafeAreaView>
      <Text>Pending Request</Text>
      <PendingRequestView/>
    </SafeAreaView>
  );
};

export default Search;
