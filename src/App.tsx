import { Github, Youtube } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold flex justify-center items-center">
          <Youtube className="mr-2 text-primary" />
          Youtube Helper
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Developed with 💛 by Bruno Scachetti
          </span>
          <Separator orientation="vertical" className="h-6" />
          <Button variant={"outline"}>
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
      <main className="flex-1 flex p-6 gap-6">
        {/* Textboxes */}
        <div className="grid grid-rows-2 gap-4 flex-1">
          <Textarea
            className="resize-none p-3 leading-relaxed"
            placeholder="AI Prompt goes here..."
          />
          <Textarea
            className="resize-none p-3 leading-relaxed"
            placeholder="Results will show up here..."
            readOnly
          />
        </div>
      </main>
      <div className="flex justify-between px-6 pb-2">
        <p className="text-sm">
          Reminder: You can use the variable{" "}
          <code className="text-primary">{"{transcription}"}</code> in your
          prompt to add the selected video transcription.
        </p>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Developed during the NLW AI. Thank you, Rocketseat! 🚀
      </p>
    </div>
  );
}
