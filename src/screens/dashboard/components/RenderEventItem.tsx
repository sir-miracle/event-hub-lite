import {} from 'react-native';
import React from 'react';
import { EventCard } from '../../../components/molecules';
import { Event } from '../../../types';

const RenderEventItem = ({
  item,
  onPress,
  onFavoritePress,
  isFavorite = false,
  showFavoriteButton = false,
}: {
  item: Event;
  onPress: (item: Event) => void;
  onFavoritePress?: (item: Event) => void;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
}) => {
  return (
    <EventCard
      event={item}
      onPress={() => onPress(item)}
      onFavoritePress={async () => {
        onFavoritePress?.(item);
      }}
      isFavorite={isFavorite}
      showFavoriteButton={showFavoriteButton}
    />
  );
};

export default RenderEventItem;
