// Optionally, you can use TypeScript for stricter typing

export class PricingTier {
  /**
   * @param {Object} opts
   * @param {string} opts.name
   * @param {string|number} opts.price
   * @param {string} opts.period
   * @param {string} opts.description
   * @param {string[]} opts.features
   * @param {string} opts.buttonText
   * @param {string} [opts.highlight]
   * @param {string} [opts.buttonType]
   * @param {string} [opts.buttonClass]
   */
  constructor(opts) {
    Object.assign(this, opts);
  }
}

export const PRICING_TIERS = [
  new PricingTier({
    name: "Free",
    price: 0,
    period: "/month",
    description: "Perfect for getting started or for casual use.",
    features: [
      "5 shorten calls per minute",
      "Basic link shortening",
      "Simple analytics (total clicks, last clicked)",
      "Limited support",
    ],
    buttonText: "Sign Up Free",
    buttonType: "primary",
  }),
  new PricingTier({
    name: "User",
    price: 1,
    period: "/month",
    description: "Great for regular users who need more capacity and control.",
    features: [
      "All Free features",
      "100 shorten calls per minute",
      "Editable destination URLs (limited time after creation)",
      "Basic analytics",
      "Email support",
    ],
    buttonText: "Sign-Up as User",
    buttonType: "primary",
  }),
  new PricingTier({
    name: "Business",
    price: 10,
    period: "/month",
    description: "For professionals needing insights & unlimited shortening.",
    features: [
      "All User features",
      "Unlimited shorten URLs",
      "Granular click data visualization (maps, charts, by country/city)",
      "Referrer, device & browser tracking",
      "UTM parameter generation & tracking",
      "Data export (CSV, Excel)",
      "Click heatmaps*",
      "Editable destination URLs",
      "Webhooks for link events",
      "API access",
      "Email & chat support",
    ],
    buttonText: "Sign-Up for Business",
    highlight: "Best Value",
    buttonType: "primary",
    buttonClass: "",
  }),
  new PricingTier({
    name: "Enterprise",
    price: 25,
    period: "/month",
    description: "Enterprise-grade features for organizations at scale.",
    features: [
      "All Business & User features",
      "Custom domains",
      "Branded redirect pages (exclusive option)",
      "Dedicated API keys with highest limits",
      "Unlimited shorten URLs",
      "URL tagging & organization (folders/tags)",
      "Bulk URL shortening (CSV upload, list endpoint)",
      "Editable destination URLs (no time limit)",
      "Priority support & account manager",
    ],
    buttonText: "Sign-Up for Enterprise",
    buttonType: "primary",
    buttonClass: "",
  }),
];