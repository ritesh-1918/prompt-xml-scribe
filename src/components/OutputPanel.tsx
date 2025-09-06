import { Copy, Download, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface OutputPanelProps {
  xmlOutput: string;
  isValid: boolean;
  validationError?: string;
}

export const OutputPanel = ({ xmlOutput, isValid, validationError }: OutputPanelProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(xmlOutput);
      toast({
        title: "Copied to clipboard",
        description: "XML output has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([xmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-prompt.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your XML file is being downloaded.",
    });
  };

  const customStyle = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      background: 'hsl(var(--converter-code-bg))',
      border: '1px solid hsl(var(--converter-panel-border))',
      borderRadius: '0.75rem',
      padding: '1rem',
      margin: 0,
      fontSize: '0.875rem',
      lineHeight: '1.5',
    },
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      background: 'transparent',
      fontSize: '0.875rem',
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {isValid ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <AlertCircle className="w-5 h-5 text-warning" />
            )}
            <h3 className="text-lg font-semibold text-converter-header">XML Output</h3>
          </div>
          {!isValid && validationError && (
            <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">
              {validationError}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            disabled={!xmlOutput}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            disabled={!xmlOutput || !isValid}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      <div className="relative min-h-[300px] bg-converter-code-bg border border-converter-panel-border rounded-lg">
        {xmlOutput ? (
          <SyntaxHighlighter
            language="xml"
            style={customStyle}
            customStyle={{
              background: 'transparent',
              padding: '1rem',
              margin: 0,
              border: 'none',
              borderRadius: '0.75rem',
            }}
          >
            {xmlOutput}
          </SyntaxHighlighter>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-converter-subtext">
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <p>Start typing to see your XML output</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};