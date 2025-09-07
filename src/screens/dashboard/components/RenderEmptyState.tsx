import React from 'react';
import { EmptyState, ErrorState } from '../../../components/molecules';
import { SearchFilters } from '../../../types';
import { TextConstants } from '../../../utils/text-constants/TextConstants';

const RenderEmptyState = ({
  loading,
  error,
  filters,
  setFilters,
  loadEvents,
  refreshEvents,
}: {
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  loadEvents: (page: number, query: string, category: string) => void;
  refreshEvents: () => void;
}) => {
  if (loading) return null;

  if (error) {
    return <ErrorState message={error} onRetry={refreshEvents} />;
  }

  if (filters.query || filters.category !== 'All') {
    return (
      <EmptyState
        type="no_search_results"
        title={TextConstants.NO_EVENTS_FOUND}
        message={
          TextConstants.TRY_ADJUSTING_YOUR_SEARCH_OR_FILTERS_TO_FIND_MORE_EVENTS
        }
        actionText={TextConstants.CLEAR_FILTERS}
        onActionPress={() => {
          setFilters({ query: '', category: 'All', page: 1 });
          loadEvents(1, '', 'All');
        }}
      />
    );
  }

  return (
    <EmptyState
      type="no_events"
      title={TextConstants.NO_EVENTS_AVAILABLE}
      message={
        TextConstants.THERE_ARE_NO_EVENTS_AVAILABLE_AT_THE_MOMENT_PLEASE_CHECK_BACK_LATER
      }
      actionText={TextConstants.REFRESH}
      onActionPress={refreshEvents}
    />
  );
};

export default RenderEmptyState;
