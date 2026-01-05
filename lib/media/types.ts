export enum MediaType {
  image = 'image',
  video = 'video',
  embed = 'embed'
}

export enum EmbedType {
  youtube = 'youtube',
  twitter = 'twitter',
  figma = 'figma'
}

export interface MediaSource {
  id: string;
  type: MediaType;
  url: string;
  embedType?: EmbedType;
  title?: string;
  width?: number;
  height?: number;
  createdAt?: string;
  updatedAt?: string;
}
