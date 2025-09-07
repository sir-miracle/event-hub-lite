import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Event } from '../../types';
import { Colors } from '../../utils/theme/colors/Colors';
import { verticalScale } from '../../utils/scaling';
import { LoadingIndicator, SecondaryHeader } from '../../components/molecules';
import databaseService from '../../services/databaseService';
import { AppRootWrapper } from '../../components/organisms';
import { height } from '../../utils/utility-functions/UntilityFunctions';
import RenderEventItem from '../dashboard/components/RenderEventItem';
import RenderEmptyState from './components/RenderEmptyState';
import { TextConstants } from '../../utils/text-constants/TextConstants';

const Favorites = ({ navigation }: { navigation: any }) => {
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavoriteEvents = useCallback(async (isRefresh: boolean = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
        setError(null);
      } else {
        setLoading(true);
        setError(null);
      }

      const events = await databaseService.getFavoriteEvents();
      setFavoriteEvents(events);
    } catch (err) {
      console.error('Error loading favorite events:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load favorite events',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshFavoriteEvents = useCallback(() => {
    loadFavoriteEvents(true);
  }, [loadFavoriteEvents]);

  useFocusEffect(
    useCallback(() => {
      loadFavoriteEvents();
    }, []),
  );

  const handleFavoriteToggle = useCallback(async (eventId: string) => {
    try {
      const newFavoriteStatus = await databaseService.toggleFavorite(eventId);

      if (!newFavoriteStatus) {
        setFavoriteEvents(prev => prev.filter(event => event.id !== eventId));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, []);

  if (loading && favoriteEvents.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator color={Colors.primaryBlue} />
      </View>
    );
  }

  return (
    <AppRootWrapper
      Header={() => (
        <SecondaryHeader
          showBackArrow={false}
          centerTitle={TextConstants.FAVORITES}
          isTitleToTheLeft
        />
      )}
    >
      <View style={styles.container}>
        <FlatList
          data={favoriteEvents}
          renderItem={({ item }) => (
            <RenderEventItem
              item={item}
              onPress={item => {
                navigation.navigate('EventDetailsStack', {
                  screen: 'EventDetails',
                  params: { event: item },
                });
              }}
              onFavoritePress={item => handleFavoriteToggle(item?.id)}
              isFavorite={true}
              showFavoriteButton={true}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={refreshFavoriteEvents}
          ListEmptyComponent={() => (
            <RenderEmptyState
              loading={loading}
              error={error || ''}
              refreshFavoriteEvents={refreshFavoriteEvents}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AppRootWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    width: '100%',
    height: height * 0.85,
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default Favorites;
