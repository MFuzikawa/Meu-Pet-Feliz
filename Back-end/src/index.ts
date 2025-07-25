import 'dotenv/config';
import { ServicoRepositoryPrisma } from './infra/repositories/servico/servico.repository.prisma';
import { prisma } from './package/prisma/prisma';
import { FindByIdServicoUsecase } from './usecases/servico.usecases/findById-servico/findByIdServico.usecase';
import { CreateServicoUseCase } from './usecases/servico.usecases/create-servico/createServico.usecase';
import { ListServicoUsecase } from './usecases/servico.usecases/list-servico/listServico.usecase';
import { DeleteServicoUsecase } from './usecases/servico.usecases/delete-servico/deleteServico.usecase';
import { FindByIdServicoRoute } from './infra/api/express/routes/servico/findById-servico.express.route';
import { CreateServicoRoute } from './infra/api/express/routes/servico/create-servico.express.route';
import { ListServicosRoute } from './infra/api/express/routes/servico/list-product.express.route';
import { DeleteServicoRoute } from './infra/api/express/routes/servico/delete-servico.express.route';
import { ApiExpress } from './infra/api/express/routes/api.express';
import { UpdateServicoUsecase } from './usecases/servico.usecases/update-servico/updateServico.usecase';
import { UpdateServicoRoute } from './infra/api/express/routes/servico/update-servico.express.route';



function main() {
     const aRepository = ServicoRepositoryPrisma.create(prisma);

     const findByIdServicoUsecase = FindByIdServicoUsecase.create(aRepository)
     const updateServicoUsecase = UpdateServicoUsecase.create(aRepository)
     const createServicoUseCase = CreateServicoUseCase.create(aRepository);
     const listServicosUseCase = ListServicoUsecase.create(aRepository);
     const deleteServicoUseCase = DeleteServicoUsecase.create(aRepository);

     const findByIdRoute = FindByIdServicoRoute.create(findByIdServicoUsecase);
     const updateRoute = UpdateServicoRoute.create(updateServicoUsecase)
     const createRoute = CreateServicoRoute.create(createServicoUseCase);
     const listRoute = ListServicosRoute.create(listServicosUseCase);
     const deleteRoute = DeleteServicoRoute.create(deleteServicoUseCase);


     const port = 8080;

     const api = ApiExpress.create([createRoute, updateRoute, findByIdRoute, deleteRoute, listRoute, ]);
     api.start(port)
}
main()