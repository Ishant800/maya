import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";

const activityOptions = [
  { value: "1.2", label: "Sedentary (little to no exercise)" },
  { value: "1.375", label: "Light (1-3 days/week)" },
  { value: "1.55", label: "Moderate (3-5 days/week)" },
  { value: "1.725", label: "Active (6-7 days/week)" },
  { value: "1.9", label: "Very active (twice daily)" },
];

const goalOptions = [
  { value: "maintain", label: "Maintain" },
  { value: "lose", label: "Fat loss" },
  { value: "gain", label: "Lean gain" },
];

function NutritionCalculator() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [activeTab, setActiveTab] = useState("nutrition");
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState("female");
  const [heightCm, setHeightCm] = useState(165);
  const [weightKg, setWeightKg] = useState(62);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(6);
  const [weightLb, setWeightLb] = useState(136);
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [importNote, setImportNote] = useState("");
  const [waistCm, setWaistCm] = useState(72);
  const [hipCm, setHipCm] = useState(98);
  const [neckCm, setNeckCm] = useState(33);

  const computed = useMemo(() => {
    const height = unitSystem === "metric"
      ? heightCm
      : Math.round((heightFt * 12 + heightIn) * 2.54);
    const weight = unitSystem === "metric"
      ? weightKg
      : Math.round(weightLb / 2.2046);

    const baseBmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const tdee = baseBmr * Number(activity);
    const goalMultiplier = goal === "lose" ? 0.85 : goal === "gain" ? 1.1 : 1;
    const calories = Math.round(tdee * goalMultiplier);

    const proteinCal = calories * 0.3;
    const fatCal = calories * 0.3;
    const carbCal = calories * 0.4;

    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const bmiCategory =
      bmi < 18.5
        ? "Underweight"
        : bmi < 25
        ? "Healthy range"
        : bmi < 30
        ? "Overweight"
        : "Obesity range";

    const heightInches = height / 2.54;
    const idealBase = gender === "male" ? 50 : 45.5;
    const idealWeight = idealBase + 2.3 * Math.max(0, heightInches - 60);
    const idealLow = Math.round(idealWeight * 0.9);
    const idealHigh = Math.round(idealWeight * 1.1);

    const waistInches =
      unitSystem === "metric" ? waistCm / 2.54 : waistCm;
    const hipInches =
      unitSystem === "metric" ? hipCm / 2.54 : hipCm;
    const neckInches =
      unitSystem === "metric" ? neckCm / 2.54 : neckCm;

    const whr = hipInches > 0 ? Number((waistInches / hipInches).toFixed(2)) : 0;
    const whrCategory =
      gender === "male"
        ? whr <= 0.9
          ? "Lower risk"
          : whr <= 0.99
          ? "Moderate risk"
          : "Higher risk"
        : whr <= 0.85
        ? "Lower risk"
        : whr <= 0.89
        ? "Moderate risk"
        : "Higher risk";

    let bodyFat = null;
    if (gender === "male") {
      const calc =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistInches - neckInches) +
            0.15456 * Math.log10(heightInches)) -
        450;
      bodyFat = Number(calc.toFixed(1));
    } else {
      const calc =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistInches + hipInches - neckInches) +
            0.221 * Math.log10(heightInches)) -
        450;
      bodyFat = Number(calc.toFixed(1));
    }

    return {
      height,
      weight,
      calories,
      protein: Math.round(proteinCal / 4),
      fat: Math.round(fatCal / 9),
      carbs: Math.round(carbCal / 4),
      bmr: Math.round(baseBmr),
      tdee: Math.round(tdee),
      bmi: Number(bmi.toFixed(1)),
      bmiCategory,
      idealLow,
      idealHigh,
      whr,
      whrCategory,
      bodyFat,
    };
  }, [
    unitSystem,
    heightCm,
    weightKg,
    heightFt,
    heightIn,
    weightLb,
    age,
    gender,
    activity,
    goal,
    waistCm,
    hipCm,
    neckCm,
  ]);

  const exportPayload = useMemo(
    () => ({
      input: {
        unitSystem,
        age,
        gender,
        heightCm,
        weightKg,
        heightFt,
        heightIn,
        weightLb,
        activity,
        goal,
        waistCm,
        hipCm,
        neckCm,
      },
      output: computed,
    }),
    [
      unitSystem,
      age,
      gender,
      heightCm,
      weightKg,
      heightFt,
      heightIn,
      weightLb,
      activity,
      goal,
      waistCm,
      hipCm,
      neckCm,
      computed,
    ]
  );

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    downloadFile(
      JSON.stringify(exportPayload, null, 2),
      "maya-nutrition-calculator.json",
      "application/json"
    );
  };

  const handleExportCsv = () => {
    const csv = [
      "unitSystem,age,gender,heightCm,weightKg,heightFt,heightIn,weightLb,activity,goal,calories,protein,fat,carbs,bmr,tdee,bmi,bmiCategory,idealLow,idealHigh",
      [
        unitSystem,
        age,
        gender,
        heightCm,
        weightKg,
        heightFt,
        heightIn,
        weightLb,
        activity,
        goal,
        computed.calories,
        computed.protein,
        computed.fat,
        computed.carbs,
        computed.bmr,
        computed.tdee,
        computed.bmi,
        computed.bmiCategory,
        computed.idealLow,
        computed.idealHigh,
      ].join(","),
    ].join("\n");
    downloadFile(csv, "maya-nutrition-calculator.csv", "text/csv");
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const input = data.input || {};
        if (input.unitSystem) setUnitSystem(input.unitSystem);
        if (input.age) setAge(Number(input.age));
        if (input.gender) setGender(input.gender);
        if (input.heightCm) setHeightCm(Number(input.heightCm));
        if (input.weightKg) setWeightKg(Number(input.weightKg));
        if (input.heightFt) setHeightFt(Number(input.heightFt));
        if (input.heightIn) setHeightIn(Number(input.heightIn));
        if (input.weightLb) setWeightLb(Number(input.weightLb));
        if (input.activity) setActivity(String(input.activity));
        if (input.goal) setGoal(input.goal);
        if (input.waistCm) setWaistCm(Number(input.waistCm));
        if (input.hipCm) setHipCm(Number(input.hipCm));
        if (input.neckCm) setNeckCm(Number(input.neckCm));
        setImportNote("Imported successfully.");
      } catch (error) {
        setImportNote("Import failed. Please upload a valid JSON export.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-cream text-ink">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                Nutrition Calculator
              </span>
              <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
                Calories and macros built for your real life.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">
                Enter your details to estimate daily calories and a balanced macro split.
                This gives you a smart starting point for gentle, sustainable results.
              </p>

              <div className="mt-8 rounded-3xl bg-white/90 p-6 shadow-soft">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-muted">Units:</span>
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      unitSystem === "metric"
                        ? "bg-ink text-cream"
                        : "bg-cream/60 text-ink"
                    }`}
                    onClick={() => setUnitSystem("metric")}
                    type="button"
                  >
                    Metric
                  </button>
                  <button
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      unitSystem === "imperial"
                        ? "bg-ink text-cream"
                        : "bg-cream/60 text-ink"
                    }`}
                    onClick={() => setUnitSystem("imperial")}
                    type="button"
                  >
                    Imperial
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("nutrition")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === "nutrition"
                        ? "bg-ink text-cream"
                        : "bg-cream/60 text-ink"
                    }`}
                  >
                    Nutrition
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("medical")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeTab === "medical"
                        ? "bg-ink text-cream"
                        : "bg-cream/60 text-ink"
                    }`}
                  >
                    Medical tools
                  </button>
                </div>

                {activeTab === "nutrition" ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm text-muted">
                      Age
                      <input
                        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                        type="number"
                        min="15"
                        max="90"
                        value={age}
                        onChange={(event) => setAge(Number(event.target.value))}
                      />
                    </label>

                    <label className="text-sm text-muted">
                      Gender
                      <select
                        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </label>

                    {unitSystem === "metric" ? (
                      <>
                        <label className="text-sm text-muted">
                          Height (cm)
                          <input
                            className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                            type="number"
                            min="120"
                            max="220"
                            value={heightCm}
                            onChange={(event) => setHeightCm(Number(event.target.value))}
                          />
                        </label>
                        <label className="text-sm text-muted">
                          Weight (kg)
                          <input
                            className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                            type="number"
                            min="35"
                            max="180"
                            value={weightKg}
                            onChange={(event) => setWeightKg(Number(event.target.value))}
                          />
                        </label>
                      </>
                    ) : (
                      <>
                        <label className="text-sm text-muted">
                          Height (ft)
                          <input
                            className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                            type="number"
                            min="4"
                            max="7"
                            value={heightFt}
                            onChange={(event) => setHeightFt(Number(event.target.value))}
                          />
                        </label>
                        <label className="text-sm text-muted">
                          Height (in)
                          <input
                            className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                            type="number"
                            min="0"
                            max="11"
                            value={heightIn}
                            onChange={(event) => setHeightIn(Number(event.target.value))}
                          />
                        </label>
                        <label className="text-sm text-muted">
                          Weight (lb)
                          <input
                            className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                            type="number"
                            min="90"
                            max="400"
                            value={weightLb}
                            onChange={(event) => setWeightLb(Number(event.target.value))}
                          />
                        </label>
                      </>
                    )}

                    <label className="text-sm text-muted sm:col-span-2">
                      Activity level
                      <select
                        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                        value={activity}
                        onChange={(event) => setActivity(event.target.value)}
                      >
                        {activityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-sm text-muted sm:col-span-2">
                      Goal
                      <select
                        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                        value={goal}
                        onChange={(event) => setGoal(event.target.value)}
                      >
                        {goalOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl bg-cream/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Medical inputs
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <label className="text-sm text-muted">
                        Waist ({unitSystem === "metric" ? "cm" : "in"})
                        <input
                          className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                          type="number"
                          min="40"
                          max="160"
                          value={waistCm}
                          onChange={(event) => setWaistCm(Number(event.target.value))}
                        />
                      </label>
                      <label className="text-sm text-muted">
                        Hip ({unitSystem === "metric" ? "cm" : "in"})
                        <input
                          className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                          type="number"
                          min="50"
                          max="180"
                          value={hipCm}
                          onChange={(event) => setHipCm(Number(event.target.value))}
                        />
                      </label>
                      <label className="text-sm text-muted">
                        Neck ({unitSystem === "metric" ? "cm" : "in"})
                        <input
                          className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                          type="number"
                          min="20"
                          max="60"
                          value={neckCm}
                          onChange={(event) => setNeckCm(Number(event.target.value))}
                        />
                      </label>
                    </div>
                    <p className="mt-3 text-xs text-muted">
                      Used for waist-to-hip ratio and body fat estimation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {activeTab === "nutrition" ? (
                <>
                  <div className="rounded-3xl bg-white/90 p-8 shadow-soft">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Daily target</p>
                    <p className="mt-4 font-display text-5xl text-ink">
                      {computed.calories} kcal
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      Based on your details and goal. TDEE: {computed.tdee} kcal
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-cream/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">Protein</p>
                        <p className="mt-2 font-display text-2xl text-ink">{computed.protein}g</p>
                        <p className="mt-1 text-xs text-muted">30% of calories</p>
                      </div>
                      <div className="rounded-2xl bg-cream/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">Fat</p>
                        <p className="mt-2 font-display text-2xl text-ink">{computed.fat}g</p>
                        <p className="mt-1 text-xs text-muted">30% of calories</p>
                      </div>
                      <div className="rounded-2xl bg-cream/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">Carbs</p>
                        <p className="mt-2 font-display text-2xl text-ink">{computed.carbs}g</p>
                        <p className="mt-1 text-xs text-muted">40% of calories</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-ink/10 bg-cream/70 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Quick guidance</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      <li>Protein keeps you satisfied and supports lean muscle.</li>
                      <li>Carbs fuel energy and help recovery.</li>
                      <li>Fats support hormones and steady mood.</li>
                    </ul>
                    <p className="mt-4 text-xs text-muted">
                      This is an estimate. For medical conditions or targeted goals, consult a clinician.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-white/90 p-6 shadow-soft">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Export / Import</p>
                    <p className="mt-3 text-sm text-muted">
                      Save your results or reload them later. Exports include your inputs and outputs.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream"
                        type="button"
                        onClick={handleExportJson}
                      >
                        Export JSON
                      </button>
                      <button
                        className="rounded-xl border border-ink/20 bg-white px-5 py-2.5 text-sm font-semibold text-ink"
                        type="button"
                        onClick={handleExportCsv}
                      >
                        Export CSV
                      </button>
                      <label className="rounded-xl border border-ink/20 bg-white px-5 py-2.5 text-sm font-semibold text-ink cursor-pointer">
                        Import JSON
                        <input
                          className="hidden"
                          type="file"
                          accept="application/json"
                          onChange={handleImport}
                        />
                      </label>
                    </div>
                    {importNote ? (
                      <p className="mt-3 text-xs text-muted">{importNote}</p>
                    ) : null}
                  </div>

                  <div className="rounded-3xl bg-ink p-6 text-cream">
                    <p className="text-xs uppercase tracking-[0.2em] text-cream/70">Next step</p>
                    <p className="mt-3 text-lg">
                      Want a full plan? Generate recipes and a prep schedule in minutes.
                    </p>
                    <button className="mt-4 rounded-xl bg-lime px-6 py-3 text-sm font-semibold text-ink">
                      Build my plan
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-3xl bg-white/90 p-6 shadow-soft">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Health snapshot</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-cream/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">BMI</p>
                        <p className="mt-2 font-display text-2xl text-ink">{computed.bmi}</p>
                        <p className="mt-1 text-xs text-muted">{computed.bmiCategory}</p>
                      </div>
                      <div className="rounded-2xl bg-cream/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">Ideal weight</p>
                        <p className="mt-2 font-display text-2xl text-ink">
                          {computed.idealLow}-{computed.idealHigh} kg
                        </p>
                        <p className="mt-1 text-xs text-muted">Devine formula range</p>
                      </div>
                      <div className="rounded-2xl bg-cream/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">Waist/Hip</p>
                        <p className="mt-2 font-display text-2xl text-ink">{computed.whr}</p>
                        <p className="mt-1 text-xs text-muted">{computed.whrCategory}</p>
                      </div>
                      <div className="rounded-2xl bg-cream/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted">Body fat %</p>
                        <p className="mt-2 font-display text-2xl text-ink">
                          {computed.bodyFat}%
                        </p>
                        <p className="mt-1 text-xs text-muted">US Navy estimate</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-ink/10 bg-cream/70 p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Medical notes</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      <li>BMI is a screening tool, not a diagnosis.</li>
                      <li>Body fat estimates can vary by method.</li>
                      <li>Waist ratio helps flag central fat distribution.</li>
                    </ul>
                    <p className="mt-4 text-xs text-muted">
                      If you have a medical condition, consult a clinician for interpretation.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NutritionCalculator;
