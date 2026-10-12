import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { services } from '../data/Services';
import { ServiceCard } from '../components/Servicecard';
import { Service } from '../types/Service';

export function ServicesScreen({ navigation }: any) {
  const openService = (service: Service) => {
    navigation.navigate('Details', {
      serviceId: service.id,
      title: service.title,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Сервистер</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={openService} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8FC',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#092B55',
    marginBottom: 15,
  },
});