import { Servico } from "src/domain/servico/entity/servico";
import { ServicoGateway } from "src/domain/servico/gateway/servico.gateway";
import { Usecase } from "src/usecases/usecase";

export type updateServicoInputDto = {
     
        id:string;
        nome?:string;
        preco?:number;
        descricao:string | null;
        destaque?:boolean;
        horasDeServico:number | null;
    
}
export type updateServicoOutputDto = void

export class UpdateServicoUsecase implements Usecase<updateServicoInputDto, updateServicoOutputDto> {
    private constructor(private readonly servicoGateway: ServicoGateway) {}

    public static create(servicoGateway: ServicoGateway) {
        return new UpdateServicoUsecase(servicoGateway)
    }
    public async execute({id, nome, preco, descricao, destaque, horasDeServico}: updateServicoInputDto): Promise<updateServicoOutputDto> {
        try{
            const servicoExistente = await this.servicoGateway.findById(id)
            if (!servicoExistente) {
                throw new Error("deve passar o ID");
            }
            servicoExistente.update(nome, preco, descricao, destaque, horasDeServico)
            await this.servicoGateway.update(servicoExistente)
        }catch(error:any) {
            console.error("Erro no UpdateServico:", error.message)
        }

    }
}