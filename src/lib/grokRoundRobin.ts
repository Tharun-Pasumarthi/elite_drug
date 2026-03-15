type GrokKeySelection = {
  key: string;
  index: number;
  total: number;
};

type AiProvider = 'xai' | 'groq';

declare global {
  // Shared across route modules in the same server runtime instance.
  var __eliteGrokRoundRobinIndex: number | undefined;
}

const DEFAULT_XAI_API_URL = 'https://api.x.ai/v1/chat/completions';
const DEFAULT_XAI_MODEL = 'grok-beta';
const DEFAULT_GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_GROQ_MODEL = 'llama-3.3-70b-versatile';

function parseDelimitedKeys(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/[\n,;]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseIndexedKeys(): string[] {
  return Object.keys(process.env)
    .filter((name) => /^GROK_API_KEY_\d+$/i.test(name))
    .sort((a, b) => {
      const aIndex = Number(a.split('_').pop() || 0);
      const bIndex = Number(b.split('_').pop() || 0);
      return aIndex - bIndex;
    })
    .map((name) => process.env[name])
    .filter((value): value is string => Boolean(value));
}

export function getConfiguredGrokApiKeys(): string[] {
  const combined = [
    ...parseDelimitedKeys(process.env.GROK_API_KEYS),
    ...parseIndexedKeys(),
    ...parseDelimitedKeys(process.env.GROK_API_KEY),
  ];

  const seen = new Set<string>();
  const unique: string[] = [];

  for (const key of combined) {
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(key);
    }
  }

  return unique;
}

export function getNextGrokApiKey(): GrokKeySelection | null {
  const keys = getConfiguredGrokApiKeys();
  if (keys.length === 0) {
    return null;
  }

  const currentIndex = globalThis.__eliteGrokRoundRobinIndex ?? 0;
  const selectedIndex = currentIndex % keys.length;
  globalThis.__eliteGrokRoundRobinIndex = (selectedIndex + 1) % keys.length;

  return {
    key: keys[selectedIndex],
    index: selectedIndex,
    total: keys.length,
  };
}

function inferProviderFromKey(apiKey: string | undefined): AiProvider {
  if (apiKey?.startsWith('gsk_')) {
    return 'groq';
  }

  return 'xai';
}

export function getGrokApiConfig(apiKey?: string) {
  const provider = inferProviderFromKey(apiKey);
  const fallbackApiUrl = provider === 'groq' ? DEFAULT_GROQ_API_URL : DEFAULT_XAI_API_URL;
  const fallbackModel = provider === 'groq' ? DEFAULT_GROQ_MODEL : DEFAULT_XAI_MODEL;

  return {
    provider,
    apiUrl: process.env.GROK_API_URL || fallbackApiUrl,
    model: process.env.GROK_MODEL || fallbackModel,
  };
}