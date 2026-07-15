type ClassValue = string | number | bigint | null | undefined | false | Record<string, boolean | undefined>;

export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];
  for (const value of values) {
    if (!value) continue;
    if (typeof value === "object") {
      for (const key in value) {
        if (value[key]) classes.push(key);
      }
    } else {
      classes.push(String(value));
    }
  }
  return classes.join(" ");
}
