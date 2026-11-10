import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CategoryIcon from '../components/CategoryIcon';
import InfoRow from '../components/InfoRow';
import PrimaryButton from '../components/PrimaryButton';
import { categories, transactions } from '../data/sampleData';
import formatRupiah from '../utils/formatRupiah';

export default function DetailScreen({ navigation, route }) {
  const transaction = transactions.find((item) => item.id === route.params.id);

  if (!transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-paper">
        <Text className="text-muted">Transaksi tidak ditemukan.</Text>
      </View>
    );
  }

  const category = categories[transaction.categoryId];
  const isIncome = transaction.amount > 0;

  return (
    <ScrollView className="flex-1 bg-paper" contentContainerClassName="px-5 pb-12 pt-6">
      <View className="w-full max-w-[560px] self-center">
        <View className="items-center rounded-2xl border border-line bg-card px-5 py-7">
          <CategoryIcon icon={category.icon} isIncome={isIncome} size="lg" />
          <Text className="mt-4 text-[15px] text-muted">{transaction.title}</Text>
          <Text
            className={`mt-1 font-serif text-[30px] font-bold ${
              isIncome ? 'text-forest' : 'text-ink'
            }`}
          >
            {formatRupiah(transaction.amount, { showSign: true })}
          </Text>

          <View className="mt-3 flex-row items-center gap-1 rounded-full bg-forest/10 px-3 py-1">
            <Ionicons name="checkmark-circle" size={14} color="#1F4D3F" />
            <Text className="text-xs font-semibold text-forest">Berhasil</Text>
          </View>
        </View>

        <Text className="mb-2 mt-6 font-serif text-lg font-semibold text-ink">Rincian</Text>
        <View className="rounded-2xl border border-line bg-card px-4">
          <InfoRow label="Jenis" value={isIncome ? 'Pemasukan' : 'Pengeluaran'} />
          <InfoRow label="Kategori" value={category.label} />
          <InfoRow label="Tanggal" value={transaction.date} />
          <InfoRow label="Waktu" value={`${transaction.time} WIB`} />
          <InfoRow label="Metode" value={transaction.method} />
          <InfoRow label="Catatan" value={transaction.note || '-'} />
          <InfoRow label="No. referensi" value={transaction.id} isLast />
        </View>

        {!isIncome && (
          <View className="mt-6">
            <PrimaryButton
              title="Lihat anggaran"
              onPress={() => navigation.navigate('Budget', { highlight: transaction.categoryId })}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
