import { View, Text } from 'react-native'
import React from 'react'

const Menu = () => {
  return (
    <Menu
              visible={menuVisibleId === item._id}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={() => openMenu(item._id)}>
                  <Entypo name="dots-three-horizontal" size={24} color={colors.text}/>
                </TouchableOpacity>
              }
            >
              <Menu.Item
                onPress={() => {
                  handleEditList(item);
                  closeMenu();
                }}
                title="Muokkaa"
              />
              <Menu.Item
                onPress={() => {
                  handleDeleteList(item._id);
                  closeMenu();
                }}
                title="Poista"
              />
            </Menu>
  )
}

export default Menu