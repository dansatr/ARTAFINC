import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import AuthLayout from '../components/AuthLayout';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import { requestSignIn } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);

  async function handleLogin() {
    if (loading) return;

    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Nama pengguna wajib diisi.';
    if (!password) newErrors.password = 'Kata sandi wajib diisi.';

    setErrors(newErrors);
    setFormError('');
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const result = await requestSignIn(username.trim(), password);
      if (result.isSuccessful) {
        navigation.reset({ index: 0, routes: [{ name: 'Home', params: { user: result.user } }] });
      } else {
        setFormError('Nama pengguna atau kata sandi salah.');
      }
    } catch {
      setFormError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      footer={
        <View className="mt-5 items-center gap-3.5">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-[13px] text-muted">Belum punya akun?</Text>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              hitSlop={8}
              accessibilityRole="link"
            >
              <Text className="text-[13px] font-semibold text-forest">Daftar</Text>
            </Pressable>
          </View>
          <Text className="text-xs text-muted">Data Anda dilindungi dan dienkripsi.</Text>
        </View>
      }
    >
      <Text className="font-serif text-2xl font-semibold text-ink">Masuk ke akun Anda</Text>
      <Text className="mb-6 mt-1.5 text-sm leading-5 text-muted">
        Silakan masukkan nama pengguna dan kata sandi.
      </Text>

      <TextField
        label="Nama pengguna"
        placeholder="contoh: budi.santoso"
        value={username}
        onChangeText={setUsername}
        error={errors.username}
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        editable={!loading}
      />

      <TextField
        inputRef={passwordRef}
        password
        label="Kata sandi"
        placeholder="Masukkan kata sandi"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={handleLogin}
        editable={!loading}
      />

      {formError ? (
        <View className="mb-4 rounded-lg bg-danger-soft px-3 py-2.5">
          <Text className="text-[13px] text-danger">{formError}</Text>
        </View>
      ) : null}

      <PrimaryButton
        title="Masuk"
        loadingTitle="Memproses..."
        loading={loading}
        onPress={handleLogin}
      />
    </AuthLayout>
  );
}
