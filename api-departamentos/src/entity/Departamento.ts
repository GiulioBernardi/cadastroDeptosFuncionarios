import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Funcionario } from './Funcionario';

@Entity()
export class Departamento {


    @PrimaryGeneratedColumn({name:'cd_depto'})
    id: number;

    @Column({name:'nm_depto'})
    @MaxLength(25)
    @MinLength(4)
    nome: string;

    @Column({name:'sg_depto'})
    @MaxLength(3)
    @MinLength(3)
    sigla: string;

    @OneToMany(type => Funcionario, funcionario => funcionario.departamento, {eager: true})
    funcionarios: Array<Funcionario>;

}