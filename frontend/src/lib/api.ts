export interface Pipeline {
  id: string;
  repo_url: string;
  pipeline_type: string;
  stages: string[];
  duration_estimate: number;
  risk_flags: string[];
  status: string;
  created_at: string;
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api/v1${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
