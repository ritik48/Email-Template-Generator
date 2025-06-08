"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Loader2, XCircle } from "lucide-react";
import { useTemplateStructure } from "@/Provider";
import { saveTemplate } from "@/actions";

export function SaveTemplateButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { templateStructure } = useTemplateStructure();

  const handleSave = async () => {
    if (!id) return;
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      // Simulate API call or saving logic
      await saveTemplate(id, JSON.stringify(templateStructure));

      setSuccess(true);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);

      // Reset success/error indicators after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 2000);
    }
  };

  return (
    <Button onClick={handleSave} disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : success ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Saved!
        </>
      ) : error ? (
        <>
          <XCircle className="mr-2 h-4 w-4" />
          Failed!
        </>
      ) : (
        "Save Template"
      )}
    </Button>
  );
}
