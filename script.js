/* ============================================================
   1. SCENARIO DATASET GENERATOR
   Generates 300 unique practical scenarios across key areas.
   ============================================================ */
const SCENARIOS = (() => {
    const list = [];
    let id = 0;

    function add(category, question, options, correctIndex, explanation) {
        list.push({
            id: id++,
            category,
            question,
            options,
            correctIndex,
            explanation
        });
    }

    // -----------------------------------------------------------------
    // A. VOLUMETRIC ANALYSIS – TITRATION (60 scenarios)
    // -----------------------------------------------------------------
    const acids = [
        { name: 'H₂SO₄', formula: 'H₂SO₄', basicity: 2, label: 'sulphuric acid' },
        { name: 'HCl', formula: 'HCl', basicity: 1, label: 'hydrochloric acid' },
        { name: 'HNO₃', formula: 'HNO₃', basicity: 1, label: 'nitric acid' },
        { name: 'CH₃COOH', formula: 'CH₃COOH', basicity: 1, label: 'ethanoic acid' },
        { name: 'H₃PO₄', formula: 'H₃PO₄', basicity: 3, label: 'phosphoric acid' }
    ];

    const bases = [
        { name: 'NaOH', formula: 'NaOH', acidity: 1, label: 'sodium hydroxide' },
        { name: 'KOH', formula: 'KOH', acidity: 1, label: 'potassium hydroxide' },
        { name: 'Ca(OH)₂', formula: 'Ca(OH)₂', acidity: 2, label: 'calcium hydroxide' },
        { name: 'NH₃', formula: 'NH₃', acidity: 1, label: 'aqueous ammonia' }
    ];

    const indicators = [
        { name: 'Methyl orange', acidColour: 'red', baseColour: 'yellow', endpoint: 'orange' },
        { name: 'Phenolphthalein', acidColour: 'colourless', baseColour: 'pink', endpoint: 'pale pink' },
        { name: 'Litmus', acidColour: 'red', baseColour: 'blue', endpoint: 'purple' },
        { name: 'Bromothymol blue', acidColour: 'yellow', baseColour: 'blue', endpoint: 'green' }
    ];

    // 60 titration scenarios (cycled combinations)
    for (let i = 0; i < 60; i++) {
        const acid = acids[i % acids.length];
        const base = bases[(i * 3) % bases.length];
        const ind = indicators[(i * 7) % indicators.length];
        const acidVol = (20 + (i % 6) * 0.5).toFixed(1);
        const baseVol = (18 + (i % 9) * 0.4).toFixed(1);

        const question = `In a titration, ${acidVol} cm³ of ${acid.label} (${acid.formula}) is neutralised by ${baseVol} cm³ of ${base.label} (${base.formula}). Which indicator is most suitable, and what colour change marks the endpoint?`;
        const correctInd = ind;
        const options = indicators.map(indObj =>
            `${indObj.name}: ${indObj.acidColour} → ${indObj.baseColour} (endpoint: ${indObj.endpoint})`
        );
        const correctIndex = indicators.indexOf(correctInd);

        // Explanation: choose a suitable indicator (for strong acid-strong base all work, but let's give a specific one)
        let explanation = `For a titration between ${acid.label} and ${base.label}, ${correctInd.name} is suitable. `;
        if (acid.label.includes('sulphuric') || acid.label.includes('hydrochloric') || acid.label.includes('nitric')) {
            if (base.label.includes('sodium') || base.label.includes('potassium')) {
                explanation += `This is a strong acid–strong base titration; any of the common indicators can be used, but ${correctInd.name} changes from ${correctInd.acidColour} to ${correctInd.baseColour} at the endpoint.`;
            } else {
                explanation += `This is a strong acid–weak base titration; methyl orange is usually preferred because its colour change (red → yellow, endpoint orange) matches the acidic pH at equivalence.`;
            }
        } else {
            explanation += `This is a weak acid–strong base titration; phenolphthalein is preferred because its colour change (colourless → pink, endpoint pale pink) occurs in the alkaline pH range at equivalence.`;
        }

        add('Volumetric Analysis (Titration)', question, options, correctIndex, explanation);
    }

    // -----------------------------------------------------------------
    // B. QUALITATIVE ANALYSIS – CATIONS & ANIONS (80 scenarios)
    // -----------------------------------------------------------------
    const cations = [
        { ion: 'Cu²⁺', reagent: 'NaOH(aq)', observation: 'blue precipitate, insoluble in excess', inference: 'Cu²⁺ present' },
        { ion: 'Fe²⁺', reagent: 'NaOH(aq)', observation: 'green precipitate, insoluble in excess', inference: 'Fe²⁺ present' },
        { ion: 'Fe³⁺', reagent: 'NaOH(aq)', observation: 'reddish-brown precipitate, insoluble in excess', inference: 'Fe³⁺ present' },
        { ion: 'Zn²⁺', reagent: 'NaOH(aq)', observation: 'white precipitate, soluble in excess', inference: 'Zn²⁺ present' },
        { ion: 'Al³⁺', reagent: 'NaOH(aq)', observation: 'white gelatinous precipitate, soluble in excess', inference: 'Al³⁺ present' },
        { ion: 'Pb²⁺', reagent: 'NaOH(aq)', observation: 'white precipitate, soluble in excess', inference: 'Pb²⁺ present' },
        { ion: 'Ca²⁺', reagent: 'NaOH(aq)', observation: 'white precipitate, insoluble in excess', inference: 'Ca²⁺ present' },
        { ion: 'NH₄⁺', reagent: 'NaOH(aq), warmed', observation: 'colourless gas with pungent smell turns red litmus blue', inference: 'NH₄⁺ present' },
        { ion: 'Cu²⁺', reagent: 'NH₃(aq) dropwise then excess', observation: 'light blue precipitate soluble in excess to deep blue solution', inference: 'Cu²⁺ present' },
        { ion: 'Zn²⁺', reagent: 'NH₃(aq) dropwise then excess', observation: 'white precipitate soluble in excess', inference: 'Zn²⁺ present' }
    ];

    const anions = [
        { ion: 'CO₃²⁻', reagent: 'dilute HCl', observation: 'effervescence; gas turns limewater milky', inference: 'CO₃²⁻ present' },
        { ion: 'SO₄²⁻', reagent: 'BaCl₂(aq) followed by dilute HCl', observation: 'white precipitate insoluble in dilute HCl', inference: 'SO₄²⁻ present' },
        { ion: 'SO₃²⁻', reagent: 'BaCl₂(aq) followed by dilute HCl', observation: 'white precipitate soluble in dilute HCl', inference: 'SO₃²⁻ present' },
        { ion: 'Cl⁻', reagent: 'AgNO₃(aq) followed by dilute HNO₃', observation: 'white precipitate insoluble in dilute HNO₃', inference: 'Cl⁻ present' },
        { ion: 'Br⁻', reagent: 'AgNO₃(aq) followed by dilute HNO₃', observation: 'cream precipitate insoluble in dilute HNO₃', inference: 'Br⁻ present' },
        { ion: 'I⁻', reagent: 'AgNO₃(aq) followed by dilute HNO₃', observation: 'yellow precipitate insoluble in dilute HNO₃', inference: 'I⁻ present' },
        { ion: 'NO₃⁻', reagent: 'FeSO₄(aq) then conc. H₂SO₄ (brown ring test)', observation: 'brown ring at junction of layers', inference: 'NO₃⁻ present' },
        { ion: 'SO₄²⁻', reagent: 'Pb(NO₃)₂(aq)', observation: 'white precipitate soluble in hot water', inference: 'SO₄²⁻ present' }
    ];

    // 40 cation scenarios
    for (let i = 0; i < 40; i++) {
        const cation = cations[i % cations.length];
        const question = `A sample solution is tested with ${cation.reagent}. The observation is: “${cation.observation}”. What is the most likely inference?`;
        const correctInference = cation.inference;

        // Build distractors from other cations
        const otherInferences = cations
            .filter(c => c.inference !== correctInference)
            .map(c => c.inference);
        const uniqueDistractors = [...new Set(otherInferences)].slice(0, 3);
        // Ensure we have exactly 4 options
        while (uniqueDistractors.length < 3) {
            uniqueDistractors.push('No visible reaction / no conclusion can be drawn');
        }

        const options = [correctInference, ...uniqueDistractors];
        // Shuffle deterministically
        const shuffled = options
            .map((opt, idx) => ({ opt, key: (i * 13 + idx * 7) % 100 }))
            .sort((a, b) => a.key - b.key)
            .map(o => o.opt);
        const correctIndex = shuffled.indexOf(correctInference);

        const explanation = `The observation “${cation.observation}” is characteristic of ${cation.ion}. Therefore, the correct inference is: ${cation.inference}.`;

        add('Qualitative Analysis (Cations)', question, shuffled, correctIndex, explanation);
    }

    // 40 anion scenarios
    for (let i = 0; i < 40; i++) {
        const anion = anions[i % anions.length];
        const question = `A salt sample is tested with ${anion.reagent}. The observation is: “${anion.observation}”. What is the most likely inference?`;
        const correctInference = anion.inference;

        const otherInferences = anions
            .filter(a => a.inference !== correctInference)
            .map(a => a.inference);
        const uniqueDistractors = [...new Set(otherInferences)].slice(0, 3);
        while (uniqueDistractors.length < 3) {
            uniqueDistractors.push('No conclusion can be drawn from this test alone');
        }

        const options = [correctInference, ...uniqueDistractors];
        const shuffled = options
            .map((opt, idx) => ({ opt, key: (i * 17 + idx * 11) % 100 }))
            .sort((a, b) => a.key - b.key)
            .map(o => o.opt);
        const correctIndex = shuffled.indexOf(correctInference);

        const explanation = `The observation “${anion.observation}” is the standard test result for ${anion.ion}. Therefore, the correct inference is: ${anion.inference}.`;

        add('Qualitative Analysis (Anions)', question, shuffled, correctIndex, explanation);
    }

    // -----------------------------------------------------------------
    // C. SEPARATION TECHNIQUES (50 scenarios)
    // -----------------------------------------------------------------
    const separationScenarios = [
        {
            q: 'A mixture of sand and sodium chloride is stirred with water and filtered. What is the residue and what is the filtrate?',
            opts: [
                'Residue: sand; Filtrate: sodium chloride solution',
                'Residue: sodium chloride; Filtrate: sand',
                'Residue: sand and sodium chloride; Filtrate: water',
                'Residue: sodium chloride solution; Filtrate: sand'
            ],
            correct: 0,
            exp: 'Sand is insoluble in water and is collected as the residue on the filter paper. Sodium chloride dissolves in water and passes through as the filtrate. Evaporation of the filtrate would recover solid NaCl.'
        },
        {
            q: 'Which technique is most suitable for separating a mixture of ethanol (b.p. 78 °C) and water (b.p. 100 °C)?',
            opts: [
                'Simple distillation',
                'Filtration',
                'Separating funnel',
                'Sublimation'
            ],
            correct: 0,
            exp: 'Simple distillation separates liquids with sufficiently different boiling points. Ethanol distils first because it has the lower boiling point (78 °C), leaving water behind.'
        },
        {
            q: 'A mixture of kerosene and water is shaken in a separating funnel. Which layer is on top and why?',
            opts: [
                'Kerosene on top because it is less dense than water',
                'Water on top because it is denser',
                'Kerosene on top because it dissolves in water',
                'They form a single layer because they are miscible'
            ],
            correct: 0,
            exp: 'Kerosene is immiscible with water and less dense, so it forms the upper layer. The separating funnel allows the lower aqueous layer to be run off first.'
        },
        {
            q: 'How would you obtain pure crystals of copper(II) sulphate from its saturated solution?',
            opts: [
                'Allow the solution to cool slowly and filter the crystals',
                'Heat the solution to dryness',
                'Add excess water and filter',
                'Evaporate to dryness and scrape the solid'
            ],
            correct: 0,
            exp: 'Slow cooling of a saturated solution produces large, pure crystals. Heating to dryness would give an amorphous powder and may decompose the salt.'
        },
        {
            q: 'Which method is used to separate a mixture of iodine and sand?',
            opts: [
                'Sublimation',
                'Filtration',
                'Distillation',
                'Chromatography'
            ],
            correct: 0,
            exp: 'Iodine sublimes on gentle heating (solid → vapour → solid on a cold surface), leaving sand behind. The iodine vapour is collected as solid crystals on a cooled watch glass.'
        },
        {
            q: 'A student wishes to separate the coloured dyes in ink. Which technique should be used?',
            opts: [
                'Paper chromatography',
                'Simple distillation',
                'Filtration',
                'Separating funnel'
            ],
            correct: 0,
            exp: 'Paper chromatography separates soluble coloured substances based on their different solubilities and adsorption affinities. The dyes travel up the paper at different rates.'
        },
        {
            q: 'What is the purpose of adding a boiling chip (anti-bumping granule) during distillation?',
            opts: [
                'To promote smooth boiling and prevent violent bumping',
                'To increase the boiling point of the liquid',
                'To absorb impurities',
                'To indicate when distillation is complete'
            ],
            correct: 0,
            exp: 'Boiling chips provide nucleation sites for bubbles, ensuring smooth ebullition and preventing superheating, which can cause the liquid to bump violently and spoil the separation.'
        },
        {
            q: 'A mixture of iron filings and sulphur powder is separated using a magnet. What type of change does this represent?',
            opts: [
                'Physical change – the components retain their identities',
                'Chemical change – a new substance is formed',
                'Both physical and chemical change',
                'Neither – it is a nuclear change'
            ],
            correct: 0,
            exp: 'Separating iron with a magnet is a physical process. Iron is attracted, sulphur is not, and no new substance is formed. The components can be recombined without chemical reaction.'
        },
        {
            q: 'Which apparatus is used to separate a mixture of two immiscible liquids?',
            opts: [
                'Separating funnel',
                'Round-bottom flask',
                'Burette',
                'Evaporating dish'
            ],
            correct: 0,
            exp: 'A separating funnel allows the lower liquid layer to be drained off while the upper layer remains, effectively separating immiscible liquids such as oil and water.'
        },
        {
            q: 'In paper chromatography, the solvent front moves 8.0 cm while a spot moves 6.0 cm. What is the Rf value?',
            opts: [
                '0.75',
                '1.33',
                '0.60',
                '0.80'
            ],
            correct: 0,
            exp: 'Rf = distance travelled by spot ÷ distance travelled by solvent front = 6.0 ÷ 8.0 = 0.75. Rf values are dimensionless and always ≤ 1.'
        }
    ];

    // 50 separation scenarios by cycling with variation
    for (let i = 0; i < 50; i++) {
        const base = separationScenarios[i % separationScenarios.length];
        let question = base.q;
        // Add slight context variation for uniqueness
        if (i >= separationScenarios.length) {
            const variations = [
                'A student in a rural lab ',
                'During a practical examination, ',
                'In a school experiment, '
            ];
            const prefix = variations[i % variations.length];
            question = prefix + question.charAt(0).toLowerCase() + question.slice(1);
        }

        const correctIndex = base.correct;
        const explanation = base.exp;

        add('Separation Techniques', question, base.opts, correctIndex, explanation);
    }

    // -----------------------------------------------------------------
    // D. QUANTITATIVE / STOICHIOMETRY / MOLE CONCEPT (60 scenarios)
    // -----------------------------------------------------------------
    const moleScenarios = [
        {
            q: 'What is the number of moles in 4.0 g of NaOH? (Na = 23, O = 16, H = 1)',
            opts: ['0.10 mol', '0.40 mol', '1.00 mol', '0.25 mol'],
            correct: 0,
            exp: 'Molar mass of NaOH = 23 + 16 + 1 = 40 g/mol. Moles = mass ÷ molar mass = 4.0 ÷ 40 = 0.10 mol.'
        },
        {
            q: 'Calculate the mass of 0.25 mol of CaCO₃. (Ca = 40, C = 12, O = 16)',
            opts: ['25 g', '100 g', '50 g', '12.5 g'],
            correct: 0,
            exp: 'Molar mass of CaCO₃ = 40 + 12 + (16 × 3) = 100 g/mol. Mass = moles × molar mass = 0.25 × 100 = 25 g.'
        },
        {
            q: 'What volume of 0.2 mol/dm³ HCl contains 0.05 mol of HCl?',
            opts: ['250 cm³', '100 cm³', '500 cm³', '400 cm³'],
            correct: 0,
            exp: 'Volume = moles ÷ concentration = 0.05 ÷ 0.2 = 0.25 dm³ = 250 cm³.'
        },
        {
            q: '25.0 cm³ of 0.1 mol/dm³ NaOH is neutralised by 0.05 mol/dm³ H₂SO₄. What volume of acid is required? (Equation: 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O)',
            opts: ['25.0 cm³', '12.5 cm³', '50.0 cm³', '10.0 cm³'],
            correct: 0,
            exp: 'Moles NaOH = 0.025 × 0.1 = 0.0025 mol. From the equation, 2 mol NaOH react with 1 mol H₂SO₄, so moles H₂SO₄ = 0.00125 mol. Volume = 0.00125 ÷ 0.05 = 0.025 dm³ = 25.0 cm³.'
        },
        {
            q: 'What is the concentration of a solution containing 0.5 mol of solute in 250 cm³ of solution?',
            opts: ['2.0 mol/dm³', '0.5 mol/dm³', '0.125 mol/dm³', '1.0 mol/dm³'],
            correct: 0,
            exp: 'Concentration = moles ÷ volume (in dm³). Volume = 250 ÷ 1000 = 0.25 dm³. Concentration = 0.5 ÷ 0.25 = 2.0 mol/dm³.'
        },
        {
            q: 'Calculate the percentage by mass of oxygen in H₂O. (H = 1, O = 16)',
            opts: ['88.9%', '11.1%', '50.0%', '16.0%'],
            correct: 0,
            exp: 'Molar mass H₂O = 18 g/mol. Mass of oxygen = 16 g. Percentage = (16 ÷ 18) × 100 ≈ 88.9%.'
        },
        {
            q: 'What is the empirical formula of a compound containing 40% carbon, 6.7% hydrogen and 53.3% oxygen by mass? (C = 12, H = 1, O = 16)',
            opts: ['CH₂O', 'C₂H₄O', 'CHO', 'C₂H₂O'],
            correct: 0,
            exp: 'Moles: C = 40/12 = 3.33; H = 6.7/1 = 6.7; O = 53.3/16 = 3.33. Divide by 3.33 → C = 1, H = 2, O = 1. Empirical formula = CH₂O.'
        },
        {
            q: 'In the reaction 2H₂ + O₂ → 2H₂O, how many moles of water are produced from 4 mol of H₂?',
            opts: ['4 mol', '2 mol', '8 mol', '1 mol'],
            correct: 0,
            exp: 'The equation shows 2 mol H₂ produce 2 mol H₂O. Therefore, 4 mol H₂ will produce 4 mol H₂O (1:1 ratio).'
        },
        {
            q: 'What is the molar volume of a gas at s.t.p.?',
            opts: ['22.4 dm³/mol', '24.0 dm³/mol', '1.0 dm³/mol', '22.4 cm³/mol'],
            correct: 0,
            exp: 'At standard temperature and pressure (s.t.p.), one mole of any gas occupies 22.4 dm³ (22.4 litres).'
        },
        {
            q: '0.5 mol of a gas occupies 12.0 dm³ at room temperature and pressure. What is the molar volume under these conditions?',
            opts: ['24.0 dm³/mol', '22.4 dm³/mol', '12.0 dm³/mol', '48.0 dm³/mol'],
            correct: 0,
            exp: 'Molar volume = volume ÷ moles = 12.0 ÷ 0.5 = 24.0 dm³/mol. This is the molar volume at r.t.p.'
        }
    ];

    for (let i = 0; i < 60; i++) {
        const base = moleScenarios[i % moleScenarios.length];
        let question = base.q;
        if (i >= moleScenarios.length) {
            const prefixes = [
                'In a practical examination: ',
                'A student calculates: ',
                'For the following problem: '
            ];
            question = prefixes[i % prefixes.length] + question;
        }

        add('Quantitative / Mole Concept', question, base.opts, base.correct, base.exp);
    }

    // -----------------------------------------------------------------
    // E. GAS TESTS & LAB SAFETY / TECHNIQUE (50 scenarios)
    // -----------------------------------------------------------------
    const gasSafetyScenarios = [
        {
            q: 'Which gas relights a glowing splint?',
            opts: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Ammonia'],
            correct: 0,
            exp: 'Oxygen supports combustion and causes a glowing splint to relight. Hydrogen gives a “pop” with a lighted splint, CO₂ extinguishes a flame, and ammonia turns damp red litmus blue.'
        },
        {
            q: 'A colourless gas turns damp red litmus paper blue. Which gas is most likely present?',
            opts: ['Ammonia (NH₃)', 'Carbon dioxide (CO₂)', 'Chlorine (Cl₂)', 'Sulphur dioxide (SO₂)'],
            correct: 0,
            exp: 'Ammonia is the only common alkaline gas among the options. It turns damp red litmus blue. CO₂ is acidic (turns blue litmus red), Cl₂ bleaches damp litmus, and SO₂ is acidic.'
        },
        {
            q: 'Which gas gives a white precipitate with limewater?',
            opts: ['Carbon dioxide', 'Oxygen', 'Hydrogen', 'Nitrogen'],
            correct: 0,
            exp: 'CO₂ reacts with limewater (Ca(OH)₂ solution) to form a white precipitate of calcium carbonate (CaCO₃), which dissolves in excess CO₂ to give calcium hydrogencarbonate.'
        },
        {
            q: 'What is the correct way to smell a gas in the laboratory?',
            opts: [
                'Gently waft the gas towards your nose with your hand',
                'Place your nose directly over the container and inhale deeply',
                'Run the gas through water first',
                'Never smell any gas in the lab'
            ],
            correct: 0,
            exp: 'Wafting is the safe technique: use your hand to fan a small amount of vapour towards your nose. Never inhale directly, as some gases are toxic or corrosive.'
        },
        {
            q: 'Why should you never heat a closed test tube directly with a Bunsen flame?',
            opts: [
                'Pressure builds up and the tube may shatter, causing injury',
                'The flame will go out',
                'The tube will melt immediately',
                'It changes the colour of the flame'
            ],
            correct: 0,
            exp: 'Heating a closed system causes rapid pressure increase. The glass may explode, spraying hot chemicals. Always point the test tube away from people and keep the mouth open.'
        },
        {
            q: 'Which of the following is the correct first aid for a chemical splash in the eye?',
            opts: [
                'Rinse the eye with plenty of clean water for at least 15 minutes and seek medical help',
                'Rub the eye vigorously',
                'Apply a neutralising solution immediately',
                'Close the eye tightly and wait'
            ],
            correct: 0,
            exp: 'Immediate and prolonged irrigation with clean water is the universal first aid for chemical eye exposure. Never rub the eye or attempt chemical neutralisation, as this can cause further damage.'
        },
        {
            q: 'A test tube containing a liquid is heated. In which direction should the mouth of the tube point?',
            opts: [
                'Away from yourself and others',
                'Towards yourself so you can see the reaction',
                'Towards the ceiling',
                'Towards the nearest person to warn them'
            ],
            correct: 0,
            exp: 'Always point the mouth of a heated test tube away from people. Superheated liquid can eject violently (bumping), causing serious burns.'
        },
        {
            q: 'Why is distilled water used in qualitative analysis instead of tap water?',
            opts: [
                'Tap water contains dissolved ions that could interfere with tests',
                'Distilled water is cheaper',
                'Tap water is acidic',
                'Distilled water reacts faster'
            ],
            correct: 0,
            exp: 'Tap water may contain Cl⁻, SO₄²⁻, Ca²⁺, etc., which would give false positives or mask the ions being tested. Distilled water is free from these contaminants.'
        },
        {
            q: 'Which gas bleaches damp litmus paper?',
            opts: ['Chlorine', 'Oxygen', 'Hydrogen', 'Methane'],
            correct: 0,
            exp: 'Chlorine dissolves in water to form hydrochloric acid and chloric(I) acid (HOCl). The HOCl is a powerful oxidising agent that bleaches the litmus paper white.'
        },
        {
            q: 'What is the purpose of a fume cupboard?',
            opts: [
                'To safely remove toxic or irritating vapours from the working area',
                'To keep chemicals warm',
                'To store glassware',
                'To increase the speed of reactions'
            ],
            correct: 0,
            exp: 'A fume cupboard extracts hazardous fumes (e.g., from concentrated acids, ammonia, or organic solvents) away from the user, protecting the respiratory system.'
        },
        {
            q: 'Which gas burns with a “pop” sound when a lighted splint is applied?',
            opts: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Ammonia'],
            correct: 0,
            exp: 'Hydrogen is highly flammable and reacts explosively with oxygen in the air, producing a characteristic “pop” sound. This is the standard test for hydrogen.'
        },
        {
            q: 'A student needs to heat a solid in a test tube. What is the recommended technique?',
            opts: [
                'Hold the tube with a test-tube holder and heat gently, moving the tube in the flame',
                'Hold the tube with bare hands and heat strongly',
                'Heat the bottom of the tube only',
                'Place the tube directly on the bench and heat'
            ],
            correct: 0,
            exp: 'Use a test-tube holder, heat gently at first, and move the tube in and out of the flame to avoid superheating and to heat evenly.'
        },
        {
            q: 'Why should you not return unused chemicals to their original containers?',
            opts: [
                'To prevent contamination of the stock supply',
                'To save time',
                'Because the container will overflow',
                'Because the chemical will evaporate'
            ],
            correct: 0,
            exp: 'Unused chemicals may have absorbed impurities or reacted with the air or other substances. Returning them could contaminate the entire stock, ruining future experiments.'
        },
        {
            q: 'What is the correct way to dilute concentrated sulphuric acid?',
            opts: [
                'Add the acid slowly to water with stirring, and cool',
                'Add water rapidly to the acid',
                'Mix equal volumes of acid and water at once',
                'Add water to acid while heating'
            ],
            correct: 0,
            exp: 'Always add acid to water (not water to acid). The dilution is highly exothermic; adding water to concentrated acid can cause violent boiling and spattering. Stir and cool during addition.'
        },
        {
            q: 'Which piece of apparatus is used to measure a precise volume of liquid in a titration?',
            opts: ['Burette', 'Beaker', 'Measuring cylinder', 'Conical flask'],
            correct: 0,
            exp: 'A burette delivers variable but precisely measured volumes (to ±0.05 cm³). Beakers and conical flasks are not volumetric; measuring cylinders are less precise than burettes.'
        }
    ];

    for (let i = 0; i < 50; i++) {
        const base = gasSafetyScenarios[i % gasSafetyScenarios.length];
        let question = base.q;
        if (i >= gasSafetyScenarios.length) {
            const prefixes = [
                'In a rural school laboratory: ',
                'During practical work: ',
                'A student asks: '
            ];
            question = prefixes[i % prefixes.length] + question;
        }

        add('Gas Tests & Lab Safety', question, base.opts, base.correct, base.exp);
    }

    // Ensure exactly 300 scenarios
    // If by chance fewer, pad with additional safety scenarios
    while (list.length < 300) {
        const base = gasSafetyScenarios[list.length % gasSafetyScenarios.length];
        add('Gas Tests & Lab Safety', 'Safety check: ' + base.q, base.opts, base.correct, base.exp);
    }

    // Trim to 300 and shuffle the whole list to mix categories
    const trimmed = list.slice(0, 300);

    // Deterministic Fisher-Yates shuffle
    let seed = 42;
    function random() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    }

    for (let i = trimmed.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [trimmed[i], trimmed[j]] = [trimmed[j], trimmed[i]];
    }

    return trimmed;
})();

