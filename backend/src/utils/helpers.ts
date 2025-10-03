import z, { ZodError } from 'zod';
import ApiError from './ApiError.js';

export function isValidPath(path: string) {
    const pathRegex =
        /^\/([A-Za-z0-9_.-~]+(?:[\/][A-Za-z0-9_.-~]+)*)(?:[\/][A-Za-z0-9_.-~]*)?$/;
    return pathRegex.test(path);
}
export function checkAndThrowZodErrors(zodError: ZodError | undefined) {
    if (zodError) {
        const flattened = z.flattenError(zodError);
        throw new ApiError(
            422,
            flattened.fieldErrors,
            'Input validations failed.'
        );
    }
}
