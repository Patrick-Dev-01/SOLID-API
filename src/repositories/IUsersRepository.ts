import { User } from '../entities/User';

export interface IUsersRepository{
    // vai verificar se o email ja existe
    findByEmail(email: string): Promise<User>;
    // salva o usuario no banco, mas não retorna nada
    save(user: User): Promise<void>;
}