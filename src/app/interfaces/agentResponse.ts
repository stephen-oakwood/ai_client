import { TextPart } from "./textPart";

export interface AgentResponse {
    parts: TextPart[];
    responseType: string; 
    responseState: string; 
}