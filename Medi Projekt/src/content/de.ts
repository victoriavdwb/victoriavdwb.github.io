export type Reference = {
  authors: string;
  title: string;
  source: string;
  url: string;
};

export const references: Reference[] = [
  {
    authors: "Rana S, Lemoine E, Granger JP, Karumanchi SA",
    title: "Preeclampsia: Pathophysiology, Challenges, and Perspectives",
    source: "Circulation Research. 2019;124(7):1094–1112",
    url: "https://doi.org/10.1161/CIRCRESAHA.118.313276",
  },
  {
    authors: "Maynard SE, Min JY, Merchan J, et al.",
    title:
      "Excess placental soluble fms-like tyrosine kinase 1 (sFlt1) may contribute to endothelial dysfunction, hypertension, and proteinuria in preeclampsia",
    source: "Journal of Clinical Investigation. 2003;111(5):649–658",
    url: "https://doi.org/10.1172/JCI17189",
  },
  {
    authors: "Venkatesha S, Toporsian M, Lam C, et al.",
    title: "Soluble endoglin contributes to the pathogenesis of preeclampsia",
    source: "Nature Medicine. 2006;12(6):642–649",
    url: "https://doi.org/10.1038/nm1429",
  },
  {
    authors: "Zeisler H, Llurba E, Chantraine F, et al.",
    title: "Predictive Value of the sFlt-1:PlGF Ratio in Women with Suspected Preeclampsia",
    source: "New England Journal of Medicine. 2016;374(1):13–22",
    url: "https://doi.org/10.1056/NEJMoa1414838",
  },
  {
    authors: "Eremina V, Jefferson JA, Kowalewska J, et al.",
    title: "VEGF Inhibition and Renal Thrombotic Microangiopathy",
    source: "New England Journal of Medicine. 2008;358(11):1129–1136",
    url: "https://doi.org/10.1056/NEJMoa0707330",
  },
  {
    authors: "Sanghavi M, Rutherford JD",
    title: "Cardiovascular Physiology of Pregnancy",
    source: "Circulation. 2014;130(12):1003–1008",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.114.009029",
  },
  {
    authors: "Melchiorre K, Sharma R, Thilaganathan B",
    title: "Cardiovascular Implications in Preeclampsia: An Overview",
    source: "Circulation. 2014;130(8):703–714",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.113.003664",
  },
  {
    authors: "Bellamy L, Casas JP, Hingorani AD, Williams DJ",
    title:
      "Pre-eclampsia and risk of cardiovascular disease and cancer in later life: systematic review and meta-analysis",
    source: "BMJ. 2007;335(7627):974",
    url: "https://doi.org/10.1136/bmj.39335.385301.BE",
  },
  {
    authors: "Wu P, Haththotuwa R, Kwok CS, et al.",
    title: "Preeclampsia and Future Cardiovascular Health: A Systematic Review and Meta-Analysis",
    source: "Circulation: Cardiovascular Quality and Outcomes. 2017;10(2):e003497",
    url: "https://doi.org/10.1161/CIRCOUTCOMES.116.003497",
  },
  {
    authors: "Regitz-Zagrosek V, Roos-Hesselink JW, Bauersachs J, et al.",
    title: "2018 ESC Guidelines for the management of cardiovascular diseases during pregnancy",
    source: "European Heart Journal. 2018;39(34):3165–3241",
    url: "https://doi.org/10.1093/eurheartj/ehy340",
  },
  {
    authors: "Brown MA, Magee LA, Kenny LC, et al.",
    title:
      "Hypertensive Disorders of Pregnancy: ISSHP Classification, Diagnosis, and Management Recommendations for International Practice",
    source: "Hypertension. 2018;72(1):24–43",
    url: "https://doi.org/10.1161/HYPERTENSIONAHA.117.10803",
  },
  {
    authors: "Änggård E",
    title: "The endothelium — the body's largest endocrine gland?",
    source: "Journal of Endocrinology. 1990;127(3):371–375",
    url: "https://doi.org/10.1677/joe.0.1270371",
  },
  {
    authors: "Robson SC, Hunter S, Boys RJ, Dunlop W",
    title: "Serial study of factors influencing changes in cardiac output during human pregnancy",
    source: "American Journal of Physiology. 1989;256(4 Pt 2):H1060–H1065",
    url: "https://doi.org/10.1152/ajpheart.1989.256.4.H1060",
  },
  {
    authors: "Li R, Li R, Song GH, Piao SF, Xu L, Cong J",
    title: "Analysis of ventricular-vascular properties during preeclampsia: an echocardiography study",
    source: "The International Journal of Cardiovascular Imaging. 2024;40(10)",
    url: "https://doi.org/10.1007/s10554-024-03211-x",
  },
];

