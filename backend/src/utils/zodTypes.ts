import z from 'zod';
import { isValidPath } from './helpers.js';
import { Messages as m } from 'common';
export const FileSchema = z.object({
    path: z
        .string({ message: 'File path is required.' })
        .refine(
            (data) => {
                return isValidPath(data);
            },
            {
                message: m.INVALID + m.SPACE + m.FILE + m.PATH,
            }
        )
        .transform((data) =>
            data.startsWith('~')
                ? data.replace('~', `/home/${process.env.USERNAME}`)
                : data
        ),
    content: z.any(),
});
export const DirectorySchema = z.object({
    path: z
        .string({ message: 'Directory path is required.' })
        .refine(
            (data) => {
                return isValidPath(data);
            },
            {
                message: m.INVALID + m.SPACE + m.DIRECTORY + m.PATH,
            }
        )
        .transform((data) =>
            data.startsWith('~')
                ? data.replace('~', `/home/${process.env.USERNAME}`)
                : data
        ),
});
export const EnvSchema = z.object({
    PASSWORD: z.string({ message: 'PASSWORD is required.' }),
    USERNAME: z.string({ message: 'USERNAME is required.' }),
    REDIS_URI: z.string({ message: 'REDIS_URI is required.' }),
    REDIS_PUBSUB_URI: z.string({ message: 'REDIS_URI is required.' }),
    SSE_URI: z.string({ message: 'SSE_URI is required.' }),
});
