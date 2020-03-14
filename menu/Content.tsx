import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const d = Dimensions.get('window');
export const width = d.width * 0.75;
export const height = d.height * 0.5;
const styles = StyleSheet.create({
  container: {
    width,
    height,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 16,
  },

  divider: {
    height: 1,
    backgroundColor: '#D8DAE0',
    width: '100%',
    marginVertical: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});

interface RowProps {
  icon: string;
  label: string;
  href: string;
}

const Row = ({icon, label, href}: RowProps) => (
  <TouchableOpacity onPress={() => Linking.openURL(href)}>
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default () => (
  <View style={styles.container}>
    <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
    <Text style={styles.title}>Mohammad Sadman</Text>
    <Text style={styles.handle}>msadman789@gmail.com</Text>
    <View style={styles.divider} />
    <View>
      <Row icon="code" label="Github" href="https://start-react-native.dev/" />
      <Row
        icon="youtube"
        label="YouTube"
        href="https://www.youtube.com/user/wcandill"
      />
      <Row
        icon="twitter"
        label="Twitter"
        href="https://twitter.com/wcandillon"
      />
    </View>
  </View>
);
