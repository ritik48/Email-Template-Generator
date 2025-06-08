"use client";

import { useCanvasRef } from "@/Provider";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, ClipboardCheck } from "lucide-react";

export function CopyCode() {
  const canvasRef = useCanvasRef();
  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  const handleOpen = () => {
    if (canvasRef?.current) {
      setHtml(canvasRef.current.innerHTML);
    }
    setOpen(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleOpen}>
          <Code className="w-4 h-4 mr-2" />
          Copy Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Generated HTML Code</DialogTitle>
        </DialogHeader>

        <pre className="text-sm whitespace-pre-wrap break-words bg-gray-100 p-4 rounded max-h-[500px] overflow-auto border">
          {html}
        </pre>

        <div className="flex justify-end mt-4">
          <Button onClick={handleCopy}>
            {copied ? (
              <>
                <ClipboardCheck className="w-4 h-4 mr-2" /> Copied!
              </>
            ) : (
              "Copy to Clipboard"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
