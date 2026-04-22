export interface Field {
  id: string;
  name: string;
  cropType: string;
  currentStage: string;
  location: string;
  size: number;
  status: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'FIELD_AGENT';
}
