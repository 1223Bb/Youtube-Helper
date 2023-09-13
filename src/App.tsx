import { Github, Youtube, FileVideo, Upload, Wand2 } from "lucide-react";
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
        {/* Sidebar */}
        <aside className="w-80 space-y-6 flex flex-col">
          <form className="space-y-6">
            <label
              className="text-muted-foreground border flex items-center justify-center w-full aspect-video rounded-md border-dashed flex-col text-sm hover:bg-primary/20 duration-300"
              htmlFor="video"
            >
              <FileVideo className="w-4 h-4" />
              Select video
            </label>
            <input
              className="sr-only"
              type="file"
              id="video"
              accept="video/mp4"
            />
          </form>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="transcription">Transcription Prompt</Label>
            <Textarea
              id="transcription"
              className="h-20 leading-relaxed resize-none"
              placeholder="Type in keywords mentioned in the video, separated by a comma (,)."
            ></Textarea>
          </div>
          <Button className="w-full">
            Upload video
            <Upload className="w-4 h-4 ml-2" type="submit" />
          </Button>
          <Separator />
          <div className="space-y-6">
            <form className="space-y-2">
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a prompt..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Youtube Titles</SelectItem>
                  <SelectItem value="desc">Youtube Description</SelectItem>
                </SelectContent>
              </Select>
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
                <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />
                <span className="text-muted-foreground text-xs italic">
                  Higher values result in more creative results at the risk of
                  possible mistakes.
                </span>
              </div>
              <Button className="w-full">
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
