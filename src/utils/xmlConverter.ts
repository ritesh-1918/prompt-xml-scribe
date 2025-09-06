import { Template } from "@/components/TemplateSelector";

export interface ConversionResult {
  xml: string;
  isValid: boolean;
  validationError?: string;
}

// Natural language parsing functions
const extractInstructions = (text: string): string => {
  const instructionKeywords = ['write', 'create', 'generate', 'make', 'build', 'develop', 'design'];
  const lines = text.split('\n').filter(line => line.trim());
  
  // Look for main instruction
  const mainInstruction = lines.find(line => 
    instructionKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    )
  ) || lines[0] || text;
  
  return mainInstruction.trim();
};

const extractContext = (text: string): string => {
  const contextKeywords = ['about', 'regarding', 'concerning', 'for', 'on the topic of'];
  const lines = text.split(' ');
  
  // Find context after keywords
  for (const keyword of contextKeywords) {
    const index = lines.findIndex(word => word.toLowerCase().includes(keyword));
    if (index !== -1 && index < lines.length - 1) {
      return lines.slice(index + 1).join(' ').trim();
    }
  }
  
  return '';
};

const extractRole = (text: string): string => {
  const rolePattern = /act as (?:a|an)?\s*([^\.]+)/i;
  const match = text.match(rolePattern);
  return match ? match[1].trim() : '';
};

const extractOutputFormat = (text: string): string => {
  const formatKeywords = ['bullet points', 'list', 'table', 'summary', 'code', 'json', 'csv'];
  const lowerText = text.toLowerCase();
  
  for (const format of formatKeywords) {
    if (lowerText.includes(format)) {
      return format;
    }
  }
  
  return 'structured response';
};

const extractExamples = (text: string): string => {
  if (text.toLowerCase().includes('example') || text.toLowerCase().includes('sample')) {
    return 'Provide relevant examples based on the context';
  }
  return '';
};

// Template generators
const generateBasicTemplate = (text: string): string => {
  const instructions = extractInstructions(text);
  const context = extractContext(text);
  const outputFormat = extractOutputFormat(text);
  
  return `<instructions>
${instructions}
</instructions>

<context>
${context || 'General context for the task'}
</context>

<output_format>
${outputFormat}
</output_format>`;
};

const generateTaskExamplesTemplate = (text: string): string => {
  const task = extractInstructions(text);
  const examples = extractExamples(text);
  const guidelines = text.length > 50 ? 'Follow the specified requirements and maintain quality standards' : 'Complete the task as specified';
  
  return `<task>
${task}
</task>

<examples>
<example>
<input>Sample input based on your request</input>
<output>Expected output format</output>
</example>
</examples>

<instructions>
${guidelines}
</instructions>`;
};

const generateComplexTemplate = (text: string): string => {
  const role = extractRole(text) || 'AI Assistant';
  const context = extractContext(text) || 'Professional task completion';
  const task = extractInstructions(text);
  const outputFormat = extractOutputFormat(text);
  
  return `<system_role>
You are a ${role} with expertise in the relevant domain.
</system_role>

<context>
${context}
</context>

<task>
${task}
</task>

<constraints>
- Maintain professional quality
- Follow specified format requirements
- Provide accurate and helpful information
</constraints>

<examples>
Provide relevant examples that demonstrate the expected output format and quality.
</examples>

<output_format>
${outputFormat}
</output_format>`;
};

const generateRoleBasedTemplate = (text: string): string => {
  const role = extractRole(text) || 'Professional expert';
  const context = extractContext(text) || 'Professional scenario';
  const objective = extractInstructions(text);
  
  return `<persona>
You are a ${role} with deep knowledge and experience in your field.
</persona>

<scenario>
${context}
</scenario>

<objective>
${objective}
</objective>

<guidelines>
- Maintain character consistency
- Use appropriate expertise level
- Provide actionable insights
</guidelines>

<tone>
Professional, knowledgeable, and helpful
</tone>`;
};

const generateDataProcessingTemplate = (text: string): string => {
  const instructions = extractInstructions(text);
  const context = extractContext(text) || 'data processing task';
  const outputFormat = extractOutputFormat(text);
  
  return `<data_source>
Input data related to: ${context}
</data_source>

<processing_steps>
1. ${instructions}
2. Validate and clean the data
3. Apply necessary transformations
4. Format according to requirements
</processing_steps>

<validation_rules>
- Check data integrity
- Ensure format compliance
- Validate output quality
</validation_rules>

<output_specification>
${outputFormat}
</output_specification>`;
};

// Main conversion function
export const convertToXML = (text: string, templateId: string): ConversionResult => {
  if (!text.trim()) {
    return { xml: '', isValid: true };
  }
  
  let xml = '';
  
  try {
    switch (templateId) {
      case 'basic':
        xml = generateBasicTemplate(text);
        break;
      case 'task-examples':
        xml = generateTaskExamplesTemplate(text);
        break;
      case 'complex':
        xml = generateComplexTemplate(text);
        break;
      case 'role-based':
        xml = generateRoleBasedTemplate(text);
        break;
      case 'data-processing':
        xml = generateDataProcessingTemplate(text);
        break;
      default:
        xml = generateBasicTemplate(text);
    }
    
    // Basic XML validation
    const isValid = validateXML(xml);
    
    return {
      xml,
      isValid,
      validationError: isValid ? undefined : 'XML structure may have formatting issues'
    };
  } catch (error) {
    return {
      xml: '',
      isValid: false,
      validationError: 'Error during conversion'
    };
  }
};

// Basic XML validation
const validateXML = (xml: string): boolean => {
  try {
    // Basic checks for matching tags
    const tagPattern = /<(\w+)>/g;
    const closeTagPattern = /<\/(\w+)>/g;
    
    const openTags = [...xml.matchAll(tagPattern)].map(match => match[1]);
    const closeTags = [...xml.matchAll(closeTagPattern)].map(match => match[1]);
    
    // Check if all opening tags have closing tags
    return openTags.length === closeTags.length && 
           openTags.every(tag => closeTags.includes(tag));
  } catch {
    return false;
  }
};