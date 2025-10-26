import { z } from 'zod';
import { EnvSchema } from './zodTypes.js';
import { exit } from 'process';

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
    const flattenedErrors = z.flattenError(result.error);
    console.log(flattenedErrors);
    exit();
}
const cleanedEnv = result.data;
export default cleanedEnv;
