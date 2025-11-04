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
        },
        {
          id: "other_recommendations",
          label: "Övriga rekommendationer",
          symptoms: [
            { id: "other_1", label: "Starka affekter" },
            { id: "other_2", label: "Höga krav på sig själv" },
            { id: "other_3", label: "Anpassad grundskola" },
            { id: "other_4", label: "Språkstörning" },
            { id: "other_5", label: "Specialpedagogiska Skolmyndigheten" }
          ]
        }
      ],
      recommendations: {
        child_male: {
          difficulties_concentrating: [
            { text: "Tydliga genomgångar och kontrollsteg minskar slarvfel.", linkedSymptoms: ["concentration_1"] },
            { text: "Han behöver korta arbetsmoment och tydliga delmål för att bibehålla fokus.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid instruktioner är det hjälpsamt att låta honom upprepa vad som sagts.", linkedSymptoms: ["concentration_3"] },
            { text: "Han behöver stöd i att planera och avsluta uppgifter innan nya påbörjas.", linkedSymptoms: ["concentration_4"] },
            { text: "Visuella scheman och checklistor underlättar organisering och planering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i små, hanterbara steg med regelbunden återkoppling.", linkedSymptoms: ["concentration_6"] },
            { text: "Han behöver hjälp att hålla ordning på material och få påminnelser inför övergångar.", linkedSymptoms: ["concentration_7"] },
            { text: "Lugn arbetsmiljö och minskade distraktioner främjar koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Påminnelser och dagliga rutiner hjälper honom att komma ihåg aktiviteter.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Han gynnas av möjlighet till rörelsepauser och varierade sittställningar.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Förutsägbarhet om pauser minskar oro vid längre lektioner.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Han behöver tillfällen till fysisk aktivitet under dagen för att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Det är hjälpsamt att förbereda honom på lugna aktiviteter och tydliggöra förväntningar.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Han gynnas av förståelse för sitt höga tempo, tydliga övergångar mellan aktiviteter för att hjälpa vid rastlöshet.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Vid behov tydliga regler för samtal och ljudnivå gör det lättare att anpassa sig.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Han kan behöva vänliga påminnelser om att vänta tills andra pratat färdigt.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Träning i väntan och turtagning bör ske i trygga miljöer.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Social handledning kan stärka förmågan att läsa av när det passar att ta ordet och bestämma i leken.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "Barnet gynnas av vuxna som aktivt vägleder i socialt samspel, exempelvis genom att hjälpa honom ta initiativ, dela upplevelser och turas om i lek. Små, strukturerade sociala situationer fungerar ofta bättre än större grupper. Det kan hjälpa att utgå från hans intressen för att locka till samspel.", linkedSymptoms: ["social_communication_1"] },
            { text: "Barnet behöver att vuxna vid behov använder tydliga gester, bilder och visuella stöd för att förstärka budskapet. Man bör samtidigt se till att man är konkret i sin kommunikation och inte förlitar sig på att han läser mellan raderna. Avsaknad av ögonkontakt bör inte automatiskt tas som ett tecken på ointresse.", linkedSymptoms: ["social_communication_2"] },
            { text: "Barnet gynnas av vuxenstöd i lek och gruppaktiviteter, särskilt i att dela intressen, kompromissa och förstå sociala regler och andras perspektiv. Strukturerade sociala aktiviteter (t.ex. gemensamma projekt med tydliga roller) fungerar bättre än fria lekar.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "Barnet kan behöva möjlighet att utföra självreglerande rörelser (t.ex. gunga, vicka, pilla) utan att bli tillrättavisad. Det är hjälpsamt att acceptera och anpassa miljön snarare än att försöka stoppa beteendet, särskilt om det inte stör andra.", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "Barnet gynnas av förutsägbara rutiner och tydliga övergångar. Förberedelser inför förändringar, visuellt, muntligt eller med schema, minskar stress. Vid förändringar bör någon trygg vuxen guida och bekräfta känslor.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "Barnets specialintressen kan användas som motivation i undervisningen och som ingång till socialt samspel. Det är viktigt att bekräfta intresset samtidigt som vuxna hjälper barnet att bredda aktiviteter gradvis.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "För mycket sensoriska intryck kan vara jobbigt, och barnet behöver en sensoriskt anpassad miljö. Det är viktigt att inte tvinga exponering, utan att gradvis öka toleransen utifrån barnets tempo.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ],
          other_recommendations: [
            { text: "Under utredningen har det framkommit att XXX har lätt till att känna starka affekter. Det är viktigt att komma ihåg att han känner av och smittas av omgivningens känslor. XXX påverkas mer när personer runt honom är arga, glada, ledsna eller oroliga. Vuxenstöd i att sätta ord på känslor och upplevelser, samt strategier för att hantera jobbiga känslor kan hjälpa.", linkedSymptoms: ["other_1"] },
            { text: "Det har framkommit att XXX kan ställa höga krav på sig själv. Rekommenderas således regelbunden avstämning att XXX förstår vad som förväntas av honom, minska risken för att XXX ställer för höga krav på sig själv och sitt arbete. Ge stöd i att hantera när prestationer inte går som han tänkt sig.", linkedSymptoms: ["other_2"] },
            { text: "XXX låga begåvningsnivå försvårar för XXX i flertalet situationer som XXX dagligen befinner sig i skolan. Då XXX är i stort behov av individuellt stöd och information samt stora anpassningar i inlärningsmaterial bedöms vanlig skolform bli för svår för XXX. XXX behöver få möjlighet att byta till anpassad skolform, förslagsvis erbjudas anpassad grundskola. XXX har i nuläget behov av tydlig struktur och mår väl av korta tydliga instruktioner. XXX behöver bli bemött med kunnande och förståelse utifrån de svårigheter som nu uppmärksammats. XXX förmågor kan utvecklas och uppmuntras genom att erbjuda XXX uppgifter där XXX kan känna att XXX lyckas. Vi rekommenderar även att XXX utveckling och begåvning följs upp av skolpsykolog inom ett år.", linkedSymptoms: ["other_3"] },
            { text: "Att inte anpassa för XXXs språkstörning kan lätt få konsekvenser i vardagen, såsom missförstånd och konflikter. Instruktioner som ges i grupp kan vara svåra att uppfatta. Det kan även leda till svårigheter i kommunikationen med jämnåriga. Följande rekommenderas i hemmet och under skoldagen utefter behov:\n\nVuxenstöd i samspel med jämnåriga för att förebygga missförstånd och konflikter.\n\nMindre grupper utefter behov för att ha lättare att komma till tals.\n\nMuntlig information kan behöva förstärkas med visuell sådan, såsom bildstöd vid strukturering av tid eller att saker i rummet har en bildmärkt, dedikerad plats. Att säga en sak i taget, använd korta meningar och inte för svåra ord hjälper.\n\nAnvänd uppmärksamhetsriktande instruktioner, säg \"Lyssna!\" eller dylikt innan du ger den viktiga informationen.\n\nMöjlighet till individuella instruktioner samt extra uppmärksamhet. Om XXX halkar efter sina kamrater bör man sätta in åtgärder tidigt.", linkedSymptoms: ["other_4"] },
            { text: "För ytterligare rekommendationer utifrån XXXs svårigheter rekommenderas Specialpedagogiska Skolmyndighetens hemsida: www.spsm.se.", linkedSymptoms: ["other_5"] }
          ]
        },
        child_female: {
          difficulties_concentrating: [
            { text: "Tydliga genomgångar och kontrollsteg minskar slarvfel.", linkedSymptoms: ["concentration_1"] },
            { text: "Hon behöver korta arbetsmoment och tydliga delmål för att bibehålla fokus.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid instruktioner är det hjälpsamt att låta henne upprepa vad som sagts.", linkedSymptoms: ["concentration_3"] },
            { text: "Hon behöver stöd i att planera och avsluta uppgifter innan nya påbörjas.", linkedSymptoms: ["concentration_4"] },
            { text: "Visuella scheman och checklistor underlättar organisering och planering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i små, hanterbara steg med regelbunden återkoppling.", linkedSymptoms: ["concentration_6"] },
            { text: "Hon behöver hjälp att hålla ordning på material och få påminnelser inför övergångar.", linkedSymptoms: ["concentration_7"] },
            { text: "Lugn arbetsmiljö och minskade distraktioner främjar koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Påminnelser och dagliga rutiner hjälper henne att komma ihåg aktiviteter.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Hon gynnas av möjlighet till rörelsepauser och varierade sittställningar.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Förutsägbarhet om pauser minskar oro vid längre lektioner.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Hon behöver tillfällen till fysisk aktivitet under dagen för att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Det är hjälpsamt att förbereda henne på lugna aktiviteter och tydliggöra förväntningar.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Hon gynnas av förståelse för sitt höga tempo, tydliga övergångar mellan aktiviteter för att hjälpa vid rastlöshet.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Vid behov tydliga regler för samtal och ljudnivå gör det lättare att anpassa sig.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Hon kan behöva vänliga påminnelser om att vänta tills andra pratat färdigt.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Träning i väntan och turtagning bör ske i trygga miljöer.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Social handledning kan stärka förmågan att läsa av när det passar att ta ordet och bestämma i leken.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "Barnet gynnas av vuxna som aktivt vägleder i socialt samspel, exempelvis genom att hjälpa henne ta initiativ, dela upplevelser och turas om i lek. Små, strukturerade sociala situationer fungerar ofta bättre än större grupper. Det kan hjälpa att utgå från hennes intressen för att locka till samspel.", linkedSymptoms: ["social_communication_1"] },
            { text: "Barnet behöver att vuxna vid behov använder tydliga gester, bilder och visuella stöd för att förstärka budskapet. Man bör samtidigt se till att man är konkret i sin kommunikation och inte förlitar sig på att hon läser mellan raderna. Avsaknad av ögonkontakt bör inte automatiskt tas som ett tecken på ointresse.", linkedSymptoms: ["social_communication_2"] },
            { text: "Barnet gynnas av vuxenstöd i lek och gruppaktiviteter, särskilt i att dela intressen, kompromissa och förstå sociala regler och andras perspektiv. Strukturerade sociala aktiviteter (t.ex. gemensamma projekt med tydliga roller) fungerar bättre än fria lekar.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "Barnet kan behöva möjlighet att utföra självreglerande rörelser (t.ex. gunga, vicka, pilla) utan att bli tillrättavisad. Det är hjälpsamt att acceptera och anpassa miljön snarare än att försöka stoppa beteendet, särskilt om det inte stör andra.", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "Barnet gynnas av förutsägbara rutiner och tydliga övergångar. Förberedelser inför förändringar, visuellt, muntligt eller med schema, minskar stress. Vid förändringar bör någon trygg vuxen guida och bekräfta känslor.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "Barnets specialintressen kan användas som motivation i undervisningen och som ingång till socialt samspel. Det är viktigt att bekräfta intresset samtidigt som vuxna hjälper barnet att bredda aktiviteter gradvis.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "För mycket sensoriska intryck kan vara jobbigt, och barnet behöver en sensoriskt anpassad miljö. Det är viktigt att inte tvinga exponering, utan att gradvis öka toleransen utifrån barnets tempo.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ],
          other_recommendations: [
            { text: "Under utredningen har det framkommit att XXX har lätt till att känna starka affekter. Det är viktigt att komma ihåg att hon känner av och smittas av omgivningens känslor. XXX påverkas mer när personer runt henne är arga, glada, ledsna eller oroliga. Vuxenstöd i att sätta ord på känslor och upplevelser, samt strategier för att hantera jobbiga känslor kan hjälpa.", linkedSymptoms: ["other_1"] },
            { text: "Det har framkommit att XXX kan ställa höga krav på sig själv. Rekommenderas således regelbunden avstämning att XXX förstår vad som förväntas av henne, minska risken för att XXX ställer för höga krav på sig själv och sitt arbete. Ge stöd i att hantera när prestationer inte går som hon tänkt sig.", linkedSymptoms: ["other_2"] },
            { text: "XXX låga begåvningsnivå försvårar för XXX i flertalet situationer som XXX dagligen befinner sig i skolan. Då XXX är i stort behov av individuellt stöd och information samt stora anpassningar i inlärningsmaterial bedöms vanlig skolform bli för svår för XXX. XXX behöver få möjlighet att byta till anpassad skolform, förslagsvis erbjudas anpassad grundskola. XXX har i nuläget behov av tydlig struktur och mår väl av korta tydliga instruktioner. XXX behöver bli bemött med kunnande och förståelse utifrån de svårigheter som nu uppmärksammats. XXX förmågor kan utvecklas och uppmuntras genom att erbjuda XXX uppgifter där XXX kan känna att XXX lyckas. Vi rekommenderar även att XXX utveckling och begåvning följs upp av skolpsykolog inom ett år.", linkedSymptoms: ["other_3"] },
            { text: "Att inte anpassa för XXXs språkstörning kan lätt få konsekvenser i vardagen, såsom missförstånd och konflikter. Instruktioner som ges i grupp kan vara svåra att uppfatta. Det kan även leda till svårigheter i kommunikationen med jämnåriga. Följande rekommenderas i hemmet och under skoldagen utefter behov:\n\nVuxenstöd i samspel med jämnåriga för att förebygga missförstånd och konflikter.\n\nMindre grupper utefter behov för att ha lättare att komma till tals.\n\nMuntlig information kan behöva förstärkas med visuell sådan, såsom bildstöd vid strukturering av tid eller att saker i rummet har en bildmärkt, dedikerad plats. Att säga en sak i taget, använd korta meningar och inte för svåra ord hjälper.\n\nAnvänd uppmärksamhetsriktande instruktioner, säg \"Lyssna!\" eller dylikt innan du ger den viktiga informationen.\n\nMöjlighet till individuella instruktioner samt extra uppmärksamhet. Om XXX halkar efter sina kamrater bör man sätta in åtgärder tidigt.", linkedSymptoms: ["other_4"] },
            { text: "För ytterligare rekommendationer utifrån XXXs svårigheter rekommenderas Specialpedagogiska Skolmyndighetens hemsida: www.spsm.se.", linkedSymptoms: ["other_5"] }
          ]
        },
        teen_male: {
          difficulties_concentrating: [
            { text: "Tid och uppmaningar till genomgång och självkontroll minskar slarvfel i uppgifter.", linkedSymptoms: ["concentration_1"] },
            { text: "Han behöver planeringsstöd och struktur för att kunna hålla fokus under längre pass.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid samtal och instruktioner är direkt och tydlig kommunikation mest effektivt.", linkedSymptoms: ["concentration_3"] },
            { text: "Han gynnas av stöd i att slutföra påbörjade uppgifter innan nya introduceras.", linkedSymptoms: ["concentration_4"] },
            { text: "Planeringsverktyg, bland annat digitala såsom kalender och checklistor, hjälper organisering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i etapper och följas upp regelbundet.", linkedSymptoms: ["concentration_6"] },
            { text: "Han behöver stöd i att hålla reda på material och tider, gärna med påminnelser.", linkedSymptoms: ["concentration_7"] },
            { text: "Avskärmad arbetsmiljö eller ljuddämpande hjälpmedel kan underlätta koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Tydliga rutiner minskar glömska. Vänliga och tydliga påminnelser utefter behov.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Han gynnas av möjlighet till rörelse och variation i studiemiljön.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Kortare arbetspass med planerade pauser förebygger rastlöshet.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Regelbunden fysisk aktivitet hjälper till att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Förberedelser inför stillastående eller tysta situationer för att hjälpa vid rastlöshet och frustration.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Han gynnas av förståelse för sitt höga tempo, tydliga övergångar mellan aktiviteter för att hjälpa vid rastlöshet.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Validerande social återkoppling kring samtalsstil kan hjälpa honom att anpassa tempo om det behövs.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Tydlig struktur i turordning vid diskussioner minskar impulsiva samtal.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Strategier och metoder för att hantera väntan och turtagning.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Stöd i social reflektion stärker förmågan att läsa av situationer.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "XXX har nytta av konkreta samtal och på sina egna förutsättningar. Mindre, strukturerade sociala situationer fungerar ofta bättre än större grupper. Vid behov kan sociala regler förklaras på ett validerande och konkret sätt. Han gynnas av trygga kontakter och mer förutsägbara sociala sammanhang.", linkedSymptoms: ["social_communication_1"] },
            { text: "XXX behöver att vuxna vid behov använder tydlig icke-verbal kommunikation. Man bör samtidigt se till att man är konkret i sin kommunikation och inte förlitar sig på att han läser mellan raderna. Avsaknad av ögonkontakt bör inte automatiskt tas som ett tecken på ointresse.", linkedSymptoms: ["social_communication_2"] },
            { text: "XXX har nytta av stöd i att tolka vänskapsrelationer, gruppdynamik och socialt samspel i klassrummet. Det är viktigt att respektera behovet av ensamhet utan att isolering förstärks. Trygga vuxna kan hjälpa honom att bygga ömsesidiga relationer utifrån gemensamma intressen.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "XXX behöver acceptans för självstimulerande beteenden som lugnar och möjlighet att dra sig undan när miljön blir överväldigande. Pedagoger bör förstå att sådana beteenden ofta är strategier för att hantera stress snarare än \"ovanor\".", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "XXX mår bäst av struktur och kontroll över sin vardag. Han bör få förhandsinformation om schemaändringar och möjlighet att påverka sin planering. Vid oförutsedda händelser hjälper det med tydlig förklaring och tid att ställa om mentalt.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "XXX har ofta djupa kunskaper inom sina intresseområden, vilket kan vara en styrka att bygga självkänsla kring. Skolan kan stödja genom att låta honom använda sina intressen i projekt och valfria ämnen.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "XXX bör ha möjlighet att anpassa sin sensoriska miljö. Vuxna behöver respektera dessa behov utan att tolka dem som undvikande. Medvetandegörande kring triggers kan ge ökad självkontroll.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ],
          other_recommendations: [
            { text: "Under utredningen har det framkommit att XXX har lätt till att känna starka affekter. Det är viktigt att komma ihåg att han känner av och smittas av omgivningens känslor. XXX påverkas mer när personer runt honom är arga, glada, ledsna eller oroliga. Vuxenstöd i att sätta ord på känslor och upplevelser, samt strategier för att hantera jobbiga känslor kan hjälpa.", linkedSymptoms: ["other_1"] },
            { text: "Det har framkommit att XXX kan ställa höga krav på sig själv. Rekommenderas således regelbunden avstämning att XXX förstår vad som förväntas av honom, minska risken för att XXX ställer för höga krav på sig själv och sitt arbete. Ge stöd i att hantera när prestationer inte går som han tänkt sig.", linkedSymptoms: ["other_2"] },
            { text: "XXX låga begåvningsnivå försvårar för XXX i flertalet situationer som XXX dagligen befinner sig i skolan. Då XXX är i stort behov av individuellt stöd och information samt stora anpassningar i inlärningsmaterial bedöms vanlig skolform bli för svår för XXX. XXX behöver få möjlighet att byta till anpassad skolform, förslagsvis erbjudas anpassad grundskola. XXX har i nuläget behov av tydlig struktur och mår väl av korta tydliga instruktioner. XXX behöver bli bemött med kunnande och förståelse utifrån de svårigheter som nu uppmärksammats. XXX förmågor kan utvecklas och uppmuntras genom att erbjuda XXX uppgifter där XXX kan känna att XXX lyckas. Vi rekommenderar även att XXX utveckling och begåvning följs upp av skolpsykolog inom ett år.", linkedSymptoms: ["other_3"] },
            { text: "Att inte anpassa för XXXs språkstörning kan lätt få konsekvenser i vardagen, såsom missförstånd och konflikter. Instruktioner som ges i grupp kan vara svåra att uppfatta. Det kan även leda till svårigheter i kommunikationen med jämnåriga. Följande rekommenderas i hemmet och under skoldagen utefter behov:\n\nVuxenstöd i samspel med jämnåriga för att förebygga missförstånd och konflikter.\n\nMindre grupper utefter behov för att ha lättare att komma till tals.\n\nMuntlig information kan behöva förstärkas med visuell sådan, såsom bildstöd vid strukturering av tid eller att saker i rummet har en bildmärkt, dedikerad plats. Att säga en sak i taget, använd korta meningar och inte för svåra ord hjälper.\n\nAnvänd uppmärksamhetsriktande instruktioner, säg \"Lyssna!\" eller dylikt innan du ger den viktiga informationen.\n\nMöjlighet till individuella instruktioner samt extra uppmärksamhet. Om XXX halkar efter sina kamrater bör man sätta in åtgärder tidigt.", linkedSymptoms: ["other_4"] },
            { text: "För ytterligare rekommendationer utifrån XXXs svårigheter rekommenderas Specialpedagogiska Skolmyndighetens hemsida: www.spsm.se.", linkedSymptoms: ["other_5"] }
          ]
        },
        teen_female: {
          difficulties_concentrating: [
            { text: "Tid och uppmaningar till genomgång och självkontroll minskar slarvfel i uppgifter.", linkedSymptoms: ["concentration_1"] },
            { text: "Hon behöver planeringsstöd och struktur för att kunna hålla fokus under längre pass.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid samtal och instruktioner är direkt och tydlig kommunikation mest effektivt.", linkedSymptoms: ["concentration_3"] },
            { text: "Hon gynnas av stöd i att slutföra påbörjade uppgifter innan nya introduceras.", linkedSymptoms: ["concentration_4"] },
            { text: "Planeringsverktyg, bland annat digitala såsom kalender och checklistor, hjälper organisering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i etapper och följas upp regelbundet.", linkedSymptoms: ["concentration_6"] },
            { text: "Hon behöver stöd i att hålla reda på material och tider, gärna med påminnelser.", linkedSymptoms: ["concentration_7"] },
            { text: "Avskärmad arbetsmiljö eller ljuddämpande hjälpmedel kan underlätta koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Tydliga rutiner minskar glömska. Vänliga och tydliga påminnelser utefter behov.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Hon gynnas av möjlighet till rörelse och variation i studiemiljön.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Kortare arbetspass med planerade pauser förebygger rastlöshet.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Regelbunden fysisk aktivitet hjälper till att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Förberedelser inför stillastående eller tysta situationer för att hjälpa vid rastlöshet och frustration.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Hon gynnas av förståelse för sitt höga tempo, tydliga övergångar mellan aktiviteter för att hjälpa vid rastlöshet.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Validerande social återkoppling kring samtalsstil kan hjälpa henne att anpassa tempo om det behövs.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Tydlig struktur i turordning vid diskussioner minskar impulsiva samtal.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Strategier och metoder för att hantera väntan och turtagning.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Stöd i social reflektion stärker förmågan att läsa av situationer.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "XXX har nytta av konkreta samtal och på sina egna förutsättningar. Mindre, strukturerade sociala situationer fungerar ofta bättre än större grupper. Vid behov kan sociala regler förklaras på ett validerande och konkret sätt. Hon gynnas av trygga kontakter och mer förutsägbara sociala sammanhang.", linkedSymptoms: ["social_communication_1"] },
            { text: "XXX behöver att vuxna vid behov använder tydlig icke-verbal kommunikation. Man bör samtidigt se till att man är konkret i sin kommunikation och inte förlitar sig på att hon läser mellan raderna. Avsaknad av ögonkontakt bör inte automatiskt tas som ett tecken på ointresse.", linkedSymptoms: ["social_communication_2"] },
            { text: "XXX har nytta av stöd i att tolka vänskapsrelationer, gruppdynamik och socialt samspel i klassrummet. Det är viktigt att respektera behovet av ensamhet utan att isolering förstärks. Trygga vuxna kan hjälpa henne att bygga ömsesidiga relationer utifrån gemensamma intressen.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "XXX behöver acceptans för självstimulerande beteenden som lugnar och möjlighet att dra sig undan när miljön blir överväldigande. Pedagoger bör förstå att sådana beteenden ofta är strategier för att hantera stress snarare än \"ovanor\".", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "XXX mår bäst av struktur och kontroll över sin vardag. Hon bör få förhandsinformation om schemaändringar och möjlighet att påverka sin planering. Vid oförutsedda händelser hjälper det med tydlig förklaring och tid att ställa om mentalt.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "XXX har ofta djupa kunskaper inom sina intresseområden, vilket kan vara en styrka att bygga självkänsla kring. Skolan kan stödja genom att låta henne använda sina intressen i projekt och valfria ämnen.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "XXX bör ha möjlighet att anpassa sin sensoriska miljö. Vuxna behöver respektera dessa behov utan att tolka dem som undvikande. Medvetandegörande kring triggers kan ge ökad självkontroll.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ],
          other_recommendations: [
            { text: "Under utredningen har det framkommit att XXX har lätt till att känna starka affekter. Det är viktigt att komma ihåg att hon känner av och smittas av omgivningens känslor. XXX påverkas mer när personer runt henne är arga, glada, ledsna eller oroliga. Vuxenstöd i att sätta ord på känslor och upplevelser, samt strategier för att hantera jobbiga känslor kan hjälpa.", linkedSymptoms: ["other_1"] },
            { text: "Det har framkommit att XXX kan ställa höga krav på sig själv. Rekommenderas således regelbunden avstämning att XXX förstår vad som förväntas av henne, minska risken för att XXX ställer för höga krav på sig själv och sitt arbete. Ge stöd i att hantera när prestationer inte går som hon tänkt sig.", linkedSymptoms: ["other_2"] },
            { text: "XXX låga begåvningsnivå försvårar för XXX i flertalet situationer som XXX dagligen befinner sig i skolan. Då XXX är i stort behov av individuellt stöd och information samt stora anpassningar i inlärningsmaterial bedöms vanlig skolform bli för svår för XXX. XXX behöver få möjlighet att byta till anpassad skolform, förslagsvis erbjudas anpassad grundskola. XXX har i nuläget behov av tydlig struktur och mår väl av korta tydliga instruktioner. XXX behöver bli bemött med kunnande och förståelse utifrån de svårigheter som nu uppmärksammats. XXX förmågor kan utvecklas och uppmuntras genom att erbjuda XXX uppgifter där XXX kan känna att XXX lyckas. Vi rekommenderar även att XXX utveckling och begåvning följs upp av skolpsykolog inom ett år.", linkedSymptoms: ["other_3"] },
            { text: "Att inte anpassa för XXXs språkstörning kan lätt få konsekvenser i vardagen, såsom missförstånd och konflikter. Instruktioner som ges i grupp kan vara svåra att uppfatta. Det kan även leda till svårigheter i kommunikationen med jämnåriga. Följande rekommenderas i hemmet och under skoldagen utefter behov:\n\nVuxenstöd i samspel med jämnåriga för att förebygga missförstånd och konflikter.\n\nMindre grupper utefter behov för att ha lättare att komma till tals.\n\nMuntlig information kan behöva förstärkas med visuell sådan, såsom bildstöd vid strukturering av tid eller att saker i rummet har en bildmärkt, dedikerad plats. Att säga en sak i taget, använd korta meningar och inte för svåra ord hjälper.\n\nAnvänd uppmärksamhetsriktande instruktioner, säg \"Lyssna!\" eller dylikt innan du ger den viktiga informationen.\n\nMöjlighet till individuella instruktioner samt extra uppmärksamhet. Om XXX halkar efter sina kamrater bör man sätta in åtgärder tidigt.", linkedSymptoms: ["other_4"] },
            { text: "För ytterligare rekommendationer utifrån XXXs svårigheter rekommenderas Specialpedagogiska Skolmyndighetens hemsida: www.spsm.se.", linkedSymptoms: ["other_5"] }
          ]
        },
        child_nonbinary: {
          difficulties_concentrating: [
            { text: "Tydliga genomgångar och kontrollsteg minskar slarvfel.", linkedSymptoms: ["concentration_1"] },
            { text: "Hen behöver korta arbetsmoment och tydliga delmål för att bibehålla fokus.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid instruktioner är det hjälpsamt att låta hen upprepa vad som sagts.", linkedSymptoms: ["concentration_3"] },
            { text: "Hen behöver stöd i att planera och avsluta uppgifter innan nya påbörjas.", linkedSymptoms: ["concentration_4"] },
            { text: "Visuella scheman och checklistor underlättar organisering och planering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i små, hanterbara steg med regelbunden återkoppling.", linkedSymptoms: ["concentration_6"] },
            { text: "Hen behöver hjälp att hålla ordning på material och få påminnelser inför övergångar.", linkedSymptoms: ["concentration_7"] },
            { text: "Lugn arbetsmiljö och minskade distraktioner främjar koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Påminnelser och dagliga rutiner hjälper hen att komma ihåg aktiviteter.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Hen gynnas av möjlighet till rörelsepauser och varierade sittställningar.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Förutsägbarhet om pauser minskar oro vid längre lektioner.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Hen behöver tillfällen till fysisk aktivitet under dagen för att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Det är hjälpsamt att förbereda hen på lugna aktiviteter och tydliggöra förväntningar.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Hen gynnas av förståelse för sitt höga tempo, tydliga övergångar mellan aktiviteter för att hjälpa vid rastlöshet.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Vid behov tydliga regler för samtal och ljudnivå gör det lättare att anpassa sig.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Hen kan behöva vänliga påminnelser om att vänta tills andra pratat färdigt.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Träning i väntan och turtagning bör ske i trygga miljöer.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Social handledning kan stärka förmågan att läsa av när det passar att ta ordet och bestämma i leken.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "Barnet gynnas av vuxna som aktivt vägleder i socialt samspel, exempelvis genom att hjälpa hen ta initiativ, dela upplevelser och turas om i lek. Små, strukturerade sociala situationer fungerar ofta bättre än större grupper. Det kan hjälpa att utgå från hens intressen för att locka till samspel.", linkedSymptoms: ["social_communication_1"] },
            { text: "Barnet behöver att vuxna vid behov använder tydliga gester, bilder och visuella stöd för att förstärka budskapet. Man bör samtidigt se till att man är konkret i sin kommunikation och inte förlitar sig på att hen läser mellan raderna. Avsaknad av ögonkontakt bör inte automatiskt tas som ett tecken på ointresse.", linkedSymptoms: ["social_communication_2"] },
            { text: "Barnet gynnas av vuxenstöd i lek och gruppaktiviteter, särskilt i att dela intressen, kompromissa och förstå sociala regler och andras perspektiv. Strukturerade sociala aktiviteter (t.ex. gemensamma projekt med tydliga roller) fungerar bättre än fria lekar.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "Barnet kan behöva möjlighet att utföra självreglerande rörelser (t.ex. gunga, vicka, pilla) utan att bli tillrättavisad. Det är hjälpsamt att acceptera och anpassa miljön snarare än att försöka stoppa beteendet, särskilt om det inte stör andra.", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "Barnet gynnas av förutsägbara rutiner och tydliga övergångar. Förberedelser inför förändringar, visuellt, muntligt eller med schema, minskar stress. Vid förändringar bör någon trygg vuxen guida och bekräfta känslor.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "Barnets specialintressen kan användas som motivation i undervisningen och som ingång till socialt samspel. Det är viktigt att bekräfta intresset samtidigt som vuxna hjälper barnet att bredda aktiviteter gradvis.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "För mycket sensoriska intryck kan vara jobbigt, och barnet behöver en sensoriskt anpassad miljö. Det är viktigt att inte tvinga exponering, utan att gradvis öka toleransen utifrån barnets tempo.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ],
          other_recommendations: [
            { text: "Under utredningen har det framkommit att XXX har lätt till att känna starka affekter. Det är viktigt att komma ihåg att hen känner av och smittas av omgivningens känslor. XXX påverkas mer när personer runt hen är arga, glada, ledsna eller oroliga. Vuxenstöd i att sätta ord på känslor och upplevelser, samt strategier för att hantera jobbiga känslor kan hjälpa.", linkedSymptoms: ["other_1"] },
            { text: "Det har framkommit att XXX kan ställa höga krav på sig själv. Rekommenderas således regelbunden avstämning att XXX förstår vad som förväntas av hen, minska risken för att XXX ställer för höga krav på sig själv och sitt arbete. Ge stöd i att hantera när prestationer inte går som hen tänkt sig.", linkedSymptoms: ["other_2"] },
            { text: "XXX låga begåvningsnivå försvårar för XXX i flertalet situationer som XXX dagligen befinner sig i skolan. Då XXX är i stort behov av individuellt stöd och information samt stora anpassningar i inlärningsmaterial bedöms vanlig skolform bli för svår för XXX. XXX behöver få möjlighet att byta till anpassad skolform, förslagsvis erbjudas anpassad grundskola. XXX har i nuläget behov av tydlig struktur och mår väl av korta tydliga instruktioner. XXX behöver bli bemött med kunnande och förståelse utifrån de svårigheter som nu uppmärksammats. XXX förmågor kan utvecklas och uppmuntras genom att erbjuda XXX uppgifter där XXX kan känna att XXX lyckas. Vi rekommenderar även att XXX utveckling och begåvning följs upp av skolpsykolog inom ett år.", linkedSymptoms: ["other_3"] },
            { text: "Att inte anpassa för XXXs språkstörning kan lätt få konsekvenser i vardagen, såsom missförstånd och konflikter. Instruktioner som ges i grupp kan vara svåra att uppfatta. Det kan även leda till svårigheter i kommunikationen med jämnåriga. Följande rekommenderas i hemmet och under skoldagen utefter behov:\n\nVuxenstöd i samspel med jämnåriga för att förebygga missförstånd och konflikter.\n\nMindre grupper utefter behov för att ha lättare att komma till tals.\n\nMuntlig information kan behöva förstärkas med visuell sådan, såsom bildstöd vid strukturering av tid eller att saker i rummet har en bildmärkt, dedikerad plats. Att säga en sak i taget, använd korta meningar och inte för svåra ord hjälper.\n\nAnvänd uppmärksamhetsriktande instruktioner, säg \"Lyssna!\" eller dylikt innan du ger den viktiga informationen.\n\nMöjlighet till individuella instruktioner samt extra uppmärksamhet. Om XXX halkar efter sina kamrater bör man sätta in åtgärder tidigt.", linkedSymptoms: ["other_4"] },
            { text: "För ytterligare rekommendationer utifrån XXXs svårigheter rekommenderas Specialpedagogiska Skolmyndighetens hemsida: www.spsm.se.", linkedSymptoms: ["other_5"] }
          ]
        },
        teen_nonbinary: {
          difficulties_concentrating: [
            { text: "Tid och uppmaningar till genomgång och självkontroll minskar slarvfel i uppgifter.", linkedSymptoms: ["concentration_1"] },
            { text: "Hen behöver planeringsstöd och struktur för att kunna hålla fokus under längre pass.", linkedSymptoms: ["concentration_2"] },
            { text: "Vid samtal och instruktioner är direkt och tydlig kommunikation mest effektivt.", linkedSymptoms: ["concentration_3"] },
            { text: "Hen gynnas av stöd i att slutföra påbörjade uppgifter innan nya introduceras.", linkedSymptoms: ["concentration_4"] },
            { text: "Planeringsverktyg, bland annat digitala såsom kalender och checklistor, hjälper organisering.", linkedSymptoms: ["concentration_5"] },
            { text: "Uppgifter bör delas upp i etapper och följas upp regelbundet.", linkedSymptoms: ["concentration_6"] },
            { text: "Hen behöver stöd i att hålla reda på material och tider, gärna med påminnelser.", linkedSymptoms: ["concentration_7"] },
            { text: "Avskärmad arbetsmiljö eller ljuddämpande hjälpmedel kan underlätta koncentration.", linkedSymptoms: ["concentration_8"] },
            { text: "Tydliga rutiner minskar glömska. Vänliga och tydliga påminnelser utefter behov.", linkedSymptoms: ["concentration_9"] }
          ],
          hyperactivity_impulsivity: [
            { text: "Hen gynnas av möjlighet till rörelse och variation i studiemiljön.", linkedSymptoms: ["hyperactivity_1"] },
            { text: "Kortare arbetspass med planerade pauser förebygger rastlöshet.", linkedSymptoms: ["hyperactivity_2"] },
            { text: "Regelbunden fysisk aktivitet hjälper till att reglera energi.", linkedSymptoms: ["hyperactivity_3"] },
            { text: "Förberedelser inför stillastående eller tysta situationer för att hjälpa vid rastlöshet och frustration.", linkedSymptoms: ["hyperactivity_4"] },
            { text: "Hen gynnas av förståelse för sitt höga tempo, tydliga övergångar mellan aktiviteter för att hjälpa vid rastlöshet.", linkedSymptoms: ["hyperactivity_5"] },
            { text: "Validerande social återkoppling kring samtalsstil kan hjälpa hen att anpassa tempo om det behövs.", linkedSymptoms: ["hyperactivity_6"] },
            { text: "Tydlig struktur i turordning vid diskussioner minskar impulsiva samtal.", linkedSymptoms: ["hyperactivity_7"] },
            { text: "Strategier och metoder för att hantera väntan och turtagning.", linkedSymptoms: ["hyperactivity_8"] },
            { text: "Stöd i social reflektion stärker förmågan att läsa av situationer.", linkedSymptoms: ["hyperactivity_9"] }
          ],
          socio_communicative: [
            { text: "XXX har nytta av konkreta samtal och på sina egna förutsättningar. Mindre, strukturerade sociala situationer fungerar ofta bättre än större grupper. Vid behov kan sociala regler förklaras på ett validerande och konkret sätt. Hen gynnas av trygga kontakter och mer förutsägbara sociala sammanhang.", linkedSymptoms: ["social_communication_1"] },
            { text: "XXX behöver att vuxna vid behov använder tydlig icke-verbal kommunikation. Man bör samtidigt se till att man är konkret i sin kommunikation och inte förlitar sig på att hen läser mellan raderna. Avsaknad av ögonkontakt bör inte automatiskt tas som ett tecken på ointresse.", linkedSymptoms: ["social_communication_2"] },
            { text: "XXX har nytta av stöd i att tolka vänskapsrelationer, gruppdynamik och socialt samspel i klassrummet. Det är viktigt att respektera behovet av ensamhet utan att isolering förstärks. Trygga vuxna kan hjälpa hen att bygga ömsesidiga relationer utifrån gemensamma intressen.", linkedSymptoms: ["social_communication_3"] }
          ],
          limited_repetitive: [
            { text: "XXX behöver acceptans för självstimulerande beteenden som lugnar och möjlighet att dra sig undan när miljön blir överväldigande. Pedagoger bör förstå att sådana beteenden ofta är strategier för att hantera stress snarare än \"ovanor\".", linkedSymptoms: ["repetitive_behaviour_1"] },
            { text: "XXX mår bäst av struktur och kontroll över sin vardag. Hen bör få förhandsinformation om schemaändringar och möjlighet att påverka sin planering. Vid oförutsedda händelser hjälper det med tydlig förklaring och tid att ställa om mentalt.", linkedSymptoms: ["repetitive_behaviour_2"] },
            { text: "XXX har ofta djupa kunskaper inom sina intresseområden, vilket kan vara en styrka att bygga självkänsla kring. Skolan kan stödja genom att låta hen använda sina intressen i projekt och valfria ämnen.", linkedSymptoms: ["repetitive_behaviour_3"] },
            { text: "XXX bör ha möjlighet att anpassa sin sensoriska miljö. Vuxna behöver respektera dessa behov utan att tolka dem som undvikande. Medvetandegörande kring triggers kan ge ökad självkontroll.", linkedSymptoms: ["repetitive_behaviour_4"] }
          ],
          other_recommendations: [
            { text: "Under utredningen har det framkommit att XXX har lätt till att känna starka affekter. Det är viktigt att komma ihåg att hen känner av och smittas av omgivningens känslor. XXX påverkas mer när personer runt hen är arga, glada, ledsna eller oroliga. Vuxenstöd i att sätta ord på känslor och upplevelser, samt strategier för att hantera jobbiga känslor kan hjälpa.", linkedSymptoms: ["other_1"] },
            { text: "Det har framkommit att XXX kan ställa höga krav på sig själv. Rekommenderas således regelbunden avstämning att XXX förstår vad som förväntas av hen, minska risken för att XXX ställer för höga krav på sig själv och sitt arbete. Ge stöd i att hantera när prestationer inte går som hen tänkt sig.", linkedSymptoms: ["other_2"] },
            { text: "XXX låga begåvningsnivå försvårar för XXX i flertalet situationer som XXX dagligen befinner sig i skolan. Då XXX är i stort behov av individuellt stöd och information samt stora anpassningar i inlärningsmaterial bedöms vanlig skolform bli för svår för XXX. XXX behöver få möjlighet att byta till anpassad skolform, förslagsvis erbjudas anpassad grundskola. XXX har i nuläget behov av tydlig struktur och mår väl av korta tydliga instruktioner. XXX behöver bli bemött med kunnande och förståelse utifrån de svårigheter som nu uppmärksammats. XXX förmågor kan utvecklas och uppmuntras genom att erbjuda XXX uppgifter där XXX kan känna att XXX lyckas. Vi rekommenderar även att XXX utveckling och begåvning följs upp av skolpsykolog inom ett år.", linkedSymptoms: ["other_3"] },
            { text: "Att inte anpassa för XXXs språkstörning kan lätt få konsekvenser i vardagen, såsom missförstånd och konflikter. Instruktioner som ges i grupp kan vara svåra att uppfatta. Det kan även leda till svårigheter i kommunikationen med jämnåriga. Följande rekommenderas i hemmet och under skoldagen utefter behov:\n\nVuxenstöd i samspel med jämnåriga för att förebygga missförstånd och konflikter.\n\nMindre grupper utefter behov för att ha lättare att komma till tals.\n\nMuntlig information kan behöva förstärkas med visuell sådan, såsom bildstöd vid strukturering av tid eller att saker i rummet har en bildmärkt, dedikerad plats. Att säga en sak i taget, använd korta meningar och inte för svåra ord hjälper.\n\nAnvänd uppmärksamhetsriktande instruktioner, säg \"Lyssna!\" eller dylikt innan du ger den viktiga informationen.\n\nMöjlighet till individuella instruktioner samt extra uppmärksamhet. Om XXX halkar efter sina kamrater bör man sätta in åtgärder tidigt.", linkedSymptoms: ["other_4"] },
            { text: "För ytterligare rekommendationer utifrån XXXs svårigheter rekommenderas Specialpedagogiska Skolmyndighetens hemsida: www.spsm.se.", linkedSymptoms: ["other_5"] }
          ]
        }
      }
    };
  };

  const [data, setData] = useState(loadData);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [patientAge, setPatientAge] = useState('child');
  const [patientSex, setPatientSex] = useState('male');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('none');
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
    const otherRecommendationsRecs = data.recommendations[profileKey]?.other_recommendations || [];
    const allRecommendations = [...difficultiesConcentratingRecs, ...hyperactivityImpulsivityRecs, ...socioCommunicativeRecs, ...limitedRepetitiveRecs, ...otherRecommendationsRecs];
    
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

  const getDiagnosisText = () => {
    if (selectedDiagnosis === 'none') return null;

    const pronouns = {
      male: { han_hon: 'han', honom_henne: 'honom', hans_hennes: 'hans' },
      female: { han_hon: 'hon', honom_henne: 'henne', hans_hennes: 'hennes' },
      nonbinary: { han_hon: 'hen', honom_henne: 'hen', hans_hennes: 'hens' }
    };
    
    const p = pronouns[patientSex];

    const diagnosisTexts = {
      adhd_child: `För en god utveckling och livskvalitet är det viktigt att omgivningen har goda kunskaper om ADHD.

XXX behöver tydliga rutiner och stöttning kring det ${p.han_hon} upplever är svårt, som när det blir för starka känslor. Möjligheten att öva fungerande strategier för att hantera vardagens svårigheter med stöd av vuxen persons närvaro och medling minskar risken för konflikter och upplevelser av misslyckande. Familjen rekommenderas att ta kontakt med ADHD-center för att få tillgång till deras utbud. Familjen informeras om möjlighet till medicinering.

I samtliga miljöer är det viktigt att förstärka önskvärda beteenden. Tät och påtaglig feedback, främst i form av uppmuntran och beröm direkt efter avslutade uppgifter kan öka motivationen. Var så konkret som möjligt genom att säga vad det är som ${p.han_hon} gör bra.`,

      adhd_teen: `För en god utveckling och livskvalitet är det viktigt att omgivningen har goda kunskaper om ADHD.

XXX behöver tydliga rutiner och stöttning kring det ${p.han_hon} upplever är svårt, som när det blir för starka känslor. Möjligheten att öva fungerande strategier för att hantera vardagens svårigheter med stöd av vuxen persons närvaro och medling minskar risken för konflikter och upplevelser av misslyckande. Familjen rekommenderas att ta kontakt med ADHD-center för att få tillgång till deras utbud. Familjen informeras om möjlighet till medicinering.

I samtliga miljöer är det viktigt att förstärka önskvärda beteenden. Tät och påtaglig feedback, främst i form av uppmuntran och beröm direkt efter avslutade uppgifter kan öka motivationen. Var så konkret som möjligt genom att säga vad det är som ${p.han_hon} gör bra.`,

      autism_child: `XXX behöver stöd i att utveckla sätt att kommunicera sina behov till omgivningen t.ex. i form av bild- eller teckenstöd. ${p.han_hon.charAt(0).toUpperCase() + p.han_hon.slice(1)} behöver stöd i att träna sociala färdigheter i samspel, t.ex. turtagning i lek och att ta sociala initiativ. Detta kan övas genom att visa ${p.honom_henne} hur ${p.han_hon} ska göra och i direkt anslutning förstärka önskvärt beteende. XXX behöver stöd i att träna på dagliga rutiner (av-/påklädning, toalettrutiner, etc.) genom modellering, repetition och tydlig kommunikation för att synliggöra sekvenser av händelser. ${p.han_hon.charAt(0).toUpperCase() + p.han_hon.slice(1)} behöver få träna och bli förevisad att leka på ett varierat och funktionellt sätt för att stimulera till utveckling.

XXX behöver att ${p.hans_hennes} omgivning har kunskap om autism för att skapa förutsättning för positiv utveckling. Autism kännetecknas av betydande svårigheter inom tre huvudområden:
- Förmågan till social interaktion.
- Förmågan till ömsesidig kommunikation.
- Förmågan till föreställning vilket påverkar fantasi, lek, beteenden och intressen.

Vi använder vår förmåga till socialt samspel i alla kontakter med andra människor. Kommunikationsavvikelserna vid autism har att göra med förståelse av den sociala aspekten av att kommunicera med andra, och ses inte som enbart ett språkproblem. Det kan vara hjälpsamt att utgå från ${p.hans_hennes} intressen vid behov av att locka till samspel.

XXX har visat att ${p.han_hon} blir orolig i en situation då ${p.han_hon} inte vet vad, varför och hur ${p.han_hon} ska göra något eller vad som ska hända. En sådan situation kan t.ex. vara att byta rum eller gå tillbaka in när ${p.han_hon} har varit ute, eller när ${p.han_hon} blir fråntagen saker. När små förändringar i miljön eller övergångar mellan olika aktiviteter skapar oro hos XXX kan det vara hjälpsamt att tydligt förbereda ${p.honom_henne} på vad som ska ske. XXX har behov av extra tydlig information för att förstå sin omgivning och leva i ett meningsfullt sammanhang. ${p.han_hon.charAt(0).toUpperCase() + p.han_hon.slice(1)} har svårare än ett barn utan autism att förstå och tolka andra människors reaktioner och behöver hjälp av omgivningen att sätta ord på det som sker. En av de viktigaste förutsättningarna för att XXX ska ha en begriplig tillvaro, är att omgivningen arbetar för att skapa tydlighet. Ju mer konkret desto bättre.

För en god utveckling och livskvalitet är det viktigt att omgivningen har goda kunskaper om autism. Remiss skickas till Autismcenter för små barn för att ge familjen tillgång till deras utbud.

Rekommenderas således:
- Kontakt med Autismcenter för små barn för kunskap och stöd
- Föräldrar informeras om möjlighet att söka omvårdnadsbidrag
- attention-riks.se och www.sjalvhjalppavagen.se
- Förskoleåtergivning för att underlätta pedagogisk anpassning
- Förnyad kognitiv bedömning inom ramen för autismcenters uppdrag bör göras inom ett fåtal år, senast inför skolstart.`,

      autism_teen: `För en god utveckling och livskvalitet är det viktigt att omgivningen har goda kunskaper om autism.

För en individ med autism kan det vara
- svårt att förstå hur andra människor tänker
- svårt att sätta ord på sina egna känslor och veta vad man ska göra när det känns för mycket eller vid starka känslor
- svårt att få ihop helheter och sammanhang, till exempel att förstå handlingen i en bok eller i sociala sammanhang som vid konflikter
- svårt att klara av förändringar och när saker inte blir som man har tänkt sig
- jobbigt när man inte vet vad som ska hända eller vad man ska göra
- jobbigt när det är rörigt eller att man har för många människor omkring sig.

Det är viktigt att man får stöd och hjälp med rutiner och struktur i vardagen för ökad åskådlighet och förutsägbarhet. Förberedelser och regelbundenhet är viktiga och stressreducerande. Samband och sammanhang kan behöva förklaras och åskådliggöras. Hjälp med övergångar är viktiga. Familjen kan behöva stöd i att genomföra ovanstående punkter, där följande rekommenderas:
- Kontakt med Habiliteringens kurs- och kunskapscenter för kunskap och stöd
- Föräldrar informeras om möjlighet att söka omvårdnadsbidrag
- attention-riks.se och sjalvhjalppavagen.se
- Skolåtergivning för att underlätta pedagogisk anpassning`,

      both_child: `För en god utveckling och livskvalitet är det viktigt att omgivningen har goda kunskaper om autism och ADHD.

För en individ med autism och ADHD kan det vara
- Svårt att förstå hur andra människor tänker
- Svårt att sätta ord på sina egna känslor och veta vad man ska göra när det känns för mycket, som till exempel när man blir riktigt arg eller ledsen
- Svårt att få ihop helheter och sammanhang, till exempel att förstå handlingen i en bok eller i sociala sammanhang som vid konflikter
- Svårt att klara av förändringar och när saker inte blir som man har tänkt sig
- Jobbigt när man inte vet vad som ska hända eller vad man ska göra
- Jobbigt när det är rörigt eller man har för många människor omkring sig

Det är viktigt att man får stöd och hjälp med rutiner och struktur i vardagen för ökad åskådlighet och förutsägbarhet. Förberedelser och regelbundenhet är viktiga och stressreducerande. Samband och sammanhang kan behöva förklaras och åskådliggöras. Hjälp med övergångar är viktiga. Familjen kan behöva stöd i att genomföra ovanstående punkter, där följande rekommenderas:
- Kontakt med Habiliteringens kurs- och kunskapscenter för kunskap och stöd
- Föräldrar informeras om möjlighet att söka omvårdnadsbidrag
- attention-riks.se och sjalvhjalppavagen.se/
- Skolåtergivning för att underlätta pedagogisk anpassning
- Positiv feedback är viktig för ökad självkänsla
- Hjälp med stimulans till sociala aktiviteter och umgänge utefter behov
- Vuxenstöd i att hitta balans i det som ger och tar energi`,

      both_teen: `För en god utveckling och livskvalitet är det viktigt att omgivningen har goda kunskaper om autism och ADHD.

För en individ med autism och ADHD kan det vara
- Svårt att förstå hur andra människor tänker
- Svårt att sätta ord på sina egna känslor och veta vad man ska göra när det känns för mycket, som till exempel när man blir riktigt arg eller ledsen
- Svårt att få ihop helheter och sammanhang, till exempel att förstå handlingen i en bok eller i sociala sammanhang som vid konflikter
- Svårt att klara av förändringar och när saker inte blir som man har tänkt sig
- Jobbigt när man inte vet vad som ska hända eller vad man ska göra
- Jobbigt när det är rörigt eller man har för många människor omkring sig

Det är viktigt att man får stöd och hjälp med rutiner och struktur i vardagen för ökad åskådlighet och förutsägbarhet. Förberedelser och regelbundenhet är viktiga och stressreducerande. Samband och sammanhang kan behöva förklaras och åskådliggöras. Hjälp med övergångar är viktiga. Familjen kan behöva stöd i att genomföra ovanstående punkter, där följande rekommenderas:
- Kontakt med Habiliteringens kurs- och kunskapscenter för kunskap och stöd
- Föräldrar informeras om möjlighet att söka omvårdnadsbidrag
- attention-riks.se och sjalvhjalppavagen.se/
- Skolåtergivning för att underlätta pedagogisk anpassning
- Positiv feedback är viktig för ökad självkänsla
- Hjälp med stimulans till sociala aktiviteter och umgänge utefter behov
- Vuxenstöd i att hitta balans i det som ger och tar energi`,

      intellectual_disability_child: `Under utredningen har det framkommit att XXX uppfyller kriterierna för intellektuell funktionsnedsättning. Detta innebär bland annat svårigheter att lära sig saker samt att använda saker man lär sig i det dagliga livet. Svårigheter uppstår när XXX konfronteras med en miljö som inte är anpassad efter ${p.honom_henne}, exempelvis att läromedlen inte är adekvata, att undervisningsnivån inte är anpassad, avsaknad av specialpedagogik, eller så motsvarar den fysiska miljön inte ${p.hans_hennes} behov.

- XXX behöver hjälp och anpassning i skolmiljön för att kunna tillgodogöra sig undervisningen på samma villkor som andra jämnåriga. Kraven bör modifieras och specialundervisning bör erbjudas.
- Generellt behöver XXX ges mer tid i skolan, vid t ex prov, läxläsning och presentationer då det tar längre tid för XXX än jämnåriga att kognitivt bearbeta mer komplex information.
- XXX har hjälp av att ges tydliga instruktioner i enkla led samt ha tid till förberedelser. XXX behöver stöttning i att utveckla de starka sidor XXX har för att på så vis även stärka sin självkänsla.
- Hem och skola behöver få god kunskap om funktionsnedsättningen för att en god livskvalitet och funktionsnivå ska kunna uppnås.
- XXX behöver utmanas och växa utifrån sin egen nivå.Det kan lätt skapas en ond cirkel där misslyckanden leder till stress, dåligt självförtroende och i sin tur en ökning av koncentrationssvårigheter och försämrat allmänt mående.
- Tydlighet och konkretisering kring vad XXX förväntas göra, hur XXX ska göra det, och hur länge, minskar risken för osäkerhet och ovillighet från XXX sida. Finns möjlighet att koppla ihop XXX intressen med en uppgift som XXX ska utföra hemma eller i skolan kan motivationen öka ytterligare.
- Man bör följa upp XXX noga under skolgången i högstadiet, för att snabbt kunna sätta in stödinsatser eller anpassat studiematerial om XXX får fortsatt svårt att tillgodogöra sig undervisningen.`,

      intellectual_disability_teen: `Under utredningen har det framkommit att XXX uppfyller kriterierna för intellektuell funktionsnedsättning. Detta innebär bland annat svårigheter att lära sig saker samt att använda saker man lär sig i det dagliga livet. Svårigheter uppstår när XXX konfronteras med en miljö som inte är anpassad efter ${p.honom_henne}, exempelvis att läromedlen inte är adekvata, att undervisningsnivån inte är anpassad, avsaknad av specialpedagogik, eller så motsvarar den fysiska miljön inte ${p.hans_hennes} behov.

- XXX behöver hjälp och anpassning i skolmiljön för att kunna tillgodogöra sig undervisningen på samma villkor som andra jämnåriga. Kraven bör modifieras och specialundervisning bör erbjudas.
- Generellt behöver XXX ges mer tid i skolan, vid t ex prov, läxläsning och presentationer då det tar längre tid för XXX än jämnåriga att kognitivt bearbeta mer komplex information.
- XXX har hjälp av att ges tydliga instruktioner i enkla led samt ha tid till förberedelser. XXX behöver stöttning i att utveckla de starka sidor XXX har för att på så vis även stärka sin självkänsla.
- Hem och skola behöver få god kunskap om funktionsnedsättningen för att en god livskvalitet och funktionsnivå ska kunna uppnås.
- XXX behöver utmanas och växa utifrån sin egen nivå.Det kan lätt skapas en ond cirkel där misslyckanden leder till stress, dåligt självförtroende och i sin tur en ökning av koncentrationssvårigheter och försämrat allmänt mående.
- Tydlighet och konkretisering kring vad XXX förväntas göra, hur XXX ska göra det, och hur länge, minskar risken för osäkerhet och ovillighet från XXX sida. Finns möjlighet att koppla ihop XXX intressen med en uppgift som XXX ska utföra hemma eller i skolan kan motivationen öka ytterligare.
- Man bör följa upp XXX noga under skolgången i högstadiet, för att snabbt kunna sätta in stödinsatser eller anpassat studiematerial om XXX får fortsatt svårt att tillgodogöra sig undervisningen.`
    };

    const key = `${selectedDiagnosis}_${patientAge}`;
    return diagnosisTexts[key] || null;
  };

  const value = {
    symptomCategories: data.symptomCategories,
    recommendations: data.recommendations,
    selectedSymptoms,
    patientAge,
    setPatientAge,
    patientSex,
    setPatientSex,
    selectedDiagnosis,
    setSelectedDiagnosis,
    view,
    setView,
    toggleSymptom,
    getFilteredRecommendations,
    getDiagnosisText,
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
