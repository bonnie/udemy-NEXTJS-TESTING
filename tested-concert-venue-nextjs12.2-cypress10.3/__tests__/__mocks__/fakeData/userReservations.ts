import { ReservationWithShow } from "@/lib/features/reservations/types";

export const fakeUserReservations: Array<ReservationWithShow> = [
  {
    id: 1,
    userId: 1,
    show: {
      id: 1,
      band: {
        id: 2,
        name: "The Joyous Nun Riot",
        description: "edgy funk with an improvisational vibe",
        image: {
          fileName: "band8.jpg",
          authorName: "Anton Mislawsky",
          authorLink: "https://unsplash.com/@antonmislawsky",
        },
      },
      scheduledAt: new Date(),
      availableSeatCount: 10,
    },
    showId: 1,
    seatCount: 2,
  },
  {
    id: 2,
    userId: 1,
    show: {
      id: 2,
      band: {
        id: 1,
        name: "Shamrock Pete",
        description: "fusion americana, featuring a hilarious musical saw",
        image: {
          fileName: "band2.jpg",
          authorName: "Kyle Wong",
          authorLink: "https://unsplash.com/@kylewongs",
        },
      },
      scheduledAt: new Date(),
      availableSeatCount: 10,
    },
    showId: 1,
    seatCount: 4,
  },
];
