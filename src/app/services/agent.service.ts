import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const AGENT_SEND_MESSAGE = gql`
subscription sendMessage($message: MessageInput) {
	agentSendMessage(message: $message) {
    messageId
    contextId
    taskId
  	parts {
      ...on TextPart {
        text
      }
    }
    
    responseType
    responseState
	}
}`

@Injectable({
    providedIn: 'root'
  })
  export class AgentService {
  
    constructor(private readonly apollo: Apollo) { }
  
    agentSendMessage(question: string): Observable<any> {
      return this.apollo.subscribe<any>({
        query: AGENT_SEND_MESSAGE,
        variables: {
            message: {
                contextId: 'Test',
                text: question,
              },
        },      
      })
    }
  
  }
