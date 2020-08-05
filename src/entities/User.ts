import { uuid } from 'uuidv4';

export class User{
    // o id não pode ser alterado
    public readonly id: string;

    public name: string;
    public password: string;
    public email: string;

    // omitir todas as propriedades e o id como opcional
    constructor(props: Omit<User, 'id'>, id?: string){
    /* pegar todos os elementos dentro da propriedas e setar um por um para o this 
    : this.name, this.email, etc.*/
        Object.assign(this, props)

        // criar o identificador para o usuario pelo código
        if(!id){
            this.id = uuid();
        }
    }
}