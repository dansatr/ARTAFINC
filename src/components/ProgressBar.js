import { View } from 'react-native';

export default function ProgressBar({ value, max }) {
  const percent = max > 0 ? Math.min(value / max, 1) * 100 : 0;
  const isOver = value > max;

  return (
    <View className="h-2 overflow-hidden rounded-full bg-line">
      <View
        className={`h-full rounded-full ${isOver ? 'bg-danger' : 'bg-forest'}`}
        style={{ width: `${percent}%` }}
      />
    </View>
  );
}
