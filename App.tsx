import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Details: { serviceId: string; title: string };
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function LoginScreen({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!login.trim() || password.length < 6) {
      Alert.alert('Қате', 'Логинді және кемінде 6 таңбалы құпиясөзді енгізіңіз');
      return;
    }
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.centerContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Campus Hub</Text>
        <Text style={styles.subtitle}>Жүйеге кіру</Text>

        <TextInput
          style={styles.input}
          placeholder="Логин"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          style={styles.input}
          placeholder="Құпиясөз"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Кіру</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Campus Hub</Text>
      <View style={styles.contentCard}>
        <Text style={styles.sectionTitle}>Қайырлы күн, Назерке!</Text>
        <Text style={styles.text}>Бүгінгі кампус жаңалықтары мен оқиғалары.</Text>
        
        <Pressable 
          style={styles.navButton} 
          onPress={() => navigation.navigate('Details', { serviceId: 'library', title: 'Кітапхана' })}
        >
          <Text style={styles.navButtonText}>Кітапхана толығырақ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function ServicesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Сервистер</Text>
      <View style={styles.grid}>
        <Pressable 
          style={styles.serviceItem}
          onPress={() => navigation.navigate('Details', { serviceId: 'schedule', title: 'Сабақ кестесі' })}
        >
          <Text style={styles.serviceIcon}>📅</Text>
          <Text style={styles.serviceText}>Кесте</Text>
        </Pressable>

        <Pressable 
          style={styles.serviceItem}
          onPress={() => navigation.navigate('Details', { serviceId: 'moodle', title: 'Moodle LMS' })}
        >
          <Text style={styles.serviceIcon}>💻</Text>
          <Text style={styles.serviceText}>Moodle</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Профиль</Text>
      <View style={styles.contentCard}>
        <Text style={styles.nameText}>Назерке</Text>
        <Text style={styles.text}>ALT University · Computer Science</Text>
        
        <Pressable style={[styles.button, { backgroundColor: '#D9342B', marginTop: 20 }]} onPress={() => navigation.replace('Login')}>
          <Text style={styles.buttonText}>Шығу</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }: any) {
  const { serviceId, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentCard}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>Қызметтің бірегей идентификаторы (ID): {serviceId}</Text>
        
        <Pressable style={[styles.button, { marginTop: 20 }]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Артқа қайтып</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#FFFFFF', paddingBottom: 5 } }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Басты бет' }} />
      <Tab.Screen name="Services" component={ServicesScreen} options={{ title: 'Сервистер' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Толығырақ' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F4F8FC',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F8FC',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#092B55',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#60758A',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#092B55',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#092B55',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    color: '#1E293B',
  },
  button: {
    backgroundColor: '#0B66E4',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#092B55',
    marginBottom: 4,
  },
  navButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#E8F1FF',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  navButtonText: {
    color: '#0B66E4',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  serviceText: {
    fontWeight: '700',
    color: '#092B55',
  },
})