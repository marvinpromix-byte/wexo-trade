import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ImageBackground,
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Xatolik', 'Iltimos, barcha maydonlarni to‘ldiring!');
      return;
    }

    try {
      const response = await fetch('https://wexotrade.vercel.app/api/auth/sign-in/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://wexotrade.vercel.app',
        },
        body: JSON.stringify({ email, password }),
      });

      // 1. Serverdan kelgan kuki (Cookie) sarlavhasini ushlab olib saqlaymiz
      const rawCookie = response.headers.get('set-cookie');
      if (rawCookie) {
        await SecureStore.setItemAsync('user_cookie', rawCookie);
      }

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        Alert.alert('Server xatoligi', 'Serverdan kutilmagan javob keldi.');
        return;
      }

      if (response.ok) {
        // 2. Tokenni ham xavfsiz xotiraga saqlaymiz
        if (data.token) {
          await SecureStore.setItemAsync('user_token', data.token);
        }
        
        // 3. Endi xavfsiz tarzda Home sahifasiga o'tamiz
        router.replace('/home');
      } else {
        Alert.alert('Xatolik', data.message || 'Email yoki parol xato!');
      }
    } catch (error) {
      Alert.alert('Tarmoq xatoligi', 'Serverga ulanib bo‘lmadi. Internetni tekshiring.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            
            {/* Logo va Sarlavha qismi */}
            <View style={styles.headerContainer}>
              <View style={styles.logoBox}>
                <Image 
                  source={require('../../assets/images/logo.png')} 
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.title}>Wexo Trade</Text>
              <Text style={styles.subtitle}>Connect Social Trading</Text>
            </View>

            {/* Forma qismi */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email yoki foydalanuvchi nomi"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Parol"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)} 
                  style={styles.eyeIcon}
                >
                  <Text style={styles.eyeText}>{showPassword ? 'Yashirish' : 'Ko‘rsatish'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotText}>Parolni unutdingizmi?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <ButtonText text="Kirish" />
              </TouchableOpacity>
            </View>

            {/* Ro'yxatdan o'tish havolasi */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Hisobingiz yo‘qmi? </Text>
              <TouchableOpacity>
                <Text style={styles.signupText}>Ro‘yxatdan o‘tish</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

// Yordamchi matn komponenti (tugma ichidagi)
function ButtonText({ text }: { text: string }) {
  return <Text style={styles.buttonText}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(9, 13, 22, 0.92)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBox: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  eyeText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#22c55e',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#090d16',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  signupText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: 'bold',
  },
});