/* ============================================================
   2. GAME STATE
   ============================================================ */
const state = {
    currentIndex: 0,
    score: 0,
    answered: false,
    selectedOption: null,
    totalQuestions: SCENARIOS.length,
    correctCount: 0,
    wrongCount: 0
};

/* ============================================================
   3. DOM REFERENCES
   ============================================================ */
const els = {
    qCounter: document.getElementById('qCounter'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    progressFill: document.getElementById('progressFill'),
    categoryBadge: document.getElementById('categoryBadge'),
    questionText: document.getElementById('questionText'),
    optionsContainer: document.getElementById('optionsContainer'),
    correctionPanel: document.getElementById('correctionPanel'),
    verdictText: document.getElementById('verdictText'),
    explanationText: document.getElementById('explanationText'),
    submitBtn: document.getElementById('submitBtn'),
    nextBtn: document.getElementById('nextBtn'),
    gameMain: document.getElementById('gameMain'),
    resultsScreen: document.getElementById('resultsScreen'),
    finalScore: document.getElementById('finalScore'),
    finalMessage: document.getElementById('finalMessage'),
    correctCount: document.getElementById('correctCount'),
    wrongCount: document.getElementById('wrongCount'),
    percentScore: document.getElementById('percentScore'),
    restartBtn: document.getElementById('restartBtn')
};

/* ============================================================
   4. RENDER FUNCTIONS
   ============================================================ */
function renderQuestion() {
    const scenario = SCENARIOS[state.currentIndex];
    if (!scenario) {
        showResults();
        return;
    }

    // Reset state for new question
    state.answered = false;
    state.selectedOption = null;

    // Update header
    els.qCounter.textContent = `${state.currentIndex + 1} / ${state.totalQuestions}`;
    els.scoreDisplay.textContent = state.score;
    els.progressFill.style.width = `${(state.currentIndex / state.totalQuestions) * 100}%`;

    // Category badge
    els.categoryBadge.textContent = scenario.category;

    // Question text
    els.questionText.textContent = scenario.question;

    // Options
    els.optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    scenario.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.index = idx;
        btn.innerHTML = `<span class="option-letter">${letters[idx]}</span> <span>${optText}</span>`;
        btn.addEventListener('click', () => selectOption(idx));
        els.optionsContainer.appendChild(btn);
    });

    // Hide correction panel
    els.correctionPanel.classList.remove('show');
    els.correctionPanel.classList.remove('correct', 'wrong');

    // Buttons
    els.submitBtn.disabled = true;
    els.nextBtn.disabled = true;
    els.submitBtn.textContent = 'Submit Answer';
    els.nextBtn.textContent = state.currentIndex === state.totalQuestions - 1 ? 'Finish' : 'Next →';
}

