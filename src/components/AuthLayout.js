import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import BrandHeader from './BrandHeader';

// Shared frame for the login and register screens.
export default function AuthLayout({ children, footer }) {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-paper"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerClassName="grow justify-center px-5 py-12"
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-[400px] self-center">
          <BrandHeader />
          <View className="rounded-2xl border border-line bg-card p-6">{children}</View>
          {footer}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
