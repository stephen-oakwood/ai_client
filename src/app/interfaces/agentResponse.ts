import { TextPart } from "./textPart";

export interface AgentResponse {
    messageId: string;
    contextId: string;
    taskId: string;
    parts: TextPart[];
    responseType: string; 
    responseState: string; 
}