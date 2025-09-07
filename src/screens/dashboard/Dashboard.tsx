import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Event, EventCategory, SearchFilters } from '../../types';
import { Colors } from '../../utils/theme/colors/Colors';
import { verticalScale } from '../../utils/scaling';
import {
  SearchBar,
  CategoryFilter,
  HomeHeader,
  LoadingIndicator,
} from '../../components/molecules';
import mockApiService from '../../services/mockApiService';
import databaseService from '../../services/databaseService';
import { AppRootWrapper } from '../../components/organisms';
import { height } from '../../utils/utility-functions/UntilityFunctions';
import RenderEventItem from './components/RenderEventItem';
import RenderFooter from './components/RenderFooter';
import RenderEmptyState from './components/RenderEmptyState';
import { TextConstants } from '../../utils/text-constants/TextConstants';

const Dashboard = ({ navigation }: { navigation: any }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteStatuses, setFavoriteStatuses] = useState<Record<string, boolean>>({});

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All',
    page: 1,
  });

  const categories: (EventCategory | 'All')[] = [
    'All',
    ...mockApiService.getCategories(),
  ];

  // Load favorite statuses for events
  const loadFavoriteStatuses = useCallback(async (eventIds: string[]) => {
    try {
      const statuses: Record<string, boolean> = {};
      for (const eventId of eventIds) {
        statuses[eventId] = await databaseService.isFavorite(eventId);
      }
      setFavoriteStatuses(prev => ({ ...prev, ...statuses }));
    } catch (error) {
      console.error('Error loading favorite statuses:', error);
    }
  }, []);

  // Load events from API and cache in database
  const loadEvents = useCallback(
    async (
      page: number = 1,
      query: string = '',
      category: EventCategory | 'All' = 'All',
      isRefresh: boolean = false,
    ) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
          setError(null);
        } else if (page === 1) {
          setLoading(true);
          setError(null);
        } else {
          setLoadingMore(true);
        }

        // Try to load from API first
        try {
          const response = await mockApiService.getEvents(
            page,
            query,
            category,
          );

          // Cache events in database
          await databaseService.saveEvents(response.events);

          if (page === 1 || isRefresh) {
            setEvents(response.events);
          } else {
            setEvents(prev => [...prev, ...response.events]);
          }

          // Load favorite statuses for the events
          await loadFavoriteStatuses(response.events.map(event => event.id));

          setHasMore(response.hasMore);
          setCurrentPage(page);
        } catch (apiError) {
          // If API fails, try to load from database
          console.log('API failed, loading from database:', apiError);
          const dbResponse = await databaseService.getEvents(
            page,
            category,
            query,
          );

          if (page === 1 || isRefresh) {
            setEvents(dbResponse.events);
          } else {
            setEvents(prev => [...prev, ...dbResponse.events]);
          }

          // Load favorite statuses for the events
          await loadFavoriteStatuses(dbResponse.events.map(event => event.id));

          setHasMore(dbResponse.hasMore);
          setCurrentPage(page);
        }
      } catch (err) {
        console.error('Error loading events:', err);
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  // Load more events when reaching end of list
  const loadMoreEvents = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      loadEvents(currentPage + 1, filters.query, filters.category);
    }
  }, [loadEvents, currentPage, filters, loadingMore, hasMore, loading]);

  // Refresh events
  const refreshEvents = useCallback(() => {
    loadEvents(1, filters.query, filters.category, true);
  }, [loadEvents, filters]);

  // Handle search
  const handleSearch = useCallback(
    (query: string) => {
      setFilters(prev => ({ ...prev, query, page: 1 }));
      loadEvents(1, query, filters.category);
    },
    [loadEvents, filters.category],
  );

  // Handle category filter
  const handleCategorySelect = useCallback(
    (category: EventCategory | 'All') => {
      setFilters(prev => ({ ...prev, category, page: 1 }));
      loadEvents(1, filters.query, category);
    },
    [loadEvents, filters.query],
  );

  // Handle favorite toggle
  const handleFavoriteToggle = useCallback(async (eventId: string) => {
    try {
      const newFavoriteStatus = await databaseService.toggleFavorite(eventId);
      setFavoriteStatuses(prev => ({
        ...prev,
        [eventId]: newFavoriteStatus,
      }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, []);

  // Load events on component mount and when filters change
  useEffect(() => {
    loadEvents(1, filters.query, filters.category);
  }, []);

  if (loading && events.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator color={Colors.primaryBlue} />
      </View>
    );
  }

  return (
    <AppRootWrapper
      Header={() => (
        <HomeHeader
          name={'Miracle'} //should be user name from api if authentication was implemented
          onNotificationPress={() => {}}
          onAvatarPress={() => {}}
        />
      )}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            value={filters.query}
            onChangeText={handleSearch}
            placeholder={TextConstants.SEARCH_EVENTS}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={filters.category}
            onCategorySelect={handleCategorySelect}
          />
        </View>

        <FlatList
          data={events}
          renderItem={({ item }) => (
            <RenderEventItem
              item={item}
              onPress={item => {
                navigation.navigate('EventDetailsStack', {
                  screen: 'EventDetails',
                  params: { event: item },
                });
              }}
              onFavoritePress={item => handleFavoriteToggle(item.id)}
              isFavorite={favoriteStatuses[item.id] || false}
              showFavoriteButton={true}
            />
          )}
          keyExtractor={item => item.id}
          style={{ width: '100%', marginBottom: 50 }}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={refreshEvents}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => <RenderFooter loadingMore={loadingMore} />}
          ListEmptyComponent={() => (
            <RenderEmptyState
              loading={loading}
              error={error}
              filters={filters}
              setFilters={setFilters}
              loadEvents={(page, query, category) =>
                loadEvents(page, query, category as EventCategory | 'All')
              }
              refreshEvents={refreshEvents}
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
    backgroundColor: Colors.background,
    width: '100%',
    height: height * 0.85,
  },
  header: {
    backgroundColor: Colors.white,
    paddingBottom: verticalScale(8),
  },
  listContainer: {
    paddingBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default Dashboard;
