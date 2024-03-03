import { Time } from "@angular/common";

export class Message {
  message_Id?: number | undefined;
  from_UserId!: string;
  from_UserName!: string;
  to_ChatId!: string;
  messageTitle?: string;
  messageText!: string;
  isMessageSeen?: number | undefined;
  sendAt!: Date;
}