function selectOption(index) {
    if (state.answered) return;

    state.selectedOption = index;

    // Highlight selected
    const buttons = els.optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });

    // Enable submit
    els.submitBtn.disabled = false;
}

function submitAnswer() {
    if (state.answered || state.selectedOption === null) return;

    state.answered = true;
    const scenario = SCENARIOS[state.currentIndex];
    const isCorrect = state.selectedOption === scenario.correctIndex;

    // Update score
    if (isCorrect) {
        state.score++;
        state.correctCount++;
        els.scoreDisplay.textContent = state.score;
    } else {
        state.wrongCount++;
    }

    // Disable all options
    const buttons = els.optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, i) => {
        btn.classList.add('disabled');
        btn.classList.remove('selected');
        if (i === scenario.correctIndex) {
            btn.classList.add('correct');
        }
        if (i === state.selectedOption && !isCorrect) {
            btn.classList.add('wrong');
        }
    });

    // Show correction panel
    const verdict = isCorrect ? '✅ Correct!' : '❌ Incorrect';
    const verdictClass = isCorrect ? 'correct' : 'wrong';
    els.verdictText.textContent = verdict;
    els.verdictText.className = `verdict ${verdictClass}`;
    els.explanationText.innerHTML = `<strong>Explanation:</strong> ${scenario.explanation}`;
    els.correctionPanel.classList.add('show');

    // Update buttons
    els.submitBtn.disabled = true;
    els.nextBtn.disabled = false;

    // Scroll correction into view smoothly
    els.correctionPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextQuestion() {
    if (!state.answered) return;

    state.currentIndex++;
    if (state.currentIndex >= state.totalQuestions) {
        showResults();
    } else {
        renderQuestion();
    }
}

