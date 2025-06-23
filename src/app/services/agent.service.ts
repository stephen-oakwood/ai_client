import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const PERFORM_TASK = gql`
subscription performTask($task: TaskInput) {
	agentTaskExecute(task: $task) {
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
  
    agentPerformTask(question: string): Observable<any> {
      return this.apollo.subscribe<any>({
        query: PERFORM_TASK,
        variables: {
            task: {
                id: '1111-2222-3333-4444',
                sessionId: 'Test',
                message: question,
              },
        },      
      })
    }
  
  }
