import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import AuthLayout from '../components/AuthLayout';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import { requestSignUp } from '../services/authService';

const emptyForm = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function validate(form) {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi.';
  if (!form.username.trim()) errors.username = 'Nama pengguna wajib diisi.';

  if (!form.email.trim()) {
    errors.email = 'Email wajib diisi.';
  } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Format email tidak valid.';
  }

  if (form.password.length < 8) errors.password = 'Kata sandi minimal 8 karakter.';
  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Kata sandi tidak sama.';
  }

  return errors;
}

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegister() {
    if (loading) return;

    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const result = await requestSignUp({
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      if (result.isSuccessful) {
        navigation.reset({ index: 0, routes: [{ name: 'Home', params: { user: result.user } }] });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      footer={
        <View className="mt-5 flex-row items-center justify-center gap-1.5">
          <Text className="text-[13px] text-muted">Sudah punya akun?</Text>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8} accessibilityRole="link">
            <Text className="text-[13px] font-semibold text-forest">Masuk</Text>
          </Pressable>
        </View>
      }
    >
      <Text className="font-serif text-2xl font-semibold text-ink">Buat akun baru</Text>
      <Text className="mb-6 mt-1.5 text-sm leading-5 text-muted">
        Isi data di bawah ini untuk mulai mencatat keuangan Anda.
      </Text>

      <TextField
        label="Nama lengkap"
        placeholder="contoh: Budi Santoso"
        value={form.fullName}
        onChangeText={(text) => updateField('fullName', text)}
        error={errors.fullName}
        autoCapitalize="words"
        autoComplete="name"
        editable={!loading}
      />

      <TextField
        label="Nama pengguna"
        placeholder="contoh: budi.santoso"
        value={form.username}
        onChangeText={(text) => updateField('username', text)}
        error={errors.username}
        autoComplete="username-new"
        editable={!loading}
      />

      <TextField
        label="Email"
        placeholder="nama@email.com"
        value={form.email}
        onChangeText={(text) => updateField('email', text)}
        error={errors.email}
        keyboardType="email-address"
        autoComplete="email"
        editable={!loading}
      />

      <TextField
        password
        label="Kata sandi"
        placeholder="Minimal 8 karakter"
        value={form.password}
        onChangeText={(text) => updateField('password', text)}
        error={errors.password}
        autoComplete="new-password"
        textContentType="newPassword"
        editable={!loading}
      />

      <TextField
        password
        label="Ulangi kata sandi"
        placeholder="Ketik ulang kata sandi"
        value={form.confirmPassword}
        onChangeText={(text) => updateField('confirmPassword', text)}
        error={errors.confirmPassword}
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={handleRegister}
        editable={!loading}
      />

      <PrimaryButton
        title="Daftar"
        loadingTitle="Mendaftarkan..."
        loading={loading}
        onPress={handleRegister}
      />
    </AuthLayout>
  );
}
