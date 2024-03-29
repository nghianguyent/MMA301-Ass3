import React, {useContext, useMemo} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {orchidsMock} from '../../mock/orchids';
import Icon from 'react-native-vector-icons/Ionicons';

import {AppColor} from '../../constants/colors';
import ListFavorite from '../../components/ListFavorite';
import {favoriteContext} from '../../utils/FavoriteContextWrapper';

const Favorite = () => {
  const {isFavorite, toggleFavorite, clear, favoriteList} =
    useContext(favoriteContext);

  const dataFav = useMemo(() => {
    if (favoriteList != null) {
      return orchidsMock.filter(item => favoriteList.includes(item.id));
    }
    return [];
  }, [JSON.stringify(favoriteList)]);

  const removeAllStorage = () => {
    Alert.alert('Are you sure?', 'Do you want to remove all favorites?', [
      {
        text: 'No',
        onPress: () => {},
        style: 'destructive',
      },
      {
        text: 'Yes',
        onPress: () => {
          clear();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <Text
        style={{
          color: AppColor.primary,
          marginVertical: 30,
          fontSize: 40,
          textAlign: 'center',
        }}>
        My Favorites
      </Text>
      {dataFav.length !== 0 ? (
        <>
          <TouchableOpacity
            style={{marginLeft: 30}}
            onPress={() => removeAllStorage()}>
            <Text
              style={{
                fontSize: 18,
                color: 'rgba(0, 0, 0, 0.5)',
                marginBottom: 10,
                borderColor: 'black',
              }}>
              Clear all
            </Text>
          </TouchableOpacity>
          <ListFavorite
            data={dataFav}
            removeDataFromStorage={(id: number) => toggleFavorite(id)}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="trash-bin-outline" size={60} color={AppColor.primary} />

          <Text style={styles.emptyText}>
            Find an orchid and add it to your favorites
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: AppColor.bg,
    display: 'flex',
    height: Dimensions.get('screen').height,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  emptyText: {
    color: AppColor.primary,
    fontSize: 18,
    padding: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
});

export default Favorite;
