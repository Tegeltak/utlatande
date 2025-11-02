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
            { text: "Tydliga genomgångar och kontrollsteg minskar slarvfel.", linkedSymptoms: ["concentration_1"] },
            { text: "Han behöver kortare arbetsmoment och tydliga delmål för att bibehålla fokus.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid instruktioner är det hjälpsamt att söka ögonkontakt och låta honom upprepa vad som sagts.", linkedSymptoms: ["concentration_3"] },
            { text: "Han behöver stöd i att planera och avsluta uppgifter innan nya påbörjas.", linkedSymptoms: ["concentration_4"] },
            { text: "Visuella scheman och checklistor underlättar organisering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i små, hanterbara steg med regelbunden återkoppling.", linkedSymptoms: ["concentration_6"] },
            { text: "Han behöver hjälp att hålla ordning på material och aktiviteter för att dämpa rastlöshet.", linkedSymptoms: ["concentration_7"] },
            { text: "Lugn arbetsmiljö och minskade distraktioner främjar koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Påminnelser och dagliga rutiner hjälper honom att komma ihåg aktiviteter.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Han gynnas av möjlighet till rörelsepauser och varierade sittställningar.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Förtydsgärne i om pauser minskar oro vid längre lektioner.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Han behöver tillråten till fysisk aktivitet under dagen för att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Det är hjälpsamt att förbereda honom på lugna aktiviteter och tydligare förväntningar.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Han gynnas av möjlighet till korta avbrott och tydliga övergångar mellan.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Tydliga regler för samtal och ljudnivå gör det lättare att anpassa sig.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Han kan behöva påminnelser om att vänta tills andra pratat färdigt.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Träning i väntan och turtagning bör ske i trygga miljöer.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Social handledning kan stärka förmågan att läsa av när det passar att ta ordet.", linkedSymptoms: ["hyperactivity_9"] }
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
            { text: "Tydliga genomgångar och kontrollsteg minskar slarvfel.", linkedSymptoms: ["concentration_1"] },
            { text: "Hon behöver kortare arbetsmoment och tydliga delmål för att bibehålla fokus.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid instruktioner är det hjälpsamt att söka ögonkontakt och låta henne upprepa vad som sagts.", linkedSymptoms: ["concentration_3"] },
            { text: "Hon behöver stöd i att planera och avsluta uppgifter innan nya påbörjas.", linkedSymptoms: ["concentration_4"] },
            { text: "Visuella scheman och checklistor underlättar organisering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i små, hanterbara steg med regelbunden återkoppling.", linkedSymptoms: ["concentration_6"] },
            { text: "Hon behöver hjälp att hålla ordning på material och aktiviteter för att dämpa rastlöshet.", linkedSymptoms: ["concentration_7"] },
            { text: "Lugn arbetsmiljö och minskade distraktioner främjar koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Påminnelser och dagliga rutiner hjälper henne att komma ihåg aktiviteter.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Hon gynnas av möjlighet till rörelsepauser och varierade sittställningar.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Förtydsgärne i om pauser minskar oro vid längre lektioner.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Hon behöver tillråten till fysisk aktivitet under dagen för att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Det är hjälpsamt att förbereda henne på lugna aktiviteter och tydligare förväntningar.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Hon gynnas av möjlighet till korta avbrott och tydliga övergångar mellan.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Tydliga regler för samtal och ljudnivå gör det lättare att anpassa sig.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Hon kan behöva påminnelser om att vänta tills andra pratat färdigt.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Träning i väntan och turtagning bör ske i trygga miljöer.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Social handledning kan stärka förmågan att läsa av när det passar att ta ordet.", linkedSymptoms: ["hyperactivity_9"] }
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
            { text: "Tid för genomgång och självkontroll minskar slarvfel i uppgifter.", linkedSymptoms: ["concentration_1"] },
            { text: "Han behöver planeringsstöd och struktur för att kunna hålla fokus under längre pass.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid samtal och instruktioner är direkt och tydlig kommunikation mest effektivt.", linkedSymptoms: ["concentration_3"] },
            { text: "Han gynnas av stöd i att slutföra påbörjade uppgifter innan nya introduceras.", linkedSymptoms: ["concentration_4"] },
            { text: "Digitala planeringsverktyg (kalender, checklista) hjälper organisering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i etapper och följas upp regelbundet.", linkedSymptoms: ["concentration_6"] },
            { text: "Han behöver stöd i att hålla reda på material och varva ned i lugna situationer.", linkedSymptoms: ["concentration_7"] },
            { text: "Avskärmad arbetsmiljö eller luddämpande hörlurar hjälper koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Digitala planeringsrutiner (t.ex. kvällen innan) minskar glömska.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Han gynnas av möjlighet till rörelse och varierad studiemiljö.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Kortare arbetspass med planerade pauser förebygger rastlöshet.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Regelbunden fysisk aktivitet hjälper till att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Förberedelser inför stillasittande eller tysta situationer minskar frustration.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Han behöver möjlighet till aktivitet under dagen och struktur som hjälper att varva ned i lugna situationer.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Validerande social återkoppling kring samtalsstil kan hjälpa honom att anpassa tempo.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Tydlig struktur i turordning vid diskussioner minskar impulsiva samtal.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Strategier för att hantera väntan och turtagning.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Stöd i social reflektion stärker förmågan att läsa av situationer.", linkedSymptoms: ["hyperactivity_9"] }
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
            { text: "Tid för genomgång och självkontroll minskar slarvfel i uppgifter.", linkedSymptoms: ["concentration_1"] },
            { text: "Hon behöver planeringsstöd och struktur för att kunna hålla fokus under längre pass.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid samtal och instruktioner är direkt och tydlig kommunikation mest effektivt.", linkedSymptoms: ["concentration_3"] },
            { text: "Hon gynnas av stöd i att slutföra påbörjade uppgifter innan nya introduceras.", linkedSymptoms: ["concentration_4"] },
            { text: "Digitala planeringsverktyg (kalender, checklista) hjälper organisering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i etapper och följas upp regelbundet.", linkedSymptoms: ["concentration_6"] },
            { text: "Hon behöver stöd i att hålla reda på material och varva ned i lugna situationer.", linkedSymptoms: ["concentration_7"] },
            { text: "Avskärmad arbetsmiljö eller luddämpande hjälpmedel kan underlätta koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Digitala planeringsrutiner (t.ex. kvällen innan) minskar glömska.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Hon gynnas av möjlighet till rörelse och varierad studiemiljö.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Kortare arbetspass med planerade pauser förebygger rastlöshet.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Regelbunden fysisk aktivitet hjälper till att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Förberedelser inför stillasittande eller tysta situationer minskar frustration.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Hon behöver möjlighet till aktivitet under dagen och struktur som hjälper att varva ned i lugna situationer.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Validerande social återkoppling kring samtalsstil kan hjälpa henne att anpassa tempo.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Tydlig struktur i turordning vid diskussioner minskar impulsiva samtal.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Strategier för att hantera väntan och turtagning.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Stöd i social reflektion stärker förmågan att läsa av situationer.", linkedSymptoms: ["hyperactivity_9"] }
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
