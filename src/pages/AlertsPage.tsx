import { motion } from "framer-motion";
import { Phone, MessageSquare, CheckCircle, AlertTriangle, Clock, UserX } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QueryState } from "@/components/QueryState";
import { useAlerts, useResolveAlert, useSendReminder } from "@/hooks/use-api";
import { toast } from "sonner";
import type { Alert } from "@/lib/api";

const typeIcon = {
  "missed-punch-in": UserX,
  "missed-punch-out": Clock,
  "half-day-eligible": AlertTriangle,
};

const typeColor = {
  "missed-punch-in": "text-destructive",
  "missed-punch-out": "text-warning",
  "half-day-eligible": "text-info",
};

export default function AlertsPage() {
  const alertsQuery = useAlerts();
  const resolveAlert = useResolveAlert();
  const sendReminder = useSendReminder();

  const alerts = alertsQuery.data ?? [];
  const unresolved = alerts.filter((a) => !a.resolved);
  const resolved = alerts.filter((a) => a.resolved);

  const handleResolve = (id: string) => {
    resolveAlert.mutate(id, {
      onSuccess: () => toast.success("Alert resolved"),
      onError: (err) => toast.error(err.message),
    });
  };

  const handleRemind = (alertId: string) => {
    sendReminder.mutate(alertId, {
      onSuccess: () => toast.info("Reminder sent"),
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <>
      <TopBar title="Alerts" subtitle={`${unresolved.length} active alerts`} />
      <QueryState isLoading={alertsQuery.isLoading} error={alertsQuery.error as Error | null} onRetry={() => alertsQuery.refetch()}>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Active Alerts</h3>
            {unresolved.length === 0 && (
              <div className="kpi-card text-center py-12 text-muted-foreground text-sm">No active alerts — all clear!</div>
            )}
            {unresolved.map((alert, i) => {
              const Icon = typeIcon[alert.type];
              return (
                <motion.div key={alert.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.3 }} className="kpi-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${typeColor[alert.type]}`}><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">{alert.staffName} <span className="text-xs font-mono text-muted-foreground ml-1">({alert.staffId})</span></p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleRemind(alert.id)}>
                      <MessageSquare className="h-3 w-3 mr-1" /> Remind
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => toast.info("Calling...")}>
                      <Phone className="h-3 w-3 mr-1" /> Call
                    </Button>
                    <Button size="sm" className="h-8 text-xs" onClick={() => handleResolve(alert.id)}>
                      <CheckCircle className="h-3 w-3 mr-1" /> Resolve
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {resolved.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Resolved</h3>
              {resolved.map((alert) => (
                <div key={alert.id} className="kpi-card opacity-60 flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-success shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{alert.staffName}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                  <Badge variant="success" className="ml-auto">Resolved</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </QueryState>
    </>
  );
}
