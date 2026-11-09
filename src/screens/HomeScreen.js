import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import TransactionRow from '../components/TransactionRow';
import { budgets, summary, transactions } from '../data/sampleData';
import { getSpent, getTotals } from '../utils/budget';
import formatRupiah from '../utils/formatRupiah';

function getGreeting(hour) {
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

function SummaryTile({ label, amount, tone }) {
  return (
    <View className="flex-1 rounded-2xl border border-line bg-card p-4">
      <Text className="text-xs text-muted">{label}</Text>
      <Text className={`mt-1 text-base font-semibold ${tone}`}>{formatRupiah(amount)}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation, route }) {
  const user = route.params?.user;
  const name = user?.fullName || user?.username || 'Pengguna';

  const { income, expense } = getTotals();
  const overBudget = budgets.filter((b) => getSpent(b.categoryId) > b.limit).length;

  function logout() {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  const header = (
    <View>
      <View className="mb-6 flex-row items-center">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-forest">
          <Text className="font-semibold text-paper">{getInitials(name)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-[13px] text-muted">{getGreeting(new Date().getHours())},</Text>
          <Text className="font-serif text-xl font-bold text-ink">{name}</Text>
        </View>
        <Pressable onPress={logout} hitSlop={8} accessibilityRole="button">
          <Text className="text-[13px] font-semibold text-forest">Keluar</Text>
        </Pressable>
      </View>

      <View className="rounded-2xl border-b-4 border-clay bg-forest p-5">
        <Text className="text-[13px] text-paper/80">Total saldo</Text>
        <Text className="mt-1 font-serif text-[32px] font-bold text-paper">
          {formatRupiah(summary.balance)}
        </Text>
        <Text className="mt-2 text-xs text-paper/70">Periode {summary.period}</Text>
      </View>

      <View className="mt-3 flex-row gap-3">
        <SummaryTile label="Pemasukan" amount={income} tone="text-forest" />
        <SummaryTile label="Pengeluaran" amount={expense} tone="text-clay" />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Budget')}
        accessibilityRole="button"
        className="mt-3 flex-row items-center rounded-2xl border border-line bg-card p-4 active:bg-paper"
      >
        <Ionicons name="pie-chart-outline" size={22} color="#1F4D3F" />
        <View className="ml-3 flex-1">
          <Text className="text-[15px] font-semibold text-ink">Anggaran bulanan</Text>
          <Text className="mt-0.5 text-xs text-muted">
            {overBudget > 0 ? `${overBudget} kategori melebihi batas` : 'Semua kategori masih aman'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#6F655C" />
      </Pressable>

      <Text className="mb-3 mt-8 font-serif text-lg font-semibold text-ink">Riwayat transaksi</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionRow
            item={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
        ListHeaderComponent={header}
        ItemSeparatorComponent={() => <View className="h-2" />}
        contentContainerClassName="w-full max-w-[560px] self-center px-5 pb-12 pt-6"
      />
    </SafeAreaView>
  );
}
