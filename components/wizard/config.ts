export type StepId =
  | "where"
  | "what"
  | "typeService"
  | "howMany"
  | "meal"
  | "food"
  | "stove"
  | "hobs"
  | "oven"
  | "calendar"
  | "calendarRange"
  | "allergies"
  | "contact";

export type StepType =
  | "single-select"
  | "multi-select"
  | "counter"
  | "date"
  | "date-range"
  | "form";

export interface StepConfig {
  id: StepId;
  type: StepType;
  translationKey: string;
}

export const serviceFlows: Record<string, StepId[]> = {
  "private-chef-one": [
    "where", "what", "typeService", "howMany", "meal", "food",
    "stove", "hobs", "oven", "calendar", "allergies", "contact",
  ],
  "private-chef-multi": [
    "where", "what", "typeService", "calendarRange", "howMany", "food",
    "stove", "hobs", "oven", "allergies", "contact",
  ],
  "cooking-classes": [
    "where", "what", "calendar", "stove", "hobs", "oven", "allergies", "contact",
  ],
  "mezcal-experience": [
    "where", "what", "howMany", "calendar", "stove", "hobs", "oven", "allergies", "contact",
  ],
};

export const stepConfigs: Record<StepId, StepConfig> = {
  where:         { id: "where",         type: "single-select", translationKey: "where" },
  what:          { id: "what",          type: "single-select", translationKey: "what" },
  typeService:   { id: "typeService",   type: "single-select", translationKey: "typeService" },
  howMany:       { id: "howMany",       type: "counter",       translationKey: "howMany" },
  meal:          { id: "meal",          type: "single-select", translationKey: "meal" },
  food:          { id: "food",          type: "multi-select",  translationKey: "food" },
  stove:         { id: "stove",         type: "single-select", translationKey: "stove" },
  hobs:          { id: "hobs",          type: "single-select", translationKey: "hobs" },
  oven:          { id: "oven",          type: "single-select", translationKey: "oven" },
  calendar:      { id: "calendar",      type: "date",          translationKey: "calendar" },
  calendarRange: { id: "calendarRange", type: "date-range",    translationKey: "calendarRange" },
  allergies:     { id: "allergies",     type: "multi-select",  translationKey: "allergies" },
  contact:       { id: "contact",       type: "form",          translationKey: "contact" },
};

// Option index → flow mapping for the "what" step
const WHAT_PRIVATE_CHEF = 0;
const WHAT_COOKING_EXPERIENCE = 1;
const WHAT_MEZCAL_EXPERIENCE = 2;

// Option index → flow mapping for the "typeService" step
const TYPE_ONE_SERVICE = 0;
const TYPE_MULTIPLE_SERVICES = 1;

/**
 * Determines the ordered list of steps based on current wizard data.
 * Values for "what" and "typeService" are stored as option indices (numbers).
 */
export function getFlowSteps(data: Record<string, unknown>): StepId[] {
  const whatValue = data.what;

  if (whatValue === undefined) {
    return ["where", "what"];
  }

  if (whatValue === WHAT_COOKING_EXPERIENCE) {
    return serviceFlows["cooking-classes"];
  }

  if (whatValue === WHAT_MEZCAL_EXPERIENCE) {
    return serviceFlows["mezcal-experience"];
  }

  if (whatValue === WHAT_PRIVATE_CHEF) {
    const typeValue = data.typeService;

    if (typeValue === undefined) {
      return ["where", "what", "typeService"];
    }

    if (typeValue === TYPE_ONE_SERVICE) {
      return serviceFlows["private-chef-one"];
    }

    if (typeValue === TYPE_MULTIPLE_SERVICES) {
      return serviceFlows["private-chef-multi"];
    }
  }

  return ["where", "what"];
}
