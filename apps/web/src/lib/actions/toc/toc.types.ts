export interface TocParameters {
  selector: string;
  ignoreSelector: string[] | string;
  anchored: number | boolean;
  indicator: string | boolean;
  insertedParagraphClass: string;
  itemClass: string;
  injectedStyleId: string;
  insertedAnchorClass: string;
  stimulateHashNavigation: boolean;
}

export interface ResolvedTocParameters {
  anchored: number;
  indicator: string;
  selector: string;
  insertedParagraphClass: string;
  itemClass: string;
  injectedStyleId: string;
  insertedAnchorClass: string;
  stimulateHashNavigation: boolean;
}

export interface TocEventDetails {
  id: string;
  items: TocEventItemDetails[];
}

export interface TocEventItemDetails {
  element: HTMLElement;
  id: string;
  text: string;
  p?: HTMLParagraphElement;
  anchor?: HTMLAnchorElement;
}
