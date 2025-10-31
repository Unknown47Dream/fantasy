export interface SendMessage {
  ok: boolean;
  result: Result;
  error_code?: number;
  description?: string;
}

interface Result {
  message_id: number;
  sender_chat: Senderchat;
  chat: Senderchat;
  date: number;
  text?: string;
  photo?: Photo[];
  caption?: string;
  caption_entities?: Captionentity[];
}

interface Senderchat {
  id: number;
  title: string;
  username: string;
  type: string;
}

interface Captionentity {
  offset: number;
  length: number;
  type: string;
  url?: string;
}

interface Photo {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}
