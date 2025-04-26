const extractInviteCode = (input: string): string | null => {
  try {
    const url = new URL(input);
    const parts = url.pathname.split('/');
    const codeIndex = parts.findIndex((p) => p === 'invite');
    if (codeIndex !== -1 && parts[codeIndex + 1]) {
      return parts[codeIndex + 1]; 
    }
  } catch {
    if (/^[a-zA-Z0-9-]{8,}$/.test(input)) {
      return input;
    }
  }

  return null; 
};
