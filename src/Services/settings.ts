export const offline: boolean = false;
const local: boolean = false;
export const baseAddress: string = local
  ? "127.0.0.1:8000/api"
  : "3.104.202.139:8000/api";
