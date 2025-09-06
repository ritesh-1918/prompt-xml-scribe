import { useState, useEffect } from "react";
import { X, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const samplePrompts = [
  "Write a blog post about sustainable gardening",
  "Act as a marketing expert and create a social media strategy",
  "Summarize this research paper in bullet points", 
  "Generate Python code for a web scraper",
  "Create a lesson plan for teaching fractions to 5th graders"
];

export const InputPanel = ({ value, onChange, placeholder }: InputPanelProps) => {
  const [charCount, setCharCount] = useState(0);
  const [tokenEstimate, setTokenEstimate] = useState(0);

  useEffect(() => {
    setCharCount(value.length);
    // Rough token estimation (1 token ≈ 4 characters)
    setTokenEstimate(Math.ceil(value.length / 4));
  }, [value]);

  const handleClear = () => {
    onChange("");
  };

  const handleSamplePrompt = (prompt: string) => {
    onChange(prompt);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-converter-header">Natural Language Input</h3>
        </div>
        {value && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClear}
            className="hover:bg-muted text-converter-subtext hover:text-converter-header"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter your natural language prompt here..."}
          className="min-h-[300px] resize-none bg-converter-panel border-converter-panel-border focus:border-primary transition-colors text-base"
        />
        
        <div className="absolute bottom-3 right-3 flex items-center gap-4 text-xs text-converter-subtext">
          <span>{charCount} characters</span>
          <span>~{tokenEstimate} tokens</span>
        </div>
      </div>

      {!value && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-converter-header">Try these examples:</span>
          </div>
          <div className="grid gap-2">
            {samplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSamplePrompt(prompt)}
                className="text-left p-3 rounded-lg bg-accent hover:bg-accent-hover border border-converter-panel-border transition-colors text-sm text-converter-header"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};