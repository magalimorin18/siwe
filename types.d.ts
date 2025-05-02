declare global {
  interface Window {
    lukso?: any;
  }
}

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      address: string;
      signature?: string;
    };
    nonce: string;
  }
}

export interface IronSessionData {
  user?: {
    address: string;
    signature?: string;
  };
}
