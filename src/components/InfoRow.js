import { Text, View } from 'react-native';

export default function InfoRow({ label, value, isLast }) {
  return (
    <View className={`flex-row justify-between gap-4 py-3 ${isLast ? '' : 'border-b border-line'}`}>
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="flex-1 text-right text-sm font-medium text-ink">{value}</Text>
    </View>
  );
}
