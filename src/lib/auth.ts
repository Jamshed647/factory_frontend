// lib/auth.ts
export async function getUserRole(): Promise<"admin" | "agent" | "user"> {
  // Example: normally you'd decode a JWT or fetch from API
  return "admin";
}
