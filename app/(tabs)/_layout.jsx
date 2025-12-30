import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import useTheme from '@/hooks/useTheme';

/* Tabs for each main section of the app */
const TabsLayout = () => {
    const {colors} = useTheme();
  return (
    /* Styles for tab bar and icons */
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 2,
            height: 90,
            paddingBottom: 30,
            paddingTop: 10,
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
        },
        headerShown: false,
      }}
    >
        <Tabs.Screen
        /* Home tab */
            name='index'
            options={{
                title: 'Home',
                tabBarIcon: ({color, size}) => (
                    <Octicons name="checklist" size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
        /* Shopping List tab */
            name='shopping_list'
            options={{
                title: 'Shopping List',
                tabBarIcon: ({color, size}) => (
                    <AntDesign name="shopping-cart" size={28} color={color} />
                )
            }}
        />
        <Tabs.Screen
        /* Profile tab */
            name='profile'
            options={{
                title: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <Feather name="user" size={size} color={color} />
                )
            }}
        />
    </Tabs>
  )
}

export default TabsLayout