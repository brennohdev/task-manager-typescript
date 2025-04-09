import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, saltRounds: number = 10): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hashedValue: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedValue);
}
