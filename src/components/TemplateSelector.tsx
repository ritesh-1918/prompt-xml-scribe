import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Template {
  id: string;
  name: string;
  description: string;
  structure: string[];
}

export const templates: Template[] = [
  {
    id: "basic",
    name: "Basic Instruction",
    description: "Simple instruction with context and output format",
    structure: ["instructions", "context", "output_format"]
  },
  {
    id: "task-examples",
    name: "Task with Examples", 
    description: "Task-focused with examples and specific guidelines",
    structure: ["task", "examples", "instructions"]
  },
  {
    id: "complex",
    name: "Complex Multi-section",
    description: "Comprehensive structure for complex prompts",
    structure: ["system_role", "context", "task", "constraints", "examples", "output_format"]
  },
  {
    id: "role-based",
    name: "Role-based Prompt",
    description: "Character-driven prompts with persona and scenario",
    structure: ["persona", "scenario", "objective", "guidelines", "tone"]
  },
  {
    id: "data-processing",
    name: "Data Processing Template",
    description: "Structured data transformation and validation",
    structure: ["data_source", "processing_steps", "validation_rules", "output_specification"]
  }
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

export const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-converter-header">
        Template Structure
      </label>
      <Select value={selectedTemplate} onValueChange={onTemplateChange}>
        <SelectTrigger className="w-full bg-converter-panel border-converter-panel-border hover:border-primary transition-colors">
          <SelectValue placeholder="Choose a template structure" />
          <ChevronDown className="w-4 h-4 opacity-50" />
        </SelectTrigger>
        <SelectContent className="bg-converter-panel border-converter-panel-border shadow-lg">
          {templates.map((template) => (
            <SelectItem 
              key={template.id} 
              value={template.id}
              className="hover:bg-accent focus:bg-accent cursor-pointer"
            >
              <div>
                <div className="font-medium text-converter-header">{template.name}</div>
                <div className="text-xs text-converter-subtext">{template.description}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};