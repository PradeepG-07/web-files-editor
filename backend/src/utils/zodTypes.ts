import z from 'zod';
import { isValidPath } from './helpers.js';
import { Messages as m } from 'common';
export const FileSchema = z.object({
    path: z.string({ message: 'File path is required.' }).refine(
        (data) => {
            return isValidPath(data);
        },
        {
            message: m.INVALID + m.SPACE + m.FILE + m.PATH,
        }
    ).transform((data)=> data.startsWith("~") ? data.replace("~",`/home/${process.env.USERNAME}`) : data),
    content: z.any(),
});
export const DirectorySchema = z.object({
    path: z.string({ message: 'Directory path is required.' }).refine(
        (data) => {
            return isValidPath(data);
        },
        {
            message: m.INVALID + m.SPACE + m.DIRECTORY + m.PATH,
        }
    ).transform((data)=> data.startsWith("~") ? data.replace("~",`/home/${process.env.USERNAME}`) : data),
});
