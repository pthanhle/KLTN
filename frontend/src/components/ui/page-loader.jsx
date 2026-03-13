import { Loader2 } from "lucide-react";

export function PageLoader() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}
