import React, { createContext, useContext, useState, useEffect } from 'react';

const AssessmentContext = createContext();

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider = ({ children }) => {
  // Load data from localStorage on mount
  const loadData = () => {
    const saved = localStorage.getItem('assessmentData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Check if data has the new structure (linkedSymptoms in recommendations)
        if (data.recommendations && data.recommendations.length > 0) {
          const hasNewStructure = data.recommendations[0].linkedSymptoms !== undefined;
          if (hasNewStructure) {
            return data;
          }
        }
        // Old format detected, clear and use defaults
        localStorage.removeItem('assessmentData');
      } catch (e) {
        localStorage.removeItem('assessmentData');
      }
    }
    return {
      symptomCategories: [
        {
          id: "difficulties_concentrating",
          label: "Koncentrationssvårigheter",
          symptoms: [
            { id: "concentration_1", label: "1a" },
            { id: "concentration_2", label: "1b" },
            { id: "concentration_3", label: "1c" },
            { id: "concentration_4", label: "1d" },
            { id: "concentration_5", label: "1e" },
            { id: "concentration_6", label: "1f" },
            { id: "concentration_7", label: "1g" },
            { id: "concentration_8", label: "1h" },
            { id: "concentration_9", label: "1i" }
          ]
        },
        {
          id: "hyperactivity_impulsivity",
          label: "Hyperaktivitet",
          symptoms: [
            { id: "hyperactivity_1", label: "2a" },
            { id: "hyperactivity_2", label: "2b" },
            { id: "hyperactivity_3", label: "2c" },
            { id: "hyperactivity_4", label: "2d" },
            { id: "hyperactivity_5", label: "2e" },
            { id: "hyperactivity_6", label: "2f" },
            { id: "hyperactivity_7", label: "2g" },
            { id: "hyperactivity_8", label: "2h" },
            { id: "hyperactivity_9", label: "2i" }
          ]
        },
        {
          id: "socio_communicative",
          label: "Socio-kommunikativa svårigheter",
          symptoms: [
            { id: "social_communication_1", label: "A1" },
            { id: "social_communication_2", label: "A2" },
            { id: "social_communication_3", label: "A3" }
          ]
        },
        {
          id: "limited_repetitive",
          label: "Begränsade och repetitiva beteenden",
          symptoms: [
            { id: "repetitive_behaviour_1", label: "B1" },
            { id: "repetitive_behaviour_2", label: "B2" },
            { id: "repetitive_behaviour_3", label: "B3" },
            { id: "repetitive_behaviour_4", label: "B4" }
          ]
        }
      ],
      recommendations: {
        child_male: {
          difficulties_concentrating: [
            { text: "Placeholder recommendation for 1a.", linkedSymptoms: ["concentration_1"] },
            { text: "Placeholder recommendation for 1b.", linkedSymptoms: ["concentration_2"] },
            { text: "Placeholder recommendation for 1c.", linkedSymptoms: ["concentration_3"] },
            { text: "Placeholder recommendation for 1d.", linkedSymptoms: ["concentration_4"] },
            { text: "Placeholder recommendation for 1e.", linkedSymptoms: ["concentration_5"] },
            { text: "Placeholder recommendation for 1f.", linkedSymptoms: ["concentration_6"] },
            { text: "Placeholder recommendation for 1g.", linkedSymptoms: ["concentration_7"] },
            { text: "Placeholder recommendation for 1h.", linkedSymptoms: ["concentration_8"] },
            { text: "Placeholder recommendation for 1i.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Placeholder recommendation for 2a.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Placeholder recommendation for 2b.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Placeholder recommendation for 2c.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Placeholder recommendation for 2d.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Placeholder recommendation for 2e.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Placeholder recommendation for 2f.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Placeholder recommendation for 2g.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Placeholder recommendation for 2h.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Placeholder recommendation for 2i.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "Placeholder recommendation for A1.", linkedSymptoms: ["social_communication_1"] },
            { text: "Placeholder recommendation for A2.", linkedSymptoms: ["social_communication_2"] },
            { text: "Placeholder recommendation for A3.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "Placeholder recommendation for B1.", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "Placeholder recommendation for B2.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "Placeholder recommendation for B3.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "Placeholder recommendation for B4.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ]
        },
        child_female: {
          difficulties_concentrating: [
            { text: "Placeholder recommendation for 1a.", linkedSymptoms: ["concentration_1"] },
            { text: "Placeholder recommendation for 1b.", linkedSymptoms: ["concentration_2"] },
            { text: "Placeholder recommendation for 1c.", linkedSymptoms: ["concentration_3"] },
            { text: "Placeholder recommendation for 1d.", linkedSymptoms: ["concentration_4"] },
            { text: "Placeholder recommendation for 1e.", linkedSymptoms: ["concentration_5"] },
            { text: "Placeholder recommendation for 1f.", linkedSymptoms: ["concentration_6"] },
            { text: "Placeholder recommendation for 1g.", linkedSymptoms: ["concentration_7"] },
            { text: "Placeholder recommendation for 1h.", linkedSymptoms: ["concentration_8"] },
            { text: "Placeholder recommendation for 1i.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Placeholder recommendation for 2a.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Placeholder recommendation for 2b.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Placeholder recommendation for 2c.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Placeholder recommendation for 2d.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Placeholder recommendation for 2e.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Placeholder recommendation for 2f.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Placeholder recommendation for 2g.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Placeholder recommendation for 2h.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Placeholder recommendation for 2i.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "Placeholder recommendation for A1.", linkedSymptoms: ["social_communication_1"] },
            { text: "Placeholder recommendation for A2.", linkedSymptoms: ["social_communication_2"] },
            { text: "Placeholder recommendation for A3.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "Placeholder recommendation for B1.", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "Placeholder recommendation for B2.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "Placeholder recommendation for B3.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "Placeholder recommendation for B4.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ]
        },
        teen_male: {
          difficulties_concentrating: [
            { text: "Placeholder recommendation for 1a.", linkedSymptoms: ["concentration_1"] },
            { text: "Placeholder recommendation for 1b.", linkedSymptoms: ["concentration_2"] },
            { text: "Placeholder recommendation for 1c.", linkedSymptoms: ["concentration_3"] },
            { text: "Placeholder recommendation for 1d.", linkedSymptoms: ["concentration_4"] },
            { text: "Placeholder recommendation for 1e.", linkedSymptoms: ["concentration_5"] },
            { text: "Placeholder recommendation for 1f.", linkedSymptoms: ["concentration_6"] },
            { text: "Placeholder recommendation for 1g.", linkedSymptoms: ["concentration_7"] },
            { text: "Placeholder recommendation for 1h.", linkedSymptoms: ["concentration_8"] },
            { text: "Placeholder recommendation for 1i.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Placeholder recommendation for 2a.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Placeholder recommendation for 2b.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Placeholder recommendation for 2c.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Placeholder recommendation for 2d.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Placeholder recommendation for 2e.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Placeholder recommendation for 2f.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Placeholder recommendation for 2g.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Placeholder recommendation for 2h.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Placeholder recommendation for 2i.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "Placeholder recommendation for A1.", linkedSymptoms: ["social_communication_1"] },
            { text: "Placeholder recommendation for A2.", linkedSymptoms: ["social_communication_2"] },
            { text: "Placeholder recommendation for A3.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "Placeholder recommendation for B1.", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "Placeholder recommendation for B2.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "Placeholder recommendation for B3.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "Placeholder recommendation for B4.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ]
        },
        teen_female: {
          difficulties_concentrating: [
            { text: "Placeholder recommendation for 1a.", linkedSymptoms: ["concentration_1"] },
            { text: "Placeholder recommendation for 1b.", linkedSymptoms: ["concentration_2"] },
            { text: "Placeholder recommendation for 1c.", linkedSymptoms: ["concentration_3"] },
            { text: "Placeholder recommendation for 1d.", linkedSymptoms: ["concentration_4"] },
            { text: "Placeholder recommendation for 1e.", linkedSymptoms: ["concentration_5"] },
            { text: "Placeholder recommendation for 1f.", linkedSymptoms: ["concentration_6"] },
            { text: "Placeholder recommendation for 1g.", linkedSymptoms: ["concentration_7"] },
            { text: "Placeholder recommendation for 1h.", linkedSymptoms: ["concentration_8"] },
            { text: "Placeholder recommendation for 1i.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Placeholder recommendation for 2a.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Placeholder recommendation for 2b.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Placeholder recommendation for 2c.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Placeholder recommendation for 2d.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Placeholder recommendation for 2e.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Placeholder recommendation for 2f.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Placeholder recommendation for 2g.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Placeholder recommendation for 2h.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Placeholder recommendation for 2i.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "Placeholder recommendation for A1.", linkedSymptoms: ["social_communication_1"] },
            { text: "Placeholder recommendation for A2.", linkedSymptoms: ["social_communication_2"] },
            { text: "Placeholder recommendation for A3.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "Placeholder recommendation for B1.", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "Placeholder recommendation for B2.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "Placeholder recommendation for B3.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "Placeholder recommendation for B4.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ]
        }
      }
    };
  };

  const [data, setData] = useState(loadData);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [patientAge, setPatientAge] = useState('child');
  const [patientSex, setPatientSex] = useState('male');
  const [view, setView] = useState('assessment'); // 'assessment' or 'settings'

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('assessmentData', JSON.stringify(data));
  }, [data]);

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const getFilteredRecommendations = () => {
    // Build patient profile key: child_male, child_female, teen_male, teen_female
    const profileKey = `${patientAge}_${patientSex}`;
    
    // Get all recommendations from all categories for this profile
    const difficultiesConcentratingRecs = data.recommendations[profileKey]?.difficulties_concentrating || [];
    const hyperactivityImpulsivityRecs = data.recommendations[profileKey]?.hyperactivity_impulsivity || [];
    const socioCommunicativeRecs = data.recommendations[profileKey]?.socio_communicative || [];
    const limitedRepetitiveRecs = data.recommendations[profileKey]?.limited_repetitive || [];
    const allRecommendations = [...difficultiesConcentratingRecs, ...hyperactivityImpulsivityRecs, ...socioCommunicativeRecs, ...limitedRepetitiveRecs];
    
    // Filter by selected symptoms
    if (selectedSymptoms.length === 0) {
      return allRecommendations;
    }
    
    return allRecommendations.filter(rec => {
      // Check if at least one symptom matches
      return rec.linkedSymptoms.some(symptomId => 
        selectedSymptoms.includes(symptomId)
      );
    });
  };

  const clearSelectedSymptoms = () => {
    setSelectedSymptoms([]);
  };

  const updateRecommendationText = (profileKey, category, index, newText) => {
    setData(prev => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        [profileKey]: {
          ...prev.recommendations[profileKey],
          [category]: prev.recommendations[profileKey][category].map((rec, i) =>
            i === index ? { ...rec, text: newText } : rec
          )
        }
      }
    }));
  };

  const updateRecommendationSymptoms = (profileKey, category, index, linkedSymptoms) => {
    setData(prev => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        [profileKey]: {
          ...prev.recommendations[profileKey],
          [category]: prev.recommendations[profileKey][category].map((rec, i) =>
            i === index ? { ...rec, linkedSymptoms } : rec
          )
        }
      }
    }));
  };

  const value = {
    symptomCategories: data.symptomCategories,
    recommendations: data.recommendations,
    selectedSymptoms,
    patientAge,
    setPatientAge,
    patientSex,
    setPatientSex,
    view,
    setView,
    toggleSymptom,
    getFilteredRecommendations,
    clearSelectedSymptoms,
    updateRecommendationText,
    updateRecommendationSymptoms,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};
