export interface ITodo {
    id: string; // Unique identifier for the todo
    title: string; // Title of the todo
    details: string; // Detailed description of the todo
    images: File[]; // Array of uploaded media files
    links: string[]; // Array of external links
    calendarDate: Date; // Associated calendar date
    complete: boolean; // Indicates if the todo is complete
    bookmark: boolean; // Indicates if the todo is bookmarked
  }
  