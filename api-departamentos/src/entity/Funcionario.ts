import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Departamento } from './Departamento';
import { Schema } from 'mongoose'


@Entity()
export class Funcionario {


    @PrimaryGeneratedColumn({name:'cd_funcionario'})
    id: number;

    @Column({name: 'nm_funcionario'})
    @MaxLength(55)
    @MinLength(3)
    nome: string;

    //COMO QUE GUARDA FOTO?
    @Column({name: 'ds_foto', nullable: true})
    foto: string;

    @Column({name: 'ds_rg'})
    @MaxLength(12)
    @MinLength(8)     
    rg: string;


    @Column({name:'departamentoId'})
    departamentoId: number

    @ManyToOne(type => Departamento, departamento => departamento.funcionarios, {onDelete: 'CASCADE'})
    departamento:number

}
