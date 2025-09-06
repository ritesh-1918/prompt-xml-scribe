import { useState, useEffect, useMemo } from "react";
import { ConverterHeader } from "@/components/ConverterHeader";
import { TemplateSelector } from "@/components/TemplateSelector";
import { InputPanel } from "@/components/InputPanel";
import { OutputPanel } from "@/components/OutputPanel";
import { ConverterFooter } from "@/components/ConverterFooter";
import { convertToXML } from "@/utils/xmlConverter";

const Index = () => {
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const [debouncedInput, setDebouncedInput] = useState("");

  // Debounce input for real-time conversion (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(naturalLanguageInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [naturalLanguageInput]);

  // Convert to XML when debounced input or template changes
  const conversionResult = useMemo(() => {
    return convertToXML(debouncedInput, selectedTemplate);
  }, [debouncedInput, selectedTemplate]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header */}
      <ConverterHeader />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Template Selector */}
        <div className="mb-8">
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>

        {/* Main Conversion Interface */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Panel */}
          <div className="bg-converter-panel rounded-xl border border-converter-panel-border shadow-lg p-6">
            <InputPanel
              value={naturalLanguageInput}
              onChange={setNaturalLanguageInput}
              placeholder="Enter your natural language prompt here... For example: 'Act as a marketing expert and create a social media strategy for a sustainable fashion brand targeting millennials.'"
            />
          </div>

          {/* Output Panel */}
          <div className="bg-converter-panel rounded-xl border border-converter-panel-border shadow-lg p-6">
            <OutputPanel
              xmlOutput={conversionResult.xml}
              isValid={conversionResult.isValid}
              validationError={conversionResult.validationError}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <ConverterFooter 
        inputCharCount={naturalLanguageInput.length}
        outputCharCount={conversionResult.xml.length}
      />
    </div>
  );
};

export default Index;
