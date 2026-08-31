import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, HeartHandshake, ShieldCheck } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Textarea } from '../components/common/Textarea';
import { Button } from '../components/common/Button';
import { useToast } from '../hooks/useToast';
import './ContactPage.css';

export const ContactPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please complete all required contact form fields.", "warning");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Thank you! Your message has been sent to Balochistan Civic Operations team.", "success");
      setFormData({ name: '', email: '', phone: '', category: 'General Inquiry', message: '' });
    }, 600);
  };

  return (
    <div className="contact-page container">
      {/* Header */}
      <div className="contact-header animate-fade-in">
        <div className="contact-badge">
          <MessageSquare size={16} />
          <span>CIVIC HELPLINE & SUPPORT</span>
        </div>
        <h1 className="contact-title">Contact Public Support & Operations</h1>
        <p className="contact-subtitle">
          Have questions about the portal, need official assistance, or want to reach municipal administrators in Balochistan? We are here to help.
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Form */}
        <div className="contact-form-card card animate-fade-in">
          <h3 className="form-card-title">Send a Direct Message</h3>
          <p className="form-card-subtitle">Fill out the inquiry form below and our team will respond within 24 hours.</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <Input
              label="Full Name"
              placeholder="e.g. Ahmed Hassan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <div className="contact-row-2">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label="Phone Number (Optional)"
                placeholder="e.g. 0300-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <Select
              label="Inquiry Topic"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: 'General Inquiry', label: 'General Inquiry' },
                { value: 'Technical Support', label: 'Portal Technical Support' },
                { value: 'Officer Operations', label: 'Municipal Officer Operations' },
                { value: 'Saylani Partnership', label: 'Saylani Tech Partnership' }
              ]}
            />

            <Textarea
              label="Message"
              placeholder="How can we assist you?"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />

            <Button type="submit" variant="primary" size="lg" icon={Send} isLoading={loading}>
              Send Inquiry
            </Button>
          </form>
        </div>

        {/* Contact Info Sidebar */}
        <div className="contact-info-column animate-fade-in">
          {/* Official Emergency & Operations Box */}
          <div className="contact-info-card card">
            <h4 className="info-card-header">
              <ShieldCheck size={20} className="text-primary" />
              Government Operations Office
            </h4>
            <div className="info-details-list">
              <div className="info-item">
                <MapPin size={20} className="info-icon text-primary" />
                <div>
                  <strong className="info-label">Address</strong>
                  <p className="info-value">Capital Operations Center, Municipal Complex, Quetta, Balochistan, Pakistan</p>
                </div>
              </div>

              <div className="info-item">
                <Phone size={20} className="info-icon text-primary" />
                <div>
                  <strong className="info-label">24/7 Civic Helpline</strong>
                  <p className="info-value font-number">+92 (81) 111-248-422</p>
                </div>
              </div>

              <div className="info-item">
                <Mail size={20} className="info-icon text-primary" />
                <div>
                  <strong className="info-label">Email Support</strong>
                  <p className="info-value">support@balochistan.gov.pk</p>
                </div>
              </div>

              <div className="info-item">
                <Clock size={20} className="info-icon text-primary" />
                <div>
                  <strong className="info-label">Office Hours</strong>
                  <p className="info-value">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Saylani Tech Partnership Box */}
          <div className="contact-info-card card saylani-contact-box">
            <h4 className="info-card-header">
              <HeartHandshake size={20} className="text-primary" />
              Saylani Welfare Tech Desk
            </h4>
            <p className="saylani-contact-text">
              For queries regarding Saylani Mass IT Training (SMIT) civic technology initiatives or tech partnership opportunities:
            </p>
            <div className="saylani-email-tag">
              <Mail size={16} /> smit.civic@saylaniwelfare.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
