import React from 'react';
import { AssessmentProvider, useAssessment } from './AssessmentContext';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-card">
            <h2 className="error-title">Något gick fel</h2>
            <p className="error-message">
              Applikationen stötte på ett fel. Försök rensa webbläsarens localStorage och uppdatera:
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="error-button"
            >
              Rensa data & ladda om
            </button>
            <details className="error-details">
              <summary>Feldetaljer</summary>
              <pre>{this.state.error?.toString()}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <AssessmentProvider>
        <AppContent />
      </AssessmentProvider>
    </ErrorBoundary>
  );
};

const AppContent = () => {
  const { view, setView } = useAssessment();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="app-container">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">Utlåtande</h1>
          <p className="sidebar-subtitle">Neuropsykiatrisk bedömning</p>
        </div>
        
        <nav className="sidebar-nav">
          <button
            onClick={() => {
              setView('assessment');
              setSidebarOpen(false);
            }}
            className={`nav-button ${view === 'assessment' ? 'nav-button-active' : ''}`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Bedömning</span>
          </button>
          <button
            onClick={() => {
              setView('settings');
              setSidebarOpen(false);
            }}
            className={`nav-button ${view === 'settings' ? 'nav-button-active' : ''}`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Inställningar</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          © 2025 Kliniskt bedömningsverktyg
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mobile-menu-button"
        >
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {view === 'assessment' ? <AssessmentView /> : <SettingsView />}
      </main>
    </div>
  );
};

const AssessmentView = () => {
  const {
    symptomCategories,
    selectedSymptoms,
    toggleSymptom,
    getFilteredRecommendations,
    getDiagnosisText,
    clearSelectedSymptoms,
    patientAge,
    setPatientAge,
    patientSex,
    setPatientSex,
    selectedDiagnosis,
    setSelectedDiagnosis,
  } = useAssessment();

  const [copied, setCopied] = React.useState(false);
  const recommendations = getFilteredRecommendations();
  const diagnosisText = getDiagnosisText();

  const handleCopyRecommendations = () => {
    let textParts = [];
    
    // Add diagnosis text if it exists
    if (diagnosisText) {
      textParts.push(diagnosisText);
    }
    
    // Add recommendations if they exist
    if (recommendations.length > 0) {
      const recsText = recommendations.map(rec => `- ${rec.text}`).join('\n');
      textParts.push(recsText);
    }
    
    const text = textParts.join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const ageGroups = [
    { value: 'child', label: 'Barn' },
    { value: 'teen', label: 'Tonåring' }
  ];

  const sexOptions = [
    { value: 'male', label: 'Pojke' },
    { value: 'female', label: 'Flicka' },
    { value: 'nonbinary', label: 'Icke-binär' }
  ];

  const diagnosisOptions = [
    { value: 'none', label: 'Ingen diagnos' },
    { value: 'adhd', label: 'ADHD' },
    { value: 'autism', label: 'Autism' },
    { value: 'both', label: 'ADHD och Autism' },
    { value: 'intellectual_disability', label: 'Intellektuell funktionsnedsättning' }
  ];

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header">
        <div className="header-content">
          <div>
            <h2 className="header-title">Bedömning</h2>
            <p className="header-subtitle">
              Konfigurera patientinformation och välj symtom
            </p>
          </div>
          <div className="header-actions">
            <div className="symptom-counter">
              <span className="symptom-count">{selectedSymptoms.length}</span>
              <span className="symptom-label">symtom valda</span>
            </div>
            <button
              onClick={clearSelectedSymptoms}
              disabled={selectedSymptoms.length === 0}
              className="clear-button"
            >
              Rensa
            </button>
          </div>
        </div>
      </div>

      {/* Patient Settings Bar */}
      <div className="settings-bar">
        <div className="settings-bar-content">
          <div className="setting-group">
            <label className="setting-label">Diagnos:</label>
            <select
              value={selectedDiagnosis}
              onChange={(e) => setSelectedDiagnosis(e.target.value)}
              className="setting-select"
            >
              {diagnosisOptions.map(diagnosis => (
                <option key={diagnosis.value} value={diagnosis.value}>{diagnosis.label}</option>
              ))}
            </select>
          </div>
          <div className="setting-group">
            <label className="setting-label">Åldersgrupp:</label>
            <select
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="setting-select"
            >
              {ageGroups.map(age => (
                <option key={age.value} value={age.value}>{age.label}</option>
              ))}
            </select>
          </div>
          <div className="setting-group">
            <label className="setting-label">Kön:</label>
            <select
              value={patientSex}
              onChange={(e) => setPatientSex(e.target.value)}
              className="setting-select"
            >
              {sexOptions.map(sex => (
                <option key={sex.value} value={sex.value}>{sex.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Split Panel Layout */}
      <div className="split-panel">
        {/* Left Panel - Symptoms */}
        <div className="symptoms-panel">
          <div className="symptoms-content">
            <h3 className="symptoms-title">Välj symtom</h3>
            <p className="symptoms-subtitle">Markera relevanta symtom från alla kategorier</p>
            
            {symptomCategories.map(category => (
              <div key={category.id} className="symptom-category">
                <h4 className="category-title">
                  <div className="category-indicator"></div>
                  {category.label}
                </h4>
                <div className="symptom-list">
                  {category.symptoms.map(symptom => (
                    <label
                      key={symptom.id}
                      className={`symptom-item ${
                        selectedSymptoms.includes(symptom.id) ? 'symptom-item-selected' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(symptom.id)}
                        onChange={() => toggleSymptom(symptom.id)}
                        className="symptom-checkbox"
                      />
                      <span className="symptom-label">{symptom.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Recommendations */}
        <div className="recommendations-panel">
          <div className="recommendations-content">
            <div className="recommendations-header">
              <h3 className="recommendations-title">Rekommendationer</h3>
              {(diagnosisText || recommendations.length > 0) && (
                <button
                  onClick={handleCopyRecommendations}
                  className={`copy-button ${copied ? 'copy-button-copied' : ''}`}
                >
                  {copied ? (
                    <>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Kopierat!</span>
                    </>
                  ) : (
                    <>
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Kopiera</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Autism Child Warning */}
            {selectedDiagnosis === 'autism' && patientAge === 'child' && (
              <div className="autism-child-warning">
                OBS: texten riktad mot barn som har som mest fyllt 4 år detta år!
              </div>
            )}

            {/* Diagnosis Text */}
            {diagnosisText && (
              <div className="diagnosis-text-container">
                <div className="diagnosis-text">
                  {diagnosisText}
                </div>
              </div>
            )}
            
            {selectedSymptoms.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p className="empty-text">Välj symtom för att se rekommendationer</p>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="recommendations-list">
                {recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <p className="recommendation-text">
                      <span className="recommendation-bullet">•</span>
                      {rec.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="warning-state">
                <div className="warning-content">
                  <span className="warning-icon">⚠️</span>
                  <div>
                    <p className="warning-title">
                      Inga matchande rekommendationer
                    </p>
                    <p className="warning-message">
                      Inga rekommendationer matchar nuvarande patientprofil ({patientAge === 'child' ? 'Barn' : 'Tonåring'}, {patientSex === 'male' ? 'Pojke' : patientSex === 'female' ? 'Flicka' : 'Icke-binär'}) och symtom. 
                      Prova andra symtom eller konfigurera rekommendationer i Inställningar.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView = () => {
  const {
    symptomCategories,
    recommendations,
    updateRecommendationText,
    updateRecommendationSymptoms,
  } = useAssessment();

  const [selectedProfile, setSelectedProfile] = React.useState('child_male');
  const [selectedCat, setSelectedCat] = React.useState('difficulties_concentrating');
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editText, setEditText] = React.useState('');

  const profiles = [
    { key: 'child_male', label: 'Barn - Pojke' },
    { key: 'child_female', label: 'Barn - Flicka' },
    { key: 'child_nonbinary', label: 'Barn - Icke-binär' },
    { key: 'teen_male', label: 'Tonåring - Pojke' },
    { key: 'teen_female', label: 'Tonåring - Flicka' },
    { key: 'teen_nonbinary', label: 'Tonåring - Icke-binär' }
  ];

  const currentRecommendations = recommendations[selectedProfile]?.[selectedCat] || [];
  const currentCategorySymptoms = symptomCategories.find(cat => cat.id === selectedCat)?.symptoms || [];

  const handleSaveEdit = (index) => {
    updateRecommendationText(selectedProfile, selectedCat, index, editText);
    setEditingIndex(null);
    setEditText('');
  };

  const handleChangeSymptom = (recIndex, symptomId) => {
    updateRecommendationSymptoms(selectedProfile, selectedCat, recIndex, [symptomId]);
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header">
        <h2 className="header-title">Inställningar</h2>
        <p className="header-subtitle">Redigera rekommendationer för varje patientprofil</p>
      </div>

      {/* Selection Bar */}
      <div className="settings-bar">
        <div className="settings-bar-content">
          <div className="setting-group">
            <label className="setting-label">Patientprofil:</label>
            <select
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="setting-select"
            >
              {profiles.map(profile => (
                <option key={profile.key} value={profile.key}>{profile.label}</option>
              ))}
            </select>
          </div>
          <div className="setting-group">
            <label className="setting-label">Kategori:</label>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="setting-select"
            >
              {symptomCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="settings-content">
        <div className="settings-inner">
          <div className="settings-list">
            {currentRecommendations.map((rec, index) => (
              <div key={index} className="setting-card">
                <div className="setting-card-content">
                  <div className="setting-text-container">
                    <div className="setting-text-area">
                      {editingIndex === index ? (
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="setting-textarea"
                          rows={3}
                        />
                      ) : (
                        <p className="setting-text">{rec.text}</p>
                      )}
                    </div>
                    <div className="setting-actions">
                      {editingIndex === index ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(index)}
                            className="save-button"
                          >
                            Spara
                          </button>
                          <button
                            onClick={() => {
                              setEditingIndex(null);
                              setEditText('');
                            }}
                            className="cancel-button"
                          >
                            Avbryt
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingIndex(index);
                            setEditText(rec.text);
                          }}
                          className="edit-button"
                        >
                          Redigera
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="symptom-link-section">
                  <p className="symptom-link-label">Kopplat symtom:</p>
                  <select
                    value={rec.linkedSymptoms[0] || ''}
                    onChange={(e) => handleChangeSymptom(index, e.target.value)}
                    className="symptom-link-select"
                  >
                    <option value="">Välj ett symtom</option>
                    {currentCategorySymptoms.map(symptom => (
                      <option key={symptom.id} value={symptom.id}>
                        {symptom.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
