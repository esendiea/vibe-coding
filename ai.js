// ai.js
export function classifyDescription(description) {
  description = description.toLowerCase();

  if (description.includes("sold") || description.includes("received") || description.includes("payment")) {
    return {
      type: "income",
      subcategory: "sales"
    };
  }

  if (description.includes("bought") || description.includes("purchased") || description.includes("airtime") || description.includes("rent")) {
    return {
      type: "expense",
      subcategory: "operational cost"
    };
  }

  // Default fallback
  return {
    type: "expense",
    subcategory: "general"
  };
}
