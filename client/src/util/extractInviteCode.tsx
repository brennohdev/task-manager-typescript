const extractInviteCode = (input: string): string | null => {
  try {
    // Se for uma URL, extraímos o código após '/invite/'
    const url = new URL(input);
    const parts = url.pathname.split('/');
    const codeIndex = parts.findIndex((p) => p === 'invite');
    if (codeIndex !== -1 && parts[codeIndex + 1]) {
      return parts[codeIndex + 1]; // Extrai o código
    }
  } catch {
    // Se não for uma URL, verificamos se é um código válido
    if (/^[a-zA-Z0-9-]{8,}$/.test(input)) {
      return input; // Retorna o código diretamente
    }
  }

  return null; // Caso não seja válido
};
