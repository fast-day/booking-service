export interface IEmployee {
  id: string;
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    position: string;
    avatar: string | null;
  }
}
