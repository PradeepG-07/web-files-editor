import type { Config } from 'jest';
import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({
    //...options
    tsconfig: './tests/tsconfig.json',
});

export default {
    ...presetConfig,
    testPathIgnorePatterns: ['./*.test.ts'],
    workerIdleMemoryLimit: '1024mb',
} satisfies Config;
