import axios, { endpoints } from 'src/utils/axios';

const ENDPOINT = endpoints.file_upload;

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<{
    fileUrl: string;
  }>(ENDPOINT, formData);

  return response.data;
}