export const de = {
  meta: {
    title: "Präeklampsie verstehen – Pathophysiologie interaktiv",
    description:
      "Eine interaktive Reise durch die Pathophysiologie der Präeklampsie: von der hämodynamischen Adaptation über den anti-angiogenen Shift bis zum kardiovaskulären Langzeitrisiko.",
  },

  nav: {
    brand: "Präeklampsie",
    brandSub: "Pathophysiologie interaktiv",
    chapters: [
      { id: "haemodynamik", short: "01", label: "Adaptation" },
      { id: "plazenta", short: "02", label: "Plazenta" },
      { id: "endothel", short: "03", label: "Endothel" },
      { id: "herz", short: "04", label: "Herz" },
      { id: "langzeit", short: "05", label: "Langzeitrisiko" },
    ],
    modeLabel: "Modus",
    modeNormal: "Normale Schwangerschaft",
    modePe: "Präeklampsie",
    modeNormalShort: "Normal",
    modePeShort: "Präeklampsie",
    langLabel: "Sprache",
    menu: "Menü",
  },

  hero: {
    eyebrow: "Interaktives Lernmodul",
    title: "Präeklampsie ist eine Gefäßerkrankung – die Plazenta ist nur der Auslöser.",
    lead: "Verfolge den roten Faden vom plazentaren anti-angiogenen Shift über die systemische endotheliale Dysfunktion bis zum maladaptiven kardialen Remodeling. Ein Schalter genügt, um jede Grafik zwischen gesunder Schwangerschaft und Präeklampsie umzuschalten.",
    ctaPrimary: "Reise starten",
    ctaSecondary: "Zum Zwei-Säulen-Modell",
    hint: "Tipp: Der Modus-Schalter oben rechts verändert alle Darstellungen gleichzeitig.",
    stats: [
      { value: "+50 %", label: "Plasmavolumen in der Schwangerschaft" },
      { value: "+30–50 %", label: "Anstieg des Herzminutenvolumens" },
      { value: "2–4×", label: "Kardiovaskuläres Risiko danach" },
    ],
  },

  body: {
    eyebrow: "Orientierung",
    title: "Ein Organsystem, drei Schauplätze",
    lead: "Die Präeklampsie spielt gleichzeitig an drei Orten: in der Plazenta entsteht der Trigger, im Gefäßsystem verteilt er sich, am Herzen wird er hämodynamisch sichtbar. Wähle einen Schauplatz, um direkt dorthin zu springen.",
    hotspots: [
      {
        id: "herz",
        title: "Herz",
        text: "Volumenbelastung trifft auf erhöhte Nachlast – konzentrisches Remodeling und diastolische Dysfunktion.",
      },
      {
        id: "endothel",
        title: "Gefäßsystem",
        text: "Systemische endotheliale Dysfunktion: Vasokonstriktion, Kapillarleck, Prokoagulabilität.",
      },
      {
        id: "plazenta",
        title: "Uterus & Plazenta",
        text: "Gestörte Trophoblasteninvasion, ischämische Plazenta, Freisetzung von sFlt-1 und sEng.",
      },
    ],
    fallbackNote: "Vereinfachte Darstellung – die 3D-Ansicht ist auf diesem Gerät deaktiviert.",
    loading: "Modell wird geladen …",
    rotateHint: "Ziehen zum Drehen",
  },

  ch1: {
    id: "haemodynamik",
    sources: [6, 13, 1],
    eyebrow: "Kapitel 01 · Physiologie",
    title: "Die hämodynamische Adaptation – und das Konzept der Demaskierung",
    lead: "Eine normale Schwangerschaft ist ein monatelanger kardiovaskulärer Belastungstest. Wer ihn besteht, hat Reserve. Wer ihn nicht besteht, hatte sie vermutlich schon vorher nicht.",
    steps: [
      {
        id: "volume",
        title: "Massive Volumenbelastung",
        text: "In der normalen Schwangerschaft steigt das Plasmavolumen um bis zu 50 %, das Herzminutenvolumen um 30–50 %. Diese Vorlast-Erhöhung ist die physiologische Grundlage der hämodynamischen Adaptation.",
        tone: "normal" as const,
      },
      {
        id: "resistance",
        title: "Der Widerstand muss fallen",
        titlePe: "Der Widerstand fällt nicht",
        text: "Der systemische Gefäßwiderstand (totaler peripherer Widerstand) sinkt zu Beginn der Schwangerschaft ab und erreicht seinen Tiefpunkt im zweiten Trimester (ca. 14. bis 24. Schwangerschaftswoche). Danach steigt er zum dritten Trimester und zur Geburt hin wieder auf die normalen Werte vor der Schwangerschaft an.",
        textPe:
          "Die frühe schützende Vasodilatation ist reduziert. Der Gefäßwiderstand sinkt deutlich weniger als bei gesunden Schwangeren. Anstelle des Tiefpunkts im 2. Trimenon kommt es zum Cross-over-Phänomen: Der Widerstand steigt bei den PE-Patientinnen ab der 20. bis 24. SSW wieder steil und vorzeitig an. Im Verlauf kontrahieren die Gefäße durch die profunde endotheliale Dysfunktion massiv. Der TPR schießt weit über die Normalwerte hinaus.",
      },
      {
        id: "pressure",
        title: "Der Blutdruck bleibt niedrig",
        titlePe: "Pathologischer Blutdruckanstieg",
        text: "Trotz deutlich höherem Auswurf fällt der mittlere arterielle Druck im zweiten Trimenon sogar leicht ab. Die Gleichung MAP = HZV × SVR geht nur auf, weil beide Faktoren gegenläufig arbeiten.",
        textPe:
          "Der physiologische Blutdruckabfall bleibt im ersten und zweiten Trimenon aus (Failure to Nadir), bevor es im dritten Trimenon durch einen massiven Anstieg des totalen peripheren Widerstands zur hypertensiven Eskalation kommt.\n\n**Ohm’sches Gesetz des Kreislaufs:** Blutdruck = Herzminutenvolumen (HZV) × Totaler peripherer Widerstand (TPR).\n\nDa bei der Präeklampsie der TPR massiv ansteigt, muss zwingend auch der Blutdruck steigen.",
      },
      {
        id: "reserve",
        title: "Intakte kardiovaskuläre Reserve",
        titlePe: "Demaskierung statt Zufall",
        text: "Dank einer intakten myokardialen und endothelialen Reserve wird das stark ansteigende Herzminutenvolumen in einer physiologischen Schwangerschaft durch den Abfall des peripheren Gefäßwiderstands kompensiert, sodass der Blutdruck bis zum Ende stabil bleibt.",
        textPe:
          "Frauen, die eine Präeklampsie entwickeln, haben präkonzeptionell oft eine subklinisch reduzierte endotheliale und myokardiale Reserve. Unter der Extrembelastung der Schwangerschaft dekompensiert dieses System – die Schwangerschaft deckt auf, sie verursacht nicht allein.",
      },
    ],
    chart: {
      title: "Verlauf über die Schwangerschaft",
      xLabel: "Schwangerschaftswoche",
      yLabel: "Veränderung gegenüber präkonzeptionell",
      source:
        "Werte in % des präkonzeptionellen Ausgangswerts. Schematische Verläufe, an publizierte Größenordnungen gekoppelt: normale Schwangerschaft nach Sanghavi & Rutherford, Circulation 2014 (serielle Daten Robson et al. 1989); Präeklampsie-Profil nach Melchiorre, Sharma & Thilaganathan, Circulation 2014.",
      weekLabel: "SSW",
      playLabel: "Verlauf abspielen",
      pauseLabel: "Pause",
      resetLabel: "Zurücksetzen",
      series: {
        plasma: "Plasmavolumen",
        co: "Herzminutenvolumen",
        svr: "Systemischer Widerstand",
        map: "Mittlerer arterieller Druck",
      },
      trimester: ["1. Trimenon", "2. Trimenon", "3. Trimenon"],
    },
    mediators: {
      title: "Die Vasodilatatoren der Schwangerschaft",
      items: [
        {
          abbr: "NO",
          name: "Stickstoffmonoxid",
          text: "Endothelial gebildet, diffundiert in die glatte Muskelzelle, senkt über cGMP den Tonus.",
        },
        {
          abbr: "PGI₂",
          name: "Prostazyklin",
          text: "Vasodilatatorisch, hemmt Thrombozytenaggregation – das Verhältnis zu Thromboxan kippt bei PE.",
        },
        {
          abbr: "RLX",
          name: "Relaxin",
          text: "Steigert die arterielle Compliance und die renale Perfusion früh in der Schwangerschaft.",
        },
      ],
    },
    callout: {
      title: "Der Knick in der Kurve",
      normal: "Der systemische vaskuläre Widerstand (SVR) bleibt bis zum Termin niedrig. Vorlast und Nachlast bleiben aufeinander abgestimmt.",
      pe: "Ab dem zweiten Trimenon steigt der systemische vaskuläre Widerstand (SVR) wieder an, statt niedrig zu bleiben. Genau hier wird die fehlende Reserve sichtbar – die Demaskierung beginnt.",
    },
  },

  ch2: {
    id: "plazenta",
    sources: [1, 2, 3, 4, 5, 11],
    eyebrow: "Kapitel 02 · Molekulare Pathogenese",
    title: "Der anti-angiogene Shift – der Trigger sitzt in der Plazenta",
    lead: "Die Ursache der Präeklampsie liegt in der Plazenta, die Folgen zeigen sich im mütterlichen Gefäßsystem. Zwischen beidem liegt ein löslicher Rezeptor.",
    steps: [
      {
        id: "invasion",
        title: "Trophoblasteninvasion und Umbau",
        text: "Extravillöser Trophoblast wandert in die uterinen Spiralarterien ein und ersetzt Endothel und glatte Muskulatur.\n\nDie Spiralarterien verwandeln sich von engen muskulösen Gefäßen, die auf vasokonstriktorische Reize reagieren, in weite starre und nicht reaktive Leitungsgefäße. Es entsteht ein Low-Resistance / High-Capacitance System.",
        textPe:
          "Aufgrund einer zu oberflächlichen Trophoblasteninvasion bleibt der physiologische Umbau der uterinen Spiralarterien aus. Da ihre muskuläre Wandschicht intakt bleibt, behalten die Gefäße ihren engen Durchmesser und reagieren weiterhin auf vasokonstriktorische Reize.",
      },
      {
        id: "hypoxia",
        title: "Metabolische Stabilität",
        titlePe: "Hypoxie und oxidativer Stress",
        text: "Aufgrund des Gefäßumbaus kommt es zu einer optimalen Oxygenierung und metabolischen Stabilität. Die weite vasomotorisch inaktive Arterie perfundiert kontinuierlich und widerstandsarm. Der stetige, nicht pulsatile Blutfluss bewahrt den Synzytiotrophoblasten vor oxidativem Stress.",
        textPe:
          "Die enge, weiterhin vasoreagible Arterie perfundiert stoßweise. Ischämie-Reperfusion erzeugt massiven oxidativen Stress im Synzytiotrophoblasten.",
      },
      {
        id: "release",
        title: "Intakte VEGF- und PlGF-Signaltransduktion",
        titlePe: "sFlt-1 und sEng werden freigesetzt",
        text: "Die optimal perfundierte Plazenta schüttet proangiogene Faktoren in den mütterlichen Kreislauf aus: VEGF (Vascular Endothelial Growth Factor) und PlGF (Placental Growth Factor).",
        textPe:
          "Die ischämische Plazenta schüttet anti-angiogene Faktoren in den mütterlichen Kreislauf aus: sFlt-1 (soluble fms-like tyrosine kinase-1) und sEng (soluble Endoglin). Die anti-angiogene Flut ist ein molekular „entgleister“ Kompensationsmechanismus der das primäre Ziel verfolgt, den mütterlichen Blutdruck drastisch zu steigern, um die eigene plazentare Minderperfusion mit Gewalt auszugleichen.",
      },
      {
        id: "block",
        title: "Intakte Signaltransduktion",
        titlePe: "VEGF- und PlGF-Blockade",
        text: "Aufgrund physiologisch niedriger sFlt-1- und sEng-Spiegel binden VEGF und PlGF ungehindert an das mütterliche Endothel. Dies sichert eine intakte TGF-β Kaskade, erhält die Endothelfunktion und garantiert die Vasodilatation durch NO-Produktion.",
        textPe:
          "sFlt-1 ist der lösliche Ektodomänen-Anteil des VEGF-Rezeptors 1. Er fängt VEGF und PlGF systemisch ab, bevor sie ihre Rezeptoren am Endothel erreichen. sEng blockiert zusätzlich das TGF-β-Signal.",
      },
    ],
    gauge: {
      title: "sFlt-1 / PlGF-Quotient",
      caption:
        "Klinisch als Ausschluss- und Vorhersagemarker etabliert: niedrige Werte schließen eine Präeklampsie kurzfristig weitgehend aus, hohe Werte zeigen den anti-angiogenen Shift an.",
      normalLabel: "Angiogene Balance",
      peLabel: "Anti-angiogener Shift",
      clinical: {
        title: "Der klinische Biomarker: sFlt-1/PlGF-Quotient",
        lead: "In der klinischen Routine wird das anti-angiogene Ungleichgewicht im maternalen Serum quantifiziert und dient als hochexakter prädiktiver Marker für das Endothelversagen. Es gelten international fest etablierte Cut-off-Werte (basierend auf der PROGNOSIS-Studie):",
        items: [
          {
            label: "Rule-out (Quotient < 38)",
            text: "Ein Wert unter 38 schließt das Auftreten einer behandlungsbedürftigen Präeklampsie für die nächsten sieben Tage mit nahezu 100 %iger Sicherheit aus (sehr hoher negativer prädiktiver Wert).",
            tone: "normal" as const,
          },
          {
            label: "Grauzone (Quotient 38–85 bzw. 38–110)",
            text: "Ein intermediäres Risiko, das ein engmaschiges klinisches Monitoring erfordert.",
            tone: "warn" as const,
          },
          {
            label: "Rule-in (Quotient > 85 bei früher PE <34. SSW / Quotient > 110 bei später PE ≥34. SSW)",
            text: "Dieser Bereich ist hochgradig prädiktiv für das Vorliegen oder die rasante Manifestation einer Präeklampsie und signalisiert eine unmittelbar drohende endotheliale Dekompensation, die meist eine zeitnahe Entbindung erfordert.",
            tone: "pe" as const,
          },
        ],
      },
    },
    analogy: {
      eyebrow: "Analogie aus der Onkologie",
      title: "Präeklampsie als endogener Tyrosinkinase-Inhibitor",
      text: "Der Mechanismus entspricht exakt dem der Tyrosinkinase-Inhibitoren (TKI), die in der Onkologie die VEGF-Achse blockieren. Deren typische Nebenwirkungen (schwere Hypertonie, Proteinurie und Herzinsuffizienz) sind dieselben Organmanifestationen wie bei der Präeklampsie. Die Plazenta verabreicht hier gewissermaßen eine körpereigene Anti-VEGF-Therapie.",
      tags: ["Hypertonie", "Proteinurie", "Kardiale Dysfunktion"],
    },
    legend: {
      spiral: "Spiralarterie",
      trophoblast: "Trophoblast",
      flow: "Uteroplazentarer Fluss",
      sflt: "sFlt-1 / sEng",
      vegf: "VEGF / PlGF",
      villi: "Zotten",
      decidua: "Decidua",
      myometrium: "Myometrium",
      hypoxia: "O₂ ↓ · oxidativer Stress ↑",
      placenta: "Plazenta",
      endothelium: "Endothel",
      maternal: "Maternale Zirkulation",
      capture: "Abfangen vor dem Rezeptor",
    },
    labels: {
      normalVessel: "Weites Niederdruckgefäß",
      peVessel: "Eng, muskulär, vasoreagibel",
      normalFlow: "Konstante Perfusion",
      peFlow: "Stoßweise Perfusion, Ischämie-Reperfusion",
    },
  },

  ch3: {
    id: "endothel",
    sources: [1, 2, 3, 5, 12],
    eyebrow: "Kapitel 03 · Systemische Auswirkung",
    title: "Systemische endotheliale Dysfunktion",
    lead: "Das Endothel ist mit rund 7.000 m² das größte endokrine Organ des Körpers. Entzieht man ihm den VEGF-Überlebensreiz, verliert es gleichzeitig Tonuskontrolle, Barrierefunktion und Thromboresistenz.",
    steps: [
      {
        id: "signal",
        title: "Der Erhaltungsreiz ist intakt",
        titlePe: "Der Überlebensreiz fehlt",
        text: "VEGF und PlGF wirken als permanente Erhaltungssignale, die die strukturelle und funktionelle Integrität des ausdifferenzierten Endothels kontinuierlich sichern und vor Apoptose schützen. Insbesondere der hochgradig fenestrierten Gefäßbetten wie in Niere, Leber und Gehirn.",
        textPe:
          "Fällt dieses Erhaltungssignal durch die systemische Blockade weg, kollabiert die Integrität dieser spezialisierten Gefäßbetten. Die klinische Manifestation zeigt sich als glomeruläre Endotheliose (Proteinurie), mikrovaskuläre Leberschädigung (HELLP-Syndrom) und der Durchbrechung der Blut-Hirn-Schranke (Eklampsie).",
      },
      {
        id: "enos",
        title: "eNOS wird hochreguliert",
        titlePe: "eNOS wird herunterreguliert",
        text: "Angetrieben durch das starke VEGF- (und Relaxin-) Signal steigt die Aktivität der endothelialen NO-Synthase massiv an. Große Mengen NO diffundieren in die glatte Gefäßmuskulatur, wodurch ein starker und dauerhafter cGMP-vermittelter Relaxationsreiz aufrechterhalten wird.",
        textPe:
          "Ohne VEGF-Signal sinkt die Aktivität der endothelialen NO-Synthase. Weniger NO diffundiert in die glatte Gefäßmuskulatur, der cGMP-vermittelte Relaxationsreiz versiegt.",
      },
      {
        id: "ros",
        title: "Das ROS-NO-Gleichgewicht bleibt stabil",
        titlePe: "ROS nehmen zu",
        text: "Die Bildung reaktiver Sauerstoffspezies (ROS) wird durch zelluläre Antioxidantien effektiv kontrolliert, sodass NO nicht neutralisiert wird und eine hohe Bioverfügbarkeit behält. Aus diesem intakten Gleichgewicht resultiert die schwangerschaftstypische, profunde Vasodilatation.",
        textPe:
          "Reaktive Sauerstoffspezies steigen an und fangen das verbliebene NO zu Peroxynitrit ab. Aus dem Missverhältnis entsteht Vasokonstriktion statt der schwangerschaftstypischen Vasodilatation.",
      },
      {
        id: "consequence",
        title: "Drei physiologische Adaptationen",
        titlePe: "Drei klinische Konsequenzen",
        text: "Aus der gesunden Endothelschicht resultieren drei essenzielle kardiovaskuläre Leitfunktionen für die Schwangerschaft: eine drastisch gesenkte Nachlast, eine intakte vaskuläre Schrankenfunktion (die pathologische Ödeme und Proteinurie verhindert) sowie eine ungestörte antithrombotische Mikrozirkulation.",
        textPe:
          "Aus einer Zellschicht werden drei Leitbefunde: massiv erhöhte Nachlast, erhöhte Kapillarpermeabilität und eine prokoagulatorische Stoffwechsellage.",
      },
    ],
    consequences: [
      {
        id: "afterload",
        title: "Nachlast ↑",
        metric: "SVR",
        text: "Die Vasokonstriktion hebt den systemischen vaskulären Widerstand an. Der Blutdruck steigt. Nicht weil das Herz mehr pumpt, sondern weil das Gefäßbett sich verschließt.",
      },
      {
        id: "permeability",
        title: "Kapillarpermeabilität ↑",
        metric: "Ödem · Proteinurie",
        text: "Die interendothelialen Verbindungen öffnen sich, Flüssigkeit tritt ins Interstitium aus. In der Niere führt die glomeruläre Endotheliose zum Verlust der Filtrationsbarriere. Es entsteht die klassische Proteinurie.",
      },
      {
        id: "coagulation",
        title: "Prokoagulatorische Lage",
        metric: "Thrombozyten ↓",
        text: "Das aktivierte Endothel verliert seine Thromboresistenz: Thrombozytenaktivierung, Verbrauch und mikroangiopathische Hämolyse, was zum HELLP-Syndrom führt.",
      },
    ],
    legend: {
      lumen: "Lumen",
      endothel: "Endothelzelle",
      smc: "Glatte Muskelzelle",
      no: "NO",
      ros: "ROS",
      junction: "Zell-Zell-Verbindung",
      protein: "Albumin",
      platelet: "Thrombozyt",
    },
    labels: {
      normal: "Vasodilatation · dichte Barriere · thromboresistent",
      pe: "Vasokonstriktion · Leck · prokoagulatorisch",
    },
  },

  ch4: {
    id: "herz",
    sources: [1, 7, 14],
    eyebrow: "Kapitel 04 · Kardiologie",
    title: "Hämodynamische Demaskierung: Versagen der ventrikulo-arteriellen Kopplung",
    lead: "Hier schließt sich der Kreis. Volumenbelastung allein bewältigt das gesunde Herz mit exzentrischem Remodeling. Trifft dieselbe Volumenbelastung abrupt auf eine massiv erhöhte Nachlast, entkoppelt sich Ventrikel von Arterie.",
    steps: [
      {
        id: "eccentric",
        title: "Physiologisch: exzentrisches Remodeling",
        titlePe: "Pathologisch: konzentrisches Remodeling",
        text: "Bei gesunden Schwangeren führt die Volumenbelastung zu einer milden exzentrischen Hypertrophie – der Ventrikel wird geringfügig größer und bleibt compliant. Das ist physiologisches, reversibles Remodeling.",
        textPe:
          "Die Volumenbelastung trifft auf eine massiv erhöhte Nachlast (gesteigerter Gefäßwiderstand). Das Herz reagiert mit einer maladaptiven, konzentrischen Hypertrophie. Die Ventrikelwand verdickt sich, das Myokard verliert an Compliance und es entwickelt sich frühzeitig eine diastolische Dysfunktion.",
      },
      {
        id: "coupling",
        title: "Die Kopplung bleibt optimal",
        titlePe: "Die Kopplung bricht",
        text: "In einer gesunden Schwangerschaft trifft die Volumenbelastung auf eine adaptiv gesenkte arterielle Elastance (Ea). Ventrikel und Gefäßsystem passen sich synchron an und arbeiten weiterhin im energetisch optimalen Verhältnis.",
        textPe:
          "Bei der Präeklampsie trifft die Volumenbelastung durch die endotheliale Dysfunktion auf eine steil erhöhte arterielle Elastance (Ea). Ventrikel und Gefäßsystem arbeiten nicht mehr im energetisch optimalen Verhältnis Ea/Ees.",
      },
      {
        id: "concentric",
        title: "Adaptiv: exzentrisches Remodeling",
        titlePe: "Maladaptiv: konzentrisches Remodeling",
        text: "Das Herz antwortet mit einer proportionalen Vergrößerung der Kavität und einer nur milden Wandverdickung. Die Wandspannung bleibt ausbalanciert. Die elastische Dehnbarkeit (Compliance) bleibt dauerhaft erhalten.",
        textPe:
          "Das Herz antwortet mit Wandverdickung bei gleichbleibender oder verkleinerter Kavität. Die Wandspannung sinkt kurzfristig. Die Steifigkeit steigt dauerhaft.",
      },
      {
        id: "diastole",
        title: "Intakte diastolische Funktion",
        titlePe: "Diastolische Dysfunktion",
        text: "Der elastische Ventrikel nimmt das zusätzliche Volumen bei unverändert niedrigen Füllungsdrücken auf. Die diastolische Entspannungsfähigkeit des Herzens bleibt vollständig erhalten.",
        textPe:
          "Der steife Ventrikel füllt sich nur bei höherem Druck. Es entsteht frühzeitig eine diastolische Funktionsstörung. Dies ist die Vorstufe zur HFpEF.",
      },
      {
        id: "echo",
        title: "Was die Echokardiographie zeigt",
        text: "Erhaltener Global Longitudinal Strain (GLS), physiologisch niedriges E/e'-Verhältnis und normwertiger linker Vorhof (LAVI) als Ausdruck einer optimalen myokardialen und diastolischen Adaptation.",
        textPe:
          "Reduzierter Global Longitudinal Strain (GLS), erhöhtes E/e' Verhältnis und ein vergrößerter linker Vorhof (LAVI). Oft schon, bevor die LVEF überhaupt auffällig wird.",
      },
    ],
    geometry: {
      normalLabel: "Exzentrisch (physiologisch)",
      peLabel: "Konzentrisch (maladaptiv)",
      normalCaption: "Kavität leicht vergrößert, Wanddicke nahezu unverändert, Compliance erhalten.",
      peCaption: "Wanddicke erhöht, relative Wanddicke > 0,42, Kavität eher klein und steif.",
      wall: "Wanddicke",
      cavity: "Kavität",
      afterload: "Nachlast ↑",
    },
    pvloop: {
      title: "Druck-Volumen-Beziehung",
      caption:
        "Ees beschreibt die Kontraktilität des Ventrikels, Ea die Last des arteriellen Systems. Steigt Ea überproportional, verschiebt sich die Schleife nach oben – bei sinkendem Schlagvolumen und steigendem Füllungsdruck.",
      source:
        "Druck- und Volumenwerte sind didaktisch gewählte Größenordnungen, keine Messreihen. Der Ea/Ees-Schwellenwert von 0,8 und das Präeklampsie Profil folgen Li et al., The International Journal of Cardiovascular Imaging 2024, ergänzt durch Melchiorre, Sharma & Thilaganathan, Circulation 2014.",
      volume: "Volumen (ml)",
      pressure: "Druck (mmHg)",
      ees: "Ees (Kontraktilität)",
      ea: "Ea (arterielle Last)",
      edpvr: "Enddiastolische Steifigkeit",
      couplingLabel: "Ea/Ees",
      explain: {
        normalTitle: "So liest du das Diagramm",
        normal:
          "Jede Schleife entspricht einem Herzzyklus: rechts unten die diastolische Füllung, die vertikalen Schenkel markieren isovolumetrische Kontraktion und Relaxation, das obere Segment die Ejektionsphase. Die blaue Gerade (Ees, endsystolische Elastance) quantifiziert die lastunabhängige Kontraktilität, die orangene (Ea, arterielle Elastance) die effektive arterielle Nachlast, die graue Kurve die enddiastolische Druck-Volumen-Beziehung (EDPVR) als Maß der passiven Ventrikelcompliance. In der gesunden Schwangerschaft senkt die periphere Vasodilatation die Ea. Das Verhältnis Ea/Ees bleibt deutlich unter dem klinischen Schwellenwert von 0,8. Schlagvolumen und Schlagarbeit bleiben maximal effizient.",
        peTitle: "Warum sich die Schleife verschiebt",
        pe: "Die endotheliale Dysfunktion treibt die arterielle Last durch gestiegenen Widerstand und die arterielle Einsteifung steil nach oben. Erreicht das Verhältnis Ea/Ees den Schwellenwert von 0,8 kann die Kontraktilität nicht mehr adaptiv mithalten und beginnt zu erschöpfen. Die Schleife wandert nach oben und wird schmaler: mehr Druck, weniger Schlagvolumen, höherer Füllungsdruck. Trotz hohem Sauerstoffverbrauch sinkt die Pumpeffizienz (GWE). Die ventrikulo-arterielle Kopplung entgleist.",
      },
    },
    echo: {
      title: "Echokardiographische Marker",
      normalCol: "Normale Schwangerschaft",
      peCol: "Präeklampsie",
      items: [
        {
          key: "gls",
          label: "GLS",
          full: "Global Longitudinal Strain",
          normal: "−20 %",
          pe: "−15 %",
          hint: "Die longitudinale Kontraktionsreserve bleibt intakt.",
          hintPe: "Sensitiver als die LVEF: die longitudinalen subendokardialen Fasern leiden zuerst.",
        },
        {
          key: "ee",
          label: "E/e'",
          full: "Füllungsdruck-Surrogat",
          normal: "6",
          pe: "12",
          hint: "Bleibt physiologisch niedrig. Ausdruck einer ungestörten myokardialen Relaxation.",
          hintPe: "Steigt mit dem linksatrialen Druck – Ausdruck der gestörten Relaxation.",
        },
        {
          key: "lavi",
          label: "LAVI",
          full: "Linksatrialer Volumenindex",
          normal: "26 ml/m²",
          pe: "38 ml/m²",
          hint: "Keine pathologische chronische Druckbelastung des Vorhofs.",
          hintPe: "Das Barometer der chronischen diastolischen Belastung.",
        },
        {
          key: "lvef",
          label: "LVEF",
          full: "Auswurffraktion",
          normal: "62 %",
          pe: "55 %",
          hint: "Reflektiert eine mühelose, globale Pumpfunktion.",
          hintPe: "Bleibt lange normal – deshalb ist sie hier der schlechteste Frühmarker.",
        },
      ],
    },
  },

  ch5: {
    id: "langzeit",
    sources: [1, 7, 8, 9, 10],
    eyebrow: "Kapitel 05 · Langzeitperspektive",
    title: "Das Zwei-Säulen-Modell: Warum das Risiko nach der Geburt bleibt",
    lead: "Frauen nach Präeklampsie tragen ein 2- bis 4-fach erhöhtes Risiko für chronische Hypertonie, KHK, Herzinsuffizienz und Schlaganfall. Die aktuelle Literatur erklärt das mit einem Dual-Hit-Modell.",
    pillars: [
      {
        id: "shared",
        label: "Säule 1",
        title: "Shared Risk Factors – die Demaskierung",
        text: "Präeklampsie und kardiovaskuläre Erkrankungen teilen sich dieselben zugrunde liegenden Risikofaktoren. Die Schwangerschaft ist lediglich der erste Stresstest, bei dem die Patientin durchfällt – die Disposition war vorher da.",
        items: ["Insulinresistenz", "Subklinische Inflammation", "Dyslipidämie", "Mikroangiopathie"],
      },
      {
        id: "scarring",
        label: "Säule 2",
        title: "Vascular Scarring – der direkte Schaden",
        text: "Der monatelange anti-angiogene und hypertensive Sturm hinterlässt irreversible epigenetische und strukturelle Schäden an Endothel und Myokard: vaskuläre Narbenbildung und beschleunigtes Vascular Aging.",
        items: [
          "Epigenetische Prägung",
          "Endotheliale Narbenbildung",
          "Persistierendes kardiales Remodeling",
          "Arterielle Versteifung",
        ],
      },
    ],
    timeline: [
      {
        id: "pre",
        label: "Präkonzeptionell",
        title: "Latente Vulnerabilität",
        text: "Subklinisch reduzierte endotheliale und myokardiale Reserve – klinisch stumm, im Alltag nicht messbar.",
      },
      {
        id: "preg",
        label: "Schwangerschaft",
        title: "Der Stresstest",
        text: "Volumenbelastung, anti-angiogener Shift, Nachlasterhöhung. Das System dekompensiert – oder eben nicht.",
      },
      {
        id: "post",
        label: "Postpartal",
        title: "Scheinbare Erholung",
        text: "sFlt-1 fällt nach Entbindung der Plazenta rasch ab, der Blutdruck normalisiert sich meist. Konzentrisches Remodeling und diastolische Dysfunktion persistieren jedoch bei einem relevanten Teil der Frauen.",
      },
      {
        id: "late",
        label: "Jahre bis Jahrzehnte",
        title: "Manifeste Erkrankung",
        text: "Chronische Hypertonie, HFpEF, KHK und zerebrovaskuläre Ereignisse treten früher auf als in der Vergleichspopulation.",
      },
    ],
    risks: {
      title: "Relatives Risiko nach Präeklampsie",
      caption: "Größenordnungen aus Metaanalysen; je früher und schwerer die Präeklampsie, desto höher das Risiko.",
      items: [
        { label: "Chronische Hypertonie", factor: 3.7 },
        { label: "Herzinsuffizienz", factor: 4.2 },
        { label: "Koronare Herzkrankheit", factor: 2.2 },
        { label: "Schlaganfall", factor: 1.8 },
      ],
    },
    outro: {
      title: "Konsequenz für die Praxis",
      text: "Eine Präeklampsie in der Anamnese ist kein abgeschlossenes geburtshilfliches Ereignis, sondern ein weiblicher kardiovaskulärer Risikomarker. Sie gehört in jede Risikostratifizierung – mit strukturierter Blutdruck-, Stoffwechsel- und gegebenenfalls echokardiographischer Nachsorge.",
    },
  },

  faq: {
    eyebrow: "Häufige Fragen",
    title: "Kurz nachgefragt",
    items: [
      {
        q: "Ist die Plazenta die Ursache oder das Opfer?",
        a: "Beides in Reihenfolge. Die gestörte Trophoblasteninvasion in der frühen Schwangerschaft ist die primäre Störung, die daraus folgende Ischämie macht die Plazenta zum Sender anti-angiogener Faktoren. Die mütterliche Prädisposition entscheidet mit darüber, wie stark das System darauf reagiert.",
      },
      {
        q: "Warum hilft die Entbindung?",
        a: "Weil sie die Quelle entfernt. sFlt-1 hat eine Halbwertszeit von Stunden, entsprechend erholt sich die endotheliale Funktion nach Entfernung der Plazenta meist rasch. Die strukturellen kardialen und vaskulären Veränderungen bilden sich jedoch nicht in gleichem Tempo zurück.",
      },
      {
        q: "Wofür ist der sFlt-1/PlGF-Quotient gut?",
        a: "Vor allem als Ausschlussmarker: ein niedriger Quotient macht eine Präeklampsie in den kommenden Tagen sehr unwahrscheinlich und erspart Hospitalisierungen. Ein hoher Quotient zeigt den anti-angiogenen Shift und geht einer klinischen Manifestation oft voraus.",
      },
      {
        q: "Warum ist die LVEF hier kein guter Marker?",
        a: "Weil sie ein Volumenverhältnis misst und beim konzentrisch remodellierten, steifen Ventrikel lange normal bleibt. GLS, E/e' und LAVI erfassen die zugrunde liegende Störung deutlich früher.",
      },
      {
        q: "Warum die Analogie zu Tyrosinkinase-Inhibitoren?",
        a: "Weil sie denselben Signalweg treffen. Anti-VEGF-Therapien in der Onkologie erzeugen Hypertonie, Proteinurie und kardiale Dysfunktion – dieselbe Trias wie die Präeklampsie. Das ist der pharmakologische Beweis dafür, dass die VEGF-Blockade allein diese Klinik erzeugen kann.",
      },
    ],
  },

  glossary: {
    sflt: {
      term: "sFlt-1",
      text: "Soluble fms-like tyrosine kinase-1: lösliche Ektodomäne des VEGF-Rezeptors 1, die zirkulierendes VEGF und PlGF abfängt.",
    },
    seng: {
      term: "sEng",
      text: "Soluble Endoglin: löslicher TGF-β-Co-Rezeptor, verstärkt die endotheliale Dysfunktion synergistisch zu sFlt-1.",
    },
    vegf: {
      term: "VEGF",
      text: "Vascular Endothelial Growth Factor: Überlebens- und Erhaltungssignal für das differenzierte, besonders fenestrierte Endothel.",
    },
    plgf: {
      term: "PlGF",
      text: "Placental Growth Factor: plazentares VEGF-Familienmitglied, bei Präeklampsie typischerweise erniedrigt.",
    },
    enos: {
      term: "eNOS",
      text: "Endotheliale NO-Synthase: bildet Stickstoffmonoxid und ist der zentrale Vasodilatationsschalter des Endothels.",
    },
    svr: {
      term: "SVR",
      text: "Systemic Vascular Resistance: systemischer vaskulärer Widerstand, entspricht der Nachlast des linken Ventrikels.",
    },
    gls: {
      term: "GLS",
      text: "Global Longitudinal Strain: Maß der longitudinalen Myokardverkürzung, sensitiver als die Auswurffraktion.",
    },
    ee: {
      term: "E/e'",
      text: "Verhältnis aus früher Mitraleinstromgeschwindigkeit und Gewebedoppler des Mitralklappenrings – Surrogat des linksventrikulären Füllungsdrucks.",
    },
    lavi: {
      term: "LAVI",
      text: "Left Atrial Volume Index: auf die Körperoberfläche indiziertes linksatriales Volumen, Marker chronischer diastolischer Belastung.",
    },
    hfpef: {
      term: "HFpEF",
      text: "Heart Failure with preserved Ejection Fraction: Herzinsuffizienz bei erhaltener Auswurffraktion, typische Spätfolge diastolischer Dysfunktion.",
    },
    ees: {
      term: "Ees",
      text: "Endsystolische Elastance: lastunabhängiges Maß der ventrikulären Kontraktilität.",
    },
    ea: {
      term: "Ea",
      text: "Arterielle Elastance: Maß der effektiven arteriellen Last, die dem Ventrikel entgegensteht.",
    },
  },

  references: {
    eyebrow: "Grundlage",
    title: "Quellen und weiterführende Literatur",
    glossaryTitle: "Glossar",
    note: "Die Darstellungen sind didaktische Vereinfachungen. Zahlenwerte sind typische Größenordnungen aus der Literatur, keine Grenzwerte für die klinische Entscheidung. Jede Aussage dieses Moduls wurde gegen die folgenden Primär- und Übersichtsarbeiten geprüft.",
    items: references,
  },

  footer: {
    disclaimerTitle: "Medizinischer Hinweis",
    disclaimer:
      "Dieses Projekt dient ausschließlich der medizinischen Aus- und Weiterbildung. Es ersetzt weder eine ärztliche Beratung noch eine Diagnose oder Behandlung. Bei Beschwerden in der Schwangerschaft wende dich bitte umgehend an deine Ärztin oder deinen Arzt.",
    rights: "Interaktives Lernmodul zur Pathophysiologie der Präeklampsie.",
    scrollHint: "Scrollen für den nächsten Schritt",
  },

  common: {
    stepOf: "Schritt",
    of: "von",
    compare: "Vergleich",
    normal: "Normale Schwangerschaft",
    pe: "Präeklampsie",
    switchTo: "Umschalten auf",
    keyPoint: "Kernaussage",
    sourcesLabel: "Belege",
  },
};

export type Dictionary = typeof de;
