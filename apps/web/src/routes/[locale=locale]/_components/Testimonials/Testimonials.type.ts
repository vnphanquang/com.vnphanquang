export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  ref: string;
  avatarUrl: string;
  title: string;
  coordinate: {
    x: string;
    y: string;
  };
}

export type TestimonialDismissReason = 'closeBtnClick';
