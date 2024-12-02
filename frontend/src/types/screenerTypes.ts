export interface ScreenerSearchResult {
  id: number;
  name: string;
  url: string;
}

export interface FindPDFsReturnType {
  extracted_data: {
    date: string;
    url: string;
  }[];
}
