export interface ISlotCredentials {
  path: {
    user_id: string;
  }
  query: {
    location_id: string;
    duration: number;
    start_date: string;
    end_date: string;
  }
}

export interface ISlotTime {
  start: string;
  end: string;
}

export interface ISlot {
  date: string;
  slots: ISlotTime[];
  intervals: ISlotTime[];
}

export interface ISlotResponse {
  days: ISlot[];
}
