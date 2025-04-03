export class filmsScheduleDTO {
  schedule: {
    id: string;
    daytime: string;
    hall: number;
    rows: number;
    seat: number;
    price: number;
    taken: string[];
  };
}

export class ScheduleResponseDto {
  total: number;
  items: filmsScheduleDTO[];
}
