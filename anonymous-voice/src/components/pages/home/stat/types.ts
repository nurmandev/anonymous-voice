export interface StatTypes {
  icon: string;
  value: string;
  label: string;
}

export interface VideoSectionProps {
  imageUrl: string;
  videoUrl?: string;
}

export interface StatsSectionProps {
  stats: StatTypes[];
}
