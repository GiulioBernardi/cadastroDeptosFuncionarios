import { validate } from 'class-validator';
import { Request, Response } from 'express';
import multer = require('multer');
import { CustomRepositoryNotFoundError, getRepository } from 'typeorm';
import { multerConfig } from '../config/multer';
import { Funcionario } from '../entity/Funcionario';


export const getFuncionarios = async(request:Request, response: Response) => {
    const funcionario = await getRepository(Funcionario).find()
    return response.json(funcionario) 
}

export const getFuncionarioById =async(request:Request, response: Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).findOne({
        where: {
            id: parseInt(request.params.id, 10)}})
    return response.json(funcionario)
}

export const getImageByFuncionario = async(request:Request, response: Response) => {
    const imagemPath = await getRepository(Funcionario)
    .createQueryBuilder("funcionario")
    .select("funcionario.foto")
    .where("funcionario.id = :id", {id: parseInt(request.params.id, 10)}).getOne()
    let imageName = imagemPath.foto.slice(67)
    console.log(imageName)
    const chromeServerUrl = `http://127.0.0.1:8887/`
    return response.json(chromeServerUrl + imageName)
}


export const getFuncionarioByDepartamento = async(request:Request, response: Response) => {
    const funcionario = await getRepository(Funcionario).find({
        where:{
            departamentoId: parseInt(request.params.id, 10)
        },
    })
    return response.json(funcionario)
}

export const createFuncionario =async (request:Request, response: Response) => {
    const funcionario = await getRepository(Funcionario).create({departamentoId: parseInt(request.params.id) })
    
}


export const saveFuncionarioteste = async(request:Request, response:Response) => {
    const funcionario = await getRepository(Funcionario).save(request.body)
    response.json(funcionario)
}

export const saveFuncionario = async(request:Request, response:Response) => {
    const funcionario = await getRepository(Funcionario)
    const {nome, rg, departamentoId} = request.body

    const func = funcionario.create({
        nome, 
        rg, 
        departamentoId:parseInt(request.params.id)
    })

    const erros = await validate(func)

    if(erros.length === 0){
        const res = await funcionario.save(func)
        return response.status(201).json(res)
    } else {
        response.status(400).json(erros)
    }
}

export const updateFuncionario = async(request:Request, response:Response) => {
    const { id } = request.params
    const funcionario = await getRepository(Funcionario).update(id, request.body)

    if(funcionario.affected === 1) {
        const funcionario = await getRepository(Funcionario).findOne({where: {id: parseInt(request.params.id, 10)}})
        return response.json(funcionario)
    }
    return response.status(404).json({message: "Funcionario não encontrado"})
}

export const uploadImage = async (request: Request, response: Response) => {

    const funcionario = await getRepository(Funcionario)
    const {nome, rg, departamentoId} = request.body

    // if(erros.length === 0){
        const res = await funcionario.update(parseInt(request.params.id, 10), {foto : request.file.path})
        return response.status(200).json(res)
}

export const deleteFuncionario = async(request:Request, response:Response) => {
    const {id} = request.params

    const funcionario = await getRepository(Funcionario).delete(id)

    if(funcionario.affected === 1) {
        const funcionario = await getRepository(Funcionario).findOne({where: {id: parseInt(request.params.id, 10)}})
        return response.json({message:"Funcionario deltado"})
    }
    return response.status(404).json({message: "Funcionario não encontrado"})
}