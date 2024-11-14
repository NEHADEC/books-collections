// // types.ts

// export interface Book {
//     key: string;
//     title: string;
//     // add other fields as required
//   }
  
//   export interface BookDetails {
//     title: string;
//     description: { value: string };
//     authors?: { name: string, key: string }[];
//     covers?: number[]; 
//     excerpts?: { excerpt: string }[];
//     languages?: string[];
//     // add other fields as required
//   }
export interface Book {
  id: string;
  title: string;
  description?: string; // Optional in case it's missing
  authors?: { name: string }[]; // Array of authors with optional name
}

export interface BookDetails {
  id: string;
  title: string;
  description?: string | { value: string }; // Could be a string or an object with `value`
  authors?: { name: string; key: string }[]; // Each author with a name and unique key
  covers?: number[]; // Array of cover image IDs
  excerpts?: { excerpt: string }[]; // Array of excerpt objects
  languages?: string[]; // Array of language codes
}
