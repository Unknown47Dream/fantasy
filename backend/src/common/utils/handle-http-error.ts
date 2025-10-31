/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosError } from 'axios';
import { ClientRequest } from 'http';

export const handleHttpErrors = (err: any) => {
  // https://developers.pandascore.co/docs/errors
  if (err?.isAxiosError) {
    const error = err as AxiosError<{ error: string; message: string }>;
    console.log({
      message: error.message,
      path: (error.request as ClientRequest)?.path,
      data: error.response?.data,
      date: new Date().toISOString(),
      ...(err?.code && { code: err?.code }),
      ...(err?.data && { data2: err?.data }),
    });
  } else {
    console.log('No Axios Error ', err);
  }
};
