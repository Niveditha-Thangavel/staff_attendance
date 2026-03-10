import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isLoading: boolean;
  error: Error | null;
  onRetry?: () => void;
  children: React.ReactNode;
}

export function QueryState({ isLoading, error, onRetry, children }: Props) {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3 text-center px-6">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <p className="text-sm font-semibold text-foreground">Failed to load data</p>
        <p className="text-xs text-muted-foreground max-w-sm">{error.message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
