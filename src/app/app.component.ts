import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DxChatModule } from 'devextreme-angular';
import { DxChatTypes } from "devextreme-angular/ui/chat";
import { AgentService } from './services/agent.service';
import { AgentResponse } from './interfaces/agentResponse';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DxChatModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AgentService]})
export class AppComponent {
  title = 'ai-client';
  messages: DxChatTypes.Message[] = [];
  alerts: DxChatTypes.Alert[] = [];
  typingUsers: DxChatTypes.User[] = [];
  disabled: boolean = false;
  agentService: AgentService = inject(AgentService);

  technician: DxChatTypes.User = {
    id: '1',
    avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png',
    name: 'Technician'
  };

  assistant: DxChatTypes.User = {
    id: '2',
    avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png',
    name: 'Assistant'
  };

  onMessageEntered(e: any) {
    this.messages = [...this.messages, e.message];
    this.typingUsers = [this.assistant];
    this.sendToAgent(e.message.text);
  }

  sendToAgent(question: string) {

      this.agentService.agentSendMessage(question).subscribe({
        next: (result) => {
          let agentResponse: AgentResponse = result.data?.agentSendMessage;
          console.log("AGENT RESPONSE:", agentResponse);

          if (agentResponse.processingResult.__typename === 'TaskStatusUpdate') {
            const messageParts = agentResponse.processingResult.status?.message?.parts;
            this.messages = [...this.messages, {
              author: this.assistant,
              timestamp: Date.now(),
              text: messageParts ? messageParts.map(part => part.text).join(' ') : ''
            }];
          }

          if (agentResponse.processingResult.__typename === 'TaskArtifactUpdate') {
            const messageParts = agentResponse.processingResult.artifact?.parts;
            this.messages = [...this.messages, {
              author: this.assistant,
              timestamp: Date.now(),
              text: messageParts ? messageParts.map(part => part.text).join(' ') : ''
            }];
            this.typingUsers = [];
          }

        },
        error: (error) => {
          console.error('Subscription error:', error);
        },
      });

      console.log("MESSAGE SENT TO AGENT:", question);
  }

}
