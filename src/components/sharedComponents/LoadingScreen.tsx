import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner"; 

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-[#111827] border border-gray-800">
        <CardContent className="flex flex-col items-center justify-center py-10 gap-3">
          
          <Spinner className="size-8 text-indigo-400" />
          
          <p className="text-gray-400 text-sm">Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export { LoadingScreen };