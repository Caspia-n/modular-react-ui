import { AICommand } from '@/lib/ai/types';

export interface ParsedAIResponse {
  commands: AICommand[];
  reasoning: string;
  confidence: number; // 0-1
  requiresApproval: boolean;
}

const COMMAND_SCHEMA = `
You are a layout assistant. Generate structured commands in JSON format.

Available commands:
1. ADD_ITEM: Add a new component
   {
     "type": "add",
     "componentType": "text" | "media" | "embed",
     "x": number (0-11),
     "y": number,
     "w": number (2-12),
     "h": number (2-8),
     "content": { ... },
     "reason": string
   }

2. MOVE_ITEM: Move component
   {
     "type": "move",
     "id": string,
     "x": number,
     "y": number,
     "reason": string
   }

3. RESIZE_ITEM: Resize component
   {
     "type": "resize",
     "id": string,
     "w": number,
     "h": number,
     "reason": string
   }

4. UPDATE_STYLE: Change appearance
   {
     "type": "updateStyle",
     "id": string,
     "style": { backgroundColor, opacity, ... },
     "reason": string
   }

5. REMOVE_ITEM: Delete component
   {
     "type": "remove",
     "id": string,
     "reason": string
   }

Always respond with valid JSON wrapped in \`\`\`json ... \`\`\` blocks.
`;

export function parseAIResponse(response: string): ParsedAIResponse {
  try {
    // Extract JSON from markdown code block
    const jsonMatch = response.match(/\`\`\`json\n([\s\S]*?)\n\`\`\`/);
    const jsonStr = jsonMatch ? jsonMatch[1] : response;
    const parsed = JSON.parse(jsonStr);

    return {
      commands: parsed.commands || [],
      reasoning: parsed.reasoning || '',
      confidence: Math.min(1, parsed.commands?.length ? 0.8 : 0),
      requiresApproval: true, // Always require approval for local AI
    };
  } catch (error) {
    return {
      commands: [],
      reasoning: `Parse error: ${error instanceof Error ? error.message : String(error)}`,
      confidence: 0,
      requiresApproval: false,
    };
  }
}

export function buildAIPrompt(userRequest: string, gridState: any): string {
  return `
${COMMAND_SCHEMA}

Current grid state:
- Items: ${gridState.items.length} components
- Grid size: 12 columns x dynamic rows

User request: "${userRequest}"

Generate appropriate commands to fulfill this request. Respond with valid JSON.
`;
}