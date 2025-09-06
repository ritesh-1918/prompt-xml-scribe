import { Code2, Sparkles } from "lucide-react";

export const ConverterHeader = () => {
  return (
    <header className="bg-gradient-subtle border-b border-converter-panel-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Code2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-converter-header mb-4">
            Natural Language → XML Prompt Converter
          </h1>
          
          <p className="text-lg text-converter-subtext max-w-2xl mx-auto">
            Transform casual prompts into structured XML for better AI results. 
            Perfect for creating sophisticated, well-organized AI instructions.
          </p>
        </div>
      </div>
    </header>
  );
};