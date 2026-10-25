import { describe, expect, it } from "vitest";

import {
  complexityLevels,
  estimateFor,
  formatIDR,
  formatTierRange,
  services,
} from "@/config/pricing";

/**
 * Harga sesuai angka sementara yang ditetapkan pemilik proyek.
 * Ubah harga = ubah src/config/pricing.ts, lalu perbarui tes ini.
 */
describe("Pricing config", () => {
  it("Event Website Rp300rb–Rp700rb", () => {
    const s = services.find((x) => x.slug === "event-website")!;
    expect(s.tiers[0].min).toBe(300_000);
    expect(s.tiers[0].max).toBe(700_000);
  });

  it("Landing Page Rp500rb–Rp1,2jt", () => {
    const s = services.find((x) => x.slug === "landing-page")!;
    expect(s.tiers[0].min).toBe(500_000);
    expect(s.tiers[0].max).toBe(1_200_000);
  });

  it("Company Profile Rp800rb–Rp2jt", () => {
    const s = services.find((x) => x.slug === "company-profile")!;
    expect(s.tiers[0].min).toBe(800_000);
    expect(s.tiers[0].max).toBe(2_000_000);
  });

  it("Product Catalog Rp800rb–Rp2jt", () => {
    const s = services.find((x) => x.slug === "product-catalog")!;
    expect(s.tiers[0].min).toBe(800_000);
    expect(s.tiers[0].max).toBe(2_000_000);
  });

  it("Custom System & Dashboard mulai Rp2jt", () => {
    for (const slug of ["custom-system", "dashboard"]) {
      const s = services.find((x) => x.slug === slug)!;
      expect(s.tiers[0].max).toBeUndefined();
      expect(s.tiers[0].min).toBe(2_000_000);
    }
  });

  it("setiap layanan memiliki tepat satu tier harga", () => {
    for (const s of services) {
      expect(s.tiers).toHaveLength(1);
    }
  });

  it("estimasi kompleks mengikuti batas rentang paket", () => {
    const landing = services.find((x) => x.slug === "landing-page")!;
    expect(estimateFor(landing, complexityLevels[0]).value).toBe("± Rp500.000");
    expect(estimateFor(landing, complexityLevels[2]).value).toBe("± Rp1.200.000");
  });

  it("estimasi paket 'mulai dari' selalu nilai dasar", () => {
    const custom = services.find((x) => x.slug === "custom-system")!;
    const estimate = estimateFor(custom, complexityLevels[2]);
    expect(estimate.type).toBe("floor");
    expect(estimate.value).toBe("Rp2.000.000");
  });

  it("format rentang tier", () => {
    expect(formatTierRange({ label: "Estimasi", min: 300_000, max: 700_000 })).toBe(
      "Rp300.000 – Rp700.000",
    );
    expect(formatTierRange({ label: "Mulai dari", min: 2_000_000 })).toBe(
      "mulai Rp2.000.000",
    );
  });

  it("formatIDR memakai format rupiah Indonesia", () => {
    expect(formatIDR(1_200_000)).toBe("Rp1.200.000");
  });
});
