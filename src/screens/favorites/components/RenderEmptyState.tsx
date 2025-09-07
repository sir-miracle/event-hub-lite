import React from 'react';
import { EmptyState, ErrorState } from '../../../components/molecules';
import { TextConstants } from '../../../utils/text-constants/TextConstants';

const RenderEmptyState = ({
  loading,
  error,
  refreshFavoriteEvents,
}: {
  loading: boolean;
  error: string;
  refreshFavoriteEvents: () => void;
}) => {
  if (loading) return null;
  if (error) {
    return <ErrorState message={error} onRetry={refreshFavoriteEvents} />;
  }

  return (
    <EmptyState
      type="no_favorites"
      title={TextConstants.NO_FAVORITES_YET}
      message={
        TextConstants.EVENTS_YOU_MARK_AS_FAVORITES_WILL_APPEAR_HERE_START_EXPLORING_AND_ADD_SOME_EVENTS_TO_YOUR_FAVORITES
      }
    />
  );
};

export default RenderEmptyState;
