// src/types.ts
export interface Pet {
  id: number;
  name: string;
  description: string;
  location: string;
  status: string;
  photo_url: string;
  breed?: string; // Esto indica que breed puede ser string o undefined
  age?: number;
  personality?: string;
  adoption_requirements?: string;
}

export interface PetResponse {
  current_page: number;
  data: Pet[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SearchParams {
  name?: string;
  location?: string;
  status?: string;
  breed?: string;
  age?: number;
  personality?: string;
  adoption_requirements?: string;
  search?: string;
}

export interface PaginationButtonsProps {
  petResponse: PetResponse;
  searchParams: SearchParams;
  onPageChange: (page: number) => void;
}

export interface Breed {
  id: number;
  name: string;
}

export interface BreedSelectorProps {
  onChange: (breedId: string | number) => void;
  multiple?: boolean;
}
