import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function TextField({ label, error, password = false, inputRef, ...props }) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let borderColor = 'border-line';
  if (focused) borderColor = 'border-forest';
  if (error) borderColor = 'border-danger';

  return (
    <View className="mb-[18px]">
      <Text className="mb-1.5 text-[13px] font-semibold text-ink">{label}</Text>
      <View
        className={`flex-row items-center rounded-[10px] border bg-white px-3.5 ${borderColor}`}
      >
        <TextInput
          ref={inputRef}
          className="h-12 flex-1 text-[15px] text-ink web:outline-none"
          placeholderTextColor="#6F655C"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={password && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {password && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={8}
            accessibilityRole="button"
            className="py-1.5 pl-2.5"
          >
            <Text className="text-[13px] font-semibold text-forest">
              {showPassword ? 'Sembunyikan' : 'Tampilkan'}
            </Text>
          </Pressable>
        )}
      </View>
      {error ? <Text className="mt-1.5 text-xs text-danger">{error}</Text> : null}
    </View>
  );
}
