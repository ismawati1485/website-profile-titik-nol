import { useState } from "react";

import {
  complexityLevels,
  estimateFor,
  formatTierRange,
  services,
  type ComplexityLevel,
} from "@/config/pricing";

const defaultService = services[0]!;
const defaultLevel = complexityLevels[1]!;

type ChoiceOption = { label: string; name: string };

const serviceOptions: ChoiceOption[] = services.map((s) => ({
  label: s.name,
  name: `service-${s.slug}`,
}));
const levelOptions: ChoiceOption[] = complexityLevels.map((l) => ({
  label: l.label,
  name: `complexity-${l.value}`,
}));

function ChoiceGroup({
  options,
  selected,
  onSelect,
  label,
}: {
  options: readonly ChoiceOption[];
  selected: string;
  onSelect: (value: string) => void;
  label: string;
}) {
  return (
    <fieldset>
      <legend className="overline text-muted-foreground">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected === option.label;
          return (
            <button
              key={option.label}
              type="button"
              name={option.name}
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
  const [serviceName, setServiceName] = useState(defaultService.name);
  const [levelLabel, setLevelLabel] = useState<ComplexityLevel["label"]>(
    defaultLevel.label,
  );

  const service = services.find((s) => s.name === serviceName) ?? defaultService;
  const level =
    complexityLevels.find((l) => l.label === levelLabel) ?? defaultLevel;
  const estimate = estimateFor(service, level);

  return (
    <div className="border border-border bg-background p-6 md:p-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="space-y-8">
          <ChoiceGroup
            label="Jenis layanan"
            options={serviceOptions}
            selected={service.name}
            onSelect={setServiceName}
          />
          <ChoiceGroup
            label="Kompleksitas pekerjaan"
            options={levelOptions}
            selected={level.label}
            onSelect={(value) => setLevelLabel(value as ComplexityLevel["label"])}
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
