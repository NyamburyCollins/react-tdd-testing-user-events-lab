import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: {
      technology: false,
      design: false,
      business: false
    }
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [name]: checked
      }
    }));
  };

  const getSelectedInterests = () => {
    return Object.entries(formData.interests)
      .filter(([_, value]) => value)
      .map(([key]) => key);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    const selectedInterests = getSelectedInterests();
    return (
      <div className="App">
        {/* Your existing portfolio content */}
        
        <section aria-label="Submission confirmation">
          <h2>Thank You, {formData.name}!</h2>
          <p>We've received your submission with email: {formData.email}</p>
          {selectedInterests.length > 0 && (
            <>
              <p>Your selected interests:</p>
              <ul>
                {selectedInterests.map(interest => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Your existing portfolio content */}
      
      <section aria-label="Newsletter signup">
        <h2>Stay Updated</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <fieldset>
            <legend>Interests</legend>
            <label>
              <input
                type="checkbox"
                name="technology"
                checked={formData.interests.technology}
                onChange={handleCheckboxChange}
              />
              Technology
            </label>
            
            <label>
              <input
                type="checkbox"
                name="design"
                checked={formData.interests.design}
                onChange={handleCheckboxChange}
              />
              Design
            </label>
            
            <label>
              <input
                type="checkbox"
                name="business"
                checked={formData.interests.business}
                onChange={handleCheckboxChange}
              />
              Business
            </label>
          </fieldset>
          
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default App;