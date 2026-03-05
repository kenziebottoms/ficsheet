import type { DailyWordCountEntry } from "../types";

const API_URL = "http://localhost:2000";

const GlobalHeaders = new Headers();
GlobalHeaders.set("Content-Type", "application/json");

export async function selectAllWordCounts() {
  const response = await fetch(`${API_URL}/wordCount`, {
    headers: GlobalHeaders,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as DailyWordCountEntry[];
}

export const seedDatabase = () =>
  fetch(`${API_URL}/seed`, {
    method: "POST",
  }).then((response) => response.json());
