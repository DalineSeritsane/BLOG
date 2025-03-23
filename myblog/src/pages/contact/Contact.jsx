
import React, { useState } from 'react';
import './contact.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send formData to a backend service or API
    console.log('Form submitted:', formData);
    setFormStatus('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', message: '' }); // Reset form fields
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have a question, feedback, or a story to share, feel free to reach out.
        </p>
      </header>

      <section className="contact-form-section">
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-button">Send Message</button>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
      </section>

      <section className="social-media-section">
        <h2>Follow Us</h2>
        <p>Stay connected and get the latest travel tips and updates:</p>
        <div className="social-media-links">
          <a href="https://instagram.com/wanderlusttrails" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com/wanderlusttrails" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/wanderlusttrails" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
