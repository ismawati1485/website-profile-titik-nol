import { useState } from "react";

import {
  complexityLevels,
  estimateFor,
  formatTierRange,
  services,
  type ComplexityLevel,
} from "@/config/pricing";

function ChoiceGroup({
  options,
  selected,
  onSelect,
  label,
  nameKey,
}: {
  options: { label: string }[];
  selected: string;
  onSelect: (value: string) => void;
  label: string;
  nameKey: (index: number) => string;
}) {
  return (
    <fieldset>
      <legend className="overline text-muted-foreground">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option, index) => {
          const active = selected === option.label;
          return (
            <button
              key={option.label}
              type="button"
              name={nameKey(index)}
              aria-pressed={active}
              onClick={() => onSelect(option.label)}
              className={`border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Estimator() {
  const [serviceName, setServiceName] = useState(services[0].name);
  const [levelLabel, setLevelLabel] = useState<ComplexityLevel["label"]>(
    complexityLevels[1].label,
  );

  const service = services.find((s) => s.name === serviceName) ?? services[0]!;
  const level = complexityLevels.find((l) => l.label === levelLabel) ?? complexityLevels[1];
  const estimate = estimateFor(service, level);

  return (
    <div className="border border-border bg-background p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="space-y-8">
          <ChoiceGroup
            label="Jenis layanan"
            options={services}
            selected={service.name}
            onSelect={setServiceName}
            nameKey={(i) => `service-${services[i].slug}`}
          />
          <ChoiceGroup
            label="Kompleksitas pekerjaan"
            options={[...complexityLevels]}
            selected={level.label}
            onSelect={(value) => setLevelLabel(value as ComplexityLevel["label"])}
            nameKey={(i) => `complexity-${complexityLevels[i].value}`}
          />
        </div>

        <div className="flex flex-col justify-center border-t border-border pt-6 md:min-w-64 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <p className="overline text-muted-foreground">{estimate.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {estimate.value}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Rentang paket: {formatTierRange(service.tiers[0])}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Estimasi bersifat indikatif, bukan penawaran final. Nilai akhir
            ditetapkan setelah lingkup pekerjaan disepakati.
          </p>
        </div>
      </div>
    </div>
  );
}
