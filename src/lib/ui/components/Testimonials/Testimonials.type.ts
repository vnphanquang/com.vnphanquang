export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  ref: string;
  avatar: string;
  title: string;
  position: {
    x: string;
    y: string;
  };
}

export type TestimonialDismissReason = 'closeBtnClick';
