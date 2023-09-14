import { Github, Youtube, Wand2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from "ai/react";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-type": "application/json",
    },
  });

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
            value={input}
            onChange={handleInputChange}
          />
          <Textarea
            className="resize-none p-3 leading-relaxed"
            placeholder="Results will show up here..."
            readOnly
            value={completion}
          />
        </div>
        {/* Sidebar */}
        <aside className="w-80 space-y-6 flex flex-col">
          <VideoInputForm onVideoUploaded={setVideoId} />
          <Separator />
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
              <Label>Model</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-xs italic">
                You'll be able to change this value soon™.
              </span>
              <Separator />
              <div className="space-y-4">
                <Label>Temperature</Label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <span className="text-muted-foreground text-xs italic">
                  Higher values result in more creative results at the risk of
                  possible mistakes.
                </span>
              </div>
              <Button className="w-full" disabled={isLoading}>
                Run <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </aside>
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
