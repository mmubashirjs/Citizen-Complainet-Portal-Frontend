import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ComplaintFilters } from '../components/complaints/ComplaintFilters';
import { ComplaintCard } from '../components/complaints/ComplaintCard';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { Pagination } from '../components/common/Pagination';
import { complaintService } from '../services/complaintService';
import './PublicComplaintsPage.css';

export const PublicComplaintsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [filters, setFilters] = useState({
    search: '',
    category: initialCategory,
    status: 'All',
    area: 'All',
    priority: 'All',
    sort: 'Newest'
  });

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const data = await complaintService.getComplaints(filters);
      setComplaints(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'All',
      status: 'All',
      area: 'All',
      priority: 'All',
      sort: 'Newest'
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(complaints.length / pageSize);
  const paginatedComplaints = complaints.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="public-complaints-page container">
      <div className="public-header animate-fade-in">
        <h1 className="public-title">Community Complaints</h1>
        <p className="public-subtitle">See what's happening in your community and support issues that matter.</p>
      </div>

      <ComplaintFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {loading ? (
        <LoadingState count={4} />
      ) : complaints.length === 0 ? (
        <EmptyState
          title="No complaints found"
          message="Try changing your search term or dropdown filters to find community issues."
          actionText="Reset Filters"
          onAction={handleReset}
        />
      ) : (
        <>
          <div className="public-results-count font-bold text-muted">
            Showing {complaints.length} public complaint{complaints.length !== 1 ? 's' : ''}
          </div>

          <div className="public-complaints-grid">
            {paginatedComplaints.map((item) => (
              <ComplaintCard
                key={item.id}
                complaint={item}
                onUpvoteSuccess={fetchComplaints}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
