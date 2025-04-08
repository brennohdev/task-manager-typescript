import bcrypt from 'bcrypt';

export const hashPassword = async (value: string, saltRounds: number = 10) => {
    await bcrypt.hash(value, saltRounds);
}

export const comparePassword = async (value: string, hashedValue: string, ) => {
    await bcrypt.compare(value, hashedValue);
}