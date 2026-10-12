import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Service } from '../types/Service';

type Props = {
  service: Service;
  onPress: (service: Service) => void;
};

export function ServiceCard({ service, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(service)} style={styles.card}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#092B55',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
});