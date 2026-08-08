import { z } from 'zod';
import { DB_GENDER, DB_REFERRAL_MODE } from '@/lib/validation/db-enums';

// The FormData type uses 'sex' and 'referral' which map to 'gender' and 'referral_mode' in the DB.
// We validate the form fields exactly as they are named in the FormData type.
// The mapping to DB column names happens at the DTO/API layer.
const patientIntakeSchema = z.object({
  name: z.string().min(5, 'Name is too short'),
  phone: z.string().min(10, 'Phone number is required'),
  sex: z.enum(DB_GENDER, { message: 'Gender must be M, F, or X' }),
  age: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0 && num <= 99 && val.trim() !== '';
  }, { message: 'Enter a valid age' }),
  address: z.string().min(3, 'Address is invalid or too short').max(50, 'Address is too long'),
  referral: z.enum(DB_REFERRAL_MODE, { message: 'Referral source must be Walk-in, Google, or Doctor' }),
  doctorInfo: z.string().optional(),
  clinicalNotes: z.array(z.any()).optional(),
}).superRefine((data, ctx) => {
  if (data.referral === 'DOCTOR') {
    if (!data.doctorInfo || data.doctorInfo.trim().length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Referral doctor details are required when referral source is Doctor',
        path: ['doctorInfo'],
      });
    }
  }
}).transform((data) => {
  if (data.referral !== 'DOCTOR') {
    data.doctorInfo = undefined;
  }
  return data;
});

export function validatePatientIntake(data: any) {
  const result = patientIntakeSchema.safeParse(data);
  if (result.success) {
    return { success: true };
  } else {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const path = issue.path[0] as string;
      if (path && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }
    return { success: false, fieldErrors };
  }
}
