export interface Band {
  id: number;
  name: string;
  description: string;
  image: Image;
}
export interface Image {
  fileName: string;
  authorName: string;
  authorLink: string;
}
