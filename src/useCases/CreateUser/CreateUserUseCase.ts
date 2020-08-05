import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTD } from "./CreateUserDTD"
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

/* Single Principle Responsebility */

/* a classe 'CreateUserUseCase' tem apenas a responsabilidade de criar e salvar 
o usuário e não COMO ele será salvo. este é um dos principios do SOLID */

/* Qualquer pessoa que necessitar de criar um usuário, irá sempre passar por essa 
classe, independente se for um usuário comum ou admin, ou seja, ele detem toda
regra de negócio para criação de um usuário */

export class CreateUserUseCase{

    /* Liskov Substitution Principle */

    /* o usersRepository dentro do construtor, depende de uma interface que determina
    quais metodos que vão existir dentro do repositório, independente se for 
    MongoDB, Postgres, MYSQL, etc. */

    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) {}
    
    async execute(data: ICreateUserRequestDTD){
        // verificar se o usuario existe ou não
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if(userAlreadyExists){
            throw new Error('User already exists');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do meu app',
                email: 'equipe@meuapp.com',
            },
            subject: 'Seja bem-vindo  plataforma',
            body: '<p>Você ja pode fazer login em nossa plataforma</p>'
        })
    }
}