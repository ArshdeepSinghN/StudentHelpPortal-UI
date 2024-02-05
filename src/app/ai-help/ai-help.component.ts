import { Component, OnInit } from '@angular/core';
import { AiHelpServiceService } from '../service/ai-help-service.service';

@Component({
  selector: 'app-ai-help',
  templateUrl: './ai-help.component.html',
  styleUrls: ['./ai-help.component.scss']
})
export class AiHelpComponent implements OnInit {
  chatMessages: { text: string; isUser: boolean; isLoading: boolean }[] = [];
  userMessage: string = '';
  selectedQueryType: string = 'help'; // Default query type
  chatResponse: string = '';

  constructor(private aiService: AiHelpServiceService) {}

  ngOnInit(): void {
    // You can leave this part for initialization.
  }

  sendMessage() {
    if (this.userMessage.trim() === '') {
      return;
    }

    this.chatMessages.push({ text: this.userMessage, isUser: true, isLoading: false });

    this.chatMessages.push({ text: '', isUser: false, isLoading: true });

    // Call the AI service with the user's message
    this.aiService.chat(this.userMessage).subscribe((res) => {
      console.log("API response", res.choices[0].message.content);
      this.chatMessages.pop(); // Remove the loader
      this.chatMessages.push({ text: res.choices[0].message.content, isUser: false, isLoading: false });
    });

    this.userMessage = ''; // Clear the user's message input.
  }
}
