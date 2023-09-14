import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { GetFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success";

const statusMessages = {
  converting: "Converting into audio...",
  generating: "Transcribing...",
  uploading: "Loading...",
  success: "Done!",
};

interface VideoInputProps {
  onVideoUploaded: (id: string) => void;
}

export function VideoInputForm(props: VideoInputProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("waiting");
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;
    if (!files) {
      return;
    }
    const selectedFile = files[0];
    setVideoFile(selectedFile);
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return;
    }
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  async function convertVideoToAudio(video: File) {
    console.log("Convert started.");
    const ffmpeg = await GetFFmpeg();
    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    // ffmpeg.on("log", (log) => {
    //   console.log(log);
    // });

    ffmpeg.on("progress", (progress) => {
      console.log(
        "Convert progress: " + Math.round(progress.progress * 100) + "%"
      );
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");
    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });
    console.log("Convert finished!");
    return audioFile;
  }

  async function handleVideoUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = promptInputRef.current?.value;
    if (!videoFile) {
      return;
    }
    setStatus("converting");
    const audioFile = await convertVideoToAudio(videoFile);
    const data = new FormData();
    data.append("file", audioFile);
    setStatus("uploading");
    const response = await api.post("/videos", data);
    console.log(response.data);
    const videoId = response.data.video.id;
    setStatus("generating");
    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });
    console.log("Transcription finished.");
    setStatus("success");
    props.onVideoUploaded(videoId);
  }

  return (
    <form className="space-y-6" onSubmit={handleVideoUpload}>
      <label
        className="relative text-muted-foreground border flex items-center justify-center w-full aspect-video rounded-md border-dashed flex-col text-sm hover:bg-primary/20 duration-300"
        htmlFor="video"
      >
        {videoFile ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Select video
          </>
        )}
      </label>
      <input
        className="sr-only"
        type="file"
        id="video"
        accept="video/mp4"
        onChange={handleFileSelected}
      />
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="transcription">Transcription Prompt</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription"
          className="h-20 leading-relaxed resize-none"
          placeholder="Type in keywords mentioned in the video, separated by a comma (,)."
          disabled={status !== "waiting"}
        ></Textarea>
      </div>
      <Button
        data-success={status === "success"}
        disabled={status !== "waiting"}
        className="w-full data-[success=true]:bg-emerald-400"
      >
        {status === "waiting" ? (
          <>
            Upload video
            <Upload className="w-4 h-4 ml-2" type="submit" />
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  );
}
