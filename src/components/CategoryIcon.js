import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const sizes = {
  md: { box: 'h-10 w-10', icon: 20 },
  lg: { box: 'h-16 w-16', icon: 30 },
};

export default function CategoryIcon({ icon, isIncome = false, size = 'md' }) {
  const { box, icon: iconSize } = sizes[size];

  return (
    <View
      className={`items-center justify-center rounded-full ${box} ${
        isIncome ? 'bg-forest/10' : 'bg-clay/10'
      }`}
    >
      <Ionicons name={icon} size={iconSize} color={isIncome ? '#1F4D3F' : '#B5562F'} />
    </View>
  );
}
