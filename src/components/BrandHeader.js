import { Text, View } from 'react-native';

export default function BrandHeader() {
  return (
    <View className="mb-7 flex-row items-center gap-3">
      <View className="h-11 w-11 items-center justify-center rounded-xl border-b-[3px] border-clay bg-forest">
        <Text className="font-serif text-[22px] font-bold text-paper">A</Text>
      </View>
      <View>
        <Text className="font-serif text-[22px] font-bold text-ink">Arta</Text>
        <Text className="text-[13px] text-muted">Keuangan yang tertata.</Text>
      </View>
    </View>
  );
}
