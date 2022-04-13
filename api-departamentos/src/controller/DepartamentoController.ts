import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Departamento } from '../entity/Departamento';

export const getDepartamentos = async(request:Request, response: Response) => {
    const departamento = await getRepository(Departamento).find()
    return response.json(departamento) 
}


export const getDepartamentoById =async(request:Request, response: Response) => {
    const { id } = request.params
    const departamento = await getRepository(Departamento).findOne({where: {id: parseInt(request.params.id, )}})
    return response.json(departamento)
}

export const saveDepartamento = async(request:Request, response:Response) => {
    const departamento = await getRepository(Departamento)
    const {nome, sigla} = request.body

    const depto = departamento.create({
        nome, sigla
    })

    const erros = await validate(depto)

    if(erros.length === 0){
        const res = await departamento.save(depto)
        response.json(res)
    } else {
        response.status(400).json(erros)
    }

}

export const updateDepartamento = async(request:Request, response:Response) => {
    const { id } = request.params
    const departamento = await getRepository(Departamento).update(id, request.body)

    if(departamento.affected === 1) {
        const departamentoUpdated = await getRepository(Departamento).findOne({where: {id: parseInt(request.params.id, 10)}})
        return response.json(departamentoUpdated)
    }
    return response.status(404).json({message: "Departamento não encontrado"})
}

export const deleteDepartamento = async(request:Request, response:Response) => {
    const {id} = request.params

    const funcionario = await getRepository(Departamento).delete(id)

    if(funcionario.affected === 1) {
        const funcionario = await getRepository(Departamento).findOne({where: {id: parseInt(request.params.id, 10)}})
        return response.json({message:"Departamento deltado"})
    }
    return response.status(404).json({message: "Departamento não encontrado"})
}