import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import type { LoginPayload, LoggedInUser } from '../types';

async function login(payload: LoginPayload): Promise<LoggedInUser> {
  const response = await axiosClient.post('/auth/login', payload);
  return response.data.data as LoggedInUser;
}

export function useLogin(options?: UseMutationOptions<LoggedInUser, Error, LoginPayload>) {
  return useMutation<LoggedInUser, Error, LoginPayload>({
    mutationFn: login,
    ...options,
  });
}
