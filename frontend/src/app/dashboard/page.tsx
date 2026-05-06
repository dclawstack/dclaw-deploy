"use client";

import { useState } from "react";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { api, Pipeline } from "@/lib/api";

export default function DashboardPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [pipelineType, setPipelineType] = useState<"Build" | "Test" | "Deploy">("Build");
  const [result, setResult] = useState<Pipeline | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await api<Pipeline>("/pipelines", {
        method: "POST",
        body: JSON.stringify({ repo_url: repoUrl, pipeline_type: pipelineType }),
      });
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <Rocket className="h-8 w-8 text-brand" />
          <h1 className="text-3xl font-bold text-brand">DClaw Deploy</h1>
        </div>
        <Link href="/" className="mb-6 inline-block text-sm text-gray-500 hover:text-brand">
          ← Back to home
        </Link>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Repo URL</label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/org/repo"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Pipeline type</label>
            <select
              value={pipelineType}
              onChange={(e) => setPipelineType(e.target.value as "Build" | "Test" | "Deploy")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand focus:outline-none"
            >
              <option>Build</option>
              <option>Test</option>
              <option>Deploy</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !repoUrl}
            className="rounded-lg bg-brand px-6 py-2 text-white shadow hover:bg-sky-600 disabled:opacity-50 transition"
          >
            {loading ? "Generating..." : "Generate Pipeline"}
          </button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Pipeline Result</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-medium">ID:</span> {result.id}</p>
              <p><span className="font-medium">Repo URL:</span> {result.repo_url}</p>
              <p><span className="font-medium">Pipeline type:</span> {result.pipeline_type}</p>
              <p><span className="font-medium">Status:</span> {result.status}</p>
              <p><span className="font-medium">Stages:</span> {result.stages.join(", ")}</p>
              <p><span className="font-medium">Estimated duration:</span> {result.duration_estimate} min</p>
              <p><span className="font-medium">Risk flags:</span> {result.risk_flags.join(", ")}</p>
              <p><span className="font-medium">Created at:</span> {result.created_at}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
