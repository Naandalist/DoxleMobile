import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
  title: string
  pressFunction: Function
}

const ButtonAlert = ({ title, pressFunction }: Props) => {
  return <Button title={title} onPress={() => pressFunction} color='red' />
}

export default ButtonAlert

const styles = StyleSheet.create({})
