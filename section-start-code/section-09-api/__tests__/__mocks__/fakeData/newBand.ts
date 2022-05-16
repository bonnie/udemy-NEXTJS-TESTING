import { Band } from "@/lib/features/bands/types";

export const generateNewBand = (bandId: number): Band => ({
  id: bandId,
  name: "Avalanche of Cheese",
  description: "masterful reggae featuring brilliant harmonies",
  image: {
    fileName: "band11.jpg",
    authorName: "Saksham Gangwar",
    authorLink: "https://unsplash.com/@saksham",
  },
});
