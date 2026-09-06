import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { PLAN_OPTIONS } from "@/data/plans";
import { Loader2, LogOut, Download, Search, Inbox } from "lucide-react";

const TOKEN_KEY = "nexvora_admin_token";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.token);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.06),transparent_50%)]">
      <form onSubmit={submit} data-testid="admin-login-form" className="glass-panel w-full max-w-md p-8 sm:p-10">
        <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-yellow-500/80">Nexvora Labs //</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-neutral-50">Admin Access</h1>
        <p className="mt-2 text-sm text-neutral-500">Sign in to view incoming project leads.</p>
        <div className="mt-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500">Email</label>
            <Input
              data-testid="admin-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nexvoralabs.com"
              className="bg-white/5 border-white/10 focus-visible:ring-yellow-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500">Password</label>
            <Input
              data-testid="admin-password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white/5 border-white/10 focus-visible:ring-yellow-500"
            />
          </div>
          {error && (
            <p data-testid="admin-login-error" className="text-sm text-red-400">{error}</p>
          )}
          <Button
            data-testid="admin-login-button"
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center">
            <Link to="/" data-testid="admin-back-home-link" className="text-xs text-neutral-500 hover:text-yellow-500 transition-colors">
              ← Back to site
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [leads, setLeads] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!token) return;
    api
      .get("/leads", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setLeads(data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        } else {
          setFetchError("Could not load leads. Please refresh.");
        }
      });
  }, [token]);

  const filtered = useMemo(() => {
    if (!leads) return [];
    return leads.filter((l) => {
      const planOk = planFilter === "all" || l.interested_plan === planFilter;
      const q = query.trim().toLowerCase();
      const qOk = !q || l.full_name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
      return planOk && qOk;
    });
  }, [leads, planFilter, query]);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setLeads(null);
  };

  const exportCsv = () => {
    const rows = [
      ["Name", "Email", "Phone", "Interested Plan", "Message", "Created At"],
      ...filtered.map((l) => [l.full_name, l.email, l.phone || "", l.interested_plan || "", (l.message || "").replace(/\n/g, " "), l.created_at]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "nexvora-leads.csv";
    a.click();
  };

  if (!token) return <LoginForm onLogin={setToken} />;

  return (
    <div data-testid="admin-dashboard" className="min-h-screen">
      <header className="border-b border-white/5 bg-[#0B0B0E]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center bg-yellow-500 text-black font-heading font-extrabold text-lg">N</span>
            <span className="font-heading font-semibold tracking-[0.18em] text-sm text-neutral-100">
              NEXVORA LABS <span className="text-yellow-500">//</span> <span className="text-neutral-500 font-normal">ADMIN</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="admin-view-site-link" className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500 hover:text-yellow-500 transition-colors">
              View site
            </Link>
            <button
              data-testid="admin-logout-button"
              onClick={logout}
              className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-neutral-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-yellow-500/80">Leads //</p>
            <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-semibold text-neutral-50">Project Enquiries</h1>
            <p data-testid="admin-leads-count" className="mt-2 text-sm text-neutral-500">
              {leads ? `${filtered.length} of ${leads.length} leads shown` : "Loading..."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                data-testid="admin-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or email"
                className="pl-9 w-56 bg-white/5 border-white/10 focus-visible:ring-yellow-500"
              />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger data-testid="admin-plan-filter" className="w-44 bg-white/5 border-white/10">
                <SelectValue placeholder="All plans" />
              </SelectTrigger>
              <SelectContent className="bg-[#0E0E12] border-white/10 text-neutral-100">
                <SelectItem value="all" data-testid="admin-plan-filter-all">All plans</SelectItem>
                {PLAN_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p} data-testid={`admin-plan-filter-${p.toLowerCase().replace(/\s+/g, "-")}`}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              data-testid="admin-export-csv-button"
              onClick={exportCsv}
              variant="outline"
              className="border-white/15 text-neutral-300 hover:border-yellow-500/60 hover:text-yellow-400 bg-transparent"
            >
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>

        {fetchError && <p data-testid="admin-fetch-error" className="mt-6 text-sm text-red-400">{fetchError}</p>}

        <div className="mt-8 glass-panel overflow-hidden">
          {!leads ? (
            <div className="p-16 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-yellow-500" /></div>
          ) : filtered.length === 0 ? (
            <div data-testid="admin-empty-state" className="p-16 text-center">
              <Inbox className="h-8 w-8 text-neutral-600 mx-auto" />
              <p className="mt-4 text-sm text-neutral-500">No leads match your filters yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table data-testid="admin-leads-table" className="w-full min-w-[860px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    {["Name", "Email", "Phone", "Interested Plan", "Message", "Received"].map((h) => (
                      <th key={h} className="p-4 font-mono-tech text-xs uppercase tracking-[0.15em] text-neutral-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} data-testid={`admin-lead-row-${l.id}`} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-neutral-100 font-medium whitespace-nowrap">{l.full_name}</td>
                      <td className="p-4 text-neutral-400">{l.email}</td>
                      <td className="p-4 text-neutral-400 whitespace-nowrap">{l.phone || "—"}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span data-testid={`admin-lead-plan-${l.id}`} className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 font-mono-tech text-xs">
                          {l.interested_plan || "General Inquiry"}
                        </span>
                      </td>
                      <td className="p-4 text-neutral-400 max-w-xs truncate" title={l.message}>{l.message}</td>
                      <td className="p-4 text-neutral-500 whitespace-nowrap">
                        {new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
