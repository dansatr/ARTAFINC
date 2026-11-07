import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { categories } from '../data/sampleData';
import formatRupiah from '../utils/formatRupiah';
import CategoryIcon from './CategoryIcon';

export default function TransactionRow({ item, onPress }) {
  const category = categories[item.categoryId];
  const isIncome = item.amount > 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center rounded-xl border border-line bg-card px-4 py-3.5 active:bg-paper"
    >
      <CategoryIcon icon={category.icon} isIncome={isIncome} />

      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-medium text-ink" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="mt-0.5 text-xs text-muted" numberOfLines={1}>
          {category.label}
        </Text>
      </View>

      <View className="ml-2 items-end">
        <Text className={`text-sm font-semibold ${isIncome ? 'text-forest' : 'text-ink'}`}>
          {formatRupiah(item.amount, { showSign: true })}
        </Text>
        <Text className="mt-0.5 text-xs text-muted">{item.date}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#6F655C" style={{ marginLeft: 6 }} />
    </Pressable>
  );
}
