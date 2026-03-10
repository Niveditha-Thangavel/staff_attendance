import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { motion } from "framer-motion";
import { Clock, Bell, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { QueryState } from "@/components/QueryState";
import { useSettings, useUpdateSettings } from "@/hooks/use-api";
import { toast } from "sonner";
import type { Settings } from "@/lib/api";

const defaultSettings: Settings = {
  workStart: "08:30",
  workEnd: "16:30",
  lateThreshold: "15",
  halfDayCutoff: "13:00",
  emailNotif: true,
  pushNotif: true,
  missedPunchAlert: true,
  lateAlert: true,
  weeklyReport: false,
  timezone: "UTC+5:30",
  theme: "system",
};

export default function SettingsPage() {
  const settingsQuery = useSettings();
  const updateSettings = useUpdateSettings();
  const [form, setForm] = useState<Settings>(defaultSettings);

  useEffect(() => {
    if (settingsQuery.data) setForm(settingsQuery.data);
  }, [settingsQuery.data]);

  const handleSave = () => {
    updateSettings.mutate(form, {
      onSuccess: () => toast.success("Settings saved successfully"),
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <>
      <TopBar title="Settings" subtitle="Configure system preferences" />
      <QueryState isLoading={settingsQuery.isLoading} error={settingsQuery.error as Error | null} onRetry={() => settingsQuery.refetch()}>
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl">
          {/* Working Hours */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kpi-card space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center"><Clock className="h-4 w-4 text-primary" /></div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Working Hours</h3>
                <p className="text-xs text-muted-foreground">Define standard work timings</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="text-xs">Work Start Time</Label><Input type="time" value={form.workStart} onChange={(e) => setForm({ ...form, workStart: e.target.value })} /></div>
              <div className="space-y-2"><Label className="text-xs">Work End Time</Label><Input type="time" value={form.workEnd} onChange={(e) => setForm({ ...form, workEnd: e.target.value })} /></div>
              <div className="space-y-2"><Label className="text-xs">Late Threshold (minutes)</Label><Input type="number" value={form.lateThreshold} onChange={(e) => setForm({ ...form, lateThreshold: e.target.value })} min="1" max="60" /></div>
              <div className="space-y-2"><Label className="text-xs">Half-Day Cutoff Time</Label><Input type="time" value={form.halfDayCutoff} onChange={(e) => setForm({ ...form, halfDayCutoff: e.target.value })} /></div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="kpi-card space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-warning/10 flex items-center justify-center"><Bell className="h-4 w-4 text-warning" /></div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                <p className="text-xs text-muted-foreground">Manage alert preferences</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              {[
                { key: "emailNotif" as const, label: "Email Notifications", desc: "Receive alerts via email" },
                { key: "pushNotif" as const, label: "Push Notifications", desc: "Browser push notifications" },
                { key: "missedPunchAlert" as const, label: "Missed Punch Alerts", desc: "Alert when staff misses punch-in/out" },
                { key: "lateAlert" as const, label: "Late Arrival Alerts", desc: "Alert when staff arrives late" },
                { key: "weeklyReport" as const, label: "Weekly Summary Report", desc: "Receive weekly attendance summary" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                  <Switch checked={form[key]} onCheckedChange={(v) => setForm({ ...form, [key]: v })} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* General */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="kpi-card space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-info/10 flex items-center justify-center"><Palette className="h-4 w-4 text-info" /></div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">General</h3>
                <p className="text-xs text-muted-foreground">System-wide preferences</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Timezone</Label>
                <Select value={form.timezone} onValueChange={(v) => setForm({ ...form, timezone: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["UTC-8:00", "UTC-5:00", "UTC+0:00", "UTC+1:00", "UTC+5:30", "UTC+8:00", "UTC+9:00"].map((tz) => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Theme</Label>
                <Select value={form.theme} onValueChange={(v) => setForm({ ...form, theme: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex justify-end pb-6">
            <Button onClick={handleSave} size="lg" disabled={updateSettings.isPending}>
              {updateSettings.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </motion.div>
        </div>
      </QueryState>
    </>
  );
}
