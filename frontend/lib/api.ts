import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const api = {
  uploadResumes: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const response = await axios.post(`${API_BASE_URL}/upload-resumes`, formData);
    return response.data;
  },
  analyze: async (jdText: string, jdFile: File | null) => {
    const formData = new FormData();
    if (jdText) formData.append('jd_text', jdText);
    if (jdFile) formData.append('jd_file', jdFile);
    const response = await axios.post(`${API_BASE_URL}/analyze`, formData);
    return response.data;
  },
  getCandidates: async () => {
    const response = await axios.get(`${API_BASE_URL}/candidates`);
    return response.data;
  },
  exportResults: async () => {
    const response = await axios.get(`${API_BASE_URL}/export`);
    return response.data;
  },
  clearData: async () => {
    const response = await axios.post(`${API_BASE_URL}/clear`);
    return response.data;
  }
};
