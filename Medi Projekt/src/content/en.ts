import type { Dictionary } from "./de";
import { references } from "./de";

export const en: Dictionary = {
  meta: {
    title: "Understanding Preeclampsia – Interactive Pathophysiology",
    description:
      "An interactive journey through the pathophysiology of preeclampsia: from haemodynamic adaptation and the anti-angiogenic shift to long-term cardiovascular risk.",
  },

  nav: {
    brand: "Preeclampsia",
    brandSub: "Pathophysiology, interactive",
    chapters: [
      { id: "haemodynamik", short: "01", label: "Adaptation" },
      { id: "plazenta", short: "02", label: "Placenta" },
      { id: "endothel", short: "03", label: "Endothelium" },
      { id: "herz", short: "04", label: "Heart" },
      { id: "langzeit", short: "05", label: "Long-term risk" },
    ],
    modeLabel: "Mode",
    modeNormal: "Normal pregnancy",
    modePe: "Preeclampsia",
    modeNormalShort: "Normal",
    modePeShort: "Preeclampsia",
    langLabel: "Language",
    menu: "Menu",
  },

  hero: {
    eyebrow: "Interactive learning module",
    title: "Preeclampsia is a vascular disease – the placenta is only the trigger.",
    lead: "Follow one continuous thread: from the placental anti-angiogenic shift through systemic endothelial dysfunction to maladaptive cardiac remodeling. A single switch flips every visualisation between healthy pregnancy and preeclampsia.",
    ctaPrimary: "Start the journey",
    ctaSecondary: "Jump to the dual-hit model",
    hint: "Tip: the mode switch in the header changes every graphic at once.",
    stats: [
      { value: "+50%", label: "Plasma volume in pregnancy" },
      { value: "+30–50%", label: "Rise in cardiac output" },
      { value: "2–4×", label: "Cardiovascular risk afterwards" },
    ],
  },

  body: {
    eyebrow: "Orientation",
    title: "One organ system, three stages",
    lead: "Preeclampsia plays out in three places at once: the trigger arises in the placenta, the vascular system distributes it, and the heart is where it becomes haemodynamically visible. Pick a stage to jump straight there.",
    hotspots: [
      {
        id: "herz",
        title: "Heart",
        text: "Volume load meets elevated afterload – concentric remodeling and diastolic dysfunction.",
      },
      {
        id: "endothel",
        title: "Vascular system",
        text: "Systemic endothelial dysfunction: vasoconstriction, capillary leak, procoagulant state.",
      },
      {
        id: "plazenta",
        title: "Uterus & Placenta",
        text: "Impaired trophoblast invasion, ischaemic placenta, release of sFlt-1 and sEng.",
      },
    ],
    fallbackNote: "Simplified view – the 3D scene is disabled on this device.",
    loading: "Loading model …",
    rotateHint: "Drag to rotate",
  },

  ch1: {
    id: "haemodynamik",
    sources: [6, 13, 1],
    eyebrow: "Chapter 01 · Physiology",
    title: "Haemodynamic adaptation – and the concept of unmasking",
    lead: "A normal pregnancy is a months-long cardiovascular stress test. Those who pass it have reserve. Those who fail it most likely never had it.",
    steps: [
      {
        id: "volume",
        title: "A massive volume load",
        text: "In a normal pregnancy, plasma volume rises by up to 50% and cardiac output by 30–50%. This preload increase is the physiological basis of haemodynamic adaptation.",
        tone: "normal" as const,
      },
      {
        id: "resistance",
        title: "Resistance has to fall",
        titlePe: "Resistance does not fall",
        text: "Systemic vascular resistance (total peripheral resistance) falls at the beginning of pregnancy and reaches its nadir in the second trimester (around weeks 14 to 24). Thereafter it rises again towards the third trimester and delivery, returning to pre-pregnancy values.",
        textPe:
          "The early protective vasodilation is reduced. Vascular resistance falls markedly less than in healthy pregnant women. Instead of the second-trimester nadir, a crossover phenomenon occurs: from weeks 20 to 24, resistance in patients with preeclampsia rises steeply and prematurely. As endothelial dysfunction becomes profound, the vessels constrict massively. TPR overshoots well above normal values.",
      },
      {
        id: "pressure",
        title: "Blood pressure stays low",
        titlePe: "Pathological rise in blood pressure",
        text: "Despite a markedly higher output, mean arterial pressure even falls slightly in the second trimester. MAP = CO × SVR only balances because both factors move in opposite directions.",
        textPe:
          "The physiological drop in blood pressure fails to occur in the first and second trimesters (failure to nadir). In the third trimester a massive rise in total peripheral resistance then drives a hypertensive escalation.\n\n**Ohm’s law of the circulation:** blood pressure = cardiac output (CO) × total peripheral resistance (TPR).\n\nBecause TPR rises massively in preeclampsia, blood pressure must rise as well.",
      },
      {
        id: "reserve",
        title: "Intact cardiovascular reserve",
        titlePe: "Unmasking, not coincidence",
        text: "Thanks to intact myocardial and endothelial reserve, the sharp rise in cardiac output in a physiological pregnancy is offset by the fall in peripheral vascular resistance, so that blood pressure remains stable until the end.",
        textPe:
          "Women who develop preeclampsia often have subclinically reduced endothelial and myocardial reserve before conception. Under the extreme load of pregnancy this system decompensates – pregnancy reveals the problem rather than creating it alone.",
      },
    ],
    chart: {
      title: "Course across pregnancy",
      xLabel: "Gestational week",
      yLabel: "Change from pre-pregnancy baseline",
      source:
        "Values as % of the pre-conception baseline. Schematic trajectories anchored to published magnitudes: normal pregnancy after Sanghavi & Rutherford, Circulation 2014 (serial data Robson et al. 1989); preeclampsia profile after Melchiorre, Sharma & Thilaganathan, Circulation 2014.",
      weekLabel: "Week",
      playLabel: "Play the course",
      pauseLabel: "Pause",
      resetLabel: "Reset",
      series: {
        plasma: "Plasma volume",
        co: "Cardiac output",
        svr: "Systemic vascular resistance",
        map: "Mean arterial pressure",
      },
      trimester: ["1st trimester", "2nd trimester", "3rd trimester"],
    },
    mediators: {
      title: "The vasodilators of pregnancy",
      items: [
        {
          abbr: "NO",
          name: "Nitric oxide",
          text: "Produced by the endothelium, diffuses into smooth muscle and lowers tone via cGMP.",
        },
        {
          abbr: "PGI₂",
          name: "Prostacyclin",
          text: "Vasodilatory, inhibits platelet aggregation – its balance with thromboxane tips in preeclampsia.",
        },
        {
          abbr: "RLX",
          name: "Relaxin",
          text: "Increases arterial compliance and renal perfusion early in pregnancy.",
        },
      ],
    },
    callout: {
      title: "The kink in the curve",
      normal: "Systemic vascular resistance (SVR) stays low until term. Preload and afterload remain matched to one another.",
      pe: "From the second trimester onwards systemic vascular resistance (SVR) climbs again instead of staying low. This is exactly where the missing reserve becomes visible – unmasking begins.",
    },
  },

  ch2: {
    id: "plazenta",
    sources: [1, 2, 3, 4, 5, 11],
    eyebrow: "Chapter 02 · Molecular pathogenesis",
    title: "The anti-angiogenic shift – the trigger sits in the placenta",
    lead: "The cause of preeclampsia lies in the placenta, its consequences appear in the maternal vasculature. Between the two sits a soluble receptor.",
    steps: [
      {
        id: "invasion",
        title: "Trophoblast invasion and remodeling",
        text: "Extravillous trophoblast migrates into the uterine spiral arteries and replaces endothelium and smooth muscle.\n\nThe spiral arteries transform from narrow, muscular vessels that respond to vasoconstrictor stimuli into wide, rigid, non-reactive conductance vessels. A low-resistance / high-capacitance system emerges.",
        textPe:
          "Because trophoblast invasion remains too superficial, physiological remodeling of the uterine spiral arteries fails. As their muscular wall stays intact, the vessels retain their narrow calibre and continue to respond to vasoconstrictor stimuli.",
      },
      {
        id: "hypoxia",
        title: "Metabolic stability",
        titlePe: "Hypoxia and oxidative stress",
        text: "Vessel remodeling produces optimal oxygenation and metabolic stability. The wide, vasomotor-inactive artery perfuses continuously and with low resistance. The steady, non-pulsatile blood flow protects the syncytiotrophoblast from oxidative stress.",
        textPe:
          "The narrow, still vasoreactive artery perfuses in bursts. Ischaemia-reperfusion generates massive oxidative stress in the syncytiotrophoblast.",
      },
      {
        id: "release",
        title: "Intact VEGF and PlGF signalling",
        titlePe: "sFlt-1 and sEng are released",
        text: "The optimally perfused placenta releases pro-angiogenic factors into the maternal circulation: VEGF (vascular endothelial growth factor) and PlGF (placental growth factor).",
        textPe:
          "The ischaemic placenta sheds anti-angiogenic factors into the maternal circulation: sFlt-1 (soluble fms-like tyrosine kinase-1) and sEng (soluble endoglin). The anti-angiogenic flood is a molecularly “derailed” compensatory mechanism whose primary aim is to raise maternal blood pressure drastically, in order to force compensation of the placenta’s own underperfusion.",
      },
      {
        id: "block",
        title: "Intact signalling",
        titlePe: "VEGF and PlGF blockade",
        text: "Because sFlt-1 and sEng levels remain physiologically low, VEGF and PlGF bind unimpeded to the maternal endothelium. This preserves an intact TGF-β cascade, maintains endothelial function and guarantees vasodilation through NO production.",
        textPe:
          "sFlt-1 is the soluble ectodomain of VEGF receptor 1. It scavenges VEGF and PlGF systemically before they reach their endothelial receptors. sEng additionally blocks TGF-β signalling.",
      },
    ],
    gauge: {
      title: "sFlt-1 / PlGF ratio",
      caption:
        "Clinically established as a rule-out and prediction marker: low values largely exclude preeclampsia in the short term, high values indicate the anti-angiogenic shift.",
      normalLabel: "Angiogenic balance",
      peLabel: "Anti-angiogenic shift",
      clinical: {
        title: "The clinical biomarker: sFlt-1/PlGF ratio",
        lead: "In clinical practice the anti-angiogenic imbalance is quantified in maternal serum and serves as a highly accurate predictive marker of endothelial failure. Internationally established cut-off values apply (based on the PROGNOSIS study):",
        items: [
          {
            label: "Rule-out (ratio < 38)",
            text: "A value below 38 rules out the occurrence of preeclampsia requiring treatment for the next seven days with nearly 100% certainty (very high negative predictive value).",
            tone: "normal" as const,
          },
          {
            label: "Grey zone (ratio 38–85 or 38–110)",
            text: "An intermediate risk that requires close clinical monitoring.",
            tone: "warn" as const,
          },
          {
            label: "Rule-in (ratio > 85 in early PE <34 weeks / ratio > 110 in late PE ≥34 weeks)",
            text: "This range is highly predictive of established or rapidly evolving preeclampsia and signals imminent endothelial decompensation, which usually requires timely delivery.",
            tone: "pe" as const,
          },
        ],
      },
    },
    analogy: {
      eyebrow: "An analogy from oncology",
      title: "Preeclampsia as an endogenous tyrosine kinase inhibitor",
      text: "The mechanism mirrors that of tyrosine kinase inhibitors (TKIs) that block the VEGF axis in oncology. Their characteristic side effects (severe hypertension, proteinuria and heart failure) are the very same organ manifestations seen in preeclampsia. In effect, the placenta administers an endogenous anti-VEGF therapy.",
      tags: ["Hypertension", "Proteinuria", "Cardiac dysfunction"],
    },
    legend: {
      spiral: "Spiral artery",
      trophoblast: "Trophoblast",
      flow: "Uteroplacental flow",
      sflt: "sFlt-1 / sEng",
      vegf: "VEGF / PlGF",
      villi: "Villi",
      decidua: "Decidua",
      myometrium: "Myometrium",
      hypoxia: "O₂ ↓ · oxidative stress ↑",
      placenta: "Placenta",
      endothelium: "Endothelium",
      maternal: "Maternal circulation",
      capture: "Scavenged before the receptor",
    },
    labels: {
      normalVessel: "Wide low-pressure vessel",
      peVessel: "Narrow, muscular, vasoreactive",
      normalFlow: "Steady perfusion",
      peFlow: "Pulsatile perfusion, ischaemia-reperfusion",
    },
  },

  ch3: {
    id: "endothel",
    sources: [1, 2, 3, 5, 12],
    eyebrow: "Chapter 03 · Systemic effect",
    title: "Systemic endothelial dysfunction",
    lead: "At roughly 7,000 m² the endothelium is the body's largest endocrine organ. Remove its VEGF survival signal and it loses tone control, barrier function and thromboresistance all at once.",
    steps: [
      {
        id: "signal",
        title: "The maintenance signal is intact",
        titlePe: "The survival signal is missing",
        text: "VEGF and PlGF act as permanent maintenance signals that continuously secure the structural and functional integrity of differentiated endothelium and protect it from apoptosis. This applies especially to the highly fenestrated vascular beds of kidney, liver and brain.",
        textPe:
          "If this maintenance signal is lost through systemic blockade, the integrity of these specialised vascular beds collapses. The clinical manifestation appears as glomerular endotheliosis (proteinuria), microvascular liver injury (HELLP syndrome) and breakdown of the blood–brain barrier (eclampsia).",
      },
      {
        id: "enos",
        title: "eNOS is upregulated",
        titlePe: "eNOS is downregulated",
        text: "Driven by the strong VEGF (and relaxin) signal, endothelial NO synthase activity rises massively. Large amounts of NO diffuse into vascular smooth muscle, maintaining a strong and lasting cGMP-mediated relaxation stimulus.",
        textPe:
          "Without VEGF signalling, endothelial NO synthase activity falls. Less NO diffuses into vascular smooth muscle and the cGMP-mediated relaxation stimulus dries up.",
      },
      {
        id: "ros",
        title: "The ROS–NO balance remains stable",
        titlePe: "ROS increase",
        text: "The formation of reactive oxygen species (ROS) is effectively controlled by cellular antioxidants, so that NO is not neutralised and retains high bioavailability. This intact balance produces the profound vasodilation typical of pregnancy.",
        textPe:
          "Reactive oxygen species rise and scavenge the remaining NO into peroxynitrite. The imbalance produces vasoconstriction instead of the vasodilation typical of pregnancy.",
      },
      {
        id: "consequence",
        title: "Three physiological adaptations",
        titlePe: "Three clinical consequences",
        text: "A healthy endothelial layer yields three essential cardiovascular functions for pregnancy: a drastically reduced afterload, an intact vascular barrier (which prevents pathological oedema and proteinuria), and an undisturbed antithrombotic microcirculation.",
        textPe:
          "One cell layer produces three cardinal findings: markedly increased afterload, increased capillary permeability and a procoagulant state.",
      },
    ],
    consequences: [
      {
        id: "afterload",
        title: "Afterload ↑",
        metric: "SVR",
        text: "Vasoconstriction raises systemic vascular resistance. Blood pressure rises. Not because the heart pumps more, but because the vascular bed closes down.",
      },
      {
        id: "permeability",
        title: "Capillary permeability ↑",
        metric: "Oedema · proteinuria",
        text: "Interendothelial junctions open and fluid escapes into the interstitium. In the kidney, glomerular endotheliosis destroys the filtration barrier. Classic proteinuria ensues.",
      },
      {
        id: "coagulation",
        title: "Procoagulant state",
        metric: "Platelets ↓",
        text: "The activated endothelium loses its thromboresistance: platelet activation, consumption and microangiopathic haemolysis, which leads to HELLP syndrome.",
      },
    ],
    legend: {
      lumen: "Lumen",
      endothel: "Endothelial cell",
      smc: "Smooth muscle cell",
      no: "NO",
      ros: "ROS",
      junction: "Cell junction",
      protein: "Albumin",
      platelet: "Platelet",
    },
    labels: {
      normal: "Vasodilation · tight barrier · thromboresistant",
      pe: "Vasoconstriction · leak · procoagulant",
    },
  },

  ch4: {
    id: "herz",
    sources: [1, 7, 14],
    eyebrow: "Chapter 04 · Cardiology",
    title: "Haemodynamic unmasking: failure of ventriculo-arterial coupling",
    lead: "Here the circle closes. A healthy heart handles volume load alone with eccentric remodeling. When the same volume load abruptly meets a steeply increased afterload, ventricle and artery uncouple.",
    steps: [
      {
        id: "eccentric",
        title: "Physiological: eccentric remodeling",
        titlePe: "Pathological: concentric remodeling",
        text: "In healthy pregnancy the volume load produces mild eccentric hypertrophy – the ventricle grows slightly and stays compliant. This is physiological, reversible remodeling.",
        textPe:
          "The volume load meets a massively increased afterload (raised vascular resistance). The heart responds with maladaptive concentric hypertrophy. The ventricular wall thickens, the myocardium loses compliance and diastolic dysfunction develops early.",
      },
      {
        id: "coupling",
        title: "Coupling remains optimal",
        titlePe: "Coupling breaks down",
        text: "In a healthy pregnancy the volume load meets an adaptively lowered arterial elastance (Ea). Ventricle and vasculature adjust in synchrony and continue to operate at the energetically optimal ratio.",
        textPe:
          "In preeclampsia the volume load meets a steeply elevated arterial elastance (Ea) caused by endothelial dysfunction. Ventricle and vasculature no longer operate at the energetically optimal Ea/Ees ratio.",
      },
      {
        id: "concentric",
        title: "Adaptive: eccentric remodeling",
        titlePe: "Maladaptive: concentric remodeling",
        text: "The heart responds with a proportional enlargement of the cavity and only mild wall thickening. Wall stress remains balanced. Elastic distensibility (compliance) is preserved in the long term.",
        textPe:
          "The heart responds with wall thickening at unchanged or reduced cavity size. Wall stress falls in the short term. Stiffness rises permanently.",
      },
      {
        id: "diastole",
        title: "Intact diastolic function",
        titlePe: "Diastolic dysfunction",
        text: "The elastic ventricle takes up the additional volume at unchanged low filling pressures. The heart’s diastolic relaxation capacity remains fully preserved.",
        textPe:
          "The stiff ventricle only fills at higher pressures. Diastolic dysfunction appears early. This is the precursor of HFpEF.",
      },
      {
        id: "echo",
        title: "What echocardiography shows",
        text: "Preserved global longitudinal strain (GLS), a physiologically low E/e' ratio and a normal-sized left atrium (LAVI) as the expression of optimal myocardial and diastolic adaptation.",
        textPe:
          "Reduced global longitudinal strain (GLS), an increased E/e' ratio and an enlarged left atrium (LAVI). Often well before LVEF becomes abnormal at all.",
      },
    ],
    geometry: {
      normalLabel: "Eccentric (physiological)",
      peLabel: "Concentric (maladaptive)",
      normalCaption: "Cavity slightly enlarged, wall thickness nearly unchanged, compliance preserved.",
      peCaption: "Wall thickness increased, relative wall thickness > 0.42, cavity rather small and stiff.",
      wall: "Wall thickness",
      cavity: "Cavity",
      afterload: "Afterload ↑",
    },
    pvloop: {
      title: "Pressure-volume relationship",
      caption:
        "Ees describes ventricular contractility, Ea the load imposed by the arterial system. If Ea rises disproportionately the loop shifts upwards – with falling stroke volume and rising filling pressure.",
      source:
        "Pressure and volume values are didactically chosen orders of magnitude, not measured series. The Ea/Ees cut-off of 0.8 and the preeclampsia profile follow Li et al., The International Journal of Cardiovascular Imaging 2024, complemented by Melchiorre, Sharma & Thilaganathan, Circulation 2014.",
      volume: "Volume (ml)",
      pressure: "Pressure (mmHg)",
      ees: "Ees (contractility)",
      ea: "Ea (arterial load)",
      edpvr: "End-diastolic stiffness",
      couplingLabel: "Ea/Ees",
      explain: {
        normalTitle: "How to read the diagram",
        normal:
          "Each loop corresponds to one cardiac cycle: diastolic filling at the bottom right, the vertical limbs mark isovolumetric contraction and relaxation, the upper segment the ejection phase. The blue line (Ees, end-systolic elastance) quantifies load-independent contractility, the orange line (Ea, arterial elastance) the effective arterial afterload, and the grey curve the end-diastolic pressure-volume relationship (EDPVR) as a measure of passive ventricular compliance. In healthy pregnancy peripheral vasodilation lowers Ea. The Ea/Ees ratio stays well below the clinical cut-off of 0.8. Stroke volume and stroke work remain maximally efficient.",
        peTitle: "Why the loop shifts",
        pe: "Endothelial dysfunction drives the arterial load steeply upwards through raised resistance and arterial stiffening. Once the Ea/Ees ratio reaches the cut-off of 0.8 contractility can no longer keep up adaptively and begins to fail. The loop moves up and becomes narrower: more pressure, less stroke volume, higher filling pressure. Despite high oxygen consumption pump efficiency (GWE) falls. Ventriculo-arterial coupling breaks down.",
      },
    },
    echo: {
      title: "Echocardiographic markers",
      normalCol: "Normal pregnancy",
      peCol: "Preeclampsia",
      items: [
        {
          key: "gls",
          label: "GLS",
          full: "Global longitudinal strain",
          normal: "−20%",
          pe: "−15%",
          hint: "Longitudinal contractile reserve remains intact.",
          hintPe: "More sensitive than LVEF: the longitudinal subendocardial fibres suffer first.",
        },
        {
          key: "ee",
          label: "E/e'",
          full: "Filling pressure surrogate",
          normal: "6",
          pe: "12",
          hint: "Remains physiologically low. An expression of undisturbed myocardial relaxation.",
          hintPe: "Rises with left atrial pressure – an expression of impaired relaxation.",
        },
        {
          key: "lavi",
          label: "LAVI",
          full: "Left atrial volume index",
          normal: "26 ml/m²",
          pe: "38 ml/m²",
          hint: "No pathological chronic pressure load on the atrium.",
          hintPe: "The barometer of chronic diastolic burden.",
        },
        {
          key: "lvef",
          label: "LVEF",
          full: "Ejection fraction",
          normal: "62%",
          pe: "55%",
          hint: "Reflects effortless global pump function.",
          hintPe: "Stays normal for a long time – which makes it the poorest early marker here.",
        },
      ],
    },
  },

  ch5: {
    id: "langzeit",
    sources: [1, 7, 8, 9, 10],
    eyebrow: "Chapter 05 · Long-term perspective",
    title: "The dual-hit model: why the risk persists after delivery",
    lead: "Women after preeclampsia carry a 2- to 4-fold increased risk of chronic hypertension, coronary artery disease, heart failure and stroke. Current literature explains this with a dual-hit model.",
    pillars: [
      {
        id: "shared",
        label: "Pillar 1",
        title: "Shared risk factors – the unmasking",
        text: "Preeclampsia and cardiovascular disease share the same underlying risk factors. Pregnancy is merely the first stress test the patient fails – the predisposition was already there.",
        items: ["Insulin resistance", "Subclinical inflammation", "Dyslipidaemia", "Microangiopathy"],
      },
      {
        id: "scarring",
        label: "Pillar 2",
        title: "Vascular scarring – the direct damage",
        text: "Months of anti-angiogenic and hypertensive storm leave irreversible epigenetic and structural damage in endothelium and myocardium: vascular scarring and accelerated vascular ageing.",
        items: [
          "Epigenetic imprinting",
          "Endothelial scarring",
          "Persistent cardiac remodeling",
          "Arterial stiffening",
        ],
      },
    ],
    timeline: [
      {
        id: "pre",
        label: "Pre-conception",
        title: "Latent vulnerability",
        text: "Subclinically reduced endothelial and myocardial reserve – clinically silent and not measurable in everyday life.",
      },
      {
        id: "preg",
        label: "Pregnancy",
        title: "The stress test",
        text: "Volume load, anti-angiogenic shift, rising afterload. The system decompensates – or it does not.",
      },
      {
        id: "post",
        label: "Postpartum",
        title: "Apparent recovery",
        text: "sFlt-1 falls rapidly once the placenta is delivered and blood pressure usually normalises. Concentric remodeling and diastolic dysfunction, however, persist in a relevant proportion of women.",
      },
      {
        id: "late",
        label: "Years to decades",
        title: "Manifest disease",
        text: "Chronic hypertension, HFpEF, coronary artery disease and cerebrovascular events occur earlier than in the comparison population.",
      },
    ],
    risks: {
      title: "Relative risk after preeclampsia",
      caption: "Orders of magnitude from meta-analyses; the earlier and more severe the preeclampsia, the higher the risk.",
      items: [
        { label: "Chronic hypertension", factor: 3.7 },
        { label: "Heart failure", factor: 4.2 },
        { label: "Coronary artery disease", factor: 2.2 },
        { label: "Stroke", factor: 1.8 },
      ],
    },
    outro: {
      title: "What this means in practice",
      text: "A history of preeclampsia is not a closed obstetric episode but a female cardiovascular risk marker. It belongs in every risk stratification – with structured blood pressure, metabolic and, where indicated, echocardiographic follow-up.",
    },
  },

  faq: {
    eyebrow: "Frequently asked",
    title: "Quick answers",
    items: [
      {
        q: "Is the placenta the cause or the victim?",
        a: "Both, in sequence. Impaired trophoblast invasion in early pregnancy is the primary lesion; the resulting ischaemia turns the placenta into a transmitter of anti-angiogenic factors. Maternal predisposition co-determines how strongly the system reacts.",
      },
      {
        q: "Why does delivery help?",
        a: "Because it removes the source. sFlt-1 has a half-life of hours, so endothelial function usually recovers quickly once the placenta is out. Structural cardiac and vascular changes, however, do not regress at the same pace.",
      },
      {
        q: "What is the sFlt-1/PlGF ratio good for?",
        a: "Mainly as a rule-out marker: a low ratio makes preeclampsia in the coming days very unlikely and avoids hospital admissions. A high ratio signals the anti-angiogenic shift and often precedes clinical manifestation.",
      },
      {
        q: "Why is LVEF a poor marker here?",
        a: "Because it measures a volume ratio and stays normal for a long time in a concentrically remodelled, stiff ventricle. GLS, E/e' and LAVI capture the underlying disturbance far earlier.",
      },
      {
        q: "Why the analogy with tyrosine kinase inhibitors?",
        a: "Because they hit the same pathway. Anti-VEGF therapies in oncology produce hypertension, proteinuria and cardiac dysfunction – the same triad as preeclampsia. That is the pharmacological proof that VEGF blockade alone can generate this clinical picture.",
      },
    ],
  },

  glossary: {
    sflt: {
      term: "sFlt-1",
      text: "Soluble fms-like tyrosine kinase-1: the soluble ectodomain of VEGF receptor 1, which scavenges circulating VEGF and PlGF.",
    },
    seng: {
      term: "sEng",
      text: "Soluble endoglin: a soluble TGF-β co-receptor that amplifies endothelial dysfunction synergistically with sFlt-1.",
    },
    vegf: {
      term: "VEGF",
      text: "Vascular endothelial growth factor: survival and maintenance signal for differentiated, particularly fenestrated endothelium.",
    },
    plgf: {
      term: "PlGF",
      text: "Placental growth factor: a placental member of the VEGF family, typically reduced in preeclampsia.",
    },
    enos: {
      term: "eNOS",
      text: "Endothelial NO synthase: produces nitric oxide and is the endothelium's central vasodilation switch.",
    },
    svr: {
      term: "SVR",
      text: "Systemic vascular resistance: corresponds to left ventricular afterload.",
    },
    gls: {
      term: "GLS",
      text: "Global longitudinal strain: a measure of longitudinal myocardial shortening, more sensitive than ejection fraction.",
    },
    ee: {
      term: "E/e'",
      text: "Ratio of early mitral inflow velocity to mitral annular tissue Doppler velocity – a surrogate of left ventricular filling pressure.",
    },
    lavi: {
      term: "LAVI",
      text: "Left atrial volume index: left atrial volume indexed to body surface area, a marker of chronic diastolic burden.",
    },
    hfpef: {
      term: "HFpEF",
      text: "Heart failure with preserved ejection fraction: a typical late consequence of diastolic dysfunction.",
    },
    ees: {
      term: "Ees",
      text: "End-systolic elastance: a load-independent measure of ventricular contractility.",
    },
    ea: {
      term: "Ea",
      text: "Arterial elastance: a measure of the effective arterial load opposing the ventricle.",
    },
  },

  references: {
    eyebrow: "Foundation",
    title: "Sources and further reading",
    glossaryTitle: "Glossary",
    note: "All visualisations are didactic simplifications. Numeric values are typical orders of magnitude from the literature, not thresholds for clinical decisions. Every statement in this module was checked against the primary and review articles below.",
    items: references,
  },

  footer: {
    disclaimerTitle: "Medical disclaimer",
    disclaimer:
      "This project serves medical education only. It does not replace medical advice, diagnosis or treatment. If you experience symptoms during pregnancy, please contact your doctor immediately.",
    rights: "Interactive learning module on the pathophysiology of preeclampsia.",
    scrollHint: "Scroll for the next step",
  },

  common: {
    stepOf: "Step",
    of: "of",
    compare: "Comparison",
    normal: "Normal pregnancy",
    pe: "Preeclampsia",
    switchTo: "Switch to",
    keyPoint: "Key point",
    sourcesLabel: "Sources",
  },
};
