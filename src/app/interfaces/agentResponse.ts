import { TextPart } from "./textPart";

export interface AgentResponse {
    processingResult: {
        __typename: string;
        taskId?: string;
        contextId?: string;
        status?: {
            state: string;
            message: {
                messageId: string;
                role: string;
                parts: TextPart[];
            };
        };
        artifact?: {
            artifactId: string;
            name: string;
            description: string;
            parts: TextPart[];
        };
    };
}