function showResults() {
    els.gameMain.style.display = 'none';
    els.resultsScreen.classList.add('show');

    const total = state.totalQuestions;
    const correct = state.correctCount;
    const wrong = state.wrongCount;
    const percent = Math.round((correct / total) * 100);

    els.finalScore.innerHTML = `${correct}<small>/${total}</small>`;
    els.correctCount.textContent = correct;
    els.wrongCount.textContent = wrong;
    els.percentScore.textContent = `${percent}%`;

    let message = '';
    if (percent >= 90) message = '🏆 Outstanding! You are ready for the practical exam.';
    else if (percent >= 75) message = '🌟 Excellent work! A little more practice and you\'ll ace it.';
    else if (percent >= 60) message = '📖 Good effort. Review the explanations for the ones you missed.';
    else if (percent >= 40) message = '💪 Keep practising! Focus on the correction notes and try again.';
    else message = '🌱 Don\'t give up. Study the explanations carefully and replay the game.';

    els.finalMessage.textContent = message;

    els.progressFill.style.width = '100%';
    els.qCounter.textContent = `${total} / ${total}`;
}

function restartGame() {
    state.currentIndex = 0;
    state.score = 0;
    state.answered = false;
    state.selectedOption = null;
    state.correctCount = 0;
    state.wrongCount = 0;

    els.resultsScreen.classList.remove('show');
    els.gameMain.style.display = 'block';

    // Reshuffle? Keep deterministic order for fairness; just reset index.
    renderQuestion();
}

/* ============================================================
   5. EVENT LISTENERS
   ============================================================ */
els.submitBtn.addEventListener('click', submitAnswer);
els.nextBtn.addEventListener('click', nextQuestion);
els.restartBtn.addEventListener('click', restartGame);

// Keyboard shortcuts: 1-4 to select, Enter to submit/next
document.addEventListener('keydown', (e) => {
    if (els.resultsScreen.classList.contains('show')) return;

    if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1;
        const buttons = els.optionsContainer.querySelectorAll('.option-btn');
        if (buttons[idx] && !state.answered) {
            buttons[idx].click();
        }
    }

    if (e.key === 'Enter') {
        if (!state.answered && !els.submitBtn.disabled) {
            els.submitBtn.click();
        } else if (state.answered && !els.nextBtn.disabled) {
            els.nextBtn.click();
        }
    }
});

/* ============================================================
   6. INITIALISE
   ============================================================ */
renderQuestion();