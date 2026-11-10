import { ScrollView, Text, View } from 'react-native';

import CategoryIcon from '../components/CategoryIcon';
import ProgressBar from '../components/ProgressBar';
import { budgets, categories, summary } from '../data/sampleData';
import { getSpent } from '../utils/budget';
import formatRupiah from '../utils/formatRupiah';

function BudgetCard({ budget, isHighlighted }) {
  const category = categories[budget.categoryId];
  const spent = getSpent(budget.categoryId);
  const remaining = budget.limit - spent;
  const isOver = remaining < 0;

  return (
    <View
      className={`rounded-2xl border bg-card p-4 ${isHighlighted ? 'border-forest' : 'border-line'}`}
    >
      <View className="mb-3 flex-row items-center">
        <CategoryIcon icon={category.icon} />
        <View className="ml-3 flex-1">
          <Text className="text-[15px] font-semibold text-ink">{category.label}</Text>
          <Text className="mt-0.5 text-xs text-muted">
            {formatRupiah(spent)} dari {formatRupiah(budget.limit)}
          </Text>
        </View>
        <Text className={`text-sm font-semibold ${isOver ? 'text-danger' : 'text-ink'}`}>
          {Math.round((spent / budget.limit) * 100)}%
        </Text>
      </View>

      <ProgressBar value={spent} max={budget.limit} />

      <Text className={`mt-2 text-xs ${isOver ? 'text-danger' : 'text-muted'}`}>
        {isOver
          ? `Melebihi anggaran ${formatRupiah(Math.abs(remaining))}`
          : `Sisa ${formatRupiah(remaining)}`}
      </Text>
    </View>
  );
}

export default function BudgetScreen({ route }) {
  const highlight = route.params?.highlight;

  const totalLimit = budgets.reduce((total, b) => total + b.limit, 0);
  const totalSpent = budgets.reduce((total, b) => total + getSpent(b.categoryId), 0);

  return (
    <ScrollView className="flex-1 bg-paper" contentContainerClassName="px-5 pb-12 pt-6">
      <View className="w-full max-w-[560px] self-center">
        <View className="mb-6 rounded-2xl border-b-4 border-clay bg-forest p-5">
          <Text className="text-[13px] text-paper/80">Total terpakai · {summary.period}</Text>
          <Text className="mt-1 font-serif text-[28px] font-bold text-paper">
            {formatRupiah(totalSpent)}
          </Text>
          <Text className="mb-3 mt-1 text-xs text-paper/70">
            dari batas {formatRupiah(totalLimit)}
          </Text>
          <View className="h-2 overflow-hidden rounded-full bg-paper/20">
            <View
              className="h-full rounded-full bg-paper"
              style={{ width: `${Math.min(totalSpent / totalLimit, 1) * 100}%` }}
            />
          </View>
        </View>

        <View className="gap-3">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.categoryId}
              budget={budget}
              isHighlighted={budget.categoryId === highlight}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
