export type SendEmailArgs = {
  sender: Sender;
  receiver: Receiver;
  message: string;
  templateId: number;
};

export type Sender = {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  company?: string;
  phone?: string;
  soureOfHeard?: string;
};

export type Receiver = {
  email: string;
  firstName?: string;
  lastName?: string;
};
