import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { api } from "@/lib/api";
import { PLAN_OPTIONS } from "@/data/plans";
import { Loader2, Send } from "lucide-react";

const EMPTY = {
  full_name: "",
  email: "",
  phone: "",
  interested_plan: "General Inquiry",
  message: "",
};

export default function ContactModal({ plan, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (plan !== null) setForm({ ...EMPTY, interested_plan: plan });
  }, [plan]);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e && e.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/leads", form);
      toast.success("Request received — our team will reach out within 24 hours.");
      onClose();
    } catch (err) {
      toast.error("Could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={plan !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-testid="contact-modal"
        className="glass-panel border-yellow-500/20 text-neutral-100 sm:max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-yellow-500/80">
            Nexvora Labs //
          </p>
          <DialogTitle className="font-heading text-2xl font-semibold tracking-tight">
            Start your <span className="text-gold-gradient">project</span>
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Tell us where you want to go. We reply within one business day.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500">Full Name *</label>
            <Input
              data-testid="contact-name-input"
              required
              value={form.full_name}
              onChange={set("full_name")}
              placeholder="Aarav Sharma"
              className="bg-white/5 border-white/10 focus-visible:ring-yellow-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500">Work Email *</label>
            <Input
              data-testid="contact-email-input"
              required
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@company.com"
              className="bg-white/5 border-white/10 focus-visible:ring-yellow-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500">Phone</label>
            <Input
              data-testid="contact-phone-input"
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="+91 98765 43210"
              className="bg-white/5 border-white/10 focus-visible:ring-yellow-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500">Interested Plan *</label>
            <Select value={form.interested_plan} onValueChange={set("interested_plan")}>
              <SelectTrigger data-testid="contact-plan-select" className="bg-white/5 border-white/10 focus:ring-yellow-500">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent className="bg-[#0E0E12] border-white/10 text-neutral-100">
                {PLAN_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p} data-testid={`contact-plan-option-${p.toLowerCase().replace(/\s+/g, "-")}`}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-mono-tech uppercase tracking-widest text-neutral-500">Project Details & Goals *</label>
            <Textarea
              data-testid="contact-message-input"
              required
              rows={4}
              value={form.message}
              onChange={set("message")}
              placeholder="What are we building together?"
              className="bg-white/5 border-white/10 focus-visible:ring-yellow-500"
            />
          </div>
          <Button
            data-testid="contact-submit-button"
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 h-11 bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors"
          >
            {submitting ? <Loader2 className="animate-spin" /> : <Send />}
            {submitting ? "Sending..." : "Send Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
