import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { formatDate } from '../../utils/formatters';
import { ArrowUp, ExternalLink } from 'lucide-react';
import './ComplaintTable.css';

export const ComplaintTable = ({ complaints = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="complaint-table-wrapper">
      {/* Desktop & Tablet Table View */}
      <div className="table-responsive">
        <table className="complaint-table">
          <thead>
            <tr>
              <th>Reference & Title</th>
              <th>Category</th>
              <th>Area</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Upvotes</th>
              <th>Filed On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((item) => (
              <tr
                key={item.id}
                className="complaint-row"
                onClick={() => navigate(`/officer/complaints/${item.id}`)}
              >
                <td>
                  <div className="cell-title-block">
                    <span className="ref-id font-number">{item.id}</span>
                    <span className="row-title">{item.title}</span>
                  </div>
                </td>
                <td>
                  <span className="cell-category-tag">{item.category}</span>
                </td>
                <td>
                  <span className="cell-text">{item.area}</span>
                </td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td>
                  <PriorityBadge priority={item.priority} />
                </td>
                <td>
                  <div className="cell-upvote">
                    <ArrowUp size={13} />
                    <span className="font-number">{item.upvotes}</span>
                  </div>
                </td>
                <td>
                  <span className="cell-text">{formatDate(item.createdAt)}</span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link
                    to={`/officer/complaints/${item.id}`}
                    className="table-action-btn"
                    title="Review Complaint"
                  >
                    Review <ExternalLink size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Responsive Cards View */}
      <div className="mobile-table-cards">
        {complaints.map((item) => (
          <div
            key={item.id}
            className="mobile-complaint-card"
            onClick={() => navigate(`/officer/complaints/${item.id}`)}
          >
            <div className="mobile-card-header">
              <span className="ref-id font-number">{item.id}</span>
              <PriorityBadge priority={item.priority} />
            </div>
            <h4 className="mobile-card-title">{item.title}</h4>
            <div className="mobile-card-meta">
              <span>{item.category}</span> • <span>{item.area}</span> • <span>{formatDate(item.createdAt)}</span>
            </div>
            <div className="mobile-card-footer">
              <StatusBadge status={item.status} />
              <div className="cell-upvote">
                <ArrowUp size={13} />
                <span className="font-number">{item.upvotes} upvotes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
