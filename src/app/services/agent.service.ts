import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const AGENT_SEND_MESSAGE = gql`
# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#   Prettify query:  Shift-Ctrl-P (or press the prettify button)
#
#  Merge fragments:  Shift-Ctrl-M (or press the merge button)
#
#        Run Query:  Ctrl-Enter (or press the play button)
#
#    Auto Complete:  Ctrl-Space (or just start typing)
#


subscription agentSendMessage($message: MessageInput) {
	agentSendMessage(message: $message) {
    processingResult {
      __typename
      ...on TaskStatusUpdate {
        taskId
        contextId
        status {
          state
          message {
            messageId
            role
            parts {
              ...on TextPart {
                text
              }
            }
          }
        }
      }
      ...on TaskArtifactUpdate {
        taskId
        contextId
        artifact {
          artifactId
          name
          description
          parts {
            ...on TextPart {
              text
            }
          }
        }
      }
    }
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
