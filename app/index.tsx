import { Text, View } from 'react-native';
import tw from './tailwind';

export default function App() {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Text style={tw`text-2xl text-red-500 font-bold`}>Hello World with Tailwind CSS</Text>
      <Text style={tw`text-2xl text-red-500 font-bold`}>Hello World with Tailwind CSS</Text>
    </View>
  );
}