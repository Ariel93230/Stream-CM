import { useMutation } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import type { UploadPayload, UploadResponse } from '../types';

async function createUpload(payload: UploadPayload): Promise<UploadResponse> {
  const response = await axiosClient.post('/uploads', payload);
  return response.data.data as UploadResponse;
}

export function useUpload() {
  return useMutation<UploadResponse, Error, UploadPayload>({
    mutationFn: createUpload,
  });
}
