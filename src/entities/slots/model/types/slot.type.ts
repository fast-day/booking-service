export interface ISlotCredentials {
  path: {
    user_id: string;
    location_id: string;
  }
  query: {
    date: string;
    duration: number;
  }
}
