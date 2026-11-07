import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function PrimaryButton({ title, loadingTitle, loading, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      className={`mt-1 h-[50px] items-center justify-center rounded-[10px] bg-forest active:bg-forest-dark ${
        loading ? 'opacity-85' : ''
      }`}
    >
      {loading ? (
        <View className="flex-row items-center gap-2.5">
          <ActivityIndicator color="#FFFFFF" size="small" />
          <Text className="text-base font-semibold text-white">{loadingTitle}</Text>
        </View>
      ) : (
        <Text className="text-base font-semibold text-white">{title}</Text>
      )}
    </Pressable>
  );
}
