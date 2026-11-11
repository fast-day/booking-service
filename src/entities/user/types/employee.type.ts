import type { ImageUrls } from "@/shared/ui/avatar/types/image.type";

export interface IEmployee {
  id: string;
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    position: string;
    avatar: ImageUrls;
  }
}
