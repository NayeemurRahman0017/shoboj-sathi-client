const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type AuthMode = "none" | "required" | "optional";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getApiUrl() {
  return API_URL;
}

/**
 * Ask our own backend for a short-lived JWT that proves who the
 * logged-in user is. The Express API validates it with the same secret.
 */
export async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/token", { cache: "no-store" });

    if (!res.ok) return null;

    const data = await res.json();

    return data.token || null;
  } catch {
    return null;
  }
}

/**
 * Wrapper around fetch() that talks to the Express API and, when needed,
 * attaches the JWT in the Authorization header.
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
  auth: AuthMode = "none"
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (auth === "required") {
    const token = await fetchToken();

    if (!token) {
      throw new ApiError("Please log in to continue.", 401);
    }

    headers.set("Authorization", `Bearer ${token}`);
  } else if (auth === "optional") {
    const token = await fetchToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  let res: Response;

  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Unable to reach the server. Please try again.", 0);
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      (data as { message?: string }).message ||
        "Something went wrong. Please try again.",
      res.status
    );
  }

  return data as T;
}

/** Local events may not have an image, so always fall back to a safe one. */
export const FALLBACK_EVENT_IMAGE =
  "/images/gallery/Volunteer%20Team.png";
