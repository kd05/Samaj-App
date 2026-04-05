export type ApiRecord = Record<string, unknown>;

export function getStringField(item: ApiRecord, keys: string[]) {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return "";
}

export function getObjectField(item: ApiRecord, key: string): ApiRecord {
  const value = item[key];
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as ApiRecord)
    : {};
}

export function getNumberField(item: ApiRecord, keys: string[]) {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === "number") {
      return String(value);
    }

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "N/A";
}
