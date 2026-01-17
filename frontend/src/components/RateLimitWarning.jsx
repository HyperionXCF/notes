import { ZapIcon } from "lucide-react";

export default function RateLimitWarning(){
    return(
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-primary/20 border border-primary/40 rounded-lg shadow-md">
                <div className="flex gap-2 p-5 items-center justify-center">
                    <ZapIcon/>
                    <p>too many requests, try again in sometime...</p>                    
                </div>
            </div>
        </div>
    )
}