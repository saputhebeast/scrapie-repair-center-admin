import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CompletedRequestedView from '../../components/CompletedRequestView'

const Fav = () => {
  return (
    <View>
      <Text>Completed Requests</Text>
      <CompletedRequestedView/>
    </View>
  )
}

export default Fav

const styles = StyleSheet.create({})