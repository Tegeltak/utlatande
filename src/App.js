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
              setView('cats');
              setSidebarOpen(false);
            }}
            className={`nav-button ${view === 'cats' ? 'nav-button-active' : ''}`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>CATS</span>
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
        {view === 'assessment' ? <AssessmentView /> : view === 'cats' ? <CatsView /> : <SettingsView />}
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

const CatsView = () => {
  const { catsResponses, setCatsResponses, catsTraumaResponses, setCatsTraumaResponses } = useAssessment();
  const [copied, setCopied] = React.useState(false);

  const symptomQuestions = [
    { id: 1, text: "Upprorande tankar eller minnen av det som hände dyker upp i mitt huvud." },
    { id: 2, text: "Otäcka drömmar som påminner mig om det som hände." },
    { id: 3, text: "Får bilder i huvudet av det som hände, och det känns som om det händer igen just nu." },
    { id: 4, text: "Känner mig väldigt upprörd vid påminnelser om det som hände." },
    { id: 5, text: "Starka reaktioner i kroppen när jag påminns om det som hände (svettigt, hjärtat slår snabbt, orolig mage)." },
    { id: 6, text: "Försöker att inte tänka på eller ha känslor om det som hände." },
    { id: 7, text: "Försöker att undvika allt som påminner mig om det som hände (människor, platser, saker, situationer, samtal)." },
    { id: 8, text: "Kan inte minnas delar av det som hände." },
    { id: 9, text: "Har negativa tankar som:", subQuestions: [
        { id: '9a', text: "Jag kommer inte få ett bra liv." },
        { id: '9b', text: "Jag kan inte lita på andra." },
        { id: '9c', text: "Världen är farlig." },
        { id: '9d', text: "Jag duger inte." }
      ]
    },
    { id: 10, text: "Skuld för det som hände:", subQuestions: [
        { id: '10a', text: "Lägger skulden på mig själv för det som hände." },
        { id: '10b', text: "Lägger skulden på andra för det som hände även om det inte var deras fel." }
      ]
    },
    { id: 11, text: "Har upprörda känslor (rädsla, ilska, skuld, skam) en stor del av tiden." },
    { id: 12, text: "Vill inte göra saker som jag gjorde tidigare." },
    { id: 13, text: "Känner mig inte nära andra." },
    { id: 14, text: "Kan inte ha positiva känslor, t ex glädje eller kärlek." },
    { id: 15, text: "Hanterar starka känslor:", subQuestions: [
        { id: '15a', text: "Jag har väldigt svårt att lugna ner mig när jag är upprörd." },
        { id: '15b', text: "Känner mig väldigt stressad även om det inte går så ut över andra." }
      ]
    },
    { id: 16, text: "Gör farliga saker." },
    { id: 17, text: "Är överdriven försiktig (t ex ser mig omkring för att se vem som är bakom mig)." },
    { id: 18, text: "Är lättskrämd." },
    { id: 19, text: "Problem att koncentrera mig." },
    { id: 20, text: "Svårt att somna eller att sova hela natten." }
  ];

  const traumaQuestions = [
    { id: 't1', text: "Allvarlig naturkatastrof som översvämning, tromb, orkan, jordbävning eller brand." },
    { id: 't2', text: "Allvarlig olycka eller skada såsom en bil- eller cykelolycka, hundbett eller idrottsskada." },
    { id: 't3', text: "Hotad, slagen eller allvarligt skadad av någon i min familj." },
    { id: 't4', text: "Hotad, slagen eller allvarligt skadad i skolan eller samhället." },
    { id: 't5', text: "Attackerad, knivhuggen, beskjuten eller rånad genom hot." },
    { id: 't6', text: "Sett någon i min familj bli hotad, slagen eller allvarligt skadad." },
    { id: 't7', text: "Sett någon i skolan eller samhället bli hotad, slagen eller allvarligt skadad." },
    { id: 't8', text: "Någon har utfört sexuella handlingar mot mig eller fått mig att utföra sexuella handlingar när jag inte kunde säga nej, eller var pressad eller tvingad." },
    { id: 't9', text: "Någon har online eller på sociala medier frågat eller pressat mig att göra sexuella handlingar, som att ta eller skicka bilder." },
    { id: 't10', text: "Någon har mobbat mig i verkliga livet, sagt mycket elaka saker som skrämmer mig." },
    { id: 't11', text: "Någon har mobbat mig online, sagt mycket elaka saker som skrämmer mig." },
    { id: 't12', text: "Någon som har stått mig nära har dött plötsligt eller våldsamt." },
    { id: 't13', text: "Stressande eller skrämmande medicinsk undersökning eller ingrepp." },
    { id: 't14', text: "Varit med om krig." },
    { id: 't15', text: "Annan stressande eller skrämmande händelse?" }
  ];

  const functionalImpairmentQuestions = [
    { id: 'f1', romanNumeral: 'I', text: "Komma överens med andra" },
    { id: 'f2', romanNumeral: 'II', text: "Fritidsintressen/ha kul" },
    { id: 'f3', romanNumeral: 'III', text: "Skola eller arbete" },
    { id: 'f4', romanNumeral: 'IV', text: "Familjerelationer" },
    { id: 'f5', romanNumeral: 'V', text: "Glädje" }
  ];

  const handleResponseChange = (questionId, value) => {
    setCatsResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleTraumaChange = (questionId, value) => {
    setCatsTraumaResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScores = () => {
    // DIMENSIONAL SCORING (Page 3 of instructions)
    
    // DSM-5 PTSD: Sum ALL questions 1-20 (including subquestions)
    const dsm5Total = Object.values(catsResponses).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);

    // ICD-11 PTSD: Sum questions 2, 3, 6, 7, 17, 18
    const icd11Questions = [2, 3, 6, 7, 17, 18];
    const icd11Total = icd11Questions.reduce((sum, id) => sum + (catsResponses[id] || 0), 0);

    // ICD-11 CPTSD: Sum questions 2, 3, 6, 7, 9b, 9d, 10a, 13, 14, 15a, 17, 18
    const cptsdQuestions = [2, 3, 6, 7, '9b', '9d', '10a', 13, 14, '15a', 17, 18];
    const cptsdTotal = cptsdQuestions.reduce((sum, id) => sum + (catsResponses[id] || 0), 0);

    // CATEGORICAL SCORING (Page 4 of instructions)
    // Special rules for Q9-10 and Q15: Only count ONE subquestion if rated 2 or 3
    
    // Helper function to count Q9 subquestions (only if rated 2+)
    const countQ9 = () => {
      const q9Subs = ['9a', '9b', '9c', '9d'].filter(id => (catsResponses[id] || 0) >= 2);
      return q9Subs.length > 0 ? 1 : 0;
    };
    
    // Helper function to count Q10 subquestions (only if rated 2+)
    const countQ10 = () => {
      const q10Subs = ['10a', '10b'].filter(id => (catsResponses[id] || 0) >= 2);
      return q10Subs.length > 0 ? 1 : 0;
    };
    
    // Helper function to count Q15 subquestions (only if rated 2+)
    const countQ15 = () => {
      const q15Subs = ['15a', '15b'].filter(id => (catsResponses[id] || 0) >= 2);
      return q15Subs.length > 0 ? 1 : 0;
    };

    // DSM-5 PTSD Criteria:
    // CRITICAL: Only count symptoms rated 2 or 3 (not 1+)
    // 1. Återupplevande (Q1-5): At least 1 symptom rated 2+
    const dsm5Q1to5 = [1, 2, 3, 4, 5];
    const dsm5ReexperiencingCount = dsm5Q1to5.filter(id => (catsResponses[id] || 0) >= 2).length;
    const dsm5ReexperiencingMet = dsm5ReexperiencingCount >= 1;
    
    // 2. Undvikande (Q6-7): At least 1 symptom rated 2+
    const dsm5Q6to7 = [6, 7];
    const dsm5AvoidanceCount = dsm5Q6to7.filter(id => (catsResponses[id] || 0) >= 2).length;
    const dsm5AvoidanceMet = dsm5AvoidanceCount >= 1;
    
    // 3. Negativa känslor och tankar (Q8-14): At least 2 symptoms rated 2+
    // Q8, 11, 12, 13, 14 count if rated 2+
    // Q9 and Q10 use special counting (only if subquestions rated 2+)
    const dsm5Q8to14Regular = [8, 11, 12, 13, 14].filter(id => (catsResponses[id] || 0) >= 2).length;
    const dsm5NegativeThoughtsCount = dsm5Q8to14Regular + countQ9() + countQ10();
    const dsm5NegativeThoughtsMet = dsm5NegativeThoughtsCount >= 2;
    
    // 4. Markant förändrade stimulusreaktioner (Q15-20): At least 2 symptoms rated 2+
    // Q16-20 count if rated 2+
    // Q15 uses special counting (only if subquestions rated 2+)
    const dsm5Q16to20 = [16, 17, 18, 19, 20].filter(id => (catsResponses[id] || 0) >= 2).length;
    const dsm5ArousalCount = dsm5Q16to20 + countQ15();
    const dsm5ArousalMet = dsm5ArousalCount >= 2;
    
    const dsm5MeetsCriteria = dsm5ReexperiencingMet && dsm5AvoidanceMet && 
                              dsm5NegativeThoughtsMet && dsm5ArousalMet;

    // ICD-11 PTSD Criteria:
    // CRITICAL: Only count symptoms rated 2 or 3 (not 1+)
    // 1. Återupplevande (Q2, 3): At least 1 symptom rated 2+
    const icd11Q2and3 = [2, 3];
    const icd11ReexperiencingCount = icd11Q2and3.filter(id => (catsResponses[id] || 0) >= 2).length;
    const icd11ReexperiencingMet = icd11ReexperiencingCount >= 1;
    
    // 2. Undvikande (Q6, 7): At least 1 symptom rated 2+
    const icd11Q6and7 = [6, 7];
    const icd11AvoidanceCount = icd11Q6and7.filter(id => (catsResponses[id] || 0) >= 2).length;
    const icd11AvoidanceMet = icd11AvoidanceCount >= 1;
    
    // 3. Överspändhet (Q17, 18): At least 1 symptom rated 2+
    const icd11Q17and18 = [17, 18];
    const icd11HyperarousalCount = icd11Q17and18.filter(id => (catsResponses[id] || 0) >= 2).length;
    const icd11HyperarousalMet = icd11HyperarousalCount >= 1;
    
    const icd11MeetsCriteria = icd11ReexperiencingMet && icd11AvoidanceMet && icd11HyperarousalMet;

    // ICD-11 CPTSD Criteria (only if ICD-11 PTSD criteria are met):
    // CRITICAL: Only count symptoms rated 2 or 3 (not 1+)
    // 1. Ihållande och allvarliga problem med känsloreglering (Q14, 15a): At least 1 rated 2+
    const cptsdEmotionRegCount = [14, '15a'].filter(id => (catsResponses[id] || 0) >= 2).length;
    const cptsdEmotionRegMet = cptsdEmotionRegCount >= 1;
    
    // 2. Ihållande och allvarligt negativ självbild (Q9d, 10a): At least 1 rated 2+
    const cptsdNegativeSelfCount = ['9d', '10a'].filter(id => (catsResponses[id] || 0) >= 2).length;
    const cptsdNegativeSelfMet = cptsdNegativeSelfCount >= 1;
    
    // 3. Ihållande och allvarliga interpersonella svårigheter (Q9b, 13): At least 1 rated 2+
    const cptsdInterpersonalCount = ['9b', 13].filter(id => (catsResponses[id] || 0) >= 2).length;
    const cptsdInterpersonalMet = cptsdInterpersonalCount >= 1;
    
    const cptsdMeetsCriteria = icd11MeetsCriteria && 
                               cptsdEmotionRegMet && 
                               cptsdNegativeSelfMet && 
                               cptsdInterpersonalMet;

    // Functional Impairment: Count "JA" responses from questions I-V (f1-f5)
    const functionalImpairmentIds = ['f1', 'f2', 'f3', 'f4', 'f5'];
    const functionalImpairmentCount = functionalImpairmentIds.filter(id => catsTraumaResponses[id] === 'ja').length;

    return {
      dsm5: {
        total: dsm5Total,
        meetsSymptoms: dsm5MeetsCriteria,
        criteriaDetails: {
          reexperiencing: { count: dsm5ReexperiencingCount, met: dsm5ReexperiencingMet, needed: 1 },
          avoidance: { count: dsm5AvoidanceCount, met: dsm5AvoidanceMet, needed: 1 },
          negativeThoughts: { count: dsm5NegativeThoughtsCount, met: dsm5NegativeThoughtsMet, needed: 2 },
          arousal: { count: dsm5ArousalCount, met: dsm5ArousalMet, needed: 2 },
          functionalImpairment: { count: functionalImpairmentCount }
        }
      },
      icd11: {
        total: icd11Total,
        meetsSymptoms: icd11MeetsCriteria,
        criteriaDetails: {
          reexperiencing: { count: icd11ReexperiencingCount, met: icd11ReexperiencingMet, needed: 1 },
          avoidance: { count: icd11AvoidanceCount, met: icd11AvoidanceMet, needed: 1 },
          hyperarousal: { count: icd11HyperarousalCount, met: icd11HyperarousalMet, needed: 1 },
          functionalImpairment: { count: functionalImpairmentCount }
        }
      },
      cptsd: {
        total: cptsdTotal,
        meetsSymptoms: cptsdMeetsCriteria,
        criteriaDetails: {
          ptsd: { met: icd11MeetsCriteria },
          emotionRegulation: { count: cptsdEmotionRegCount, met: cptsdEmotionRegMet, needed: 1 },
          negativeSelf: { count: cptsdNegativeSelfCount, met: cptsdNegativeSelfMet, needed: 1 },
          interpersonal: { count: cptsdInterpersonalCount, met: cptsdInterpersonalMet, needed: 1 },
          functionalImpairment: { count: functionalImpairmentCount }
        }
      }
    };
  };

  const getInterpretation = (score, type) => {
    if (type === 'dsm5') {
      if (score < 15) return { level: 'Normal', text: 'Inte kliniskt förhöjd.', color: '#d1fae5' };
      if (score <= 20) return { level: 'Måttligt traumarelaterad stress', text: 'Måttligt traumarelaterad stress.', color: '#fed7aa' };
      if (score >= 21) return { level: 'Förhöjd traumarelaterad stress', text: 'Förhöjd traumarelaterad stress. Screening över klinisk gräns.*', color: '#fca5a5' };
    } else if (type === 'icd11') {
      if (score < 5) return { level: 'Normal', text: 'Inte kliniskt förhöjd.', color: '#d1fae5' };
      if (score <= 6) return { level: 'Måttligt traumarelaterad stress', text: 'Måttligt traumarelaterad stress.*', color: '#fed7aa' };
      if (score >= 7) return { level: 'Förhöjd traumarelaterad stress', text: 'Förhöjd traumarelaterad stress. Screening över klinisk gräns.*', color: '#fca5a5' };
    } else if (type === 'cptsd') {
      if (score <= 9) return { level: 'Normal', text: 'Inte kliniskt förhöjd.*', color: '#d1fae5' };
      if (score <= 12) return { level: 'Måttligt traumarelaterad stress', text: 'Måttligt traumarelaterad stress.*', color: '#fed7aa' };
      if (score >= 13) return { level: 'Förhöjd traumarelaterad stress', text: 'Förhöjd traumarelaterad stress. Screening över klinisk gräns.*', color: '#fca5a5' };
    }
    return { level: '', text: '', color: '#f8fafc' };
  };

  const scores = calculateScores();
  const dsm5Interp = getInterpretation(scores.dsm5.total, 'dsm5');
  const icd11Interp = getInterpretation(scores.icd11.total, 'icd11');
  const cptsdInterp = getInterpretation(scores.cptsd.total, 'cptsd');

  const generateResultsText = () => {
    let text = "CATS-2 RESULTAT\n\n";
    
    text += "DIMENSIONELL POÄNGSÄTTNING:\n\n";
    text += `DSM-5 PTSD: ${scores.dsm5.total} poäng - ${dsm5Interp.text}\n`;
    text += `ICD-11 PTSD: ${scores.icd11.total} poäng - ${icd11Interp.text}\n`;
    text += `ICD-11 CPTSD: ${scores.cptsd.total} poäng - ${cptsdInterp.text}\n\n`;
    
    text += "KATEGORISK BEDÖMNING:\n\n";
    text += `DSM-5 PTSD: ${scores.dsm5.meetsSymptoms ? 'JA' : 'NEJ'} - Uppfyller kriterierna\n`;
    text += `ICD-11 PTSD: ${scores.icd11.meetsSymptoms ? 'JA' : 'NEJ'} - Uppfyller kriterierna\n`;
    text += `ICD-11 CPTSD: ${scores.cptsd.meetsSymptoms ? 'JA' : 'NEJ'} - Uppfyller kriterierna\n`;
    
    return text;
  };

  const handleCopy = () => {
    const text = generateResultsText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    if (window.confirm('Är du säker på att du vill rensa alla svar?')) {
      setCatsResponses({});
      setCatsTraumaResponses({});
    }
  };

  const hasAnyResponses = Object.keys(catsResponses).length > 0;

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2 className="header-title">CATS-2</h2>
          <p className="header-subtitle">Child and Adolescent Trauma Screen (7-17 år)</p>
        </div>
        {hasAnyResponses && (
          <button onClick={handleReset} className="reset-button">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Rensa alla svar</span>
          </button>
        )}
      </div>

      <div className="cats-container">
        <div className="cats-form">
          <div className="cats-section">
            <h3 className="cats-section-title">
              Många människor är med om skrämmande eller stressande händelser. Markera JA om det hänt dig. Markera NEJ om det inte har hänt dig.
            </h3>
            
            {traumaQuestions.map((q) => (
              <div key={q.id} className="cats-trauma-question">
                <div className="cats-question-text">
                  <span className="cats-trauma-number">{q.id.replace('t', '')}.</span>
                  <span>{q.text}</span>
                </div>
                <div className="cats-trauma-options">
                  <label className="cats-checkbox-label">
                    <input
                      type="radio"
                      name={q.id}
                      value="ja"
                      checked={catsTraumaResponses[q.id] === 'ja'}
                      onChange={() => handleTraumaChange(q.id, 'ja')}
                      className="cats-checkbox"
                    />
                    <span>JA</span>
                  </label>
                  <label className="cats-checkbox-label">
                    <input
                      type="radio"
                      name={q.id}
                      value="nej"
                      checked={catsTraumaResponses[q.id] === 'nej'}
                      onChange={() => handleTraumaChange(q.id, 'nej')}
                      className="cats-checkbox"
                    />
                    <span>NEJ</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="cats-section cats-functional-section">
            <h3 className="cats-section-title">
              Har problemen du markerat ovan påverkat något av följande?
            </h3>
            <p className="cats-functional-subtitle">Markera JA eller NEJ:</p>
            
            {functionalImpairmentQuestions.map((q) => (
              <div key={q.id} className="cats-functional-question">
                <div className="cats-question-text">
                  <span className="cats-functional-number">{q.romanNumeral}.</span>
                  <span>{q.text}</span>
                </div>
                <div className="cats-trauma-options">
                  <label className="cats-checkbox-label">
                    <input
                      type="radio"
                      name={q.id}
                      value="ja"
                      checked={catsTraumaResponses[q.id] === 'ja'}
                      onChange={() => handleTraumaChange(q.id, 'ja')}
                      className="cats-checkbox"
                    />
                    <span>JA</span>
                  </label>
                  <label className="cats-checkbox-label">
                    <input
                      type="radio"
                      name={q.id}
                      value="nej"
                      checked={catsTraumaResponses[q.id] === 'nej'}
                      onChange={() => handleTraumaChange(q.id, 'nej')}
                      className="cats-checkbox"
                    />
                    <span>NEJ</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="cats-section">
            <h3 className="cats-section-title">
              Markera 0, 1, 2 eller 3 för hur ofta du har haft följande tankar, känslor eller problem de senaste fyra veckorna
            </h3>
            <p className="cats-legend">0 = Aldrig / 1 = Ibland / 2 = Ofta / 3 = Nästan alltid</p>
            
            {symptomQuestions.map((q) => (
              <div key={q.id} className="cats-question">
                <div className="cats-question-text">
                  <span className="cats-question-number">{q.id}.</span>
                  <span>{q.text}</span>
                </div>
                <div className="cats-options">
                  {[0, 1, 2, 3].map(value => (
                    <label key={value} className="cats-radio-label">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={value}
                        checked={catsResponses[q.id] === value}
                        onChange={() => handleResponseChange(q.id, value)}
                        className="cats-radio"
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
                {q.subQuestions && (
                  <div className="cats-subquestions">
                    {q.subQuestions.map(sub => (
                      <div key={sub.id} className="cats-question">
                        <div className="cats-question-text cats-subquestion-text">
                          <span className="cats-question-number">{sub.id}.</span>
                          <span>{sub.text}</span>
                        </div>
                        <div className="cats-options">
                          {[0, 1, 2, 3].map(value => (
                            <label key={value} className="cats-radio-label">
                              <input
                                type="radio"
                                name={`q${sub.id}`}
                                value={value}
                                checked={catsResponses[sub.id] === value}
                                onChange={() => handleResponseChange(sub.id, value)}
                                className="cats-radio"
                              />
                              <span>{value}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {hasAnyResponses && (
          <div className="cats-results">
            <div className="cats-results-header">
              <h3 className="cats-results-title">Resultat</h3>
              <button onClick={handleCopy} className={`copy-button ${copied ? 'copy-button-copied' : ''}`}>
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
            </div>

            <div className="cats-results-content">
              <div className="cats-score-section">
                <h4 className="cats-score-title">Dimensionell poängsättning</h4>
                
                <div className="cats-score-card" style={{ backgroundColor: dsm5Interp.color }}>
                  <div className="cats-score-header">
                    <span className="cats-score-label">DSM-5 PTSD</span>
                    <span className="cats-score-value">{scores.dsm5.total} poäng</span>
                  </div>
                  <p className="cats-score-interpretation">{dsm5Interp.text}</p>
                </div>

                <div className="cats-score-card" style={{ backgroundColor: icd11Interp.color }}>
                  <div className="cats-score-header">
                    <span className="cats-score-label">ICD-11 PTSD</span>
                    <span className="cats-score-value">{scores.icd11.total} poäng</span>
                  </div>
                  <p className="cats-score-interpretation">{icd11Interp.text}</p>
                </div>

                <div className="cats-score-card" style={{ backgroundColor: cptsdInterp.color }}>
                  <div className="cats-score-header">
                    <span className="cats-score-label">ICD-11 CPTSD</span>
                    <span className="cats-score-value">{scores.cptsd.total} poäng</span>
                  </div>
                  <p className="cats-score-interpretation">{cptsdInterp.text}</p>
                </div>
              </div>

              <div className="cats-criteria-section">
                <h4 className="cats-score-title">Kategorisk bedömning</h4>
                
                <div className="cats-criteria-card">
                  <div className="cats-criteria-row">
                    <span>DSM-5 PTSD kriterier:</span>
                    <span className={`cats-criteria-badge ${scores.dsm5.meetsSymptoms ? 'criteria-yes' : 'criteria-no'}`}>
                      {scores.dsm5.meetsSymptoms ? 'JA' : 'NEJ'}
                    </span>
                  </div>
                  <div className="cats-criteria-row">
                    <span>ICD-11 PTSD kriterier:</span>
                    <span className={`cats-criteria-badge ${scores.icd11.meetsSymptoms ? 'criteria-yes' : 'criteria-no'}`}>
                      {scores.icd11.meetsSymptoms ? 'JA' : 'NEJ'}
                    </span>
                  </div>
                  <div className="cats-criteria-row">
                    <span>ICD-11 CPTSD kriterier:</span>
                    <span className={`cats-criteria-badge ${scores.cptsd.meetsSymptoms ? 'criteria-yes' : 'criteria-no'}`}>
                      {scores.cptsd.meetsSymptoms ? 'JA' : 'NEJ'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="cats-debug-section">
                <h4 className="cats-score-title">Detaljerad kriterieanalys</h4>
                
                <div className="cats-debug-card">
                  <h5 className="cats-debug-subtitle">DSM-5 PTSD</h5>
                  <div className="cats-debug-item">
                    <span>Återupplevande (Fråga 1-5):</span>
                    <span className={scores.dsm5.criteriaDetails.reexperiencing.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.dsm5.criteriaDetails.reexperiencing.count}/{scores.dsm5.criteriaDetails.reexperiencing.needed}+ {scores.dsm5.criteriaDetails.reexperiencing.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Undvikande (Fråga 6-7):</span>
                    <span className={scores.dsm5.criteriaDetails.avoidance.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.dsm5.criteriaDetails.avoidance.count}/{scores.dsm5.criteriaDetails.avoidance.needed}+ {scores.dsm5.criteriaDetails.avoidance.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Negativa känslor och tankar (Fråga 8-14):</span>
                    <span className={scores.dsm5.criteriaDetails.negativeThoughts.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.dsm5.criteriaDetails.negativeThoughts.count}/{scores.dsm5.criteriaDetails.negativeThoughts.needed}+ {scores.dsm5.criteriaDetails.negativeThoughts.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Markant förändrade stimulusreaktioner (Fråga 15-20):</span>
                    <span className={scores.dsm5.criteriaDetails.arousal.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.dsm5.criteriaDetails.arousal.count}/{scores.dsm5.criteriaDetails.arousal.needed}+ {scores.dsm5.criteriaDetails.arousal.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Funktionsnedsättning (Fråga I-V):</span>
                    <span className="debug-info">
                      {scores.dsm5.criteriaDetails.functionalImpairment.count} av 5 besvarade med "ja"
                    </span>
                  </div>
                  <div className="cats-debug-summary">
                    <strong>Sannolik DSM-5 PTSD diagnos*:</strong>
                    <strong className={scores.dsm5.meetsSymptoms ? 'debug-met' : 'debug-not-met'}>
                      {scores.dsm5.meetsSymptoms ? 'JA' : 'NEJ'}
                    </strong>
                  </div>
                </div>

                <div className="cats-debug-card">
                  <h5 className="cats-debug-subtitle">ICD-11 PTSD och CPTSD</h5>
                  <div className="cats-debug-item">
                    <span>Återupplevande (Fråga 2, 3):</span>
                    <span className={scores.icd11.criteriaDetails.reexperiencing.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.icd11.criteriaDetails.reexperiencing.count}/{scores.icd11.criteriaDetails.reexperiencing.needed}+ {scores.icd11.criteriaDetails.reexperiencing.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Undvikande (Fråga 6, 7):</span>
                    <span className={scores.icd11.criteriaDetails.avoidance.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.icd11.criteriaDetails.avoidance.count}/{scores.icd11.criteriaDetails.avoidance.needed}+ {scores.icd11.criteriaDetails.avoidance.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Överspändhet (Fråga 17, 18):</span>
                    <span className={scores.icd11.criteriaDetails.hyperarousal.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.icd11.criteriaDetails.hyperarousal.count}/{scores.icd11.criteriaDetails.hyperarousal.needed}+ {scores.icd11.criteriaDetails.hyperarousal.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-summary">
                    <strong>Sannolik ICD-11 PTSD diagnos*:</strong>
                    <strong className={scores.icd11.meetsSymptoms ? 'debug-met' : 'debug-not-met'}>
                      {scores.icd11.meetsSymptoms ? 'JA' : 'NEJ'}
                    </strong>
                  </div>
                  
                  <div className="cats-debug-divider"></div>
                  
                  <div className="cats-debug-item">
                    <span>Funktionsnedsättning (Fråga I-V):</span>
                    <span className="debug-info">
                      {scores.icd11.criteriaDetails.functionalImpairment.count} av 5 besvarade med "ja"
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Ihållande och allvarliga problem med känsloreglering (Fråga 14, 15a):</span>
                    <span className={scores.cptsd.criteriaDetails.emotionRegulation.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.cptsd.criteriaDetails.emotionRegulation.count}/{scores.cptsd.criteriaDetails.emotionRegulation.needed}+ {scores.cptsd.criteriaDetails.emotionRegulation.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Ihållande och allvarligt negativ självbild (Fråga 9d, 10a):</span>
                    <span className={scores.cptsd.criteriaDetails.negativeSelf.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.cptsd.criteriaDetails.negativeSelf.count}/{scores.cptsd.criteriaDetails.negativeSelf.needed}+ {scores.cptsd.criteriaDetails.negativeSelf.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-item">
                    <span>Ihållande och allvarliga interpersonella svårigheter (Fråga 9b, 13):</span>
                    <span className={scores.cptsd.criteriaDetails.interpersonal.met ? 'debug-met' : 'debug-not-met'}>
                      {scores.cptsd.criteriaDetails.interpersonal.count}/{scores.cptsd.criteriaDetails.interpersonal.needed}+ {scores.cptsd.criteriaDetails.interpersonal.met ? '✓' : '✗'}
                    </span>
                  </div>
                  <div className="cats-debug-summary">
                    <strong>Sannolik ICD-11 CPTSD diagnos*:</strong>
                    <strong className={scores.cptsd.meetsSymptoms ? 'debug-met' : 'debug-not-met'}>
                      {scores.cptsd.meetsSymptoms ? 'JA' : 'NEJ'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
