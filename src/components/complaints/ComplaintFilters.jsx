import React from 'react';
import { SearchBar } from '../common/SearchBar';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { RotateCcw, Download } from 'lucide-react';
import { CATEGORIES, LOCALITIES } from '../../data/constants';
import './ComplaintFilters.css';

export const ComplaintFilters = ({
  filters,
  onFilterChange,
  onReset,
  onExportCSV,
  showCSVExport = false
}) => {
  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...CATEGORIES.map((c) => ({ value: c, label: c }))
  ];

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' }
  ];

  const areaOptions = [
    { value: 'All', label: 'All Locality Districts' },
    ...LOCALITIES.map((loc) => ({ value: loc, label: loc }))
  ];

  const priorityOptions = [
    { value: 'All', label: 'All Priorities' },
    { value: 'Critical', label: 'Critical' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ];

  const sortOptions = [
    { value: 'Newest', label: 'Sort by: Newest First' },
    { value: 'Oldest', label: 'Sort by: Oldest First' },
    { value: 'Most Upvoted', label: 'Sort by: Most Upvoted' },
    { value: 'Highest Priority', label: 'Sort by: Highest Priority' }
  ];

  return (
    <div className="complaint-filters-card card">
      <div className="filters-top-row">
        <div className="filters-search-wrap">
          <SearchBar
            value={filters.search || ''}
            onChange={(val) => onFilterChange('search', val)}
            placeholder="Search by title, locality, description, or reference ID..."
          />
        </div>

        <div className="filters-top-actions">
          {showCSVExport && onExportCSV && (
            <Button
              variant="accent"
              icon={Download}
              onClick={onExportCSV}
              title="Export currently filtered complaints to CSV file"
            >
              Download CSV
            </Button>
          )}
          <Button
            variant="ghost"
            size="md"
            icon={RotateCcw}
            onClick={onReset}
            title="Reset all filters"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="filters-dropdowns-grid">
        <Select
          placeholder=""
          value={filters.category || 'All'}
          onChange={(e) => onFilterChange('category', e.target.value)}
          options={categoryOptions}
        />
        <Select
          placeholder=""
          value={filters.status || 'All'}
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={statusOptions}
        />
        <Select
          placeholder=""
          value={filters.area || 'All'}
          onChange={(e) => onFilterChange('area', e.target.value)}
          options={areaOptions}
        />
        <Select
          placeholder=""
          value={filters.priority || 'All'}
          onChange={(e) => onFilterChange('priority', e.target.value)}
          options={priorityOptions}
        />
        <Select
          placeholder=""
          value={filters.sort || 'Newest'}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          options={sortOptions}
        />
      </div>
    </div>
  );
};
