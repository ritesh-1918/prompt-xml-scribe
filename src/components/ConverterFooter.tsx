import { Heart, ExternalLink } from "lucide-react";

interface ConverterFooterProps {
  inputCharCount: number;
  outputCharCount: number;
}

export const ConverterFooter = ({ inputCharCount, outputCharCount }: ConverterFooterProps) => {
  return (
    <footer className="bg-gradient-subtle border-t border-converter-panel-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-converter-subtext">
            <div className="flex items-center gap-2">
              <span className="font-medium">Input:</span>
              <span>{inputCharCount} characters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Output:</span>
              <span>{outputCharCount} characters</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-converter-subtext">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive" />
            <span>using</span>
            <a 
              href="https://lovable.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:text-primary-hover transition-colors font-medium"
            >
              Lovable.dev
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};